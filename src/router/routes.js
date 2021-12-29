// 루트 레이아웃
import user from "../views/layout/user.vue";
import admin from "../views/layout/admin.vue";
import notice from "../views/user/notice.vue";
import auth from "../views/layout/auth.vue";
import store from "@/store";

//로그인
const login = () => import("@/views/auth/Login.vue");


//사용자 페이지 메인
const main = () =>
  import("@/views/user/main.vue");
//사용자 페이지 공지사항 목록
const noticeList = () =>
  import( "@/views/user/noticeList.vue");
//사용자 페이지 공지사항 상세
const noticeDetail = () =>
  import("@/views/user/noticeDetail.vue");

//사용자 페이지 불편접수
const report = () => import("@/views/user/report.vue");



//관리자 페이지 메인
const amain = () => import("@/views/admin/amain.vue");
//공통코드 페이지
const commonCode = () => import("@/views/admin/commonCode.vue");

//메뉴권한설정 페이지
const menuSetting = () => import("@/views/admin/menuSetting.vue");


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
      }, {
        //공통코드 페이지
        path: "commoncode",
        component: commonCode,
        name: "commonCode",
      }, {
        //메뉴 권한설정 페이지
        path: "menusetting",
        component: menuSetting,
        name: "menuSetting",
      },
      ,
      
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
      { path: "/report/:fid", component: report, name: "report" },
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
     
    ],
  },
  {
    path: "*",
    component: notfound,
    name: "notfound",
  },
];

export { routes };
