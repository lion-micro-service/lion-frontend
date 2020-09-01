import Vue from 'vue';
import router from "./router/index";
import store from './store/index';
import Index from './Index.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

Vue.use(ElementUI, {
    size: 'small'
});
new Vue({
    store,
    router,
    render:h=>h(Index)
}).$mount("#app")