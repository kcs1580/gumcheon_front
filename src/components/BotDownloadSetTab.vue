<template>
  <v-card flat>
    <v-card-text>
      <v-col class="resource-write-contents">
        <v-row class="resource-write-contents-line">
          <!-- 봇 유형  -->
          <div class="d-flex align-center resource-contents-label">
            봇 유형
          </div>
          <div class="d-flex-row-reverse align-center resource-contents-input" style="height: 100% !important">
              <v-row>
                <v-radio-group
                  :column="false"
                  v-model="fileSet.fileSetType"
                  class="resource-contents-radio"
                >
                  <v-radio
                    :dark="false"
                    v-for="item in radio.fileSetType"
                    :key="item.name"
                    :label="item.name"
                    :value="item.value"
                    color="#213E86"
                    style="padding-left: 15px;"
                    :ripple="false"
                  ></v-radio>
                </v-radio-group>
              </v-row>

              <!-- 파일 업로드 선택 시  -->
              <v-row
                v-if="fileSet.fileSetType == 'upload'"
                style="margin-bottom:0px;"
              >
                <v-row no-gutters class="resource-write-textarea upload-component">
                  <vueuploadfile/>
                </v-row>
              </v-row>


              <!-- 링크 제공 선택 시  -->
              <v-row
                v-if="fileSet.fileSetType == 'link'"
                style="margin-bottom:0px;"
              >
                <v-text-field
                  style="margin-top: 25px;"
                  full-width
                  class="rounded-0"
                  outlined
                  flat
                  dense
                  v-model="fileSet.serviceUrl"
                ></v-text-field>
              </v-row>
            
          </div>
        </v-row>
        <v-row class="resource-write-contents-line">
          <!-- 회원 제한  -->
          <div class="d-flex align-center resource-contents-label">
            회원 제한
          </div>
          <div class="d-flex align-center resource-contents-input">
            <v-radio-group
              :column="false"
              v-model="fileSet.openType"
              class="resource-contents-radio"
            >
              <v-radio
                :dark="false"
                v-for="item in radio.openType"
                :key="item.name"
                :label="item.name"
                :value="item.value"
                color="#213E86"
                :ripple="false"
              ></v-radio>
          
            </v-radio-group>
          </div>
        </v-row>

        <v-row class="resource-write-contents-line">
          
          <!-- 무료 여부  -->
          <div class="d-flex align-center resource-contents-label">
            무료 여부
          </div>
          <div class="d-flex align-center resource-contents-input">
            
            <v-radio-group
              :column="false"
              v-model="fileSet.billType"
              class="resource-contents-radio"
            >
              <v-radio
                :dark="false"
                v-for="item in radio.billType"
                :key="item.name"
                :label="item.name"
                :value="item.value"
                color="#213E86"
                :ripple="false"
              ></v-radio>

            </v-radio-group>

            <v-checkbox
              multiple
              v-model="fileSet.noLimit"
              :value="'noLimit'"
              :ripple="false"
              color="#264085"
              :label="'제한 없음'"
              v-if="fileSet.billType == 'free'"
            ></v-checkbox>
          </div>
        </v-row>

        <v-row v-if="fileSet.billType == 'free' && fileSet.noLimit != 'noLimit'" class="resource-write-contents-line">
          
          <!-- 제공일수  -->
          <div class="d-flex align-center resource-contents-label">
            제공일수
          </div>
          <div class="d-flex align-center resource-contents-input">
            
            <v-text-field
              style="margin-top: 25px;"
              width="200px"
              class="rounded-0 shrink"
              outlined
              flat
              dense
              v-model="fileSet.offerDays"
            ></v-text-field>
          </div>
        </v-row>

        <v-row v-if="fileSet.billType == 'bill'" class="resource-write-contents-line">
          <!-- 과금 정보  -->
          <div class="d-flex align-center resource-contents-label">
            과금 정보
          </div>
          <div class="d-flex align-center resource-contents-input">
            <v-text-field
              style="margin-top: 25px;"
              class="rounded-0 shrink"
              outlined
              flat
              dense
              v-model="fileSet.billing"
            ></v-text-field>
          </div>
        </v-row>

        <v-row v-if="fileSet.billType == 'bill'" class="resource-write-contents-line">
          <!-- 과금 제한  -->
          <div class="d-flex align-center resource-contents-label">
            과금 제한
          </div>
          <div class="d-flex align-center resource-contents-textarea" style="padding-left: 15px;">
            
            <v-radio-group
              :column="true"
              v-model="fileSet.billLimitType"
              class="resource-contents-radio"
            >
              <v-radio
                :dark="false"
                v-for="item in radio.billLimitType"
                :key="item.name"
                :label="item.name"
                :value="item.value"
                color="#213E86"
                :ripple="false"
              ></v-radio>

            </v-radio-group>

            
          </div>
        </v-row>

        <!-- 데모 파일  -->

        <v-row
          class="resource-write-contents-line"
          style="margin-bottom:0px;"
        >
          <div class="d-flex align-center resource-contents-label">
            데모 파일
          </div>
          <v-row no-gutters class="resource-write-textarea upload-component">
            <Vueuploadfile />
          </v-row>
        </v-row>

      </v-col>  

      <!-- 하단 버튼  -->

      <v-row class="resource-bottom">
        <v-spacer></v-spacer>
        <div >
          <Button
            style="margin-right:10px;"
            class="btn-border btn-content-color"
            color="#999999"
            contents="취소"
            height="48"
            width="160"
          />
        </div>
        <div>
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
      // 파일 설정 개체
      fileSet: {
        fileSetType: "upload",
        openType: "all",
        serviceUrl: "",
        billType: "bill",
        noLimit: "",
        offerDays: "",
        billing: "",
        billLimitType: "noLimit",
      },
      // 라디오 버튼
      radio: {
        // 봇 파일 유형
        fileSetType: [
          { name: "파일 업로드", value: "upload" },
          { name: "링크 제공", value: "link" }
        ],
        // 회원 제한
        openType: [
          { name: "제한 없음", value: "all" },
          { name: "회원 전용", value: "member" }
        ],
        // 무료 여부
        billType: [
          { name: "과금", value: "bill" },
          { name: "무료", value: "free" }
        ],
        //과금 제한
        billLimitType: [
          { name: "제한 없음", value: "noLimit" },
          { name: "횟수 제한", value: "countLimit" },
          { name: "기간 제한", value: "termLimit" }
        ]

      }
    };
  },

  created() {
  },
  methods: {
    
  }
};
</script>

