<template>
  <!-- footer -->
  <v-footer padless>
    <v-card flat title width="100%" class="lighten-1 white--text align-center text-center re_footer" height="140" padless>
 <v-card-text class='policyWrap'>
    
<v-row align-center justify-space-between >
  <v-col>
    <div style="float:left">
금천구시설관리공단 <br/>
사업자등록번호 : 119-82-03909  <br/>
대표 : 박 평  <br/>
08638 서울시 금천구 시흥대로 37길 18 (시흥동) <br/>
전화 02.807.0061~7 <br/>
팩스 02.809.1471~2 <br/>
    </div>
  </v-col>
</v-row>
 </v-card-text>
	

    </v-card>
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
