<template>
  <!-- 자료실 댓글 컴포넌트 -->
  <v-layout>
    <v-col>
      <v-row
        class="siri-layout-reply"
        v-for="(item, i) in replylist"
        :key="i"
        :class="`${i}`"
      >
        <div class="avatar">
          <img src="@/assets/img/avatar.png" />
        </div>
        <v-col>
          <div class="title">
            <div class="title-left">
              {{ item.userNm }}
            </div>
            <div class="title-right">
              <!-- 로그인한 사용자가 댓글 작성자인 경우 수정 버튼 노출 -->
              <div v-if="item.userId == $store.state.userId">
                <v-icon
                  @click="
                    (replyIndex = i),
                      (replyeditable = true),
                      (tempText = item.replyContent)
                  "
                >
                  mdi-file-document-edit-outline
                </v-icon>
                <v-icon v-if="item.visibleYn" @click="hideReply(item.replyId)">
                  mdi-eye-off-outline </v-icon
                ><v-icon v-else @click="showReply(item.replyId)">
                  mdi-eye-outline
                </v-icon>
                <v-icon @click="deleteReply(item.replyId)">
                  mdi-window-close
                </v-icon>
              </div>
            </div>
          </div>
          <div class="footer">
            {{ $moment(item.createdDate).format("YYYY-MM-DD hh:mm:ss") }}
          </div>
          <!-- 댓글 수정 화면 -->
          <div class="contents" v-if="replyIndex == `${i}` && replyeditable">
            <div>
              <v-textarea
                full-width
                class="rounded-0 archives-write-textarea"
                outlined
                no-resize
                v-model="tempText"
              ></v-textarea>

              <v-row class="d-flex justify-end" style="margin-top:-70px;">
                <div @click="replyeditable = !replyeditable">
                  <Button
                    class="replyinput-btns-3"
                    contents="취소"
                    :plain="true"
                    height="36"
                    width="80"
                  />
                </div>
                <div @click="updateReply(item, board.id)">
                  <Button
                    style="margin-right:15px;"
                    class="replyinput-btns-4"
                    :plain="true"
                    contents="등록"
                    height="30"
                    width="80"
                  />
                </div>
              </v-row>
            </div>
          </div>

          <!-- <div v-else class="contents" v-html="item.replyContent"></div> -->
          <!-- 댓글이 수정 상태가 아닐경우 댓글 리스트 출력 -->
          <div v-else>
            <!-- 댓글이 비노출 상태이고 게시글, 댓글의 작성자가 아닌 경우 댓글 숨김 -->
            <div
              v-if="
                $store.getters.getuserID != board.createdById &&
                  $store.getters.getuserID != item.userId &&
                  item.visibleYn == false
              "
              class="reply"
            >
              <span class="reply-secret">사용자가 비노출한 댓글입니다.</span>
            </div>
            <v-textarea
              rows="3"
              v-else
              class="contents"
              v-model="item.replyContent"
              readonly
              no-resize
              hide-details
              solo
              flat
            ></v-textarea>
          </div>
          <!--                     
          <div v-for="(reply, j) in item.re" :key="1000 + j">
            <div v-if="!reply.secret" class="reply">
              <div class="avatar">
                <img src="@/assets/img/avatar.png" />
              </div>
              <div>
                <div class="title">
                  <div class="title-left">
                    {{ reply.title }}
                  </div>
                </div>
                <div class="contents" v-html="item.contents" />
                <div class="footer">
                  <div>{{ item.date }} |</div>
                  <div class="reply-btn">
                    댓글 작성
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="reply.secret" class="reply">
              <span class="reply-secret">사용자가 비노출한 댓글입니다.</span>
            </div>
          </div> -->
        </v-col>
      </v-row>
    </v-col>
  </v-layout>
</template>

<script>
import Button from "@/components/Button.vue";
import { Viewer } from "@toast-ui/vue-editor";
import archivesApi from "@/api/archives.js";

export default {
  components: { Button, viewer: Viewer },

  data() {
    return {
      //댓글 인덱스 변수
      replyIndex: 0,
      //댓글 수정 활성화 플래그
      replyeditable: false,
      isHidden: true,
      //댓글 내용 변수
      replytext: "",
      //댓글 수정 시 임시 변수
      tempText: ""
    };
  },
  props: {
    reply: Array,
    board: Object
  },
  methods: {
    //댓글 수정
    updateReply(reply) {
      reply.replyContent = this.tempText;

      if (this.tempText == "") {
        alert("내용을 입력해주세요.");
      } else {
        this.replyeditable = false;

        archivesApi
          .updateReply(reply.replyId, {
            replyContent: reply.replyContent
          })
          .then(() => {
            this.listReply();
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    //댓글 삭제
    deleteReply(replyId) {
      archivesApi
        .deleteReply(replyId)
        .then(() => {
          this.listReply();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //댓글 숨김
    hideReply(replyId) {
      archivesApi
        .visibleReply(replyId, {
          visibleYn: false
        })
        .then(() => {
          this.listReply();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //댓글 노출
    showReply(replyId) {
      archivesApi
        .visibleReply(replyId, {
          visibleYn: true
        })
        .then(() => {
          this.listReply();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //댓글 불러오기
    listReply() {
      archivesApi
        .listReply(this.board.id, {
          orderBy: "RECENT"
        })
        .then(res => {
          this.replylist = res.data.list;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  //댓글 리스트 부모 컴포넌트와 동기화
  computed: {
    replylist: {
      get() {
        return this.reply;
      },
      set(newValue) {
        this.$emit("updateReply", newValue);
      }
    }
  }
};
</script>

<style lang="scss">
.siri-layout-reply {
  display: flex;
  flex-direction: row;

  .reply {
    margin-top: 5px;
    background-color: #f9f9fa;
    padding: 15px;
    display: flex;
    flex-direction: row;

    .reply-secret {
      font-size: 12px;
    }
  }
  .avatar {
    margin-top: 20px;
    padding-right: 5px;
    font-size: 14px;
  }
  .title {
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .title-left {
      font-weight: bold;
      font-size: 18px;
    }
    .title-right {
      font-weight: normal;
      font-size: 12px;
    }
  }
  .contents {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .footer {
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    color: #a9a9a9;

    .reply-btn {
      margin-left: 5px;
      color: #213e86;
      font-weight: bold;
    }
  }
}
</style>
