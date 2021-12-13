import api from "@/api/index.js";
//인증 관련 api
export default {
  //토큰 유효확인
  tokenCheck() {
    return api({
      url: "/v1/auth/check",
      method: "get"
    });
  },
  //로그인
  // login(data) {
  //   return api({
  //     url: "/uat/uia/actionLogin.do",
  //     method: "post",
  //     data: { id: data.id, password: data.password }
  //   });
  // },

  login(user) {
    return api({
      url: "/v1/sign/signin",
      method: "post",
      data: { id: user.id, pw: user.pw }
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
