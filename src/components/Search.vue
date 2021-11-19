<template>
  <!-- 봇 검색 컴포넌트 -->
  <div class="searchBox">
    <v-autocomplete
      v-model="searchvalue"
      filled
      :items="autobotList"
      item-text="botName"
      item-value="id"
      placeholder="검색어를 입력하세요"
      :loading="isLoading"
      :search-input.sync="search"
      solo
      hide-no-data
      @keydown.enter="searchbot"
    >
      <!-- <button @click="searchbot()" class="search-icon" slot="append-outer">
        <span class="icon-color material-icons">search</span>
      </button> -->

      <template v-slot:append-outer>
        <button class="search-icon" @click="searchbot">
          <span class="icon-color material-icons">search</span>
        </button>
      </template>
      <!-- autocomplete 결과 화면 -->
      <template v-slot:item="{ item }">
        <v-list-item link :to="'bot/' + item.id"
          ><div>
            <div class="search-botname">
              <strong>{{ item.botName }}</strong>
            </div>

            <div class="search-botoverview">-{{ item.overview }}</div>
          </div></v-list-item
        >
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import botApi from "@/api/bot.js";
export default {
  data() {
    return {
      //textfield 변수
      searchvalue: "",
      //로딩 변수
      isLoading: false,
      //검색어
      search: "",
      //autocomplete 결과 리스트
      autobotList: []
    };
  },
  methods: {
    //autocomplete 함수
    autocomplete(searchvalue) {
      // cancel pending call
      clearTimeout(this._timerId);

      this.isLoading = true;

      // delay new call 500ms
      this._timerId = setTimeout(() => {
        botApi
          .searchBot({
            searchValue: searchvalue
          })
          .then(res => {
            this.autobotList = res.data.list;
            this.isLoading = false;
          })
          .catch(res => {
            console.log(res);
            this.isLoading = false;
          });
      }, 500);
    },
    //봇 검색
    searchbot() {
      this.$store.commit("SET_ISSEARCH", 1);
      this.$store.commit("INIT_SEARCH");

      this.$store.commit("SET_ISSEARCH", 1);
      this.$store.commit("SET_CURRENTPAGE", 1);
      this.$store.commit("SET_BOTLIST", []);
      this.$router.push("/bot").catch(() => {});

      this.$store.commit("SET_BOTTYPELIST", ["BOT", "DIGITALWORKERS"]);
      this.$store.commit("SET_KEYWORD", this.search);
    }
  },
  watch: {
    //autocomplete 디바운스
    search(val) {
      if (!val) {
        return;
      }
      this.autocomplete(val);
    }
  }
};
</script>

<style lang="scss">
.searchBox {
  width: 620px;

  .search-icon {
    background-color: #264085;
    margin-left: -64px;
    margin-top: -12px;
    /* border: 2px solid #0D214B; */
    width: 54px;
    height: 56px;
    z-index: 1;
    .icon-color {
      color: white;
      font-size: 26px;
    }
  }
  .v-input {
    .v-input__slot {
      border: solid 2px #264085;
    }
    .v-input__append-inner {
      display: none;
    }
  }
}
.search-botoverview {
  font-size: 14px;
}
</style>
