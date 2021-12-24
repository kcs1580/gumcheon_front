import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import authApi from "@/api/auth.js";

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
    
  },
  mutations: {
    
    //로그인 성공
    AUTH_SUCCESS(state, { token}) {
      state.status = "success";
      state.token = token;
      

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
      state.userId = decodedtoken.sub;
      state.userNm = decodedtoken.userNm;
      state.userrole = decodedtoken.userRoles;
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
    AUTH_REQUEST({ commit }, { id, pw }) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        authApi
          .login({ id, pw })
          .then(resp => {
          
            

            if(resp.data.rscode != "0"){
              commit("AUTH_ERROR");
              this.state.token = "";

            }
            else{
            const token = resp.data.token;

            commit("AUTH_SUCCESS", { token});
            // dispatch("USER_REQUEST")

            
          }
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
