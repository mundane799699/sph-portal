// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import groupOrder from "@/pages/Center/groupOrder";

export default [
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    // 控制footer是否显示
    meta: { show: true },
    // 二级路由组件
    children: [
      { path: "myorder", component: MyOrder },
      { path: "grouporder", component: groupOrder },
      { path: "/center", redirect: "/center/myorder" },
    ],
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    // 控制footer是否显示
    meta: { show: true },
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    // 控制footer是否显示
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path === "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    // 控制footer是否显示
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === "/shopcart" || from.path === "/login") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    // 控制footer是否显示
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    // 控制footer是否显示
    meta: { show: true },
  },
  {
    path: "/detail/:skuId",
    component: () => import("@/pages/Detail"),
    // 控制footer是否显示
    meta: { show: true },
  },
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true },
    name: "search",
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  // 重定向
  {
    path: "*",
    redirect: "/home",
  },
];
