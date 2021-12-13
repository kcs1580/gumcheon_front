<template>
  <!-- footer -->
  <v-footer padless>
    <v-card flat title width="100%" class="lighten-1 white--text align-center text-center re_footer" height="140" padless>
 <v-card-text class='policyWrap'>
    
<v-row align-center justify-space-between >
  <v-col>
  <a href='http://www.gfmc.kr/privacy.html'>개인정보처리방침</a>
	<a href='http://www.gfmc.kr/government04.html'>경영공시</a>
 	<a href='http://www.gfmc.kr/intro02.html'>미션·비전·가치</a>
 <a href='http://www.gfmc.kr/certification.html'>인증서 및 표창장 안내</a>
  	<a href='http://www.gfmc.kr/viewer.html'>뷰어다운로드</a>
 	<a href='http://www.gfmc.kr/related.html'>관련사이트</a>
  </v-col>
</v-row>
		
	
	
 </v-card-text>
  <v-divider></v-divider>

 <v-card-text>
    
			<img src='http://www.gfmc.kr/images/renu_main/logo4.png' alt='금천구 시설관리 공단 logo' class='logo_gray'/>
 
 </v-card-text>
 <v-card-text>
				<span>서울시 금천구 시흥대로 37길 18 (시흥동) (우 08638)</span><span>전화 02)809-0061~7</span><span>팩스 02)809-1471~2</span><br>
				<span>사업자명 : 금천구시설관리공단</span><span>대표 : 박 평</span><span>사업자등록번호 : 119-82-03909</span><br>
				<span>Copyright 2018 서울시금천구시설관리공단.</span><span>All Rights Reserved.</span>
		
 <v-card-text> </v-card-text>
			<img src='http://www.gfmc.kr/images/renu_main/logo5.png' alt='금천구 시설관리 공단 logo' class='rightside'/>
	
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
