<template>
  <!--회원가입 이메일 인증 -->
  <v-card rounded="xl" width="400" v-if="!isLoading">
    <v-card-text>
      <p class="black--text login-title text-center">
        이메일 인증
      </p>
      <v-row>
        <v-col cols="12">
          <v-row justify="center" class="mt-10 mb-5">
            <img height="100px" src="@/assets/img/register.png" /> </v-row
        ></v-col>
        <v-col cols="12">
          <p class="auth-message text-center">
            <strong v-if="authResult">이메일 인증이 완료되었습니다.</strong>
            <strong v-else>이메일 인증에 실패하였습니다.</strong>
          </p></v-col
        >
      </v-row>
    </v-card-text>

    <!-- 하단 버튼 -->
    <v-card-actions class="justify-center mb-n2 ">
      <v-btn
        @click="$router.push('/')"
        class="rounded-bl-xl"
        height="60"
        width="200"
        color="#999999"
        ><div class="login-btn white--text">메인으로</div></v-btn
      >
      <v-btn
        @click="$router.push('/login')"
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
import userApi from "@/api/user.js";
export default {
  data() {
    return {
      //로딩변수
      isLoading: true,
      //인증성공유무
      authResult: false
    };
  },

  methods: {
    //이메일인증
    authEmail() {
      let uuid = this.$route.params.uuid;
      userApi
        .emailValidation(uuid)
        .then(res => {
          this.isLoading = false;
          this.authResult = true;
        })
        .catch(res => {
          this.isLoading = false;
          this.authResult = false;
        });
    }
  },
  created() {
    this.authEmail();
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
.auth-message {
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
