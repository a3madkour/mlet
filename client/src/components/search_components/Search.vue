<template>
<div class="py-3 container-fluid">
  <div class="row">
    <div class="col-12">
      <h1> Search for Experiments or Projects </h1>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <v-client-table class="search-table" :columns="columns" :data="tableData" :options="options">
          <router-link slot="name" slot-scope="props" v-bind:to="{name: detailsBinding[props.row.type], params: {id:props.row._id}}">{{ props.row.name }}</router-link>
      </v-client-table>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import ProjectsService from '@/services/ProjectsService'
import ExperimentsService from '@/services/ExperimentsService'
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);

export default {
  components: {
  },
  data: function () {
    return {
      detailsBinding: {
        Project: 'ProjectDetails', 
        Experiment: 'ExperimentDetails'
      },
      columns: ['type','name', 'owner'],
      tableData: [],
      nOptions: {
        filterable: false,
        perPage:10,
      }
    }
  },
  created: function() {
    EventBus.$emit('activate_element', 4);
    this.getTableData();
  },
  methods: {
    async getTableData(){
      const p_response = await ProjectsService.fetchProjects()
      const e_response = await ExperimentsService.fetchExperiments()

      var projects = p_response.data.projects.map(function (item) {
        var o = Object.assign({}, item);
        o.type = 'Project';
        return o;
      });
      var experiments = e_response.data.experiments.map(function (item) {
        var o = Object.assign({}, item);
        o.type = 'Experiment';
        return o;
      });
      this.tableData = projects.concat(experiments);
    },
  },
}
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
