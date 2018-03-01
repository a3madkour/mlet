import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import Dashboard from '@/components/dashboard_components/Dashboard'
import Experiments from '@/components/experiments_components/Experiments.vue'
import Projects from '@/components/projects_components/Projects.vue'
import Settings from '@/components/settings_components/Settings.vue'
import Search from '@/components/search_components/Search.vue'

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
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },

    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }
  ]
})
