import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:8000/api/`,
  withCredentials: false, //this is the default,
  headers: {
    Accept: 'appication/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getList() {
    return apiClient.get('/currencies')
  }
}
