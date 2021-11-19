<template>
  <div>
    <headerbar />

    <v-layout
      class="d-flex justify-center"
      style="margin-top: -150px; margin-bottom:100px;"
    >
      <v-container
        class="edu-frame fulid rounded-xl pt-16 pb-14 pl-16 pr-10 elevation-20"
        style="height:100vh"
      >
        <v-row align="center" justify="center" style="height:100%">
          <div>
            <v-col cols="12" class="text-center">
              죄송합니다.<br />
              요청하신 페이지를 찾을 수 없습니다.
            </v-col>
            <v-col>
              <v-btn class="mr-3" @click="$router.go(-1)">
                이전 페이지로 이동</v-btn
              ><v-btn @click="$router.push('/')">메인으로 이동</v-btn></v-col
            >
          </div>
        </v-row>
      </v-container>
    </v-layout>
    <footerbar />
  </div>
</template>

<script>
import { headerbar, footerbar } from "@/views/user";
export default {
  components: { headerbar, footerbar },
  data() {
    return {};
  }
};
</script>
