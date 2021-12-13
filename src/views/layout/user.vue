<template>
  <!-- 사용자 페이지 레이아웃 -->

  <div>
    <headerbar />

  
    <router-view></router-view>

    <footerbar />
  </div>
</template>

<script>
import { headerbar, footerbar } from "@/views/user";
export default {
  components: { headerbar, footerbar },
  data() {
    return {
      drawer: true
    };
  },
  computed: {
    
  },
  created() {}
};
</script>
