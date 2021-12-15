<template>
  <!-- 사용자 페이지 레이아웃 -->

  <v-container class="pa-0" style="max-width: 375px">
    <headerbar />

    <router-view></router-view>

    <footerbar />
  </v-container>
</template>

<script>
import { headerbar, footerbar } from "@/views/user";
export default {
  components: { headerbar, footerbar },
  data() {
    return {
      drawer: true,
    };
  },
  computed: {},
  created() {},
};
</script>
