<template>
  <div class = "dialog">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="$emit('close')" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div v-if='currentScreen === 0'style="position :absolute;left:0px;bottom:0px;" >
      <button type="button" class="btn btn-danger" @click="$emit('close')" >
        Cancel 
      </button>
    </div>
    <div v-if='currentScreen != 0'style="position :absolute;left:0px;bottom:0px;" >
      <button type="button" class="btn btn-primary" @click="previousDialog" >
        Back
      </button>
    </div>
    <div style="position :absolute;right:0px;bottom:0px;" >
      <button type="button" class="btn btn-primary" @click=nextDialog >
        Next 
      </button>
    </div>
    <div v-if='currentScreen === 0'>
      <div style="height:20px; width:100%; clear:both;"></div>
      <div class="form-group" >
        <label for="projectName">Please enter in a name for the project</label>
        <input type="address" class="form-control" id="projectName" placeholder="My Project"v-model="projectData.name">
      </div>
      <div class="form-group">
        <label for="projectDescription">Please enter a bried description of the project</label>
        <textarea  rows="4" cols="50" type="projectDescription" class="form-control" id="projectDescription" placeholder="..." v-model="projectData.description"></textarea>
      </div>
      <div class="form-group">
        <label for="projectTags">Please enter in comma seprated tags for the project</label>
        <input type="projectTags" class="form-control" id="projectTags" placeholder="CNNs"v-model="projectData.tagString">
      </div>
      <div style="height:20px; width:100%; clear:both;"></div>
    </div>
    <div v-if='currentScreen === 1'>
      <div style="height:20px; width:100%; clear:both;"></div>
          users
      <div style="height:20px; width:100%; clear:both;"></div>
      <div style="height:20px; width:100%; clear:both;"></div>
    </div>
    <div v-if='currentScreen === 2'>
      <div style="height:20px; width:100%; clear:both;"></div>
      <div class="form-group" >
        <label for="repo">Please enter in the git repository for the project</label>
        <input type="repo" class="form-control" id="repo" placeholder=" "v-model="projectData.repo">
      </div>
      <div class="form-group" >
        <label for="executable">Please enter in the git executable to be run</label>
        <input type="executable" class="form-control" id="executable" placeholder=" "v-model="projectData.executable">

      </div>
      <div style="height:20px; width:100%; clear:both;"></div>
    </div>
    <div v-if='currentScreen === 3'>
      <div style="height:20px; width:100%; clear:both;"></div>
      <div class="form-group" >
        <label for="parametersFile">Please select a file for parameter format:</label>
        <input type="file" @change="onFileChange"> 
      </div>
      <div class="form-group" >
        <textarea  type="fileTxt" class="form-control" id="fileTxt" placeholder=" " v-model="projectData.fileTxt"></textarea>
      </div>
      <div style="height:20px; width:100%; clear:both;"></div>
    </div>

  </div>
</template>
<script>
export default {
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
    }
  },
  data (){
    return{currentScreen : 0}
  }
}
</script>
<style>
</style>
