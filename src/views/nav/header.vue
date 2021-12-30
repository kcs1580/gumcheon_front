<template>
  <!--사용자 페이지 header -->
  <div style="height=72px">
    <v-app-bar flat color="#0276F9" class="protect-header-frame">
      <v-layout
        justify-space-between
        class="d-flex align-center protect-header"
      >
        <div class="left-side">
          <!-- gfmc 로고 -->
          <div class="title" style="width: 174px" @click="gotoUrl('/user')">
            <v-img height="28px" src="@/assets/img/gfmc_ci.png" />
          </div>
        </div>
      </v-layout>
      <!-- 네비게이션 드로어 아이콘 -->
      <v-app-bar-nav-icon
        style="color: white !important"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- 네비게이션 드로어 -->
    <v-navigation-drawer
      temporary
      v-model="drawer"
      absolute
      right
      style="position: fixed; top: 0; right: 0"
    >
      <div v-if="getToken">
        <v-row class="mt-3" no-gutters justify="center">
          <v-btn
            color="white"
            height="36px"
            rounded
            style="padding-left: 0px; padding-right: 5px; pointer-events: none"
          >
            <v-avatar height="33" width="33" left>
              <img src="@/assets/img/gfmc_ci.png" /> </v-avatar
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
            <v-list-item-title>회원가입</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toLogin" link>
            <v-list-item-title>로그인</v-list-item-title>
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
          <v-list-item-title>{{ item.title }} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    mapGetters,
    mapActions,
  },
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      //네비게이션 드로어 스위치
      drawer: false,
      //로딩 변수
      isLoaded: false,
      //i18n 로케일 변수
      locale: "ko",
      //네비게이션 메뉴 리스트
      menus: [
        { title: "불편접수", link: "/report" },
        { title: "내 정보관리", link: "/user" },
        { title: "접수 및 처리 현황", link: "/dashboard" },
        { title: "공지사항", link: "/notice" },
      ],
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
      this.AUTH_LOGOUT().then(() => this.gotoUrl("/user"));
    },
    //로그인 페이지로 이동
    toLogin() {
      this.$router.push("/loginUser");
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
    },
  },
  computed: {
    //Vuex Helper Getters
    ...mapGetters(["getToken", "getuserNm", "getuserrole"]),
  },
};
</script>

<style lang="scss"></style>
