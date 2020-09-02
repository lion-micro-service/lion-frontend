import Vue from 'vue'
import VueRouter,{RouteConfig} from 'vue-router'
import { message } from 'ant-design-vue'


Vue.use(VueRouter)

const routes : Array<RouteConfig> =[]

const route = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

route.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem('token')) {
        message.error('登陆异常，请重新登陆！');
        setTimeout(function () {
            if (self != top) {
                window.top.location.href="/";
            }else {
                window.location.href="/";
            }
        },5000);
    } else {
        next();
    }
});

export default route