<template>
  <div class="container-fluid">
    <div class="row">
        <v-client-table :columns="columns" :data="tableData" :options="options"></v-client-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);

export default {
  components: {},
  data: function () {
    return {
      columns: ['name', 'status'],
      tableData: [
        {name:'Experiment #10', status:'Running'},
        {name:'Experiment #9',  status:'Running'},
        {name:'Experiment #8',  status:'Running'},
        {name:'Experiment #7',  status:'Failed'},
        {name:'Experiment #6',  status:'Succeeded'},
        {name:'Experiment #5',  status:'Succeeded'},
        {name:'Experiment #4',  status:'Failed'},
        {name:'Experiment #3',  status:'Succeeded'},
        {name:'Experiment #2',  status:'Succeeded'},
        {name:'Experiment #1',  status:'Failed'},
      ],
      options: {
          perPage:25
      }
    }
  }
} 
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
