<template>
  <!-- 로그인 페이지 -->  
  <div style="text-align:center">
        <v-dialog
      v-model="dialog"
      max-width="321"
    >
      <template v-slot:activator="{ on, attrs }">
       
  <v-card flat width="375px" >
     <div style="width:239px; height:50px; display:inline-block" >
    <v-img         
              src="@/assets/img/gfmc_ci.svg" 
            />
   
     </div>
       
     
      <div  @keydown.enter="login(id, pw)">
        <div style="width:265px;margin-top:39px; margin-bottom:39px;display:inline-block">
          <v-text-field style="margin:0px;padding:0px" height="49px"          
            placeholder="아이디를 입력해주세요"           
            hide-details           
            v-model="id"
            flat
          />
          <v-text-field style="margin:0px;padding:0px"
          flat
            clearable height="49px"   
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
        width="291"
        color="#0276F9
"
        ><div class="login-btn white--text">로그인</div></v-btn
      >           <div style="display:inline-block; margin-top:12px">
           
              <a class="find-btn" @click="undone()" 
                >아이디 찾기</a
              >|<a class="find-btn" @click="undone()"  
                >비밀번호 찾기</a
              >
     
       </div>


       
             <v-btn v-bind="attrs"  v-on="on" 
        @click="signup(id,user_nm, pw),dialog = false"
       rounded
        height="52"
        width="291"
        color="#0276F9
" outlined style="margin-top:72px"
        ><div   
         class="login-btn">비밀번호 초기화</div></v-btn
      >

    
         
      </div>
              <footerbar/>

      </v-card>
      </template>
     <v-card rounded="xl" width="321px" > 
       <v-row no-gutters align="center" justify="center" >
        <div style="width:261px;display:inline-block;margin-top:23px;">
          <v-text-field height="34px"          
            placeholder="아이디를 입력해주세요"           
            hide-details           
            v-model="id"
          />
          <v-text-field
            clearable height="34px"
            hide-details
            placeholder="소속부서를 입력해주세요"           
            v-model="pw"
            type="password"
          />
  <v-text-field
            clearable height="34px"
            hide-details
            placeholder="소속팀을 입력해주세요"           
            v-model="pw"
            type="password"
          />
  <v-text-field
            clearable height="34px"
            hide-details
            placeholder="직통 전화번호를 입력해주세요"           
            v-model="pw"
            type="password"
          />
      
      
        </div>
        <div style="width:273px; margin-top:24px;" class="reset-detail-box">          
         시스템관리자에게 비밀번호 초기화를 요청합니다.<br/>    
      초기 비밀번호를 안내받으신 후 로그인하여 주시기 바랍니다.
      </div>
    

     <!-- 하단 버튼 -->
 
 <v-btn style="margin-top:26px;margin-bottom:29px"
        @click="signup(id,user_nm, pw)"
       rounded
        height="49"
        width="266"
        color="#0276F9"
        ><div   v-bind="attrs"
          v-on="on" class="login-btn white--text" @click="dialog = false">비밀번호 초기화 신청</div></v-btn
      >       
          </v-row> </v-card>
    </v-dialog>
      

       <v-dialog
      v-model="dialog2"
      max-width="321"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
비밀번호 재설정        </v-btn>
      </template>
     <v-card rounded="xl" width="321px" > 
       <v-row no-gutters align="center" justify="center" >
        <div style="width:261px;display:inline-block;margin-top:23px;">
          <v-text-field height="34px"          
            placeholder="기존 비밀번호를 입력해주세요"           
            hide-details           
            v-model="id"
          />
          <v-text-field
            clearable height="34px"
            hide-details
            placeholder="변경할 비밀번호를 입력해주세요"           
            v-model="pw"
            type="password"
          />
  <v-text-field
            clearable height="34px"
            hide-details
            placeholder="변경할 비밀번호를 한번 더 입력해주세요"           
            v-model="pw"
            type="password"
          />
      
      
        </div>
        <div style="width:273px; margin-top:24px;" class="reset-detail-box">          
         비밀번호는 8자리 이상 숫자, 특수문자를<br/>    
반드시 포함하여야 합니다.</div>
    

     <!-- 하단 버튼 -->
 
 <v-btn style="margin-top:26px;margin-bottom:29px"
        @click="signup(id,user_nm, pw)"
       rounded
        height="49"
        width="266"
        color="#0276F9"
        ><div   v-bind="attrs"
          v-on="on" class="login-btn white--text" @click="dialog = false">비밀번호 초기화 신청</div></v-btn
      >       
          </v-row> </v-card>
    </v-dialog>

  </div>

</template>

<script>
import { headerbar, footerbar } from "@/views/user";

import userApi from "@/api/user.js";
export default {
    components: { headerbar, footerbar },

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
       dialog: false,dialog2: false,

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
.v-btn{
  border-radius: 12px;
}

.reset-detail-box{
  font-size: 11px;
  width: 273px;
  height: 34px;
  text-align: center;
  margin: 0 auto;
}
.v-btn:hover :before  {
background: #55A5FF;}
.find-btn{
  font-size: 13px;
  font-style: none;
color: #313640;
margin: 14px;
}


</style>
