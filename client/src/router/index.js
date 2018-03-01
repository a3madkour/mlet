import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import Dashboard from '@/components/dashboard_components/Dashboard'
import Experiments from '@/components/experiments_components/Experiments.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/experiments',
      name: 'Experiments',
      component: Experiments
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }
  ]
})
