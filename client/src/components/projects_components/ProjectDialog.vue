<template>
  <div class = "dialog" style ="margin:auto; padding-top: 2%;padding-left: 2%;padding-right: 2%;">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="$emit('close')" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div v-if='currentScreen === 0'>
      <div class="form-group" >
        <label for="projectName">Please enter in a name for the project:</label>
        <input type="address" class="form-control" id="projectName" placeholder="My Project"v-model="projectData.name" required>
      </div>
      <div class="form-group">
        <label for="projectDescription">Please enter a brief description of the project:</label>
        <textarea  rows="4" cols="50" type="projectDescription" class="form-control" id="projectDescription" placeholder="..." v-model="projectData.description"></textarea>
      </div>
      <div class="form-group">
        <label for="projectTags">Please enter in comma seprated tags for the project:</label>
        <input type="projectTags" class="form-control" id="projectTags" placeholder="CNNs"v-model="projectData.tagString">
      </div>
    </div>
    <div v-if='currentScreen === 1'>
       <label for="repo">Please assign users to the project:</label>
        <div class = "userContainer">
          <div :class = "{active: user.active, ind:true, assigned: user.assigned}"  v-for = "user in users" @click="userClick(user)">
            <icon name="user" scale="2.5"></icon>
            <span :class = "{active: user.active, text:true}" >{{user.name}}</span>
          </div>
        </div>
        <div class ="buttons"> 
          <button class="btn btn-info" style="float:right;" @click="userPermission"> Assign </button>
        </div>
    </div>
    <div v-if='currentScreen === 2'>
      <div class="form-group" >
        <label for="repo">Please enter in the git repository for the project:</label>
        <input type="repo" class="form-control" id="repo" placeholder=" "v-model="projectData.repo">
      </div>
      <div class="form-group" >
        <label for="executable">Please enter in the git executable to be run:</label>
        <input type="executable" class="form-control" id="executable" placeholder=" "v-model="projectData.executable">

      </div>
    </div>

    <div v-if='currentScreen === 3'>
      <div class="form-group" >
        <label for="parametersFile">Please select a file for parameter format:</label>
        <input type="file" @change="onFileChange"> 
      </div>
      <div class="form-group" >
        <textarea  type="fileTxt" class="form-control" id="fileTxt" placeholder=" " v-model="projectData.fileTxt"></textarea>
      </div>
    </div>

    <div v-if='currentScreen === 4'>
      <div class="form-group" >
        <label for="projectName">Name:</label>
        <input type="address" class="form-control"  id="projectName" placeholder="My Project"v-model="projectData.name">
      </div>
      <div class="form-group">
        <label for="projectDescription">Description:</label>
        <textarea  rows="4" cols="50" type="projectDescription" class="form-control" id="projectDescription" placeholder="" v-model="projectData.description"></textarea>
      </div>
      <div class="form-group">
        <label for="projectTags">Tags:</label>
        <input type="projectTags"id="projectTags" class="form-control" v-model="projectData.tagString">
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
        <label for="fileName" >Input Spec:</label>
        <input type="fileName"id="projectTags" class="form-control" v-model="projectData.fileName">
      </div>
      <div class="form-group" >
        <label for="executable">Executable path:</label>
        <input type="executable" class="form-control" id="executable" placeholder=" "v-model="projectData.executable">
      </div>
    </div>
        <div class = 'buttons'>
      <div v-if='currentScreen === 0'style="float:left;" >
        <button type="button" class="btn btn-danger" @click="$emit('close')" >
          Cancel 
        </button>
      </div>
      <div v-if='currentScreen != 0'style="float:left;" >
        <button type="button" class="btn btn-primary" @click="previousDialog" >
          Back
        </button>
      </div>
      <div v-if='currentScreen != 4' style="float:right;" >
        <button type="button" class="btn btn-primary" @click=nextDialog >
          Next 
        </button>
      </div>
      <div v-if='currentScreen === 4'style="float:right;" >
        <button type="button" class="btn btn-success" @click=endDialog>
          Confirm
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';
import UserPermissions from './UserPermissions.vue';
import Icon from 'vue-awesome/components/Icon'
Vue.use(VModal, {dynamic: true});
export default {
  components: {Icon},
  name: 'projectDialog',
  props: ['projectData'],
  methods: {
    nextDialog : function(){
      this.currentScreen += 1;
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
        vm.projectData.fileTxt = e.target.result;
      };
      reader.readAsText(file);
    },
    endDialog(){
      this.$emit('close')
      this.$notify({group: 'project-created', type:'success', title: 'Project created!'});
    },
    userPermission(){
      if(this.selected.length > 0){
          this.$modal.show(UserPermissions,{users: this.selected, name:"second"}, {name:"second",clickToClose: false,height:"auto", width:"50%"});
      }
    },
    userClick(user){
        
        this.users[this.users.indexOf(user)].active = !this.users[this.users.indexOf(user)].active;
        if(this.selected.indexOf(user.name) <0 ){
            this.selected.push(user.name);
            this.selectedAll.push(user);
        }else{
            this.selected.splice(this.selected.indexOf(user.name));
            this.selectedAll.splice(this.selected.indexOf(user));
        }
        console.log(this.selected);
    }
  },
  data (){
    return{currentScreen : 0, 
    users: [{name:"Jack", active:false,assigned:false, permissions : []},{name:"User", active:false,assigned:false, permissions : []}, {name:"Jill", active:false, assigned:false,permissions : []}], 
    selected:[],
    selectedAll:[]
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
</style>
