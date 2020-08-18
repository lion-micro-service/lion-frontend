import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

Vue.use(VueRouter);

const routes : Array<RouteConfig> = [{
    path:'/test',
    name:'测试',
    redirect:'/test/list',
    // children:[{
    //     path:'/list',
    //     name:'测试列表',
    //     component: list
    // }]
    },
    {
        path:'/test/list',
        name:'测试列表',
        component: () => import('@/test/views/List.vue')
    }
];

const route = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

export default route