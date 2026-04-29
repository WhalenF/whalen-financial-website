# Whalen Website — Phase 1 Design Spec

**Date:** 2026-04-29
**Status:** Draft — pending user review
**Repo:** `WhalenF/whalen-financial-website`
**Stack:** Next.js 16.2.2, React 19, TypeScript, Tailwind v4, Keystatic CMS, Vercel
**Author:** Andrew Whalen + Claude

## Goal

Ship a demo-ready set of changes to the public Whalen Financial website that the team can show today. Phase 1 covers everything visible to visitors. Persistent storage, authentication, and the admin backend are deferred to Phase 2.

## Scope

In:
1. Remove the `AndrewInterview` section from the homepage.
2. Replace the Hero's YouTube background iframe with a self-hosted MP4 that loops reliably.
3. Rebuild the Team section as a uniform 7-column × 2-row grid (no Leadership-featured row).
4. Add a `/portal` landing page that links existing clients into the Whalen-branded Orion login URL.
5. Add a `/welcome` landing page containing a feedback survey + a referral form. Forms POST to API routes that **acknowledge but do not yet persist** — the data sink is wired in Phase 2.
6. Add a "Client Login" link to the top Nav opening `/portal` (or directly to Orion — see open question below).

Out (deferred to Phase 2):
- Microsoft Entra ID auth via NextAuth
- Microsoft Graph API integration writing submissions to SharePoint Excel
- `/admin` backend (referrals viewer, surveys viewer, jobs CRUD)
- Salesforce referral integration
- Any persistent submission storage (Phase 1 logs to console only)

---

## 1. Remove `AndrewInterview` section

**Current:** `src/components/AndrewInterview.tsx` is a 600px-wide YouTube iframe (video ID `WXynoZta9UI`) rendered between Hero and TrustBar in `src/app/page.tsx:18`.

**Change:**
- Delete `src/components/AndrewInterview.tsx`.
- Remove its import and usage from `src/app/page.tsx`.
- New homepage flow: Nav → Hero → TrustBar → Services → MoneyPrism → Comparison → Pledge → WhyWhalen → Team → Reviews → ClientExperience → Book → CTA → Footer.

**Risk:** Low. No other component references `AndrewInterview`.

---

## 2. Hero background video — self-hosted MP4 with reliable loop

**Current problem:** `src/components/Hero.tsx:42-58` embeds the same YouTube video as a background using an iframe with `&loop=1&playlist=WXynoZta9UI`. YouTube's loop flag is unreliable — when the player throttles (backgrounded tab, low-power mode, mobile autoplay restrictions), looping silently stops.

**Change:**
- Replace the `<iframe>` with a native `<video>` element using attributes `autoPlay`, `loop`, `muted`, `playsInline`, `preload="auto"`, sized to cover the section like the iframe did.
- Source: `/public/hero-bg.mp4` — placed by Andrew; we expect ≤8 MB, ~1080p (1920×1080), H.264 encoding for broadest browser support, no audio track.
- Optional `poster="/hero-bg-poster.jpg"` (single-frame still) to avoid a black flash before the video starts; drop in if the asset is provided, otherwise omit.
- Keep the existing dark gradient overlay and radial glow on top — both already render in `zIndex: 1` above the video container.
- Drop the YouTube iframe entirely and the `WXynoZta9UI` ID reference from this component.

**Fallback when MP4 is missing:** If `/public/hero-bg.mp4` is not present at build time, the `<video>` element will simply render no source and the hero falls back to the existing solid `#0a1829` background — no error, no broken layout. Andrew can drop the file in and redeploy when ready. Implementation should not block on the asset being committed.

**Sizing:** Use `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center` on the `<video>`. This keeps the video filling the section regardless of viewport ratio, mirroring what the YouTube iframe was approximating with `width: 177.78vh; height: 100vh`.

**Browser support:** `<video autoPlay muted loop playsInline>` is bulletproof on all modern browsers and iOS Safari (the `muted` and `playsInline` attributes are required for iOS autoplay).

**Risk:** Low. The fallback to the existing solid color makes this safe even if the asset is missing.

---

## 3. Team grid — uniform 7-column × 2-row layout

**Current:** `src/components/Team.tsx` splits the 14 team members into two layouts — Leadership (Andrew + Kim) get a featured 2-column row with oversized 220px-wide photos at the top, and the remaining 12 sit in a 4-column grid below with `aspectRatio: 4/5` photos. After the recent high-res photo upgrade, photos render visually too large.

