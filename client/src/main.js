import Vue from 'vue'
import App from './App.vue'
import 'vue-awesome/icons'
import router from './router'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
