<template>
  <!-- 로그인 페이지 -->
  <div style="text-align: center">
    
        <v-card
          flat
          width="375px"
          style="padding-top: 81px; padding-bottom: 15px"
          ><button text>
            <div style="width: 239px; height: 50px; display: inline-block">
              <v-img
                @click="gotoUrl('/')"
                src="@/assets/img/gfmc_ci_gray.png"
              />
            </div>
          </button>

          <div @keydown.enter="login(id, pw)">
            <div
              class="dialog-input"
              style="
                width: 265px;
                margin-top: 39px;
                margin-bottom: 39px;
                display: inline-block;
              "
            >
              <v-text-field
              id="id"
              ref="id"
                style="margin: 0px; padding: 0px"
                height="49px"
                placeholder="아이디를 입력해주세요"
                hide-details
                v-model="id"
                flat
              />
              <v-text-field
              id="pw"
                            ref="pw"

                style="margin: 0px; padding: 0px"
                flat
                clearable
                height="49px"
                hide-details
                placeholder="비밀번호를 입력해주세요"
                v-model="pw"
                type="password"
              />
            </div>

            <v-btn
            id="btn_lgn"
              @click="login(id, pw)"
              rounded
              height="52"
              width="291"
              color="#0276F9
"
              ><div class="login-btn white--text">로그인</div></v-btn
            >
            <div style="display: inline-block; margin-top: 12px">
              <a class="find-btn" @click="undone()">아이디 찾기</a>|<a
                class="find-btn"
                @click="undone()"
                >비밀번호 찾기</a
              >
            </div>

            <v-btn id="btn_init"
         
              @click="(aplyId='',userOgdp='',userTeam='',userTelno='', dialog = true)"
              rounded
              height="52"
              width="291"
              color="#0276F9
"
              outlined
              style="margin-top: 72px"
              ><div class="login-btn">비밀번호 초기화</div></v-btn
            >
          </div>
          <footerbar />
        </v-card>


        <v-dialog v-model="dialog" max-width="321">
      <v-card rounded="xl" width="321px">
        <v-row no-gutters align="center" justify="center">
          <div
            class="dialog-input"
            style="width: 261px; display: inline-block; margin-top: 23px"
          >
            <v-text-field id="aplyId" ref="aplyId"
              height="34px"
              placeholder="아이디를 입력해주세요"
              hide-details
              v-model="aplyId"
            />
            <v-text-field id="userOgdp" ref="userOgdp"
              
              height="34px"
              hide-details
              placeholder="소속부서를 입력해주세요"
              v-model="userOgdp"
            />
            <v-text-field id="userTeam" ref="userTeam"
              
              height="34px"
              hide-details
              placeholder="소속팀을 입력해주세요"
              v-model="userTeam"
            />
            <v-text-field id="userTelno" ref="userTelno"
              
              height="34px"
              hide-details
              placeholder="직통 전화번호를 입력해주세요"
              v-model="userTelno"
            />
          </div>
          <div style="width: 273px; margin-top: 24px" class="reset-detail-box">
            시스템관리자에게 비밀번호 초기화를 요청합니다.<br />
            초기 비밀번호를 안내받으신 후 로그인하여 주시기 바랍니다.
          </div>

          <!-- 하단 버튼 -->

          <v-btn id="btn_init_aply"
            style="margin-top: 26px; margin-bottom: 29px"
            @click="pwInitApply(aplyId, userOgdp, userTeam, userTelno)"
            rounded
            height="49"
            width="266"
            color="#0276F9"
            ><div
              class="login-btn white--text"
            >
              비밀번호 초기화 신청
            </div></v-btn
          >    

        </v-row>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" max-width="321">
     
      <v-card rounded="xl" width="321px">
        <v-row no-gutters align="center" justify="center">
          <div
            class="dialog-input"
            style="width: 261px; display: inline-block; margin-top: 23px"
          >
            <v-text-field id="prPw"
            ref="prPw"
              height="34px"
              placeholder="기존 비밀번호를 입력해주세요"
              hide-details
              v-model="prPw"
              type="password"

            />
            <v-text-field id="chPw"
            ref="chPw"
              clearable
              height="34px"
              hide-details
              placeholder="변경할 비밀번호를 입력해주세요"
              v-model="chPw"
              type="password"
            />
            <v-text-field id="chPw2"
            ref="chPw2"
              clearable
              height="34px"
              hide-details
              placeholder="변경할 비밀번호를 한번 더 입력해주세요"
              v-model="chPw2"
              type="password"
            />
          </div>
          <div style="width: 273px; margin-top: 24px" class="reset-detail-box">
            비밀번호는 8자리 이상 숫자, 특수문자를<br />
            반드시 포함하여야 합니다.
          </div>

          <!-- 하단 버튼 -->

          <v-btn id="btn_ch"
            style="margin-top: 26px; margin-bottom: 29px"
            @click="changePw(id, prPw, chPw)"
            rounded
            height="49"
            width="266"
            color="#0276F9"
            ><div
             
              class="login-btn white--text"
            >
              비밀번호 변경
            </div></v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { headerbar, footerbar } from "@/views/user";

