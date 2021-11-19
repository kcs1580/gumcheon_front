<template>
  <!-- 회원가입 페이지 -->
  <v-card rounded="xl" width="400">
    <v-card-text>
      <p class="black--text login-title text-center">
        회원가입
      </p>
    </v-card-text>
    <!-- 스텝퍼 -->
    <v-stepper alt-labels :value="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          계정입력
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">
          부가정보
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step >= 3" step="3">
          가입완료
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <!-- 스템퍼 1 계정입력-->
        <v-stepper-content step="1">
          <ValidationProvider>
            <v-card flat>
              <v-col class="pl-2 pr-2 mb-2">
                <!-- 이용 약관 -->
                <div>
                  <div class="policy-frame">
                    <v-checkbox
                      class="policy-all "
                      hide-details
                      v-model="chkList.chkAll"
                      @click="checkAll"
                      ><div slot="label">
                        <strong class="register-title"
                          >약관 모두 동의합니다. (선택포함)</strong
                        >
                      </div></v-checkbox
                    >
                    <div class="policy">
                      <v-checkbox hide-details v-model="chkList.chk1">
                        <div slot="label">
                          <span style="color:red">(필수) </span>
                          <span>14세 이상 입니다.</span>
                        </div>
                      </v-checkbox>
                      <v-checkbox hide-details v-model="chkList.chk2">
                        <div slot="label">
                          <span style="color:red">(필수) </span>
                          <span>
                            <a href="#" @click.stop="goTerms"
                              >개인정보취급방침</a
                            >에 동의합니다.</span
                          >
                        </div>
                      </v-checkbox>
                      <v-checkbox hide-details v-model="chkList.chk3">
                        <div slot="label">
                          <span style="color:red">(필수) </span>
                          <span>
                            <a href="#" @click.stop="goTerms">이용약관</a>에
                            동의합니다.</span
                          >
                        </div>
                      </v-checkbox>

                      <v-checkbox hide-details v-model="chkList.chk4">
                        <div slot="label">
                          <span>(선택) </span>
                          <span>
                            <a href="#" @click.stop="goTerms"
                              >마케팅 정보 활용 동의</a
                            ></span
                          >
                          <div>
                            동의하시면 다양한 혜택과 정보를 받아볼 수 있습니다.
                          </div>
                        </div>
                      </v-checkbox>
                    </div>
                  </div>
                </div>
                <!-- 닉네임 -->
                <div class="register-input">
                  <span class="register-title"> 닉네임</span>
                  <span class="d-inline-flex align-center ">
                    <v-text-field
                      dense
                      flat
                      placeholder="닉네임을 입력해주세요."
                      solo
                      class="text-field"
                      v-model="user.userNm"
                      :rules="nickRules"
                    /><v-btn @click="nameDuplCheck">중복확인</v-btn></span
                  >
                </div>
                <!-- 아이디 -->
                <div class="register-input">
                  <span class="register-title">이메일(가입 후 인증 필요)</span>
                  <span class="d-inline-flex align-start">
                    <v-text-field
                      style="width:160px"
                      dense
                      flat
                      solo
                      hide-details
                      full-width
                      class="text-field"
                      v-model="userId1"/>
                    <p>@</p>

                    <div>
                      <v-text-field
                        v-if="this.emailDomain == '직접입력'"
                        style="width:160px"
                        dense
                        flat
                        solo
                        hide-details
                        full-width
                        class="text-field"
                      /><v-select
                        class="text-field"
                        label="이메일 입력"
                        dense
                        flat
                        solo
                        hide-details
                        :items="emailList"
                        style="width:160px"
                        v-model="emailDomain"
                      /></div
                  ></span>
                </div>
                <!-- 비밀번호 -->
                <div class="register-input">
                  <span class="register-title">비밀번호</span>
                  <v-text-field
                    dense
                    flat
                    solo
                    class="text-field"
                    placeholder="비밀번호 입력(숫자, 영문 조합 10자리 이상)"
                    hide-details
                    v-model="user.userPwd"
                    type="password"
                  />
                </div>
                <!-- 비밀번호 확인 -->
                <div class="register-input">
                  <span class="register-title"> 비밀번호 확인</span
                  ><v-text-field
                    dense
                    solo
                    flat
                    class="text-field"
                    hide-details
                    v-model="confirmUserPwd"
                    type="password"
                  />
                </div>
              </v-col>
            </v-card>
          </ValidationProvider>
        </v-stepper-content>
        <!-- 스템퍼 2 부가정보 입력-->

        <v-stepper-content step="2">
          <v-card flat height="393">
            <v-row class="pl-2 pr-2 mb-2 " no-gutters>
              <v-radio-group
                hide-details
                class="usertype-radio"
                v-model="user.userType"
                row
              >
                <v-radio label="일반 등록" value="USER" />
                <v-radio label="개발자(개인)" value="DEVELOPER" />
                <v-radio label="개발자(회사)" value="DEVELOPER_COMPANY" />
              </v-radio-group>
              <div class="sub-text">
                <p>※개발자 등록은 가입 이후에도 신청할 수 있습니다.</p>
                <p>단, 개인 회사는 변경이 불가 합니다.</p>
              </div>

              <v-row no-gutters v-if="user.userType != 'USER'">
                <v-divider
                  style="margin-top:10px; margin-bottom:10px"
                ></v-divider>
                <v-col cols="12">
                  <v-checkbox hide-details class="mb-2" v-model="chk5">
                    <div slot="label">
                      <span style="color:red">(필수) </span>
                      <span>
                        <a href="" @click.stop="goTerms">개발자 등록 약관에</a>
                        동의합니다.</span
                      >
                    </div>
                  </v-checkbox>
                </v-col>
                <v-row no-gutters v-if="user.userType == 'DEVELOPER_COMPANY'">
                  <v-col class="mb-1" cols="12"
                    >회사명
                    <v-icon class="label-icon" size="5" color="#DB3030"
                      >mdi-star</v-icon
                    ></v-col
                  >
                  <v-col class="mb-2" cols="12">
                    <v-text-field
                      class="text-field"
                      solo
                      flat
                      dense
                      hide-details
                      placeholder="영문, 한글 입력하세요."
                      v-model="user.companyNm"
                    />
                  </v-col>
                </v-row>
                <v-col class="mb-1" cols="12">
                  계좌 정보
                  <v-icon class="label-icon" size="5" color="#DB3030"
                    >mdi-star</v-icon
                  >
                </v-col>
                <v-col cols="6">
                  <v-select
                    class="text-field mb-1 mr-1"
                    v-model="user.bankNm"
                    solo
                    flat
                    dense
                    hide-details
                    :items="items"
                    label="은행 선택"
                  ></v-select> </v-col
                ><v-col cols="6">
                  <v-text-field
                    class="text-field mb-1"
                    solo
                    flat
                    dense
                    hide-details
                    placeholder="예금주"
                    v-model="user.bankAccountHolder"
                /></v-col>
                <v-col cols="12">
                  <v-text-field
                    class="text-field"
                    solo
                    flat
                    dense
                    hide-details
                    placeholder="계좌번호 입력해주세요"
                    v-model="user.bankAccountNumber"
                /></v-col>
                <div class="sub-text">
                  <p>※정산관련 문의는 {이메일}로 문의 바랍니다.</p>
                </div></v-row
              >
            </v-row>
          </v-card>
        </v-stepper-content>
        <!-- 스템퍼 3 회원가입 완료-->
        <v-stepper-content style="height:273px" step="3">
          <v-row>
            <v-col cols="12">
              <v-row justify="center" class="mt-10 mb-5">
                <img height="100px" src="@/assets/img/register.png" /> </v-row
            ></v-col>
            <v-col cols="12">
              <p class="register-message text-center">
                <strong>이메일 주소</strong>로 인증 요청 메일이 발송되었습니다.
                <br />
                <strong>메일에서 인증 후 로그인 시도 해주세요.</strong>
              </p></v-col
            >
          </v-row></v-stepper-content
        >
      </v-stepper-items>
    </v-stepper>
    <!-- 스텝퍼 1 하단 버튼 -->
    <div v-if="step == 1">
      <v-btn
        @click="$router.go(-1)"
        class="rounded-bl-xl"
        height="60"
        width="200"
        color="#999999"
        ><div class="login-btn white--text">이전</div></v-btn
      >
      <v-btn
        @click="check1()"
        class="rounded-br-xl"
        height="60"
        width="200"
        color="#081157"
        ><div class="login-btn white--text">다음단계(1/3)</div></v-btn
      >
    </div>
    <!-- 스텝퍼 2 하단 버튼 -->

    <div v-if="step == 2">
      <v-btn
        @click="back()"
        class="rounded-bl-xl"
        height="60"
        width="200"
        color="#999999"
        ><div class="login-btn white--text">이전</div></v-btn
      >
      <v-btn
        @click="userRegister()"
        class="rounded-br-xl"
        height="60"
        width="200"
        color="#081157"
        ><div class="login-btn white--text">다음단계(2/3)</div></v-btn
      >
    </div>
    <!-- 스텝퍼 3 하단 버튼 -->

    <div v-if="step == 3">
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
        ><div class="login-btn white--text">로그인 하기</div></v-btn
      >
    </div>
    <!-- 회원가입 완료 로딩 dialog -->
    <v-dialog v-model="dialog" persistent width="300">
      <v-card>
        <v-card-text>
          기다려주세요.
          <v-progress-linear
            indeterminate
            color="primary"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import authApi from "@/api/auth.js";
