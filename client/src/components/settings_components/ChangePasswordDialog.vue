<template>
  <div class = "dialog" style ="margin:auto; padding-top: 2%;padding-left: 2%;padding-right: 2%;">
    <div style="position :absolute;right:0px;top:0px;" >
      <button type="button" class = "close" aria-label="Close" @click="$emit('close')" >
        <span aria-hidden="true"> &times; </span>
      </button>
    </div>
    <div>
      <form class="form-group" @submit='endDialog' >
        <div class="form-group" >
          <label for="current_password">Current password:</label>
          <input type="password" class="form-control" id="current_password" placeholder="" v-model="current_password" required>
        </div>
        <div class="form-group">
          <label for="new_password">New password:</label>
          <input  rows="4" cols="50" type="password" class="form-control" id="new_password"  v-model="new_password" required></input>
        </div>
        <div class="form-group">
          <label for="confirm_password">Confirm new password:</label>
          <input  rows="4" cols="50" type="password" class="form-control" id="confirm_password"  v-model="confirm_password" required></input>
        </div>
        <div class = 'buttons'>
          <div style="float:right;" >
              <input type="submit" value="Change Password" class="btn btn-primary"  >
          </div>
          <div style="float:left;" >
            <button type="button" class="btn btn-danger" @click="$emit('close')" >
              Cancel
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
import UsersService from '@/services/UsersService';
import EventBus from '../../event-bus';
Vue.use(VModal, {dynamic: true});

export default {
  components: {Icon},
  name: 'userDialog',
  props: [],
  methods: {
    endDialog(){
      this.$emit('close')
      this.$notify({group: 'password-changed', type:'success', title: 'Password changed!'});
    }
  },
  data (){
    return{
      current_password: '',
      new_password: '',
      confirm_password: '',
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
