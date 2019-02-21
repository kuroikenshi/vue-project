import Vue from 'vue'

// 用户信息储存模块
const state = {
  msg: 'hello world'
}

const getters = {
  getMsg: function (state) {
    return state.msg
  }
}

const mutations = {
  updateMsg: function (state, msg) {
    state.msg = msg
  }
}

let Msg = {
  state,
  getters,
  mutations
}

export default Msg
