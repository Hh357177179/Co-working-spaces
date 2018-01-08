// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './Element.js'
import './assets/style/style.css'
import './assets/font/iconfont.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
// 路由验证
router.beforeEach((to, from, next) => {
  // if (to.path == '/') {
  //   sessionStorage.removeItem('userKey')
  // }
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem('userKey')) {
      next ()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

const app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

export default app
