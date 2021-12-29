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
      공통코드
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
          <v-card>
            <v-card-text>
              <v-row
                class="ma-3"
                no-gutters
                align="center"
                justify="space-around"
              >
                <v-col cols="3" class="text-center"> <div>그룹코드</div></v-col>
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="gcode"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>그룹코드명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="gcode"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center"> <div>설명</div></v-col>
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="gname"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center"> <div>사용여부</div></v-col>
                <v-col cols="8">
                  <div class="flex-center">
                    <v-radio-group hide-details row v-model="use"
                      ><v-radio value="사용" label="사용"></v-radio
                      ><v-radio value="미사용" label="미사용"></v-radio
                    ></v-radio-group></div
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>보조코드1 설명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="sub1"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>보조코드2 설명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="sub2"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>보조코드3 설명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="sub3"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>보조코드4 설명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="sub4"
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
            <v-btn class="mr-1" width="140" color="#CBCCCC" dark>신규</v-btn>
            <v-btn width="140" color="#CBCCCC" dark> 저장</v-btn>
          </v-col>
          <v-col class="text-center" cols="12">
            <grid
              :bodyHeight="500"
              :data="gridProps2.data"
              :columns="gridProps2.columns"
              :showDummyRows="true"
              :scrollX="true"
              :scrollY="true"
            ></grid>
          </v-col>
          <v-card>
            <v-card-text>
              <v-row
                class="ma-3"
                no-gutters
                align="center"
                justify="space-around"
              >
                <v-col cols="3" class="text-center"> <div>그룹코드</div></v-col>
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="gcode"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>그룹코드명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="gname"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center"> <div>설명</div></v-col>
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="gname"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center"> <div>사용여부</div></v-col>
                <v-col cols="8">
                  <div class="flex-center">
                    <v-radio-group hide-details row v-model="use"
                      ><v-radio value="사용" label="사용"></v-radio
                      ><v-radio value="미사용" label="미사용"></v-radio
                    ></v-radio-group></div
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>보조코드1 설명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="sub1"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>보조코드2 설명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="sub2"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>보조코드3 설명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="sub3"
                  ></v-text-field
                ></v-col>
                <v-col cols="3" class="text-center">
                  <div>보조코드4 설명</div></v-col
                >
                <v-col cols="8"
                  ><v-text-field
                    hide-details
                    class="centered-input"
                    v-model="sub4"
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-card-text>
          </v-card>
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
      use: "사용",
      gcode: "0000",
      gname: "시설구분",
      desc: "00001:구립어린이집, 00002 동청사",
      sub1: "1:공단자산, 2:구청재산",
      sub2: "설명2",
      sub3: "설명3",
      sub4: "설명4",
      gridProps: {
        data: [
          //for rowData prop
          {
            gcode: "텍스트",
            gcodename: "텍스트",
            desc: "텍스트",
            use: "텍스트",
          },
        ],
        columns: [
          { header: "그룹코드", name: "gcode" },
          { header: "그룹코드명", name: "gcodename" },
          { header: "설명", name: "desc" },
          { header: "사용여부", name: "use" },
        ],
      },
      gridProps2: {
        data: [
          //for rowData prop
          {
            gcode: "0001",
            gcodename: "구립어린이집",
            use: "사용",
            align: "1",
            sub1: "1",
          },
          {
            gcode: "0002",
            gcodename: "동청사",
            use: "사용",
            align: "2",
            sub1: "2",
          },
          {
            gcode: "0003",
            gcodename: "구립경로당",
            use: "사용",
            align: "3",
            sub1: "1",
          },
        ],
        columns: [
          { header: "코드", name: "gcode" },
          { header: "코드명", name: "gcodename", width: 100 },
          { header: "사용여부", name: "use", width: 100 },
          { header: "정렬", name: "align" },
          { header: "보조코드1", name: "sub1", width: 100 },
          { header: "보조코드2", name: "sub2", width: 100 },
          { header: "보조코드3", name: "sub3", width: 100 },
          { header: "보조코드4", name: "sub4", width: 100 },
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