import authApi from "@/api/auth.js";
export default {
  components: { headerbar, footerbar },

  data() {
    return {
      user: {
        id: "",
        pw: "",
        user_nm: "",
      },
      aplyId:'',
      userOgdp:'',
      userTeam:'',
      userTelno:'',
      id: "",
      pw: "",
      prPw:"",
      chPw:"",
      chPw2:"",
      user_nm: "",
      msg: "",
      dialog: false,
      dialog2: false,
    };
  },
  methods: {
    //비밀번호 초기화 신청
    pwInitApply(aplyId, userOgdp,userTeam,userTelno){
     if(aplyId ==""){
  alert('아이디가 입력되지 않았습니다.')
  this.$nextTick(this.$refs.aplyId.focus());
}
else if(userOgdp==""){
alert('비밀번호가 입력되지 않았습니다.')
  this.$nextTick(this.$refs.userOgdp.focus());
}else if(userTeam==""){
alert('비밀번호가 입력되지 않았습니다.')
   this.$nextTick(this.$refs.userTeam.focus());
}else if(userTelno==""){
alert('비밀번호가 입력되지 않았습니다.')
   this.$nextTick(this.$refs.userTelno.focus());
}else{

  authApi
        .pwInitApply({aplyId, userOgdp,userTeam,userTelno})
        .then((res) => {         
           if(res.data.rscode == "1"){
        alert(res.data.message)
          }else{
 this.dialog=false
         alert(res.data.message)

          }
        })
        .catch((res) => {
          console.log(res);
        });
}
    },

     //비밀번호 변경
     changePw(id, prPw, chPw){
     if(this.prPw ==""){
  alert('기존 비밀번호가 입력되지 않았습니다.')
  this.$nextTick(this.$refs.prPw.focus());
}
else if(this.chPw==""){
alert('변경할 비밀번호가 입력되지 않았습니다.')
  this.$nextTick(this.$refs.chPw.focus());
}else if(this.chPw2==""){
alert('변경할 비밀번호2가 입력되지 않았습니다.')
  this.$nextTick(this.$refs.chPw2.focus());
}else{

  if(this.chPw != this.chPw2){
this.$refs.chPw.focus();
this.chPw=""
this.chPw2=""

}

else{

 authApi
        .isUser({id,prPw})
        .then((res) => {         
          if(res.data.rscode == "1"){
alert(res.data.message)
this.dialog2 = false;
return
}

authApi
        .changePw({id, chPw})
        .then((res) => {         
           if(res.data.rscode == "1"){
        alert(res.data.message)
          }else{
 this.dialog2=false
         alert(res.data.message)

          }
        })
        .catch((res) => {
          console.log(res);
        });


        })
        .catch((res) => {
          console.log(res);
        });

}
  
}
    },


    //페이지이동
    gotoUrl(toUrl) {
      if (toUrl === this.$route.path) {
        location.reload();
      } else this.$router.push(toUrl);
    },
    
    //로그인
    login(id, pw) {

      if(id ==""){
  alert('아이디가 입력되지 않았습니다.')
  this.$refs.id.focus();
}
else if(pw==""){
alert('비밀번호가 입력되지 않았습니다.')
  this.$refs.pw.focus();

}
else{
      // LOGIN 액션 실행
      this.$store
        .dispatch("AUTH_REQUEST", { id, pw })
        .then((resp) => {
          let rscode = resp.data.rscode
          
          //아이디 비밀번호 잘못
        if(rscode == "1"){
        alert("아이디 혹은 비밀번호가 잘못 입력되었습니다.")
        this.pw = ""
          }
          //비밀번호 초기화 신청 상태입니다. 시스템관리자에게 문의하세요.
          else if(rscode == "2"){
            alert("비밀번호 초기화 신청 상태입니다. 시스템관리자에게 문의하세요.")
            this.pw = ""


          }
          //
          else if(rscode == "3"){
             alert("비밀번호 초기화가 필요합니다.")
                    this.pw = ""
                    this.prPw =""
                    this.chPw =""
                    this.chPw2=""

            this.dialog2 = true;
          }
          //로그인 성공
          else{
             this.$router.push("/");
          }

        })
        .catch((error) => {
          console.log(error)
                });}
    },

 

    //회원가입
    signup(id, user_nm, pw) {
if(id ==""){
  alert('아이디가 입력되지 않았습니다.')
}
else if(pw==""){
alert('비밀번호가 입력되지 않았습니다.')
}
else{
      this.user.id = id;
      this.user.user_nm = user_nm;
      this.user.pw = pw;
      this.loading = true;

      userApi
        .signup(this.user)
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.$router.push("/login");
        })
        .catch((res) => {
          console.log(res);
        });
}
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .dialog-input {
  font-size: 15px !important;
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

.reset-detail-box {
  font-size: 11px;
  width: 273px;
  height: 34px;
  text-align: center;
  margin: 0 auto;
}
.v-btn:hover :before {
  background: #55a5ff;
}
.find-btn {
  font-size: 13px;
  font-style: none;
  color: #313640;
  margin: 14px;
}
</style>
