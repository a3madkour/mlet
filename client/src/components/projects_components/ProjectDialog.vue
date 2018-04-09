<template>
  <div class = "dialog" style ="margin:auto; padding-top: 2%;padding-left: 2%;padding-right: 2%;">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="$emit('close')" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div v-if='currentScreen === 0'>
      <form class="form-group" @submit='nextDialog' >
        <div class="form-group" >
          <label for="projectName">Please enter in a name for the project:</label>
          <input type="address" class="form-control" id="name" placeholder="My Project"v-model="name" required>
        </div>
        <div class="form-group">
          <label for="projectDescription">Please enter a brief description of the project:</label>
          <textarea  rows="4" cols="50" type="projectDescription" class="form-control" id="projectDescription" placeholder="..." v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="projectTags">Please enter in comma seprated tags for the project:</label>
          <input type="projectTags" class="form-control" id="projectTags" placeholder="CNNs"v-model="tagString">
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
    <div v-if='currentScreen === 1'>
         <label for="users">Please assign users to the project:</label>
          <div class = "userContainer">
            <div :class = "{active: user.active, ind:true, assigned: user.assigned}"  v-for = "user in users" @click="userClick(user)">
              <icon name="user" scale="2.5"></icon>
              <span :class = "{active: user.active, text:true}" >{{user.name}}</span>
            </div>
          </div>
          <div class ="buttons"> 
            <button class="btn btn-info" style="float:right;" @click="userPermission"> Assign </button>
          </div>
        <div class = 'buttons'>
          <div style="float:right;" >
              <input type="submit" value="Next" class="btn btn-primary" @click='nextDialog'  >
          </div>
          <div style="float:left;" >
            <button type="button" class="btn btn-primary" @click="previousDialog" >
              Back
            </button>
          </div>
        </div>
    </div>
    <div v-if='currentScreen === 2'>
      <form class="form-group" @submit='nextDialog' >
        <div class="form-group" >
          <label for="repo">Please enter in the git repository for the project:</label>
          <input type="repo" class="form-control" id="repo" placeholder=" "v-model="repo" required>
        </div>
        <div class="form-group" >
          <label for="executable">Please enter in the git executable to be run:</label>
          <input type="executable" class="form-control" id="executable" placeholder=" "v-model="executable" required>

        </div>
        <div class = 'buttons'>
          <div style="float:right;" >
              <input type="submit" value="Next" class="btn btn-primary"  >
          </div>
          <div style="float:left;" >
            <button type="button" class="btn btn-primary" @click="previousDialog" >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-if='currentScreen === 3'>
      <form class="form-group" @submit='nextDialog' >
        <div class="form-group" >
          <label for="parametersFile">Please select a file for parameter format:</label>
          <input type="file" @change="onFileChange"> 
        </div>
        <div class="form-group" >
          <textarea  type="parameterFile" class="form-control" id="parameterFile" placeholder=" " v-model="parameterFile" required></textarea>
        </div>
        <div class = 'buttons'>
          <div style="float:right;" >
              <input type="submit" value="Next" class="btn btn-primary"  >
          </div>
          <div style="float:left;" >
            <button type="button" class="btn btn-primary" @click="previousDialog" >
              Back
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-if='currentScreen === 4'>
      <form class="form-group" @submit='endDialog' >
        <div class="form-group" >
          <label for="projectName">Name:</label>
          <input type="address" class="form-control"  id="projectName" placeholder="My Project"v-model="name" required>
        </div>
        <div class="form-group">
          <label for="projectDescription">Description:</label>
          <textarea  rows="4" cols="50" type="projectDescription" class="form-control" id="projectDescription" placeholder="" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="projectTags">Tags:</label>
          <input type="projectTags"id="projectTags" class="form-control" v-model="tagString">
        </div>
        <div class="form-group">
          <label for="projectTags">Users:</label>
            <div class = "userContainer">
              <div class = "ind"  v-for = "user in selectedAll" >
                <icon name="user" scale="2.5"></icon>
                <span class ="text" >{{user.name}}</span>
              </div>
            </div>
        </div>
        <div class="form-group">
          <label for="parameterFile" >Input Spec:</label>
          <input type="parameterFile"id="projectTags" class="form-control" v-model="parameterFile" required>
        </div>
        <div class="form-group" >
          <label for="executable">Executable path:</label>
          <input type="executable" class="form-control" id="executable" placeholder=" "v-model="executable" required>
        </div>
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
import UserPermissions from './UserPermissions.vue';
import Icon from 'vue-awesome/components/Icon'
import ProjectsService from '@/services/ProjectsService';
import UsersService from '@/services/UsersService';
import EventBus from '../../event-bus';
import moment from 'moment';
Vue.use(VModal, {dynamic: true});
export default {
  components: {Icon},
  name: 'projectDialog',
  props: ['projectData'],
  methods: {
    nextDialog : function(){
      this.currentScreen += 1;
      if(this.currentScreen == 1){
        this.getUsers();
      }
    },
    previousDialog : function(){
      this.currentScreen -= 1;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.parameterFile = e.target.result;
      };
      reader.readAsText(file);
    },
    endDialog(){
      this.addProject()
      this.$emit('close')
      this.$notify({group: 'project-created', type:'success', title: 'Project created!'});
    },
    userPermission(){
      if(this.selected.length > 0){
          this.$modal.show(UserPermissions,{users: this.selected, name:"second",selectedUsers:this.selectedUsers}, {name:"second",clickToClose: false,height:"auto", width:"50%"});
      }
    },
    async addProject(){
      this.tags = this.tagString.split(',')
      const response = await ProjectsService.addProject({
          name:this.name,
          description: this.description,
          owner: this.owner,
          date_of_creation: moment().format('MMMM Do YYYY, h:mm:ss a'),
          users: this.selectedUsers
      })
      EventBus.$emit('project_dialog_close'); 
      this.getProject();
    },
    async getUsers(){
      const response = await UsersService.fetchUsers();
      var users = []
      for(var i = 0 ; i<response.data.users.length;i++){
        var user = {};
        user.name = response.data.users[i].name;
        user._id = response.data.users[i]._id;
        user.active = false;
        user.assigned = false;
        users.push(user)
      }
      this.users = users;
    },
    async getProject(){
      const response = await ProjectsService.fetchProjects({'project_name':this.name})
      this._id = response.data.projects._id
      this.updateUser();
    },
    async updateUser(){
      for (var i = 0 ; this.selectedUsers.length;i++){
        this.index = i
        if(typeof this.selectedUsers[i].projects === "undefined"){
            console.log('undefined baby')
            this.selectedUsers[i].projects = []
        }
        this.selectedUsers[i].projects.push({'name':this.name,'_id':this._id})
        await UsersService.updateUser({
          id: this.selectedUsers[this.index]._id,
          projects: this.selectedUsers[this.index].projects
        });
      }
      this.index = 0;
        
    },
    userClick(user){
        
        this.users[this.users.indexOf(user)].active = !this.users[this.users.indexOf(user)].active;
        if(this.selected.indexOf(user.name) <0 ){
            this.selected.push(user.name);
            this.selectedAll.push(user);
            this.selectedUsers.push({name: user.name, permissions: user.permissions,_id:user._id});
        }else{
            this.selected = this.selected.filter(item => item !== user.name)
            this.selectedAll = this.selectedAll.filter(item => item !== user)
            this.selectedUsers = this.selectedUsers.filter(item => item !== {name: user.name, permissions: user.permissions, _id:user._id})
        }
    }
  },
  data (){
    return{currentScreen : 0, 
    users: [], 
    selected:[],
    selectedUsers:[],
    selectedAll:[],
    name : '',
    owner : this.$user ,
    repo: '',
    executable:'',
    index:0,
    tagString: '',
    tags: [],
    description: '',
    parameterFile: ''
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
