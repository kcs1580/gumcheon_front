import api from "@/api/index.js";
//인증 관련 api
export default {
  login(user) {
    return api({
      url: "/v1/auth/login",
      method: "post",
      data: { id: user.id, pw: user.pw }
    });
  },

  pwInitApply(user) {
    return api({
      url: "/v1/auth/pwInitApply",
      method: "post",
      data: { id: user.aplyId, userOgdp: user.userOgdp, userTeam: user.userTeam, userTelno: user.userTelno }
    });
  },

  changePw(user) {
    return api({
      url: "/v1/auth/chPw",
      method: "post",
      data: {id: user.id, pw: user.chPw}
    });
  },

  isUser(user){
    return api({
      url: "/v1/auth/isUser",
      method: "post",
      data: { id: user.id, pw: user.prPw }
    });
  },
 
 
  //토큰 유효확인
  tokenCheck() {
    return api({
      url: "/v1/auth/check",
      method: "get"
    });
  },
 
  //로그아웃
  logout() {
    return api({
      url: "/v1/auth/logout",
      method: "get"
    });
  },
  //토큰만 가지고 로그아웃 (임시)
  logoutWithToken(token) {
    return api({
      url: "v1/auth/logout",
      method: "get",
      headers: { "BS-Authorization": token }
    });
  },
  //토큰 재발급
  tokenRefresh() {
    return api({
      url: "v1/auth/refresh",
      method: "get"
    });
  },
  //패스워드 변경 요청
  requestPwReset(userId) {
    return api({
      url: `v1/auth/requestPasswordReset/${userId}`,
      method: "get"
    });
  },
  //패스워드 변경 처리
  updatePw(data) {
    return api({
      url: "v1/auth/updatePassword",
      method: "put",
      data: {
        password: data.password,
        uuid: data.uuid
      }
    });
  }
};
