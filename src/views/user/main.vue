<!-- 사용자 메인 페이지 -->

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
            style="border-radius: 12px; font-size: 22px; margin-bottom: 11px"
            class="white--text"
            @click="signup(id, user_nm, pw)"
            color="#0276F9"
            width="334px"
            height="54px"
            >내 정보관리</v-btn
          >
          <v-btn
            style="border-radius: 12px; font-size: 22px; margin-bottom: 11px"
            class="main-btn white--text"
            width="334px"
            height="54px"
            color="#0276F9"
            @click="gotoUrl('/report')"
            >불편 접수</v-btn
          >
          <v-btn
            style="border-radius: 12px; font-size: 22px; margin-bottom: 11px"
            class="main-btn white--text"
            width="334px"
            color="#0276F9"
            height="54px"
            @click="gotoUrl('/dashboard')"
            >접수 및 처리현황</v-btn
          >
          <v-btn
            style="border-radius: 12px; font-size: 22px; margin-bottom: 11px"
            class="main-btn white--text"
            width="334px"
            height="54px"
            color="#0276F9"
            @click="gotoUrl('/notice')"
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
            <v-btn text>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
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

export default {
  components: { mapMutations },
  methods: {
    //Vuex Helper Mutations
    ...mapMutations(["SET_BUSINESSCATEGORYLIST", "SET_ALLJOBCATEGORYLIST"]),
    gotoUrl(toUrl) {
      if (toUrl === this.$route.path) {
        location.reload();
      } else this.$router.push(toUrl);
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
</style>
