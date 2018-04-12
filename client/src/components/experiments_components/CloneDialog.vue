<template>
  <div class = "dialog" style ="margin:auto; padding-top: 2%;padding-left: 2%;padding-right: 2%;">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="$emit('close')" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div>
      <form class="form-group" @submit='endDialog' >
        <div class="form-group" >
          <label for="userName">Please enter in a name for the new experiment:</label>
          <input type="address" class="form-control" id="name" placeholder="My experiment"v-model="name" required>
        </div>
        <div class = 'buttons'>
          <div style="float:right;" >
              <input type="submit" value="Confirm" class="btn btn-success"  >
          </div>
          <div style="float:left;" >
            <button type="button" class="btn btn-danger" @click="$emit('close')" >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';
import Icon from 'vue-awesome/components/Icon'
import ProjectsService from '@/services/ProjectsService';
import ExperimentsService from '@/services/ExperimentsService';
import UsersService from '@/services/UsersService';
import EventBus from '../../event-bus';
import moment from 'moment'

Vue.use(VModal, {dynamic: true});
export default {
  components: {Icon},
  name: 'cloneDialog',
  props: ['id'],
  mounted(){
    this.getExperiment();
  },
  methods: {
    async getExperiment(){
      const response = await ExperimentsService.getExperiment({
          id: this.$route.params.id
      });
      this.status = response.data.status;
      this.is_exp_running = (this.status === "Running");
      this.owner = response.data.owner;
      this.project_name = response.data.project;
      this.project_id = response.data.project_id;
      this.start_time = response.data.start_time;
      this.parameters = response.data.parameters;
      this.notes = response.data.notes;
      this.terminal_out = response.data.terminal_out;

      const project_response = await ProjectsService.getProject({
          id: this.project_id
      });
      this.project = project_response.data;
    },
    async addExperiment(){
      await ExperimentsService.addExperiment({
        name: this.name,
        description: this.description,
        owner: this.owner,
        project: this.project_name,
        project_id: this.project_id,
        status: this.status,
        tags: this.tags,
        notify: this.notify,
        parameters: this.exp_params,
        notes: this.notes,
        users: this.selectedUsers,
        start_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        run_duration: moment().format('MMMM Do YYYY, h:mm:ss a')
      })
      EventBus.$emit('experiment_dialog_close');
    },
    endDialog(){
      this.addExperiment();
      this.$emit('close')
      this.$notify({group: 'experiment-cloned', type:'success', title: 'Experiment cloned!'});
    },
    async getProjects(){
      const response = await ProjectsService.fetchProjects();
      this.projects = response.data.projects;
    }
  },
  data (){
    return{
      name : '',
      description: '',
      tags : [],
      notify :false,
      status: '',
      project_name: '',
      project_id: '',
      owner: '',
      start_time: null,
      finished_time: null,
      editing_notes: false,
      editing_parameters: false,
      notes: '',
      parameters: []

    }
  }
}
</script>

<style>
.userContainer {
  align:center;
  display:flex;
  border-style:solid;
  background-color: #DCDCDC;
  border-color: #555;
  border-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: center;
}
.ind{
  float:left;
  padding-left: 1%;
  padding-right: 1%;
  text-align: center;
  color: black;
  font-size: 20px;
}
.text{
  padding-left: 1%;
  padding-right: 1%;
  text-align: center;
  color: black;
  font-size: 20px;
  display: block;
}
.active{
  color: #4CAF50;
}
.assigned{
  color: #4CAF50;
}
.close {
  line-height: 12px;
  width: 18px;
  font-size: 20pt;
  font-family: tahoma;
  margin-top: 1px;
  margin-right: 2px;
  position:absolute;
  top:10px;
  right:10px;
}

</style>
