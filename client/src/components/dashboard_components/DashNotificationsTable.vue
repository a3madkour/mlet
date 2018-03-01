<template>
  <div id="dash-notifications-table">
    <v-client-table :columns="columns" :data="tableData" :options="options"></v-client-table>
  </div>
</template>

<script>
import Vue from 'vue';
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);

export default {
  data: function () {
    return {
	  columns: ['description', 'type', 'date'],
      tableData: [
        {id: 1, description:'Experiment  #1 succeeded', type:'Experiment', date:'Date #1'},
        {id: 2, description:'Person #1 reuests access to Project #1', type:'Project', date:'Date #2'},
        {id: 3, description:'Experiment  #2 failed', type:'Experiment', date:'Date #3'},
        {id: 4, description:'Experiment  #3 failed', type:'Experiment', date:'Date #4'},
        {id: 5, description:'Experiment  #4 failed', type:'Experiment', date:'Date #5'},
        {id: 6, description:'Experiment  #5 failed', type:'Experiment', date:'Date #6'}
      ],
      options: {
          filterable: false,
          perPage:5
      }
    }
  }
}
</script>
