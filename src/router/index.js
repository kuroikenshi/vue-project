import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import MyComp from '@/components/MyComp'

import LoginTest from '@/components/LoginTest'
import LoginWithVCode from '@/components/LoginWithVCode'
import E2Success from '@/components/E2Success'

import Chating from '@/components/Chating'

import Tabbar from '@/components/Tabbar'
import ClassList from '@/components/ClassList'
import MomentList from '@/components/MomentList'
import MomentItem from '@/components/MomentItem'
import MomentAdd from '@/components/MomentAdd'
import ChatList from '@/components/ChatList'
import UserInfo from '@/components/UserInfo'

import Refresh from '@/components/Refresh'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    // {
    //   path: 'my-comp',
    //   name: 'MyComp',
    //   component: MyComp
    // },
    
    // VueRouter刷新用
    {
      path: '/refresh',
      name: 'Refresh',
      component: Refresh
    },

    // 正式环境使用
    {
      path: '/login',
      name: 'Login',
      component: LoginWithVCode
    },
    // 测试环境使用
    /* {
      path: '/login',
      name: 'Login',
      component: LoginTest
    }, */
    
    // 单点登陆成功后的回调地址
    {
      path: '/e2success',
      name: 'E2Success',
      component: E2Success
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
      redirect: 'user/userInfo', // 默认首页

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
        path: 'class/momentAdd',
        name: 'MomentAdd',
        component: MomentAdd,
        meta: {
          requireAuth: true
        }
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
