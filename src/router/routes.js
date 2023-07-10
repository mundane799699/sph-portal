// 引入路由组件
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import groupOrder from "@/pages/Center/groupOrder";

export default [
  {
    path: "/center",
    component: Center,
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
    component: PaySuccess,
    // 控制footer是否显示
    meta: { show: true },
  },
  {
    path: "/pay",
    component: Pay,
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
    component: Trade,
    // 控制footer是否显示
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
    // 控制footer是否显示
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    // 控制footer是否显示
    meta: { show: true },
  },
  {
    path: "/detail/:skuId",
    component: Detail,
    // 控制footer是否显示
    meta: { show: true },
  },
  {
    path: "/home",
    component: Home,
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
    name: "search",
  },
  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },
  // 重定向
  {
    path: "*",
    redirect: "/home",
  },
];
