<template>
  <!-- 메인 배너 -->
  <div class="RollingBanner">
    <v-carousel
      interval="3000"
      height="400"
      width="100%"
      cycle
      hide-delimiter-background
      :show-arrows="false"
    >
      <v-carousel-item v-for="slide in slides" :src="slide.src" :key="slide.id">
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //배너 이미지 링크
      slides: [
        {
          id: 1,
          src:
            "http://www.timebees.net/api/v1/files/download/1254bd8e-fa36-4890-b968-a2f313c9e08d"
        },
        {
          id: 2,
          src:
            "http://www.timebees.net/api/v1/files/download/c8e84c52-081c-4c67-87f8-1aa90690a36f"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.RollingBanner {
  margin-top: -44px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 1180px;
  height: 525px;

  .v-carousel__controls {
    .v-item-group {
      position: absolute;
      left: 25px;
      bottom: 25px;

      .v-btn--active {
        /* color: #EC705B; */
        color: #ed8616;
      }
      .v-btn--icon {
        width: 10px;
        height: 10px;
        /* color: white; */

        .v-btn__content {
          i {
            font-size: 12px !important;
          }
        }
      }
    }
  }
}
</style>
