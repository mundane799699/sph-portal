import Vue from 'vue'
import App from './App.vue'
// 三级联动组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import '@/mock/mockServe';
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);


// 引入路由
import router from '@/router';

import store from '@/store';
import 'swiper/css/swiper.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
