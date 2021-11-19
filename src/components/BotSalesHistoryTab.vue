<template>
  <v-card flat>
    <v-card-text>
      <v-container
        class="edu-frame rounded-xl pt-16 pb-14 pl-16 pr-10 elevation-20"
      >
        <v-row align="center" class="edu-search-bar-frame">
          <div class="counter-text"><b>317</b>건</div>
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
        </v-row>
        <v-row justify="center" class="edu-datatable">
          <DataTable />
        </v-row>
        <v-row justify="center" class="edu-pagenation">
          <Pagination />
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
// @ is an alias to /src
import DataTable from "@/components/DataTable.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  components: {
    DataTable,
    Pagination
  },
  data() {
    return {
    };
  },

  created() {
  },
  methods: {
    
  }
};
</script>

