<template>
  <div class = "dialog" style ="margin:auto; padding-top: 2%;padding-left: 2%;padding-right: 2%;">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="$emit('close')" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div v-if='currentScreen === 0'>
      <div class="form-group" >
        <label for="projectName">Please enter in a name for the project</label>
        <input type="address" class="form-control" id="projectName" placeholder="My Project"v-model="projectData.name" required>
      </div>
      <div class="form-group">
        <label for="projectDescription">Please enter a bried description of the project</label>
        <textarea  rows="4" cols="50" type="projectDescription" class="form-control" id="projectDescription" placeholder="..." v-model="projectData.description"></textarea>
      </div>
      <div class="form-group">
        <label for="projectTags">Please enter in comma seprated tags for the project</label>
        <input type="projectTags" class="form-control" id="projectTags" placeholder="CNNs"v-model="projectData.tagString">
      </div>
    </div>
    <div v-if='currentScreen === 1'>
          users
    </div>
    <div v-if='currentScreen === 2'>
      <div class="form-group" >
        <label for="repo">Please enter in the git repository for the project</label>
        <input type="repo" class="form-control" id="repo" placeholder=" "v-model="projectData.repo">
      </div>
      <div class="form-group" >
        <label for="executable">Please enter in the git executable to be run</label>
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
      </div>
      <div class="form-group">
        <label for="fileName" >Input Spec:</label>
        <input type="fileName"id="projectTags" class="form-control" v-model="projectData.fileName">
      </div>
      <div class="form-group" >
        <label for="executable">Please enter in the git executable to be run</label>
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
    },
    endDialog(){
      this.$emit('close')
    }
  },
  data (){
    return{currentScreen : 0}
  }
}
</script>
<style>
.buttons{
  width: 100%;
  display:inline-block;
  overflow: auto;
  white-space: nowrap;
  margin:0px auto;
}
</style>
