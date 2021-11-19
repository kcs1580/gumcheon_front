<template>
  <!-- 인증 관련 레이아웃  -->
  <v-row class="login-frame" justify="center" align="center">
    <router-view> </router-view>
  </v-row>
</template>

<script></script>

<style>
.login-frame {
  background: #b92b27; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom right,
    #ec705b,
    10%,
    #213e86
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom right,
    #ec705b,
    10%,
    #213e86
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
