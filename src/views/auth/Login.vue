<template>
  <!-- 로그인 페이지 -->  
  <div style="text-align:center">
  <v-card flat width="375px" >
     <div style="width:239px; display:inline-block" >
    <v-img         
              src="@/assets/img/gfmc_ci.svg" 
            />
   
     </div>
       
     
      <div style="margin-top:35px; padding-top:0px;" @keydown.enter="login(userId, userPwd)">
        <div style="width:265px; margin-bottom:39px;display:inline-block">
          <v-text-field
           
            placeholder="아이디를 입력해주세요"
           
          hide-details
           
            v-model="userId"
          />
          <v-text-field
            clearable
                     hide-details

            placeholder="비밀번호를 입력해주세요"
           
            v-model="userPwd"
            type="password"
          />
        </div>
        

       
          <v-btn
        @click="login(userId, userPwd)"
       rounded
        height="52"
        width="283"
        color="#0276F9
"
        ><div class="login-btn white--text">로그인</div></v-btn
      >           <div style="display:inline-block">
           
              <a class="find-btn" @click="undone()" 
                >아이디 찾기</a
              >|<a class="find-btn" @click="undone()"  
                >비밀번호 찾기</a
              >
     
       </div>
             <v-btn
        @click="$router.push('/register')"
       rounded
        height="52"
        width="283"
        color="#0276F9
" outlined
        ><div class="login-btn">회원가입</div></v-btn
      >
         
      </div>

      {{ msg }}
      </v-card>
  </div>

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
  font-size: 18px;
}
.v-btn {
  border-radius: 12px;
}
.find-btn{
  font-size: 13px;
  font-style: none;
color: #313640;
margin: 14px;
}

.v-application--is-ltr .v-card__actions > .v-btn.v-btn + .v-btn {
  margin-left: 0px;
}
</style>
