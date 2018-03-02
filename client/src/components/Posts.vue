<template>
  <div class="posts">
    This file will list all the posts.
    <button @click="show" > New </button>
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
    return {projectData:{fileTxt:""}}
  },
  methods: {
    show(){
      console.log(this.projectData);
      this.$modal.show(ProjectDialog,{projectData: this.projectData}, {name:"first",clickToClose: false,height:"auto", width:"50%"});
    }
  }
}
</script>
