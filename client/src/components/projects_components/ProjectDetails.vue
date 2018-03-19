<template>
<div class="py-3 project-details container-fluid">
  <div class="row">
    <div class="col-1">
      <a class="back" href="#/projects" title="Back">
        <icon name="caret-left" scale="5.0"></icon>
      </a>
    </div>
    <div class="col">
      <h1 class="float-left">SSB_detector</h1>
    </div>
  </div>
  <div class="row">
    <div class="col-8">
      <div class="card" align="left">
        <div class="card-body">
          <p class="card-text-1"><b>Owner:</b> User #1</p>
          <p class="card-text-2"><b>Created On:</b> February 15, 2018</p>
          <p class="card-text-3"><b>Description:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat sapien sit amet justo molestie, eu fermentum massa iaculis. Vestibulum faucibus fermentum odio ut faucibus. Nullam ut erat vestibulum, congue tortor eu, ornare lorem. Mauris efficitur vestibulum purus, sed commodo metus sollicitudin vitae. Ut id orci mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        </div>
      </div>
    </div>
    <div class="col-4">
      <ExperimentMetrics :data="metricData"></ExperimentMetrics>
    </div>
  </div>
  <div class="row top-buffer">
    <div class="col-12">
        <v-client-table class="e-table" :columns="columns" :data="tableData" :options="options">
          <a slot="name" slot-scope="props" href="#/experiments/details">
            <p v-if="props.row.id!=1">Experiment #{{ props.row.id }}</p>
            <p v-else>my_first_exp</p>
          </a>
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
    <div class="col-1"
      <div class="col-1">
        <button type="button" class="btn btn-default btn-lg rounded-circle border-dark" @click="show">
            <span class="glyphicon glyphicon-plus" style="font-size:30px;"></span> 
         </button>
      </div>
    </div>
      <modals-container/>
  </div>

</div>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';
import moment from 'moment'
import Icon from 'vue-awesome/components/Icon'
import ExperimentMetrics from '../common_components/ExperimentMetrics.vue'
import ExperimentDialog from '../experiments_components/ExperimentDialog.vue';
import ToggleButton from 'vue-js-toggle-button'
import {ClientTable} from 'vue-tables-2';
Vue.use(VModal, {dynamic: true});
let tableOptions = {};

Vue.use(ClientTable, tableOptions);
Vue.use(ToggleButton)

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
  components: {Icon, ExperimentMetrics},
  data: function () {
    return {
      experimentData: {fileTxt : ""},
      metricData: [{queued: '4', running: '10', completed: '8', failed: '4'}],
      columns: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status', 'notify'],
      tableData: [
        {id:25, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {id:24, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {id:23, start_time:unixToDate(now),         owner:'User', project:'Project #1', run_duration:noDuration,               status:'Queued'},
        {id:22, start_time:unixToDate(1368457233),  owner:'Jill', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {id:21, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {id:20, start_time:unixToDate(1368457233),  owner:'John', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {id:19, start_time:unixToDate(now),         owner:'User', project:'Project #1', run_duration:noDuration,               status:'Queued'},
        {id:18, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {id:17, start_time:unixToDate(1368457233),  owner:'John', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {id:16, start_time:unixToDate(now),         owner:'Jill', project:'Project #1', run_duration:noDuration,               status:'Queued'},
        {id:15, start_time:unixToDate(now),         owner:'User', project:'Project #1', run_duration:noDuration,               status:'Queued'},
        {id:14, start_time:unixToDate(1368457233),  owner:'John', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {id:13, start_time:unixToDate(1368457233),  owner:'John', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {id:12, start_time:unixToDate(1368457233),  owner:'John', project:'Project #1', run_duration:durationFrom(1368457233), status:'Running'},
        {id:11, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {id:10, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {id:9, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {id:8, start_time:unixToDate(1368457233),  owner:'Jill', project:'Project #1', run_duration:durationFrom(1368457233), status:'Failed'},
        {id:7, start_time:unixToDate(1368457233),  owner:'Kill', project:'Project #1', run_duration:durationFrom(1368457233), status:'Failed'},
        {id:6, start_time:unixToDate(1368457233),  owner:'Jill', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {id:5, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {id:4, start_time:unixToDate(1368457233),  owner:'John', project:'Project #1', run_duration:durationFrom(1368457233), status:'Failed'},
        {id:3, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {id:2, start_time:unixToDate(1368457233),  owner:'John', project:'Project #1', run_duration:durationFrom(1368457233), status:'Completed'},
        {id:1, start_time:unixToDate(1368457233),  owner:'User', project:'Project #1', run_duration:durationFrom(1368457233), status:'Failed'},
      ],
      options: {
          perPage:10,
          perPageValues: [10, 20, 50],
          sortable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
          filterable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
          orderBy: {column: 'start_time'},
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

.project-details h1 {
  color: black;
  font-size: 64px;
}

.project-details .back {
  display: block;
  text-align: center;
  transition: all 0.3s ease;
  color: black;
  font-size: 36px;
}

.top-buffer { 
  margin-top:20px; 
}

.e-table tr td:nth-child(n+1):nth-child(-n+6) {
  white-space: nowrap;
}

.e-table tr tf:nth-child(n+7) {
  width: 25px;
}

</style>
