<template>
  <!-- 인증 관련 레이아웃  -->
  <v-row class="login-frame" justify="center" align="center">
    <router-view> </router-view>
  </v-row>
  
</template>

<script>
import { headerbar, footerbar } from "@/views/";
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
