<template>
  <div class="py-3 container-fluid">
    <ProjectMetrics></ProjectMetrics>
    <div class="row table-buffer">
      <div class="col-12">
        <v-client-table class="p-table" :columns="columns" :data="tableData" :options="options">
          <router-link slot="name" slot-scope="props" v-bind:to= "{name: 'ProjectDetails', params: {id:props.row._id}}" >{{ props.row.name }}</router-link>
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
import ProjectDialog from './ProjectDialog.vue';
import ProjectMetrics from './ProjectMetrics.vue'
import {ClientTable} from 'vue-tables-2';
import ProjectsService from '@/services/ProjectsService'
let tableOptions = {};
Vue.use(ClientTable, tableOptions);
Vue.use(VModal, {dynamic: true});

export default {
  components: {
    ProjectMetrics,
  },
  data: function () {
    return {
      projectData: {fileTxt:""},
      columns: ['name', 'owner', 'date_of_creation', 'description'],
      tableData: [],
      options: {
          perPage:5,
          perPageValues: [5, 10, 20, 50],
          sortable: ['name', 'owner', 'date_of_creation'],
          filterable: ['name', 'owner', 'date_of_creation'],
          orderBy: {column: 'date_of_creation'},
      }
    }
  },
  created: function() {
    EventBus.$emit('activate_element', 2);
    EventBus.$on('project_dialog_close', this.dialogClosed);
  },
  mounted(){
    this.getProjects();
  },
  methods:{
    show(){
      this.$modal.show(ProjectDialog,{projectData: this.projectData}, {name:"first",clickToClose: false,height:"auto", width:"50%"});
    },
    async getProjects(){
      const response = await ProjectsService.fetchProjects()
      this.tableData = response.data.projects
    },
    dialogClosed(event){
      this.getProjects(); 
    }
  }
} 
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';

.p-table tr td:nth-child(n+1):nth-child(-n+3) {
  white-space: nowrap;
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
