<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <!-- <v-flex xs12 sm6 md4 v-for="article in articles" :key="article._id">
        {{article}}
      </v-flex> -->
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="articles"
          :loading="loading">
          <template v-slot:item="{item}" >
            <tr  @click="handleClick(item)">
            <td :class="headers[0].class">{{item.idx}}</td>
            <td :class="headers[1].class">{{ item.title }}</td>
            <td :class="headers[2].class">{{ item.writer ? item.writer : '손님' }}</td>
            <td :class="headers[3].class">{{$moment(item.regdate).format("YYYY-MM-DD")  }}</td>
            <td :class="headers[4].class">{{ item.viewcnt }}</td>
            </tr>
          </template>
        
        </v-data-table>
          
           <v-dialog v-model="dlRead" persistent  max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{article.title}}</span>
        </v-card-title>
        <v-card-text>
          {{article.content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" @click.native="dlRead = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 

    
      </v-flex>
      <v-btn @click="$router.push('/writenotice')">글쓰기</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
import communityApi from "@/api/community.js";

export default {
  data () {
    return {
      // ..
      dlRead:false,
      articles: [],
      article:{
title:'',
contetn:''
      },
      headers: [
        { text: '글번호', value: 'idx', sortable: true},
        { text: '제목', value: 'title', sortable: true },
        { text: '글쓴이', value: 'writer', sortable: false },
        { text: '작성일', value: 'regdate', sortable: true },
        { text: '조회수', value: 'viewcnt', sortable: true }
      ],
      loading: false
      // ..
    }
  },
  // ..
  methods: {
    // ..

    
    list () {
      if (this.loading) return
      this.loading = true
      communityApi.listCommunity()
        .then(({ data }) => {
          this.articles = data
          this.loading = false
        })
        .catch((e) => {
                    console.log(e);
          this.loading = false
        })
    },

    read (board){
      this.article.title = board.title;
      this.loading = true
      communityApi.selectCommunity(board.idx)
      .then(({ data }) => {
        this.dlRead=true
          this.article = data
          this.loading = false
        })
        .catch((e) => {
                    console.log(e);

          this.loading = false
        })
    },
     communityDetail(idx) {
      this.$router.push("/notice/" + idx);
    },
    handleClick(value) {
      this.communityDetail(value.idx);
    }
    
  },
  created(){
      this.list();
  }
}
</script>