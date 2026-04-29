# Whalen Website — Phase 2 Design Spec

**Date:** 2026-04-29
**Status:** Draft — pending user review
**Repo:** `WhalenF/whalen-financial-website`
**Stack:** Next.js 16.2.2, React 19, TypeScript, Tailwind v4, Vercel
**Builds on:** Phase 1 spec (`2026-04-29-whalen-website-phase1-design.md`) — Phase 2 assumes Phase 1 has been merged to `main`
**Author:** Andrew Whalen + Claude

## Goal

Wire the public website's `/welcome` form submissions into a compliance-friendly persistent store, gate access to a private admin surface behind Microsoft single-sign-on, and let the team manage job postings without redeploying the site.

Phase 1 made the site demo-ready — surveys and referrals reach a route handler and `console.log` the payload. Phase 2 makes it operationally complete: every submission is captured durably, the team can read submissions in a private admin, and the Careers page is content-managed.

## Scope

In:
1. **Microsoft Entra ID single-sign-on** for `/admin/*`. Restrict to `@whalenfinancial.com` mailboxes. NextAuth (Auth.js v5) handles the OAuth flow and session.
2. **Microsoft Graph API integration** writing every survey + referral submission to a shared SharePoint Excel workbook (`Whalen Website Submissions.xlsx`) with two tables: `Referrals` and `Surveys`.
3. **Vercel KV** as the durable store for **job postings** — admin edits, Careers page reads.
4. **`/admin` backend pages**: dashboard (counts + recent activity), referrals viewer, surveys viewer, jobs CRUD.
5. **Wire `/api/refer` and `/api/survey`** to actually persist via Graph API (replacing the Phase 1 `console.log` stubs). The Zod schemas, route signatures, and form components remain unchanged across the boundary.
6. **Wire `/careers` page** to render jobs from Vercel KV instead of the hardcoded empty array in `src/lib/jobs.ts`.

Out (deferred):
- Salesforce Web-to-Lead integration for referrals — pending the Salesforce dev team's reply with credentials. Once they reply, `/api/refer` adds a second persistence path (Excel + Salesforce). No client-side changes needed at that point.
- Migration of team / reviews content from Keystatic into the new admin. Keystatic continues to manage those.
- Audit log of admin actions (who edited which job and when) — defer until the team grows beyond a handful of admins.
- File attachments on referral submissions.
- 2FA inside our app — we inherit MFA from the M365 tenant policy.

---

## Architecture overview

```
                       ┌────────────────────────────────────┐
                       │      Microsoft Entra ID (Azure)    │
                       │   Single Azure AD app registration │
                       │   used for both auth flows below   │
                       └──────────────┬─────────────────────┘
                                      │
          ┌───────────────────────────┴─────────────────────────────┐
          │                                                         │
   delegated (login)                                       client_credentials
   user signs in via OAuth                                 (server-side daemon)
          │                                                         │
          ▼                                                         ▼
  ┌───────────────────┐                                  ┌────────────────────┐
  │   /admin/login    │                                  │  Graph API daemon  │
  │   NextAuth v5     │                                  │   (server-side)    │
  │   Microsoft Entra │                                  │   - read Excel     │
  │     ID provider   │                                  │   - append rows    │
  └─────────┬─────────┘                                  └─────────┬──────────┘
            │ session cookie                                       │
            │                                                      │
            ▼                                                      ▼
  ┌────────────────────────┐                       ┌────────────────────────────┐
  │  middleware.ts gate    │                       │  SharePoint site/drive    │
  │  - require session     │                       │  Whalen Website            │
  │  - require @whalenfin  │                       │    Submissions.xlsx        │
  │    ancial.com email    │                       │    ├─ Referrals (table)    │
  └─────────┬──────────────┘                       │    └─ Surveys   (table)    │
            │                                      └────────────────────────────┘
            ▼
  ┌──────────────────────────────────┐         ┌────────────────────────────┐
  │  /admin/...                      │ ◀──────▶│  Vercel KV                  │
  │   - dashboard                    │  (jobs) │   key: jobs:list            │
  │   - referrals (read from Excel)  │         │   value: Job[] (JSON)       │
  │   - surveys   (read from Excel)  │         └────────────────────────────┘
  │   - jobs CRUD (read/write KV)    │                       ▲
  └──────────────────────────────────┘                       │
                                                             │
                                            ┌────────────────┴───────────────┐
                                            │   /careers (public page)       │
                                            │   - reads jobs:list from KV    │
                                            └────────────────────────────────┘
```

