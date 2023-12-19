import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "LSD.bighome" */ "../views/home.vue"),
    children: [
      {
        path: "/setting",
        name: "Setting",
        props: (router) => ({ query: "yyq" }),
        component: () =>
          import(/* webpackChunkName: "LSD.bighome" */ "../views/home.vue"),
      },
    ],
  },

  // {
  //   path: "/home",
  //   name: "home",
  //   component: () =>
  //     import(/* webpackChunkName: "LSD.bighome" */ "../views/home.vue"),
  //   children: [
  //     {
  //       path: "/index",
  //       name: "index",
  //       props: (router) => ({ query: "yyq" }),
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "LSD.bighome" */ "../views/indexs/index.vue"
  //         ),
  //     },
  //   ],
  // },
];
const router = new VueRouter({
  mode: "history",
  base: "/repair/",
  // base: process.env.BASE_URL,
  routes,
});

export default router;