**Change:**
- Drop the Leadership-featured row entirely. All 14 members render in one uniform grid.
- Desktop: `gridTemplateColumns: "repeat(7, 1fr)"` — produces 2 perfectly even rows of 7 cards.
- Each card: same shape as the existing 4-col card (image with `aspectRatio: 4/5`, name, role, click to expand bio).
- Tablet breakpoint (`max-width: 1100px`): collapse to 4 columns. Wraps to 4 rows (4+4+4+2).
- Mobile breakpoint (`max-width: 640px`): 2 columns. Wraps to 7 rows.
- Order: keep current array order from `content/team.json` (Andrew first, Kim second, then everyone else). Leadership entries no longer get visual special-casing but their natural array position keeps Andrew + Kim at the top of the grid.
- Card typography: keep current sizes (`fontSize: 20` for name, `fontSize: 11` for role). At ~190px desktop card width, a single-line name still fits; if any specific name wraps awkwardly, we'll adjust during implementation review.
- Remove the special `leadership-row`, `leader-card`, and related styles from the component-level `<style>` block.

**Verification target:** On a 1440px-wide desktop, each card should render at ~190px wide (down from ~330px in the old 4-col layout for non-leadership, and down significantly from the old leadership cards). Visually achieves the "~50% smaller" the user asked for.

**Risk:** Low-medium. Need to verify name typography doesn't squash at 190px during implementation; mitigation is a small font-size reduction for `.team-grid` cards if needed.

---

## 4. `/portal` page — Whalen Portal landing

**Purpose:** A branded landing page existing clients can be sent to that links them into Whalen's Orion-hosted client portal.

**Route:** `/portal` (`src/app/portal/page.tsx`)

**Target URL the page links out to:**
`https://login.orionadvisor.com/login.html?g=2c1efb79-1e0c-4d35-913a-81c5ce4a58b0`

The `g=` query parameter is Whalen Financial's firm/group GUID, which routes the client into the Whalen-branded Orion experience.

**Layout:**
- Reuse `Nav` and `Footer` so the page feels native to the site.
- Hero band styled consistent with the homepage Hero (navy background, white type, teal accent).
  - Eyebrow: `WHALEN PORTAL`
  - Headline: `Your wealth, at your fingertips.` (italic accent on "at your fingertips" matching homepage style)
  - Subhead: short paragraph (~2 sentences) about secure account access — what they'll see when they log in (balances, performance reporting, statements, secure messaging — pending Andrew's confirmation of exact features in implementation).
  - Primary CTA button: `Log in to the Whalen Portal` — opens the Orion URL in a new tab (`target="_blank" rel="noopener"`).
  - Secondary CTA: `Need help? Contact us` — `mailto:` to a Whalen support address (placeholder `clientservices@whalenfinancial.com` — confirm during implementation).
- Below the hero band: a 3-up trust strip listing what clients can do in the portal (View balances · Track performance · Access statements). Styled like the existing `Pledge` component's stat row for visual consistency.
- Below the trust strip: optional FAQ section ("First time logging in?" / "Forgot your password?" / "Need to set up MFA?") — copy supplied at implementation time, or omitted if Andrew prefers a leaner page.

**Open question to resolve in implementation:** confirm support email address, and confirm portal feature list copy.

**SEO:** No-index this page (`<meta name="robots" content="noindex">`) — it's a utility page for existing clients, not a marketing page.

**Risk:** Low.

---

## 5. `/welcome` page — Survey + Referral landing for new clients

**Purpose:** A page team members can send to newly-onboarded clients. Captures (a) onboarding feedback + competitive intel via a survey, and (b) referrals via a separate form.

**Route:** `/welcome` (`src/app/welcome/page.tsx`)

**Discoverability:** Not in Nav. Link-only. Team sends the URL directly via email.

**SEO:** `<meta name="robots" content="noindex">`.

### 5.1 Page structure

In render order:

1. `Nav`
2. Welcome Hero band:
   - Eyebrow: `WELCOME TO WHALEN`
   - Headline: `Glad to have you with us.` (italic accent on "with us")
   - Subhead: short paragraph thanking them and setting expectation: "Two short things — your feedback shapes how we welcome the next person who joins us, and there's a place at the bottom to refer anyone you think we should meet."
3. Survey section (5.2)
4. Visual divider + section header: `Know someone who should meet us?`
5. Referral form (5.3)
6. Social follow strip (5.4)
7. `Footer`

### 5.2 Survey section

The survey is one form on the page. All fields visible at once (no multi-step) to maximize completion rate. Submit button at the bottom.

**Question structure (18 questions, 3 sections):**

**Section 1 — Onboarding Experience (5 questions)**
1. How would you rate your overall onboarding experience so far? — Likert 1–5
2. How clear and easy to understand was our communication during onboarding? — Likert 1–5
3. How responsive was your advisor and the Whalen team to your questions? — Likert 1–5
4. Which parts of getting started felt smoothest, and which felt clunky or confusing? — Long text
5. Is there anything we should have explained earlier or in more detail? — Short text

