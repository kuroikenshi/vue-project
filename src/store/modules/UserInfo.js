import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

// 用户信息储存模块
const state = {
	username: VueCookie.get('username'),
	cn: VueCookie.get('usernameCN'),
	uuid: VueCookie.get('uuid')
};

const getters={
	isLogined: state => {
		return !!state.uuid
	}
};

const mutations={
	login: loginData => {
		console.log('login')
	}
}

const UserInfo = {
	state,
	getters,
	mutations
};

export default UserInfo