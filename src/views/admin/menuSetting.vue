<!-- 메뉴 권한설정 페이지 -->


<template>
  <div>
      <div style="font-weight: bold; font-size: 30px">
메뉴 권한설정          </div>
    <v-row  style="
              border: 0.8px solid #cbcccc;
              box-sizing: border-box;
              border-radius: 12px;
              margin: 10px 0px;
              padding: 12px 15px;
            " align="center" justify="center">
       
      <v-col  class="text-center" v-for="item in items" v-bind:key="item.title" md="4" sm="12" cols="12"  >
        <v-card   style="margin: 0 auto"    
         
          flat
         
        >
        <v-card-title >
           <div>{{item.title}}</div>
        </v-card-title>
        <v-card-text>
            {{item.value}}
        </v-card-text>
        </v-card>
      </v-col> 
    </v-row>

    <v-row no-gutters align="center" justify="space-between" style="font-weight: bold; font-size: 30px">
            <div >공지사항</div>
            <button>
              <v-icon>mdi-plus</v-icon>
            </button>
          </v-row>
       <v-row  style="
              border: 0.8px solid #cbcccc;
              box-sizing: border-box;
              border-radius: 12px;
              margin: 10px 0px;
              padding: 12px 15px;
            " align="center" justify="center">
      <v-col cols="12">
        <v-card         
          flat
          style="margin:0 auto"
        >
         
          <v-data-table
           
            hide-default-header
            hide-default-footer
            :headers="headers"
            :items="articles"
            :items-per-page="5"
          >
          </v-data-table>
        </v-card>
      </v-col>
       </v-row>
       </div>
</template>

<script>

export default {
  methods: {
    //Vuex Helper Mutations
   
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
        {
          text: "regDate",
          align: "end",
          sortable: false,
          value: "regDate",
        },
      ],
      articles:[{
          title: "2022 공공안전 사업 계획",
          regDate:"2021-12-25"
        },
        {
          title: "금천구시설관리공단 접수지연 안내",          regDate:"2021-12-25"

        },
        {
          title: "불편접수 전 확인해주세요",          regDate:"2021-12-25"

        },
        {
          title: "2022 공공안전 사업 계획",          regDate:"2021-12-25"

        },
        {
          title: "2022 공공안전 사업 계획",          regDate:"2021-12-25"

        },],
      
      items: [
        {
          title: "접수대기",
          value: "15"
        },
        {
          title: "처리중",
          value: "5"
        },
        {
          title: "처리완료",
          value:"5"
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

</style>
