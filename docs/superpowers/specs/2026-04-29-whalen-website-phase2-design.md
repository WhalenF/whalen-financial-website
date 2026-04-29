# Whalen Website — Phase 2 Design Spec

**Date:** 2026-04-29
**Status:** Draft — pending user review
**Revision:** 2026-04-29 — data layer switched from Microsoft Graph + SharePoint Excel + Vercel KV to Railway Postgres (Postgres.js). Section 2 fully rewritten; Section 3 simplified; Section 7 simplified; Section 8 file list updated; Section 5 wiring details updated.
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
2. **Railway Postgres data layer** persisting every survey + referral submission to a shared `referrals` and `surveys` table on a fresh database in the user's existing `elegant-stillness` Railway project, accessed via Postgres.js.
3. **Postgres `jobs` table** as the durable store for **job postings** — admin edits, Careers page reads.
4. **`/admin` backend pages**: dashboard (counts + recent activity), referrals viewer, surveys viewer, jobs CRUD.
5. **Wire `/api/refer` and `/api/survey`** to actually persist via Postgres (replacing the Phase 1 `console.log` stubs). The Zod schemas, route signatures, and form components remain unchanged across the boundary.
6. **Wire `/careers` page** to render jobs from the Postgres `jobs` table instead of the hardcoded empty array in `src/lib/jobs.ts`.

Out (deferred):
- Salesforce Web-to-Lead integration for referrals — pending the Salesforce dev team's reply with credentials. Once they reply, `/api/refer` adds a second persistence path (Postgres + Salesforce). No client-side changes needed at that point.
- Migration of team / reviews content from Keystatic into the new admin. Keystatic continues to manage those.
- Audit log of admin actions (who edited which job and when) — defer until the team grows beyond a handful of admins.
- File attachments on referral submissions.
- 2FA inside our app — we inherit MFA from the M365 tenant policy.

---

## Architecture overview

```
                  ┌─────────────────────────────────────────┐
                  │   Browser                               │
                  │   - /welcome (referral + survey forms)  │
                  │   - /careers (public job listings)      │
                  │   - /admin/* (gated)                    │
                  └────────┬────────────────┬───────────────┘
                           │                │
              public form POSTs       /admin/* requests
                           │                │
                           ▼                ▼
            ┌──────────────────────┐   ┌───────────────────────────┐
            │ /api/refer           │   │ NextAuth (delegated)      │
            │ /api/survey          │   │  - User.Read scope        │
            │ (route handlers)     │   │  - Microsoft Entra ID     │
            └──────────┬───────────┘   │    as OIDC provider only  │
                       │               └────────────┬──────────────┘
                       │                            │ session cookie
                       │                            ▼
                       │               ┌──────────────────────────┐
                       │               │ middleware.ts gate       │
                       │               │  - require session       │
                       │               │  - require @whalenfin    │
                       │               │    ancial.com email      │
                       │               └────────────┬─────────────┘
                       │                            │
                       │                            ▼
                       │               ┌──────────────────────────┐
                       │               │ /admin/...               │
                       │               │  - dashboard             │
                       │               │  - referrals viewer      │
                       │               │  - surveys viewer        │
                       │               │  - jobs CRUD             │
                       │               └────────────┬─────────────┘
                       │                            │
                       └────────────┬───────────────┘
                                    │
                                    ▼
                       ┌──────────────────────────┐
                       │ Postgres.js client       │
                       │ src/lib/db/client.ts     │
                       │  - DATABASE_URL          │
                       │  - prepare: false        │
                       └────────────┬─────────────┘
                                    │
                                    ▼
                       ┌──────────────────────────┐
                       │ Railway Postgres         │
                       │ (elegant-stillness)      │
                       │  ├─ referrals            │
                       │  ├─ surveys              │
                       │  └─ jobs                 │
                       └────────────┬─────────────┘
                                    ▲
                                    │ getJobs()
                       ┌────────────┴─────────────┐
                       │ /careers (public page)   │
                       │  - reads jobs table      │
                       └──────────────────────────┘
```

**Auth model:** Microsoft Entra ID is used purely as an OIDC identity provider for `/admin` sign-in. NextAuth requests only the delegated `User.Read` scope — enough to confirm identity and email. There is no application-level Graph permission, no client_credentials daemon, and no server-to-SharePoint path. All server-to-database writes go through Postgres.js using a single `DATABASE_URL` connection string. The Azure AD app registration therefore needs only the OIDC redirect URI plus the delegated `User.Read` scope.

