<template>
  <!-- 게시판 류 페이지네이션 컴포넌트 -->
  <v-container class="text-center">
    <v-row class="justify-center align-center">
      <!-- 10페이지 이동 버튼 -->
      <!-- <button
        :class="
          page - 10 > 0
            ? ['button-frame', 'rounded-circle', 'btn-able']
            : ['button-frame', 'rounded-circle', 'btn-disable']
        "
      >
        <i class="icon-left mdi mdi-chevron-double-left" /></button
      > -->
      <!-- 1페이지 이동 버튼 -->
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
      <!-- 10페이지 이동 버튼 -->
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
      //현재페이지
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
    this.totalLength = this.$store.getters.gettotallength;
    this.page = this.$store.getters.getcurrentpage;
  },
  watch: {
    page(newPage) {
      this.$store.commit("SET_CURRENTPAGE", newPage);
    },
    "$store.state.totallength": function() {
      this.totalLength = this.$store.getters.gettotallength;
    },
    "$store.state.currentpage": function() {
      this.page = this.$store.getters.getcurrentpage;
    }
  },
  computed: {
    currentpage() {
      return this.$store.getters.getcurrentpage;
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
