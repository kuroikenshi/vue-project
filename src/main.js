// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'

import 'weui/dist/style/weui.min.css'
import '@/../static/css/app.css'

// f7-icons-css
import '@/../static/vendor/framework7-icons/css/framework7-icons.css'

Vue.use(VueCookie)
Vue.use(VueResource)

// 路由过滤器
router.beforeEach((to, from, next) => {
  console.log('to', to)
  // 如果是跳转到login页面，带上跳转回调
  if (to.fullPath === '/login' && _.isEmpty(to.query.redirect)) {
    console.log('跳转到login, 加上redirect')
    next({
      path: '/login',
      query: {
        redirect: from.fullPath
      }
    })
  }

  // 如果需要身份验证
  if (to.meta.requireAuth) {
    console.log('Going to:', to.path)
    console.log('    requireAuth:', to.meta.requireAuth)
    console.log('    get JSESSIONID from cookie:', VueCookie.get('user'), 'need login:', !VueCookie.get('user'))

    // 如果已经有身份
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

// axios请求拦截器
axios.interceptors.request.use(
  data => {
    console.log('data>>>', data)
    // element ui Loading方法
    // loadinginstace = Loading.service({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.3)',
    //   customClass:"osloading",
    //   fullscreen: true
    // })
    return data
  },
  err => {
    console.log('err.response.status>>>', err.response.status)
    console.log('err>>>', err)
    // loadinginstace.close()
    return Promise.reject(err)
  }
)
// axios响应拦截器
axios.interceptors.response.use((response) => {
  console.log('resp', response)
  // session过期处理 - 兼容
  if (response.data &&
      response.data.msg &&
      response.data.msg === '未登录或登录超时，请重新登录!') {
    console.log('session过期')
    router.push('/login')
  }
  return response
}, function (error) {
  // session过期处理
  if (error.response.status === 401) {
    router.push('/login')
  } else {
    return Promise.reject(error)
  }
})
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