**Auth model — why two flows from the same Azure app:**
- **Delegated (NextAuth login):** identifies *which* Whalen team member is using `/admin`. We use this just for access control. We do *not* use the user's Graph token to write to the Excel file.
- **Client credentials (Graph daemon):** the server holds its own client_secret + tenant_id and uses the OAuth 2.0 client_credentials grant to get an app-level Graph token. This token is used for *all* server-to-Excel writes. Rationale: server-side persistence shouldn't depend on which human is currently logged in. Single Azure AD app registration with both kinds of permissions configured (Delegated `User.Read` + Application `Sites.ReadWrite.All` or scoped down to a specific site).

---

## 1. Microsoft Entra ID auth (NextAuth)

**Library:** `next-auth@5` (Auth.js v5). v5 is the current stable line for Next 16 App Router.

**File: `src/auth.ts`**
- Export `auth`, `signIn`, `signOut`, `handlers` from a `NextAuth({...})` config.
- Provider: `MicrosoftEntraID` from `next-auth/providers/microsoft-entra-id`.
- Required env vars: `AUTH_MICROSOFT_ENTRA_ID_ID`, `AUTH_MICROSOFT_ENTRA_ID_SECRET`, `AUTH_MICROSOFT_ENTRA_ID_TENANT_ID`, `AUTH_SECRET`.
- Callback `signIn({ user })`: return `false` if `user.email` does not end in `@whalenfinancial.com` — blocks anyone outside the tenant from authenticating even if they somehow obtain a valid token.
- Session strategy: `jwt` (default for Auth.js v5).

**File: `src/app/api/auth/[...nextauth]/route.ts`**
- Re-export `handlers` as `GET` and `POST`.

**File: `middleware.ts`** (repo root)
- Use `auth.middleware` to protect `/admin/*` (excluding `/admin/login` and the auth API route). Unauthenticated requests redirect to `/admin/login`.

**File: `src/app/admin/login/page.tsx`**
- Server component that renders a single "Sign in with Microsoft" button. Button calls `signIn("microsoft-entra-id", { callbackUrl: "/admin" })`. Visual style consistent with the rest of the site (navy/teal).

**Sign-out:** simple `<form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>` rendered in the `/admin` layout header.

---

## 2. Microsoft Graph API client

**File: `src/lib/graph/client.ts`**
- Implements OAuth 2.0 client credentials flow against `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token` with scope `https://graph.microsoft.com/.default`.
- Caches the access token in module-level memory keyed by tenant; refresh on `expires_in - 60s`. Tokens last ~60 minutes.
- Exposes `graphFetch(path, init)` — wraps `fetch` with the bearer token and base URL `https://graph.microsoft.com/v1.0`.

