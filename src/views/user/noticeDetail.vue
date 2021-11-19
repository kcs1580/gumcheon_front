<template>
  <v-layout
    class="d-flex justify-center"
    style="margin-top: -150px; margin-bottom:100px;"
  >
    <v-container
      v-if="isLoading == 0"
      class="community-frame rounded-xl pt-16 pb-14 pl-16 pr-10 elevation-20"
    >
      <v-row>
        <span class="community-view-title">커뮤니티</span>
      </v-row>

      <v-col cols="12" class="community-view-contents">
        <v-row class="view-contents-title">
          <v-col>
            <div class="contents-title-main" style="margin-top:8px;">
              {{ this.board.title }}

              <!-- 좋아요 아이콘 -->
              <span class="ml-3">
                <v-chip
                  text-color="#0000000"
                  outlined
                  v-if="!liked"
                  @click="like(`Y`)"
                  ><v-icon small color="red">mdi-heart-outline</v-icon
                  >{{ board.likeCnt }}</v-chip
                ><v-chip outlined v-else @click="like(`N`)"
                  ><v-icon small color="red">mdi-heart</v-icon
                  >{{ board.likeCnt }}</v-chip
                >
              </span>
            </div>
          </v-col>
          <v-col
            cols="2"
            class="d-flex align-end flex-column contents-title-sub"
          >
            <div>
              {{ this.board.createdByNm }} |
              {{ $moment(this.board.createdDate).format("YYYY-MM-DD") }}
            </div>
            <div>
              좋아요 {{ this.board.likeCnt }} | 조회수 {{ this.board.visitCnt }}
            </div>
          </v-col>
        </v-row>

        <v-row class="view-contents-content">
          <viewer :initialValue="viewerText" />
        </v-row>

        <v-col class="view-contents-replyinput">
          <v-row class="replyinput-label" align="center">
            댓글<b style="margin-left:3px; margin-right:3px;">
              {{ this.replylist.length }}</b
            >건<span
              v-if="!$store.getters.getToken"
              class="reply-label"
              style="margin-left:5px;"
              >| 로그인을 하시면 댓글을 등록할 수 있습니다.</span
            >
            <v-spacer></v-spacer>
          </v-row>
          <span v-if="$store.getters.getToken">
            <v-row>
              <v-textarea
                full-width
                class="replyinput-textarea"
                outlined
                no-resize
                v-model="replytext"
              ></v-textarea>
            </v-row>
            <v-row class="d-flex justify-end replyinput-btns">
              <div @click="(replytext = ``), (isHidden = true)">
                <Button
                  style="margin-right:10px;"
                  class="replyinput-btns-1"
                  color="#B6B6B6"
                  contents="취소"
                  height="36"
                  width="100"
                />
              </div>
              <div @click="registerReply(replytext)">
                <Button
                  class="replyinput-btns-2"
                  color="#444444"
                  contents="등록"
                  height="36"
                  width="100"
                />
              </div>
            </v-row>
          </span>
        </v-col>

        <v-col class="view-contents-replyinput2" style="margin-bottom:30px;">
          <Reply
            :reply="replylist"
            @updateReply="updateParentReply"
            :board="board"
          />
        </v-col>
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
    registerReply(content) {
      if (this.replytext == "") {
        alert("내용을 입력해주세요.");
      } else {
        communityApi
          .writeReply(this.board.id, { replyContent: content })
          .then(() => {
            this.replytext = "";
          })
          .catch(res => {
            console.log(res);
          })
          .finally(() => {
            this.listReply();
          });
      }
    },
    updateParentReply(reply) {
      this.replylist = reply;
    },
    listReply() {
      communityApi
        .listReply(this.board.id, {
          orderBy: "RECENT"
        })
        .then(res => {
          this.replylist = res.data.list;
        })
        .catch(res => {
          console.log(res);
        });
    },
    like(likeYn) {
      communityApi
        .likeCommunity(this.board.id, likeYn)
        .then(() => {
          this.initialize();
        })
        .catch(res => {
          console.log(res.body.error);
        });
    },
    gotolist() {
      this.$router.push("/community");
    },
    gotosave() {
      this.$router.push({ name: "communityEdit", params: this.board });
    },
    initialize() {
      let cid = this.$route.params.id;

      communityApi
        .selectCommunity(cid)
        .then(res => {
          this.board = res.data.board;
          this.liked = res.data.liked;
          this.listReply();
          this.viewerText = this.board.content;
          this.isLoading = 0;
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
