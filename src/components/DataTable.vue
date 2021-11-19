<template>
  <!-- 게시판 류 공통 데이터 테이블 컴포넌트 -->
  <v-container class="datatable-frame">
    <v-data-table
      v-if="list != null"
      disable-sort
      hide-default-footer
      :headers="headers"
      :items="list"
      :search="search"
      @click:row="handleClick"
      class="row-pointer"
    >
      <template v-slot:[`item.title`]="{ item }">
        <v-row align="center">
          <!-- 글 제목 -->
          <div class="truncate flex-grow-1 text-left">{{ item.title }}</div>
          <!-- 수정, 비노출 버튼 -->
          <span v-if="item.createdById == $store.state.userId">
            <v-btn text x-small
              ><v-icon @click.stop="toEdit(item.id)">
                mdi-file-document-edit-outline
              </v-icon></v-btn
            >
            <v-btn
              v-if="item.visibleYn"
              text
              x-small
              @click.stop="hide(item.id)"
              ><v-icon> mdi-eye-off-outline </v-icon></v-btn
            >
            <v-btn v-else text x-small @click.stop="show(item.id)"
              ><v-icon> mdi-eye-outline </v-icon></v-btn
            ><v-btn text x-small @click.stop="remove(item.id)">
              <v-icon> mdi-window-close </v-icon></v-btn
            >
          </span>
        </v-row>
      </template>
      <template v-slot:[`item.createdDate`]="{ item }">
        {{ $moment(item.createdDate).format("YYYY-MM-DD") }}
      </template></v-data-table
    >
  </v-container>
</template>

<script>
import Button from "@/components/Button.vue";
import Search from "@/components/Search.vue";
import communityApi from "@/api/bot.js";
import archivesApi from "@/api/archives.js";

