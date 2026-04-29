/**
 * Job posting types — shared by the public Careers page, the admin CRUD
 * surface, and the database queries module. The actual persistence
 * functions (`getJobs` / `setJobs` / `getJob`) live in `@/lib/db/queries`
 * and are re-exported here so existing call sites keep working.
 */

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

export { getJobs, setJobs, getJob } from "@/lib/db/queries";
