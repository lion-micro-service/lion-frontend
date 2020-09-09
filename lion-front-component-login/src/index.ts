import Vue from 'vue';
import index from './Index.vue';
import store from './store/index';
import router from "./router/index";
import './assets/login/login.css';
import './assets/login/icon/style.css';
import './assets/js/jquery/jquery-3.2.1.min.js';
import './assets/js/jquery/jquery.cookie.js';
import './assets/js/jquery/md5.js';
import './assets/js/jquery/jquery.backstretch.min.js';
new Vue({
    store,
    router,
    render:h=>h(index)
}).$mount("#app");
