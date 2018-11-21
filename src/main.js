// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import qs from 'qs'

import 'weui/dist/style/weui.min.css'
import '@/../static/css/app.css'

// f7-icons-css
import '@/../static/vendor/framework7-icons/css/framework7-icons.css'

Vue.use(VueCookie)
Vue.use(VueResource)

// 路由过滤器
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    console.log('Going to:', to.path)
    console.log('    requireAuth:', to.meta.requireAuth)
    console.log('    get JSESSIONID from cookie:', VueCookie.get('user'), 'need login:', !VueCookie.get('user'))
    if (!VueCookie.get('user')) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 把要跳转的地址作为参数传到下一步
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// http请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('config>>>', config)
    // element ui Loading方法
    // loadinginstace = Loading.service({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.3)',
    //   customClass:"osloading",
    //   fullscreen: true
    // })
    return config
  },
  error => {
    console.log('error>>>', error)
    // loadinginstace.close()
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  function (response) {
    console.log('axios - response', response)
    return response
  },
  function (error) {
    console.log('axios - error', error, qs.parse(qs.stringify(error)))
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGOUT)
          console.log('后台报告：身份过期')
          VueCookie.delete('user')
          router.push('login')
          break
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
