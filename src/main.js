import { createApp } from "vue";
import App from "./App.vue";
// import ToastPlugin from "vue-toast-notification";
// import "vue-toast-notification/dist/theme-default.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(Toast);
app.mount("#app");
