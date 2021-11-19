<template>
  <v-card flat>
    <v-card-text>
       <v-col class="resource-write-contents">

        <!-- 노출여부  -->
         <v-row class="resource-write-contents-line">
          <div class="d-flex align-center resource-contents-label">
            노출 여부
          </div>
          <div class="d-flex align-center resource-contents-input">
            <v-chip
              label
              style="width: 150px; text-align: center !important;"
            >{{bot.botId}}</v-chip>

            <v-radio-group
              :column="false"
              v-model="bot.exposureType"
              class="resource-contents-radio"
            >
              <v-radio
                :dark="false"
                v-for="item in radio.exposureTypeRadio"
                :key="item.name"
                :label="item.name"
                :value="item.value"
                color="#213E86"
                :ripple="false"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-row>

        <!-- 봇 이름  -->
        <v-row class="resource-write-contents-line">
          <div class="d-flex align-center resource-contents-label">
            봇 이름
            <v-icon class="label-icon" size="5" color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <div class="d-flex align-center resource-contents-input">
            <v-text-field
              style="margin-top: 25px;"
              full-width
              class="rounded-0"
              outlined
              flat
              dense
              v-model="bot.botName"
            ></v-text-field>
          </div>
        </v-row>
        
        <v-row class="resource-write-contents-line">
          <!-- 봇 개요  -->
          <div class="d-flex align-center resource-contents-label">
            봇 개요(간략설명)
            <v-icon class="label-icon" size="5" color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <div class="d-flex align-center resource-contents-input">
            <v-text-field
              style="margin-top: 25px;"
              full-width
              class="rounded-0"
              outlined
              flat
              dense
              v-model="bot.overview"
            ></v-text-field>
          </div>
        </v-row>

        <v-row class="resource-write-contents-line">
          <!-- 봇 카테고리 선택 -->
          <div
            class="d-flex align-start resource-contents-label"
            style="padding-top:15px;"
          >
            카테고리
            <v-icon
              class="label-icon"
              style="margin-top:0px !important;"
              size="4"
              color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <v-row style="padding:20px;">
            <!-- rpa 솔루션 카테고리 -->

            <v-col>
              <v-row>
                <div>
                  <b> {{ rpaSolution.title }}</b>
                </div>
                <v-spacer></v-spacer>
              </v-row>

              <v-row v-for="filter in rpaSolution.content" :key="filter.id">
                <v-checkbox
                  multiple
                  v-model="bot.rpaSolutionList"
                  :value="filter.id"
                  :ripple="false"
                  hide-details
                  dense
                  light
                  color="#264085"
                  class="filter-box-checks"
                  :label="filter.categoryName"
                ></v-checkbox>
              </v-row>
            </v-col>
            <v-col style=" padding-bottom:40px;">
              <!-- 업무 카테고리  -->

              <v-row>
                <div>
                  <b> {{ jobCategory.title }}</b>
                </div>
                <v-spacer></v-spacer>
              </v-row>

              <v-row v-for="filter in jobCategory.content" :key="filter.id">
                <v-checkbox
                  multiple
                  v-model="bot.jobCategoryList"
                  :value="filter.id"
                  :ripple="false"
                  hide-details
                  dense
                  light
                  color="#264085"
                  class="filter-box-checks"
                  :label="filter.categoryName"
                ></v-checkbox>
              </v-row>
            </v-col>
            <!-- 비즈니스 카테고리  -->

            <v-col>
              <v-row>
                <div>
                  <b> {{ business.title }}</b>
                </div>
                <v-spacer></v-spacer>
              </v-row>

              <v-row v-for="filter in business.content" :key="filter.id">
                <v-checkbox
                  multiple
                  v-model="bot.businessCategoryList"
                  :value="filter.id"
                  :ripple="false"
                  hide-details
                  dense
                  light
                  color="#264085"
                  class="filter-box-checks"
                  :label="filter.categoryName"
                ></v-checkbox>
              </v-row>
            </v-col>
            <!-- 응용프로그램 카테고리  -->

            <v-col>
              <v-row>
                <div>
                  <b> {{ thirdParty.title }}</b>
                </div>
                <v-spacer></v-spacer>
              </v-row>

              <v-row v-for="filter in thirdParty.content" :key="filter.id">
                <v-checkbox
                  multiple
                  v-model="bot.thirdPartyList"
                  :value="filter.id"
                  :ripple="false"
                  hide-details
                  dense
                  light
                  color="#264085"
                  class="filter-box-checks"
                  :label="filter.categoryName"
                ></v-checkbox>
              </v-row>
            </v-col>
          </v-row>
        </v-row>

        <!-- 버전 -->
         <v-row class="resource-write-contents-line">
          <div class="d-flex align-center resource-contents-label">
            버전
          </div>
          <div class="d-flex align-center resource-contents-input">

            <v-radio-group
              :column="false"
              v-model="bot.version"
              class="resource-contents-radio"
            >
              <v-radio
                :dark="false"
                v-for="item in radio.versionRadio"
                :key="item.name"
                :label="item.name"
                :value="item.value"
                color="#213E86"
                :ripple="false"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-row>

        <!-- 업데이트 일자 -->
         <v-row class="resource-write-contents-line">
          <div class="d-flex align-center resource-contents-label">
            업데이트 일자
          </div>
          <div class="d-flex align-center resource-contents-input">

            <v-text-field
              style="margin-top: 25px;"
              width="200px"
              class="rounded-0 shrink"
              outlined
              flat
              dense
              v-model="bot.updateDate"
            ></v-text-field>
          </div>
        </v-row>

        <!-- 봇 태그리스트  -->

        <v-row class="resource-write-contents-line">
          <div class="d-flex align-center resource-contents-label">
            태그
            <v-icon class="label-icon" size="5" color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <div class="d-flex align-center resource-contents-input">
            <v-combobox
              v-model="bot.tagList"
              :items="tagdata"
              label="존재하는 태그를 선택하거나 새로 입력해 주세요"
              multiple
            ></v-combobox>
          </div>
        </v-row>

        <!-- 유튜브 동영상 링크  -->

        <v-row class="resource-write-contents-line">
          <div class="d-flex align-center resource-contents-label">
            영상
            <v-icon class="label-icon" size="5" color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <div class="d-flex align-center resource-contents-input">
            <v-text-field
              style="margin-top: 25px;"
              full-width
              class="rounded-0"
              outlined
              flat
              dense
              v-model="bot.json.youtubeLink"
            ></v-text-field>
          </div>
        </v-row>

        <v-row class="resource-write-contents-line" style="margin-bottom:0px;">
          <div
            class="d-flex align-start resource-contents-label"
            style="padding-top:10px"
          >
            배너 이미지
          </div>
          <v-row no-gutters class="resource-write-textarea upload-component">
            <vueuploadfileBotImg />
          </v-row>
        </v-row>

        <v-row class="resource-write-contents-line">
          <!-- 봇 설명  -->
          <div
            class="d-flex align-start resource-contents-label"
            style="padding-top:15px;"
          >
            봇 설명
            <v-icon
              class="label-icon"
              style="margin-top:0px !important;"
              size="4"
              color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <v-row class="resource-write-textarea editor">
            <editor
              class="tui-editor-defaultUI"
              ref="toastuiEditor"
              :options="editorOptions"
              initialEditType="wysiwyg"
              previewStyle="vertical"
              @change="getHtml"
            ></editor>
            <!-- <v-textarea
              hide-details
              v-model="bot.json.description"
              no-resize
              class="tui-editor-defaultUI"
            ></v-textarea> -->
          </v-row>
        </v-row>
        <v-row class="resource-write-contents-line">
          <!-- 기대효과  -->
          <div
            class="d-flex align-start resource-contents-label"
            style="padding-top:15px;"
          >
            기대효과
            <v-icon
              class="label-icon"
              style="margin-top:0px !important;"
              size="4"
              color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <v-row class="resource-write-textarea editor">
            <v-textarea
              hide-details
              v-model="bot.json.expectation"
              no-resize
              class="tui-editor-defaultUI"
            ></v-textarea>
          </v-row>
        </v-row>
        <v-row class="resource-write-contents-line">
          <!-- 봇 사용방법  -->
          <div
            class="d-flex align-start resource-contents-label"
            style="padding-top:15px;"
          >
            봇 사용방법
            <v-icon
              class="label-icon"
              style="margin-top:0px !important;"
              size="4"
              color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <v-row class="resource-write-textarea editor">
            <v-textarea
              hide-details
              v-model="bot.json.guideline"
              no-resize
              class="tui-editor-defaultUI"
            ></v-textarea>
          </v-row>
        </v-row>
        
        
        <!-- saas 서비스 URL -->
        <!--
        <v-row v-if="bot.botType != 'BOT'" class="resource-write-contents-line">
          <div class="d-flex align-center resource-contents-label">
            서비스 URL
            <v-icon class="label-icon" size="5" color="#DB3030"
              >mdi-star</v-icon
            >
          </div>
          <div class="d-flex align-center resource-contents-input">
            <v-text-field
              style="margin-top: 25px;"
              full-width
              class="rounded-0"
              outlined
              flat
              dense
              v-model="bot.json.serviceUrl"
            ></v-text-field>
          </div>
        </v-row>
        -->
        <!-- 봇 설명 이미지  -->

        
      </v-col>
      <!-- 하단 버튼  -->

      <v-row class="resource-bottom">
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
    </v-card-text>
  </v-card>