**Section 2 — Why You Chose Whalen (8 questions)**
6. Before deciding on Whalen, how many other RIAs or financial advisors did you seriously consider? — Multi-choice: Just Whalen / 1 other / 2–3 others / 4+ others
7. How did you first hear about Whalen Financial? — Multi-choice: Referral from friend or family / Referral from another professional (CPA, attorney, etc.) / Google or web search / Social media / Podcast or media appearance / Event or seminar / Other
8. What was happening in your life that triggered the search for a new advisor? — Long text **(marketing intel)**
9. Which of the following mattered most when choosing us? (pick up to 3) — Multi-select: Personal connection with advisor / Investment philosophy / Fees and pricing transparency / Credentials and expertise / Firm reputation / Tech and reporting tools / Communication style / Specific service (tax, estate, retirement) / Recommendation from someone I trust
10. What almost stopped you from moving forward with Whalen? — Long text **(marketing intel)**
11. If you compared us to other firms, what made Whalen stand out? — Long text **(marketing intel)**
12. How confident did you feel in your decision the day you signed on? — Likert 1–5
13. In one sentence, how would you describe Whalen to a friend who's looking for an advisor? — Short text

**Section 3 — Open-Ended Reflections (4 questions, all optional, "Optional" badge visible)**
14. Take us back to when you were searching — what were you feeling, worrying about, or hoping to find in an advisor? — Long text **(marketing intel)**
15. Is there anything we could improve to make new clients feel even more confident in their first 90 days? — Long text
16. May we share your feedback (anonymously or attributed) as a testimonial? — Multi-choice: Yes, with my name / Yes, anonymously / Not at this time
17. Your name — Short text, optional
18. Your email — Email, optional

**Required vs optional:**
- Q1, Q2, Q3 (Likert ratings) required.
- Q4 through Q13 optional — encourage but don't gate submission.
- Section 3 entirely optional (Q14–Q18).

**Submit behavior:**
- Form submits to `POST /api/survey`.
- Endpoint validates basic shape with Zod, logs the payload to `console.log` (Phase 1), returns `{ ok: true }`.
- On success, page replaces the form area with a thank-you panel: *"Thank you — your feedback genuinely shapes how we welcome the next person who walks through our door. Your advisor will see this, and we appreciate you taking the time."*
- On error: inline error message above the submit button, form values preserved.

### 5.3 Referral form

Smaller form, separate from the survey. Renders below survey thank-you / above social follow strip.

**Fields:**
- Your name (the existing client) — short text, required
- Your email — email, required
- Referral's name — short text, required
- Referral's email — email, required
- Referral's phone — tel, optional
- Relationship — short text or single-line picklist (Family / Friend / Colleague / Other), required
- A short note about why you think they'd be a good fit for Whalen — long text, optional

**Submit behavior:**
- Form submits to `POST /api/refer`.
- Endpoint validates with Zod, logs to `console.log` (Phase 1), returns `{ ok: true }`.
- On success, replace the form with: *"Thank you — we've got it. We'll reach out to [Referral's first name] within the week and let you know how it goes."*

**Phase 2 hookup:** This same `/api/refer` endpoint will be extended in Phase 2 to write a row to the `Referrals` table in `Whalen Website Submissions.xlsx` via Microsoft Graph API. Phase 1 logs only.

### 5.4 Social follow strip

Below the referral form. Three icon links (LinkedIn, Facebook, Instagram), each opening in a new tab. TikTok omitted — agent research found no Whalen Financial TikTok account; flagged for Andrew to confirm/add later.

URLs:
- LinkedIn: `https://www.linkedin.com/company/whalen-financial`
- Facebook: `https://www.facebook.com/WhalenFinancial/`
- Instagram: `https://www.instagram.com/whalenfinancial/`

Visual: small section with eyebrow `STAY CONNECTED`, headline `Follow us`, three brand-color circular icon buttons.

---

## 6. Top Nav — "Client Login" link

`Nav.tsx` currently renders 6 anchor links (Services / Money Prism / Why Whalen / Our Team / Client Experience / The Book) followed by a "Schedule a Call" CTA button on desktop, and the same set in the mobile hamburger menu.

**Change:** Add a "Client Login →" link as a new `<li>` in both menus.

- **Desktop:** Insert as the 7th item, immediately *before* the "Schedule a Call" button. Styled identically to the other nav anchor links (`fontSize: 11.5`, uppercase, `letterSpacing: .09em`, `rgba(255,255,255,.72)` color, hover to `#0099CC`). Trailing `→` glyph after the label.
- **Mobile:** Insert in the mobile menu list immediately before the "Schedule a Call" button. Match the existing mobile anchor styling.
- Link target: `Link href="/portal"` (same-tab navigation; the `/portal` page itself opens Orion in a new tab via its primary CTA).

