import axios from 'axios'
import app from '@/main'

let Ax = axios.create({
  baseURL: '',
  timeout: 8000
})
// let loadingCount = 0
// 添加请求拦截
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Ax.interceptors.request.use(
  config => {
    let keys = JSON.parse(sessionStorage.getItem('userKey'))
    if (keys) {
      config.headers.common['Access-Token'] = `${keys.token}:${keys.userId}`
    }
    // app.$loading = true
    return config
  },
  err => Promise.reject(err)
)
// 添加响应拦截
Ax.interceptors.response.use(
  response => {
    if (response.data.status === 0) return response.data
    if (response.data.status === 100401) {
      app.$alert(response.data.message, {
        confirmButtonText: '确定',
        callback: action => {
          app.$router.push('/login')
        }
      })
      // app.$message.error('错了哦，这是一条错误消息')
      // loadingCount++
      // if (loadingCount === 1) {
        // console.log(response.data.message)
      }
    // }
    return response
  },
  err => Promise.reject(err)
)
// 登录
export function login (data) {
  return Ax.post(`/api/account/login`, data)
}
// export function home () {
//   return Ax.get(`/api/enterprise/getStaffs`)
// }
// export function getdepartments () {
//   return Ax.get(`/api/enterprise/getdepartments`)
// }

// 企业部门
export function getDeparement (page = 1, pageSize = 10, name='') {
  return Ax.get(`/api/enterprise/getDepartmentList?&page=${page}&pageSize=${pageSize}&name=${name}`)
}
export default axios
