import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import errorLoggers from "./plugins/ErrorLogger/error-loggers";
import { logPlugin } from "./plugins/logPlugin.js";
import { ObserveVisibility } from "vue3-observe-visibility";

const pinia = createPinia();
pinia.use(logPlugin);

const app = createApp(App);

// 自定义指令设置按钮权限
const u = ["write", "admin"];
app.directive("permission", {
  mounted(el, binding) {
    const { value } = binding;
    if (value && value instanceof Array) {
      const b = value.some((e) => u.includes(e));
      console.log(b);

      if (!b) {
        el.style.display = "none";
      }
    }
  },
});

app.use(errorLoggers, {
  logToConsole: true,
  remotoLogging: false,
  remotoUrl: "",
});
app.use(pinia);

app.directive("observe-visibility", ObserveVisibility);
app.mount("#app");
