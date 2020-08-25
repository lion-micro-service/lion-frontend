import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

Vue.use(VueRouter);

const routes : Array<RouteConfig> = [{
    path:'/test',
    name:'测试',
    redirect:'/test/list'
    },{
        path:'/test/list',
        name:'测试列表',
        component: () => import('@/test/views/List.vue'),
        meta: {keepAlive: true }
    },{
        path:'/test/add',
        name:'测试新增',
        component: () => import('@/test/views/AddOrUpdate.vue'),
        meta: {keepAlive: false }
    }
];

const route = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

export default route