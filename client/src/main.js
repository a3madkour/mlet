import Vue from 'vue'
import Notifications from 'vue-notification'
import App from './App.vue'
import 'vue-awesome/icons'
import router from './router'

Vue.use(Notifications)
Vue.prototype.$user = 'User'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
