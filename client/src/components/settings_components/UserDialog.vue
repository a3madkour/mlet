<template>
  <div class = "dialog" style ="margin:auto; padding-top: 2%;padding-left: 2%;padding-right: 2%;">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="$emit('close')" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div v-if="currentScreen == 0" >
      <form class="form-group" @submit='nextDialog' >
        <div class="form-group" >
          <label for="userName">Please enter in a name for the user:</label>
          <input type="address" class="form-control" id="name" placeholder="User"v-model="name" required>
        </div>
        <div class="form-group">
          <label for="userPassword">Please enter in password for the user:</label>
          <input  rows="4" cols="50" type="password" class="form-control" id="userPassword"  v-model="password" required></input>
        </div>
        <div class = 'buttons'>
          <div style="float:right;" >
              <input type="submit" value="Next" class="btn btn-primary"  >
          </div>
          <div style="float:left;" >
            <button type="button" class="btn btn-danger" @click="$emit('close')" >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-if="currentScreen == 1" >
      <form class="form-group" @submit='endDialog' >    
        <div class="form-group">
          <label for="userProjects">Please select the project(s) for the user:</label>
        </div >
        <select v-model="selectedProjects" class="form-control" multiple>
          <option v-for="project in projects" :value="project" >{{project.name}}</option>
        </select>
        <div class = 'buttons'>
          <div style="float:right;" >
              <input type="submit" value="Confirm" class="btn btn-success"  >
          </div>
          <div style="float:left;" >
            <button type="button" class="btn btn-primary" @click="previousDialog" >
              Back
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
import UsersService from '@/services/UsersService';
import EventBus from '../../event-bus';

Vue.use(VModal, {dynamic: true});
export default {
  components: {Icon},
  name: 'userDialog',
  props: [],
  methods: {
    nextDialog : function(){
      this.currentScreen += 1;
      if(this.currentScreen == 1){
        this.getProjects();
      }
    },
    previousDialog : function(){
      this.currentScreen -= 1;
    },
    endDialog(){
      this.addUser()
      this.$emit('close')
      this.$notify({group: 'user-created', type:'success', title: 'User created!'});
    },
    async addUser(){
      await UsersService.addUser({
          name:this.name,
          password: this.password,
          projects: this.projects
      })
      EventBus.$emit('user_dialog_close'); 
    },
    async getProjects(){
      const response = await ProjectsService.fetchProjects();
      this.projects = response.data.projects;
    }
  },
  data (){
    return{
      currentScreen : 0, 
      projects: [],
      selectedProjects:[],
      name : '',
      password: ''
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
