<template>
  <v-container fluid height>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12">
        <v-card
          width="334px"
          flat
          style="margin-top: 84px; margin-bottom: 81px"
        >
          <div style="font-size: 20px">안녕하세요,</div>
          <div style="font-weight: bold; font-size: 30px">
            불편접수시스템입니다.
          </div>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card width="334px" flat>
          <v-btn
            style="border-radius: 12px; font-size: 23px; margin-bottom: 11px"
            class="white--text"
            @click="signup(id, user_nm, pw)"
            color="#0276F9"
            width="334px"
            height="54px"
            >내 정보관리</v-btn
          >
          <v-btn
            style="border-radius: 12px; font-size: 23px; margin-bottom: 11px"
            class="main-btn white--text"
            width="334px"
            height="54px"
            color="#0276F9"
            >불편 신고</v-btn
          >
          <v-btn
            style="border-radius: 12px; font-size: 23px; margin-bottom: 11px"
            class="main-btn white--text"
            width="334px"
            color="#0276F9"
            height="54px"
            >접수 및 처리현황</v-btn
          >
          <v-btn
            style="border-radius: 12px; font-size: 23px; margin-bottom: 11px"
            class="main-btn white--text"
            width="334px"
            height="54px"
            color="#0276F9"
            >공지사항</v-btn
          >
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card
          width="334px"
          flat
          style="margin-top: 83px; margin-bottom: 44px"
        >
          <v-row no-gutters align="center" justify="space-between">
            <div style="font-weight: bold; font-size: 20px">공지사항</div>
            <button text>
              <v-icon>mdi-plus</v-icon>
            </button>
          </v-row>
          <v-divider style="margin-top: 12px" />
          <v-data-table
            style="
              border: 0.8px solid #cbcccc;
              box-sizing: border-box;
              border-radius: 12px;
              margin: 10px 0px;
              padding: 12px 15px;
            "
            hide-default-header
            hide-default-footer
            :headers="headers"
            :items="items"
            :items-per-page="5"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import botApi from "@/api/bot.js";
import userApi from "@/api/user.js";

export default {
  components: { mapMutations },
  methods: {
    //Vuex Helper Mutations
    ...mapMutations(["SET_BUSINESSCATEGORYLIST", "SET_ALLJOBCATEGORYLIST"]),
    getBotList() {
      botApi
        .listBot({ itemCnt: 8, startId: 0 })
        .then((res) => {
          this.mainList1 = res.data.list;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    getBotList2() {
      botApi
        .listBot({ itemCnt: 8, startId: 0, jobCategoryList: [10] })
        .then((res) => {
          this.mainList2 = res.data.list;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    getBotCount() {
      botApi
        .getBotCount()
        .then((res) => {
          this.botCount = res.data.total;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    getUserCount() {
      userApi
        .getUserCount()
        .then((res) => {
          this.userCount = res.data.totalUserCount;
        })
        .catch((res) => {
          console.log(res);
        });
    },
    getRecommend() {
      this.$router.push("/bot");
      this.SET_BUSINESSCATEGORYLIST([10]);
    },
    setCategory() {
      this.SET_BUSINESSCATEGORYLIST([10]);
    },
    getCategory() {
      botApi
        .getBotCount()
        .then((res) => {
          this.jobCategory.content = res.data.jobCategoryList;
          this.jobCategory.total = res.data.jobCategoryListTotal;

          this.SET_ALLJOBCATEGORYLIST(this.jobCategory.content);
          this.getBotList();
          this.getBotList2();
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
  data() {
    return {
      headers: [
        {
          text: "title",
          align: "start",
          sortable: false,
          value: "title",
        },
      ],
      items: [
        {
          title: "2022 공공안전 사업 계획",
        },
        {
          title: "금천구시설관리공단 접수지연 안내",
        },
        {
          title: "불편접수 전 확인해주세요",
        },
        {
          title: "2022 공공안전 사업 계획",
        },
        {
          title: "2022 공공안전 사업 계획",
        },
      ],
      cards: [
        {
          title: "불편접수",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 6,
        },
        {
          title: "내 정보관리",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 6,
        },
        {
          title: "접수 및 처리 현황",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 6,
        },
        {
          title: "공지사항",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 6,
        },
      ],
      mainCategory: [],
      mainList1: [],
      mainList2: [],
      botCount: 0,
      userCount: 0,
      jobCategory: {
        title: "카테고리",
        content: [{ categoryName: "" }],
        total: "",
      },
    };
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 40px !important;
}
.main-btn {
  border-radius: 12px;
  font-size: 18px;
}
.sub-text {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: bold;
  color: black;
  span {
    color: #d70000;
  }
}
.upper {
  /* background-image: linear-gradient(to bottom right, #182E75, #5A4B79); */

  .banner-frame {
    /* padding-top: 20px; */
    padding-bottom: 20px;
  }
}
.searchFrame {
  width: 100%;
  max-width: 1180px;
  margin-top: -82px;
  background-color: white;
}

.firstFloor {
  margin-top: 50px;
  width: 100%;

  .firstFloor-title {
    margin-bottom: 20px;
    padding: 0px 10px 0px 10px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 24px;
  }
}
.secondFloor {
  margin-top: 50px;
  width: 100%;

  .secondloor-title {
    margin-bottom: 20px;
    padding: 0px 10px 0px 10px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 24px;
  }
}
.main-background {
  background-color: #f6fafd;
}
.card-divider {
  margin-top: 60px;
}
</style>
