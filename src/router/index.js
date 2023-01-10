import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";

const Home = () => import("../views/Home.vue");
const Dashboard = () => import("../views/Dashboard.vue");
const Profile = () => import("../views/Profile.vue");
const Security = () => import("../views/Security.vue");
const Message = () => import("../views/Message.vue");
const Error401 = () => import("../views/errors/Error401.vue");
const Error404 = () => import("../views/errors/Error404.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { layout: "default", title: "Welcome" },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { layout: "auth", auth: true, title: "Dashboard" },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { layout: "auth", auth: true, title: "Profile" },
  },
  {
    path: "/security",
    name: "security",
    component: Security,
    meta: { layout: "auth", auth: true, title: "Security" },
  },
  {
    path: "/messages",
    name: "messages",
    component: Message,
    meta: { layout: "auth", auth: true, title: "Messages" },
  },
  {
    path: "/401",
    name: "errors.401",
    component: Error401,
    meta: { layout: "blank", title: "Permission Error" },
  },
  {
    path: "/404",
    name: "errors.404",
    component: Error404,
    meta: { layout: "blank", title: "Page Not Found" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title =
    _.startCase(to.meta.title) + " | " + import.meta.env.VITE_APP_NAME;
  const { authenticated } = storeToRefs(mainStore());

  if (to.matched.some((record) => record.meta.auth)) {
    if (!authenticated.value) {
      next({
        path: "/",
        query: { next: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    // if (to.name === "login" && authenticated) {
    //   next({ name: "home" });
    // } else {
    //   next();
    // }
    next();
  }
  // next();
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
