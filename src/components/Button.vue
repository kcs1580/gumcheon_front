<template>
  <!-- 공통 버튼 컴포넌트 -->
  <v-btn
    style="font-size: 14px !important;"
    :class="{ btnTextBlack: textBlack }"
    :color="color"
    :rounded="rounded"
    :width="width"
    :height="height"
    :outlined="outlined"
    :plain="plain"
    :ripple="ripple"
    >{{ contents }}</v-btn
  >
</template>

<script>
export default {
  props: {
    color: String,
    textBlack: Boolean,
    contents: String,
    rounded: Boolean,
    width: String,
    height: String,
    outlined: Boolean,
    plain: Boolean,
    ripple: Boolean
  }
};
</script>

<style lang="scss">
.btnTextBlack {
  .v-btn__content {
    font-size: 14px;
    color: black !important;
  }
}
</style>