**Why a link, not a button:** Visual weight matters — the Calendly "Schedule a Call" CTA is the firm's primary conversion goal. "Client Login" must be discoverable to existing clients without competing with the prospect-facing CTA.

---

## 7. API routes (Phase 1 stubs)

Two new App Router route handlers:

- `src/app/api/survey/route.ts` — `POST` handler, accepts JSON, validates with Zod, `console.log`s payload, returns `{ ok: true }`. Returns 400 on validation failure.
- `src/app/api/refer/route.ts` — same pattern.

Validation schemas live in `src/lib/forms/schemas.ts` (new file) and are imported by both the route handlers and the client-side form components — single source of truth.

**Phase 2 will replace `console.log` with Microsoft Graph API calls** to append rows to the SharePoint Excel workbook. The Zod schemas, route signatures, and form components stay unchanged across the boundary.

---

## Architecture / Data Flow (Phase 1)

```
Browser
  └── /welcome
        ├── Survey form        ──POST──> /api/survey  ──> console.log + 200 OK
        └── Referral form      ──POST──> /api/refer   ──> console.log + 200 OK
  └── /portal
        └── Login button       ──opens new tab──> https://login.orionadvisor.com/login.html?g=2c1efb79-...
  └── Nav.tsx
        └── "Client Login →"   ──same tab──> /portal
```

No persistent storage. No auth. No external services beyond Vercel's hosting and the existing Keystatic CMS (untouched in Phase 1).

---

## File-level changes summary

**New files:**
- `src/app/portal/page.tsx`
- `src/app/welcome/page.tsx`
- `src/app/welcome/SurveyForm.tsx` (client component)
- `src/app/welcome/ReferralForm.tsx` (client component)
- `src/app/welcome/SocialStrip.tsx`
- `src/app/api/survey/route.ts`
- `src/app/api/refer/route.ts`
- `src/lib/forms/schemas.ts`
- `public/hero-bg.mp4` (provided by Andrew, may land later)

**Modified files:**
- `src/app/page.tsx` — remove `AndrewInterview` import + usage
- `src/components/Hero.tsx` — replace YouTube iframe with `<video>` tag
- `src/components/Team.tsx` — collapse Leadership-featured row, switch to uniform 7-col grid
- `src/components/Nav.tsx` — add "Client Login →" link

**Deleted files:**
- `src/components/AndrewInterview.tsx`

**Untouched:**
- `keystatic.config.ts`, `content/team.json`, `content/reviews.json`, `src/lib/jobs.ts` — all Phase 2 territory

---

## Testing plan (Phase 1)

Manual smoke tests on `npm run dev` before merging:

1. Homepage renders with no `AndrewInterview` between Hero and TrustBar.
2. Hero background shows the MP4 looping if the asset is in `public/`; falls back to solid navy if absent.
3. Team section shows 14 cards in 2 rows of 7 on desktop; collapses correctly at tablet and mobile breakpoints.
4. `/portal` renders with Whalen branding; "Log in to the Whalen Portal" button opens `https://login.orionadvisor.com/login.html?g=2c1efb79-1e0c-4d35-913a-81c5ce4a58b0` in a new tab.
5. `/welcome` renders. Survey submits — thank-you panel appears, server console shows the logged payload. Referral form submits — thank-you panel appears, server console shows the logged payload. Validation errors render inline when required fields are missing.
6. Top Nav "Client Login →" navigates to `/portal`.
7. No regressions on existing pages (`/`, `/careers`, `/disclosures`, `/keystatic`).

No automated tests in Phase 1 — repo currently has none and adding a test framework is out of scope.

---

## Open items for implementation

- `/public/hero-bg.mp4` (and optional poster) source asset — Andrew to drop in repo or supply
- Portal page support email address (placeholder: `clientservices@whalenfinancial.com`)
- Portal feature list copy (what specifically to highlight in the trust strip)
- Whether to include a portal FAQ section or keep the page lean

These are content decisions, not blocking architecture decisions — implementation can use the placeholders above and Andrew can refine in a content pass.

---

## Phase 2 preview (not in scope of this spec)

To prevent rework, Phase 1 was designed so Phase 2 is purely additive:

- Microsoft Entra ID + NextAuth login at `/admin/login`
- Microsoft Graph API integration: replaces `console.log` in `/api/survey` and `/api/refer` with `appendRow` calls to `Whalen Website Submissions.xlsx` in SharePoint
- `/admin` pages: `/admin/referrals`, `/admin/surveys`, `/admin/jobs`
- Jobs CRUD in `/admin/jobs` writes to Vercel Postgres (or KV); `/careers` page reads from same source
- Salesforce wire-up (Web-to-Lead) once the Salesforce dev team returns credentials per the message Andrew sent

Phase 2 will get its own design spec when Phase 1 is shipping.
