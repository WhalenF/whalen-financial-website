import { kv } from "@vercel/kv";

export interface JobSection {
  title: string;
  items: string[];
}

export interface Job {
  slug: string;
  title: string;
  tags: string[];
  summary: string;
  intro: string;
  introPoints: string[];
  introFooter: string;
  responsibilities: JobSection[];
  notThis: string[];
  notThisFooter: string;
  required: string[];
  preferred: string[];
  salaryDisplay: string;
  salaryLabel: string;
  bonusTitle: string;
  bonusBody: string;
  benefits: string[];
  applySubject: string;
}

const KEY = "jobs:list" as const;

export async function getJobs(): Promise<Job[]> {
  try {
    const value = await kv.get<Job[]>(KEY);
    return value ?? [];
  } catch (err) {
    console.warn("[jobs] KV read failed:", err);
    return [];
  }
}

export async function setJobs(jobs: Job[]): Promise<void> {
  await kv.set(KEY, jobs);
}

export async function getJob(slug: string): Promise<Job | undefined> {
  const all = await getJobs();
  return all.find((j) => j.slug === slug);
}
