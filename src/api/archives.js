import api from "@/api/index.js";
//자료실 관련 api
export default {
  //자료실 게시글 생성
  writeArchives(board) {
    return api({
      url: "v1/board/archives",
      method: "post",
      data: board
    });
  },
  //자료실 게시글 조회
  selectArchives(boardId) {
    return api({
      url: `v1/board/archives/${boardId}`,
      method: "get"
    });
  },
  //자료실 게시글 업데이트
  updateArchives(boardId, board) {
    return api({
      url: `v1/board/archives/${boardId}`,
      method: "put",
      data: board
    });
  },
  //자료실 게시글 삭제
  deleteArchives(boardId) {
    return api({
      url: `v1/borad/archives/${boardId}`,
      method: "delete"
    });
  },
  //자료실 게시글 좋아요 추가/취소
  likeArchives(boardId, like) {
    return api({
      url: `v1/board/archives/${boardId}/like`,
      method: "put",
      data: { likeYn: like }
    });
  },
  //자료실 게시글 노출여부 업데이트
  vsibleArchives(boardId, visible) {
    return api({
      url: `v1/board/archives/${boardId}/visible`,
      method: "put",
      data: { visibleYn: visible }
    });
  },
  //자료실 게시판 리스트 조회 criteria:조건
  listArchives(criteria) {
    return api({
      url: `v1/board/archives/list`,
      method: "post",
      data: criteria
    });
  },
  //자료실 댓글생성
  writeReply(boardId, reply) {
    return api({
      url: `v1/reply/archives/${boardId}`,
      method: "post",
      data: reply
    });
  },
  //자료실 댓글 조회
  listReply(boardId, orderBy) {
    return api({
      url: `v1/reply/archives/${boardId}/list`,
      method: "post",
      data: orderBy
    });
  },
  //자료실 댓글 업데이트
  updateReply(replyId, reply) {
    return api({
      url: `v1/reply/archives/${replyId}`,
      method: "put",
      data: reply
    });
  },
  //자료실 댓글 삭제
  deleteReply(replyId) {
    return api({
      url: `v1/reply/archives/${replyId}`,
      method: "delete"
    });
  },
  //자료실 댓글 좋아요 추가/취소
  likeReply(replyId, like) {
    return api({
      url: `v1/reply/archives/${replyId}/like`,
      mehtod: "put",
      data: like
    });
  },
  //자료실 댓글 노출여부 업데이트
  visibleReply(replyId, visible) {
    return api({
      url: `v1/reply/archives/${replyId}/visible`,
      method: "put",
      data: visible
    });
  }
};
