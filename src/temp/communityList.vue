<template>
  <v-layout
    class="d-flex justify-center"
    style="margin-top: -150px; margin-bottom:100px;"
  >
    <v-container
      v-if="list"
      class="edu-frame rounded-xl pt-16 pb-14 pl-16 pr-10 elevation-20"
    >
      <v-row>
        <span class="edu-title"> {{ $t("nav.community") }} </span>
      </v-row>
      <v-card-title class="search-bar-frame">
        <div class="counter-text">
          <b>{{ this.listsize }}</b
          >{{ $t("community.searchcases") }}
        </div>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-select
          class="search-bar-datatable combobox"
          @change="changesearchBy"
          :items="searchitems"
          v-model="searchBy"
          label="Solo field"
          solo
          height="40"
        ></v-select>
        <v-text-field
          dense
          class="search-bar-datatable "
          v-model="searchTemp"
          solo
          :label="$t('searchlabel')"
          append-icon="mdi-magnify"
          height="40"
          @click:append="clickHandler"
          @keyup.enter.prevent="clickHandler"
        ></v-text-field>
        <v-select
          @change="changeorderBy"
          class="search-bar-datatable combobox"
          :items="items"
          label="Solo field"
          v-model="orderBy"
          solo
          height="40"
        ></v-select>
        <button
          class="request-btn d-flex align-center justify-center rounded"
          @click="gotoRegister"
        >
          {{ $t("community.registerbtn") }}
        </button>
        <div v-if="$store.getters.authStatus == 'success'">
          <button
            v-if="!ismyboard"
            class="request-btn d-flex align-center justify-center rounded"
            @click="viewMyBoard"
          >
            {{ $t("community.myboard") }}
          </button>
          <button
            v-else
            class="request-btn d-flex align-center justify-center rounded"
            @click="viewAllBoard"
          >
            {{ $t("community.allboard") }}
          </button>
        </div>
      </v-card-title>

      <v-row justify="center" class="edu-datatable">
        <DataTable :communityList.sync="list" :listsize.sync="listsize" />
      </v-row>
      <v-row justify="center" class="edu-pagenation">
        <Pagination />
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
// import Button from '@/components/Button.vue'

