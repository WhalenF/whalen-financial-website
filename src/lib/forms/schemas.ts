import { z } from "zod";

/**
 * Single source of truth for /welcome form validation.
 * Imported by both the client-side form components and the server route handlers.
 */

// ─── Survey ─────────────────────────────────────────────────────────────

const likert = z.number().int().min(1).max(5);

export const surveySchema = z.object({
  // Section 1 — Onboarding Experience
  q1_overall_onboarding: likert,
  q2_communication_clarity: likert,
  q3_responsiveness: likert,
  q4_smooth_vs_clunky: z.string().optional(),
  q5_explained_earlier: z.string().optional(),

  // Section 2 — Why You Chose Whalen
  q6_advisors_considered: z.string().optional(),
  q7_first_heard: z.string().optional(),
  q8_life_trigger: z.string().optional(),
  q9_mattered_most: z.array(z.string()).max(3).optional(),
  q10_almost_stopped: z.string().optional(),
  q11_stand_out: z.string().optional(),
  q12_decision_confidence: likert.optional(),
  q13_one_sentence_describe: z.string().optional(),

  // Section 3 — Open-Ended Reflections (all optional)
  q14_searching_feelings: z.string().optional(),
  q15_first_90_days: z.string().optional(),
  q16_testimonial_consent: z.string().optional(),
  q17_name: z.string().optional(),
  q18_email: z.string().email().optional().or(z.literal("")),
});

export type SurveyPayload = z.infer<typeof surveySchema>;

// ─── Referral ───────────────────────────────────────────────────────────

export const referralSchema = z.object({
  name: z.string().min(1, "Your name is required"),
  email: z.string().email("Please enter a valid email"),
  referral_name: z.string().min(1, "Referral's name is required"),
  referral_email: z.string().email("Please enter a valid email for your referral"),
  referral_phone: z.string().optional(),
  relationship: z.union([
    z.literal("Family"),
    z.literal("Friend"),
    z.literal("Colleague"),
    z.literal("Other"),
  ]),
  note: z.string().optional(),
});

export type ReferralPayload = z.infer<typeof referralSchema>;
