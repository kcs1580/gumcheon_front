<template>
  <!-- 로그인 페이지 -->
  <v-card rounded="xl" width="400">
    <v-card-text>
      <p class="black--text login-title text-center">
        {{ $t("nav.login") }}
      </p>
      <p class="login-message text-center mt-10">
        이메일과 비밀번호를 <br />
        입력해주세요
      </p>
      <div @keydown.enter="login(userId, userPwd)">
        <v-col class="pl-7 pr-7 mb-7">
          <v-text-field
            autofocus
            dense
            placeholder="이메일 입력"
            class="mb-1 email-input"
            hide-details
            outlined
            v-model="userId"
          />
          <v-text-field
            clearable
            dense
            placeholder="비밀번호 입력"
            hide-details
            outlined
            v-model="userPwd"
            type="password"
          />
        </v-col>
        <!-- 소셜 로그인 -->
        <!-- <v-col cols="12">
          <v-row justify="space-around">
            <a
              href="http://www.timebees.net/oauth2/authorize/google?redirect_uri=http://www.timebees.net/social-auth"
            >
              <img
                height="36px"
                src="@/assets/img/oauth/btn_google_signin_dark_normal.png"
              />
            </a>
            <a
              href="http://www.timebees.net/oauth2/authorize/kakao?redirect_uri=http://www.timebees.net/social-auth"
            >
              <img
                height="36px"
                src="@/assets/img/oauth/kakao_login_large_narrow.png"
              /> </a
          ></v-row>
        </v-col> -->

        <v-col cols="12">
          <v-row justify="space-around" class="mt-3">
            <div>
              <v-btn @click="undone()" text
                ><v-icon> mdi-magnify </v-icon>비밀번호 찾기</v-btn
              >|<v-btn @click="$router.push('/register')" text
                ><v-icon>mdi-account-outline</v-icon>회원가입</v-btn
              >
            </div>
          </v-row>
        </v-col>
      </div>

      {{ msg }}
    </v-card-text>

    <!-- 하단 버튼 -->
    <v-card-actions class="justify-center mb-n2">
      <v-btn
        @click="$router.go(-1)"
        class="rounded-bl-xl"
        height="60"
        width="200"
        color="#999999"
        ><div class="login-btn white--text">취소</div></v-btn
      >
      <v-btn
        @click="login(userId, userPwd)"
        class="rounded-br-xl"
        height="60"
        width="200"
        color="#081157"
        ><div class="login-btn white--text">로그인</div></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userId: "",
      userPwd: "",
      msg: ""
    };
  },
  methods: {
    undone() {
      alert("구현중인 기능입니다.");
    },
    //로그인
    login(userId, userPwd) {
      // LOGIN 액션 실행
      this.$store
        .dispatch("AUTH_REQUEST", { userId, userPwd })
        .then(res => {
          this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.login-title {
  font-size: 24px;
  font-weight: bold;
  padding: 16px;
  border-bottom: 2px solid black;
}
.login-message {
  font-size: 19px;
  padding: 20px;
  padding-bottom: 10px;
  color: #264085 !important;
  caret-color: #264085 !important;
}

.login-btn {
  font-size: 19px;
}
.v-btn {
  border-radius: 0px;
}

.v-application--is-ltr .v-card__actions > .v-btn.v-btn + .v-btn {
  margin-left: 0px;
}
</style>
