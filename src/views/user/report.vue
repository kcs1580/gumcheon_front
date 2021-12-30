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
          <div style="font-weight: bold; font-size: 30px">불편 접수</div>
          <div style="font-size: 20px">
            불편접수를 위해 <br />
            아래 정보를 입력해주세요.
          </div>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card width="334px" flat>
          <div
            class="report-desc"
            style="font-size: 14px; line-height: 20px; color: #6c6c6c"
          >
            정기점검 : 정기안전점검, 계절별점검, 특별점검 등의 점검 순회보수 :
            시설·장비의 결함에 대한 경보수 및 기술적 조치<br />
            수선공사 : 외부 수선공사시 공사범위, 견적금액, 준공검사 등의 기술적
            지원 조치
          </div>
          <v-divider style="margin-top: 28px; margin-bottom: 51px" />
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col cols="12" style="font-weight: 500; font-size: 18px">
              시설</v-col
            >
            <v-col cols="9" style="margin-bottom: 20px">
              <v-chip-group
                v-model="cgroup"
                active-class="primary--text"
                column
              >
                <v-chip
                  text-color="black"
                  outlined
                  label
                  color="#0276F9"
                  v-for="tag in tags"
                  :key="tag"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-card>
        <v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col style="font-weight: 500; font-size: 18px">기관명</v-col>
            <v-col cols="12">
              <v-select
                v-model="fid"
                :items="faci"
                placeholder="기관명을 선택해주세요."
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
        <v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col v style="font-weight: 500; font-size: 18px">전화번호</v-col>
            <v-col cols="12">
              <v-text-field
                :items="faci"
                placeholder="연락 가능한 번호를 적어주세요."
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row> </v-card
        ><v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col style="font-weight: 500; font-size: 18px"
              >불편접수 내용</v-col
            >
            <v-col cols="12">
              <v-textarea
                :items="faci"
                placeholder="불편접수 내용을 적어주세요."
                dense
                outlined
                no-resize
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card>
        <v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col style="font-weight: 500; font-size: 18px">사진 첨부</v-col>
            <v-col cols="12">
              <v-file-input
                placeholder="53mb 이하의 파일만 가능합니다."
              ></v-file-input>
            </v-col>
          </v-row>
          <div
            style="
              font-size: 13px;
              line-height: 19px;
              letter-spacing: -0.06em;
              color: #6c6c6c;
              margin-bottom: 60px;
              margin-top: 99px;
            "
          >
            상황에 따라 기한 또는 인원이 변경 될 수 있으며, 자세한 내용
            파악을<br />
            위해 담당자가 연락을 취할 수 있습니다. 감사합니다.
          </div>
          <v-btn
            style="border-radius: 12px; font-size: 22px; margin-bottom: 11px"
            class="white--text"
            color="#0276F9"
            width="334px"
            height="54px"
            >접수하기</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
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
