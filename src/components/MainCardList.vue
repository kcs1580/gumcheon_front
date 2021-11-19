<template>
  <!-- 메인, 유사 봇 카드리스트 -->
  <v-row justify="center" v-if="!isLoading">
    <div v-for="(item, i) in cardList" :key="i">
      <v-col lg="2" class="siri-layout-card" v-if="item.bot.id != currentBid">
        <!-- 첫번째 줄 카테고리, 솔루션 표시 -->

        <v-row class="first-floor">
          <div class="chip">
            <v-chip
              class="chip"
              v-for="(chip, j) in item.jobCategoryIdList"
              :key="j"
              color="#B6B6B6"
              text-color="white"
              small
            >
              {{ jobCategory.content.find(x => x.id == chip).categoryName }}
            </v-chip>
          </div>
          <div class="icon"><v-img src="/icons/icon_version.jpg"></v-img></div>
        </v-row>
        <!-- 두번째 줄 봇 제목, 개요, 유/무료 표시 -->
        <v-row class="second-floor">
          <v-col class="contents-box" @click="gotoDetail(item.bot.id)">
            <div class="title">
              {{ item.bot.botName }}
            </div>
            <div class="contents">
              {{ item.bot.overview }}
            </div>
          </v-col>
          <div class="icon">
            <v-img v-if="item.price != 0" src="/icons/icon_free.jpg" />
            <v-img v-else src="/icons/icon_money.jpg" />
          </div>
        </v-row>
        <!-- 세번 쨰 줄 별점, 다운로드 횟수 표시 -->
        <div class="third-floor">
          <div class="rating">
            <v-icon
              v-for="(s1, a) in Number(item.bot.rating)"
              :key="a"
              color="#EC705B"
              size="17"
              >star</v-icon
            >
            <v-icon
              v-for="(s2, b) in 5 - Number(item.bot.rating)"
              :key="1000 + b"
              color="#CCCCCC"
              size="17"
              >star</v-icon
            >
            <span style="margin-left: 10px;">{{ item.bot.ratingCnt }}</span>
          </div>
          <div class="download">
            <span class="down-icon"
              ><v-img src="/icons/download.jpg" />
              <!-- icon --></span
            >
            {{ Number(item.bot.downloadCnt).toLocaleString() }}
          </div>
        </div>
      </v-col>
    </div>
  </v-row>
</template>

<script>
import botApi from "@/api/bot.js";

export default {
  data() {
    return {
      isLoading: 1,
      cardList: [],
      jobCategory: []
    };
  },
  props: {
    cardData: Array,
    currentBid: String
  },
  methods: {
    //봇 상세로 이동
    gotoDetail(id) {
      this.$router.push("/bot/" + id);
    },
    //업무 카테고리 목록 가져오기
    getJobCategory() {
      botApi
        .getJobCategory()
        .then(res => {
          this.jobCategory.content = res.data.list;
          this.jobCategory.total = res.data.total;
          this.isLoading = 0;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  //cardList 초기화
  created() {
    this.getJobCategory();
    //this.jobCategory.content = this.$store.getters.getalljobCategoryList;
  },

  //cardList 동기화
  watch: {
    cardData(data) {
      this.cardList = data;
    }
  }
};
</script>

<style scoped lang="scss">
.siri-layout-card:hover {
  border: solid 2px #081157;
  padding: 18px 13px;
}
.siri-layout-card {
  background-color: white;
  margin: 7px;
  padding: 20px 15px;
  min-width: 280px;
  width: 280px;
  height: 200px;
  border-radius: 10%;
  flex-wrap: inherit;

  .first-floor {
    padding-left: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .chip {
      margin-right: 3px;
    }
    .icon {
      margin-right: -5px;
      position: relative;
    }
  }
  .second-floor {
    margin-bottom: 15px;
    margin-top: 5px;
    width: 100%;
    height: 80px;

    .contents-box {
      /* margin-right: 15px; */
      padding-top: 0px;
      width: 80%;
      cursor: pointer;

      .title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
        font-size: 30px;
      }
      .contents {
        font-weight: normal;
        font-size: 14px;
        white-space: normal;
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .icon {
      /* display: flex; */
      /* align-items: center; */
      margin-top: 25px;
      margin-right: -10px;
      float: right;
    }
  }

  .third-floor {
    margin-top: 15px !important;
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-top: solid 1px #dddddd;

    .rating {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      width: 50%;
    }
    .download {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      .down-icon {
        margin-right: 8px;
      }
    }
  }
}
</style>
