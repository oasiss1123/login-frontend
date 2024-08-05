import LogIn from "./pages/LogIn.vue";
import SignUp from "./pages/SignUp.vue";
import WelcomePage from "./pages/WelcomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: LogIn },
  { path: "/singup", component: SignUp },
  { path: "/welcome", component: WelcomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
