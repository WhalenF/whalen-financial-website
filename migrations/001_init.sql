-- Whalen Financial Website — Phase 2 Railway Postgres init

CREATE TABLE IF NOT EXISTS referrals (
  id BIGSERIAL PRIMARY KEY,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  referral_name TEXT NOT NULL,
  referral_email TEXT NOT NULL,
  referral_phone TEXT,
  relationship TEXT NOT NULL CHECK (relationship IN ('Family', 'Friend', 'Colleague', 'Other')),
  note TEXT
);

CREATE INDEX IF NOT EXISTS referrals_submitted_at_idx ON referrals (submitted_at DESC);

CREATE TABLE IF NOT EXISTS surveys (
  id BIGSERIAL PRIMARY KEY,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip TEXT,
  q1_overall_onboarding SMALLINT NOT NULL CHECK (q1_overall_onboarding BETWEEN 1 AND 5),
  q2_communication_clarity SMALLINT NOT NULL CHECK (q2_communication_clarity BETWEEN 1 AND 5),
  q3_responsiveness SMALLINT NOT NULL CHECK (q3_responsiveness BETWEEN 1 AND 5),
  q4_smooth_vs_clunky TEXT,
  q5_explained_earlier TEXT,
  q6_advisors_considered TEXT,
  q7_first_heard TEXT,
  q8_life_trigger TEXT,
  q9_mattered_most TEXT[],
  q10_almost_stopped TEXT,
  q11_stand_out TEXT,
  q12_decision_confidence SMALLINT CHECK (q12_decision_confidence BETWEEN 1 AND 5),
  q13_one_sentence_describe TEXT,
  q14_searching_feelings TEXT,
  q15_first_90_days TEXT,
  q16_testimonial_consent TEXT,
  q17_name TEXT,
  q18_email TEXT
);

CREATE INDEX IF NOT EXISTS surveys_submitted_at_idx ON surveys (submitted_at DESC);

CREATE TABLE IF NOT EXISTS jobs (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS jobs_updated_at_idx ON jobs (updated_at DESC);
