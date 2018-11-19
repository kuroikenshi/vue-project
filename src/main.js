// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
// import axios from 'axios'
import store from './store/store'

import 'weui/dist/style/weui.min.css'
import '@/../static/css/app.css'

// f7-css
// import '@/../static/vendor/framework7/css/framework7.ios.css'

// f7-icons-css
import '@/../static/vendor/framework7-icons/css/framework7-icons.css'

Vue.use(VueResource)
// Vue.config.productionTip = false
// axios.defaults.withCredentials = true // 请求要求携带Cookie

// 路由过滤器
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    console.log('requireAuth>>>', to)
    console.log('store.getters.isLogined>>>', store.getters.isLogined)
    if (!store.getters.isLogined) {
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

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
