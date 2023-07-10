// 配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// 使用插件
Vue.use(VueRouter);
import store from "@/store";

// 重写push和replace方法，防止多次调用时出现错误
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

let router = new VueRouter({
  routes,
  // 路由跳转的滚动行为
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});
// 全局守卫：前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    if (to.path === "/login") {
      next("/home");
    } else {
      // 去的不是登录页面
      if (name) {
        // 如果有用户信息
        next();
      } else {
        // 如果没有用户信息
        try {
          //获取用户信息
          await store.dispatch("getUserInfo");
          // 放行
          next();
        } catch (error) {
          // token过期了
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    // 未登录
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") !== -1 ||
      toPath.indexOf("/pay") !== -1 ||
      toPath.indexOf("/center") !== -1
    ) {
      next(`/login?redirect=${toPath}`);
    } else {
      next();
    }
  }
});

// 配置路由
export default router;
