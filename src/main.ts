import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createMemoryHistory } from "vue-router";
import "./styles/style.scss";
import App from "./App.vue";
import Projects from "@/views/Projects.vue";
import Tasks from "@/views/Tasks.vue";
import Home from "./views/Home.vue";

const routes = [
  { path: "/projects", component: Projects },
  { path: "/", component: Home },
  { path: "/projects/:id", component: Tasks },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
