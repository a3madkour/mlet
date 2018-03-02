<template>
  <div class="posts">
    This file will list all the posts.
    <button @click="show" >omak </button>
    <modals-container/>
  </div>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';
import ProjectDialog from './projects_components/ProjectDialog.vue';
Vue.use(VModal, {dynamic: true});
export default {
  name: 'posts',
  components: {
  },
  data () {
    return {}
  },
  methods: {
    show(){
      this.$modal.show(ProjectDialog,{}, {name:"first",clickToClose: false});
      console.log("leeeeeeeeeeeh");
    }
  }
}
</script>
