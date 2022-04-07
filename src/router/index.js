import Vue from "vue";
import VueRouter from "vue-router";
import News from "../views/news.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "News",
    component: News,
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
