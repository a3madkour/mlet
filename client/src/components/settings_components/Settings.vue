<template>
<div class="py-3 container-fluid">
  <div class="row">
    <div class="col-12">
      <h2 class="pull-left">Account</h2>
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">Username:</label> 
    </div>
    <div class="col-10">
      <input v-model="username" placeholder="">
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">Password:</label> 
    </div>
    <div class="col-10">
      <input v-model="password" placeholder="">
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">Email:</label> 
    </div>
    <div class="col-10">
      <input v-model="email" placeholder="">
    </div>
  </div>
  <div class="row">
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
  <div class="row">
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

  <div class="row">
    <div class="col-12">
      <h2 class="pull-left">System</h2>
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">CPU cores:</label> 
    </div>
    <div class="col-10">
      <input v-model="cpu_cores" placeholder="">
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">GPUs:</label> 
    </div>
    <div class="col-10">
      <input v-model="gpus" placeholder="">
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">Max Experiments:</label> 
    </div>
    <div class="col-10">
      <input v-model="max_experiments" placeholder="">
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <h2 class="pull-left">Database</h2>
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">Database IP:</label> 
    </div>
    <div class="col-10">
      <input v-model="db_ip" placeholder="">
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">Add user:</label> 
    </div>
    <div class="col-10">
      <button type="button" @click="show">Create a new user </button>
    </div>
  </div>

  <div class="row">
    <div class="col-12">
      <h2 class="pull-left">Notifications</h2>
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">Email notifications:</label> 
    </div>
    <div class="col-10">
      <input v-model="email_notificaitons" type="checkbox">
    </div>
  </div>
  <div class="row">
    <div class="col-2">
      <label class="pull-right">System notifications:</label> 
    </div>
    <div class="col-10">
      <input v-model="system_notificaitons" type="checkbox">
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <label class="pull-left">Receive type of notifications:</label> 
    </div>
  </div>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-2">
      <label class="pull-right">Experiment Completed:</label> 
    </div>
    <div class="col-9">
      <input v-model="exp_notificaitons" type="checkbox">
    </div>
  </div>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-2">
      <label class="pull-right">Experiment created for your project:</label> 
    </div>
    <div class="col-9">
      <input v-model="exp_notificaitons" type="checkbox">
    </div>
  </div>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-2">
      <label class="pull-right">Experiment assigned to you:</label> 
    </div>
    <div class="col-9">
      <input v-model="project_notificaitons" type="checkbox">
    </div>
  </div>
  <div class="row">
    <div class="col-1"></div>
    <div class="col-2">
      <label class="pull-right">Project Created:</label> 
    </div>
    <div class="col-9">
      <input v-model="project_notificaitons" type="checkbox">
    </div>
  </div>

  <modals-container/>
</div>
</template>

<script>
import Vue from 'vue';
import EventBus from '../../event-bus';
import VModal from 'vue-js-modal';
import UserDialog from './UserDialog.vue';
export default {
  components: {},
  data: function () {
    return {
      language: 'english',
      time_zone: 'est',
    }
  },
  created: function() {
    EventBus.$emit('activate_element', 5);
    EventBus.$on('user_dialog_clos3', this.dialogClosed);
  },
  methods:{
    show(){
      this.$modal.show(UserDialog,{}, {name:"first",clickToClose: false,height:"auto", width:"50%"});
      this.$on('close',this.dialogClosed);
    },
    dialogClosed(event){
    }
  }
}
</script>

<style lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
</style>
