<template>
  <div class = "dialog" style ="margin:auto; padding-top: 2%;padding-left: 2%;padding-right: 2%;">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="$emit('close')" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div v-if='currentScreen === 0'>
        <div>
          <label for="experimentName">Please select the project for the experiment:</label>
        </div>
        <select class="custom-select" multiple>
          <option selected>List of Projects</option>
        </select>
    </div>
    <div v-if='currentScreen === 1'>
      <div class="form-group" >
        <label for="experimentName">Please enter in a name for the experiment:</label>
        <input type="address" class="form-control" id="experimentName" placeholder="My experiment"v-model="experimentData.name" required>
      </div>
      <div class="form-group">
        <label for="experimentDescription">Please enter a brief description of the experiment:</label>
        <textarea  rows="4" cols="50" type="experimentDescription" class="form-control" id="experimentDescription" v-model="experimentData.description"></textarea>
      </div>
      <div class="form-group">
        <label for="experimentTags">Please enter in comma seprated tags for the experiment:</label>
        <input type="experimentTags" class="form-control" id="experimentTags" v-model="experimentData.tagString">
      </div>
    </div>
    <div v-if='currentScreen === 2'>
      <div class="form-group" >
        <label for="parametersFile">Please select file for parameters:</label>
        <input type="file" @change="onFileChange"> 
      </div>
      <div class="form-group" >
        <textarea  type="fileTxt" class="form-control" id="fileTxt" placeholder=" " v-model="experimentData.fileTxt"></textarea>
      </div>
    </div>
    <div v-if='currentScreen === 3'>
          users
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
      <div v-if='currentScreen != 3' style="float:right;" >
        <button type="button" class="btn btn-primary" @click=nextDialog >
          Next 
        </button>
      </div>
      <div v-if='currentScreen === 3'style="float:right;" >
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
  name: 'experimentDialog',
  props: ['experimentData'],
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
        vm.experimentData.fileTxt = e.target.result;
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
