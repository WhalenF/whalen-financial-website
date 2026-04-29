/**
 * SharePoint Excel persistence for the Phase 2 form-submission pipeline.
 *
 * Reads/writes the `Referrals` and `Surveys` tables in the workbook identified
 * by the SHAREPOINT_* environment variables. The column orders below are
 * authoritative and match Section 7.2 of the Phase 2 design spec — changing
 * either side without the other will silently corrupt the workbook.
 *
 * Spec: docs/superpowers/specs/2026-04-29-whalen-website-phase2-design.md §2 + §7.2.
 */

import type { ReferralPayload, SurveyPayload } from "@/lib/forms/schemas";
import { graphFetch } from "@/lib/graph/client";

// ─── Types ──────────────────────────────────────────────────────────────

export type ReferralRow = ReferralPayload & {
  submitted_at: string;
  ip: string | null;
};

export type SurveyRow = SurveyPayload & {
  submitted_at: string;
  ip: string | null;
};

// Graph's row payload — `values` is a 2D array (one row per index 0).
// `unknown` here is deliberate: cells can be string | number | boolean | null
// and we coerce per-column when reading.
interface GraphRow {
  values: unknown[][];
}

interface GraphRowsResponse {
  value: GraphRow[];
  "@odata.nextLink"?: string;
}