export default {
  components: { Button, Search },
  data() {
    return {
      //검색어 변수
      search: "",
      //헤더 변수
      headers: [],
      //게시글 목록 변수
      list: [],
      //자료실일 경우 헤더
      archivesHeaders: [
        {
          text: this.$t("community.tableid"),
          align: "center",
          filterable: false,
          value: "id",
          class: "table-title-font",
          width: "10%"
        },
        {
          text: this.$t("community.tabletitle"),
          class: ["table-title", "table-title-font"],
          value: "title"
        },
        {
          text: this.$t("community.tablereply"),
          class: ["table-title-font", "table-cell-style"],
          align: "center",
          value: "replyCnt",
          width: "8%"
        },
        {
          text: this.$t("community.tablelike"),
          class: ["table-title-font", "table-cell-style"],
          align: "center",
          value: "likeCnt",
          width: "8%"
        },
        {
          text: this.$t("community.tablevisit"),
          class: ["table-title-font", "table-cell-style2"],
          align: "center",
          value: "visitCnt",
          width: "8%"
        },
        {
          text: this.$t("community.tabledate"),
          class: ["table-title-font", "table-cell-style2"],
          align: "center",
          value: "createdDate",
          width: "10%"
        },
        {
          text: this.$t("community.tableauthor"),
          class: ["table-title-font", "table-cell-style2"],
          align: "center",
          value: "createdByNm",
          width: "10%"
        }
      ],
      //커뮤니티일 경우 헤더
      communityHeaders: [
        {
          text: this.$t("community.tableid"),
          align: "center",
          filterable: false,
          value: "id",
          class: "table-title-font",
          width: "100px"
        },
        {
          text: this.$t("community.tabletitle"),
          class: ["table-title", "table-title-font"],
          value: "title",
          align: "center"
        },
        {
          text: this.$t("community.tablereply"),
          class: ["table-title-font", "table-cell-style"],
          align: "center",
          value: "replyCnt",
          width: "80px"
        },
        {
          text: this.$t("community.tablelike"),
          class: ["table-title-font", "table-cell-style"],
          align: "center",
          value: "likeCnt",
          width: "80px"
        },
        {
          text: this.$t("community.tablevisit"),
          class: ["table-title-font", "table-cell-style"],
          align: "center",
          value: "visitCnt",
          width: "80px"
        },
        {
          text: this.$t("community.tabledate"),
          class: ["table-title-font", "table-cell-style2"],
          align: "center",
          value: "createdDate",
          width: "110px"
        },
        {
          text: this.$t("community.tableauthor"),
          class: ["table-title-font", "table-cell-style2"],
          align: "center",
          value: "createdByNm",
          width: "110px"
        }
      ],
      //교육신청일 경우 헤더
      educationHeaders: [
        {
          text: "번호",
          align: "center",
          filterable: false,
          value: "index",
          class: "table-title-font",
          width: "8%"
        },
        {
          text: "제목",
          class: ["table-title", "table-title-font"],
          value: "title"
        },
        {
          text: "작성일",
          class: "table-title-font",
          align: "center",
          value: "date"
        },
        {
          text: "작성자",
          class: "table-title-font",
          align: "center",
          value: "writer"
        },
        {
          text: "답변여부",
          class: "table-title-font",
          align: "center",
          value: "re"
        }
      ],
      //교육신청 임시 게시글 목록
      educationList: [
        {
          index: "3254",
          date: "2020-10-10",
          title: "교육 신청",
          writer: "SIRI",
          re: false
        },
        {
          index: "3255",
          date: "2020-10-10",
          title: "교육 신청 합니다",
          writer: "SIRI",
          re: false
        },
        {
          index: "3256",
          date: "2020-10-10",
          title: "교육 신청 합니다. 교육 신청 합니다",
          writer: "SIRI",
          re: false
        },
        {
          index: "3257",
          date: "2020-10-10",
          title: "교육 신청 합니다",
          writer: "SIRI",
          re: false
        },
        {
          index: "3258",
          date: "2020-10-10",
          title: "교육 신청 합니다교육 신청 합니다교육 신청 합니다",
          writer: "SIRI",
          re: false
        },
        {
          index: "3259",
          date: "2020-10-10",
          title: "교육 신청 합니다",
          writer: "SIRI",
          re: false
        },
        {
          index: "3260",
          date: "2020-10-10",
          title: "교육 신청",
          writer: "SIRI",
          re: false
        },
        {
          index: "3261",
          date: "2020-10-10",
          title: "교육 신청교육 신청교육 신청",
          writer: "SIRI",
          re: false
        },
        {
          index: "3262",
          date: "2020-10-10",
          title: "교육 신청교육 신청",
          writer: "SIRI",
          re: false
        },
        {
          index: "3263",
          date: "2020-10-10",
          title: "교육 신청교육 신청",
          writer: "SIRI",
          re: false
        }
      ]
    };
  },
  props: {
    communityList: Array,
    archivesList: Array,
    listsize: Number
  },
  watch: {
    //커뮤니티 게시글 목록
    communityList(data) {
      this.list = data;
    },
    //자료실 게시글 목록
    archivesList(data) {
      this.list = data;
    },
    //게시글 목록 사이즈
    listsize(data) {
      this.listsize = data;
    }
  },
  created() {
    //데이터 연결
    this.dataset();
  },

  methods: {
    undone() {
      alert("구현중인 기능입니다.");
    },
    //커뮤니티 검색
    searchCommunity() {
      if (this.search.length < 2) alert("2글자 이상 입력해 주세요.");
      else {
        //this.board.searchBy = this.searchBy;
        //this.board.searchValue = this.searchValue;

        communityApi
          .listBot({ searchValue: this.search })
          .then(({ data }) => {
            this.list = data.list;
            this.listsize = data.total;
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    //상세 페이지 이동
    toDetail(id) {
      if (this.$route.name == "education") {
        this.undone();
      } else if (this.$route.name == "communityList") {
        this.$router.push("/community/" + id);
      } else if (this.$route.name == "archivesList") {
        this.$router.push("/archives/" + id);
      }
    },
    //수정 페이지 이동
    toEdit(id) {
      if (this.$route.name == "education") {
        this.$router.push("/education/" + id + "/modify");
      } else if (this.$route.name == "communityList") {
        this.$router.push("/community/" + id + "/modify");
      } else if (this.$route.name == "archivesList") {
        this.$router.push("/archives/" + id + "/modify");
      }
    },
    //게시글 삭제
    remove(id) {
      if (this.$route.name == "education") {
        this.$router.push("/education/" + id + "/modify");
      } else if (this.$route.name == "communityList") {
        if (confirm("삭제 하시겠습니까?")) {
          communityApi
            .deleteCommunity(id)
            .then(() => {
              location.reload();
            })
            .catch(res => {
              console.log(res);
            });
        }
      } else if (this.$route.name == "archivesList") {
        if (confirm("삭제 하시겠습니까?")) {
          archivesApi
            .deleteArchives(id)
            .then(() => {
              location.reload();
            })
            .catch(res => {
              console.log(res);
            });
        }
      }
    },
    //게시글 비노출
    hide(id) {
      if (this.$route.name == "education") {
        this.$router.push("/education/" + id + "/modify");
      } else if (this.$route.name == "communityList") {
        if (confirm("비노출 하시겠습니까?")) {
          communityApi
            .visibleCommunity(id, false)
            .then(() => {
              location.reload();
            })
            .catch(res => {
              console.log(res);
            });
        }
      } else if (this.$route.name == "archivesList") {
        if (confirm("비노출 하시겠습니까?")) {
          archivesApi
            .visibleArchives(id, false)
            .then(() => {
              location.reload();
            })
            .catch(res => {
              console.log(res);
            });
        }
      }
    },
    //게시글 노출
    show(id) {
      if (this.$route.name == "education") {
        this.$router.push("/education/" + id + "/modify");
      } else if (this.$route.name == "communityList") {
        if (confirm("노출 하시겠습니까?")) {
          communityApi
            .visibleCommunity(id, true)
            .then(() => {
              location.reload();
            })
            .catch(res => {
              console.log(res);
            });
        }
      } else if (this.$route.name == "archivesList") {
        if (confirm("노출 하시겠습니까?")) {
          archivesApi
            .visibleArchives(id, true)
            .then(() => {
              location.reload();
            })
            .catch(res => {
              console.log(res);
            });
        }
      }
    },
    //데이터 연결
    dataset() {
      if (this.$route.name == "education") {
        this.headers = this.educationHeaders;
        this.list = this.educationList;
      } else if (this.$route.name == "communityList") {
        this.headers = this.communityHeaders;
        this.list = this.communityList;
      } else if (this.$route.name == "archivesList") {
        this.headers = this.communityHeaders;
        this.list = this.archivesList;
      }
    },
    handleClick(value) {
      this.toDetail(value.id);
    }
  }
};
</script>
<style scoped></style>
<style lang="scss">
.datatable-frame {
  padding: 0;
  border-bottom: black solid 1px;

  .search-bar-frame {
    padding-right: 0px;
    border-bottom: black solid 1px;

    .counter-text {
      margin-bottom: -50px;
      margin-left: -15px;
      font-size: 14px;
      font-weight: bold;

      b {
        color: #dc2929;
      }
    }
    .request-btn {
      margin-top: 10px;
      margin-left: 15px;
      width: 100px;
      height: 40px;
      color: white;
      padding: 10px;
      font-size: 14px;
      background-color: #213e86;
    }
    .search-bar-datatable {
      margin-top: 10px;
      height: 40px;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 3px 1px -2px rgb(0 0 0 / 20%);

      .v-label {
        font-size: 14px;
      }
      .v-input__append-inner {
        margin-right: -12px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
        background-color: #999999;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
          0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 20%);

        .v-icon {
          color: white !important;
        }
      }
    }
  }
}

.row-pointer > .v-data-table__wrapper > table > tbody > tr :hover {
  cursor: pointer;
}

// .table-cell-style {
//   // width: 7%;
//   /* width 1280px 까지 이상없음 -> 이후 화면 조정시에 수치 조절 */
// }
// .table-cell-style2 {
//   // width: 9%;
//   /* width 1280px 까지 이상없음 -> 이후 화면 조정시에 수치 조절 */
// }
/* .table-cell-style3 {
  width: 9%;
} */
.table-title-font {
  color: black !important;
  font-size: 16px !important;
  font-weight: bold !important;
}
.popup-education {
  padding-right: 15px;
  padding-left: 15px;
  color: black !important;

  .popup-education-title {
    font-size: 24px;
    border-radius: 0px !important;
    font-weight: bold;
    border-bottom: 2px solid black;

    .popup-education-close {
      position: absolute;
      right: 15px;
    }
  }
  .popup-education-actions {
    position: absolute;
    bottom: -8px;
    left: -8px;

    .action-cancel-btn {
      font-size: 16px;
      font-weight: bold;
      margin: 0px !important;
    }
    .action-apply-btn {
      font-size: 16px;
      font-weight: bold;
      margin: 0px !important;
    }
  }
  .popup-education-contents {
    margin: 0px;
    padding: 0px;
    color: black !important;

    .contents-text-field {
      .v-input--is-focused {
        border: 1px solid red !important;
      }
      .v-input__slot {
        background-color: white !important;
        border-radius: 0px;
        border: 1px solid #d4d4d4;
        color: #d4d4d4 !important;

        input {
          color: black !important;
        }
      }
    }
    .contents-label {
      margin-top: -10px;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 16px;

      .label-icon {
        margin-top: -12px !important;
        color: #db3030 !important;
      }
    }
    .contents-textarea {
      border-radius: 0px;
      border: 1px solid #d4d4d4;
      .v-input__slot {
        background-color: white;

        textarea {
          color: black !important;
        }
      }
    }
    .contents-radio {
      margin-top: -5px;
      margin-bottom: 5px;

      .v-radio {
        margin-right: 15px;
      }
      .v-input__control {
        color: black !important;

        .v-input__slot {
          color: #d4d4d4 !important;

          .v-icon {
            color: #d4d4d4;
            caret-color: rgb(33, 62, 134);
          }
          .v-label {
            margin-left: -8px;
            color: #707070 !important;
          }
        }
      }
    }
  }
}
.edit-buttons {
  position: relative;
  z-index: 5;
}
.truncate {
  max-width: 390px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* .v-btn{
  border-radius: 0px !important;
} */
</style>
