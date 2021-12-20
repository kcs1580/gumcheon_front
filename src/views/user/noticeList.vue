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
            style="margin: 10px 0px; padding: 12px 15px"
            :headers="headers"
            :items="articels"
            :items-per-page="5"
          >
          </v-data-table>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col cols="12" style="font-weight: 500; font-size: 18px">
              시설</v-col
            >
            <v-col cols="9" style="margin-bottom: 20px">
              <v-chip-group active-class="primary--text" column>
                <v-chip
                  text-color="black"
                  outlined
                  label
                  color="#0276F9"
                  v-for="tag in tags"
                  :key="tag"
                >
                  {{ tag }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-card>
        <v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col style="font-weight: 500; font-size: 18px">기관명</v-col>
            <v-col cols="12">
              <v-select
                :items="faci"
                placeholder="기관명을 선택해주세요."
                dense
                outlined
              ></v-select>
            </v-col>
          </v-row>
        </v-card>
        <v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col v style="font-weight: 500; font-size: 18px">전화번호</v-col>
            <v-col cols="12">
              <v-text-field
                :items="faci"
                placeholder="연락 가능한 번호를 적어주세요."
                dense
                outlined
              ></v-text-field>
            </v-col>
          </v-row> </v-card
        ><v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col style="font-weight: 500; font-size: 18px"
              >불편접수 내용</v-col
            >
            <v-col cols="12">
              <v-textarea
                :items="faci"
                placeholder="불편접수 내용을 적어주세요."
                dense
                outlined
                no-resize
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card>
        <v-card width="334px" flat>
          <v-row no-gutters align="center" justify="space-between">
            <v-col style="font-weight: 500; font-size: 18px">사진 첨부</v-col>
            <v-col cols="12">
              <v-text-field
                :items="faci"
                placeholder="53mb 이하의 파일만 가능합니다."
                dense
                outlined
              ></v-text-field>
              <v-file-input></v-file-input>
            </v-col>
          </v-row>
          <div
            style="
              font-size: 13px;
              line-height: 19px;
              letter-spacing: -0.06em;
              color: #6c6c6c;
              margin-bottom: 60px;
              margin-top: 99px;
            "
          >
            상황에 따라 기한 또는 인원이 변경 될 수 있으며, 자세한 내용
            파악을<br />
            위해 담당자가 연락을 취할 수 있습니다. 감사합니다.
          </div>
          <v-btn
            style="border-radius: 12px; font-size: 22px; margin-bottom: 11px"
            class="white--text"
            color="#0276F9"
            width="334px"
            height="54px"
            >접수하기</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import communityApi from "@/api/community.js";

export default {
  data() {
    return {
      // ..
      dlRead: false,
      articles: [],
      article: {
        title: "",
        contetn: "",
      },
      headers: [
        { text: "제목", value: "title" },
        { text: "게시일", value: "regdate" },
      ],
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
  created() {
    this.list();
  },
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
