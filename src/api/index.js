import axios from 'axios'
import app from '@/main'

let Ax = axios.create({
  baseURL: 'http://192.168.31.16:8099',
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
    if (response.data.status === 100401) {
      app.$alert(response.data.message, {
        confirmButtonText: '确定',
        callback: action => {
          app.$router.push('/')
        }
      })
      return Promise.reject()
    }
    // return Promise.reject(response.data)
    // if (response.data.status === 1) {
    //   app.$message({
    //     message: data.data.message,
    //     type: 'error'
    //   })
    //   return Promise.reject(response.data)
    // }
    return response.data
  },
  err => Promise.reject(err)
)
// 登录
export function login (data) {
  return Ax.post(`/api/account/login`, data)
}
// 企业信息
export function getInformation () {
  return Ax.get(`/api/Enterprise/GetSettledBus`)
}

// 查看授权记录
export function getSettledbusOrder () {
  return Ax.get(`/api/Enterprise/GetSettledbusOrder`)
}

// 企业部门
export function getDeparement (page = 1, pageSize = 10, name='') {
  return Ax.get(`/api/enterprise/getDepartmentList?&page=${page}&pageSize=${pageSize}&name=${name}`)
}

// 新建部门
export function newDeparement (data) {
  return Ax.post(`/api/enterprise/newDepartment`, data)
}

// 编辑
export function editDeparement (data) {
  return Ax.post(`/api/enterprise/editDepartment`, data)
}
// 设备信息搜索列表
export function getEquipTypeList () {
  return Ax.get(`/api/Equip/GetEquipTypeList`)
}
// 设备信息
export function getEquipList (page= 1, pagesize= 10, name= '', typeId= '') {
  return Ax.get(`/api/Equip/GetEquipList?&page=${page}&pagesize=${pagesize}&name=${name}&typeId=${typeId}`)
}
// 场景信息
export function getSceneList (page = 1, pagesize = 10, name='') {
  return Ax.get(`/api/Scene/GetSceneList?&page=${page}&pagesize=${pagesize}&name=${name}`)
}
// 工位信息
export function StationList (page= 1, pageSize= 10, name= '', type= '') {
  return Ax.get(`/api/station/getStationList?&page=${page}&pageSize=${pageSize}&name=${name}&type=${type}`)
}
// 工位信息搜索列表
export function getStationTypeList () {
  return Ax.get(`/api/station/getStationTypeList`)
}
// 修改密码
export function modifyPassword (data) {
  return Ax.post(`/api/setting/modifyPassword`, data)
}
export default axios
