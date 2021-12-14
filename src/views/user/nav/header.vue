<template>
  <!-- header -->
  <div style="height=72px">
    <v-app-bar color="#0276F9"
      class="protect-header-frame "
    >
      <v-layout
        justify-space-between
        class="d-flex align-center protect-header"
      >
        <div class="left-side">
          <!-- gfmc 로고 -->
          <div class="title" style="width:174px;" @click="gotoUrl('/')">
            <v-img height="28px"             
              src="@/assets/img/gfmc_ci.png"
              
            />
          </div>
          <!-- 네비게이션 메뉴 -->
          <div
            class="d-none d-md-flex d-lg-flex d-xl-flex menus"
            v-for="(item, i) in menus"
            :key="i"
          >
            <div class="menu-btn" @click="gotoUrl(item.link)">
              {{ item.title }}
            </div>
          </div>
        </div>

        <div class="header-btn d-none d-lg-flex d-xl-flex">
          

          <div v-if="!getToken">
            <div class="right-side">
              <!-- 회원가입/ 로그인 버튼 -->
              <div @click="$router.push('/register')">
                <Button
                  width="120"
                  height="36"
                  :rounded="true"
                  :textBlack="true"
                  color="white"
                  :ripple="false"
                  :contents="$t('nav.signup')"
                  style="margin-right:10px;"
                />
              </div>
              <div @click="toLogin">
                <Button
                  width="120"
                  height="36"
                  :rounded="true"
                  color="#EC705B"
                  :ripple="false"
                  style="color:white"
                  :contents="$t('nav.login')"
                />
              </div>
            </div>
          </div>
          <div v-else>
        <v-row class="mt-3" no-gutters justify="center">
          <v-btn
            color="white"
            height="36px"
            rounded
            style="padding-left:0px; padding-right:5px; pointer-events: none"
          >
            <v-avatar height="33" width="33" left>
              <img src="@/assets/img/user.png" /> </v-avatar
            ><span class="userInfoTag">{{ getuserNm }}</span></v-btn
          >
        </v-row>

        <v-list>
         
          <v-list-item link @click="logout">
            <v-list-item-title>로그 아웃</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
        </div>
      </v-layout>
      <!-- 네비게이션 드로어 아이콘 -->
      <v-app-bar-nav-icon
        class="d-lg-none d-xl-none"
        style="color:white !important"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- 네비게이션 드로어 -->
    <v-navigation-drawer
      temporary
      v-model="drawer"
      absolute
      right
      style="position:fixed; top:0; right:0;  "
    >
      <div v-if="getToken">
        <v-row class="mt-3" no-gutters justify="center">
          <v-btn
            color="white"
            height="36px"
            rounded
            style="padding-left:0px; padding-right:5px; pointer-events: none"
          >
            <v-avatar height="33" width="33" left>
              <img src="@/assets/img/user.png" /> </v-avatar
            ><span class="userInfoTag">{{ getuserNm }}</span></v-btn
          >
        </v-row>

        <v-list>
         
          <v-list-item link @click="logout">
            <v-list-item-title>로그 아웃</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <div v-else>
        <v-list>
          <v-list-item @click="$router.push('/register')">
            <v-list-item-title>{{ $t("nav.signup") }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toLogin" link>
            <v-list-item-title>{{ $t("nav.login") }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          link
          @click="gotoUrl(item.link)"
          v-for="(item, i) in menus"
          :key="i"
        >
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Button from "@/components/Button.vue";

export default {
  components: {
    mapGetters,
    mapActions,
    Button
  },
  data() {
    return {
      //네비게이션 드로어 스위치
      drawer: false,
      //로딩 변수
      isLoaded: false,
      //i18n 로케일 변수
      locale: "ko",
      //네비게이션 메뉴 리스트
      menus: [
        { title: "불편접수", link: "/" },
        { title: "내 정보관리", link: "/" },
        { title: "접수 및 처리 현황", link: "/" },
        { title: "공지사항", link: "/notice" },
      ]
    };
  },
  methods: {
    //Vuex Helper Actions
    ...mapActions(["AUTH_LOGOUT"]),
    //timebees 로고 이미지 로딩 완료
    onImgLoad() {
      this.isLoaded = true;
    },
    //메뉴 이동
    gotoUrl(toUrl) {
      if (toUrl === this.$route.path) {
        location.reload();
      } else this.$router.push(toUrl);
    },
    undone() {
      alert("구현중인 기능입니다.");
    },
    //로그아웃
    logout() {
      this.AUTH_LOGOUT().then(() => this.gotoUrl("/"));
    },
    //로그인 페이지로 이동
    toLogin() {
      this.$router.push("/login");
    },
    //locale 한국어로 변경
    korean() {
      this.$i18n.locale = "ko";
      this.locale = "ko";
    },
    //locale 영어로 변경
    english() {
      this.$i18n.locale = "en";
      this.locale = "en";
    }
  },
  computed: {
    //Vuex Helper Getters
    ...mapGetters(["getToken", "getuserNm", "getuserrole"])
  }
};
</script>

<style lang="scss">
.protect-header-frame {
  position: fixed;
  .v-toolbar__content {
    justify-content: center;
  }
  .protect-header {
    max-width: 1180px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .left-side {
      display: flex;
      align-items: center;
      flex-direction: row;
      .title {
        cursor: pointer;
        margin-right: 60px;
      }
      .menus {
        margin-right: 40px;
        font-size: 19px;
      }
      .menu-btn {
        color: black;
        cursor: pointer;
      }
    }
    .right-side {
      display: flex;
      align-items: center;
      flex-direction: row;
      font-size: 12px;
      .apply-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        background-color: white;
        color: black;
        width: 100px;
        height: 25px;
      }
      .login-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ec705b;
        width: 100px;
        height: 25px;
        border-radius: 25%;
      }
    }
  }
}
.logoutchip {
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
.userInfoTag {
  width: 80px;
  padding: 5px;
  padding-right: 10px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.v-list-item--dense,
.v-list--dense .v-list-item {
  min-height: 25px;
}
</style>
