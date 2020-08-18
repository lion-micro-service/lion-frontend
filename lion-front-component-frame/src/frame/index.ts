import Vue from 'vue';
import index from './Index.vue';
import store from './store/index';
import router from "./router/index";
import ant from 'ant-design-vue';
import '../assets/theme/styles/index.less';
Vue.use(ant);

new Vue({
    store,
    router,
    render:h=>h(index)
}).$mount("#app");
