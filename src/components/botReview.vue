<template>
  <!-- 봇 리뷰 댓글 컴포넌트 -->
  <div>
    <v-row
      class="siri-layout-reply"
      v-for="(review, i) in reviewList.list"
      :key="i"
    >
      <div class="avatar">
        <img src="@/assets/img/avatar.png" />
      </div>
      <v-col>
        <!-- 리뷰     -->
        <div style="padding-bottom:12px">
          <div class="title">
            <div class="title-left">
              <v-row no-gutters justify="center">
                {{ review.userNm }}
                <!-- 리뷰 별점 수정 -->
                <v-rating
                  v-if="replyIndex == `${i}` && replyEditable"
                  v-model="tempRating"
                  background-color="#CCCCCC"
                  color="#EC705B"
                  style="margin-left:15px"
                ></v-rating>
                <!-- 리뷰 별점 보기 -->
                <v-rating
                  v-else
                  readonly
                  v-model="review.ratingScore"
                  background-color="#CCCCCC"
                  color="#EC705B"
                  style="margin-left:15px"
                ></v-rating
              ></v-row>
            </div>
            <div class="title-right">
              <span style="margin-right:5px;"
                ><v-chip
                  v-if="checkNew(review.createdDate)"
                  small
                  text-color="white"
                  color="#EC705B"
                  >NEW</v-chip
                ></span
              >
              <!-- <span>
                <v-chip
                  small
                  text-color="#0000000"
                  outlined
                  v-if="!liked"
                  @click="like(`Y`)"
                  ><v-icon small color="red">mdi-heart-outline</v-icon
                  >100</v-chip
                ></span
              > -->

              <span class="ml-3">
                <v-chip
                  text-color="#0000000"
                  outlined
                  v-if="!review.likedBotRating"
                  @click="like(review.id, true)"
                  ><v-icon small color="red">mdi-heart-outline</v-icon
                  >{{ review.likeCnt }}</v-chip
                ><v-chip outlined v-else @click="like(review.id, false)"
                  ><v-icon small color="red">mdi-heart</v-icon
                  >{{ review.likeCnt }}</v-chip
                >
              </span>
              <span v-if="$store.getters.getuserID == review.userId">
                <v-menu offset-y left allow-overflow>
                  <template
                    v-slot:activator="{ on, attrs }"
                    style="margin-top:10px"
                  >
                    <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
                  </template>

                  <!-- <v-list-item v-for="(item, index) in items" :key="index">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item> -->

                  <div
                    class="d-inline-flex align-center"
                    style="background:white"
                  >
                    <v-btn
                      v-if="review.visibleYn"
                      text
                      small
                      @click="
                        (replyIndex = i),
                          (replyEditable = !replyEditable),
                          (tempText = review.review),
                          (tempRating = review.ratingScore),
                          showReview(review.id)
                      "
                      ><v-icon>mdi-pencil-outline</v-icon>수정</v-btn
                    >
                    <span v-if="review.visibleYn">|</span>
                    <v-btn
                      text
                      v-if="review.visibleYn"
                      small
                      @click="hideReview(review.id)"
                      ><v-icon>mdi-lock-outline</v-icon>잠금</v-btn
                    >
                    <v-btn text v-else small @click="showReview(review.id)"
                      ><v-icon>mdi-lock-open-variant-outline</v-icon
                      >잠금해제</v-btn
                    >
                  </div>
                </v-menu>
              </span>
            </div>
          </div>
          <!-- 리뷰 수정 -->
          <div v-if="replyIndex == `${i}` && replyEditable">
            <v-row no-gutters>
              <v-textarea
                style="border:1px solid black; border-radius:7px; margin-bottom:10px "
                full-width
                no-resize
                solo
                hide-details=""
                v-model="tempText"
              ></v-textarea>
            </v-row>
            <v-row no-gutters class="justify-end">
              <div
                @click="
                  (replyEditable = !replyEditable),
                    (tempText = ''),
                    (tempRating = 0)
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
              <div @click="updateReview(review)">
                <Button
                  style="margin-left:10px;"
                  class="btn-border btn-content-color"
                  color="#213E86"
                  contents="수정"
                  height="36"
                  width="100"
                />
              </div>
            </v-row>
          </div>
          <!-- 리뷰목록 -->
          <div v-else>
            <div v-if="!review.visibleYn" class="reply">
              <span class="reply-secret">사용자가 비노출한 댓글입니다.</span>
            </div>
            <!--             <div v-else class="contents" v-html="review.review" />
 -->
            <v-textarea
              rows="3"
              v-else
              class="contents"
              v-model="review.review"
              readonly
              no-resize
              hide-details
              solo
              flat
            ></v-textarea>
            <div class="footer">
              <div>
                {{ $moment(review.createdDate).format("YYYY-MM-DD hh:mm") }}
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- <v-row class="more-info" justify="center">
      <v-chip
        style="background-color:#f9f9fa ;width:120px; height:36px; justify-content:center"
        >MORE+</v-chip
      ></v-row
    > -->
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import botApi from "@/api/bot.js";
export default {
  components: { Button },

  data() {
    return {
      //리뷰 인덱스
      replyIndex: 0,
      //리뷰 수정 플래그
      replyEditable: false,
      //리뷰 내용 임시 변수
      tempText: "",
      //리뷰 별점 임시 변수
      tempRating: "",
      //현재 시간 변수
      nowDate: 0
    };
  },
  props: {
    reviewData: Object,
    botId: String,
    orderBy: String
  },
  created() {
    //현재 날짜 타임스탬프 계산
    this.nowDate = Math.floor(+new Date() / 1000);
  },
  methods: {
    //신규 게시글 확인
    checkNew(createdDate) {
      if (this.nowDate - createdDate <= 604800) {
        return true;
      } else return false;
    },
    //리뷰 수정
    updateReview(review) {
      review.review = this.tempText;
      if (this.tempText == "") {
        alert("내용을 입력해주세요.");
      } else {
        this.replyEditable = false;
        botApi
          .updateReview(review.id, {
            review: this.tempText,
            ratingScore: this.tempRating
          })
          .then(() => {
            this.listReview();
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    //리뷰 삭제
    deleteReview(reviewId) {
      botApi
        .deleteSupport(reviewId)
        .then(() => {
          this.listReview();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //리뷰 비노출
    hideReview(reviewId) {
      botApi
        .visibleReview(reviewId, {
          visibleYn: false
        })
        .then(() => {
          this.listReview();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //리뷰 노출
    showReview(reviewId) {
      botApi
        .visibleReview(reviewId, {
          visibleYn: true
        })
        .then(() => {
          this.listReview();
        })
        .catch(res => {
          console.log(res);
        });
    },
    //리뷰 좋아요
    like(reviewId, likeYn) {
      if (!this.$store.getters.getToken) {
        if (confirm("로그인이 필요한 페이지 입니다. 로그인으로 이동합니다.")) {
          this.$router.push("/login");
        }
      } else {
        console.log(reviewId);
        botApi
          .likeReview(reviewId, { likeYn: likeYn })
          .then(() => {
            this.listReview();
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    //리뷰 리스트
    listReview() {
      botApi
        .listReview(this.botId, { orderBy: this.orderBy })
        .then(res => {
          this.reviewList = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  computed: {
    //리뷰 목록 부모컴포넌트와 동기화
    reviewList: {
      get() {
        return this.reviewData;
      },
      set(newValue) {
        this.$emit("updateReview", newValue);
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
