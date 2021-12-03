<template>
  <v-layout
    class="d-flex justify-center"
   
  >
    <v-container
      class="community-frame rounded-xl pt-16 pb-14 pl-16 pr-10 elevation-20"
    >
      <v-row>
        <span class="community-write-title">공지사항</span>
      </v-row>
      <v-col class="community-write-contents">
        <v-row class="community-write-contents-line">
          <div class="d-flex align-center community-contents-label">이름</div>
          <div class="d-flex align-center community-contents-input">
            {{ $store.state.userNm }}
          </div>
        </v-row>       
        <v-row class="community-write-contents-line">
          <div class="d-flex align-center community-contents-label">
            제목
            <v-icon class="label-icon" size="5" color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <div class="d-flex align-center community-contents-input">
            <v-text-field
              style="margin-top: 25px;"
              full-width
              class="rounded-0"
              outlined
              flat
              dense
              v-model="board.title"
            ></v-text-field>
          </div>
        </v-row>
        <v-row class="community-write-contents-line" style="margin-bottom:0px;">
          <div
            class="d-flex align-start community-contents-label"
            style="padding-top:15px;"
          >
            내용
            <v-icon
              class="label-icon"
              style="margin-top:0px !important;"
              size="4"
              color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <v-row class="community-write-textarea editor">
            <editor
              :initialValue="board.content"
              class="tui-editor-defaultUI"
              ref="toastuiEditor"
              :options="editorOptions"
              initialEditType="wysiwyg"
              previewStyle="vertical"
              @change="getHtml"
            ></editor>
            {{ this.editorHtml }}
          </v-row>
        </v-row>
      </v-col>

      <v-row class="community-bottom">
        <v-spacer></v-spacer>
        <div @click="gotolist">
          <Button
            style="margin-right:10px;"
            class="btn-border btn-content-color"
            color="#999999"
            contents="취소"
            height="48"
            width="160"
          />
        </div>
        <div @click="save">
          <Button
            class="btn-border btn-content-color"
            color="#213E86"
            contents="저장"
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
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import communityApi from "@/api/community.js";
import fileApi from "@/api/file.js";

export default {
  components: { Button, editor: Editor },
  data() {
    return {
      editorHtml: "",
      radio: [
        { name: "노출", value: true },
        { name: "비노출", value: false }
      ],
      radioGroup: 1,
      editorOptions: {
        hideModeSwitch: true,
        hooks: {
          // addImageBlobHook: async (blob, callback) => {
          //   let formData = new FormData();
          //   formData.append("multipartFile", blob);
          //   return fileApi
          //     .uploadFile(formData)
          //     .then(resData => {
          //       let imguuid = resData.data.fileList[0].uuid;
          //       this.board.contentFileList.push(imguuid);
          //       const uploadedURL =
          //         process.env.VUE_APP_APIBASE + "v1/files/download/" + imguuid;
          //       callback(uploadedURL.toString(), "alt text");
          //       return false;
          //     })
          //     .catch(() => {
          //       console.log("UPLOAD FAILURE!!");
          //     });
          // }
        }
      },

      board: {
        writer:"작성자",
        content: "",
        title: "",
        
      }
    };
  },
  methods: {
    getHtml() {
      let html = this.$refs.toastuiEditor.invoke("getHtml");
      this.board.content = html;
    },
    gotodetail() {
    this.$router.push("/notice");
    },
    gotolist() {
      this.$router.push("/notice");
    },
    save() {
      if (this.board.title.length > 100) {
        alert("제목을 100자 이하로 입력해주세요.");
      } else if (this.board.title.length < 1) {
        alert("제목을 입력해주세요.");
      } else if (this.board.content.length < 1) {
        alert("내용을 입력해주세요.");
      } else {
        confirm("등록 하시겠습니까?");
        communityApi
          .writeCommunity(this.board)
          .then(() => {
            this.$router.push("/notice");
          })
          .catch(res => {
            console.log(res);
          });
      }
    }
  },
  computed: {},

  mounted() {}
};
</script>

<style lang="scss">
.community-frame {
  background-color: white;
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 1200px;

  .community-write-title {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -2px;
  }
  .community-write-contents {
    margin-left: -12px;
    border-top: 2px solid black;
    border-bottom: 1px solid black;
    padding-bottom: 0px;

    .community-write-contents-line {
      margin-left: -12px;
      margin-bottom: 12px;
      border-bottom: 0.5px solid #eeeeee;
      /* margin-top: 0px; */

      .community-contents-label {
        padding-left: 15px;
        width: 20%;
        background-color: #f9f9fa;
        font-weight: bold;

        .label-icon {
          margin-top: -12px !important;
          color: #db3030 !important;
        }
      }
      .community-contents-input {
        width: 80%;
        height: 50px;
        padding-left: 15px;

        .community-contents-radio {
          height: 50px;

          .v-radio {
            margin-right: 40px;
          }
        }
      }
      .community-write-textarea {
        margin-left: 15px;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-right: 15px;
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
.community-contents-radio i {
  font-size: 19px;
}
.community-contents-radio label {
  font-size: 16px;
  padding-left: 0px;
  margin-left: -4px;
}
.community-contents-radio .v-radio {
  padding: 0px;
}
.community-contents-radio [class*="__ripple"] {
  left: 0;
}
.tui-editor-defaultUI {
  width: 100%;
}
</style>
