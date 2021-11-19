import api from "@/api/index.js";
//봇 관련 api

export default {
  //봇 정보 조회
  selectBot(botId) {
    return api({
      url: `v1/bot/${botId}`,
      method: "get"
    });
  },
  //봇 등록
  registBot(bot) {
    return api({
      url: "v1/bot",
      method: "post",
      data: bot
    });
  },
  //봇 정보 업데이트
  updateBot(botId, bot) {
    return api({
      url: `v1/bot/${botId}`,
      method: "put",
      data: bot
    });
  },
  //봇 삭제
  deleteBot(botId) {
    return api({
      url: `v1/bot/${botId}`,
      method: "delete",
      data: bot
    });
  },
  //봇 좋아요 추가/취소
  likeBot({ botId, likeYn }) {
    return api({
      url: `v1/bot/${botId}/like`,
      method: "put",
      data: likeYn
    });
  },
  //봇 노출여부 업데이트
  visibleBot(botId, visibleYn) {
    return api({
      url: `v1/bot/${botId}/visible`,
      method: "put",
      data: visibleYn
    });
  },
  //봇 개수 조회
  getBotCount() {
    return api({
      url: "v1/bot/count",
      method: "get"
    });
  },
  //봇 조회 criteria:조건
  listBot(criteria) {
    return api({
      url: "v1/bot/list",
      method: "post",
      data: criteria
    });
  },
  //봇 검색
  searchBot(value) {
    return api({
      url: "v1/bot/search",
      method: "post",
      data: value
    });
  },
  //봇 실시간 검색어 조회
  searchRank() {
    return api({
      url: "v1/bot/searchRank",
      method: "get"
    });
  },
  //봇 전체 카테고리 조회
  getAllCategory() {
    return api({
      url: "v1/bot/category",
      method: "get"
    });
  },
  //봇 업무 카테고리 조회
  getJobCategory() {
    return api({
      url: "v1/bot/category/jobCategory",
      method: "get"
    });
  },
  //봇 태그 리스트 조회
  getTagList() {
    return api({
      url: "v1/bot/category/tags",
      method: "get"
    });
  },

  //봇 지원 관련
  //지원 게시글 추가
  writeSupport(botId, reply) {
    return api({
      url: `v1/reply/bot/${botId}`,
      method: "post",
      data: reply
    });
  },
  //지원 조회
  listSupport(botId, criteria) {
    return api({
      url: `v1/reply/bot/${botId}/list`,
      method: "post",
      data: criteria
    });
  },
  //지원 수정
  updateSupport(replyId, reply) {
    return api({
      url: `v1/reply/bot/${replyId}`,
      method: "put",
      data: reply
    });
  },
  //지원 삭제
  deleteSupport(replyId) {
    return api({
      url: `v1/reply/bot/${replyId}`,
      method: "delete"
    });
  },
  //지원 유용해요 추가/취소
  likeSupport(replyId, likeYn) {
    return api({
      url: `v1/reply/bot/${replyId}/like`,
      method: "put",
      data: { likeYn: likeYn }
    });
  },
  visibleSupport(replyId, visibleYn) {
    return api({
      url: `v1/reply/bot/${replyId}/visible`,
      method: "put",
      data: visibleYn
    });
  },

  //리뷰 관련
  //리뷰 등록
  writeReview(botId, review) {
    return api({
      url: `v1/bot/rating/${botId}`,
      method: "post",
      data: review
    });
  }, //리뷰 업데이트
  updateReview(ratingId, rating) {
    return api({
      url: `v1/bot/rating/${ratingId}`,
      method: "put",
      data: rating
    });
  }, //리뷰 목록 조회
  listReview(botId, criteria) {
    return api({
      url: `v1/bot/rating/${botId}/list`,
      method: "post",
      data: criteria
    });
  }, //리뷰 삭제
  deleteReview(ratingId) {
    return api({
      url: `v1/bot/rating/${ratingId}`,
      method: "delete"
    });
  },
  likeReview(ratingId, likeYn) {
    return api({
      url: `v1/bot/rating/${ratingId}/like`,
      method: "put",
      data: likeYn
    });
  },
  visibleReview(ratingId, visibleYn) {
    return api({
      url: `v1/bot/rating/${ratingId}/visible`,
      method: "put",
      data: visibleYn
    });
  }
};
