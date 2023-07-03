// 引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Detail from '@/pages/Detail';
export default [
    {
        path: '/detail/:skuid',
        component: Detail,
        // 控制三级联动是否显示
        meta: { show: true }
    },
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search'
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    // 重定向
    {
        path: '*',
        redirect: '/home'
    }
]