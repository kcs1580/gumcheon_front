<template>
  <!-- 봇 리스트 페이지네이션 컴포넌트 -->
  <v-container class="text-center" v-show="page">
    <v-row class="justify-center align-center">
      <!-- <button
        :class="
          page - 10 > 0
            ? ['button-frame', 'rounded-circle', 'btn-able']
            : ['button-frame', 'rounded-circle', 'btn-disable']
        "
      >
        <i class="icon-left mdi mdi-chevron-double-left" /></button
      > -->
      <v-row justify="center">
        <v-col cols="5">
          <v-pagination
            class="pagination-custom"
            next-aria-label
            v-model="page"
            :length="totalLength"
            circle
          ></v-pagination>
        </v-col>
      </v-row>

      <!-- <button
        :class="
          totalLength - page > 10
            ? ['button-frame', 'rounded-circle', 'btn-able']
            : ['button-frame', 'rounded-circle', 'btn-disable']
        "
      >
        <i class="icon-right mdi mdi-chevron-double-right" />
      </button> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      //현재 페이지 번호
      page: "",
      //총 페이지 수
      totalLength: 0
    };
  },
  methods: {
    // scrollToTop() {
    //   window.scrollTo(0, 0);
    // }
  },
  created() {
    //store에서 현재 페이지 수, 총 페이지 수 가져오기
    this.totalLength = this.$store.getters.getbottotallength;
    this.page = this.$store.getters.getbotcurrentpage;
  },
  watch: {
    //store변수와 page 동기화
    page(newPage) {
      this.$store.commit("SET_BOTCURRENTPAGE", newPage);
    },
    "$store.state.botvar.bottotallength": function() {
      this.totalLength = this.$store.getters.getbottotallength;
    },
    "$store.state.botvar.botcurrentpage": function() {
      this.page = this.$store.getters.getbotcurrentpage;
    }
  },
  computed: {
    currentpage() {
      return this.$store.getters.getbotcurrentpage;
    }
  }
};
</script>

<style lang="scss">
.btn-able {
  color: #757575;
}
.btn-disable {
  color: #c6c6c6;
}
.button-frame {
  margin-top: 1px;
  padding: 0px;
  width: 32px;
  height: 32px;
  border: 1px solid;
  font-size: 22px;
}
.pagination-custom {
  .v-pagination {
    .v-pagination__navigation {
      box-shadow: none;
      border: 1px solid;
      border-radius: 50%;
      color: #757575;
    }
    .v-pagination__item {
      box-shadow: none;
      color: #757575 !important;
    }
    .v-pagination__item--active {
      background-color: white !important;
      border-color: white !important;
      color: black !important;
    }
  }
}
</style>
