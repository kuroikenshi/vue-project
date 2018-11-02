// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'weui/dist/style/weui.min.css'
import '@/../static/css/app.css'

// f7-css
// import '@/../static/vendor/framework7/css/framework7.ios.css'

// f7-icons-css
import '@/../static/vendor/framework7-icons/css/framework7-icons.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
