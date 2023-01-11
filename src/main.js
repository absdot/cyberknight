import "./bootstrap";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// import './style.css'

import router from "./router";

import App from "./App.vue";
import Auth from "./layouts/Auth.vue";
import Blank from "./layouts/Blank.vue";
import Default from "./layouts/Default.vue";

import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";
import Button from "./components/Button.vue";
import SignInModal from "./components/SignInModal.vue";

const app = createApp(App);

app.component("auth-layout", Auth);
app.component("blank-layout", Blank);
app.component("default-layout", Default);

app.component("Header", Header);
app.component("Sidebar", Sidebar);
app.component("Footer", Footer);
app.component("Button", Button);
app.component("SignInModal", SignInModal);

app.config.globalProperties.dayjs = dayjs;

app.use(pinia);
app.use(router);
app.mount("#app");
