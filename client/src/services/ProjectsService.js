import Api from '@/services/Api'

export default {
  fetchProjects () {
    return Api().get('projects')
  },

  addProjects (params) {
    return Api().post('projects', params)
  },
  
  updateProjects (params) {
    return Api().put('projects/' + params.id, params)
  },

  getProjects (params) {
    return Api().get('projects/' + params.id)
  },

  deleteProjects (id) {
    return Api().delete('projects/' + id)
  }
}
