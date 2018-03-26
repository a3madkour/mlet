import Api from '@/services/Api'

export default {
  fetchExperiments (Params) {
    return Api().get('experiments', {params : Params})
  },

  addExperiment (params) {
    return Api().post('experiments', params)
  },
  
  updateExperiment (params) {
    return Api().put('experiments/' + params.id, params)
  },

  getExperiment (params) {
    return Api().get('experiments/' + params.id)
  },
  deleteExperiment (id) {
    return Api().delete('experiments/' + id)
  }
}
