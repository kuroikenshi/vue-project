import Vue from 'vue'
import VueCookie from 'vue-cookie'
import axios from 'axios'
Vue.use(VueCookie)

// 用户信息储存模块
const state = {
  username: VueCookie.get('username'),
  cn: VueCookie.get('usernameCN'),
  uuid: VueCookie.get('uuid')
}

const getters = {
  isLogined: function (state) {
    return !!state.uuid
  }
}

const mutations = {
  login: function (state, loginData) {
    console.log('login')
    axios({
      method: 'post',
      url: 'api/newLogin',
      dataType: 'json',
      params: {
        username: loginData.username,
        password: loginData.password
      }
    }).then(res => {
      console.log('1>>>', res)
    })

    axios({
      method: 'post',
      url: 'api/newLogin',
      dataType: 'json',
      data: {
        username: loginData.username,
        password: loginData.password
      }
    }).then(res => {
      console.log('2>>>', res)
    })

    axios.post('api/newLogin', {
      username: loginData.username,
      password: loginData.password
    }).then(res => {
      console.log('3>>>', res)
    })
  }
}

const UserInfo = {
  state,
  getters,
  mutations
}

export default UserInfo
