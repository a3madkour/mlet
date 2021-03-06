import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'
import Dashboard from '@/components/dashboard_components/Dashboard'
import Experiments from '@/components/experiments_components/Experiments.vue'
import ExperimentDetails from '@/components/experiments_components/ExperimentDetails.vue'
import Projects from '@/components/projects_components/Projects.vue'
import ProjectDetails from '@/components/projects_components/ProjectDetails.vue'
import Notifications from '@/components/notification_components/Notifications.vue'
import Settings from '@/components/settings_components/Settings.vue'
import Search from '@/components/search_components/Search.vue'
import Welcome from '@/components/Welcome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications
    },

    {
      path: '/experiments',
      name: 'Experiments',
      component: Experiments
    },
    {
      path: '/experiments/:id',
      name: 'ExperimentDetails',
      component: ExperimentDetails
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/projects/:id',
      name: 'ProjectDetails',
      component: ProjectDetails
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
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    }
  ]
})
