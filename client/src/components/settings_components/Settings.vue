<template>
  <div class="py-3 container-fluid">
    <p> TODO: Settings stuff </p>
    <button type="button" @click="show">Create a new user </button>
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
