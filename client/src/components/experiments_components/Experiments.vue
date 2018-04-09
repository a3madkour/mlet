<template>
  <div class="py-3 container-fluid">
    <ExperimentMetrics></ExperimentMetrics> 
    <div class="row table-buffer">
      <div class="col-12">
        <v-client-table class="e-table" :columns="columns" :data="tableData" :options="options">
          <router-link v-bind:to="{name: 'ExperimentDetails', params: {id : props.row._id}}" slot="name" slot-scope="props">
            <p >{{ props.row.name}}</p>
          </router-link>
          <toggle-button slot="notify" 
                         slot-scope="props"
                         v-model="tableData[props.index-1].notify"
                         color="#82C7EB" 
                         :sync="true" 
                         :labels="true"
                         class="toggle" @change="toggleChange" />
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
import ExperimentDialog from './ExperimentDialog.vue';
import moment from 'moment'
import ExperimentMetrics from './ExperimentMetrics.vue'
import ExperimentsService from '@/services/ExperimentsService'
import HelpModal from '../common_components/help_modal.vue';
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
  components: {
    ExperimentMetrics,
    HelpModal,
  },
  data: function () {
    return {
      index : 0,
      experimentData: {fileTxt : ""},
      columns: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status', 'notify'],
      tableData: [],
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
    EventBus.$emit('activate_element', 3);
    EventBus.$on('experiment_dialog_close', this.dialogClosed);
  },
  mounted(){
      this.getExperiments();     
  },
  beforeDestroy: function() {
    EventBus.$off('experiment_dialog_close', this.activate_el);
  },
  methods:{
    toggleChange(e){
      this.updateExperiment();
    },
    async updateExperiment(){
      for(var i = 0; this.tableData.length;i++){
        this.index = i
        await ExperimentsService.updateExperiment({
          id:this.tableData[this.index]._id,
          notify: this.tableData[this.index].notify
        });
      }
      this.index = 0
    },
    show(){
      this.$modal.show(ExperimentDialog,{}, {name:"first",clickToClose: false,height:"auto", width:"50%"});
    },
    async getExperiments () {
      const response = await ExperimentsService.fetchExperiments()
      this.tableData = response.data.experiments
    },
    showHelp: function () {
      this.$modal.show(HelpModal, {header_text:"Experiment Notifications", help_text:notify_explanation},{ clickToClose: false,height:"auto"});

    },
    dialogClosed: function(event){
      this.getExperiments();
      
    }
  }
} 

var notify_explanation = `This slider allows you to set which experiments you want to be notified of when they complete running. By default you are already set
to be notified when your own experiments complete but this allows you to opt in to watch experiments you find important. More notification options can be found
in Settings`;
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';

.toggle {
  display:block;
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

.table-buffer {
  margin-top: 75px;
}
</style>
