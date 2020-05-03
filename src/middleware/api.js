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
  },
  resetPassword: (newPassword, resetToken) => {
    return request({
      method: 'POST',
      url: 'user/reset-password',
      data: { newPassword, resetToken }
    })
  },
  getDataSeaichurd: (population, infected, duration, a1, a2, a3, a4, a5, d1, d2, d3, r1, r2, r3, r4, a6, a7, a8, a9, qq) => {
    return request({
      method: 'POST',
      url: 'seaichurd',
      data: { population, infected, duration, a1, a2, a3, a4, a5, d1, d2, d3, r1, r2, r3, r4, a6, a7, a8, a9, qq }
    })
  },
  updateUser(email, image){
    return request({
      method: 'POST',
      url: 'user',
      data: { email, image }
    })
  }
}
