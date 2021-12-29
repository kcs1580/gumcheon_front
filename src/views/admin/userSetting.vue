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
      사용자계정설정
    </div>
    <v-row
      style="
        border: 0.8px solid #cbcccc;
        box-sizing: border-box;
        border-radius: 12px;
        margin: 10px 0px;
        padding: 12px 15px;
      "
      justify="center"
      align="center"
      ><v-col class="text-end" cols="12">
        <v-btn class="mr-1" width="140" color="#CBCCCC" dark>신규</v-btn>
        <v-btn class="mr-1" width="140" color="#CBCCCC" dark>저장</v-btn>
        <v-btn width="140" color="#CBCCCC" dark> 비밀번호초기화</v-btn>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <grid
              :bodyHeight="500"
              :data="gridProps.data"
              :columns="gridProps.columns"
              :showDummyRows="true"
              :scrollX="true"
              :scrollY="true"
            ></grid>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-card height="100%">
          <v-card-text>
            <v-row
              class="ma-3"
              no-gutters
              align="center"
              justify="space-around"
            >
              <v-col cols="3" class="text-center"> <div>사용자코드</div></v-col>
              <v-col cols="8"
                ><v-text-field
                  hide-details
                  class="centered-input"
                  v-model="user.ucode"
                ></v-text-field
              ></v-col>
              <v-col cols="3" class="text-center"> <div>아이디</div></v-col>
              <v-col cols="8"
                ><v-text-field
                  hide-details
                  class="centered-input"
                  v-model="user.id"
                ></v-text-field
              ></v-col>
              <v-col cols="3" class="text-center"> <div>비밀번호</div></v-col>
              <v-col cols="8"
                ><v-text-field
                  hide-details
                  class="centered-input"
                  v-model="user.pw"
                ></v-text-field
              ></v-col>
              <v-col cols="3" class="text-center"> <div>성명</div></v-col>
              <v-col cols="8"
                ><v-text-field
                  hide-details
                  class="centered-input"
                  v-model="user.name"
                ></v-text-field
              ></v-col>
              <v-col cols="3" class="text-center"> <div>부서</div></v-col>
              <v-col cols="8"
                ><v-text-field
                  hide-details
                  class="centered-input"
                  v-model="user.dep"
                ></v-text-field
              ></v-col>
              <v-col cols="3" class="text-center"> <div>팀</div></v-col>
              <v-col cols="8"
                ><v-text-field
                  hide-details
                  class="centered-input"
                  v-model="user.team"
                ></v-text-field
              ></v-col>
              <v-col cols="3" class="text-center">
                <div>직통전화번호</div></v-col
              >
              <v-col cols="8"
                ><v-text-field
                  hide-details
                  class="centered-input"
                  v-model="user.tel"
                ></v-text-field
              ></v-col>
              <v-col cols="3" class="text-center"> <div>사용여부</div></v-col>
              <v-col cols="8">
                <div class="flex-center">
                  <v-radio-group hide-details row v-model="user.use"
                    ><v-radio value="사용" label="사용"></v-radio
                    ><v-radio value="미사용" label="미사용"></v-radio
                  ></v-radio-group></div
              ></v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
      use: "사용",
      gcode: "0000",
      gname: "시설구분",
      desc: "00001:구립어린이집, 00002 동청사",
      sub1: "1:공단자산, 2:구청재산",
      sub2: "설명2",
      sub3: "설명3",
      sub4: "설명4",
      user: {
        ucode: "0000",
        id: "시설구분",
        pw: "1234",
        name: "이수현",
        dep: "경영혁신부",
        team: "열린혁신팀",
        tel: "070-4633-3120",
        use: "사용",
      },
      gridProps: {
        data: [
          //for rowData prop
          {
            dep: "경영혁신부",
            team: "열린혁신팀",
            username: "이수현",
            use: "사용",
          },
        ],
        columns: [
          { header: "부서", name: "dep" },
          { header: "팀", name: "team" },
          { header: "사용자명", name: "username" },
          { header: "사용여부", name: "use" },
        ],
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
