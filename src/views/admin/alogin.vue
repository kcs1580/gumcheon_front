<template>
  <!-- 로그인 페이지 -->  
  <div class="login-frame">
  <v-card flat width="375px" >
     <div class="ci-image">
    <v-img         
              src="@/assets/img/gfmc_ci.svg" 
            />
   
     </div>
       
     
      <div style="margin-top:35px; padding-top:0px;" @keydown.enter="login(id, pw)">
        <div style="width:265px; margin-bottom:39px;display:inline-block">
          <v-text-field
           
            placeholder="아이디를 입력해주세요"
           
          hide-details
           
            v-model="id"
          />
          <v-text-field
            clearable
                     hide-details

            placeholder="비밀번호를 입력해주세요"
           
            v-model="pw"
            type="password"
          />

          
        </div>
        

       
          <v-btn
        @click="login(id, pw)"
       rounded
        height="52"
        width="283"
        color="#0276F9
"
        ><div class="login-btn white--text">로그인</div></v-btn
      >         
             <v-btn
        @click="signup(id,user_nm, pw)"
       rounded
        height="52"
        width="283"
        color="#0276F9
" outlined
        ><div class="login-btn">회원가입</div></v-btn
      >
         
      </div>

      
      </v-card>
  </div>

</template>

<script>
import userApi from "@/api/user.js";
export default {
  data() {
    return {
      user:{
         id: "",
      pw: "",
      user_nm: "",
      },
      id: "",
      pw: "",    
      user_nm: "",  
      msg: "",

    };
  },
  methods: {
    undone() {
      alert("구현중인 기능입니다.");
    },
    //로그인
    login(id, pw) {
      // LOGIN 액션 실행
      this.$store
        .dispatch("AUTH_REQUEST", { id, pw })
        .then(res => {
       this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    signup(id, user_nm,pw) {

this.user.id = id;
this.user.user_nm = user_nm;
this.user.pw = pw;
      this.loading = true

      userApi
        .signup(this.user)
        .then(res => {
         console.log(res);
          this.loading = false;
this.$router.push("/login")
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.login-frame{
  text-align: center;
}
.ci-image{
  width:239px; display:inline-block
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
