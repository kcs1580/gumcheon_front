<template>
  <!-- 커뮤니티 레이아웃 -->
  <router-view></router-view>
</template>

<script>
export default {
  beforeCreate() {
    //커뮤니티 검색조건 초기화
    this.$store.commit("INIT_COMMUNITY");
  }
};
</script>
