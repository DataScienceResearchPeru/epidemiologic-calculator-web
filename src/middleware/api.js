import axios from 'axios'
import { request } from 'react-request-hook'

export default axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = {
  getDepartments: () => {
    return request({
      method: 'GET',
      url: 'departments',
    })
  },
  getProvinces: (id) => {
    return request({
      method: 'GET',
      url: `${id}/provinces`,
    })
  },
  getDistricts: (id) => {
    return request({
      method: 'GET',
      url: `${id}/districts`,
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
  },
  verifyAccount: (token) => {
    return request({
      method: 'POST',
      url: 'user/verify-account',
      data: { token }
    })
  },
  resendEmail: (email) => {
    return request({
      method: 'POST',
      url: 'user/resend-email',
      data: { email }
    })
  },
  forgotPassword: (email) => {
    return request({
      method: 'POST',
      url: 'user/forgot-password',
      data: { email }
    })
  }
}
