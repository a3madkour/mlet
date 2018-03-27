<template>
  <div class = "dialog" style ="margin:auto; padding-top: 2%;padding-left: 2%;padding-right: 2%;">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="closeDialog" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div v-if='currentScreen === 0'>
      <form class="form-group" @submit='nextDialog' >
        <div class="form-group">
          <label for="experimentName">Please select the project for the experiment:</label>
        </div >
        <select v-model="selectedProject" class="form-control" required >
          <option v-for="project in projects" :value="project" >{{project.name}}</option>
        </select>
        <div class = 'buttons'>
          <div style="float:right;" >
              <input type="submit" value="Next" class="btn btn-primary"  >
          </div>
          <div style="float:left;" >
            <button type="button" class="btn btn-danger" @click="closeDialog" >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
    <div v-if='currentScreen === 1'>
      <form class="form-group" @submit='nextDialog' >
        <div class="form-group">
          <label for="experimentName">Please enter in a name for the experiment:</label>
          <input type="address" class="form-control" id="experimentName" placeholder="My experiment"v-model="name" required>
        </div>
        <div class="form-group">
          <label for="experimentDescription">Please enter a brief description of the experiment:</label>
          <textarea  rows="4" cols="50" type="experimentDescription" class="form-control" id="experimentDescription" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="experimentTags">Please enter in comma seprated tags for the experiment:</label>
          <input type="experimentTags" class="form-control" id="experimentTags" v-model="tagString">
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
    <div v-if='currentScreen === 2'>
      <form class="form-group" @submit='nextDialog' >
        <div class="form-group" >
          <label for="parametersFile">Please select file for parameters:</label>
          <input type="file" @change="onFileChange">
        </div>
        <div class="form-group" >
          <textarea  type="fileTxt" class="form-control" id="fileTxt" placeholder=" " v-model="parameterFile" required></textarea>
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
      <label for="repo">Please assign users to the experiment:</label>
      <div class = "userContainer">
        <div :class = "{active: user.active, ind:true, assigned: user.assigned}"  v-for = "user in users" @click="userClick(user)">
          <icon name="user" scale="2.5"></icon>
          <span :class = "{active: user.active, text:true}" >{{user.name}}</span>
        </div>
      </div>
        <div class = 'buttons'>
          <div style="float:right;" >
            <button type="button" class="btn btn-success" @click=endDialog>
              Confirm
            </button>
          </div>
          <div style="float:left;" >
            <button type="button" class="btn btn-primary" @click="previousDialog" >
              Back
            </button>
          </div>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
import Icon from 'vue-awesome/components/Icon'
import ExperimentsService from '@/services/ExperimentsService'
import ProjectsService from '@/services/ProjectsService'
import EventBus from '../../event-bus';
import moment from 'moment'


export default {
  components: {Icon},
  name: 'experimentDialog',
  props: [],
  mounted(){
    this.getProjects();
  },
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
        vm.parameterFile = e.target.result;
      };
      reader.readAsText(file);
    },
    endDialog(){
      this.addExperiment();
      this.$notify({group: 'experiment-created', type:'success', title: 'Experiment created!'});
      this.$emit('close');
    },
    closeDialog(){
      this.$emit('close');
    },
    async addExperiment(){
      this.tags = this.tagString.split(',')
      console.log(this.userNames)
      await ExperimentsService.addExperiment({
        name: this.name,
        description: this.description,
        owner: this.owner,
        project: this.selectedProject.name,
        project_id: this.selectedProject._id,
        status: this.status,
        tags: this.tags,
        parameterFile: this.parameterFile,
        notes: this.notes,
        users: this.userNames,
        start_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
        run_duration: moment().format('MMMM Do YYYY, h:mm:ss a')
      })
      this.$router.push({name: 'Experiments'});
      EventBus.$emit('experiment_dialog_close');
    },
    async getProjects(){
      const response = await ProjectsService.fetchProjects()
      this.projects = response.data.projects
    },
    userClick(user){
      this.users[this.users.indexOf(user)].active = !this.users[this.users.indexOf(user)].active;
      if(this.userNames.indexOf(user.name) <0 ){
        this.userNames.push(user.name);
      }else{
        this.userNames.splice(this.userNames.indexOf(user.name));
      }
    }
  },
  data (){
    return{
      currentScreen : 0,
      users: [{name:"Jack", active:false,assigned:false, permissions : []},{name:"User", active:false,assigned:false, permissions : []}, {name:"Jill", active:false, assigned:false,permissions : []}],
      name: '',
      owner: 'User',
      status: 'Running',
      description: '',
      tags : [],
      tagString: '',
      parameterFile: '',
      notes: '',
      userNames: [],
      selectedProject :null,
      projects:[{name: 'Sample Project', _id:1231321},{name: 'Sample Project2', _id:123112312321}]
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
