//Axios Interceptors
//Index API
"use strict";

import axios from "axios";
import store from "@/store";

//axios 요청 기본설정
const instance = axios.create({
  baseURL: process.env.VUE_APP_APIBASE,
  timeout: 10000
});

//요청 인터셉터
instance.interceptors.request.use(
  function(config) {
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Headers'] = '*';
    //토큰이 존재할 경우 헤더에 토큰 추가
    let AUTH_TOKEN = store.getters.getToken;
    if (AUTH_TOKEN) {
      config.headers["BS-Authorization"] = AUTH_TOKEN;

    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

//응답 인터셉터
instance.interceptors.response.use(
  function(response) {
    //http status가가 200인경우 .then()으로 이어짐
    return response;
  },
  function(error) {
    //http status가 200이 아닌 경우
    //.catch()로 이어짐

    return Promise.reject(error);
  }
);

export default instance;
