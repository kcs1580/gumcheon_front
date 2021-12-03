<template>
  <v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card >
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px" @click="$router.push('/notice')"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import botApi from "@/api/bot.js";
import userApi from "@/api/user.js";

export default {
  components: { mapMutations },
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
      cards: [
        { title: '불편접수', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6 },
        { title: '내 정보관리', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: '접수 및 처리 현황', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
        { title: '공지사항', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ],
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
