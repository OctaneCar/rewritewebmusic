import {createApp} from 'vue'
import App from './App.vue'
import router from "@/route/index";
import '@/assets/app.css'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.use(router);
app.mount("#app");
