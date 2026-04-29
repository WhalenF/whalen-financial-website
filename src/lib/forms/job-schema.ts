import { z } from "zod";

/**
 * Zod schema mirroring the `Job` and `JobSection` interfaces from `src/lib/jobs.ts`.
 * Used by the admin Jobs CRUD server actions to validate form input before persisting
 * to Vercel KV.
 */

export const jobSectionSchema = z.object({
  title: z.string().min(1, "Section title is required"),
  items: z.array(z.string()),
});

export const jobSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug may only contain lowercase letters, numbers, and hyphens",
    ),
  title: z.string().min(1, "Title is required"),
  tags: z.array(z.string()),
  summary: z.string(),
  intro: z.string(),
  introPoints: z.array(z.string()),
  introFooter: z.string(),
  responsibilities: z.array(jobSectionSchema),
  notThis: z.array(z.string()),
  notThisFooter: z.string(),
  required: z.array(z.string()),
  preferred: z.array(z.string()),
  salaryDisplay: z.string(),
  salaryLabel: z.string(),
  bonusTitle: z.string(),
  bonusBody: z.string(),
  benefits: z.array(z.string()),
  applySubject: z.string(),
});

export type JobInput = z.infer<typeof jobSchema>;
export type JobSectionInput = z.infer<typeof jobSectionSchema>;
