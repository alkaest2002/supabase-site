import ViewHome from "@/views/View__Home.vue";
import ViewAbout from "@/views/View__About.vue";

export default [
  {
    path: "/",
    name: "route-home",
    component: ViewHome,
  },
  {
    path: "/about",
    name: "route-about",
    component: ViewAbout,
  },
];
