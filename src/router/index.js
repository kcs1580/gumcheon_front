import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import store from "@/store";

Vue.use(VueRouter);

//라우터 초기설정
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

//라우터 이동시 토큰 유효성 체크
// router.beforeEach((to, from, next) => {
//   if (store.state.token) store.dispatch("TOKEN_CHECK");

//   return next();
// });
export default router;
