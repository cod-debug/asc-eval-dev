const routes = [
  {
    name: "home",
    path: "/",
    requiresAuth: false,
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "home-page",
        path: "",
        component: () => import("pages/HomePage.vue"),
      },
      {
        name: "redirect-page",
        path: "/redirect",
        component: () => import("pages/RedirectPage.vue"),
      }
    ]
  },
  {
    name: "dashboard",
    path: "/asc/page/",
    component: () => import("layouts/ApplicantLayout.vue"),
    children: [
      // S1 APPLICATIONS
      {
        name: "dashboard",
        path: "",
        component: () => import("pages/Profile/EvaluatorIndex.vue"),
      },
      {
        name: "individual-application-list",
        path: "application/s1/lists",
        component: () => import("pages/S1Applications/IndividualApp.vue"),
      },
      {
        name: "individual-application-update",
        path: "application/s1/update/:id",
        component: () => import("pages/S1Applications/DetailsIndex.vue"),
      },
      {
        name: "multiple-application-list",
        path: "application/s1/multiple",
        component: () => import("pages/S1Applications/MultipleApp.vue"),
      },
      {
        name: "special-application-list",
        path: "application/s1/special",
        component: () => import("pages/S1Applications/SpecialApp.vue"),
      },
      {
        name: "dashboard",
        path: "",
        component: () => import("pages/Profile/EvaluatorIndex.vue"),
      },
      {
        name: "individual-application-list-s2",
        path: "application/s2/lists",
        component: () => import("pages/S2Applications/IndividualApp.vue"),
      },
      {
        name: "individual-application-update-s2",
        path: "application/s2/update/:id",
        component: () => import("pages/S2Applications/DetailsIndex.vue"),
      },
      {
        name: "multiple-application-list-s2",
        path: "application/s2/multiple",
        component: () => import("pages/S2Applications/MultipleApp.vue"),
      },
      {
        name: "special-application-list-s2",
        path: "application/s2/special",
        component: () => import("pages/S2Applications/SpecialApp.vue"),
      },
      {
        name: "announcement-view",
        path: "announcement",
        component: () => import("pages/Announcements/AnnouncementView.vue"),
      },
    ]
  },
  {
    path: "/account",
    name: "account",
    component: () => import("layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "user-profile",
        name: "user-profile",
        component: () => import('pages/Profile/Account/UserProfile/UserProfileIndex.vue'),
      },
    ]
  },
];

export default routes;
