<template>
  <div class="py-3 container-fluid">
    <div class="row justify-content-end">
      <div class="col-4">
        <ExperimentMetrics :data="metricData"></ExperimentMetrics>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <v-client-table class="e-table" :columns="columns" :data="tableData" :options="options">
          <a slot="name" slot-scope="props" href="#/experiments/details">
            <p >{{ props.row.name}}</p>
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
import ExperimentMetrics from '../common_components/ExperimentMetrics.vue'
import ExperimentsService from '@/services/ExperimentsService'
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
      tableData: [],
      options: {
          perPage:10,
          perPageValues: [10, 20, 50],
          sortable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
          filterable: ['start_time', 'name', 'owner', 'project', 'run_duration', 'status'],
          orderBy: {column: 'start_time'},
      }
    }
  },
  created: function() {
    EventBus.$emit('activate_element', 2);
  },
  mounted(){
      this.getExperiments();
  },
  methods:{
    show(){
      console.log(this.experimentData);
      this.$modal.show(ExperimentDialog,{experimentData: this.experimentData}, {name:"first",clickToClose: false,height:"auto", width:"50%"});
    },
     async getExperiments () {
      const response = await ExperimentsService.fetchExperiments()
      this.tableData = response.data.experiments
    },
  }
} 
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
</style>
