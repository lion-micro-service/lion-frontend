import {createApp} from 'vue';
import router from "./router/index";
import store from './store/index';
import Index from './Index.vue';
import ant from 'ant-design-vue';
import '../assets/theme/styles/index.less';
const app = createApp(Index);
app.use(ant);
app.use(store).use(router).mount("#app")
