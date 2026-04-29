/**
 * Railway Postgres queries for the Phase 2 form-submission pipeline and
 * the Wave 4/5 jobs CRUD. Public export names match the previous Graph
 * (`appendReferralRow` / `listReferralRows` / `appendSurveyRow` /
 * `listSurveyRows`) and KV (`getJobs` / `setJobs` / `getJob`) modules so
 * callers only changed import paths, not call sites.
 */

import { sql } from "./client";
import type { ReferralPayload, SurveyPayload } from "@/lib/forms/schemas";
import type { Job } from "@/lib/jobs";

// ─── Types ──────────────────────────────────────────────────────────────

export type ReferralRow = ReferralPayload & {
  id: number;
  submitted_at: string;
  ip: string | null;
};

export type SurveyRow = SurveyPayload & {
  id: number;
  submitted_at: string;
  ip: string | null;
};

// Internal row shape returned by Postgres.js for the surveys SELECT — the
// `submitted_at` column comes back as a `Date` instance.
interface SurveyDbRow extends Omit<SurveyPayload, "q9_mattered_most"> {
  id: number;
  submitted_at: Date;
  ip: string | null;
  q9_mattered_most: string[] | null;
}

interface ReferralDbRow extends ReferralPayload {
  id: number;
  submitted_at: Date;
  ip: string | null;
}

// ─── Referrals ──────────────────────────────────────────────────────────

export async function appendReferralRow(
  row: Omit<ReferralRow, "id" | "submitted_at"> & { ip: string | null },
): Promise<void> {
  await sql`
    INSERT INTO referrals (
      ip,
      name,
      email,
      referral_name,
      referral_email,
      referral_phone,
      relationship,
      note
    ) VALUES (
      ${row.ip},
      ${row.name},
      ${row.email},
      ${row.referral_name},
      ${row.referral_email},
      ${row.referral_phone ?? null},
      ${row.relationship},
      ${row.note ?? null}
    )
  `;
}

export async function listReferralRows(): Promise<ReferralRow[]> {
  const rows = await sql<ReferralDbRow[]>`
    SELECT
      id,
      submitted_at,
      ip,
      name,
      email,
      referral_name,
      referral_email,
      referral_phone,
      relationship,
      note
    FROM referrals
    ORDER BY submitted_at DESC
  `;

  return rows.map((r) => ({
    id: r.id,
    submitted_at: r.submitted_at.toISOString(),
    ip: r.ip,
    name: r.name,
    email: r.email,
    referral_name: r.referral_name,
    referral_email: r.referral_email,
    referral_phone: r.referral_phone ?? undefined,
    relationship: r.relationship,
    note: r.note ?? undefined,
  }));
}

// ─── Surveys ────────────────────────────────────────────────────────────

export async function appendSurveyRow(
  row: Omit<SurveyRow, "id" | "submitted_at"> & { ip: string | null },
): Promise<void> {
  await sql`
    INSERT INTO surveys (
      ip,
      q1_overall_onboarding,
      q2_communication_clarity,
      q3_responsiveness,
      q4_smooth_vs_clunky,
      q5_explained_earlier,
      q6_advisors_considered,
      q7_first_heard,
      q8_life_trigger,
      q9_mattered_most,
      q10_almost_stopped,
      q11_stand_out,
      q12_decision_confidence,
      q13_one_sentence_describe,
      q14_searching_feelings,
      q15_first_90_days,
      q16_testimonial_consent,
      q17_name,
      q18_email
    ) VALUES (
      ${row.ip},
      ${row.q1_overall_onboarding},
      ${row.q2_communication_clarity},
      ${row.q3_responsiveness},
      ${row.q4_smooth_vs_clunky ?? null},
      ${row.q5_explained_earlier ?? null},
      ${row.q6_advisors_considered ?? null},
      ${row.q7_first_heard ?? null},
      ${row.q8_life_trigger ?? null},
      ${row.q9_mattered_most ?? []},
      ${row.q10_almost_stopped ?? null},
      ${row.q11_stand_out ?? null},
      ${row.q12_decision_confidence ?? null},
      ${row.q13_one_sentence_describe ?? null},
      ${row.q14_searching_feelings ?? null},
      ${row.q15_first_90_days ?? null},
      ${row.q16_testimonial_consent ?? null},
      ${row.q17_name ?? null},
      ${row.q18_email ?? null}
    )
  `;
}

