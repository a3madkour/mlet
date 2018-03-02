<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <h2 class='text-left'>Notifications</h2>
        <v-client-table :columns="nColumns" :data="nTableData" :options="nOptions"></v-client-table>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <h2 class='text-left'>My Experiments</h2>
        <v-client-table :columns="eColumns" :data="eTableData" :options="eOptions"></v-client-table>
      </div>

      <div class="col-3">
        <h2 class='text-left'>My Projects</h2>
        <v-client-table :columns="pColumns" :data="pTableData" :options="pOptions"></v-client-table>
      </div>

      <div class="col-3">
        <h2 class='text-left'>System Info</h2>
        <img src="./systems_info.png" class="rounded img-fluid">
        <p><b>Note:</b> This is a temp image for the prototype</p>
      </div>
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
    return Object.assign({}, getNTableData(), getETableData(), getPTableData())
  }
}

// Get the data and options for the Notifications table
var getNTableData = function() {
  return {
	nColumns: ['description', 'type', 'date'],
    nTableData: [
      {description:'Experiment  #1 succeeded', type:'Experiment', date:'Date #1'},
      {description:'Person #1 reuests access to Project #1', type:'Project', date:'Date #2'},
      {description:'Experiment  #2 failed', type:'Experiment', date:'Date #3'},
      {description:'Experiment  #3 failed', type:'Experiment', date:'Date #4'},
      {description:'Experiment  #4 failed', type:'Experiment', date:'Date #5'},
      {description:'Experiment  #5 failed', type:'Experiment', date:'Date #6'}
    ],
    nOptions: {
        filterable: false,
        perPage:5
    }
  }
}

// Get the data and options for the Experiments table
var getETableData = function() {
  return {
    eColumns: ['name', 'status'],
    eTableData: [
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
    eOptions: {
        filterable: false,
        perPage:10
    }
  }
}

// Get the data and options for the Project table
var getPTableData = function() {
  return {
    pColumns: ['name'],
    pTableData: [
      {name:'Project #1'},
      {name:'Project #2'},
      {name:'Project #3'},
      {name:'Project #4'},
      {name:'Project #5'},
      {name:'Project #6'},
      {name:'Project #7'},
      {name:'Project #8'},
      {name:'Project #9'},
      {name:'Project #10'},
    ],
    pOptions: {
        filterable: false,
        perPage:10
    }
  }
}

</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
