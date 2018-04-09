<template>
<div class="py-3 container-fluid">
  <form class="form-group" @submit='saveChanges' >
    <div class="row">
      <div class="col-6">
        <div class="row">
          <div class="col-12">
            <h2 class="pull-left">Account</h2>
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">Username:</label> 
          </div>
          <div class="col-10">
            <input v-model="username" placeholder="">
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">Password:</label> 
          </div>
          <div class="col-10">
            <button type="button" @click="show_change_password_dialog">Change your password</button>
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">Email:</label> 
          </div>
          <div class="col-10">
            <input v-model="email" placeholder="">
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">Language:</label>
          </div>
          <div class="col-10">
            <select v-model="language">
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="mandarin">Mandarin</option>
            </select>
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">Time zone:</label>
          </div>
          <div class="col-10">
            <select v-model="time_zone">
              <option value="est">EST</option>
              <option value="cst">CST</option>
              <option value="mst">MST</option>
              <option value="pst">PST</option>
            </select>
          </div>
        </div>

        <div class="row settings-header-buffer">
          <div class="col-12">
            <h2 class="pull-left">System</h2>
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">CPU cores:</label> 
          </div>
          <div class="col-10">
            <input v-model="cpu_cores" placeholder="">
          </div>
        </div>
        <div class="row settings-item-buffer settings-item-buffeo">

          <div class="col-2">
            <label class="pull-right">GPUs:</label> 
          </div>
          <div class="col-10">
            <select v-model="gpu">
              <option value="gpu_all">All available GPUs</option>
              <option value="gpu_one">(1) NVIDIA GeForce GTX 1080 Ti</option>
              <option value="gpu_two">(2) NVIDIA GeForce GTX 1080 Ti</option>
            </select>
          </div>
        </div>

        <div class="row settings-header-buffer">
          <div class="col-12">
            <h2 class="pull-left">Database</h2>
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">Database IP:</label> 
          </div>
          <div class="col-10">
            <input v-model="db_ip" placeholder="">
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">Add user:</label> 
          </div>
          <div class="col-10">
            <button type="button" @click="show_create_user_dialog">Create a new user </button>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="row settings-header-buffer">
          <div class="col-12">
            <h2 class="pull-left">Notifications</h2>
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">Email notifications:</label> 
          </div>
          <div class="col-10">
            <input v-model="email_notificaitons" type="checkbox">
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-2">
            <label class="pull-right">System notifications:</label> 
          </div>
          <div class="col-10">
            <input v-model="system_notificaitons" type="checkbox">
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-12">
            <label class="pull-left">Receive type of notifications:</label> 
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-1"></div>
          <div class="col-2">
            <label class="pull-right">Experiment Completed:</label> 
          </div>
          <div class="col-9">
            <input v-model="notify_exp_complete" type="checkbox">
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-1"></div>
          <div class="col-2">
            <label class="pull-right">Experiment created for your project:</label> 
          </div>
          <div class="col-9">
            <input v-model="notify_exp_create" type="checkbox">
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-1"></div>
          <div class="col-2">
            <label class="pull-right">Experiment assigned to you:</label> 
          </div>
          <div class="col-9">
            <input v-model="notify_exp_assigned" type="checkbox">
          </div>
        </div>
        <div class="row settings-item-buffer">
          <div class="col-1"></div>
          <div class="col-2">
            <label class="pull-right">Project Created:</label> 
          </div>
          <div class="col-9">
            <input v-model="notify_project_create" type="checkbox">
          </div>
        </div>
      </div>
    </div>

    <div class='buttons'>
      <div style="float:right;" >
        <input type="submit" value="Save Changes" class="btn btn-primary"  >
      </div>
      <div style="float:left;" >
        <button type="button" class="btn btn-danger">Cancel</button>
      </div>
    </div>
  </form>

  <modals-container/>
</div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import VModal from 'vue-js-modal';
import UserDialog from './UserDialog.vue';
import ChangePasswordDialog from './ChangePasswordDialog.vue';
export default {
  components: {},
  data: function () {
    return {
      username: 'User',
      email: 'user@ccs.neu.edu',
      language: 'english',
      time_zone: 'est',
      cpu_cores: '16',
      gpu: 'gpu_one',
      db_ip: '192.168.1.1',
      notify_exp_complete: true,
      notify_exp_create: true,
      notify_exp_assigned: true
    }
  },
  created: function() {
    EventBus.$emit('activate_element', 5);
    EventBus.$on('user_dialog_clos3', this.dialogClosed);
  },
  methods:{
    show_create_user_dialog(){
      this.$modal.show(UserDialog,{}, {name:"create_user", clickToClose: false, height:"auto", width:"50%"});
      this.$on('close',this.dialogClosed);
    },
    show_change_password_dialog(){
      this.$modal.show(ChangePasswordDialog,{}, {name:"change_password", clickToClose: false, height:"auto", width:"50%"});
      this.$on('close',this.dialogClosed);
    },
    dialogClosed(event){
    }
  }
}
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';

.settings-header-buffer {
  margin-top: 40px;
}

.settings-item-buffer {
  margin-top: 5px;
}
</style>
