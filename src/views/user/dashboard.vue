<!--사용자 불편접수 신청 페이지 -->

<template>
  <v-container fluid height>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12">
        <v-card
          width="334px"
          flat
          style="margin-top: 84px; margin-bottom: 46px"
        >
          <div style="font-size: 15px; color: #6c6c6c">시설명</div>
          <div style="font-weight: bold; font-size: 30px">구립도담어린이집</div>
          <div style="margin-top: 10px; font-size: 15px; color: #6c6c6c">
            02-891-0080
          </div>
        </v-card>
      </v-col>
      <v-col cols="12">
        <div style="font-weight: 500; font-size: 20px">현재 접수 건</div>

        <v-divider style="margin-top: 5px; margin-bottom: 25px" />

        <v-card width="334px" flat>
          <div
            class="report-desc"
            style="font-size: 14px; line-height: 20px; color: #6c6c6c"
          >
            복도등 교체 (사다리 제일긴거 필요) <br />보일러실 등 교체<br />
            화장실 변기 수전밸브 고장
          </div>
          <v-divider style="margin-top: 25px; margin-bottom: 15px" />
          <v-row no-gutters>
            <v-col
              class="pl-3"
              cols="6"
              style="border-right: solid 1px #dad9d9"
            >
              <div style="font-weight: 500; font-size: 18px">접수내역</div>
              <div style="font-weight: 500; font-size: 26px">4</div> </v-col
            ><v-col class="pl-3" cols="6">
              <div style="font-weight: 500; font-size: 18px">접수처리</div>

              <div style="font-weight: 500; font-size: 26px">3</div>
            </v-col>
          </v-row>
          <v-divider style="margin-top: 15px; margin-bottom: 51px" />
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card width="334px" flat>
          <v-card-text class="text-center">
            <v-btn-toggle v-model="toggle_exclusive" mandatory>
              <v-btn v-for="item in tabitems" :key="item">
                {{ item }}
              </v-btn>
            </v-btn-toggle>
          </v-card-text>
          <v-row class="mt-3 mb-3" no-gutters align="center" justify="center">
            <v-col cols="12">
              <v-data-table
                hide-default-header
                hide-default-footer
                :headers="headers"
                :items="articles"
                :items-per-page="5"
              >
              </v-data-table
            ></v-col>
          </v-row>
        </v-card>
        <v-pagination v-model="page" :length="3"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      toggle_exclusive: undefined,
      tab: null,
      tabitems: ["접수내역", "처리", "미처리"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

      page: 1,
      headers: [
        {
          text: "title",
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: "regDate",
          align: "end",
          sortable: false,
          value: "regDate",
        },
      ],
      articles: [
        {
          title: "복도등 교체 외..",
          regDate: "2021.12.25",
        },
        {
          title: "세면대 풉업 교체",
          regDate: "2021.12.25",
        },
        {
          title: "3층 교실 보일러 고장",
          regDate: "2021.12.25",
        },
        {
          title: "1층 천장 누수 외..",
          regDate: "2021.12.25",
        },
      ],
      // ..
      dlRead: false,
      article: {
        title: "",
        content: "",
      },

      loading: false,
      // ..

      fid: "금주어린이집",
      faci: [
        "금주어린이집",
        "기쁨어린이집",
        "도담어린이집",
        "독산본동어린이집",
        "동산어린이집",
      ],
      cgroup: 1,
      tags: ["동청사", "어린이집", "보훈단체", "경로당", "건강가정지원센터"],
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

<style lang="scss"></style>
