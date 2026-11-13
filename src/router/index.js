import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import ProductView from "../views/ProductView.vue";
import MainLayout from "../layouts/MainLayout.vue";
import CategoryView from "../views/CategoryView.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    redirect: "/dashboard",
    children: [
      { path: "dashboard", component: DashboardView },
      { path: "products", component: ProductView },
      { path: "categories", component: CategoryView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
