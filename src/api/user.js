import api from "@/api/index.js";
//사용자 관련 API
export default {
  //관리자 권한 유저등록
  registerUser(user) {
    return api({
      url: "/v1/user",
      method: "post",
      data: user
    });
  },
  //관리자 권한 모든 유저 정보 조회
  getAllUsers() {
    return api({
      url: "v1/user/allUsers",
      method: "get"
    });
  },
  //유저 수 조회
  getUserCount() {
    return api({
      url: "v1/user/count",
      method: "get"
    });
  },
  //유저 ID 중복확인
  existsId(userId) {
    return api({
      url: `v1/user/existsId/${userId}`,
      method: "get"
    });
  },
  //닉네임 중복확인
  existsName(userNm) {
    return api({
      url: `v1/user/existsName/${userNm}`,
      method: "get"
    });
  },
  //특정 유저정보 조회
  selectUser(userPk) {
    return api({
      url: `v1/user/id/${userPk}`,
      method: "get"
    });
  },
  //유저 정보 변경(관리자 또는 본인만 가능)
  updateUser(userPk, user) {
    return api({
      url: `v1/user/id/${userPk}`,
      method: "put",
      data: user
    });
  },
  //유저 삭제 (관리자만 가능)
  deleteUser(userPk) {
    return api({
      url: `v1/user/id/${userPk}`,
      method: "delete"
    });
  },
  //내 정보 조회
  myInfo() {
    return api({
      url: `v1/user/me`,
      method: "get"
    });
  },
  //내 정보 조회 with token
  myInfo(token) {
    return api({
      url: `v1/user/me`,
      method: "get",
      headers: { "BS-Authorization": token }
    });
  },
  //회원가입 요청
  signup(user) {
    return api({
      url: `v1/sign/signup`,
      method: "post",
      data: user
    });
  },
  //이메일 인증 요청
  sendValidation(userPk) {
    return api({
      url: `v1/user/validation/${userPk}`,
      method: "post"
    });
  },
  //이메일 인증
  emailValidation(uuid) {
    return api({
      url: `v1/user/validation/${uuid}`,
      method: "get"
    });
  }
};
