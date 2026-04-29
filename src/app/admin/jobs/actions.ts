"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getJobs, setJobs } from "@/lib/jobs";
import { jobSchema, type JobInput } from "@/lib/forms/job-schema";

export type SaveJobResult =
  | { ok: true }
  | {
      ok: false;
      errors: Record<string, string[]>;
      message?: string;
    };

/**
 * Validate and persist a Job. On success the user is redirected to /admin/jobs;
 * `redirect` throws internally so this function does not return on the happy path.
 *
 * mode === "create"  → enforces slug uniqueness, appends to the list.
 * mode === "edit"    → finds the job by `originalSlug` (defaults to `input.slug`,
 *                      because slugs are immutable post-create) and replaces it.
 */
export async function saveJob(
  input: unknown,
  mode: "create" | "edit",
  originalSlug?: string,
): Promise<SaveJobResult> {
  const parsed = jobSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      message: "Please fix the errors below.",
    };
  }

  const job: JobInput = parsed.data;

  let current: JobInput[];
  try {
    current = (await getJobs()) as JobInput[];
  } catch (err) {
    console.error("[admin/jobs] getJobs failed:", err);
    return {
      ok: false,
      errors: {},
      message:
        "Job storage is not configured. Set DATABASE_URL to your Railway Postgres connection string.",
    };
  }

  let next: JobInput[];
  if (mode === "create") {
    if (current.some((j) => j.slug === job.slug)) {
      return {
        ok: false,
        errors: { slug: ["A job with this slug already exists."] },
        message: "Slug must be unique.",
      };
    }
    next = [...current, job];
  } else {
    const lookup = originalSlug ?? job.slug;
    const idx = current.findIndex((j) => j.slug === lookup);
    if (idx === -1) {
      return {
        ok: false,
        errors: { slug: ["Original posting not found."] },
        message: "Could not find the posting to update.",
      };
    }
    // Slugs are immutable post-create — keep the original slug regardless of input.
    next = current.slice();
    next[idx] = { ...job, slug: lookup };
  }

  try {
    await setJobs(next);
  } catch (err) {
    console.error("[admin/jobs] setJobs failed:", err);
    return {
      ok: false,
      errors: {},
      message: "Failed to save. Please try again.",
    };
  }

  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
  redirect("/admin/jobs");
}

/**
 * Remove a job by slug.
 */
export async function deleteJob(slug: string): Promise<void> {
  let current: JobInput[] = [];
  try {
    current = (await getJobs()) as JobInput[];
  } catch (err) {
    console.error("[admin/jobs] getJobs failed:", err);
    revalidatePath("/admin/jobs");
    redirect("/admin/jobs");
  }

  const next = current.filter((j) => j.slug !== slug);

  try {
    await setJobs(next);
  } catch (err) {
    console.error("[admin/jobs] setJobs failed:", err);
  }

  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
  redirect("/admin/jobs");
}
