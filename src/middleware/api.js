import axios from 'axios'
import { request } from 'react-request-hook'

const DEFAUL_API_BASE_URL = 'http://localhost:8080/api/'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export default axios.create({
  baseURL: API_BASE_URL || DEFAUL_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = {
  getDepartments: () => {
    return request({
      method: 'GET',
      url: 'departments'
    })
  },
  getProvinces: (id) => {
    return request({
      method: 'GET',
      url: `${id}/provinces`
    })
  },
  getDistricts: (id) => {
    return request({
      method: 'GET',
      url: `${id}/districts`
    })
  },
  registerUser: (firstName, lastName, institution, email, password, departmentId, provinceId, districtId) => {
    return request({
      method: 'POST',
      url: 'users',
      data: { firstName, lastName, institution, email, password, departmentId, provinceId, districtId }
    })
  },
  login: (username, password) => {
    return request({
      method: 'POST',
      url: 'user/login',
      data: { username, password }
    })
  }
}
