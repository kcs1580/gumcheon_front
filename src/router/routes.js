// 유저
import user from "../views/layout/user.vue";
import admin from "../views/layout/admin.vue";
import notice from "../views/user/notice.vue";
import auth from "../views/layout/auth.vue";
import store from "@/store";

//메인
const main = () =>
  import(/* webpackChunkName: "main" */ "../views/user/main.vue");
//커뮤니티 리스트
const noticeList = () =>
  import(/* webpackChunkName: "community" */ "../views/user/noticeList.vue");
//커뮤니티 상세
const noticeDetail = () =>
  import(/* webpackChunkName: "community" */ "../views/user/noticeDetail.vue");
//커뮤니티 수정
const noticeEdit = () =>
  import(/* webpackChunkName: "community" */ "../views/user/noticeEdit.vue");
//커뮤니티 등록
const noticeRegister = () =>
  import(
    /* webpackChunkName: "community" */ "../views/user/noticeRegister.vue"
  );
//로그인
const login = () => import(/* */ "../views/auth/Login.vue");

//불편 접수
const report = () => import(/* */ "../views/user/report.vue");

//비밀번호 찾기
const find = () => import("@/views/auth/find.vue");
//회원가입
const register = () => import("@/views/auth/register.vue");
//이메일 회원가입 인증
const emailvalidation = () => import("@/views/auth/EmailValidation.vue");
//사용자 약관
const terms = () => import("@/views/user/Terms.vue");
//소셜 로그인 인증
const socialauth = () => import("@/views/auth/SocialAuth.vue");
//봇 스케쥴러
const scheduler = () => import("@/views/auth/Scheduler.vue");
//404 notfound 페이지
const notfound = () => import("@/views/user/NotFoundPage.vue");

//업무용 페이지
const alogin = () => import("@/views/admin/alogin.vue");

//로그인한 사용자만 접속 가능
const requireAuth = () => (from, to, next) => {
  if (store.getters.authStatus == "success") return next();
  next("/login");
};
//비로그인만 접속 가능
const isLogined = () => (from, to, next) => {
  if (store.getters.authStatus != "success") return next();
  next("/");
};

//유저 권한 체크
const requireRole = (userrole) => (from, to, next) => {
  if (store.getters.getuserrole.includes(userrole)) return next();
  return next("/login");
};

const routes = [
  {
    //업무용 페이지
    path: "/admin",
    component: admin,
    children: [
      {
        path: "login",
        component: alogin,
        name: "alogin",
      },
      ,
      {
        //커뮤니티
        path: "/notice222",
        component: notice,
        children: [
          {
            //커뮤니티 목록
            path: "",
            component: noticeList,
            name: "noticeList",
          },
          {
            //커뮤니티 등록
            path: "/writenotice222",
            component: noticeRegister,
            name: "noticeRegister",
            // beforeEnter: requireAuth()
          },
          {
            //커뮤니티 상세
            path: ":id",
            component: noticeDetail,
            name: "noticeDetail",
          },
          {
            //커뮤니티 수정
            path: ":id/modify",
            component: noticeEdit,
            name: "noticeEdit",
            // beforeEnter: requireAuth()
          },
        ],
      },
    ],
  },
  {
    //사용자 페이지
    path: "/",
    component: user,
    children: [
      {
        //메인
        path: "",
        component: main,
        name: "main",
      }, //불편접수
      { path: "/report", component: report, name: "report" },
      ,
      {
        //커뮤니티
        path: "/notice",
        component: notice,
        children: [
          {
            //커뮤니티 목록
            path: "",
            component: noticeList,
            name: "noticeList",
          },
          {
            //커뮤니티 등록
            path: "/writenotice",
            component: noticeRegister,
            name: "noticeRegister",
            // beforeEnter: requireAuth()
          },
          {
            //커뮤니티 상세
            path: ":id",
            component: noticeDetail,
            name: "noticeDetail",
          },
          {
            //커뮤니티 수정
            path: ":id/modify",
            component: noticeEdit,
            name: "noticeEdit",
            // beforeEnter: requireAuth()
          },
        ],
      },
    ],
  },
  {
    //인증관련 페이지
    path: "/login",
    component: auth,
    children: [
      {
        //로그인
        path: "",
        component: login,
        name: "login",
        beforeEnter: isLogined(),
      },
      {
        //비밀번호 찾기
        path: "/find",
        component: find,
        name: "find",
        beforeEnter: isLogined(),
      },
      {
        //회원가입
        path: "/register",
        component: register,
        name: "register",
        beforeEnter: isLogined(),
      },
      {
        //이메일 인증
        path: "/email-validation/:uuid",
        component: emailvalidation,
        name: "emailvalidation",
        beforeEnter: isLogined(),
      },
      {
        //소셜 로그인 인증
        path: "/social-auth",
        component: socialauth,
        name: "socialauth",
      },
      {
        //saas 스케쥴러
        path: "/scheduler",
        component: scheduler,
        name: "scheduler",
      },
    ],
  },
  {
    path: "*",
    component: notfound,
    name: "notfound",
  },
];

export { routes };
