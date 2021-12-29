<template>
  <div>
    <v-container style="height: 70vh">
      <v-row style="margin-top: 150px" align="center" justify="center">
        <v-col cols="12" class="text-center">
          죄송합니다.<br />
          요청하신 페이지를 찾을 수 없습니다.
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn class="mr-3" @click="$router.go(-1)"> 이전 페이지로 이동</v-btn
          ><v-btn class="mr-3" @click="$router.push('/')"
            >업무용 메인으로 이동</v-btn
          ><v-btn @click="$router.push('/user')"
            >사용자 메인으로 이동</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
    <footerbar />
  </div>
</template>

<script>
import { aheaderbar, footerbar } from "@/views/";
export default {
  components: { aheaderbar, footerbar },
  data() {
    return {};
  },
};
</script>