export default {
  name: "Home",
  data: () => ({
    scope: "",
    searchTemp: "",
    searchMode: false,
    orderBy: "RECENT",
    searchBy: "TITLE",
    totalLength: "",
    itemCnt: "",
    ismyboard: false,
    searchBy: "TITLE",
    searchValue: "",
    errored: false,
    list: null,
    listsize: 0,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    sort: "최신순",
    board: { searchValue: "" },
    items: [
      { text: "최신순", value: "RECENT" },
      { text: "좋아요순", value: "LIKE" },
      { text: "댓글순", value: "REPLY" },
      { text: "조회순", value: "VISIT" }
    ],
    searchitems: [
      { text: "제목", value: "TITLE" },
      { text: "내용", value: "CONTENT" },
      { text: "작성자", value: "CREATOR" }
    ],
    headers: [
      {
        text: "글번호",
        align: "left",
        value: "id"
      },
      { text: "제목", value: "title" },
      { text: "댓글수", value: "calories" },
      { text: "좋아요", value: "likeCnt" },
      { text: "조회수", value: "visitCnt" },
      { text: "작성일", value: "createdDate" },
      { text: "작성자", value: "createdByNm" }
      // { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  components: { DataTable, Pagination },
  methods: {
    changesearchBy() {
      this.$store.commit("SET_CMSEARCHBY", this.searchBy);
    },
    changsesearchValue() {
      this.$store.commit("SET_CMSEARCHVALUE", this.searchValue);
    },
    changeorderBy() {
      this.$store.commit("SET_CMORDERBY", this.orderBy);
      this.searchCommunity();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    currentPage(data) {
      this.page = data;
    },
    viewMyBoard() {
      this.ismyboard = true;
      this.scope = "PRIVATE";
      this.$store.commit("SET_CURRENTPAGE", 1);
      this.listCommunity();
    },
    viewAllBoard() {
      this.ismyboard = false;
      this.scope = "";
      this.$store.commit("SET_CURRENTPAGE", 1);
      this.listCommunity();
    },
    gotoRegister() {
      if (this.$store.getters.authStatus == "success")
        this.$router.push("/writecommunity");
      else {
        if (confirm("로그인이 필요합니다.")) {
          this.$router.push({ name: "login" });
        }
      }
    },
    listCommunity() {
      this.$store.commit("SET_CURRENTPAGE", 1);
      this.startId = this.itemsPerPage * (this.page - 1);
      if (this.searchMode) {
        this.searchCommunity();
      } else {
        communityApi
          .listCommunity({
            orderBy: this.orderBy,
            itemCnt: this.itemsPerPage,
            startId: this.startId,
            searchValue: this.searchValue,
            searchBy: this.searchBy,
            scope: this.scope
          })
          .then(({ data }) => {
            this.list = data.list;
            this.listsize = data.total;
            this.totalLength = Math.ceil(this.listsize / 10);
            this.scrollToTop();
            this.$store.commit("SET_TOTALLENGTH", this.totalLength);
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    clickHandler() {
      this.$store.commit("SET_CURRENTPAGE", 1);
      this.$store.commit("SET_CMSEARCHVALUE", this.searchTemp);
      this.searchCommunity();
    },
    searchCommunity() {
      //this.ismyboard = false;
      this.searchValue = this.$store.getters.getcmsearchValue;
      this.orderBy = this.$store.getters.getcmorderBy;
      this.searchBy = this.$store.getters.getcmsearchBy;
      this.startId = this.itemsPerPage * (this.page - 1);

      //this.changsesearchValue();
      if (this.searchValue.length < 2 && this.searchValue.length > 0)
        alert("2글자 이상 입력해 주세요.");
      else {
        if (this.searchValue.length > 1) this.searchMode = true;
        else this.searchMode = false;
        communityApi
          .listCommunity({
            orderBy: this.orderBy,
            searchBy: this.searchBy,
            searchValue: this.searchValue,
            itemCnt: this.itemsPerPage,
            startId: this.startId,
            scope: this.scope
          })
          .then(({ data }) => {
            this.list = data.list;
            this.listsize = data.total;
            this.totalLength = Math.ceil(this.listsize / 10);
            this.$store.commit("SET_TOTALLENGTH", this.totalLength);
            this.searchTemp = this.$store.getters.getcmsearchValue;
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    communityDetail(id) {
      this.$router.push("/community/" + id);
    },
    handleClick(id) {
      this.communityDetail(id);
    }
  },
  created() {
    this.page = this.$store.getters.getcurrentpage;
    this.searchCommunity();
  },
  mounted() {},
  watch: {
    "$store.state.currentpage": function() {
      this.page = this.$store.getters.getcurrentpage;
      this.searchCommunity();
    }
  }
};
</script>

<style lang="scss">
.search-bar-frame {
  padding-right: 0px;
  border-bottom: black solid 1px;
  margin-bottom: 20px;

  .counter-text {
    margin-bottom: -50px;
    margin-left: -15px;
    font-size: 14px;
    font-weight: bold;

    b {
      color: #dc2929;
    }
  }
  .request-btn {
    margin-top: 10px;
    margin-left: 15px;
    width: 100px;
    height: 40px;
    color: white;
    padding: 10px;
    font-size: 14px;
    background-color: #213e86;
  }
  .search-bar-datatable {
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 10px;
    height: 40px;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
      0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 3px 1px -2px rgb(0 0 0 / 20%);

    .v-label {
      font-size: 14px;
    }
    .v-input__append-inner {
      margin-right: -12px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      background-color: #999999;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 20%);

      .v-icon {
        color: white !important;
      }
    }
  }
}
.edu-frame {
  background-color: white;
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 1200px;

  .edu-title {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -2px;
  }
  .edu-title-sub {
    margin-right: 25px;
    margin-top: 10px;
  }
  .edu-tabs {
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100%;

    .v-tab {
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 0px;
      border: 2px solid gray;
    }
    .v-tab--active {
      color: #213e86;
      border: 2px solid;
    }
    .v-tab-slider-wrapper {
      display: none;
    }
  }
  .edu-datatable {
    margin-right: 15px;
  }
  .edu-pagenation {
    margin-top: 30px;
  }
}
.tab-class {
  border-left: 1px solid #213e86 !important;
}
.tab-class2 {
  border-right: 1px solid #213e86 !important;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 10px;
}

.combobox {
  width: 5px;
}
</style>
