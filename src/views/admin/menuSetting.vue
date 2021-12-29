<!-- 공통코드 관리 페이지 -->

<template>
  <div>
    <div
      style="
        font-weight: bold;
        font-size: 30px;
        margin-top: 50px;
        margin-bottom: 40px;
      "
    >
      메뉴권한설정
    </div>
    <v-row justify="center">
      <v-col cols="12" md="6" sm="12">
        <v-row
          style="
            border: 0.8px solid #cbcccc;
            box-sizing: border-box;
            border-radius: 12px;
            margin: 10px 0px;
            padding: 12px 15px;
          "
          align="center"
          justify="center"
        >
          <v-col class="text-end" cols="12">
            <v-btn class="mr-1" width="140" color="#CBCCCC" dark>신규</v-btn>
            <v-btn width="140" color="#CBCCCC" dark> 저장</v-btn>
          </v-col>
          <v-row no-gutters>
            <v-col cols="6">
              <v-col class="text-center" cols="12">
                <grid
                  :bodyHeight="700"
                  :data="gridProps.data"
                  :columns="gridProps.columns"
                  :showDummyRows="true"
                  :scrollX="true"
                  :scrollY="true"
                ></grid>
              </v-col>
              <v-card>
                <v-row
                  class="ma-3"
                  no-gutters
                  align="center"
                  justify="space-around"
                >
                  <v-col cols="3" class="text-center">
                    <div>권한코드</div></v-col
                  >
                  <v-col cols="9"
                    ><v-text-field
                      hide-details
                      class="centered-input"
                      v-model="rcode"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3" class="text-center"> <div>권한명</div></v-col>
                  <v-col cols="9"
                    ><v-text-field
                      hide-details
                      class="centered-input"
                      v-model="rname"
                    ></v-text-field
                  ></v-col>

                  <v-col cols="3" class="text-center">
                    <div>사용여부</div></v-col
                  >
                  <v-col cols="9">
                    <div class="flex-center">
                      <v-radio-group hide-details row v-model="use"
                        ><v-radio value="사용" label="사용"></v-radio
                        ><v-radio value="미사용" label="미사용"></v-radio
                      ></v-radio-group></div
                  ></v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="6"
              ><v-list v-for="(item, i) in menus" :key="i">
                <v-list-item-title>
                  <input type="checkbox" /> {{ item.title }}
                </v-list-item-title>
                <v-list-item
                  link
                  @click="gotoUrl(item.link)"
                  v-for="(item, i) in item.items"
                  :key="i"
                >
                  <v-list-item-title class="ml-5">
                    <input type="checkbox" />{{ item.title }}</v-list-item-title
                  >
                </v-list-item>
              </v-list></v-col
            >
          </v-row>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-row
          style="
            border: 0.8px solid #cbcccc;
            box-sizing: border-box;
            border-radius: 12px;
            margin: 10px 0px;
            padding: 12px 15px;
          "
          align="center"
          justify="center"
        >
          <v-col class="text-end" cols="12">
            <v-btn class="mr-1" width="140" color="#CBCCCC" dark
              >사용자선택</v-btn
            >
            <v-btn width="140" color="#CBCCCC" dark> 삭제</v-btn>
          </v-col>
          <v-col class="text-center" cols="12">
            <grid
              :bodyHeight="900"
              :data="gridProps2.data"
              :columns="gridProps2.columns"
              :showDummyRows="true"
              :scrollX="true"
              :scrollY="true"
              :rowHeaders="gridProps2.rowHeaders"
            ></grid>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import "tui-grid/dist/tui-grid.css";
import { Grid } from "@toast-ui/vue-grid";
import TuiGrid from "tui-grid";

TuiGrid.setLanguage("ko");
TuiGrid.applyTheme("striped");
export default {
  components: {
    grid: Grid,
  },
  methods: {
    gotoUrl(toUrl) {
      if (toUrl === this.$route.path) {
        location.reload();
      } else this.$router.push(toUrl);
    },
  },
  data() {
    return {
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
          items: [{ title: "접수대기 및 현황" }, { title: "처리대기 및 현황" }],
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
      use: "사용",
      rcode: "0000",
      rname: "관리자",
      desc: "00001:구립어린이집, 00002 동청사",
      sub1: "1:공단자산, 2:구청재산",
      sub2: "설명2",
      sub3: "설명3",
      sub4: "설명4",
      gridProps: {
        data: [
          //for rowData prop
          {
            rcode: "0001",
            rname: "관리자",
            use: "사용",
          },
        ],
        columns: [
          { header: "권한코드", name: "rcode" },
          { header: "권한명", name: "rname" },
          { header: "사용여부", name: "use" },
        ],
      },
      gridProps2: {
        data: [
          //for rowData prop
          {
            dep: "경영혁신부",
            team: "열린혁신팀",
            username: "이수현",
          },
          {
            dep: "경영혁신부",
            team: "열린혁신팀",
            username: "이수현",
          },
          {
            dep: "경영혁신부",
            team: "열린혁신팀",
            username: "이수현",
          },
          {
            dep: "경영혁신부",
            team: "열린혁신팀",
            username: "이수현",
          },
        ],
        columns: [
          { header: "부서", name: "dep" },
          { header: "팀", name: "team" },
          { header: "사용자명", name: "username" },
        ],
        rowHeaders: [{ type: "checkbox", width: 100 }],
      },
    };
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss">
.centered-input input {
  text-align: center;
}
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
