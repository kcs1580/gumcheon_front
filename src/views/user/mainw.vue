<template>
  <v-layout wrap style="margin-top:58px;">
    <v-flex xs12 class="d-flex flex-column justify-center main-background">
      <div class="d-flex justify-center upper">
        <div class="banner-frame">
          <RollingBanner></RollingBanner>
        </div>
      </div>
      <v-container
        class="d-flex justify-center flex-wrap elevation-15 rounded-lg searchFrame"
      >
        <div
          class="d-flex flex-row align-center justify-center sub-text"
          style="font-size: 20px"
        >
          총<span style="margin-left:5px;">{{ this.botCount }}</span
          >개 봇과 <span style="margin-left:5px;">{{ this.userCount }}</span
          >명 회원이 사용하고 있습니다.
          <div @click="$router.push('/bot')">
            <Button
              class="rounded-l"
              style="margin-left:15px;"
              width="80"
              height="28"
              color="#CDCDCD"
              :textBlack="true"
              :plain="true"
              :outlined="true"
              :ripple="false"
              contents="전체보기"
            />
          </div>
        </div>
        <Search />
      </v-container>
      <v-layout justify-center wrap style="margin: 0 auto;">
        <v-flex xs12 style="height:100%; width:1180px; padding-bottom: 40px">
          <div class="firstFloor">
            <div class="firstFloor-title">
              <span>
                이번 달 추천
              </span>
              <div @click="$router.push('/bot')">
                <Button
                  class="rounded-xl"
                  width="80"
                  height="28"
                  color="#CDCDCD"
                  :textBlack="true"
                  :rounded="true"
                  :plain="true"
                  :outlined="true"
                  contents="+more"
                />
              </div>
            </div>

            <CardList
              :jobCategory="this.jobCategory"
              :cardData="this.mainList1"
            ></CardList>
          </div>
          <v-divider class="card-divider" />
          <div class="secondFloor">
            <div class="secondloor-title">
              <span>
                경영/사무 업무 추천 봇
              </span>
              <div @click="getRecommend">
                <Button
                  class="rounded-xl btn-more"
                  width="80"
                  height="28"
                  color="#CDCDCD"
                  :textBlack="true"
                  :rounded="true"
                  :plain="true"
                  :outlined="true"
                  contents="+more"
                />
              </div>
            </div>
            <div @click="setCategory">
              <CardList
                :jobCategory="this.jobCategory"
                :cardData="this.mainList2"
              ></CardList>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
import Button from "@/components/Button.vue";
import CardList from "@/components/MainCardList.vue";
import RollingBanner from "@/components/RollingBanner.vue";
import Search from "@/components/Search.vue";
import botApi from "@/api/bot.js";
import userApi from "@/api/user.js";

export default {
  components: { CardList, Search, RollingBanner, Button, mapMutations },
  methods: {
    //Vuex Helper Mutations
    ...mapMutations(["SET_BUSINESSCATEGORYLIST", "SET_ALLJOBCATEGORYLIST"]),
    getBotList() {
      botApi
        .listBot({ itemCnt: 8, startId: 0 })
        .then(res => {
          this.mainList1 = res.data.list;
        })
        .catch(res => {
          console.log(res);
        });
    },
    getBotList2() {
      botApi
        .listBot({ itemCnt: 8, startId: 0, jobCategoryList: [10] })
        .then(res => {
          this.mainList2 = res.data.list;
        })
        .catch(res => {
          console.log(res);
        });
    },
    getBotCount() {
      botApi
        .getBotCount()
        .then(res => {
          this.botCount = res.data.total;
        })
        .catch(res => {
          console.log(res);
        });
    },
    getUserCount() {
      userApi
        .getUserCount()
        .then(res => {
          this.userCount = res.data.totalUserCount;
        })
        .catch(res => {
          console.log(res);
        });
    },
    getRecommend() {
      this.$router.push("/bot");
      this.SET_BUSINESSCATEGORYLIST([10]);
    },
    setCategory() {
      this.SET_BUSINESSCATEGORYLIST([10]);
    },
    getCategory() {
      botApi
        .getBotCount()
        .then(res => {
          this.jobCategory.content = res.data.jobCategoryList;
          this.jobCategory.total = res.data.jobCategoryListTotal;

          this.SET_ALLJOBCATEGORYLIST(this.jobCategory.content);
          this.getBotList();
          this.getBotList2();
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  data() {
    return {
      mainCategory: [],
      mainList1: [],
      mainList2: [],
      botCount: 0,
      userCount: 0,
      jobCategory: {
        title: "카테고리",
        content: [{ categoryName: "" }],
        total: ""
      }
    };
  },
  created() {
    this.getCategory();
    this.getBotCount();
    this.getUserCount();
  },
  mounted() {}
};
</script>

<style lang="scss">
.sub-text {
  width: 100%;
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: bold;
  color: black;
  span {
    color: #d70000;
  }
}
.upper {
  background-color: #213e86;
  /* background-image: linear-gradient(to bottom right, #182E75, #5A4B79); */

  .banner-frame {
    /* padding-top: 20px; */
    padding-bottom: 20px;
  }
}
.searchFrame {
  width: 100%;
  max-width: 1180px;
  margin-top: -82px;
  background-color: white;
}

.firstFloor {
  margin-top: 50px;
  width: 100%;

  .firstFloor-title {
    margin-bottom: 20px;
    padding: 0px 10px 0px 10px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 24px;
  }
}
.secondFloor {
  margin-top: 50px;
  width: 100%;

  .secondloor-title {
    margin-bottom: 20px;
    padding: 0px 10px 0px 10px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 24px;
  }
}
.main-background {
  background-color: #f6fafd;
}
.card-divider {
  margin-top: 60px;
}
</style>
