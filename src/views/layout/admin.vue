<template>
  <!-- 사용자 페이지 레이아웃 -->

  <div >
    <aheaderbar />
<v-main>
  <v-container style="max-width:1200px "  > 
    <router-view></router-view>
  </v-container>
</v-main>
    <footerbar />
  </div>
</template>

<script>
import { footerbar,aheaderbar } from "@/views/";
export default {
  components: { aheaderbar, footerbar },
  data() {
    return {
      drawer: true,
    };
  },
  computed: {},
  created() {},
};
</script>
