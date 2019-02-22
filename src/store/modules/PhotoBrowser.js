import Vue from 'vue'

// 用户信息储存模块
const state = {
  photos: [
    { 'id': 0, 'url': '/static/imgs/th1.jpg' },
    { 'id': 1, 'url': '/static/imgs/m3.jpg' },
    { 'id': 2, 'url': '/static/imgs/sb1.jpg' }
  ],
  showPB: false,
  activeIndex: 4
}

// 对应compute
const getters = {
  photos: function(state) {
    return state.photos
  },
  isShow: function (state) {
    return state.showPB ? 'block' : 'none'
  }
}

// 对应method
const mutations = {
  setPhotos: function (state, photos) {
    state.photos = photos
    console.log('DDDDDDDDDDDDDDDDDDDDDSET photos>>>', state.photos)
  },
  togglePBShow: function (state) {
    state.showPB = !state.showPB
  },
  PBshow: function (state) {
    console.log('>>> PBshow')
    state.showPB = true
  },
  PBhide: function (state) {
    console.log('>>> PBhide')
    state.showPB = false
  }
}

let Msg = {
  state,
  getters,
  mutations
}

export default Msg
