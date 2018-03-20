import axios from 'axios'
import "babel-polyfill"
export default() => {
  return axios.create({
    baseURL: `http://localhost:8081`
  })
}