**File: `src/lib/graph/excel.ts`**
- `appendReferralRow(row: ReferralPayload & { submitted_at: string; ip: string | null; })` — calls the Graph endpoint to append a row to the `Referrals` table.
- `appendSurveyRow(row: SurveyPayload & { submitted_at: string; ip: string | null; })` — same for `Surveys`.
- `listReferralRows()` and `listSurveyRows()` — return all rows for the admin viewers (paginated; 100 rows per page using Graph's `$top` + `$skiptoken`).

**Graph endpoint pattern:**
```
POST /sites/{SHAREPOINT_SITE_ID}/drives/{SHAREPOINT_DRIVE_ID}/items/{SHAREPOINT_FILE_ID}/workbook/tables/{tableName}/rows/add
{ "values": [ [v1, v2, v3, ...] ] }
```

**Required env vars:**
- `GRAPH_CLIENT_ID` — same as the NextAuth client ID (single Azure AD app)
- `GRAPH_CLIENT_SECRET`
- `GRAPH_TENANT_ID`
- `SHAREPOINT_SITE_ID`
- `SHAREPOINT_DRIVE_ID`
- `SHAREPOINT_FILE_ID`

---

## 3. Vercel KV — jobs storage

**Why KV not Excel:** the Careers page reads jobs on every public visit. Round-tripping through Graph API for that would be slow and burn API quota. KV is sub-100ms reads, free tier covers the volume comfortably, and edits from `/admin/jobs` are atomic JSON writes.

**Schema:**
- Single key: `jobs:list`
- Value: `Job[]` JSON serialized — same `Job` type already defined in `src/lib/jobs.ts`.

**File: `src/lib/jobs.ts`** (modified)
- Keep the `Job` and `JobSection` interfaces.
- Replace the hardcoded `export const jobs: Job[] = []` with:
  - `export async function getJobs(): Promise<Job[]>` — reads `jobs:list` from KV; returns `[]` if the key is absent.
  - `export async function setJobs(jobs: Job[]): Promise<void>` — writes JSON to `jobs:list`.
  - `export async function getJob(slug: string): Promise<Job | undefined>` — replaces the synchronous version.
- All callers in `src/app/careers/...` update to await these.

**Required env vars:**
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

---

## 4. `/admin` backend pages

### 4.1 Layout

**File: `src/app/admin/layout.tsx`**
- Server component. Fetches the session via `auth()` (NextAuth v5). If absent, the middleware should already have redirected — defensive `redirect("/admin/login")` here as a guard.
- Top header: Whalen logo (left), nav tabs (Dashboard / Referrals / Surveys / Jobs), signed-in user email + sign-out button (right).
- Visual style: navy background like the public site's Hero, white card surface for content.

### 4.2 Dashboard — `src/app/admin/page.tsx`

- Server component. Calls `listReferralRows()` and `listSurveyRows()` server-side, plus `getJobs()`.
- Renders three KPI cards: total referrals, total surveys, open job postings.
- Renders two short tables: 5 most recent referrals, 5 most recent surveys, with a "view all" link to the corresponding viewer page.

### 4.3 Referrals viewer — `src/app/admin/referrals/page.tsx`

- Server component. Fetches all referral rows from Excel via Graph.
- Renders a sortable table: Submitted At, Referrer Name, Referrer Email, Referral Name, Referral Email, Phone, Relationship, Note (truncated).
- Click a row → expands inline to show the full note.
- Top-right: "Export CSV" download button — generates a CSV server-side from the same data.
- Search box (client-side filter): filter rows by any text match.

### 4.4 Surveys viewer — `src/app/admin/surveys/page.tsx`

- Same shape as Referrals viewer but for surveys.
- Columns: Submitted At, Name (Q17), Email (Q18), Q1-Q3 averages (3 small bar charts), Q9 multi-select tags.
- Click a row → modal/drawer with the full 18-question response.
- Aggregate footer row: average Likert ratings across all responses; total responses.

### 4.5 Jobs CRUD — `src/app/admin/jobs/page.tsx` + `src/app/admin/jobs/[slug]/page.tsx`

- List view (`/admin/jobs`): shows all `Job` objects from KV. Columns: Title, Slug, Tags, Salary Display. Each row links to the edit page. Top-right: "+ New Job" button.
- Edit view (`/admin/jobs/[slug]`): form with all `Job` interface fields. On save, server action validates with a Zod schema mirroring `Job`, then calls `setJobs(...)` with the updated array.
- New Job: `/admin/jobs/new` route renders the same form pre-filled with empty defaults.
- Delete: button on the edit page with a confirm dialog.
- Slug uniqueness enforced server-side; slugs are immutable post-create to avoid breaking external links.

### 4.6 Live revalidation

After any admin write that affects public pages (only jobs, in this phase), call `revalidatePath("/careers")` so the public page re-renders within seconds without manual deploy.

---

## 5. Wire `/api/refer` and `/api/survey` to Graph API

**File: `src/app/api/refer/route.ts`** (modified — Phase 1 was a stub)
- Same Zod validation.
- On success: call `appendReferralRow({ ...parsed.data, submitted_at: new Date().toISOString(), ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? null })`.
- If Graph append fails: log to `console.error` AND fire a backup email via SendGrid (optional — can be no-op if SendGrid env not set, just console.error). Return 500 to the client so the form shows an error and the submitter is told to contact directly.
- If Graph append succeeds: return `{ ok: true }` as before.

**File: `src/app/api/survey/route.ts`** — same pattern with `appendSurveyRow`.

**No changes to client-side `SurveyForm.tsx` or `ReferralForm.tsx`.** This is the architectural payoff from Phase 1: the contract is the Zod schema, and Phase 2 only changes the server-side internals.

---

## 6. Wire `/careers` to KV-stored jobs

**File: `src/app/careers/page.tsx`** (modified)
- Currently imports the hardcoded `jobs` array from `src/lib/jobs.ts`. Switch to `await getJobs()`.
- Convert page to async server component if not already.
- The Phase 1 empty-state behavior already works — when KV returns `[]` the page renders the empty state.

**File: `src/app/careers/[slug]/page.tsx`** (modified)
- Switch from `getJob(slug)` synchronous to `await getJob(slug)` async.

---

## 7. Required external setup (user / IT)

These cannot be automated in code — Andrew or his M365 admin needs to do them once:

### 7.1 Azure AD app registration
1. Go to Azure portal → Microsoft Entra ID → App registrations → New registration
2. Name: `Whalen Website` (or similar)
3. Supported account types: "Accounts in this organizational directory only"
4. Redirect URI (Web): `https://whalen-financial-website.vercel.app/api/auth/callback/microsoft-entra-id` (and add `https://localhost:3000/api/auth/callback/microsoft-entra-id` for local dev)
5. After creation, in **API permissions** add:
   - **Delegated:** `User.Read` (already added by default)
   - **Application:** `Sites.Selected` (preferred — narrow scope) OR `Sites.ReadWrite.All` (broader, simpler)
   - Click **Grant admin consent**.
6. In **Certificates & secrets**, generate a new client secret. Copy the *value* (not the secret ID).
7. Send Andrew: `Application (client) ID`, `Directory (tenant) ID`, the client secret value.

### 7.2 SharePoint workbook
1. Create a new Excel workbook in a SharePoint site of your choice (e.g., the Whalen Marketing or Whalen Operations site).
2. Name: `Whalen Website Submissions.xlsx`.
3. Inside, create two tables (Insert → Table) with these column headers:
   - **Referrals** table: `Submitted At`, `Referrer Name`, `Referrer Email`, `Referral Name`, `Referral Email`, `Referral Phone`, `Relationship`, `Note`, `IP`
   - **Surveys** table: `Submitted At`, `Q1 Overall Onboarding`, `Q2 Communication`, `Q3 Responsiveness`, `Q4 Smooth vs Clunky`, `Q5 Explained Earlier`, `Q6 Advisors Considered`, `Q7 First Heard`, `Q8 Life Trigger`, `Q9 Mattered Most`, `Q10 Almost Stopped`, `Q11 Stand Out`, `Q12 Decision Confidence`, `Q13 One Sentence Describe`, `Q14 Searching Feelings`, `Q15 First 90 Days`, `Q16 Testimonial Consent`, `Q17 Name`, `Q18 Email`, `IP`
4. After saving the file, open it in **SharePoint Online** (browser) and copy the URL. Send to Andrew.
5. We extract the `site-id`, `drive-id`, and `file-id` via Graph Explorer or a one-off script — these become env vars.

### 7.3 If using `Sites.Selected` (recommended, narrow scope)
- After granting `Sites.Selected`, you must additionally grant the app *write* access to the specific site via Graph API or PowerShell:
  ```
  POST /sites/{site-id}/permissions
  { "roles": ["write"], "grantedToIdentities": [{ "application": { "id": "{client-id}", "displayName": "Whalen Website" }}] }
  ```
- This is a one-time call; instructions in implementation plan.

### 7.4 Vercel — KV add-on
1. Vercel project dashboard → Storage → Create Database → KV
2. Connect to the project; Vercel auto-injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` into prod + preview environments.
3. Pull locally with `vercel env pull .env.local`.

### 7.5 Vercel — environment variables
Add to Production + Preview (and to local `.env.local` for dev):
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `AUTH_MICROSOFT_ENTRA_ID_ID`
- `AUTH_MICROSOFT_ENTRA_ID_SECRET`
- `AUTH_MICROSOFT_ENTRA_ID_TENANT_ID`
- `GRAPH_CLIENT_ID` (same as `AUTH_MICROSOFT_ENTRA_ID_ID`)
- `GRAPH_CLIENT_SECRET` (same as `AUTH_MICROSOFT_ENTRA_ID_SECRET`)
- `GRAPH_TENANT_ID` (same as `AUTH_MICROSOFT_ENTRA_ID_TENANT_ID`)
- `SHAREPOINT_SITE_ID`
- `SHAREPOINT_DRIVE_ID`
- `SHAREPOINT_FILE_ID`
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` (auto-injected by KV add-on)

---

## 8. File-level changes summary

**New files:**
- `src/auth.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/app/admin/login/page.tsx`
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx` (dashboard)
- `src/app/admin/referrals/page.tsx`
- `src/app/admin/surveys/page.tsx`
- `src/app/admin/jobs/page.tsx`
- `src/app/admin/jobs/new/page.tsx`
- `src/app/admin/jobs/[slug]/page.tsx`
- `src/app/admin/_components/AdminHeader.tsx`
- `src/app/admin/_components/SignOutButton.tsx`
- `src/app/admin/_components/JobForm.tsx`
- `src/lib/graph/client.ts`
- `src/lib/graph/excel.ts`
- `src/lib/forms/job-schema.ts`
- `middleware.ts` (repo root)

**Modified files:**
- `src/app/api/refer/route.ts` — wire to `appendReferralRow`
- `src/app/api/survey/route.ts` — wire to `appendSurveyRow`
- `src/lib/jobs.ts` — add `getJobs`, `setJobs`, async `getJob`
- `src/app/careers/page.tsx` — async fetch from KV
- `src/app/careers/[slug]/page.tsx` — async fetch from KV (file path TBD during implementation)
- `package.json` — add `next-auth@5`, `@auth/core`, `@vercel/kv`

**Deleted files:** None.

**Untouched:**
- All Phase 1 work (Hero, Team, Nav, /portal, /welcome forms, Zod schemas)
- Keystatic CMS (still owns team + reviews)

---

## 9. Testing plan

Manual E2E tests after each phase commit, in this order:

1. **Auth flow:**
   - Visit `/admin` while logged out → redirected to `/admin/login`
   - Click "Sign in with Microsoft" → Microsoft OAuth screen → redirected back to `/admin`
   - Sign-in attempt with a non-`@whalenfinancial.com` account is blocked (403 / sign-in error)
   - Sign-out clears session and returns to `/`
2. **Form submission persistence:**
   - Submit a referral on `/welcome` → row appears in the SharePoint Excel `Referrals` table within 5 seconds
   - Submit a survey on `/welcome` → row appears in `Surveys` table
   - Open the Excel file in SharePoint browser view to verify
3. **Admin viewers:**
   - Log into `/admin` → dashboard shows correct counts matching the Excel rows
   - `/admin/referrals` lists all rows; CSV export downloads a valid file
   - `/admin/surveys` lists all rows with Q1-Q3 averages computed correctly
4. **Jobs CRUD:**
   - `/admin/jobs` shows empty state initially
   - Create a new posting via "+ New Job"; appears in list
   - Visit `/careers` (in another browser, logged out) → posting renders
   - Edit posting from `/admin/jobs/[slug]`; refresh `/careers` → updated copy
   - Delete posting; `/careers` empty-state returns
5. **Failure modes:**
   - With Graph API misconfigured (bad secret), submitting a form returns 500 and the form shows an error. SharePoint Excel does not get the row. Log shows the error.
   - KV add-on disconnected: admin jobs page shows a clear error rather than crashing.

No automated tests in Phase 2 — repo currently has none and adding a test framework remains out of scope. We rely on manual verification + Vercel preview deployments.

---

## 10. Phasing of implementation work

Phase 2 has more cross-cutting concerns than Phase 1 — auth gates everything, Graph API client is shared between persistence and viewers. Recommended implementation order, each shippable in isolation:

1. **Wave 1 — Auth scaffold (no functional admin yet):**
   - Add deps, `src/auth.ts`, `middleware.ts`, `/admin/login`, empty `/admin` placeholder page that just shows "You're signed in as {email}".
   - Verifiable: log in succeeds; non-Whalen emails blocked.
2. **Wave 2 — Graph API client + form persistence:**
   - `src/lib/graph/client.ts` + `src/lib/graph/excel.ts`.
   - Update `/api/refer` + `/api/survey` to call the new functions.
   - Verifiable: submitting forms writes rows to Excel.
3. **Wave 3 — Admin viewers:**
   - `/admin/referrals` and `/admin/surveys` reading rows from Graph; dashboard.
   - Verifiable: rows from Wave 2 appear in admin UI.
4. **Wave 4 — Jobs in KV:**
   - Add `@vercel/kv`, refactor `src/lib/jobs.ts`, wire `/careers`.
   - Verifiable: Careers page reads from KV (still empty).
5. **Wave 5 — Jobs CRUD admin:**
   - `/admin/jobs` list + new + edit + delete; `revalidatePath("/careers")`.
   - Verifiable: end-to-end create-job-then-see-on-careers flow.

Each wave is its own branch + PR off `phase2/admin-backend`, or all on one branch with separate commits per wave. Recommend separate commits, one branch.

---

## 11. Open items for implementation

These are blockers — Andrew (or his M365 admin) needs to provide them before the related wave can ship:

- [ ] Azure AD app — client ID, tenant ID, client secret (per §7.1)
- [ ] SharePoint site URL where the workbook lives, plus extracted `site-id`, `drive-id`, `file-id` (per §7.2)
- [ ] Vercel KV add-on enabled on the project (per §7.4)

Non-blocking content placeholders:
- [ ] Confirm portal support email (rolled over from Phase 1)
- [ ] Confirm Likert end-labels in survey UI (rolled over from Phase 1)
- [ ] Decide what columns to show by default in `/admin/surveys` table — the spec proposes Q17/Q18 + Q1-Q3 averages + Q9 tags, but Andrew may want different fields visible at the row level

---

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Graph API token expires mid-request and write fails silently | In-memory token cache refreshes 60s before expiry; failures bubble to 500 + error log |
| Concurrent form submissions race on the Excel file | Graph's `tables/{name}/rows/add` is atomic per row — no read-modify-write needed; concurrency is safe |
| Vercel KV downtime makes Careers page break | KV reads have a 5s timeout; on failure render the empty-state with a soft "Open positions are temporarily unavailable" inline banner instead of a 500 |
| Admin user accidentally deletes a posting | Confirm dialog on delete; recoverable via Vercel KV's history (data isn't versioned in app, but KV itself retains history) — consider adding a soft-delete flag in a future iteration |
| Azure AD app secret is leaked | Standard secret hygiene — store in Vercel env vars only, never in code or git; rotate quarterly |
| `Sites.ReadWrite.All` is too broad for compliance | Use `Sites.Selected` instead and grant access to one specific site (per §7.3) |

---

## 13. Phase 3 preview (not in scope of this spec)

Once Phase 2 ships and the Salesforce dev team returns credentials:

- Wire `/api/refer` to additionally push to Salesforce Web-to-Lead (or Connected App / jsforce if Web-to-Lead is unavailable). Same Zod payload, second persistence target. SharePoint Excel remains the compliance archive.
- Reconsider whether team + reviews content management migrates from Keystatic into the new admin (probably yes — one login surface).
- Consider adding an audit log table in the same SharePoint workbook capturing every admin write (who, when, what) once more than a couple of admins are using the system.
- Add automated tests (probably Playwright for E2E + Vitest for unit) to lock in behavior before scope grows further.
