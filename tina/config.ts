import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "master",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "reviews",
        label: "Client Reviews",
        path: "content",
        match: { include: "reviews" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "reviews",
            label: "Reviews",
            list: true,
            ui: {
              itemProps: (item: { name?: string }) => ({
                label: item?.name || "New Review",
              }),
            },
            fields: [
              {
                type: "string",
                name: "text",
                label: "Review Text",
                required: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "name",
                label: "Reviewer Name",
                required: true,
              },
              {
                type: "string",
                name: "initials",
                label: "Initials (2 letters)",
              },
              {
                type: "string",
                name: "location",
                label: "Location (e.g. Client, Las Vegas)",
              },
            ],
          },
        ],
      },
      {
        name: "team",
        label: "Team Members",
        path: "content",
        match: { include: "team" },
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "members",
            label: "Team Members",
            list: true,
            ui: {
              itemProps: (item: { name?: string }) => ({
                label: item?.name || "Team Member",
              }),
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Full Name",
                required: true,
              },
              {
                type: "string",
                name: "role",
                label: "Job Title",
                required: true,
              },
              {
                type: "string",
                name: "dept",
                label: "Department",
                ui: {
                  component: "select",
                },
                options: ["Leadership", "Advisory", "Client Services", "Operations", "Tax"],
              },
              {
                type: "string",
                name: "bio",
                label: "Bio",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "photo",
                label: "Photo",
              },
            ],
          },
        ],
      },
    ],
  },
});
