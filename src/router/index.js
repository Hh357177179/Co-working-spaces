import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Root from '@/pages/root/Root'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/root',
      component: Root,
      children: [
        {
          path: '/root',
          name:'首页',
          component: resolve => {
            require(['@/pages/home/Home.vue'], resolve)
          }
        },
        {
          path: '/information',
          name:'企业信息',
          component: resolve => {
            require(['../pages/business/Information'], resolve)
          }
        },
        {
          path: '/department',
          name: '企业部门',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/business/Department'], resolve)
          }
        },
        {
          path: '/staff',
          name: '企业员工',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/business/Staff'], resolve)
          }
        },
        {
          path: '/facilityinfo',
          name: '设备信息',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/equipment/FacilityInfo'], resolve)
          }
        },
        {
          path: '/sceneinfo',
          name: '场景信息',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/scene/SceneInfo'], resolve)
          }
        },
        {
          path: '/stationinfo',
          name: '工位信息',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/station/StationInfo'], resolve)
          }
        },
        {
          path: '/changepass',
          name: '修改密码',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/system/ChangePass'], resolve)
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
