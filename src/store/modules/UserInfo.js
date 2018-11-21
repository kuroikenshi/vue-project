/* import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

// 用户信息储存模块
let state = {
  username: VueCookie.get('username'),
  userInfo: VueCookie.get('userInfo')
}

const getters = {
  isLogined: function (state) {
    return !!state.username
  }
}

const mutations = {
  updateUserInfo: function (state, userInfo) {
    console.log('store.UserInfo.updateUserInfo', userInfo)
    VueCookie.set('username', userInfo.username)
    VueCookie.set('userInfo', userInfo)
    state.username = userInfo.username
    state.userInfo = userInfo
  }
}

let UserInfo = {
  state,
  getters,
  mutations
}

export default UserInfo */
