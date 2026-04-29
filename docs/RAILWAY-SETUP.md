# Railway Setup Runbook — Whalen Financial Website

## 1. Overview

This runbook walks you through wiring the Whalen Financial website (Next.js, deployed on Vercel) to a fresh PostgreSQL database hosted on Railway. The database stores form submissions (`referrals`, `surveys`) and `jobs` postings managed from the `/admin` dashboard.

We are provisioning a **new, dedicated Postgres service** inside the existing `elegant-stillness` Railway project. We are intentionally **not** reusing the existing `pgvector-db` service (that one belongs to AvatarEngine and holds prospect data — website data must stay isolated). Once the database is up and the migration is applied, a single `DATABASE_URL` environment variable on Vercel feeds the website. That's the whole wiring story.

---

## 2. What you'll need before starting

- [ ] Access to the existing `elegant-stillness` Railway project (project ID `cc408123-6820-4a15-942b-f930a158a03b`). Andrew already has this — sign in at https://railway.app.
- [ ] Owner or admin access to the Vercel project for `whalen-financial-website` (deployed at https://whalen-financial-website.vercel.app).
- [ ] An Azure AD / Microsoft Entra ID admin who can create an app registration for NextAuth sign-in. This is a separate one-time task — see Step 4.
- [ ] **One of:**
  - A working `psql` install on your machine (Windows: `scoop install postgresql`, or download from https://www.postgresql.org/download/windows/), **or**
  - The Railway CLI (already installed at `C:/Users/CSA 1/railway-cli/railway.exe` on Andrew's box), **or**
  - You can skip both and use Railway's in-dashboard query console (Path A in Step 2).
- [ ] A copy of the website repo locally so you can read `migrations/001_init.sql`. Repo: `WhalenF/whalen-financial-website` (public, on GitHub).

---

## 3. Step 1 — Provision a new Postgres database on Railway

1. Open https://railway.app and select the `elegant-stillness` project.
2. Click **`+ New`** (top right) → **`Database`** → **`Add PostgreSQL`**.
3. Wait ~30 seconds. A new service named `Postgres` will appear in the project canvas.
4. **Rename the service** so it's not confused with `pgvector-db`:
   - Click into the new service → **Settings** tab → **Service Name** → change `Postgres` to `whalen-website-db` → **Update**.
5. Click into `whalen-website-db` → **Variables** tab.
6. Find **`DATABASE_URL`** and click the eye icon to reveal it, then copy the value. It will look like:
   ```
   postgresql://postgres:LONGPASSWORD@trolley.proxy.rlwy.net:NNNNN/railway?sslmode=require
   ```
   Save this somewhere temporary — you'll paste it into Vercel in Step 3.

**Important — public proxy vs internal:** Railway exposes two URLs.
- Internal: `postgres.railway.internal:5432` — works only between services inside Railway's private network. Vercel **cannot** reach this.
- Public proxy: `*.proxy.rlwy.net:NNNNN` (typically `trolley.proxy.rlwy.net`) — this is what Vercel needs.

Confirm the hostname in your copied `DATABASE_URL` is a `*.proxy.rlwy.net` domain. If it shows `railway.internal`, you grabbed the wrong variable — use the one labeled `DATABASE_PUBLIC_URL` instead, or find it under the **Connect** tab → **Public Network**.

---

## 4. Step 2 — Apply the migration

The website repo includes `migrations/001_init.sql`, which creates the three tables: `referrals`, `surveys`, `jobs`. Pick whichever path is easier.

### Path A — Railway dashboard query console (no install required)

1. In Railway, click into `whalen-website-db` → **Data** tab.
2. Click **Query** to open the SQL console.
3. Open `migrations/001_init.sql` from the repo, copy its entire contents, paste into the console.
4. Click **Run** (or press Ctrl+Enter).
5. You should see "Query executed successfully" with no errors.

### Path B — `psql` from your terminal

From the website repo root:

```bash
psql "$DATABASE_URL" < migrations/001_init.sql
```

On Windows PowerShell, set the env var first:

```powershell
$env:DATABASE_URL = "postgresql://postgres:...@trolley.proxy.rlwy.net:NNNNN/railway?sslmode=require"
psql $env:DATABASE_URL -f migrations/001_init.sql
```

Or, via Railway CLI (must be linked to the new service first with `railway link`):

```bash
railway run psql $DATABASE_URL -f migrations/001_init.sql
```

### Verify the migration ran

In the Railway query console (or `psql`), run:

```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

You should see all three: `referrals`, `surveys`, `jobs`. If you only see one or two, re-run the migration. If you see none, check the console for error output (often a permissions or syntax issue copy-pasted incorrectly).

In `psql` you can also run `\d referrals` to inspect the column layout.

---

## 5. Step 3 — Set `DATABASE_URL` on Vercel

1. Open https://vercel.com → select the `whalen-financial-website` project.
2. Go to **Settings** → **Environment Variables**.
3. Click **Add New**.
   - **Key:** `DATABASE_URL`
   - **Value:** the public-proxy URL you copied in Step 1.
   - **Environments:** check all three — **Production**, **Preview**, **Development**.
4. Click **Save**.
5. Vercel will automatically use the new value on the next deployment. To force a redeploy now: **Deployments** tab → click the latest deployment's `...` menu → **Redeploy**.

---

## 6. Step 4 — Set up the Azure AD app for `/admin` login

The `/admin` dashboard uses NextAuth with the Microsoft Entra ID provider. If your Azure admin hasn't already created the app registration, here's what they need to do (high-level — full Microsoft docs at https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app):

**For the Azure / M365 admin:**

1. Sign in to https://entra.microsoft.com as a tenant admin.
2. **App registrations** → **New registration**.
   - Name: `Whalen Financial Website — Admin Auth` (or similar).
   - Supported account types: **Single tenant** (this org only) is fine.
   - Redirect URI: **Web** → `https://whalen-financial-website.vercel.app/api/auth/callback/microsoft-entra-id`
3. After creation, add a second redirect URI for local dev:
   - **Authentication** → **Add URI** → `http://localhost:3000/api/auth/callback/microsoft-entra-id` → **Save**.
4. **API permissions** → **Add a permission** → **Microsoft Graph** → **Delegated** → check **`User.Read`** → **Add permissions** → **Grant admin consent**.
5. **Certificates & secrets** → **Client secrets** → **New client secret**. Set expiry to 24 months. Copy the **Value** immediately (it's only shown once).
6. From the app's **Overview** page, copy:
   - **Application (client) ID**
   - **Directory (tenant) ID**

Send Andrew (securely — password manager, not email):

| Vercel env var name              | What it maps to                  |
|----------------------------------|----------------------------------|
| `AUTH_MICROSOFT_ENTRA_ID_ID`     | Application (client) ID          |
| `AUTH_MICROSOFT_ENTRA_ID_SECRET` | Client secret **Value** (not ID) |
| `AUTH_MICROSOFT_ENTRA_ID_TENANT_ID` | Directory (tenant) ID         |

**Andrew also needs to set `AUTH_SECRET`** on Vercel — this is a random string NextAuth uses to sign session JWTs. Generate it locally:

```bash
openssl rand -base64 32
```

(or in PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))`)

Add it to Vercel the same way as `DATABASE_URL` (all three environments).

---

## 7. Step 5 — Verify end-to-end

After Vercel redeploys with the new env vars:

- [ ] Visit https://whalen-financial-website.vercel.app/welcome → fill out and submit the survey form.
- [ ] In Railway, run `SELECT * FROM surveys ORDER BY submitted_at DESC LIMIT 5;` — your submission should be the top row.
- [ ] Submit the referral form on the site → check `SELECT * FROM referrals ORDER BY submitted_at DESC LIMIT 5;`.
- [ ] Visit `/admin/login` → sign in with your `@whalenfinancial.com` Microsoft account → you should land on `/admin` and see non-zero counts.
- [ ] Visit `/admin/jobs` → create a test job posting → visit `/careers` → confirm the posting renders.
- [ ] Delete the test job posting from `/admin/jobs` once verified.

If all six pass, you're live.

---

## 8. Troubleshooting

| Symptom                                                              | Likely cause / fix                                                                                                                    |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Vercel runtime logs show `Set DATABASE_URL`                          | Env var missing or scoped to the wrong environment. Re-check Step 3 — make sure all three (Production / Preview / Development) are ticked. |
| Site loads but `/admin` says "persistence not yet configured"        | Migration didn't run, OR `DATABASE_URL` points at a database without the tables. Re-run Step 2 against the same DB Vercel is using.   |
| Microsoft sign-in returns "Access denied"                            | The signed-in account isn't `@whalenfinancial.com`. This is by design — see allow-list in `src/auth.ts` to broaden if needed.         |
| Form submit returns "Submission failed — please contact us directly" | Check Vercel runtime logs. Most common cause: `DATABASE_URL` uses the **internal** hostname (`postgres.railway.internal`) instead of the public proxy. Must be `*.proxy.rlwy.net`. |
| `psql` gives `SSL connection required`                               | Add `?sslmode=require` to the end of the URL (Railway's value already includes it — check you copied the whole string).               |
| Sign-in loops back to login page                                     | `AUTH_SECRET` missing or different between Production and Preview. Set the same value in all three environments and redeploy.        |

---

## 9. Backups & retention

- Railway Postgres has automatic daily backups by default. Retention depends on the Railway plan — check **Settings** → **Backups** on the `whalen-website-db` service for current schedule and retention window.
- For SEC / compliance record retention (referrals contain PII), check with Whalen Financial's compliance officer for the required retention bar. Setting up a long-term archive (S3, etc.) is **out of scope** for this runbook.
- **Manual backup on demand:**
  - Dashboard: `whalen-website-db` → **Settings** → **Backups** → **Create Backup**.
  - CLI: `pg_dump "$DATABASE_URL" > backup-$(date +%Y%m%d).sql` (run from a machine with `psql`/`pg_dump` installed and `DATABASE_URL` set).
- **Restore from a manual dump:** `psql "$DATABASE_URL" < backup-YYYYMMDD.sql` (against an empty target DB).

---

## Appendix — Required Vercel environment variables (full list)

| Name                                | Source                                  | Set in Step |
|-------------------------------------|-----------------------------------------|-------------|
| `DATABASE_URL`                      | Railway `whalen-website-db` public URL  | 3           |
| `AUTH_SECRET`                       | `openssl rand -base64 32`               | 4           |
| `AUTH_MICROSOFT_ENTRA_ID_ID`        | Azure app — Application (client) ID     | 4           |
| `AUTH_MICROSOFT_ENTRA_ID_SECRET`    | Azure app — client secret **Value**     | 4           |
| `AUTH_MICROSOFT_ENTRA_ID_TENANT_ID` | Azure app — Directory (tenant) ID       | 4           |

All five must be set in **Production**, **Preview**, and **Development**.
