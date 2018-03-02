<template>
  <div class="py-3 container-fluid">
    <div class="row justify-content-end">
      <div class="col-4">
        <ExperimentMetrics :data="metricData"></ExperimentMetrics>
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
                         :labels="true"
                         class="toggle"/>
        </v-client-table>
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
import ExperimentDialog from './ExperimentDialog.vue';
import moment from 'moment'
import ExperimentMetrics from '../common_components/ExperimentMetrics.vue'
import ToggleButton from 'vue-js-toggle-button'
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};

Vue.use(ClientTable, tableOptions);
Vue.use(ToggleButton)
Vue.use(VModal, {dynamic: true});
var unixToDate = function (t) {
  return moment.unix(t).format("YYYY-MM-DD HH:mm");
}

var durationFrom = function (t) {
  var diff = moment().unix() - moment(t).unix();
  return moment.unix(diff).format("DD HH:mm:ss.SSS");
}

var now = moment().unix();
var noDuration = "00 00:00:00.000";

export default {
  components: {ExperimentMetrics},
  data: function () {
    return {
      experimentData: {fileTxt : ""},
      metricData: [{queued: '4', running: '10', completed: '8', failed: '4'}],
      columns: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status', 'notify'],
      tableData: [
        {start_time:unixToDate(1368457233), name:'Experiment #25', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {start_time:unixToDate(1368457233), name:'Experiment #24', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {start_time:unixToDate(now),        name:'Experiment #23', owner:'User #1', project:'Project #1', run_duration:noDuration,               status:'Queued'},
        {start_time:unixToDate(1368457233), name:'Experiment #22', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {start_time:unixToDate(1368457233), name:'Experiment #21', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {start_time:unixToDate(1368457233), name:'Experiment #20', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {start_time:unixToDate(now),        name:'Experiment #19', owner:'User #1', project:'Project #1', run_duration:noDuration,               status:'Queued'},
        {start_time:unixToDate(1368457233), name:'Experiment #18', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {start_time:unixToDate(1368457233), name:'Experiment #17', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {start_time:unixToDate(now),        name:'Experiment #16', owner:'User #1', project:'Project #1', run_duration:noDuration,               status:'Queued'},
        {start_time:unixToDate(now),        name:'Experiment #15', owner:'User #1', project:'Project #1', run_duration:noDuration,               status:'Queued'},
        {start_time:unixToDate(1368457233), name:'Experiment #14', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {start_time:unixToDate(1368457233), name:'Experiment #13', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {start_time:unixToDate(1368457233), name:'Experiment #12', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {start_time:unixToDate(1368457233), name:'Experiment #11', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {start_time:unixToDate(1368457233), name:'Experiment #10', owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {start_time:unixToDate(1368457233), name:'Experiment #9',  owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {start_time:unixToDate(1368457233), name:'Experiment #8',  owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Failed'},
        {start_time:unixToDate(1368457233), name:'Experiment #7',  owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Failed'},
        {start_time:unixToDate(1368457233), name:'Experiment #6',  owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {start_time:unixToDate(1368457233), name:'Experiment #5',  owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {start_time:unixToDate(1368457233), name:'Experiment #4',  owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Failed'},
        {start_time:unixToDate(1368457233), name:'Experiment #3',  owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {start_time:unixToDate(1368457233), name:'Experiment #2',  owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {start_time:unixToDate(1368457233), name:'Experiment #1',  owner:'User #1', project:'Project #1', run_duration:durationFrom(1368457233), status:'Failed'},
      ],
      options: {
          perPage:10,
          perPageValues: [10, 20, 50],
          sortable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
          filterable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
      }
    }
  },
  methods:{
        show(){
          console.log(this.experimentData);
          this.$modal.show(ExperimentDialog,{experimentData: this.experimentData}, {name:"first",clickToClose: false,height:"auto", width:"50%"});
        } 
      }
} 
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';

.toggle {
  display:block;
}
</style>
