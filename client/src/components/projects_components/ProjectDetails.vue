<template>
<div class="py-3 project-details container-fluid">
  <div class="row">
    <div class="col-1">
      <a class="back" href="#/projects" title="Back">
        <icon name="caret-left" scale="5.0"></icon>
      </a>
    </div>
    <div class="col">
      <h1 class="float-left">{{this.name}}</h1>
    </div>
  </div>
  <div class="row mh1">
    <div class="col-8">
      <div class="card" align="left">
        <div class="card-body">
          <p class="card-text-1"><b>Owner:</b> {{this.owner}} </p>
          <p class="card-text-2"><b>Created On:</b> {{this.date_of_creation}}</p>
          <p class="card-text-3"><b>Description:</b> {{this.description}} </p>
        </div>
      </div>
    </div>
    <div class="col-4">
      <ExperimentsPieChart :data="metricData"></ExperimentsPieChart>
    </div>
  </div>
  <div class="row table-buffer">
    <div class="col-12">
        <v-client-table class="e-table" :columns="columns" :data="tableData" :options="options">
          <router-link slot="name" vbind:to = "{name: 'ExperimentDetails', params: {id: props.row.id}}"slot-scope="props">
            <p v-if="props.row.id!=1">Experiment #{{ props.row.id }}</p>
            <p v-else>my_first_exp</p>
          </router-link>
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
  <div class="add-button">
    <button type="button" class="btn btn-default btn-lg rounded-circle border-dark" @click="show">
      <span class="glyphicon glyphicon-plus" style="font-size:30px;"></span> 
    </button>
  </div>
  <modals-container/>
</div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import VModal from 'vue-js-modal';
import moment from 'moment'
import Icon from 'vue-awesome/components/Icon'
import ExperimentsPieChart from '../common_components/ExperimentsPieChart.vue'
import HelpModal from '../common_components/help_modal.vue';
import ExperimentDialog from '../experiments_components/ExperimentDialog.vue';
import ToggleButton from 'vue-js-toggle-button'
import ProjectsService from '@/services/ProjectsService'
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
  name: 'ProjectDetails',
  components: {
    Icon, 
    ExperimentsPieChart,
    HelpModal,  
  },
  data: function () {
    return {
      experimentData: {fileTxt : ""},
      name: 'SSB_Detector',
      owner: 'User #1',
      description: '',
      date_of_creation: now ,
      metricData: [4, 10, 8, 4],
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
          perPage:5,
          perPageValues: [5, 10, 20, 50],
          sortable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
          filterable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
          orderBy: {column: 'start_time'},
          headings: {notify: function (h) { 
            return <div style="display: table;">
                     <div style="display: table-cell; float: left; vertical-align: bottom;">Notify</div>
                     <div style="display: table-cell; float: left; vertical-align: bottom;">
                       <button type="button" class="btn btn-default btn-sm" style="float: right;" on-click={ () => this.showHelp() } >
                         <span class="glyphicon glyphicon-question-sign" style="font-size:15px;"></span> 
                       </button>
                     </div>
                   </div>
           }
          },
      }

	 }
  }, 
  created: function() {
    EventBus.$emit('activate_element', 2);
  },
  mounted(){
    console.log(this.$route)
    this.getProject(); 
  },
  methods:{
    show(){
      console.log(this.experimentData);
      this.$modal.show(ExperimentDialog,{experimentData: this.experimentData}, {name:"first",clickToClose: false,height:"auto", width:"50%"});
    },
    showHelp: function () {
      this.$modal.show(HelpModal, {header_text:"Experiment Notifications", help_text:notify_explanation, clickToClose: false, height:"auto", width:"50%"});
    },
    async getProject(){
      console.log(this.$route.params.id)
      const response = await ProjectsService.getProject({
          id: this.$route.params.id
      })
      this.name = response.data.name;
      this.owner = response.data.owner;
      this.description = response.data.description;
      this.date_of_creation = response.data.date_of_creation;
    }
  }
}

var notify_explanation = `This slider allows you to set which experiments you want to be notified of when they complete running. By default you are already set
to be notified when your own experiments complete but this allows you to opt in to watch experiments you find important. More notificatin options can be found
in Settings`;
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

.table-buffer { 
  margin-top:20px; 
}

.e-table tr td:nth-child(n+1):nth-child(-n+6) {
  white-space: nowrap;
}

.e-table tr tf:nth-child(n+7) {
  width: 25px;
}

.add-button {
 position: fixed;
 bottom: 10px;
 right: 10px;
}

.mh1 div {
  height: 30vh;
}

.table-buffer {
  margin-top: 75px;
}
</style>
