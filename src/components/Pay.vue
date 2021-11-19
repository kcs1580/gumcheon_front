<template>
  <!-- 봇 결제 컴포넌트 -->
  <v-row justify="center">
    <v-btn
      style="margin-top: 50px;"
      class="white--text"
      color="teal"
      @click="overlay = !overlay"
    >
      결제
    </v-btn>

    <v-overlay :absolute="true" :opacity="0.5" :value="overlay">
      <v-card
        class="popup-payment rounded-xl"
        color="white"
        width="400"
        height="480"
      >
        <!-- 타이틀 -->

        <v-card-title class="popup-payment-title d-flex justify-center">
          결제
        </v-card-title>

        <v-card-text
          class="popup-payment-contents"
          style="border-bottom: 1px solid #E8E8E8;"
        >
          <v-col class="pl-0 pr-0" style="color:black;">
            <div class="contents-title">구매정보</div>
            <div
              class="contents-content"
              v-for="item in info"
              :key="item.label"
            >
              - {{ item.label }} : {{ item.value }}
            </div>
          </v-col>
        </v-card-text>

        <v-card-text class="popup-payment-contents2">
          <v-row>
            <div class="contetns2-label">
              결제금액
            </div>
            <v-spacer></v-spacer>
            <div class="contetns2-value">
              10,000원
            </div>
          </v-row>
        </v-card-text>

        <!-- 하단 버튼 -->
        <v-card-actions class="d-flex justify-center popup-payment-actions">
          <div @click="overlay = false">
            <Button
              class="action-apply-btn rounded-br-xl rounded-bl-xl"
              height="50"
              width="400"
              color="#081157"
              contents="결제"
            />
          </div>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-row>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  components: { Button },
  data() {
    return {
      overlay: false,
      zIndex: 0,
      info: [
        { label: "봇 이름", value: "금지어 검색" },
        { label: "다운로드 제한", value: "기간" },
        { label: "제한 기간", value: "2020-11-01 ~ 2021-11-02" },
        { label: "금액", value: "무료" }
      ]
    };
  }
};
</script>

<style lang="scss"></style>
