export default [
  {
    header: "",
    description: "",
    child: [
      {
        title: "Laman Utama",
        path: "/ivv/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },

      {
        title: "Projek",
        path: "/ivv/projects",
        icon: "material-symbols:lab-profile-rounded",
        child: [],
        meta: {},
      },
      {
        title: "Tetapan",
        path: "/configuration",
        icon: "material-symbols:settings",
        child: [
          {
            title: "Kontraktor",
            path: "/ivv/tetapan/kontraktor",
          },
          {
            title: "Jenis Dokumen",
            path: "/ivv/tetapan/jenis_dokumen",
          },
        ],
        meta: {},
      },
    ],
  },
];
