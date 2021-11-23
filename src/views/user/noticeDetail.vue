<template>
  <v-layout
    class="d-flex justify-center"
    style="margin-top: -150px; margin-bottom:100px;"
  >
    <v-container
      
      class="community-frame rounded-xl pt-16 pb-14 pl-16 pr-10 elevation-20"
    >
      <v-row>
        <span class="community-view-title">커뮤니티</span>
      </v-row>

      <v-col cols="12" class="community-view-contents">
        <v-row class="view-contents-title">
        <v-col>{{this.board.title}}</v-col>
          <v-col
            cols="2"
            class="d-flex align-end flex-column contents-title-sub"
          >
            <div>
              {{ this.board.writer }} |
              {{ $moment(this.board.updatedate).format("YYYY-MM-DD") }}
            </div>
            <div>
             조회수 {{ this.board.viewcnt }}
            </div>
          </v-col>
        </v-row>

        <v-row class="view-contents-content">
         <v-textarea v-model="board.content"></v-textarea>
        </v-row>


    
      </v-col>

      <v-row class="community-bottom">
        <v-spacer></v-spacer>
        <div @click="gotolist">
          <Button
            style="margin-right:10px;"
            class="btn-border btn-content-color"
            color="#999999"
            contents="목록"
            height="48"
            width="160"
          />
        </div>
        <div
          v-if="this.$store.state.userId == this.board.createdById"
          @click="gotosave"
        >
          <Button
            class="btn-border btn-content-color"
            color="#213E86"
            contents="수정"
            height="48"
            width="160"
          />
        </div>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import Button from "@/components/Button.vue";
import Reply from "@/components/Reply.vue";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/vue-editor";
import communityApi from "@/api/community.js";

export default {
  name: "Home",
  components: { Button, Reply, viewer: Viewer },
  data() {
    return {
      isLoading: 1,
      viewerText: null,
      disable: true,
      replyIndex: 0,
      replyeditable: false,
      isHidden: true,
      replytext: "",
      liked: false,
      replylist: [],
      board: {},
      obj: {
        name: "홍길동",
        phone: "010-1234-1234",
        email: "email@email.com",
        category: "상관없음",
        contents:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero obcaecati placeat nam amet odit at temporibus et. Culpa facilis maiores ea eligendi. Possimus sapiente, quasi libero ex fuga adipisci ut.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero obcaecati placeat nam amet odit at temporibus et. Culpa facilis maiores ea eligendi. Possimus sapiente, quasi libero ex fuga adipisci ut."
      },
      radio: ["노출", "비노출"],
      radioGroup: 1
    };
  },
  methods: {
    
   
    gotolist() {
      this.$router.push("/notice");
    },
    gotosave() {
      this.$router.push({ name: "communityEdit", params: this.board });
    },
    initialize() {
      let cid = this.$route.params.id;

      communityApi
        .selectCommunity(cid)
        .then(res => {
          this.board = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  created() {
    this.initialize();
  },
  mounted() {}
};
</script>

<style lang="scss">
.community-frame {
  background-color: white;
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 1200px;

  .community-view-title {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -2px;
  }
  .community-view-contents {
    margin-left: -12px;
    border-top: 2px solid black;
    border-bottom: 1px solid #999999;

    .view-contents-title {
      padding-bottom: 5px;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 30px;

      .contents-title-main {
        font-weight: bold;
        font-size: 18px;
      }
      .contents-title-sub {
        font-size: 12px;
      }
    }
    .view-contents-content {
      padding-left: 12px;
      padding-right: 12px;
      padding-bottom: 25px;
      width: 100%;
      border-bottom: 1px solid black;
      margin-bottom: 15px;
    }
    .view-contents-replyinput {
      padding: 0px;
      padding-top: 25px;
      padding-bottom: 5px;

      .replyinput-label {
        font-size: 14px;
        font-weight: bold;

        b {
          color: #dc2828;
        }
        .reply-label {
          font-weight: normal;
          color: #9b9b9b;
        }
      }
      .replyinput-textarea {
        margin-top: 18px;
      }
      .replyinput-btns {
        margin-top: -25px !important;
        padding-bottom: 25px;
        border-bottom: 1px solid #f0f0f0;

        .v-btn__content {
          color: white;
        }
        .replyinput-btns-1 {
          border-radius: 4px !important;
        }
        .replyinput-btns-2 {
          border-radius: 4px !important;
        }
      }
    }
    .view-contents-replyinput2 {
      .replyinput-btns-4 {
        font-weight: bold;
      }
      .replyinput-btns-4 {
        font-weight: bold;
        color: #213e86;
      }
    }
  }
  .community-bottom {
    margin-right: 10px;
    margin-top: 30px;

    .btn-cancel {
      color: #7e7e7e !important;
    }
    .btn-content-color {
      color: white !important;
    }
    .btn-border {
      border-radius: 4px !important;
    }
    .v-btn__content {
      font-size: 16px;
    }
  }
}
</style>
