// 对axios进行二次封装
import axios from "axios";
import nprogress from "nprogress";
import store from "@/store";
// 引入进度条样式
import "nprogress/nprogress.css";

// 利用axios对象的方法create，去创建一个axios实例
// request就是axios，只不过稍微配置一下
const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
// 请求拦截器
requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if(store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nprogress.start();
  return config;
});
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error("failed"));
  }
);

export default requests;
