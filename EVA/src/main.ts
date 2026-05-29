import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import pinia from "./store";
import router from "./router";
import globalComponent from "@/components";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
app.use(pinia);
app.use(router);
app.use(globalComponent);

import "./router/guards";
import "@/styles/index.scss";
app.mount("#app");
