// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import VueInfiniteScroll from 'vue-infinite-scroll'
import App from './App'
import router from './router'
// import store from './store/store'
import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'
import ls from 'store'

import weui from 'weui.js'
import 'weui'

import 'weui/dist/style/weui.min.css'
import '@/../static/css/app.css'

import { Swipe, SwipeItem } from 'vue-swipe'
import 'vue-swipe/dist/vue-swipe.css'

import '@/../static/vendor/framework7-icons/css/framework7-icons.css'

Vue.use(VueCookie)
Vue.use(VueResource)
Vue.use(VueInfiniteScroll)

Vue.mixin({
  data() {
    return {
      weuijsPopedItem: null
    }
  },
  beforeDestroy() {
    console.log('beforeDestroy')
    if (this.weuijsPopedItem) {
      this.weuijsPopedItem.hide()
      this.weuijsPopedItem = null
    }
    
    //页面销毁时自动隐藏
    // this.mixin_weuijs_picker_actionsheet('actionsheet', 'hidden')
  }/* ,
  methods: {
    // value指的是 picker 或者 actionsheet
    // state 指的是 visible 或者 hidden
    mixin_weuijs_picker_actionsheet(value, state) {
      let mask = document.querySelectorAll('.weui-mask')
      let picker = document.querySelectorAll('.weui-' + value)
      mask.forEach(item => {item.style.visibility = state})
      picker.forEach(item => {item.style.visibility = state})
    }
  } */
})

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.prototype.$weui = weui

Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)

// 绑定用户的localstorage
class UserLocalStorage {
  constructor () {
    // console.log('UserLocalStorage - constructor username:', username)
    // this.username = username
  }

  init (username) {
    this.username = username
  }

  get (key1, key2) {
    let d = ls.get(this.username)
    if (d === undefined) {
      return undefined
    }
    let obj = d[key1]
    if (obj === undefined) {
      return undefined
    }
    return obj[key2]
  }

  set (key1, key2, val) {
    let d = ls.get(this.username)
    if (d === undefined) {
      d = {}
    }
    if (d[key1] === undefined) {
      d[key1] = {}
    }
    d[key1][key2] = val
    ls.set(this.username, d)
  }
}
window.uls = new UserLocalStorage()

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

    // 如果没有登录
    if (!VueCookie.get('user')) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 把要跳转的地址作为参数传到下一步
      })
    }
    // 如果已登录，直接装载登录uls
    else {
      if (!window.uls.username) {
        let username = qs.parse(VueCookie.get('user'))['username']
        if (!username) {
          alert('[ERR] Cookie中username为: ' + username + ', from>>> auto load in main.js')
        }
        window.uls.init(username)
      }
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
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>'
})