// ─── Env helpers ────────────────────────────────────────────────────────

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Excel persistence cannot operate without it.`,
    );
  }
  return value;
}

function tablePath(tableName: "Referrals" | "Surveys"): string {
  const siteId = requireEnv("SHAREPOINT_SITE_ID");
  const driveId = requireEnv("SHAREPOINT_DRIVE_ID");
  const fileId = requireEnv("SHAREPOINT_FILE_ID");
  return `/sites/${siteId}/drives/${driveId}/items/${fileId}/workbook/tables/${tableName}`;
}

// ─── Cell coercion ──────────────────────────────────────────────────────

function cellToString(cell: unknown): string {
  if (cell === null || cell === undefined) return "";
  if (typeof cell === "string") return cell;
  return String(cell);
}

function cellToOptionalString(cell: unknown): string | undefined {
  const s = cellToString(cell);
  return s === "" ? undefined : s;
}

function cellToNullableString(cell: unknown): string | null {
  const s = cellToString(cell);
  return s === "" ? null : s;
}

function cellToLikert(cell: unknown): 1 | 2 | 3 | 4 | 5 {
  const n = typeof cell === "number" ? cell : parseInt(cellToString(cell), 10);
  if (n >= 1 && n <= 5) return n as 1 | 2 | 3 | 4 | 5;
  // Fallback to mid-scale rather than throwing — the spreadsheet is the
  // source of truth and we don't want a single corrupt row to crash the
  // admin viewer.
  return 3;
}

function cellToOptionalLikert(cell: unknown): 1 | 2 | 3 | 4 | 5 | undefined {
  if (cell === null || cell === undefined || cell === "") return undefined;
  return cellToLikert(cell);
}

// ─── Pagination ─────────────────────────────────────────────────────────

async function fetchAllRows(tableName: "Referrals" | "Surveys"): Promise<unknown[][]> {
  const rows: unknown[][] = [];
  let nextPath: string | null = `${tablePath(tableName)}/rows`;

  while (nextPath) {
    const response: Response = await graphFetch(nextPath);
    const data = (await response.json()) as GraphRowsResponse;
    for (const row of data.value) {
      // Each row has a single inner array at index 0.
      if (Array.isArray(row.values) && row.values.length > 0) {
        rows.push(row.values[0]);
      }
    }
    nextPath = data["@odata.nextLink"] ?? null;
  }

  return rows;
}

// ─── Referrals ──────────────────────────────────────────────────────────
//
// Column order (per spec §7.2):
//   0  Submitted At
//   1  Referrer Name
//   2  Referrer Email
//   3  Referral Name
//   4  Referral Email
//   5  Referral Phone
//   6  Relationship
//   7  Note
//   8  IP

export async function appendReferralRow(row: ReferralRow): Promise<void> {
  const values: (string | number)[][] = [
    [
      row.submitted_at,
      row.name,
      row.email,
      row.referral_name,
      row.referral_email,
      row.referral_phone ?? "",
      row.relationship,
      row.note ?? "",
      row.ip ?? "",
    ],
  ];

  await graphFetch(`${tablePath("Referrals")}/rows/add`, {
    method: "POST",
    body: JSON.stringify({ values }),
  });
}

export async function listReferralRows(): Promise<ReferralRow[]> {
  const rows = await fetchAllRows("Referrals");
  return rows.map((cells) => {
    const relationshipRaw = cellToString(cells[6]);
    const relationship: ReferralRow["relationship"] =
      relationshipRaw === "Family" ||
      relationshipRaw === "Friend" ||
      relationshipRaw === "Colleague" ||
      relationshipRaw === "Other"
        ? relationshipRaw
        : "Other";

    return {
      submitted_at: cellToString(cells[0]),
      name: cellToString(cells[1]),
      email: cellToString(cells[2]),
      referral_name: cellToString(cells[3]),
      referral_email: cellToString(cells[4]),
      referral_phone: cellToOptionalString(cells[5]),
      relationship,
      note: cellToOptionalString(cells[7]),
      ip: cellToNullableString(cells[8]),
    };
  });
}

// ─── Surveys ────────────────────────────────────────────────────────────
//
// Column order (per spec §7.2):
//   0  Submitted At
//   1  Q1 Overall Onboarding (likert)
//   2  Q2 Communication (likert)
//   3  Q3 Responsiveness (likert)
//   4  Q4 Smooth vs Clunky
//   5  Q5 Explained Earlier
//   6  Q6 Advisors Considered
//   7  Q7 First Heard
//   8  Q8 Life Trigger
//   9  Q9 Mattered Most (multi-select, joined with ", ")
//   10 Q10 Almost Stopped
//   11 Q11 Stand Out
//   12 Q12 Decision Confidence (optional likert)
//   13 Q13 One Sentence Describe
//   14 Q14 Searching Feelings
//   15 Q15 First 90 Days
//   16 Q16 Testimonial Consent
//   17 Q17 Name
//   18 Q18 Email
//   19 IP

export async function appendSurveyRow(row: SurveyRow): Promise<void> {
  const q9Joined = row.q9_mattered_most ? row.q9_mattered_most.join(", ") : "";
  const q12Value: string | number =
    typeof row.q12_decision_confidence === "number"
      ? row.q12_decision_confidence
      : "";

  const values: (string | number)[][] = [
    [
      row.submitted_at,
      row.q1_overall_onboarding,
      row.q2_communication_clarity,
      row.q3_responsiveness,
      row.q4_smooth_vs_clunky ?? "",
      row.q5_explained_earlier ?? "",
      row.q6_advisors_considered ?? "",
      row.q7_first_heard ?? "",
      row.q8_life_trigger ?? "",
      q9Joined,
      row.q10_almost_stopped ?? "",
      row.q11_stand_out ?? "",
      q12Value,
      row.q13_one_sentence_describe ?? "",
      row.q14_searching_feelings ?? "",
      row.q15_first_90_days ?? "",
      row.q16_testimonial_consent ?? "",
      row.q17_name ?? "",
      row.q18_email ?? "",
      row.ip ?? "",
    ],
  ];

  await graphFetch(`${tablePath("Surveys")}/rows/add`, {
    method: "POST",
    body: JSON.stringify({ values }),
  });
}

export async function listSurveyRows(): Promise<SurveyRow[]> {
  const rows = await fetchAllRows("Surveys");
  return rows.map((cells) => {
    const q9Raw = cellToString(cells[9]);
    const q9Array = q9Raw === ""
      ? undefined
      : q9Raw.split(",").map((s) => s.trim()).filter((s) => s !== "");

    return {
      submitted_at: cellToString(cells[0]),
      q1_overall_onboarding: cellToLikert(cells[1]),
      q2_communication_clarity: cellToLikert(cells[2]),
      q3_responsiveness: cellToLikert(cells[3]),
      q4_smooth_vs_clunky: cellToOptionalString(cells[4]),
      q5_explained_earlier: cellToOptionalString(cells[5]),
      q6_advisors_considered: cellToOptionalString(cells[6]),
      q7_first_heard: cellToOptionalString(cells[7]),
      q8_life_trigger: cellToOptionalString(cells[8]),
      q9_mattered_most: q9Array,
      q10_almost_stopped: cellToOptionalString(cells[10]),
      q11_stand_out: cellToOptionalString(cells[11]),
      q12_decision_confidence: cellToOptionalLikert(cells[12]),
      q13_one_sentence_describe: cellToOptionalString(cells[13]),
      q14_searching_feelings: cellToOptionalString(cells[14]),
      q15_first_90_days: cellToOptionalString(cells[15]),
      q16_testimonial_consent: cellToOptionalString(cells[16]),
      q17_name: cellToOptionalString(cells[17]),
      q18_email: cellToOptionalString(cells[18]),
      ip: cellToNullableString(cells[19]),
    };
  });
}
