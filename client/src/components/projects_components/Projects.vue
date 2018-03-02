<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <v-client-table :columns="columns" :data="tableData" :options="options"></v-client-table>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-1"
        <AddProjectButton/>  
      </div>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import AddProjectButton from '../common_components/AddProjectButton.vue'

import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat sapien sit amet justo molestie, eu fermentum massa iaculis. Vestibulum faucibus fermentum odio ut faucibus. Nullam ut erat vestibulum, congue tortor eu, ornare lorem. Mauris efficitur vestibulum purus, sed commodo metus sollicitudin vitae. Ut id orci mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";

export default {
  components: {AddProjectButton},
  data: function () {
    return {
      columns: ['name', 'owner', 'date_of_creation', 'description'],
      tableData: [
        {name:'Project #12', owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #11', owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #10', owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #9',  owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #8',  owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #7',  owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #6',  owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #5',  owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #4',  owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #3',  owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #2',  owner:'User #1', date_of_creation:'1', description:lorem},
        {name:'Project #1',  owner:'User #1', date_of_creation:'1', description:lorem},
      ],
      options: {
          perPage:5
      }
    }
  }
} 
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
