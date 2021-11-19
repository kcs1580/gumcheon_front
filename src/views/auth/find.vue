<template>
  <!-- 비밀번호 찾기 페이지 -->
  <v-card rounded="xl" width="400">
    <v-card-text>
      <p class="black--text login-title text-center">
        비밀번호 찾기
      </p>
      <v-row justify="center" class="mt-9 mb-4">
        <img height="100px" src="@/assets/img/find.png" />
      </v-row>
      <p class="login-message text-center">
        가입하신 이메일을 <br />
        입력해주세요
      </p>
      <v-row justify="center" style="height:106px">
        <v-col cols="12" @keydown.enter="find(email)" class="pl-7 pr-7 ">
          <v-text-field
            autofocus
            dense
            placeholder="이메일 입력"
            class="mb-1 email-input"
            solo
            flat
            hide-details
            v-model="email"
          />
          <div class="valid">{{ validEmail }}</div>
        </v-col>
      </v-row>

      {{ msg }}
    </v-card-text>

    <!-- 하단 버튼 -->
    <v-card-actions class="justify-center mb-n2 ">
      <v-btn
        @click="$router.go(-1)"
        class="rounded-bl-xl"
        height="60"
        width="200"
        color="#999999"
        ><div class="login-btn white--text">취소</div></v-btn
      >
      <v-btn
        @click="find(email)"
        class="rounded-br-xl"
        height="60"
        width="200"
        color="#081157"
        ><div class="login-btn white--text">찾기</div></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      userPwd: "",
      msg: "",
      validEmail: "※이메일 형식이 올바르지 않습니다.",
      valid: true,
      email: ""
    };
  },
  methods: {
    validCheck(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    undone() {
      alert("구현중인 기능입니다.");
    },
    find() {
      this.valid = this.validCheck(this.email);
    }
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
