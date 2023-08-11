import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "b9fdf6b8-9339-4f8e-9fd2-1073fab5aff9", // Get this from tina.io
  token: "4ec8084c8ae43f1b221174b291fd47f29fa6c56e", // Get this from tina.io

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
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            // isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "test",
            label: "Test",
            // isTest: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/writing/${document._sys.filename}`,
        },
      },
      {
        name: "work",
        label: "Works",
        path: "content/works",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            // isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "client",
            label: "Client",
            // isTest: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        // ui: {
        //   // This is an DEMO router. You can remove this to fit your site
        //   router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        // },
      },
    ],
  },
});
