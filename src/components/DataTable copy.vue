<template>
  <v-container class="datatable-frame">
    <v-card-title class="search-bar-frame">
      <div class="counter-text">
        <b>{{ list.length }}</b>건
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <div style="width:360px;">
        <v-text-field
          dense
          class="search-bar-datatable"
          v-model="search"
          solo
          outlined
          label="검색어를 입력하세요."
          append-icon="mdi-magnify"
          height="40"
          full-width
        ></v-text-field>
      </div>
      <div>
        <!-- <Button 
          color="#213E86"
          contents="신청하기" /> -->
        <button v-if="$route.name == 'education'" class="request-btn d-flex align-center justify-center rounded"
          @click="overlay = !overlay">
          신청하기
        </button>
        <button v-if="$route.name == 'community'" class="request-btn d-flex align-center justify-center rounded">
          등록하기
        </button>
        <button v-if="$route.name == 'resource'" class="request-btn d-flex align-center justify-center rounded">
          등록하기
        </button>

        <v-overlay
          :absolute="true"
          :opacity="0.5"
          :value="overlay" >
          <!-- 오버레이 - 교육신청 팝업 -->
          <v-card
            class="popup-education rounded-xl"
            color="white"
            width="400"
            height="638">
            <!-- 타이틀 -->
            <v-card-title class="popup-education-title d-flex justify-center">
              교육 신청
              <v-icon class="popup-education-close" large color="#9B9B9B" @click="overlay = false">
                mdi-window-close
              </v-icon>
            </v-card-title>

            <!-- 인풋 박스 -->
            <v-card-text class="popup-education-contents">
              <v-col class="pl-0 pr-0">
                <div class="contents-label" style="margin-top:15px;">
                  신청자<v-icon class="label-icon" size="5" color="#DB3030">mdi-star</v-icon>
                </div>
                <v-text-field
                  class="contents-text-field"
                  color="#415A97"
                  placeholder="홍길동"
                  full-width
                  flat
                  dense
                  solo />
                <div class="contents-label">
                  연락처<v-icon class="label-icon" size="5" color="#DB3030">mdi-star</v-icon>
                </div>
                <v-text-field
                  class="contents-text-field"
                  color="#415A97"
                  placeholder="연락처를 입력해주세요"
                  full-width
                  flat
                  dense
                  solo />

                <div class="contents-label">
                  이메일<v-icon class="label-icon" size="5" color="#DB3030">mdi-star</v-icon>
                </div>
                <v-row class="d-flex align-center flex-nowrap">
                  <v-text-field
                    style="margin-left: 12px; margin-right:5px;"
                    class="contents-text-field2"
                    color="#415A97"
                    full-width
                    flat
                    dense
                    solo />
                  <span style="margin-bottom:10px; font-size:18px;">@</span>
                  <v-text-field
                    style="margin-right:12px; margin-left:5px;"
                    class="contents-text-field2"
                    color="#415A97"
                    flat
                    dense
                    solo />
                </v-row>
                <div class="contents-label">
                  원하시는 답변을 선택해주세요
                </div>
                <v-radio-group :column="false" v-model="radioGroup" class="contents-radio">
                  <v-radio
                    :dark="false"
                    v-for="item in radio"
                    :key="item"
                    :label="item"
                    :value="item"
                    color="#213E86"
                    :ripple="false"
                  ></v-radio>
                </v-radio-group>

                <div class="contents-label">
                  요청사항을 말씀해주세요
                </div>
                <v-textarea
                  height="100"
                  no-resize
                  flat
                  class="contents-textarea"
                  color="black"
                  solo
                  label="Solo textarea"
                ></v-textarea>
              </v-col>
            </v-card-text>

            <!-- 하단 버튼 -->
            <v-card-actions class="d-flex justify-center popup-education-actions">
              <div @click="overlay = false" >
                <Button
                  class="action-cancel-btn rounded-bl-xl"
                  height="50"
                  width="200"
                  color="#999999"
                  contents="취소" />
              </div>
              <Button
                class="action-apply-btn rounded-br-xl"
                height="50"
                width="200"
                color="#081157"
                contents="신청" />
            </v-card-actions>
          </v-card>
        </v-overlay>

      </div>
    </v-card-title>
    <v-data-table
      disable-sort
      hide-default-footer
      :headers="headers"
      :items="list"
      :search="search">
      <template v-slot:[`item.re`]="{ item }">
        <v-chip
          small
          style="color:white;"
          v-if="item.re == '답변완료'"
          color="#666666"
        >{{ item.re }}</v-chip>
        <v-chip
          small
          style="color:white;"
          v-else-if="item.re == '답변대기'"
          color="#EC705B"
        >{{ item.re }}</v-chip>
			</template>
    </v-data-table>
  </v-container>
</template>

<script>
import Button from '@/components/Button.vue'
import Search from '@/components/Search.vue'

