export default [
  {
    header: "",
    description: "",
    child: [
      // {
      //   title: "Dashboard",
      //   path: "/dashboard",
      //   icon: "ic:outline-dashboard",
      //   child: [],
      //   meta: {},
      // },
    ],
  },
  // {
  //   header: "Administration",
  //   description: "Manage your application",
  //   child: [
  //     {
  //       title: "Configuration",
  //       icon: "ic:outline-settings",
  //       child: [
  //         {
  //           title: "Environment",
  //           path: "/devtool/config/environment",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Menu Editor",
  //       icon: "ci:menu-alt-03",
  //       path: "/devtool/menu-editor",
  //       child: [],
  //     },
  //     {
  //       title: "Manage Users",
  //       path: "/devtool/user-management",
  //       icon: "ph:user-circle-gear",
  //       child: [
  //         {
  //           title: "User List",
  //           path: "/devtool/user-management/user-list",
  //           icon: "",
  //           child: [],
  //         },
  //         {
  //           title: "Role List",
  //           path: "/devtool/user-management/role-list",
  //           icon: "",
  //           child: [],
  //         },
  //       ],
  //     },
  //     {
  //       title: "Content",
  //       icon: "mdi:pencil-ruler",
  //       child: [
  //         {
  //           title: "Editor",
  //           path: "/devtool/content-editor",
  //         },
  //         {
  //           title: "Template",
  //           path: "/devtool/content-editor/template",
  //         },
  //       ],
  //     },
  //     {
  //       title: "API Editor",
  //       path: "/devtool/api-editor",
  //       icon: "material-symbols:api-rounded",
  //       child: [],
  //     },
  //   ],
  //   meta: {
  //     auth: {
  //       role: ["Developer"],
  //     },
  //   },
  // },
  // {
  //   header: "Help",
  //   description: "Help and documentation",
  //   child: [
  //     {
  //       title: "Documentation",
  //       icon: "solar:book-bookmark-minimalistic-bold",
  //       path: "https://mawar-cms-docs.vercel.app",
  //       external: true,
  //     },
  //     {
  //       title: "UI Components",
  //       icon: "material-symbols:settings-input-component-outline-rounded",
  //       path: "https://corradui.datasc.dev",
  //       external: true,
  //     },
  //   ],
  //   meta: {
  //     auth: {
  //       role: ["Developer"],
  //     },
  //   },
  // },
  {
    header: "Role : IVV v.1.2",
    description: "",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard_v2",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Document Management",
        path: "/document-management_v2",
        icon: "material-symbols:lab-profile-rounded",
        child: [],
        meta: {
          /* auth: {
            role: ["Reviewer"],
          }, */
        },
      },
      {
        title: "Configuration",
        path: "/configuration",
        icon: "material-symbols:settings",
        child: [
          {
            title: "Project",
            path: "/configuration_v2/project",
          },
          {
            title: "Contractor",
            path: "/configuration_v2/contractor",
          },
          
        ],
        meta: {
          /* auth: {
            role: ["Reviewer"],
          }, */
        },
      },
    ],
  },
  {
    header: "Role : IVV v1.1",
    description: "",
    child: [
      {
        title: "Document Management",
        path: "/document-management",
        icon: "material-symbols:lab-profile-rounded",
        child: [],
        meta: {
          /* auth: {
            role: ["Reviewer"],
          }, */
        },
      },
      {
        title: "Configuration",
        path: "/configuration",
        icon: "material-symbols:settings",
        child: [
          {
            title: "Project",
            path: "/configuration/project",
          },
          {
            title: "Contractor",
            path: "/configuration/contractor",
          },
          
        ],
        meta: {
          /* auth: {
            role: ["Reviewer"],
          }, */
        },
      },
    ],
  },
  {
    header: "Role : Contractor",
    description: "",
    child: [
      {
        title: "Upload Document",
        path: "/document-lists",
        icon: "material-symbols-light:document-scanner-rounded",
        child: [],
        meta: {
          /* auth: {
            role: ["Reviewer"],
          }, */
        },
      },
    ],
  },
  // {
  //   header: "",
  //   description: "",
  //   child: [
  //     {
  //       title: "Configuration",
  //       path: "/configuration",
  //       icon: "material-symbols:settings",
  //       child: [],
  //       meta: {
  //         /* auth: {
  //           role: ["Reviewer"],
  //         }, */
  //       },
  //     },
  //   ],
  // },
];
