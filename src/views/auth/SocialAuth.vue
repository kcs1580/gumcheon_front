<template>
  <!-- 소셜로그인 인증 페이지 -->
  <v-card rounded="xl" width="400">
    <v-card-text>
      <p class="black--text login-title text-center">
        소셜 로그인
      </p>
      <v-row justify="center" class="mt-9 mb-4">
        <v-icon size="80px" color="#081157">mdi-login</v-icon>
      </v-row>
      <p class="login-message text-center">
        소셜 로그인 <br />
        성공
      </p>
    </v-card-text>

    <!-- 하단 버튼 -->
    <v-card-actions class="justify-center mb-n2 ">
      <v-btn
        @click="$router.push('/')"
        class="rounded-bl-xl rounded-br-xl"
        height="60"
        width="400"
        color="#081157"
        ><div class="login-btn white--text">메인으로</div></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import authApi from "@/api/auth.js";
import userApi from "@/api/user.js";

export default {
  data() {
    return {
      //소셜 로그인 토큰
      token: ""
    };
  },
  methods: {
    //로그아웃
    logout() {
      authApi.logoutWithToken(this.$route.query.token).then(() => {
        this.$router.push("/login");
      });
    },
    //소셜 로그인
    socialLogin(token) {
      this.$store.dispatch("SOCIAL_AUTH", { token });
    }
  },
  beforeCreate() {
    //라우트 쿼리에서 인증토큰 가져오기
    this.$store.dispatch("SOCIAL_AUTH", this.$route.query.token);
  }
};
</script>

<style scoped lang="scss">
.valid {
  color: red;
  text-align: center;
}
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
.email-input {
  border: 2px solid #e5e5e5;
}
</style>
