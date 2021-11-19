import api from "@/api/index.js";
//파일 다운로드, 업로드 api
export default {
  //파일 다운로드
  downloadFile(uuid) {
    return api({
      url: `v1/files/download/${uuid}`,
      method: "get",
      responseType: "blob"
    });
  },
  //파일 업로드
  uploadFile(formData) {
    return api({
      url: "v1/files/upload",
      method: "post",
      data: formData,
      headers: { "Content-type": "multipart/form-data" }
    });
  }
};
