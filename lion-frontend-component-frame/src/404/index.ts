import Vue from 'vue';
import index from './Index.vue';
import store from './store/index';
import router from "./router/index";
new Vue({
    store,
    router,
    render:h=>h(index)
}).$mount("#app");
