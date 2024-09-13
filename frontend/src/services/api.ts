import axios from 'axios'
import { getTokenLocalStorage } from '../utils'

const api = () => {
  const service = axios.create({
    baseURL: process.env.REACT_APP_URL_API || 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': true,
      Authorization: `Bearer ${getTokenLocalStorage()}`
    }
  })
  return service
}

export default api
