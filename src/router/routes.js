// 루트 레이아웃
import user from "../views/layout/user.vue";
import admin from "../views/layout/admin.vue";
import notice from "../views/user/notice.vue";
import auth from "../views/layout/auth.vue";
import store from "@/store";

//업무용 로그인
const login = () => import("@/views/auth/Login.vue");
//사용자 로그인
const loginUser = () => import("@/views/auth/LoginUser.vue");

//사용자 페이지 메인
const main = () => import("@/views/user/main.vue");
//사용자 페이지 공지사항 목록
const noticeList = () => import("@/views/user/noticeList.vue");
//사용자 페이지 공지사항 상세
const noticeDetail = () => import("@/views/user/noticeDetail.vue");
//사용자 페이지 불편접수
const report = () => import("@/views/user/report.vue");
//사용자 페이지 접수현황
const dashboard = () => import("@/views/user/dashboard.vue");

//업무용 페이지 메인
const amain = () => import("@/views/admin/amain.vue");
//공통코드 페이지
const commonCode = () => import("@/views/admin/commonCode.vue");
//메뉴권한설정 페이지
const menuSetting = () => import("@/views/admin/menuSetting.vue");
//담당자계정관리 페이지
const adminSetting = () => import("@/views/admin/adminSetting.vue");
//사용자계정관리 페이지
const userSetting = () => import("@/views/admin/userSetting.vue");

//404 notfound 페이지
const notfound = () => import("@/views/user/NotFoundPage.vue");

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
    path: "/",
    component: admin,
    children: [
      {
        //메인
        path: "",
        component: amain,
        name: "amain",
      },
      {
        //공통코드 페이지
        path: "commoncode",
        component: commonCode,
        name: "commonCode",
      },
      {
        //메뉴권한설정 페이지
        path: "menusetting",
        component: menuSetting,
        name: "menuSetting",
      },
      {
        //담당자계정관리 페이지
        path: "adminsetting",
        component: adminSetting,
        name: "adminSetting",
      },
      {
        //사용자계정관리 페이지
        path: "usersetting",
        component: userSetting,
        name: "userSetting",
      },
    ],
  },
  {
    //사용자 페이지
    path: "/user",
    component: user,
    children: [
      {
        //메인
        path: "",
        component: main,
        name: "main",
      }, //불편접수 + fid
      { path: "/report/:fid", component: report, name: "reportfid" },
      { path: "/report/", component: report, name: "report" },
      {
        //공지사항
        path: "/notice",
        component: notice,
        children: [
          {
            //공지사항 목록
            path: "",
            component: noticeList,
            name: "noticeList",
          },
          {
            //공지사항 상세
            path: ":id",
            component: noticeDetail,
            name: "noticeDetail",
          },
        ],
      },
      { path: "/dashboard", component: dashboard, name: "dashboard" },
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
        //로그인 사용자
        path: "/loginUser",
        component: loginUser,
        name: "loginUser",
        beforeEnter: isLogined(),
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
