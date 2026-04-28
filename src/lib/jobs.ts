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

export const jobs: Job[] = [];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
