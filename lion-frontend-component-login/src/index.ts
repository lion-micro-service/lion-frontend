import {createApp} from 'vue';
import index from './Index.vue';
import store from './store/index';
import router from "./router/index";

createApp(index).use(store).use(router).mount("#app")
