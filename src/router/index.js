import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import MyComp from '@/components/MyComp'

import LoginTest from '@/components/LoginTest'
import LoginWithVCode from '@/components/LoginWithVCode'
import LoginWithStuName from '@/components/LoginWithStuName'
import E2Success from '@/components/E2Success'
import NotTeacher from '@/components/NotTeacher'

import Chating from '@/components/Chating'

import Tabbar from '@/components/Tabbar'
import ClassList from '@/components/ClassList'
import MomentList from '@/components/MomentList'
import MomentItem from '@/components/MomentItem'
import MomentAdd from '@/components/MomentAdd'
import ChatList from '@/components/ChatList'

import UserInfo from '@/components/UserInfo'
// import ParentInfoList from '@/components/ParentInfoList'
// import ParentInfoAdd from '@/components/ParentInfoAdd'
// import ParentInfoEdit from '@/components/ParentInfoEdit'
import ClassContacts from '@/components/ClassContacts'
import Schedule from '@/components/Schedule'

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
      component: LoginWithStuName
    },
    // 测试环境使用
    /* {
      path: '/loginTest',
      name: 'LoginTest',
      component: LoginTest
    }, */

    // 单点登陆成功后的回调地址
    {
      path: '/e2success',
      name: 'E2Success',
      component: E2Success
    },

    {
      path: '/notTeacher',  // 不是教师页面
      name: 'NotTeacher',
      component: NotTeacher
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
        path: 'class/:classCode/momentAdd',
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
      // }, {
      //   path: 'user/parentInfoList',
      //   name: 'ParentInfoList',
      //   component: ParentInfoList,
      //   meta: {
      //     requireAuth: true
      //   }
      // }, {
      //   path: 'user/parentInfoAdd',
      //   name: 'ParentInfoAdd',
      //   component: ParentInfoAdd,
      //   meta: {
      //     requireAuth: true
      //   }
      // }, {
      //   path: 'user/parentInfoEdit/:uid',
      //   name: 'ParentInfoEdit',
      //   component: ParentInfoEdit,
      //   meta: {
      //     requireAuth: true
      //   }
      }, {
        path: 'user/classContacts',
        name: 'ClassContacts',
        component: ClassContacts,
        meta: {
          requireAuth: true
        }
      }, {
        path: 'user/schedule',
        name: 'Schedule',
        component: Schedule,
        meta: {
          requireAuth: true
        }
      }]
    }
  ]
})
