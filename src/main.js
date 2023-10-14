import { createApp } from "vue";
import App from "./App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.use(Toast);
app.use(vue3GoogleLogin, {
  clientId: "782243135980-7dfmhrfqah531g5ob5u200trjrkl0ah2.apps.googleusercontent.com",
});

app.mount("#app");
