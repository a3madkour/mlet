<template>
  <div class="userPermissions">
    <div class='help-button'>
       <button type="button" class="btn btn-default btn-lg" @click="showHelp">
         <span class="glyphicon glyphicon-question-sign" style="font-size:30px;"></span> 
       </button>
    </div>
    <div align="center" style = "margin:auto;width:50%;bottom:50%;">
      <div  class = "buttons">
          <icon name="user" scale="2.5"></icon>
        <p> <b>User(s):</b> {{users.join()}} </p>
      </div>
      <div id='example-3'>
        <input type="checkbox" id="Read" value="Read" v-model='permissions'>
        <label for="Read">Read</label>
        <input type="checkbox" id="Write" value="Write" v-model='permissions'>
        <label for="Write">Write</label>
        <input type="checkbox" id="Execute" value="Execute" v-model='permissions'>
        <label for="Execute">Execute</label>
      </div>
      <div class = "buttons">
        <div style = "float:right;"> 
         <button type="button" class="btn btn-primary" @click="addUser" >
          Confirm
        </button>
        </div>
        <div style = "float:left;"> 
         <button type="button" class="btn btn-danger" @click="$modal.hide(name)" >
          Cancel
        </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Vue from 'vue';
import HelpModal from '../common_components/help_modal.vue';
import Icon from 'vue-awesome/components/Icon'

var permissions_explanation = `There are three different types of user permissions in MLET: Read, Write, and Excecute. These are analogous to the permissions
you can set for a file in a modern day file system. Read permission will allow a user to view the project details and experiments. Write permission will allow
a user to create new experiments for this project. Execute permision will allow a user to run a experiment for this project on whatever machine MLET is being 
run from.`;

export default {
  name: 'userPermissions',
  props : ["users", "name", "selectedUsers"],
  components: {
    Icon,
    HelpModal,
  },
  mounted(){
    if(this.selectedUsers[0].permissions !== undefined){
       this.permissions = this.selectedUsers[0].permissions; 
    }
  },
  data () {
    return {
      permissions: [], // Must be an array reference!
    }  
  },
  methods: {
    addUser(){
      console.log(this.selectedUsers)
      for(var i =0; i<this.selectedUsers.length;i++){
        this.selectedUsers[i].permissions = this.permissions;
      }
      this.$modal.hide(this.name)
    },

    showHelp: function () {
      this.$modal.show(HelpModal, {header_text:"User Permissions", help_text:permissions_explanation, clickToClose: false, height:"auto", width:"50%"});
    }
  },
}
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
