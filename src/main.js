// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
// import VueInfiniteScroll from 'vue-infinite-scroll'
import VueScroller from 'vue-scroller'
import App from './App'
import router from './router'
// import store from './store/store'  // src/store/store.js
import store from 'store'
import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'

import weui from 'weui.js'
import 'weui'

import 'weui/dist/style/weui.min.css'
import '@/../static/css/app.css'

import { Swipe, SwipeItem } from 'vue-swipe'
import 'vue-swipe/dist/vue-swipe.css'

import '@/../static/vendor/framework7-icons/css/framework7-icons.css'

Vue.use(VueCookie)
Vue.use(VueResource)
// Vue.use(VueInfiniteScroll)
Vue.use(VueScroller)

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

Vue.config.debug = true;
Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.prototype.$weui = weui

Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)


// 路由过滤器
router.beforeEach((to, from, next) => {
  console.log('from', from, 'to', to)
  console.log('from.params', from.params)
  console.log('from.query', from.query)
  
  // 如果是跳转到login页面，带上跳转回调
  if (to.fullPath === '/login' && _.isEmpty(to.query.redirect)) {
    console.log('跳转到login, 加上redirect')

    // 如果来自“不是教师页”，加userInfo页的跳转
    if (from.fullPath == '/notTeacher') {
      next({
        path: '/login',
        query: {
          redirect: '/user/userInfo'
        }
      })
    }
    // 其他页面加来源为跳转回调
    else {
      // 如果来源页或跳转到的页面包含大量redirect，跳转到userInfo
      if ((from.query.redirect != undefined && from.query.redirect.match && from.query.redirect.match(/redirect/g) != null) ||
          (to.query.redirect != undefined && to.query.redirect.match && to.query.redirect.match(/redirect/g) != null)) {
        next({
          path: '/login',
          query: {
            redirect: '/user/userInfo'
          }
        })
      }
      // 否则跳转到来源url
      else {
        next({
          path: '/login',
          query: {
            redirect: from.fullPath
          }
        })
      }
    }
  }

  // 如果需要身份验证
  if (to.meta.requireAuth) {
    console.log('Going to:', to.path)
    console.log('    requireAuth:', to.meta.requireAuth)
    // console.log('    get JSESSIONID from cookie:', VueCookie.get('user'), '需要登陆:', !(window.uls && window.uls.get('userInfo', 'id')))
    console.log('    get JSESSIONID from cookie:', VueCookie.get('user'), '需要登陆:', !(store.get('clastooCurrentUser')))

    // 如果没有登录
    if (!(store.get('clastooCurrentUser'))) {
      console.log('没有登录')
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 把要跳转的地址作为参数传到下一步
      })
    }
    // 如果已登录，继续
    else {
      next()
    }
  } else {
    next()
  }
})

// axios请求拦截器
axios.interceptors.request.use(
  data => {
    // console.log('data>>>', data)
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
    store.remove('clastooCurrentUser')
    router.push('/login')
  }
  return response
}, function (error) {
  // session过期处理
  if (error.response.status === 401) {
    // 过期时去掉当前已登录用户标志
    store.remove('clastooCurrentUser')
    // 跳转到登陆页
    router.push('/login')
  } else {
    return Promise.reject(error)
  }
})
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>'
})
