<template>
  <!-- footer -->
  <v-footer color="white" class="footer-box">
    
    <v-row no-gutters justify="space-between" align="end">
      <v-col cols="6">
     
  <p class="text-left">
금천구시설관리공단<br/>
사업자등록번호 : 119-82-03909<br/>
대표 : 박 평<br/>
08638 서울시 금천구 시흥대로 37길 18 (시흥동)<br/>
전화 02.807.0061~7<br/>
팩스 02.809.1471~2<br/>
</p>
      </v-col>
      <v-col cols="6">
        <p class="text-right" >
      <a>이용약관</a> <br/>
      <a>개인정보처리</a> <br/>
      <a>고객센터</a> <br/>    
    </p>
      </v-col>
      <v-col cols="12">
       <p class="text-left"> Copyright 2021  서울시금천구시설관리공단  All Rights Reserved </p> </v-col>
      </v-row>
  </v-footer>
</template>

<script>
export default {
  methods: {
    preparing() {
      alert("구현중입니다.");
    }
  }
};
</script>

<style lang="scss">
.footer-box{

  margin-top:100px;
  font-size: 10px;
}
.re_footer .policyWrap {
    height: auto;
    text-align: center;
    padding: 10px 0;
}
.re_footer .policyWrap .policy {
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
    
}
.re_footer .policyWrap .policy li a{
    

 text-decoration: none;
    color: #636363;
}

.re_footer .policyWrap .policy li {
  float: left;
 list-style-type: none;
margin-left: 20px;
}


</style>
