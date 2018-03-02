<template>
  <div class="posts">
    This file will list all the posts.
    <modal :clickToClose ="false" name="hello-world"> 
      <div style="position :absolute;right:0px;top:0px;" >
        <button type="button" class = "close" aria-label="Close" @click="$modal.hide('hello-world')">
          <span aria-hidden="true"> &times; </span>
        </button>
      </div>
      <div style="position :absolute;left:0px;bottom:0px;" >
        <button type="button" class="btn btn-danger" @click="$modal.hide('hello-world')">
          Close 
        </button>
      </div>
      <div style="position :absolute;right:0px;bottom:0px;" >
        <button type="button" class="btn btn-primary" @click="$modal.hide('hello-world')">
          Next 
        </button>
      </div>
    hello, world!
    </modal>
    <Dialog/>
    <button @click="show" >omak </button>
  </div>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';
import Dialog from './projects_components/Dialog.vue';
Vue.use(VModal, {dialog: true});
export default {
  name: 'posts',
  components: {
  },
  data () {
    return {}
  },
  methods: {
    show(){
      /* this.$modal.show('hello-world'); */
      /* this.$modal.show(Dialog, {name:"dialog",clickToClose: false}); */
      console.log("leeeeeeeeeeeh");
    }
  }
}
</script>
