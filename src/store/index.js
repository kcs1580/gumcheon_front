import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import authApi from "@/api/auth.js";
import userApi from "@/api/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    //**인증 관련** */
    //jwt token
    token: localStorage.getItem("user-token") || "",
    //로그인 상태 flag
    status: "",
    //유저 아이디
    userId: "",
    //유저 닉네임
    userNm: "",
    //유저 타입
    userrole: [],

    //**봇 리스트 관련 */
    botvar: {
      //봇 검색 실행여부 체크
      issearch: "",
      //검색 결과 봇 개수
      searchtotal: "",
      //봇 리스트
      botList: "",
      //봇 검색어
      keyword: "",
      //봇 정렬 기준
      botsort: "RECENT",
      //봇 현재 페이지
      botcurrentpage: 1,
      //봇 전체 페이지 수
      bottotallength: 0,
      //봇 배너 이미지 목록 (파일 업로드 컴포넌트와 데이터 통신)
      botimgs: [],
      //봇 첨부 파일 목록 (파일 업로드 컴포넌트와 데이터 통신)
      botfile: []
    },

    //**봇 필터 관련**
    botfilter: {
      //봇 타입
      botTypeList: [],
      botType: "",
      //비즈니스카테고리
      businessCategoryList: [],
      //업무카테고리
      jobCategoryList: [],
      //솔루션카테고리
      rpaSolutionList: [],
      //응용프로그램카테고리
      thirdPartyList: [],
      //키워드 검색 리스트
      filtertaglist: [],
      //평점
      ratings: [],
      //봇 업무 카테고리 데이터
      alljobCategoryList: []
    },

    //**커뮤니티 관련 */
    //커뮤니티 검색어
    cmsearchValue: "",
    //커뮤니티 검색 기준
    cmsearchBy: "TITLE",
    //커뮤니티 정렬 기준
    cmorderBy: "RECENT",

    //**자료실 관련 */
    //자료실 검색어
    searchValue: "",
    //자료실 검색 기준
    searchBy: "TITLE",
    //자료실 정렬 기준
    orderBy: "RECENT",

    //게시판 현재 페이지, 전체 페이지 수
    currentpage: 1,
    totallength: 0,

    //자료실 첨부파일 목록 (파일 업로드 컴포넌트와 데이터 통신)
    files: [],
    attachfilelist: []
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getToken: state => {
      return state.token;
    },
    getuserID: state => {
      return state.userId;
    },
    getuserNm: state => {
      return state.userNm;
    },
    getuserrole: state => {
      return state.userrole;
    },
    getIsSearch: state => {
      return state.botvar.issearch;
    },
    getBotList: state => {
      return state.botvar.botList;
    },
    getbotsort: state => {
      return state.botvar.botsort;
    },

    getsearchtotal: state => {
      return state.botvar.searchtotal;
    },
    getkeyword: state => {
      return state.botvar.keyword;
    },
    getbotcurrentpage: state => {
      return state.botvar.botcurrentpage;
    },
    getbottotallength: state => {
      return state.botvar.bottotallength;
    },
    getbotfile: state => {
      return state.botvar.botfile;
    },
    getbotimgs: state => {
      return state.botvar.botimgs;
    },

    getbotType: state => {
      return state.botfilter.botType;
    },
    getbotTypeList: state => {
      return state.botfilter.botTypeList;
    },
    getbusinessCategoryList: state => {
      return state.botfilter.businessCategoryList;
    },
    getjobCategoryList: state => {
      return state.botfilter.jobCategoryList;
    },
    getalljobCategoryList: state => {
      return state.botfilter.alljobCategoryList;
    },
    getrpaSolutionList: state => {
      return state.botfilter.rpaSolutionList;
    },
    getfiltertaglist: state => {
      return state.botfilter.filtertaglist;
    },
    getthirdPartyList: state => {
      return state.botfilter.thirdPartyList;
    },
    getratings: state => {
      return state.botfilter.ratings;
    },
    getattachfilelist: state => {
      return state.attachfilelist;
    },
    getcmorderBy: state => {
      return state.cmorderBy;
    },
    getcmsearchBy: state => {
      return state.cmsearchBy;
    },
    getcmsearchValue: state => {
      return state.cmsearchValue;
    },
    getorderBy: state => {
      return state.orderBy;
    },
    getsearchBy: state => {
      return state.searchBy;
    },
    getsearchValue: state => {
      return state.searchValue;
    },
    getfiles: state => {
      return state.files;
    },

    getuserrole: state => {
      return state.userrole;
    },
    getcurrentpage: state => {
      return state.currentpage;
    },
    gettotallength: state => {
      return state.totallength;
    }
  },
  mutations: {
    //봇 검색 조건 초기화
    INIT_SEARCH(state) {
      state.botvar.keyword = "";
      state.botvar.botsort = "RECENT";
      state.botvar.botcurrentpage = 1;
      state.botfilter.filterdata = "";
      state.botfilter.businessCategoryList = [];
      state.botfilter.jobCategoryList = [];
      state.botfilter.rpaSolutionList = [];
      state.botfilter.filtertaglist = [];
      state.botfilter.thirdPartyList = [];
      state.botfilter.ratings = [];
      state.botfilter.botTypeList = ["BOT"];
    },
    //자료실 검색 조건 초기화
    INIT_ARCHIVES(state) {
      state.searchValue = "";
      state.searchBy = "TITLE";
      state.orderBy = "RECENT";
      state.currentpage = 1;
    },
    //커뮤니티 검색 조건 초기화
    INIT_COMMUNITY(state) {
      state.cmsearchValue = "";
      state.cmsearchBy = "TITLE";
      state.cmorderBy = "RECENT";
      state.currentpage = 1;
    },
    SET_BOTIMGS(state, newValue) {
      state.botvar.botimgs = newValue;
    },
    SET_BOTFILE(state, newValue) {
      state.botvar.botfile = newValue;
    },
    SET_ISSEARCH(state, newValue) {
      state.botvar.IsSearch = newValue;
    },
    SET_SEARCHTOTAL(state, newValue) {
      state.botvar.searchtotal = newValue;
    },
    SET_BOTLIST(state, newValue) {
      state.botvar.botList = newValue;
    },
    SET_KEYWORD(state, newValue) {
      state.botvar.keyword = newValue;
    },
    SET_BOTCURRENTPAGE(state, newValue) {
      state.botvar.botcurrentpage = newValue;
    },
    SET_BOTTOTALLENGTH(state, newValue) {
      state.botvar.bottotallength = newValue;
    },
    SET_BOTSORT(state, newValue) {
      state.botvar.botsort = newValue;
    },
    SET_BOTTYPE(state, newValue) {
      state.botfilter.botType = newValue;
    },
    SET_BOTTYPELIST(state, newValue) {
      state.botfilter.botTypeList = newValue;
    },
    SET_RPASOLUTIONLIST(state, newValue) {
      state.botfilter.rpaSolutionList = newValue;
    },
    SET_FILTERTAGLIST(state, newValue) {
      state.botfilter.filtertaglist = newValue;
    },
    SET_THIRDPARTYLIST(state, newValue) {
      state.botfilter.thirdPartyList = newValue;
    },
    SET_RATINGS(state, newValue) {
      state.botfilter.ratings = newValue;
    },
    SET_BUSINESSCATEGORYLIST(state, newValue) {
      state.botfilter.businessCategoryList = newValue;
    },
    SET_JOBCATEGORYLIST(state, newValue) {
      state.botfilter.jobCategoryList = newValue;
    },
    SET_ALLJOBCATEGORYLIST(state, newValue) {
      state.botfilter.alljobCategoryList = newValue;
    },
    SET_CMSEARCHVALUE(state, newValue) {
      state.cmsearchValue = newValue;
    },
    SET_CMORDERBY(state, newValue) {
      state.cmorderBy = newValue;
    },
    SET_CMSEARCHBY(state, newValue) {
      state.cmsearchBy = newValue;
    },
    SET_SEARCHVALUE(state, newValue) {
      state.searchValue = newValue;
    },
    SET_ORDERBY(state, newValue) {
      state.orderBy = newValue;
    },
    SET_SEARCHBY(state, newValue) {
      state.searchBy = newValue;
    },
    SET_ATTACHFILELIST(state, newValue) {
      state.attachfilelist = newValue;
    },

    SET_FILTER(state, newValue) {
      state.filter = newValue;
    },

    SET_FILTERDATA(state, newValue) {
      state.filterdata = newValue;
    },
    SET_CURRENTPAGE(state, newValue) {
      state.currentpage = newValue;
    },
    SET_TOTALLENGTH(state, newValue) {
      state.totallength = newValue;
    },

    SET_FILES(state, newValue) {
      state.files = newValue;
    },

    //로그인 성공
    AUTH_SUCCESS(state, { token, userId, userNm }) {
      state.status = "success";
      state.token = token;
      state.userId = userId;
      state.userNm = userNm;

      function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function(c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        return JSON.parse(jsonPayload);
      }

      var decodedtoken = parseJwt(token);
      state.userrole = decodedtoken.BS_USER_ROLE;
    },
    //인증 요청
    AUTH_REQUEST(state) {
      state.status = "loading";
    },
    //인증 에러
    AUTH_ERROR(state) {
      state.status = "error";
    },
    //로그 아웃
    AUTH_LOGOUT(state) {
      state.status = "logout";
      state.token = "";
      state.userId = "";
      state.userNm = "";
      state.userrole = "";
    },
    //토큰 갱신
    REFRESH_TOKEN(state, newValue) {
      state.token = newValue;
    },
    //소셜 로그인
    SOCIAL_LOGIN(state) {}
  },
  actions: {
    //로그인
    AUTH_REQUEST({ commit }, { userId, userPwd }) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        authApi
          .login({ userId, userPwd })
          .then(resp => {
            const token = resp.data.token;
            const userId = resp.data.user.userId;
            const userNm = resp.data.user.userNm;
            commit("AUTH_SUCCESS", { token, userId, userNm });
            // dispatch("USER_REQUEST")

            resolve(resp);
          })
          .catch(err => {
            commit("AUTH_ERROR", err);
            this.state.token = "";

            reject(err);
          });
      });
    },
    //소셜 로그인 (토큰으로 유저정보 가져오기)
    SOCIAL_AUTH({ commit }, token) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        userApi
          .myInfo(token)
          .then(resp => {
            const userId = resp.data.user.userId;
            const userNm = resp.data.user.userNm;
            commit("AUTH_SUCCESS", { token, userId, userNm });
            // dispatch("USER_REQUEST")

            resolve(resp);
          })
          .catch(err => {
            commit("AUTH_ERROR", err);
            this.state.token = "";

            reject(err);
          });
      });
    },
    //로그아웃
    AUTH_LOGOUT({ commit }) {
      return new Promise(resolve => {
        authApi
          .logout()
          .then(() => {
            commit("AUTH_LOGOUT");
            resolve();
          })
          .catch(err => {
            commit("AUTH_LOGOUT");
            commit("AUTH_ERROR", err);
          });
      });
    },
    //토큰 확인
    TOKEN_CHECK({ commit }) {
      return authApi
        .tokenCheck()
        .then(() => {
          function parseJwt(token) {
            var base64Url = token.split(".")[1];
            var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            var jsonPayload = decodeURIComponent(
              atob(base64)
                .split("")
                .map(function(c) {
                  return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
            );

            return JSON.parse(jsonPayload);
          }

          var decodedtoken = parseJwt(this.getters.getToken);
          var now = Math.floor(+new Date() / 1000);
          var lifetime = decodedtoken.exp - now;
          if (lifetime <= 300) {
            this.dispatch("REFRESH_TOKEN");
          }
        })
        .catch(err => {
          commit("AUTH_LOGOUT");
          console.log(err);
        });
    },
    //토큰 갱신
    REFRESH_TOKEN({ commit }) {
      return authApi
        .tokenRefresh()
        .then(res => {
          commit("REFRESH_TOKEN", res.data.token);
        })
        .catch(err => {
          console.log(err);
          commit("AUTH_LOGOUT");
        });
    }
  }
});
