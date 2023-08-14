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
            required: true,
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Short Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "datePublished",
            label: "Date Published",
            required: true,
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
        //   router: ({ document }) => `/writing/${document._sys.filename}`,
        // },
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
            name: "shortDescription",
            label: "Short Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "role",
            label: "Role",
          },
          {
            type: "string",
            name: "deliverables",
            label: "Deliverables",
          },
          {
            type: "string",
            name: "client",
            label: "Client",
          },
          {
            type: "string",
            name: "liveUrl",
            label: "Live Url",
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

      {
        label: "Professional",
        name: "professional",
        path: "content/professional",
        ui: {
          // global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        format: "md",
        fields: [
          {
            type: "string",
            name: "firstName",
            label: "First Name",
            required: true,
          },
          {
            type: "string",
            name: "lastName",
            label: "Last Name",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            label: "Expertise",
            name: "expertise",
            type: "object",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: `${item?.title}  ( ${item?.bgColor} ) ` };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "bgColor",
                label: "Background Color",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "about",
            label: "About",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            label: "Social",
            name: "social",
            type: "object",
            list: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return { label: `${item?.socialIcon}  ( ${item?.socialUrl} ) ` };
              },
            },
            fields: [
              {
                type: "string",
                name: "socialUrl",
                label: "Social Url",
                required: true,
              },
              {
                label: "Social Icon",
                name: "socialIcon",
                type: "image",
              }
            ],
          },
          {
            label: "Resume Url",
            name: "resumeUrl",
            type: "string",
          },
          {
            label: "Product Section Title",
            name: "productSectionTitle",
            type: "string",
          },
          {
            label: "Product Section Description",
            name: "productSectionDescription",
            type: "string",
          },
          {
            label: "Product Item",
            name: "productItem",
            type: "object",
            list: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return { label: `${item?.productItemName}  ( ${item?.productItemUrl} ) ` };
              },
            },
            fields: [
              {
                label: "Product Item Logo",
                name: "productItemLogo",
                type: "image",
              },
              {
                type: "string",
                name: "productItemName",
                label: "Product Item Name",
                required: true,
              },
              {
                type: "string",
                name: "productItemUrl",
                label: "Product Item Url",
                required: true,
              },
              {
                type: "string",
                name: "productItemBgColor",
                label: "Product Item Backgorund Color",
                required: false,
              },
            ],
          },
          {
            label: "Gear Section Title",
            name: "gearSectionTitle",
            type: "string",
          },
          {
            label: "Gear Section Description",
            name: "gearSectionDescription",
            type: "string",
          },
          {
            label: "Gear Item",
            name: "gearItem",
            type: "object",
            list: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return { label: `${item?.gearItemName}` };
              },
            },
            fields: [
              {
                label: "Gear Item Logo",
                name: "gearItemLogo",
                type: "image",
              },
              {
                type: "string",
                name: "gearItemName",
                label: "Gear Item Name",
                required: true,
              },
              {
                type: "string",
                name: "gearItemDescription",
                label: "Gear Item Description",
                required: true,
              },
            ],
          },
          {
            label: "Desk Setup Section Title",
            name: "deskSectionTitle",
            type: "string",
          },
          {
            label: "Desk Setup Section Description",
            name: "deskSectionDescription",
            type: "string",
          },

          {
            label: "Desk Setup Gallery",
            name: "deskGallery",
            type: "object",
            list: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return { label: `${item?.deskGalleryCaption}  ( ${item?.deskGalleryItem} ) ` };
              },
            },
            fields: [
              {
                type: "string",
                name: "deskGalleryCaption",
                label: "Caption",
                required: true,
              },
              {
                label: "Item",
                name: "deskGalleryItem",
                type: "image",
              }
            ],
          },
          
          {
            label: "Design Gallery",
            name: "designGallery",
            type: "object",
            list: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return { label: `${item?.caption}  ( ${item?.item} ) ` };
              },
            },
            fields: [
              {
                type: "string",
                name: "caption",
                label: "Caption",
                required: true,
              },
              {
                label: "Item",
                name: "item",
                type: "image",
              }
            ],
          },
        ],
      },

      {
        label: "Home",
        name: "home",
        path: "content/home",
        ui: {
          // global: true,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        format: "md",
        fields: [
          {
            type: "string",
            name: "firstName",
            label: "First Name",
            required: true,
          },
          {
            type: "string",
            name: "lastName",
            label: "Last Name",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "about",
            label: "About",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            label: "Gallery",
            name: "gallery",
            type: "object",
            list: true,
            ui: {
              // This allows the customization of the list item UI
              // Data can be accessed by item?.<Name of field>
              itemProps: (item) => {
                return { label: `${item?.caption}  ( ${item?.galleryItem} ) ` };
              },
              // Setting a default will auto-populate new items with the given values
              // defaultItem: {
              //   author: "Judith Black",
              //   role: "CEO",
              //   quote:
              //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.",
              // },
            },
            fields: [
              {
                type: "string",
                name: "caption",
                label: "Caption",
                required: true,
              },
              {
                label: "Gallery Item",
                name: "galleryItem",
                type: "image",
                // ui: {
                //   format(value) {
                //     //add leading slash to value if it doesnt exist
                //     return value.startsWith("/") ? value : `/${value}`;
                //   },
                //   parse(value) {
                //     //remove leading slash if it exists
                //     return value.startsWith("/") ? value.slice(1) : value;
                //   },
                // }
              }
            ],
          },
        ],
      },

      // {
      //   name: "pages",
      //   label: "Pages",
      //   path: "content/pages",
      //   format: "md",
      //   templates: [
      //     {
      //       label: "Home", // Template label
      //       name: "home", // Template name
      //       fields: [
      //         {
      //           type: "string",
      //           name: "name",
      //           label: "Name",
      //           required: true,
      //         },
      //       ],
      //     },
      //   ],
      //   // ui: {
      //   //   // Don't allow editors to create new navigation items
      //   //   allowedActions: {
      //   //     create: false,
      //   //     delete: false,
      //   //   },
      //   // },
      // },
    ],
  },
});
