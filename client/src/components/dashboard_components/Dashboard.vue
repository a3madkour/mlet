<template>
  <div class="py-3 container-fluid">
    <div class="row">
      <div class="col-12">
        <h2 class='text-left'>Notifications</h2>
        <v-client-table class="dn-table" :columns="nColumns" :data="nTableData" :options="nOptions"></v-client-table>
      </div>
    </div>

    <div class="row">
      <div class="col-3">
        <h2 class='text-left'>My Projects</h2>
        <v-client-table class="dp-table" :columns="pColumns" :data="pTableData" :options="pOptions">
          <a slot="name" slot-scope="props" href="#/projects/details">
            <p v-if="props.row.id!=1">Project #{{ props.row.id }}</p>
            <p v-else>SSB_detector</p>
          </a>
        </v-client-table>
      </div>

      <div class="col-2">

      </div>

      <div class="col-7">
        <h2 class='text-left'>System Info</h2>
        <img src="./systems_info.png" class="rounded img-fluid">
        <img src="./systems_info.png" class="rounded img-fluid">
        <p><b>Note:</b> This is a temp image for the prototype</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);

export default {
  components: {},
  data: function () {
    return Object.assign({}, getNTableData(), getPTableData())
  },
  created: function() {
    EventBus.$emit('activate_element', 0);
  },
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

// Get the data and options for the Project table
var getPTableData = function() {
  return {
    pColumns: ['name'],
    pTableData: [
      {id:2, name:'Project #2'},
      {id:1, name:'Project #1'},
    ],
    pOptions: {
        filterable: false,
        perPage:5,
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