---

## 1. Microsoft Entra ID auth (NextAuth)

**Library:** `next-auth@5` (Auth.js v5). v5 is the current stable line for Next 16 App Router.

**Auth model:** Entra ID is used purely as an OIDC identity provider for sign-in. We request only the delegated `User.Read` scope — enough to confirm identity and email. No application permissions are needed (no Graph daemon, no SharePoint writes). The Azure AD app registration is therefore minimal: redirect URI + `User.Read` delegated.

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

## 2. Postgres data layer

**Library:** `postgres` (Postgres.js) `^3.4.4`. Lightweight, no native deps, fast, and works cleanly with Vercel serverless functions.

**File: `src/lib/db/client.ts`**
- Postgres.js singleton, cached on `globalThis` for HMR safety in dev.
- Reads `DATABASE_URL` and throws a clear, actionable error if absent (so a misconfigured deploy fails loudly at boot rather than mysteriously at first query).
- Pool config: `max: 5` (Vercel serverless concurrency is low; large pools waste connections), `prepare: false` (Railway Postgres sits behind a PgBouncer transaction-mode pooler, which doesn't support prepared statements).
- Exports the `sql` tagged-template client.

**File: `src/lib/db/queries.ts`**
- All read/write functions for the data layer, deliberately mirroring the names from the previous Excel layer so callers don't change:
  - `appendReferralRow(row)` — `INSERT INTO referrals(...) VALUES (...)` returning the inserted row
  - `listReferralRows()` — `SELECT ... FROM referrals ORDER BY submitted_at DESC`
  - `appendSurveyRow(row)` — `INSERT INTO surveys(...) VALUES (...)` returning the inserted row
  - `listSurveyRows()` — `SELECT ... FROM surveys ORDER BY submitted_at DESC`
  - `getJobs()` — `SELECT data FROM jobs ORDER BY updated_at DESC`
  - `setJobs(jobs)` — atomic transaction: TRUNCATE `jobs` then INSERT each
  - `getJob(slug)` — single-row primary-key lookup
- Exported types: `ReferralRow`, `SurveyRow` (mirror the Zod-validated form payload shape plus `submitted_at` and `ip`).

**File: `migrations/001_init.sql`**
- DDL applied once to the Railway Postgres database. Schema summary:
  - `referrals` — id (PK, generated), submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(), ip TEXT, plus columns for each Zod-validated referral field (referrer name/email, referral name/email/phone, relationship, note). Index on `submitted_at DESC`.
  - `surveys` — id (PK, generated), submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(), ip TEXT, plus a column per Q1-Q18 response. Index on `submitted_at DESC`.
  - `jobs` — slug TEXT PRIMARY KEY, title TEXT NOT NULL, data JSONB NOT NULL (full `Job` shape), created_at / updated_at TIMESTAMPTZ NOT NULL DEFAULT now(). Index on `updated_at DESC`.

**Required env var:**
- `DATABASE_URL` — single Postgres connection string. Format: `postgresql://USER:PASS@HOST:PORT/DATABASE?sslmode=require`. Railway exposes this as a project variable on the Postgres service.

**Concurrency:** Postgres.js manages a per-connection pool internally. `INSERT` statements are atomic — no read-modify-write pattern is needed for form submissions. The `setJobs` operation uses `sql.begin(...)` to wrap TRUNCATE + per-row INSERT in a single transaction, so partial writes can't leave the table in an inconsistent state.

---

## 3. Jobs storage (Postgres `jobs` table)

**Schema:** the `jobs` table has four columns:
- `slug TEXT PRIMARY KEY` — queryable, also the public URL segment for `/careers/[slug]`
- `title TEXT NOT NULL` — extracted out of `data` so list views and search don't have to parse JSONB
- `data JSONB NOT NULL` — the full `Job` shape
- `created_at TIMESTAMPTZ NOT NULL DEFAULT now()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- Index on `updated_at DESC`.

**Why this design:** `slug` and `title` are promoted to first-class columns because they're the fields list views and lookups care about. Everything else lives in `data` JSONB so we don't need a schema migration each time the `Job` interface gains a field — the application is the source of truth for shape, the table is just a durable JSON store with indexable headers.

**Operations:**
- `getJobs()` — `SELECT data FROM jobs ORDER BY updated_at DESC` and returns the JSONB rows.
- `setJobs(jobs)` — wraps TRUNCATE + per-row INSERT in `sql.begin(...)` so the rewrite is atomic.
- `getJob(slug)` — single-row primary-key lookup.

**File: `src/lib/jobs.ts`** (modified)
- Keep the `Job` and `JobSection` interfaces (the canonical shape lives here, not in the DB layer).
- The storage functions are now re-exported from `@/lib/db/queries` so existing callers don't change import paths:
  - `export { getJobs, setJobs, getJob } from "@/lib/db/queries"`
- All callers in `src/app/careers/...` continue to await these as before.

**Required env var:**
- `DATABASE_URL` (same single connection string used for referrals and surveys).

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

- Server component. Fetches all referral rows from the Postgres `referrals` table via `listReferralRows()`.
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

- List view (`/admin/jobs`): shows all `Job` objects from the Postgres `jobs` table. Columns: Title, Slug, Tags, Salary Display. Each row links to the edit page. Top-right: "+ New Job" button.
- Edit view (`/admin/jobs/[slug]`): form with all `Job` interface fields. On save, server action validates with a Zod schema mirroring `Job`, then calls `setJobs(...)` with the updated array.
- New Job: `/admin/jobs/new` route renders the same form pre-filled with empty defaults.
- Delete: button on the edit page with a confirm dialog.
- Slug uniqueness enforced server-side; slugs are immutable post-create to avoid breaking external links.

### 4.6 Live revalidation

After any admin write that affects public pages (only jobs, in this phase), call `revalidatePath("/careers")` so the public page re-renders within seconds without manual deploy.

---

## 5. Wire `/api/refer` and `/api/survey` to Postgres

**File: `src/app/api/refer/route.ts`** (modified — Phase 1 was a stub)
- Same Zod validation.
- On success: call `appendReferralRow({ ...parsed.data, submitted_at: new Date().toISOString(), ip: req.headers.get("x-forwarded-for")?.split(",")[0] ?? null })`. `appendReferralRow` is imported from `@/lib/db/queries` (was previously `@/lib/graph/excel`).
- If the INSERT fails: log to `console.error` AND fire a backup email via SendGrid (optional — can be no-op if SendGrid env not set, just console.error). Return 500 to the client so the form shows the same user-facing error message ("Submission failed — please contact us directly") and the submitter is told to contact directly.
- If the INSERT succeeds: return `{ ok: true }` as before.

**File: `src/app/api/survey/route.ts`** — same pattern with `appendSurveyRow` from `@/lib/db/queries`.

**No changes to client-side `SurveyForm.tsx` or `ReferralForm.tsx`.** This is the architectural payoff from Phase 1: the contract is the Zod schema, and Phase 2 only changes the server-side internals. The route handler shape (request → validate → persist → respond) is also unchanged across the Excel→Postgres switch.

---

## 6. Wire `/careers` to Postgres-stored jobs

**File: `src/app/careers/page.tsx`** (modified)
- Currently imports the hardcoded `jobs` array from `src/lib/jobs.ts`. Switch to `await getJobs()` (re-exported from `@/lib/jobs`, backed by `@/lib/db/queries`).
- Convert page to async server component if not already.
- The Phase 1 empty-state behavior already works — when the `jobs` table is empty the page renders the empty state.

**File: `src/app/careers/[slug]/page.tsx`** (modified)
- Switch from `getJob(slug)` synchronous to `await getJob(slug)` async — same primary-key Postgres lookup under the hood.

---

## 7. Required external setup (user / IT)

These cannot be automated in code — Andrew or his M365 admin needs to do them once:

### 7.1 Azure AD app registration
1. Go to Azure portal → Microsoft Entra ID → App registrations → New registration
2. Name: `Whalen Website` (or similar)
3. Supported account types: "Accounts in this organizational directory only"
4. Redirect URI (Web): `https://whalen-financial-website.vercel.app/api/auth/callback/microsoft-entra-id` (and add `https://localhost:3000/api/auth/callback/microsoft-entra-id` for local dev)
5. After creation, in **API permissions** confirm only `User.Read` (Delegated) is present — it is already added by default. No application permissions are required (no `Sites.Selected`, no `Sites.ReadWrite.All`, no admin-consent grant for application scope).
6. In **Certificates & secrets**, generate a new client secret. Copy the *value* (not the secret ID).
7. Send Andrew: `Application (client) ID`, `Directory (tenant) ID`, the client secret value.

### 7.2 Railway Postgres database
On the user's existing `elegant-stillness` Railway project, click `New → Database → Add PostgreSQL`. Railway provisions a fresh database; copy the public connection string (the `DATABASE_URL` variable Railway exposes on the service). Apply `migrations/001_init.sql` once via `psql $DATABASE_URL < migrations/001_init.sql` or by pasting it into Railway's database query UI.

### 7.3 Vercel — environment variables
Add to Production + Preview (and to local `.env.local` for dev):
- `AUTH_SECRET` — generate with `openssl rand -base64 32`
- `AUTH_MICROSOFT_ENTRA_ID_ID`
- `AUTH_MICROSOFT_ENTRA_ID_SECRET`
- `AUTH_MICROSOFT_ENTRA_ID_TENANT_ID`
- `DATABASE_URL` — Railway Postgres connection string from §7.2

---

## 8. File-level changes summary

**New files added during Phase 2 (after the Postgres refactor):**
- `src/auth.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/app/admin/login/page.tsx`
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx` (dashboard)
- `src/app/admin/referrals/page.tsx`
- `src/app/admin/referrals/RowsTable.tsx`
- `src/app/admin/surveys/page.tsx`
- `src/app/admin/surveys/RowsTable.tsx`
- `src/app/admin/jobs/page.tsx`
- `src/app/admin/jobs/new/page.tsx`
- `src/app/admin/jobs/[slug]/page.tsx`
- `src/app/admin/jobs/actions.ts`
- `src/app/admin/_components/AdminHeader.tsx`
- `src/app/admin/_components/SignOutButton.tsx`
- `src/app/admin/_components/JobForm.tsx`
- `src/lib/db/client.ts`
- `src/lib/db/queries.ts`
- `src/lib/forms/job-schema.ts`
- `middleware.ts` (repo root)
- `migrations/001_init.sql`

**Modified files:**
- `src/app/api/refer/route.ts` — wire to `appendReferralRow`
- `src/app/api/survey/route.ts` — wire to `appendSurveyRow`
- `src/lib/jobs.ts` — re-export `getJobs`, `setJobs`, `getJob` from `@/lib/db/queries`
- `src/app/careers/page.tsx` — async fetch from Postgres
- `src/app/careers/[slug]/page.tsx` — async fetch from Postgres
- `package.json` — added `next-auth@5.0.0-beta.25`, `postgres@^3.4.4`

**Deleted files:** none from the original layout. (The Graph API files — `src/lib/graph/client.ts` and `src/lib/graph/excel.ts` — never landed on `main`; they existed only momentarily during the parallel-agent build before being replaced by the Postgres layer.)

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
   - Submit a referral on `/welcome` → row appears in the Postgres `referrals` table within 5 seconds
   - Submit a survey on `/welcome` → row appears in the `surveys` table
   - Verify via Railway's database query console or `psql $DATABASE_URL -c "SELECT * FROM referrals ORDER BY submitted_at DESC LIMIT 5;"`
3. **Admin viewers:**
   - Log into `/admin` → dashboard shows correct counts matching the Postgres rows
   - `/admin/referrals` lists all rows; CSV export downloads a valid file
   - `/admin/surveys` lists all rows with Q1-Q3 averages computed correctly
4. **Jobs CRUD:**
   - `/admin/jobs` shows empty state initially
   - Create a new posting via "+ New Job"; appears in list
   - Visit `/careers` (in another browser, logged out) → posting renders
   - Edit posting from `/admin/jobs/[slug]`; refresh `/careers` → updated copy
   - Delete posting; `/careers` empty-state returns
5. **Failure modes:**
   - With `DATABASE_URL` misconfigured (missing or invalid), submitting a form returns 500 and the form shows an error. No row is persisted. Log shows the error.
   - With Postgres unreachable from Vercel: admin pages show their "persistence not yet configured" notice rather than crashing.

No automated tests in Phase 2 — repo currently has none and adding a test framework remains out of scope. We rely on manual verification + Vercel preview deployments.

---

## 10. Phasing of implementation work

Phase 2 has more cross-cutting concerns than Phase 1 — auth gates everything, the Postgres data layer is shared between persistence and viewers. Recommended implementation order, each shippable in isolation:

1. **Wave 1 — Auth scaffold (no functional admin yet):**
   - Add deps, `src/auth.ts`, `middleware.ts`, `/admin/login`, empty `/admin` placeholder page that just shows "You're signed in as {email}".
   - Verifiable: log in succeeds; non-Whalen emails blocked.
2. **Wave 2 — Postgres data layer + form persistence:**
   - `src/lib/db/client.ts` + `src/lib/db/queries.ts` + `migrations/001_init.sql`.
   - Update `/api/refer` + `/api/survey` to call the new functions.
   - Verifiable: submitting forms writes rows to the Postgres `referrals` and `surveys` tables.
3. **Wave 3 — Admin viewers:**
   - `/admin/referrals` and `/admin/surveys` reading rows from Postgres; dashboard.
   - Verifiable: rows from Wave 2 appear in admin UI.
4. **Wave 4 — Jobs in Postgres:**
   - Re-export `getJobs`/`setJobs`/`getJob` from `@/lib/db/queries` through `src/lib/jobs.ts`, wire `/careers`.
   - Verifiable: Careers page reads from the `jobs` table (still empty).
5. **Wave 5 — Jobs CRUD admin:**
   - `/admin/jobs` list + new + edit + delete; `revalidatePath("/careers")`.
   - Verifiable: end-to-end create-job-then-see-on-careers flow.

Each wave is its own branch + PR off `phase2/admin-backend`, or all on one branch with separate commits per wave. Recommend separate commits, one branch.

---

## 11. Open items for implementation

These are blockers — Andrew (or his M365 admin) needs to provide them before the related wave can ship:

- [ ] Azure AD app — client ID, tenant ID, client secret (for NextAuth login only — `User.Read` delegated permission, per §7.1)
- [ ] Railway Postgres database — provisioned on the `elegant-stillness` project; `DATABASE_URL` connection string copied (per §7.2)
- [ ] Migration applied: `psql $DATABASE_URL < migrations/001_init.sql`
- [ ] Vercel env vars set: `AUTH_SECRET`, `AUTH_MICROSOFT_ENTRA_ID_*` (3 vars), `DATABASE_URL` (per §7.3)

Non-blocking content placeholders:
- [ ] Confirm portal support email (rolled over from Phase 1)
- [ ] Confirm Likert end-labels in survey UI (rolled over from Phase 1)
- [ ] Decide what columns to show by default in `/admin/surveys` table — the spec proposes Q17/Q18 + Q1-Q3 averages + Q9 tags, but Andrew may want different fields visible at the row level

---

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Postgres connection drops mid-request | Postgres.js has built-in retry/reconnect logic; `prepare: false` keeps statements PgBouncer-compatible so transaction-mode pooling doesn't break under load |
| Concurrent form submissions | Postgres `INSERT` is atomic per statement — no read-modify-write needed; concurrency is safe |
| Railway Postgres downtime makes Careers page break | DB reads have a 5s timeout; on failure render the empty-state with a soft "Open positions are temporarily unavailable" inline banner instead of a 500 |
| Admin user accidentally deletes a posting | Confirm dialog on delete; recoverable via Railway's daily database backups — consider adding a soft-delete flag in a future iteration |
| Azure AD app secret is leaked | Standard secret hygiene — store in Vercel env vars only, never in code or git; rotate quarterly |

---

## 13. Phase 3 preview (not in scope of this spec)

Once Phase 2 ships and the Salesforce dev team returns credentials:

- Wire `/api/refer` to additionally push to Salesforce Web-to-Lead (or Connected App / jsforce if Web-to-Lead is unavailable). Same Zod payload, second persistence target alongside the Postgres `referrals` table, which remains the compliance archive.
- Reconsider whether team + reviews content management migrates from Keystatic into the new admin (probably yes — one login surface).
- Consider adding an audit log table in Postgres capturing every admin write (who, when, what) once more than a couple of admins are using the system.
- Add automated tests (probably Playwright for E2E + Vitest for unit) to lock in behavior before scope grows further.
