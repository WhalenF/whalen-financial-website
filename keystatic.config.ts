import { config, fields, singleton } from "@keystatic/core";

const storage =
  process.env.NODE_ENV === "production"
    ? ({
        kind: "github" as const,
        repo: {
          owner: "WhalenF",
          name: "whalen-financial-website",
        },
      } as const)
    : ({ kind: "local" } as const);

export default config({
  storage,
  ui: {
    brand: { name: "Whalen Financial" },
  },
  singletons: {
    reviews: singleton({
      label: "Client Reviews",
      path: "content/reviews",
      format: { data: "json" },
      schema: {
        reviews: fields.array(
          fields.object({
            text: fields.text({ label: "Review Text", multiline: true }),
            name: fields.text({ label: "Reviewer Name" }),
            initials: fields.text({ label: "Initials (2 letters)" }),
            location: fields.text({ label: "Location (e.g. Client, Las Vegas)" }),
          }),
          {
            label: "Reviews",
            itemLabel: (props) => props.fields.name.value || "Review",
          }
        ),
      },
    }),
    team: singleton({
      label: "Team Members",
      path: "content/team",
      format: { data: "json" },
      schema: {
        members: fields.array(
          fields.object({
            name: fields.text({ label: "Full Name" }),
            role: fields.text({ label: "Job Title" }),
            dept: fields.select({
              label: "Department",
              options: [
                { label: "Leadership", value: "Leadership" },
                { label: "Advisory", value: "Advisory" },
                { label: "Client Services", value: "Client Services" },
                { label: "Operations", value: "Operations" },
                { label: "Tax", value: "Tax" },
              ],
              defaultValue: "Leadership",
            }),
            bio: fields.text({ label: "Bio", multiline: true }),
            photo: fields.text({ label: "Photo path (e.g. /team/name.png)" }),
          }),
          {
            label: "Members",
            itemLabel: (props) => props.fields.name.value || "Team Member",
          }
        ),
      },
    }),
  },
});
