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
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '/root',
          name:'首页',
          component: resolve => {
            require(['@/pages/home/Home.vue'], resolve)
          },
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/information',
          name:'企业信息',
          component: resolve => {
            require(['../pages/business/Information'], resolve)
          },
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/department',
          name: '企业部门',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/business/Department'], resolve)
          },
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/staff',
          name: '企业员工',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/business/Staff'], resolve)
          },
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/facilityinfo',
          name: '设备信息',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/equipment/FacilityInfo'], resolve)
          },
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/sceneinfo',
          name: '场景信息',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/scene/SceneInfo'], resolve)
          },
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/stationinfo',
          name: '工位信息',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/station/StationInfo'], resolve)
          },
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          path: '/changepass',
          name: '修改密码',
          meta: {
            requireAuth: true
          },
          component: resolve => {
            require(['../pages/system/ChangePass'], resolve)
          },
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