export default {
  components: { Button, Search },
  data () {
    return {
      radio: ['상관없음', '유선', '이메일'],
      radioGroup: 1,
      overlay: false,
      search: '',
      headers: [],
      list: [],
      resourceHeaders: [
        {
          text: '번호',
          align: 'center',
          filterable: false,
          value: 'index',
          class: 'table-title-font',
        },
        { text: '제목', class: ['table-title', 'table-title-font'], value: 'title' },
        { text: '댓글수', class: ['table-title-font', 'table-cell-style'], align: 'center', value: 'reply' },
        { text: '좋아요', class: ['table-title-font', 'table-cell-style'], align: 'center', value: 'like' },
        { text: '다운로드', class: ['table-title-font', 'table-cell-style2'], align: 'center', value: 'download' },
        { text: '작성일', class: ['table-title-font', 'table-cell-style2'], align: 'center', value: 'date' },
        { text: '작성자', class: ['table-title-font', 'table-cell-style2'], align: 'center', value: 'writer' },
      ],
      resourceList: [
        {
          index: '3254',
          date: '2020-10-10',
          title: '[공지사항] RPA 개발팀 공유합니다.',
          reply: '111', download: '123', like: '222',
          writer: 'SIRI',
        },
        {
          index: '3255', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', download: '123', like: '222',
        },
        {
          index: '3256', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', download: '123', like: '222',
        },
        { index: '3257', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', download: '123', like: '222', },
        { index: '3258', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', download: '123', like: '222', },
        { index: '3259', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', download: '123', like: '222', },
        { index: '3260', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', download: '123', like: '222', },
        { index: '3261', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', download: '123', like: '222', },
        { index: '3262', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', download: '123', like: '222', },
        { index: '3263', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', download: '123', like: '222', }
      ],
      communityHeaders: [
        {
          text: '번호',
          align: 'center',
          filterable: false,
          value: 'index',
          class: 'table-title-font',
        },
        { text: '제목', class: ['table-title', 'table-title-font'], value: 'title' },
        { text: '댓글수', class: ['table-title-font', 'table-cell-style'], align: 'center', value: 'reply' },
        { text: '좋아요', class: ['table-title-font', 'table-cell-style'], align: 'center', value: 'like' },
        { text: '조회수', class: ['table-title-font', 'table-cell-style'], align: 'center', value: 'view' },
        { text: '작성일', class: ['table-title-font', 'table-cell-style2'], align: 'center', value: 'date' },
        { text: '작성자', class: ['table-title-font', 'table-cell-style2'], align: 'center', value: 'writer' },
      ],
      communityList: [
        {
          index: '3254',
          date: '2020-10-10',
          title: '[공지사항] RPA 개발팀 공유합니다.',
          reply: '111', like: '123', view: '222',
          writer: 'SIRI',
        },
        {
          index: '3255', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', like: '123', view: '222',
        },
        {
          index: '3256', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', like: '123', view: '222',
        },
        { index: '3257', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', like: '123', view: '222', },
        { index: '3258', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', like: '123', view: '222', },
        { index: '3259', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', like: '123', view: '222', },
        { index: '3260', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', like: '123', view: '222', },
        { index: '3261', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', like: '123', view: '222', },
        { index: '3262', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', like: '123', view: '222', },
        { index: '3263', date: '2020-10-10', title: 'RPA 개발팀 공유합니다.', writer: 'SIRI', reply: '111', like: '123', view: '222', }
      ],
      educationHeaders: [
        {
          text: '번호',
          align: 'center',
          filterable: false,
          value: 'index',
          class: 'table-title-font',
        },
        { text: '제목', class: ['table-title', 'table-title-font'], value: 'title' },
        { text: '작성일', class: 'table-title-font', align: 'center', value: 'date' },
        { text: '작성자', class: 'table-title-font', align: 'center', value: 'writer' },
        { text: '답변여부', class: 'table-title-font', align: 'center', value: 're' },
      ],
      educationList: [
        {
          index: '3254',
          date: '2020-10-10',
          title: '교육 신청',
          writer: 'SIRI',
          re: '답변대기'
        },
        {
          index: '3255', date: '2020-10-10', title: '교육 신청 합니다', writer: 'SIRI', re: '답변완료'
        },
        {
          index: '3256', date: '2020-10-10', title: '교육 신청 합니다. 교육 신청 합니다', writer: 'SIRI', re: '답변대기'
        },
        { index: '3257', date: '2020-10-10', title: '교육 신청 합니다', writer: 'SIRI', re: '답변완료' },
        { index: '3258', date: '2020-10-10', title: '교육 신청 합니다교육 신청 합니다교육 신청 합니다', writer: 'SIRI', re: '답변완료' },
        { index: '3259', date: '2020-10-10', title: '교육 신청 합니다', writer: 'SIRI', re: '답변완료' },
        { index: '3260', date: '2020-10-10', title: '교육 신청', writer: 'SIRI', re: '답변대기' },
        { index: '3261', date: '2020-10-10', title: '교육 신청교육 신청교육 신청', writer: 'SIRI', re: '답변대기' },
        { index: '3262', date: '2020-10-10', title: '교육 신청교육 신청', writer: 'SIRI', re: '답변완료' },
        { index: '3263', date: '2020-10-10', title: '교육 신청교육 신청', writer: 'SIRI', re: '답변완료' }
      ],
    }
  },
  props: {
    listData: Array
  },
  created() {
    this.dataset()
  },
  methods: {
    dataset () {
      if(this.$route.name == 'education') {
        this.headers = this.educationHeaders
        this.list = this.educationList
      } else if (this.$route.name == 'community') {
        this.headers = this.communityHeaders
        this.list = this.communityList
      } else if (this.$route.name == 'resource') {
        this.headers = this.resourceHeaders
        this.list = this.resourceList
      }
    }
  }
}
</script>

<style scoped lang="scss">
.datatable-frame {
  padding: 0;
  border-bottom: black solid 1px;

  .search-bar-frame {
    padding-right: 0px;
    border-bottom: black solid 1px;

    .counter-text {
      margin-bottom: -50px;
      margin-left: -15px;
      font-size: 14px;
      font-weight: bold;
      
      b {
        color: #DC2929;
      }
    }
    .request-btn {
      margin-top: 10px;
      margin-left: 15px;
      width: 100px;
      height: 40px;
      color: white;
      padding: 10px;
      font-size: 14px;
      background-color: #213E86;
    }
    .search-bar-datatable {
      margin-top: 10px;
      height: 40px;
      box-shadow: none;
      /* caret-color: #E1E1E1 !important; */

      .v-label{ 
        font-size: 14px;
      }
      .v-input__slot {
        box-shadow: none !important;
        /* caret-color: #E1E1E1 !important; */
      }
      .v-input__append-inner {
        box-shadow: none;
        /* caret-color: #E1E1E1; */
        margin-right: -12px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
        background-color: #999999;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;

        .v-icon {
          color: white !important;
        }
      }
    }
  }
}
.table-title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table-cell-style {
  width: 7%;
  /* width 1280px 까지 이상없음 -> 이후 화면 조정시에 수치 조절 */
}
.table-cell-style2 {
  width: 9%;
  /* width 1280px 까지 이상없음 -> 이후 화면 조정시에 수치 조절 */
}
/* .table-cell-style3 {
  width: 9%;
} */
.table-title-font {
  color: black !important;
  font-size: 16px !important;
  font-weight: bold !important;
}
.popup-education {
  padding-right: 20px;
  padding-left: 20px;
  color: black !important;

  .popup-education-title {
    font-size: 24px;
    border-radius: 0px !important;
    font-weight: bold;
    border-bottom: 2px solid black;

    .popup-education-close {
      position: absolute;
      right: 15px;
    }
  }
  .popup-education-actions {
    position: absolute;
    bottom: -8px;
    left: -8px;

    .action-cancel-btn {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      font-size: 16px;
      font-weight: bold;
      margin: 0px !important;
    }
    .action-apply-btn {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      font-size: 16px;
      font-weight: bold;
      margin: 0px !important;
    }
  }
  .popup-education-contents {
    margin: 0px;
    padding: 0px;
    color: black !important;

    .contents-text-field {

      .v-input__control {
        .v-input__slot {
          background-color: white !important;
          border-radius: 0px;
          border: 1px solid #D4D4D4;
          /* caret-color: #415a97 !important; */
  
          .v-text-field__slot {
            input {
              color: black !important;
            }
          }
          input {
            color: black !important;
          }
        }
      }
    }
    .contents-text-field2 {
      margin-top: 10px;
      .v-input__slot {
        background-color: white !important;
        border-radius: 0px;
        border: 1px solid #D4D4D4;
        /* caret-color: #415a97 !important; */

        input {
          color: black !important;
        }
      }
    }
    .contents-label {
      margin-top: -10px;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 16px;

      .label-icon {
        margin-top: -12px !important;
        color: #DB3030 !important;
      }
    }
    .contents-textarea {
      border-radius: 0px;
      border: 1px solid #D4D4D4;
      .v-input__slot {
        background-color: white;
      
        textarea {
          color: black !important;
        }
      }
    }
    .contents-radio {
      margin-top: -5px;
      margin-bottom: 5px;

      .v-radio {
        margin-right: 15px;
      }
      .v-input__control {
        color: black !important;

        .v-input__slot {
          color: #D4D4D4 !important;
          /* caret-color: rgb(33, 62, 134) !important; */

          .v-icon {
            color: #D4D4D4;
            /* caret-color: rgb(33, 62, 134) !important; */
          }
          .v-label {
            margin-left: -8px;
            font-size:14px;
            color: #666666 !important;
          }
        }
      }
      
    }
  }
}
/* .v-btn{
  border-radius: 0px !important;
} */
</style>
