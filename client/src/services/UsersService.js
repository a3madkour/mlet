import Api from '@/services/Api'

export default {
  fetchUsers (Params) {
    return Api().get('users',{params: Params} )
  },

  addUser (params) {
    return Api().post('users', params)
  },
  
  updateUser (params) {
    return Api().put('users/' + params.id, params)
  },

  getUser (params) {
    return Api().get('users/' + params.id)
  },
  deleteUser (id) {
    return Api().delete('users/' + id)
  }
}
