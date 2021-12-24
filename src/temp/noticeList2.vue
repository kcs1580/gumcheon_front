<template>
  
    <v-container
     
      
    >
    <v-row>
      <v-col>
        <v-data-table
    :headers="headers"
    :items="boardList"
    :items-per-page="5"
    class="elevation-1"       @click:row="handleClick"

  >
  
  
  </v-data-table>
      </v-col>
    </v-row>
      
    </v-container>

</template>

<script>


export default {
  name: "Home",
  data: () => ({
   
    headers: [
      {
        text: "글번호",
        align: "left",
        value: "idx"
      },
      { text: "제목", value: "title" },
    
          { text: "작성자", value: "writer" },

      { text: "수정일", value: "updatedate" },
        { text: "조회수", value: "viewcnt" }
      // { text: "Actions", value: "actions", sortable: false }
    ],
    boardList: [],
  }),
  methods: {
     listBoard() {      

        communityApi
          .listCommunity()
          .then(({ data }) => {
this.boardList = data;          })
          .catch(res => {
            console.log(res);
          });
      }
    ,


    communityDetail(idx) {
      this.$router.push("/notice/" + idx);
    },
    handleClick(value) {
      this.communityDetail(value.idx);
    }
  },
  created() {
this.listBoard();  },
  mounted() {},
  
};
</script>

<style lang="scss">
.search-bar-frame {
  padding-right: 0px;
  border-bottom: black solid 1px;
  margin-bottom: 20px;

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
    margin-left: 5px;
    margin-right: 5px;
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
.edu-frame {
  background-color: white;
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 1200px;

  .edu-title {
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -2px;
  }
  .edu-title-sub {
    margin-right: 25px;
    margin-top: 10px;
  }
  .edu-tabs {
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100%;

    .v-tab {
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 0px;
      border: 2px solid gray;
    }
    .v-tab--active {
      color: #213e86;
      border: 2px solid;
    }
    .v-tab-slider-wrapper {
      display: none;
    }
  }
  .edu-datatable {
    margin-right: 15px;
  }
  .edu-pagenation {
    margin-top: 30px;
  }
}
.tab-class {
  border-left: 1px solid #213e86 !important;
}
.tab-class2 {
  border-right: 1px solid #213e86 !important;
}
.v-text-field.v-text-field--solo .v-input__control {
  min-height: 10px;
}

.combobox {
  width: 5px;
}
</style>
