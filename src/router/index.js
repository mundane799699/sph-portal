// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// 使用插件
Vue.use(VueRouter);

// 重写push和replace方法，防止多次调用时出现错误
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
    if(resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, ()=>{}, ()=>{});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if(resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, ()=>{}, ()=>{});
    }
}

// 配置路由
export default new VueRouter({
    routes,
    // 路由跳转的滚动行为
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 };
    }
})
