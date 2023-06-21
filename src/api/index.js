// API进行统一管理
import requests from './ajax';
import mockRequests from './mockAjax';

// 三级联动接口
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'});
// 轮播图接口
export const reqGetBannerList = () => mockRequests({url: '/banner', method: 'get'});
// 获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');