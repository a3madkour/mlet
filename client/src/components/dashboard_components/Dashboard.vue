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
          <router-link slot="name" slot-scope="props" v-bind:to= "{name: 'ProjectDetails', params: {id:props.row._id}}" >{{ props.row.name }}</router-link>
        </v-client-table>
      </div>
      <div class="col-9">
        <h2 class='text-left'>System Info</h2>
        <SystemInfo></SystemInfo>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import SystemInfo from './SystemInfo';
import UsersService from '@/services/UsersService'
import ProjectsService from '@/services/ProjectsService'
import {ClientTable} from 'vue-tables-2';
let tableOptions = {};
Vue.use(ClientTable, tableOptions);

export default {
  components: {
    SystemInfo,  
  },
  data: function () {
    return{
      nColumns: ['description', 'type', 'time'],
      nTableData: [],
      nOptions: {
        filterable: false,
        perPage:5,
        orderBy: {column: 'time'},
      },
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
  },
  created: function() {
    EventBus.$emit('activate_element', 0);
  },
  methods: {
    async getProjects(){
      const response = await ProjectsService.fetchProjects({'user_name':this.$user});
        this.pTableData = response.data.projects;
    },
    async getUser(){
      const response = await UsersService.getUser({
        id : 111,
        name: this.$user
      })
      this.nTableData = response.data[0].notifications
    }
  },
  mounted: function(){
    this.getUser();
    this.getProjects();
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
