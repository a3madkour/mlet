<template>
  <div class="py-3 container-fluid">
    <div class="row justify-content-end">
      <div class="col-4">
        <ExperimentMetrics/>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <v-client-table :columns="columns" :data="tableData" :options="options">
          <toggle-button slot="notify" 
                         slot-scope="props"
                         :value="false" 
                         color="#82C7EB" 
                         :sync="true" 
                         :labels="true"/>
        </v-client-table>
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-1"
        <AddExperimentButton/>  
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ExperimentMetrics from '../common_components/ExperimentMetrics.vue'
import AddExperimentButton from '../common_components/AddExperimentButton.vue'
import ToggleButton from 'vue-js-toggle-button'
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};

Vue.use(ClientTable, tableOptions);
Vue.use(ToggleButton)

export default {
  components: {ExperimentMetrics, AddExperimentButton},
  data: function () {
    return {
      columns: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status', 'notify'],
      tableData: [
        {start_time:'test', name:'Experiment #25', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #24', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #23', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #22', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #21', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #20', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #19', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #18', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #17', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #16', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #15', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #14', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #13', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #12', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #11', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #10', owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #9',  owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #8',  owner:'User #1', project:'Project #1', run_duration:'1', status:'Running'},
        {start_time:'test', name:'Experiment #7',  owner:'User #1', project:'Project #1', run_duration:'1', status:'Failed'},
        {start_time:'test', name:'Experiment #6',  owner:'User #1', project:'Project #1', run_duration:'1', status:'Succeeded'},
        {start_time:'test', name:'Experiment #5',  owner:'User #1', project:'Project #1', run_duration:'1', status:'Succeeded'},
        {start_time:'test', name:'Experiment #4',  owner:'User #1', project:'Project #1', run_duration:'1', status:'Failed'},
        {start_time:'test', name:'Experiment #3',  owner:'User #1', project:'Project #1', run_duration:'1', status:'Succeeded'},
        {start_time:'test', name:'Experiment #2',  owner:'User #1', project:'Project #1', run_duration:'1', status:'Succeeded'},
        {start_time:'test', name:'Experiment #1',  owner:'User #1', project:'Project #1', run_duration:'1', status:'Failed'},
      ],
      options: {
          perPage:20,
          perPageValues: [10, 20, 50],
          sortable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
          filterable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
      }
    }
  }
} 
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
