<template>
  <v-container fluid class="login-frame">
    <v-row align="center" justify="center">
      <!-- <v-row justify="center">
          <v-card-title>
            <form @submit.prevent="login(userId, userPwd)">
              <v-text-field
                required
                type="text"
                v-model="userId"
                placeholder="Email Address"
              />
              <v-text-field
                required
                type="password"
                v-model="userPwd"
                placeholder="Password"
              />
              <v-btn> <input type="submit" value="Login"/></v-btn>
            </form>
          </v-card-title>
        </v-row> -->
      <!-- 오버레이 - 교육신청 팝업 -->
      <v-card rounded="xl" height="480" width="400">
        <!-- 타이틀 -->

        <!-- 인풋 박스 -->
        <v-card-text>
          <p class="black--text login-title text-center">
            {{ $t("nav.login") }}
          </p>
          <p class="login-message text-center">
            이메일과 비밀번호를 <br />
            입력해주세요
          </p>
          <div style="height:210px">
            <v-col class="pl-7 pr-7 mb-10">
              <v-text-field
                dense
                placeholder="이메일 입력"
                class="mb-1 email-input"
                hide-details
                outlined
              />
              <v-text-field
                dense
                placeholder="비밀번호 입력"
                hide-details
                outlined
              />
            </v-col>
            <v-col cols="12">
              <v-row justify="space-around">
                <div>
                  <v-btn append text
                    ><v-icon> mdi-magnify </v-icon>비밀번호 찾기</v-btn
                  >|<v-btn text
                    ><v-icon>mdi-account-outline</v-icon>회원가입</v-btn
                  >
                </div>
              </v-row>
            </v-col>
          </div>

          {{ msg }}
        </v-card-text>

        <!-- 하단 버튼 -->
        <v-card-actions class="justify-center ">
          <v-btn class="rounded-bl-xl" height="60" width="200" color="#999999"
            ><div class="login-btn white--text">취소</div></v-btn
          >
          <v-btn class="rounded-br-xl" height="60" width="200" color="#081157"
            ><div class="login-btn white--text">로그인</div></v-btn
          >
        </v-card-actions>
      </v-card>

      <!-- <router-link to="/register" tag="a">회원가입</router-link>
    <br />
    <router-link to="/find" tag="a">비밀번호찾기</router-link> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Button from "@/components/Button.vue";

export default {
  components: { Button, mapActions },

  data() {
    return {
      overlay: true,
      userId: "",
      userPwd: "",
      msg: ""
    };
  },
  methods: {
    ...mapActions(["AUTH_REQUEST", "AUTH"]),
    login(userId, userPwd) {
      // LOGIN 액션 실행

      this.AUTH_REQUEST({ userId, userPwd })
        .then(res => {
          this.$router.go(-1);
        })
        .catch(({ message }) => (this.msg = message));
    },
    Auth() {
      this.AUTH();
    }
  }
};
</script>

<style scoped>
.login-title {
  font-size: 24px;
  font-weight: bold;
  padding: 16px;
  border-bottom: 2px solid black;
}
.login-message {
  font-size: 19px;
  padding: 20px;
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
