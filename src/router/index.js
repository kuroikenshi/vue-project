import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import MyComp from '@/components/MyComp'

import Login from '@/components/Login'

import Chating from '@/components/Chating'

import Tabbar from '@/components/Tabbar'
import ClassList from '@/components/ClassList'
import MomentList from '@/components/MomentList'
import MomentItem from '@/components/MomentItem'
import ChatList from '@/components/ChatList'
import UserInfo from '@/components/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {
    //   path: '/my-comp',
    //   name: 'MyComp',
    //   component: MyComp
    // },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/chating',
      name: 'Chating',
      component: Chating
    },

    // 带底部工具条的
    {
      path: '/',
      name: 'Tabbar',
      component: Tabbar,
      redirect: '/user/userInfo', // 默认首页

      children: [{
        path: 'class/classList',
        name: 'ClassList',
        component: ClassList,
        meta: {
          requireAuth: true
        }
      }, {
        path: 'class/:classCode/moments',
        name: 'MomentList',
        component: MomentList,
        meta: {
          requireAuth: true
        }
      }, {
        path: 'test/momentItem',
        name: 'MomentItem',
        component: MomentList
      }, {
        path: 'chat/chatList',
        name: 'ChatList',
        component: ChatList,
        meta: {
          requireAuth: true
        }
      }, {
        path: 'user/userInfo',
        name: 'UserInfo',
        component: UserInfo,
        meta: {
          requireAuth: true
        }
      }]
    }
  ]
})
