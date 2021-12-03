import api from "@/api/index.js";
//커뮤니티 관련 api
export default {
  //커뮤니티 게시글 생성
  writeCommunity(board) {
    return api({
      url: "v1/board",
      method: "post",
      data: board
    });
  },
  //커뮤니티 게시글 조회
  selectCommunity(boardId) {
    return api({
      url: `v1/board/${boardId}`,
      method: "get"
    });
  },
  //커뮤니티 게시글 업데이트
  updateCommunity(boardId, board) {
    return api({
      url: `v1/board/${boardId}`,
      method: "put",
      data: board
    });
  },
  //커뮤니티 게시글 삭제
  deleteCommunity(boardId) {
    return api({
      url: `v1/board/${boardId}`,
      method: "delete"
    });
  },
  
  //커뮤니티 게시판 리스트 조회 criteria:조건
  listCommunity() {
    return api({
      url: `v1/board`,
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

  //커뮤니티 조회수 증가
  updateViewCnt(boardId){
    return api({
      url: `v1/board/updateViewCnt/${boardId}`,
      method: "get"    });
  }

};