import userApi from "@/api/user.js";
import { ValidationProvider } from "vee-validate";
export default {
  components: {
    //vee-validate
    ValidationProvider
  },
  data() {
    return {
      //회원가입 완료 progress bar dialog 스위치
      dialog: false,
      //스텝퍼 현재 스텝
      step: 1,
      //약관 체크리스트
      chkList: {
        chk1: false,
        chk2: false,
        chk3: false,
        chk4: false,
        chkAll: false
      },
      //닉네임 중복 여부
      nameCheck: false,
      //아이디 @ 앞부분
      userId1: "",
      //아이디 @ 뒷부분
      userId2: "",
      //아이디
      userId: "",
      //비밀번호
      userPwd: "",
      //비밀번호 재입력
      confirmUserPwd: "",
      //계좌정보 은행 리스트
      items: ["국민", "신한"],
      //사용자 유형 리스트
      userTypes: ["일반 등록", "개발자(개인)", "개발자(회사)"],
      //이메일 유효확인 메세지
      validEmail: "※이메일 형식이 올바르지 않습니다.",
      //이메일
      email: "",
      //유저 객체
      user: {
        userNm: "",
        userId: "",
        userPwd: "",
        userType: "USER",
        bankAccountHolder: "",
        bankAccountNumber: "",
        bankNm: "",
        companyNm: ""
      },
      //닉네임 규칙
      nickRules: [
        v => v.length > 1 || "닉네임을 입력해주세요.",
        v => v.length <= 100 || "제목을 100자 이하로 입력해주세요."
      ],
      //이메일 서비스 리스트
      emailList: [
        "naver.com",
        "hanmail.net",
        "gmail.com",
        "hotmail.com",
        "nate.com",
        "직접입력"
      ],
      //선택한 이메일 서비스
      emailDomain: "",
      //이메일 직접입력
      emailInput: ""
    };
  },
  watch: {
    //이용약관 체크리스트
    chkList: {
      deep: true,
      handler() {
        if (
          !this.chkList.chk1 ||
          !this.chkList.chk2 ||
          !this.chkList.chk3 ||
          !this.chkList.chk4
        ) {
          this.chkList.chkAll = false;
        } else if (
          this.chkList.chk1 &&
          this.chkList.chk2 &&
          this.chkList.chk3 &&
          this.chkList.chk4
        ) {
          this.chkList.chkAll = true;
        }
      }
    }
  },
  methods: {
    //약관 보기
    goTerms() {
      let routeData = this.$router.resolve({
        name: "terms",
        query: { data: "someData" }
      });
      window.open(routeData.href, "_blank");
    },
    //모두 동의/비동의
    checkAll() {
      if (this.chkList.chkAll) {
        this.chkList.chk1 = true;
        this.chkList.chk2 = true;
        this.chkList.chk3 = true;
        this.chkList.chk4 = true;
      } else {
        this.chkList.chk1 = false;
        this.chkList.chk2 = false;
        this.chkList.chk3 = false;
        this.chkList.chk4 = false;
      }
    },
    //이메일 @ 앞뒤로 연결하기
    concatId() {
      this.user.userId = this.userId1 + "@" + this.userId2;
    },
    //닉네임 중복확인
    nameDuplCheck() {
      if (this.user.userNm == "") {
        alert("※닉네임을 입력해 주세요.");
      } else {
        userApi
          .existsName(this.user.userNm)
          .then(res => {
            this.nameCheck = !res.data.isExist;
            console.log(this.nameCheck);
            if (this.nameCheck) {
              alert("닉네임 " + this.user.userNm + "은 사용 가능합니다.");
            } else {
              alert("닉네임 " + this.user.userNm + "은 사용 할 수 없습니다.");
            }
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    //계정정보 입력 유효성 체크
    check1() {
      this.concatId();
      if (
        this.chkList.chk1 == false ||
        this.chkList.chk2 == false ||
        this.chkList.chk3 == false
      ) {
        alert("※필수 약관에 동의해 주세요.");
      } else if (this.user.userNm == "") {
        alert("※닉네임을 입력해 주세요.");
      } else if (!this.nameCheck) {
        alert("※닉네임 중복확인을 해주세요");
      } else if (this.userId1 == "" || this.userId2 == "") {
        alert("※이메일을 입력해 주세요.");
      } else if (this.user.userPwd == "") {
        alert("※패스워드를 입력해 주세요.");
      } else if (!this.emailCheck(this.user.userId)) {
        alert("※이메일 형식이 올바르지 않습니다.");
      } else if (this.user.userPwd != this.confirmUserPwd) {
        alert("※비밀번호가 일치하지 않습니다.");
      } else {
        this.next();
      }
    },
    //이메일 유효성 체크
    emailCheck(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    //비밀번호 유효성 체크
    pwdCheck(pwd) {
      var re = /^.*(?=.{10,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
      return re.test(pwd);
    },

    undone() {
      alert("구현중인 기능입니다.");
    },
    //다음 스텝으로 이동
    next() {
      this.step += 1;
    },
    //이전 스텝으로 이동
    back() {
      this.step -= 1;
    },
    //회원가입 요청
    register() {
      this.dialog = true;
      this.user.userType = [this.user.userType];
      userApi
        .signup(this.user)
        .then(() => {
          this.dialog = false;
          this.next();
        })
        .catch(res => {
          alert("회원가입 요청 실패");

          console.log(res);
        });
    },
    //부가정보 입력 유효성 체크
    userRegister() {
      if (this.user.userType != "USER" && !this.chk5) {
        alert("※개발자 등록 약관에 동의해 주세요.");
      } else if (
        this.user.userType == "DEVELOPER_COMPANY" &&
        this.user.companyNm == ""
      ) {
        alert("※회사명을 입력해 주세요.");
      } else if (
        this.user.userType != "USER" &&
        (this.user.bankNm == "" ||
          this.user.bankAccountHolder == "" ||
          this.user.bankAccountNumber == "")
      ) {
        alert("※계좌정보를 입력해 주세요.");
      } else {
        this.register();
      }
    }
  }
};
</script>

<style scoped lang="scss">
.radio-btn {
  border: 1px solid #e5e5e5;
}
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
.v-stepper__header {
  box-shadow: none;
}
.v-stepper {
  box-shadow: none;
}
.v-stepper__content {
  padding-top: 0px;
}
.v-stepper__step {
  padding-bottom: 0px;
}
.v-card__text {
  padding-bottom: 0px;
}
.v-input--selection-controls {
  margin-top: 0px;
  align-items: start !important ;
}
.v-application p {
  margin-bottom: 0px;
}

.policy-frame {
  border: 2px solid #e5e5e5;
  margin-bottom: 15px;
  margin-top: 10px;
}

.policy-all {
  padding: 15px;
  border-bottom: 2px solid #e5e5e5;
}
.policy {
  padding: 15px;
}
.text-field {
  border: 2px solid #e5e5e5;
}
.register-title {
  color: black;
}
.register-input {
  margin-top: 15px;
}
.usertype-radio {
  margin-top: 15px;
  margin-bottom: 5px;
  width: 100%;
}
::v-deep .usertype-radio .v-label {
  font-size: 12px;
}

.label-icon {
  margin-top: -12px !important;
  color: #db3030 !important;
}
.sub-text {
  font-size: 14px;
  margin-top: 5px;
  color: #666666;
}
::v-deep .v-input--radio-group__input {
  justify-content: center;
  border: 2px solid #e5e5e5;
  padding: 5px;
}
.login-frame {
  background: #b92b27; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom right,
    #ec705b,
    10%,
    #213e86
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom right,
    #ec705b,
    10%,
    #213e86
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
