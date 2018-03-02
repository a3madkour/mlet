<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <v-client-table :columns="columns" :data="tableData" :options="options"></v-client-table>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-1">
        <button type="button" class="btn btn-default btn-lg rounded-circle border-dark" @click="show">
            <span class="glyphicon glyphicon-plus" style="font-size:30px;"></span> 
         </button>

      </div>
    </div>
  <modals-container/>
  </div>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';
import ProjectDialog from './ProjectDialog.vue';
import moment from 'moment'
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);
Vue.use(VModal, {dynamic: true});
var unixToDate = function (t) {
  return moment.unix(t).format("YYYY-MM-DD HH:mm");
}

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat sapien sit amet justo molestie, eu fermentum massa iaculis. Vestibulum faucibus fermentum odio ut faucibus. Nullam ut erat vestibulum, congue tortor eu, ornare lorem. Mauris efficitur vestibulum purus, sed commodo metus sollicitudin vitae. Ut id orci mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";

export default {
  components: {},
  data: function () {
    return {
      projectData: {fileTxt:""},
      columns: ['name', 'owner', 'date_of_creation', 'description'],
      tableData: [
        {name:'Project #12', owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #11', owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #10', owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #9',  owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #8',  owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #7',  owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #6',  owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #5',  owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #4',  owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #3',  owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #2',  owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
        {name:'Project #1',  owner:'User #1', date_of_creation:unixToDate(1368457233), description:lorem},
      ],
      options: {
          perPage:5,
          perPageValues: [5, 10, 20],
          sortable: ['name', 'owner', 'date_of_creation'],
          filterable: ['name', 'owner', 'date_of_creation'],
      }
    }
  },
  methods:{
    show(){
      console.log(this.projectData);
      this.$modal.show(ProjectDialog,{projectData: this.projectData}, {name:"first",clickToClose: false,height:"auto", width:"50%"});
    } 
  }
} 
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
