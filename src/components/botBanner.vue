<template>
  <!-- 봇 상세 이미지, 유튜브 배너 컴포넌트 -->
  <v-row v-show="items">
    <!-- 컨텐츠가 1개 이상일 경우 페이지 이동 화살표 노출 -->
    <v-carousel
      v-if="items.length > 1"
      class="carousel"
      height="550"
      hide-delimiters
      :show-arrows="true"
    >
      <!-- item에 youtube 링크가 있다면 youtube iframe 출력 그렇지 않다면 img 태그 출력 -->
      <template v-for="(item, i) in items">
        <v-carousel-item :key="i">
          <v-row align="center">
            <v-col v-if="item.includes('youtube')">
              <iframe
                class="video-elem"
                width="100%"
                height="550"
                :src="item"
                frameborder="0"
                allowfullscreen
              ></iframe
            ></v-col>
            <v-col v-else> <img :src="item" height="auto" width="100%"/></v-col>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel>
    <!-- 컨텐츠가 1개일 경우 페이지 이동 화살표 숨김 -->
    <v-carousel
      v-else
      class="carousel"
      height="550"
      hide-delimiters
      :show-arrows="false"
    >
      <template v-for="(item, i) in items">
        <v-carousel-item :key="i">
          <v-row align="center">
            <v-col v-if="item.includes('youtube')">
              <iframe
                class="video-elem"
                width="100%"
                height="550"
                :src="item"
                frameborder="0"
                allowfullscreen
              ></iframe
            ></v-col>
            <v-col v-else> <img :src="item" height="auto" width="100%"/></v-col>
          </v-row>
        </v-carousel-item>
      </template>
    </v-carousel>
  </v-row>
</template>

<script>
export default {
  props: {
    //carousel 컨텐츠
    items: Array
  },
  data() {
    return {};
  },

  methods: {},
  created() {}
};
</script>

<style scoped lang="scss">
.carousel {
  width: 100%;
}
.v-responsive__content {
  align-content: center;
}
</style>
