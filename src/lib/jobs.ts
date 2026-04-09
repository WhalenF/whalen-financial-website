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

export const jobs: Job[] = [
  {
    slug: "director-of-operations",
    title: "Director of Operations",
    tags: ["Full-Time", "Remote", "$130K – $160K Base", "Las Vegas, NV (or Remote)"],
    summary: "A hands-on leadership role for someone who thrives on execution, accountability, and building structure in a fast-growing firm.",
    intro: "This is a hands-on leadership role focused on execution, accountability, and operational excellence. You will work directly with the Founder to:",
    introPoints: [
      "Translate strategic ideas into actionable plans",
      "Drive team performance and accountability",
      "Improve systems, processes, and communication across the firm",
    ],
    introFooter: "This role is ideal for someone who thrives in a fast-paced environment, enjoys building structure, and wants to play a key role in scaling a growing firm.",
    responsibilities: [
      {
        title: "Leadership & Execution",
        items: [
          "Run weekly team meetings and ensure alignment across departments",
          "Translate firm goals into clear priorities, timelines, and deliverables",
          "Hold team members accountable to goals and performance standards",
          "Track and report on key business metrics (growth, efficiency, retention)",
          "Serve as the central point of coordination across the firm",
        ],
      },
      {
        title: "Operational Management",
        items: [
          "Improve and document internal processes to increase efficiency",
          "Oversee day-to-day operations to ensure nothing falls through the cracks",
          "Identify bottlenecks and implement solutions",
          "Ensure smooth communication between departments",
        ],
      },
      {
        title: "People & Culture",
        items: [
          "Conduct quarterly employee check-ins focused on performance and development",
          "Support hiring, onboarding, and team structure planning",
          "Help build a high-performance, accountable team culture",
        ],
      },
      {
        title: "Strategic Execution",
        items: [
          "Partner with the Founder to execute growth initiatives",
          "Drive implementation of new systems, processes, and firm initiatives",
          "Ensure strategic projects are completed on time and at a high level",
        ],
      },
    ],
    notThis: [
      "Not a purely administrative role",
      "Not a compliance-only position",
      'Not a passive "project manager"',
    ],
    notThisFooter: "This is a builder and operator role — you will be expected to lead, execute, and drive results.",
    required: [
      "5+ years in wealth management, operations, or leadership",
      "Strong organizational and execution skills",
      "Proven ability to manage multiple priorities",
      "Excellent communication and leadership abilities",
      "High level of ownership and accountability",
    ],
    preferred: [
      "Experience in financial services or wealth management",
      "Familiarity with operational systems and process improvement",
      "Experience in a growing or entrepreneurial environment",
    ],
    salaryDisplay: "$130K – $160K",
    salaryLabel: "Competitive Base Salary",
    bonusTitle: "Performance Bonus",
    bonusBody: "Tied to firm growth and operational success, with potential for future equity participation.",
    benefits: ["401(k) + Matching", "Health Insurance", "Dental & Vision", "Paid Time Off", "Parental Leave", "Relocation Assistance"],
    applySubject: "Director of Operations Application",
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
