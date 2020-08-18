import Vue from 'vue';
import Index from './Index.vue';
import router from "./router/index";
import store from './store/index';
import ant from "ant-design-vue";
Vue.use(ant)

new Vue({
    router,
    store,
    render:h=>h(Index)
}).$mount('#app')