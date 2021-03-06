import Api from '@/services/Api'

export default {
  fetchProjects (Params) {
    return Api().get('projects',{params:Params})
  },

  addProject (params) {
    return Api().post('projects', params)
  },
  
  updateProject (params) {
    return Api().put('projects/' + params.id, params)
  },

  getProject (params) {
    return Api().get('projects/' + params.id)
  },

  deleteProject (id) {
    return Api().delete('projects/' + id)
  }
}
