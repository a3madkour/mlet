<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <h2 class='text-left'>Notifications</h2>
        <v-client-table class="dn-table" :columns="nColumns" :data="nTableData" :options="nOptions"></v-client-table>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <h2 class='text-left'>My Experiments</h2>
        <v-client-table class="de-table" :columns="eColumns" :data="eTableData" :options="eOptions">
          <a slot="name" slot-scope="props" href="#/experiments/details">
            <p v-if="props.row.id!=1">Experiment #{{ props.row.id }}</p>
            <p v-else>my_first_exp</p>
          </a>
        </v-client-table>
      </div>

      <div class="col-3">
        <h2 class='text-left'>My Projects</h2>
        <v-client-table class="dp-table" :columns="pColumns" :data="pTableData" :options="pOptions">
          <a slot="name" slot-scope="props" href="#/projects/details">
            <p v-if="props.row.id!=1">Project #{{ props.row.id }}</p>
            <p v-else>SSB_detector</p>
          </a>
        </v-client-table>
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
	nColumns: ['description', 'type', 'time'],
    nTableData: [
      {description:'Experiment  #1 succeeded', type:'Experiment',            time:'Febuary 25, 15:11:04'},
      {description:'Person #1 reuests access to Project #1', type:'Project', time:'Febuary 25, 15:11:04'},
      {description:'Experiment  #2 failed', type:'Experiment',               time:'Febuary 25, 15:11:04'},
      {description:'Experiment  #3 failed', type:'Experiment',               time:'Febuary 25, 15:11:04'},
      {description:'Experiment  #4 failed', type:'Experiment',               time:'Febuary 25, 15:11:04'},
      {description:'Experiment  #5 failed', type:'Experiment',               time:'Febuary 25, 15:11:04'}
    ],
    nOptions: {
        filterable: false,
        perPage:5,
        orderBy: {column: 'time'},
    }
  }
}

// Get the data and options for the Experiments table
var getETableData = function() {
  return {
    eColumns: ['name', 'status'],
    eTableData: [
      {id:10, name:'Experiment #10', status:'Running'},
      {id:9,  name:'Experiment #9',  status:'Running'},
      {id:8,  name:'Experiment #8',  status:'Running'},
      {id:7,  name:'Experiment #7',  status:'Failed'},
      {id:6,  name:'Experiment #6',  status:'Succeeded'},
      {id:5,  name:'Experiment #5',  status:'Succeeded'},
      {id:4,  name:'Experiment #4',  status:'Failed'},
      {id:3,  name:'Experiment #3',  status:'Succeeded'},
      {id:2,  name:'Experiment #2',  status:'Succeeded'},
      {id:1,  name:'Experiment #1',  status:'Failed'},
    ],
    eOptions: {
        filterable: false,
        perPage:10,
        orderBy: {column: 'name'},
    }
  }
}

// Get the data and options for the Project table
var getPTableData = function() {
  return {
    pColumns: ['name'],
    pTableData: [
      {id:10, name:'Project #1'},
      {id:9,  name:'Project #2'},
      {id:8,  name:'Project #3'},
      {id:7,  name:'Project #4'},
      {id:6,  name:'Project #5'},
      {id:5,  name:'Project #6'},
      {id:4,  name:'Project #7'},
      {id:3,  name:'Project #8'},
      {id:2,  name:'Project #9'},
      {id:1,  name:'Project #10'},
    ],
    pOptions: {
        filterable: false,
        perPage:10,
        orderBy: {column: 'name'},
    }
  }
}

</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';

.dn-table tr td:nth-child(n+1):nth-child(-n+3) {
  white-space: nowrap;
}

.de-table tr td:nth-child(n+1):nth-child(-n+2) {
  white-space: nowrap;
}

.dp-table tr td:nth-child(n+1) {
  white-space: nowrap;
}
</style>
