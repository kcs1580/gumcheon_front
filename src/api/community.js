import api from "@/api/index.js";
//커뮤니티 관련 api
export default {
  //커뮤니티 게시글 생성
  writeCommunity(board) {
    return api({
      url: "v1/board/community",
      method: "post",
      data: board
    });
  },
  //커뮤니티 게시글 조회
  selectCommunity(boardId) {
    return api({
      url: `getBoard.do?idx=${boardId}`,
      method: "get"
    });
  },
  //커뮤니티 게시글 업데이트
  updateCommunity(boardId, board) {
    return api({
      url: `v1/board/community/${boardId}`,
      method: "put",
      data: board
    });
  },
  //커뮤니티 게시글 삭제
  deleteCommunity(boardId) {
    return api({
      url: `v1/borad/community/${boardId}`,
      method: "delete"
    });
  },
  //커뮤니티 게시글 좋아요 추가/취소
  likeCommunity(boardId, like) {
    return api({
      url: `v1/board/community/${boardId}/like`,
      method: "put",
      data: { likeYn: like }
    });
  },
  //커뮤니티 게시글 노출여부 업데이트
  vsibleCommunity(boardId, visible) {
    return api({
      url: `v1/board/community/${boardId}/visible`,
      method: "put",
      data: { visibleYn: visible }
    });
  },
  //커뮤니티 게시판 리스트 조회 criteria:조건
  listCommunity() {
    return api({
      url: `getBoards.do`,
      method: "get",
    });
  },

  //커뮤니티 댓글생성
  writeReply(boardId, reply) {
    return api({
      url: `v1/reply/community/${boardId}`,
      method: "post",
      data: reply
    });
  },
  //커뮤니티 댓글 조회
  listReply(boardId, orderBy) {
    return api({
      url: `v1/reply/community/${boardId}/list`,
      method: "post",
      data: orderBy
    });
  },
  //커뮤니티 댓글 업데이트
  updateReply(replyId, reply) {
    return api({
      url: `v1/reply/community/${replyId}`,
      method: "put",
      data: reply
    });
  },
  //커뮤니티 댓글 삭제
  deleteReply(replyId) {
    return api({
      url: `v1/reply/community/${replyId}`,
      method: "delete"
    });
  },
  //커뮤니티 댓글 좋아요 추가/취소
  likeReply(replyId, like) {
    return api({
      url: `v1/reply/community/${replyId}/like`,
      mehtod: "put",
      data: like
    });
  },
  //커뮤니티 댓글 노출여부 업데이트
  visibleReply(replyId, visible) {
    return api({
      url: `v1/reply/community/${replyId}/visible`,
      method: "put",
      data: visible
    });
  }
};
