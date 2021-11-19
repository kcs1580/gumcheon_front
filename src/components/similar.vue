<template>
  <!-- 봇 상세 유사한 봇 컴포넌트 -->
  <v-row
    v-show="similarList.length > 1"
    class="similar"
    justify="center"
    align="center"
  >
    <div>
      <v-row class="similar-title" justify="space-between">
        <span>
          유사한 봇
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
      </v-row>
      <CardList
        :currentBid="currentBid"
        :jobCategory="jobCategory"
        :cardData="similarList"
      ></CardList>
    </div>
  </v-row>
</template>

<script>
import CardList from "@/components/MainCardList.vue";
import Button from "@/components/Button.vue";
import botApi from "@/api/bot.js";

export default {
  components: { CardList, Button },
  props: {
    //잡카테고리 목록 데이터
    categoryData: Array,
    //부모 컴포넌트 봇id
    currentBid: String
  },
  data() {
    return {
      //유사한 봇 리스트
      similarList: [],
      //업무 카테고리 리스트
      jobCategoryList: [],
      //업무 카테고리 리스트
      jobCategory: {
        title: "카테고리",
        content: [{ categoryName: "" }],
        total: ""
      }
    };
  },
  methods: {
    //현재 업무 카테고리로 봇 검색
    getRecommend() {
      this.$router.push("/bot");
      this.$store.commit("SET_JOBCATEGORYLIST", this.jobCategoryList);
    },
    //유사봇 리스트 가져오기
    getBotList() {
      botApi
        .listBot({
          itemCnt: 4,
          startId: 0,
          jobCategoryList: this.jobCategoryList,
          botType: ["BOT"]
        })
        .then(res => {
          this.similarList = res.data.list;
        })
        .catch(res => {
          console.log(res);
        });
    },
    //업무카테고리 데이터 가져오기
    getCategory() {
      botApi
        .getAllCategory()
        .then(res => {
          this.jobCategory.content = res.data.jobCategoryList;
          this.jobCategory.total = res.data.jobCategoryListTotal;
          this.$store.commit(
            "SET_ALLJOBCATEGORYLIST",
            this.jobCategory.content
          );
        })
        .catch(res => {
          console.log(res);
        })
        .finally(this.getCategoryData());
    },
    init() {
      this.getCategory();
    },
    //업무 카테고리 id 가져오기
    getCategoryData() {
      for (let a = 0; a < this.categoryData.length; a++) {
        this.jobCategoryList.push(this.categoryData[a].id);
      }
      this.getBotList();
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
.similar {
  height: 350px;
  background-color: #e7eaf1;
  width: 100%;
  margin-left: 0;

  .similar-title {
    display: flex;
    margin-top: -12px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #222222;
  }
}
</style>
