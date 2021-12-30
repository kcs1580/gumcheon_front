<template>
  <!-- 업무용 페이지 header -->
  <div>
    <v-app-bar style="z-index: 1000" app dark flat color="#0276F9">
      <v-spacer class="d-none d-md-block"></v-spacer>
      <v-app-bar-title>
        <button>
          <v-img
            width="229px"
            @click="gotoUrl('/')"
            src="@/assets/img/gfmc_ci.png"
          />
        </button>
      </v-app-bar-title>
      <!-- gfmc 로고 -->

      <v-spacer></v-spacer>
      <div class="d-none d-md-block">
        <v-menu
          content-class="elevation-1"
          tile
          open-on-hover
          down
          offset-y
          v-for="menu in menus"
          :key="menu.title"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn height="64px" text color="white" v-bind="attrs" v-on="on">
              {{ menu.title }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in menu.items"
              :key="item.title"
              @click="gotoUrl(item.link)"
            >
              <button id="sub-btn">
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </button></v-list-item
            >
          </v-list>
        </v-menu>
        <v-btn v-if="getToken" text @click="drawer = !drawer">
          <v-icon>mdi-account-circle-outline</v-icon>
          {{ getuserNm }}</v-btn
        >

        <v-btn v-else @click="toLogin" text>
          <v-icon>mdi-login</v-icon>
          로그인</v-btn
        >
      </div>
      <!-- 네비게이션 드로어 아이콘 -->
      <v-app-bar-nav-icon
        class="d-md-none"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer class="d-none d-md-block"></v-spacer>
    </v-app-bar>

    <!-- 네비게이션 드로어 -->
    <v-navigation-drawer
      style="z-index: 100"
      app
      temporary
      v-model="drawer"
      right
    >
      <div v-if="getToken">
        <v-row class="mt-3" no-gutters justify="center">
          <v-icon>mdi-account-circle-outline</v-icon>
          {{ getuserNm }}
        </v-row>

        <v-list>
          <v-list-item link @click="logout">
            <v-list-item-title
              ><v-icon>mdi-logout</v-icon>로그 아웃</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </div>
      <div v-else>
        <v-list>
          <v-list-item @click="toLogin" link>
            <v-list-item-title>로그인</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
      <v-divider></v-divider>

      <v-list>
        <v-list-group v-for="(item, i) in menus" :key="i">
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>
          <v-list-item
            link
            @click="gotoUrl(item.link)"
            v-for="(item, i) in item.items"
            :key="i"
          >
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
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
      selectedItem: "",
      //네비게이션 드로어 스위치
      drawer: false,
      //로딩 변수
      isLoaded: false,
      //i18n 로케일 변수
      locale: "ko",
      //네비게이션 메뉴 리스트
      menus: [
        {
          title: "기초설정",
          items: [
            { title: "공통코드설정", link: "/commoncode" },
            { title: "메뉴권한설정", link: "/menusetting" },
            { title: "담당자계정 관리", link: "/adminsetting" },
            { title: "사용자계정 관리", link: "/usersetting" },
          ],
        },
        {
          title: "시설물관리",
          link: "/",
          items: [{ title: "시설물관리" }],
        },
        {
          title: "게시물관리",
          link: "/",
          items: [
            { title: "공지사항 관리" },
            { title: "자주 묻는 질문 관리" },
            { title: "팝업 관리" },
          ],
        },
        {
          title: "접수/처리",
          link: "/",
          items: [{ title: "접수/처리 현황" }],
        },
        {
          title: "보고서",
          link: "/",
          items: [
            { title: "불편사항처리" },
            { title: "결합 점검/보수내역" },
            { title: "외주공사 내역" },
            { title: "점검보수 절감내역" },
          ],
        },
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
    },
  },
  computed: {
    //Vuex Helper Getters
    ...mapGetters(["getToken", "getuserNm", "getuserrole"]),
  },
};
</script>

<style lang="scss">
#sub-btn:hover {
  color: #0276f9;
}

.logoutchip {
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
