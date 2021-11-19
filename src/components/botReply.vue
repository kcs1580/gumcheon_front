<template>
  <!-- 봇 지원 댓글 컴포넌트 -->
  <div>
    <v-row
      class="siri-layout-reply"
      v-for="(reply, i) in replyList.list"
      :key="i"
    >
      <div class="avatar">
        <img src="@/assets/img/avatar.png" />
      </div>
      <v-col>
        <!-- 댓글 수정 -->
        <div
          v-if="replyIndex == `${i}` && nestedReplyIndex == -1 && replyEditable"
          class="reply-innerbox"
          style="padding-left:0px"
        >
          <div class="title">
            <div class="title-left">
              {{ $store.state.userNm }}
            </div>
          </div>
          <v-row no-gutters>
            <v-textarea
              style="border:1px solid black; border-radius:7px; margin-bottom:10px "
              full-width
              no-resize
              solo
              rows="3"
              hide-details=""
              v-model="tempText"
            ></v-textarea>
          </v-row>
          <v-row no-gutters class="justify-end">
            <div @click="(replyEditable = !replyEditable), (tempText = '')">
              <Button
                style="margin-left:10px;"
                class="btn-border btn-content-color"
                color="#999999"
                contents="취소"
                height="36"
                width="100"
              />
            </div>
            <div @click="updateReply(reply)">
              <Button
                style="margin-left:10px;"
                class="btn-border btn-content-color"
                color="#444444"
                contents="등록"
                height="36"
                width="100"
              />
            </div>
          </v-row>
        </div>
        <!-- 일반 댓글 목록  -->
        <div v-else style="padding-bottom:12px;padding-right:12px">
          <div class="title">
            <div class="title-left">
              {{ reply.userNm }}
            </div>
            <div class="title-right">
              <v-row no-gutters align="center">
                <v-btn
                  text
                  x-small
                  v-if="!reply.likedReply"
                  @click="like(reply.replyId, true)"
                >
                  <img src="@/assets/img/useful.png" />

                  <span style="margin-right:15px;"
                    >유용해요 {{ reply.likeCnt }}</span
                  ></v-btn
                >
                <v-btn x-small text v-else @click="like(reply.replyId, false)">
                  <img src="@/assets/img/useful.png" />
                  <span style="margin-right:15px;"
                    >유용해요 {{ reply.likeCnt }}</span
                  ></v-btn
                >
                <v-btn text x-small>
                  <img v-if="true" src="@/assets/img/reply_new.png" />
                  <img v-else src="@/assets/img/reply.png" />
                  <span>전체댓글 {{ reply.nestedReplyCnt }}</span>
                </v-btn>
                <!-- 댓글 수정/노출 버튼 -->
                <span
                  class="title-right"
                  v-if="$store.getters.getuserID == reply.userId"
                >
                  <v-menu offset-y left allow-overflow>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on"
                        >mdi-dots-vertical</v-icon
                      >
                    </template>

                    <div class="d-inline-flex align-center">
                      <v-btn
                        v-if="reply.visibleYn"
                        text
                        small
                        @click="
                          (replyIndex = i),
                            (nestedReplyIndex = -1),
                            (replyEditable = true),
                            (tempText = reply.replyContent)
                        "
                        ><v-icon>mdi-pencil-outline</v-icon>수정</v-btn
                      >
                      <span v-if="reply.visibleYn">|</span>

                      <v-btn
                        text
                        v-if="reply.visibleYn"
                        small
                        @click="hideReply(reply.replyId)"
                        ><v-icon>mdi-lock-outline</v-icon>잠금</v-btn
                      >
                      <v-btn text v-else small @click="showReply(reply.replyId)"
                        ><v-icon>mdi-lock-open-variant-outline</v-icon
                        >잠금해제</v-btn
                      >
                    </div>
                  </v-menu>
                </span>
              </v-row>
            </div>
          </div>
          <!-- 비노출 댓글일 시  -->
          <div v-if="!reply.visibleYn" class="reply">
            <span class="reply-secret">사용자가 비노출한 댓글입니다.</span>
          </div>
          <!-- 비노출이 아닐경우 댓글 출력 -->
          <v-textarea
            rows="3"
            v-else
            class="contents"
            v-model="reply.replyContent"
            readonly
            no-resize
            hide-details
            solo
            flat
          ></v-textarea>
          <!-- <viewer v-else :initialValue="reply.replyContent" /> -->

          <!-- <v-btn @click="deleteReply(reply.replyId)">삭제</v-btn>
          <v-btn
            @click="
              (replyIndex = i),
                (replyEditable = !replyEditable),
                (tempText = reply.replyContent)
            "
            >수정</v-btn
          > -->
          <!-- 댓글 footer -->
          <div class="footer">
            <div>
              {{ $moment(reply.createdDate).format("YYYY-MM-DD hh:mm") }} |
            </div>

            <a
              @click="(nestedReplyIndex = i), (nestedReplyWritable = true)"
              class="reply-btn"
              >댓글 작성</a
            >
          </div>
        </div>

        <!-- 대댓글 목록 -->
        <div style="margin-top:12px">
          <div
            v-for="(nestedReply, j) in reply.nestedReply"
            :key="1000 + j"
            class="reply"
          >
            <div class="avatar">
              <img src="@/assets/img/avatar.png" />
            </div>
            <div class="reply-innerbox">
              <div class="title">
                <div class="title-left">
                  {{ nestedReply.userNm }}
                </div>
                <div
                  class="title-right"
                  v-if="$store.getters.getuserID == nestedReply.userId"
                >
                  <v-menu offset-y left allow-overflow>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on"
                        >mdi-dots-vertical</v-icon
                      >
                    </template>

                    <!-- <v-list-item v-for="(item, index) in items" :key="index">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item> -->

                    <div class="d-inline-flex align-center">
                      <v-btn
                        v-if="nestedReply.visibleYn"
                        text
                        small
                        @click="
                          (replyIndex = i),
                            (nestedReplyIndex = j),
                            (nestedReplyEditable = true),
                            (nestedTempText = nestedReply.replyContent)
                        "
                        ><v-icon>mdi-pencil-outline</v-icon>수정</v-btn
                      ><span v-if="nestedReply.visibleYn">|</span>
                      <v-btn
                        text
                        v-if="nestedReply.visibleYn"
                        small
                        @click="hideReply(nestedReply.replyId)"
                        ><v-icon>mdi-lock-outline</v-icon>잠금</v-btn
                      >
                      <v-btn
                        text
                        v-else
                        small
                        @click="showReply(nestedReply.replyId)"
                        ><v-icon>mdi-lock-open-variant-outline</v-icon
                        >잠금해제</v-btn
                      >
                    </div>
                  </v-menu>
                </div>
              </div>
              <!-- 대댓글 수정 -->
              <div
                v-if="
                  replyIndex == `${i}` &&
                    nestedReplyIndex == `${j}` &&
                    nestedReplyEditable
                "
                class="reply-innerbox"
                style="padding-left:0px"
              >
                <v-row no-gutters>
                  <v-textarea
                    style="border:1px solid black; border-radius:7px; margin-bottom:10px "
                    full-width
                    no-resize
                    solo
                    rows="3"
                    hide-details=""
                    v-model="nestedTempText"
                  ></v-textarea>
                </v-row>
                <v-row no-gutters class="justify-end">
                  <div
                    @click="
                      (nestedReplyEditable = !nestedReplyEditable),
                        (nestedTempText = '')
                    "
                  >
                    <Button
                      style="margin-left:10px;"
                      class="btn-border btn-content-color"
                      color="#999999"
                      contents="취소"
                      height="36"
                      width="100"
                    />
                  </div>
                  <div @click="updateReply(reply)">
                    <Button
                      style="margin-left:10px;"
                      class="btn-border btn-content-color"
                      color="#213E86"
                      contents="등록"
                      height="36"
                      width="100"
                    />
                  </div>
                </v-row>
              </div>
              <!-- 대 댓글 비노출/ 노출 -->
              <div v-else>
                <div v-if="!nestedReply.visibleYn" class="reply">
                  <span class="reply-secret"
                    >사용자가 비노출한 댓글입니다.</span
                  >
                </div>
                <!-- <div
                  v-else
                  class="contents"
                  v-html="nestedReply.replyContent"
                /> -->
                <v-textarea
                  v-else
                  class="contents"
                  v-model="nestedReply.replyContent"
                  readonly
                  no-resize
                  hide-details
                  solo
                  rows="3"
                  flat
                  background-color="#F9F9FA"
                ></v-textarea>
                <!-- <v-btn @click="deleteReply(nestedReply.replyId)">삭제</v-btn>
                <v-btn
                  @click="
                    (replyIndex = j),
                      (nestedReplyEditable = !nestedReplyEditable),
                      (tempText = nestedReply.replyContent)
                  "
                  >수정</v-btn
                > -->
                <div class="footer">
                  <div>
                    {{
                      $moment(nestedReply.createdDate).format(
                        "YYYY-MM-DD hh:mm"
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 대댓글 작성 -->
        <div
          class="contents"
          v-if="nestedReplyIndex == `${i}` && nestedReplyWritable"
        >
          <div>
            <div class="reply">
              <div class="avatar">
                <img src="@/assets/img/avatar.png" />
              </div>
              <div class="reply-innerbox">
                <div class="title">
                  <div class="title-left">
                    {{ $store.state.userNm }}
                  </div>
                </div>
                <!-- <div class="contents" v-html="reply.contents" /> -->
                <v-row no-gutters>
                  <v-textarea
                    style="border:1px solid black; border-radius:7px; margin-bottom:10px "
                    full-width
                    no-resize
                    solo
                    rows="3"
                    hide-details=""
                    v-model="nestedReplyContent"
                  ></v-textarea>
                </v-row>
                <v-row no-gutters class="justify-end">
                  <div
                    @click="
                      (nestedReplyWritable = !nestedReplyWritable),
                        (nestedReplyContent = '')
                    "
                  >
                    <Button
                      style="margin-left:10px;"
                      class="btn-border btn-content-color"
                      color="#999999"
                      contents="취소"
                      height="36"
                      width="100"
                    />
                  </div>
                  <div @click="registNestedReply(reply.replyId)">
                    <Button
                      style="margin-left:10px;"
                      class="btn-border btn-content-color"
                      color="#213E86"
                      contents="등록"
                      height="36"
                      width="100"
                    />
                  </div>
                </v-row>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import botApi from "@/api/bot.js";
import { Viewer } from "@toast-ui/vue-editor";

export default {
  components: { Button, viewer: Viewer },

  data() {
    return {
      //댓글 인덱스
      replyIndex: 0,
      //댓글 수정 플래그
      replyEditable: false,
      //대댓글 인덱스
      nestedReplyIndex: 0,
      //대댓글 수정 플래그
      nestedReplyEditable: false,
      //대댓글 작성 플래그
      nestedReplyWritable: false,
      //댓글 내용
      replytext: "",
      //댓글 수정 임시 변수
      tempText: "",
      //대댓글 수정 임시 변수
      nestedTempText: "",
      //대댓글 내용
      nestedReplyContent: "",
      //현재시간
      nowDate: 0,
      //대댓글 접기 사용 변수
      replyIndexList: []
    };
  },
  props: {
    //댓글 리스트
    replyData: Object,
    //해당 봇 ID
    botId: String,
    //댓글 노출 개수
    supportCount: Number,
    //댓글 정렬 기준
    supportSort: String,
    //댓글 검색어
    supportKeyword: String
  },
  created() {
    this.nowDate = Math.floor(+new Date() / 1000);
  },
  methods: {
    showAllReply(index) {},
    hideAllReply(index) {
      this.replyIndexList;
    },
    containNewReply(reply) {},
    // handleNewLine(str) {
    //   return String(str).replace(/(?:\r\n|\r|\n)/g, "</br>");
    // },

    //댓글 1주일 이내 작성 여부 확인
    checkNew(createdDate) {
      if (this.nowDate - createdDate <= 604800) {
        return true;
      } else return false;
    },
    //임시 변수에 댓글 내용 로드
    loadText(replyText) {
      this.tempText = replyText;
    },
    //대댓글 등록
    registNestedReply(replyId) {
      botApi
        .writeSupport(this.botId, {
          replyId: replyId,
          replyContent: this.nestedReplyContent
        })
        .then(res => {
          this.listReply();
          this.nestedReplyContent = "";
        })
        .catch();
    },
    //댓글 수정
    updateReply(reply) {
      reply.replyContent = this.tempText;
      if (this.tempText == "") {
        alert("내용을 입력해주세요.");
      } else {
        this.replyEditable = false;
        botApi
          .updateSupport(reply.replyId, {
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
      botApi
        .deleteSupport(replyId)
        .then(() => {
          this.listReply();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //댓글 비노출
    hideReply(replyId) {
      botApi
        .visibleSupport(replyId, {
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
      botApi
        .visibleSupport(replyId, {
          visibleYn: true
        })
        .then(() => {
          this.listReply();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //댓글 유용해요
    like(replyId, likeYn) {
      botApi
        .likeSupport(replyId, likeYn)
        .then(() => {
          this.listReply();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //댓글 목록 가져오기

    listReply() {
      botApi
        .listSupport(this.botId, {
          itemCnt: 20 * this.supportCount,
          startId: 0,
          orderBy: this.supportSort,
          searchValue: this.supportKeyword
        })
        .then(res => {
          this.replyList = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  computed: {
    //부모 컴포넌트와 댓글 목록 동기화
    replyList: {
      get() {
        return this.replyData;
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
    width: 100%;
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
  .reply-innerbox {
    width: 100%;
    padding-left: 12px;
  }
}
</style>