export async function listSurveyRows(): Promise<SurveyRow[]> {
  const rows = await sql<SurveyDbRow[]>`
    SELECT
      id,
      submitted_at,
      ip,
      q1_overall_onboarding,
      q2_communication_clarity,
      q3_responsiveness,
      q4_smooth_vs_clunky,
      q5_explained_earlier,
      q6_advisors_considered,
      q7_first_heard,
      q8_life_trigger,
      q9_mattered_most,
      q10_almost_stopped,
      q11_stand_out,
      q12_decision_confidence,
      q13_one_sentence_describe,
      q14_searching_feelings,
      q15_first_90_days,
      q16_testimonial_consent,
      q17_name,
      q18_email
    FROM surveys
    ORDER BY submitted_at DESC
  `;

  return rows.map((r) => ({
    id: r.id,
    submitted_at: r.submitted_at.toISOString(),
    ip: r.ip,
    q1_overall_onboarding: r.q1_overall_onboarding,
    q2_communication_clarity: r.q2_communication_clarity,
    q3_responsiveness: r.q3_responsiveness,
    q4_smooth_vs_clunky: r.q4_smooth_vs_clunky ?? undefined,
    q5_explained_earlier: r.q5_explained_earlier ?? undefined,
    q6_advisors_considered: r.q6_advisors_considered ?? undefined,
    q7_first_heard: r.q7_first_heard ?? undefined,
    q8_life_trigger: r.q8_life_trigger ?? undefined,
    q9_mattered_most:
      r.q9_mattered_most && r.q9_mattered_most.length > 0
        ? r.q9_mattered_most
        : undefined,
    q10_almost_stopped: r.q10_almost_stopped ?? undefined,
    q11_stand_out: r.q11_stand_out ?? undefined,
    q12_decision_confidence: r.q12_decision_confidence ?? undefined,
    q13_one_sentence_describe: r.q13_one_sentence_describe ?? undefined,
    q14_searching_feelings: r.q14_searching_feelings ?? undefined,
    q15_first_90_days: r.q15_first_90_days ?? undefined,
    q16_testimonial_consent: r.q16_testimonial_consent ?? undefined,
    q17_name: r.q17_name ?? undefined,
    q18_email: r.q18_email ?? undefined,
  }));
}

// ─── Jobs ───────────────────────────────────────────────────────────────

interface JobDbRow {
  data: Job;
}

/**
 * Read all jobs ordered by most-recently-updated. Returns `[]` (and logs)
 * if the database is unreachable so the public Careers page does not 500.
 */
export async function getJobs(): Promise<Job[]> {
  try {
    const rows = await sql<JobDbRow[]>`
      SELECT data FROM jobs ORDER BY updated_at DESC
    `;
    return rows.map((r) => r.data);
  } catch (err) {
    console.warn("[jobs] postgres read failed:", err);
    return [];
  }
}

/**
 * Replace the entire jobs collection in a single transaction. Volume is low
 * (handful of postings, single admin writer) so truncate-then-insert keeps
 * the call site identical to the previous KV API without needing diffing.
 */
export async function setJobs(jobs: Job[]): Promise<void> {
  await sql.begin(async (tx) => {
    await tx`TRUNCATE jobs`;
    if (jobs.length === 0) return;
    for (const j of jobs) {
      await tx`
        INSERT INTO jobs (slug, title, data)
        VALUES (${j.slug}, ${j.title}, ${tx.json(j)})
      `;
    }
  });
}

export async function getJob(slug: string): Promise<Job | undefined> {
  const rows = await sql<JobDbRow[]>`
    SELECT data FROM jobs WHERE slug = ${slug} LIMIT 1
  `;
  return rows[0]?.data;
}
