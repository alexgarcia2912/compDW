import axios from 'axios'

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const baseURL = rawApiUrl.endsWith('/api')
  ? rawApiUrl
  : `${rawApiUrl.replace(/\/$/, '')}/api`

const api = axios.create({
  baseURL,
  withCredentials: true
})

export default api