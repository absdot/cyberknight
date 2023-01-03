import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home.vue");
const Dashboard = () => import("../views/Dashboard.vue");
const Message = () => import("../views/Message.vue");
const Error401 = () => import("../views/errors/Error401.vue");
const Error404 = () => import("../views/errors/Error404.vue");

const routes = [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { layout: "default",  title: "Welcome" },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { layout: "auth",  title: "Dashboard" },
    },
    {
      path: "/messages",
      name: "messages",
      component: Message,
      meta: { layout: "auth",  title: "Messages" },
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
    // const _mainStore = mainStore();
  
    // if (to.matched.some((record) => record.meta.auth)) {
    //   if (!_mainStore.authenticated) {
    //     next({
    //       path: "/login",
    //       query: { next: to.fullPath },
    //     });
    //   } else {
    //     next();
    //   }
    // } else {
    //   if (to.name === "login" && _mainStore.authenticated) {
    //     next({ name: "home" });
    //   } else {
    //     next();
    //   }
    // }
    next();
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