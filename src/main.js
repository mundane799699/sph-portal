import Vue from "vue";
import App from "./App.vue";
// 三级联动组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import { Button, MessageBox } from "element-ui";
import "@/mock/mockServe";
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from "@/router";

import store from "@/store";
import "swiper/css/swiper.css";

Vue.config.productionTip = false;
// 统一引入
import * as API from "@/api";
import atm from "@/assets/images/1.gif";
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  loading: atm,
});
// 引入表单校验插件
import "@/plugins/validate";
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount("#app");