</template>

<script>
// @ is an alias to /src
import Button from "@/components/Button.vue";
import Reply from "@/components/Reply.vue";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Vueuploadfile from "@/components/VueuploadfileBot.vue";
import VueuploadfileBotImg from "@/components/VueuploadfileBotImg.vue";
import botApi from "@/api/bot.js";
import fileApi from "@/api/file.js";

export default {
  components: {
    Button,
    Reply,
    editor: Editor,
    Vueuploadfile,
    VueuploadfileBotImg
  },
  data() {
    return {
      //파일 업로드 파일 포맷

      accept: "*",
      //봇 객체
      bot: {
        botId: "123",
        exposureType: "y",
        botName: "",
        overview: "",
        botType: "BOT",
        version: "major",
        updateDate: "18/05/2021",
        json: {
          description: "",
          expectation: "",
          guideline: "",
          youtubeLink: "",
          serviceUrl: ""
        },
        rpaSolutionList: [],
        jobCategoryList: [],
        businessCategoryList: [],
        thirdPartyList: [],
        tagList: [],
        rpaScriptFileList: [],
        attachFileList: [],
        contentFileList: [],
        thumbnailFileList: [],
        visibleYn: true,
        version: "0.0.1",
        billingAmount: 10000,
        botBillingLimitType: "PERIOD",
        botBillingType: "FREE",
        fileAuthorityType: "LOGON",
        limitCnt: 10000,
        limitPeriod: 30
      },
      //봇 전체 키워드 목록
      tagdata: [],
      //봇 선택한 키워드 목록
      taglist: [],
      // 봇 타입 선택 라디오
      radio: {
        exposureTypeRadio: [
          { name: "노출", value: "y" },
          { name: "비노출", value: "n" }
        ],
        versionRadio: [
          { name: "메이저 업데이트", value: "major" },
          { name: "마이너 업데이트", value: "minor" },
          { name: "패치 업데이트", value: "patch" }
        ]
        
      },
      //프로그레스 바
      progress: 0,
      //toast-ui editor 옵션
      editorOptions: {
        hideModeSwitch: true,
        hooks: {
          addImageBlobHook: async (blob, callback) => {
            let formData = new FormData();
            formData.append("multipartFile", blob);
            return fileApi
              .uploadFile(formData)
              .then(resData => {
                let imguuid = resData.data.fileList[0].uuid;
                this.bot.contentFileList.push(imguuid);
                const uploadedURL =
                  process.env.VUE_APP_APIBASE + "v1/files/download/" + imguuid;
                callback(uploadedURL.toString(), "alt text");
                return false;
              })
              .catch(() => {
                console.log("UPLOAD FAILURE!!");
              });
          }
        }
      },
      titleRules: [
        v => v.length > 1 || "제목을 2글자 이상 입력해주세요.",
        v => v.length <= 100 || "제목을 100자 이하로 입력해주세요."
      ],

      FileList: [],
      uuidList: [],
      newFiles: [],
      categoryList: {},
      //봇 카테고리 데이터 변수

      jobCategory: { title: "카테고리", content: {}, total: 0 },
      business: { title: "비즈니스", content: {}, total: 0 },
      rpaSolution: { title: "솔루션", content: {}, total: 0 },
      thirdParty: {
        title: "응용프로그램",
        content: {}
      },
      category: [],

      //선택된 봇 카테고리 목록
      businessCategoryList: [],
      jobCategoryList: [],
      rpaSolutionList: [],
      thirdPartyList: []
    };
  },

  created() {
    this.$store.commit("SET_FILES", []);
    this.getCategory();
  },
  methods: {
    // 카테고리 목록 가져오기
    getCategory() {
      botApi
        .getAllCategory()
        .then(res => {
          this.category = res.data;
          this.rpaSolution.content = this.category.rpaSolutionList;

          this.jobCategory.content = this.category.jobCategoryList;

          this.business.content = this.category.businessCategoryList;

          this.thirdParty.content = this.category.thirdPartyList;

          let tagtemp = this.category.tagList;
          for (let i = 0; i < tagtemp.length; i++) {
            this.tagdata.push(tagtemp[i].tagName);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },

    // 첨부파일 삭제
    removeFile(index) {
      this.uuidList.splice(index, 1);
      this.FileList.splice(index, 1);
    },

    //파일 목록 가져오기
    getFileList(data) {
      this.FileList = data;
    },

    // 파일목록에서 uuid 가져오기
    getUuidList() {
      this.getImgUuidList();
      this.getRpaUuidList();
    },

    //rpa 첨부파일 uid 리스트 가져오기
    getRpaUuidList() {
      let fileList = this.$store.getters.getfiles;
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].success == true) {
          this.bot.rpaScriptFileList.push(
            fileList[i].response.fileList[0].uuid
          );
        }
      }
    },

    //첨부 이미지 uuid 가져오기
    getImgUuidList() {
      let fileList = this.$store.getters.getbotimgs;
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].success == true) {
          this.bot.thumbnailFileList.push(
            fileList[i].response.fileList[0].uuid
          );
        }
      }
    },

    // progress 가져오기
    getProgress(data) {
      this.progress = data;
    },

    //get html
    getHtml() {
      let html = this.$refs.toastuiEditor.invoke("getHtml");
      this.bot.json.description = html;
    },

    //봇 리스트 페이지로 이동
    gotolist() {
      this.$router.push("/bot");
    },
    //유튜브 동영상 id 가져오기
    getVideoId(url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return match && match[2].length === 11 ? match[2] : null;
    },

    // 유튜브 주소 변환
    convertUrl() {
      const videoId = this.getVideoId(this.bot.json.youtubeLink);
      if (videoId)
        this.bot.json.youtubeLink = "https://www.youtube.com/embed/" + videoId;
      else this.bot.json.youtubeLink = "";
    },

    // 봇 수정
    save() {
      this.getUuidList();
      this.convertUrl();
      botApi
        .registBot(this.bot)
        .then(() => {
          this.$store.commit("INIT_SEARCH");
          this.$router.push("/bot");
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>

