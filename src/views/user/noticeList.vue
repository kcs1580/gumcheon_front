<template>
  <v-container fluid height>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12">
        <v-card width="334px" flat style="margin-top: 84px">
          <div style="font-weight: bold; font-size: 30px">공지사항</div>
          <div style="font-size: 20px">
            금천구시설관리공단 <br />
            서비스 소식입니다.
          </div>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card width="334px" flat>
          <v-divider style="margin-top: 28px; margin-bottom: 74px" />
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card width="334px" flat style="margin-bottom: 44px">
          <v-row no-gutters align="center" justify="space-between">
            <div style="font-weight: bold; font-size: 20px">제목</div>
            <div style="font-weight: bold; font-size: 20px">게시일</div>
          </v-row>
          <v-divider style="margin-top: 12px" />
          <v-data-table
            hide-default-header
            hide-default-footer
            :headers="headers"
            :items="articles"
            :items-per-page="5"
          >
          </v-data-table>
        </v-card>
        <v-pagination v-model="page" :length="3"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import communityApi from "@/api/community.js";

export default {
  data() {
    return {
      page: 1,
      headers: [
        {
          text: "title",
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: "regDate",
          align: "end",
          sortable: false,
          value: "regDate",
        },
      ],
      articles: [
        {
          title: "2022 공공안전 사업 계획",
          regDate: "2021.12.25",
        },
        {
          title: "금천구시설관리공단 접수지연 안내",
          regDate: "2021.12.25",
        },
        {
          title: "불편접수 전 확인해주세요",
          regDate: "2021.12.25",
        },
        {
          title: "2022 공공안전 사업 계획",
          regDate: "2021.12.25",
        },
        {
          title: "2022 공공안전 사업 계획",
          regDate: "2021.12.25",
        },
      ],
      // ..
      dlRead: false,
      article: {
        title: "",
        content: "",
      },

      loading: false,
      // ..
    };
  },
  // ..
  methods: {
    // ..

    list() {
      if (this.loading) return;
      this.loading = true;
      communityApi
        .listCommunity()
        .then(({ data }) => {
          this.articles = data;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
        });
    },

    read(board) {
      this.article.title = board.title;
      this.loading = true;
      communityApi
        .selectCommunity(board.idx)
        .then(({ data }) => {
          this.dlRead = true;
          this.article = data;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);

          this.loading = false;
        });
    },
    communityDetail(idx) {
      this.$router.push("/notice/" + idx);
    },
    handleClick(value) {
      this.communityDetail(value.idx);
    },
  },
  created() {},
};
</script>

<style lang="scss">
#chip.v-chip.complete {
  background: #00cc00;
}
#chip.v-chip.ongoing {
  background: #0099ff;
}
#chip.v-chip.overdue {
  background: #ff0000;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 40px !important;
}
.main-btn {
  border-radius: 12px;
  font-size: 18px;
}
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
