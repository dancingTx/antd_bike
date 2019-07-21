import Dashboard from '../pages/Dashboard'
import Buttons from '../pages/Components/Buttons'
import Modals from '../pages/Components/Modals'
import Loadings from '../pages/Components/Loadings'
import Notifications from '../pages/Components/Notifications'
import Messages from '../pages/Components/Messages'
import Tabs from '../pages/Components/Tabs'
import Gallery from '../pages/Components/Gallery'
const menuList = [
    {
        title: '首页',
        path: '/admin/home',
        icon:'dashboard',
        component: Dashboard
    },
    {
        title: '组件',
        path: '/admin/components',
        icon: 'layout',
        children: [
            {
                title: '按钮',
                path: '/admin/components/buttons',
                component: Buttons,
                icon:''
            },
            {
                title: '弹框',
                path: '/admin/components/modals',
                component: Modals,
                icon:'windows'
            },
            {
                title: 'Loading',
                path: '/admin/components/loadings',
                component: Loadings,
                icon:'loading'
            },
            {
                title: '通知提醒',
                path: '/admin/components/notification',
                component: Notifications,
                icon:'notification'
            },
            {
                title: '全局Message',
                path: '/admin/components/messages',
                component: Messages
            },
            {
                title: 'Tab页签',
                path: '/admin/components/tabs',
                component: Tabs
            },
            {
                title: '图片画廊',
                path: '/admin/components/gallery',
                component: Gallery
            },
            {
                title: '轮播图',
                path: '/admin/components/carousel',
            }
        ]
    },
    {
        title: '表单',
        path: '/admin/form',
        icon:'form',
        children: [
            {
                title: '登录',
                path: '/admin/form/login',
                icon:'login'
            },
            {
                title: '注册',
                path: '/admin/form/reg',
                icon:'logout'
            }
        ]
    },
    {
        title: '表格',
        path: '/admin/table',
        icon:'table',
        children: [
            {
                title: '基础表格',
                path: '/admin/table/basic',
                icon: 'table',
            },
            {
                title: '高级表格',
                path: '/admin/table/high',
                icon: 'table',
            }
        ]
    },
    {
        title: '富文本',
        path: '/admin/rich'
    },
    {
        title: '城市管理',
        path: '/admin/city'
    },
    {
        title: '订单管理',
        path: '/admin/order',
        btnList: [
            {
                title: '订单详情',
                path: 'detail'
            },
            {
                title: '结束订单',
                path: 'finish'
            }
        ]
    },
    {
        title: '员工管理',
        path: '/admin/user'
    },
    {
        title: '车辆地图',
        path: '/admin/bikeMap'
    },
    {
        title: '图表',
        path: '/admin/charts',
        children: [
            {
                title: '柱形图',
                path: '/admin/charts/bar',
                icon:'bar-chart'
            },
            {
                title: '饼图',
                path: '/admin/charts/pie',
                icon:'pie-chart'
            },
            {
                title: '折线图',
                path: '/admin/charts/line',
                icon:'line-chart'
            },
        ]
    },
    {
        title: '权限设置',
        path: '/admin/permission',
        icon:'setting'
    },
];
export default menuList;