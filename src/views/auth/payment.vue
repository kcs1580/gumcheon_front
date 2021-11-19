<template>
  <!-- 결제 페이지 -->
  <div>
    <form id="SendPayForm_id" name="" method="POST">
      <input type="text" name="goodname" value="테스트" />
      <input type="text" name="buyername" value="홍길동" />
      <input type="text" name="buyertel" value="010-1234-5678" />
      <input type="text" name="buyeremail" value="test@inicis.com" />
      <input type="text" name="price" value="1000" />
      <input type="hidden" name="mid" value="INIpayTest" />
      <input type="hidden" name="gopaymethod" value="Card" />
      <input
        type="hidden"
        name="mKey"
        value="3a9503069192f207491d4b19bd743fc249a761ed94246c8c42fed06c3cd15a33"
      />
      <input
        type="hidden"
        name="signature"
        value="c156cdee70339904af4404adfed48aa9dd5a650ff1a43f03599b880a9c0d22f9"
      />
      <input type="hidden" name="oid" value="INIpayTest_1619489501628" />
      <input type="hidden" name="timestamp" value="1619489501628" />
      <input type="hidden" name="version" value="1.0" />
      <input type="hidden" name="currency" value="WON" />
      <input type="hidden" name="acceptmethod" value="below1000" />
      <input
        type="hidden"
        name="returnUrl"
        value="http://localhost/stdpay/INIStdPayReturn_simple.asp"
      />
      <input
        type="hidden"
        name="closeUrl"
        value="http://localhost/stdpay/close.asp"
      />
    </form></div
></template>

<script>
import Button from "@/components/Button.vue";
import Pay from "@/components/Pay.vue";

export default {
  components: { Button, Pay },
  data() {
    return {
      overlay: false
    };
  }
};
</script>

<style lang="scss"></style>
