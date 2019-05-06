<template>
  <div class="weui-tab">
    <!-- 上部导航条，class设置为weui-navbar-hide不显示 -->
    <div :class="{'weui-navbar-hide': !isNavShow(), 'weui-navbar': isNavShow()}">
      <div class="weui-navbar-inner">
        <div class="left sliding">
          <a href="javascript: void(0);" class="tabbar-btn"
              @click="goBack" v-show="showBackBtn">
            <i class="f7-icons">chevron_left</i>
          </a>
        </div>

        <div class="center sliding stronger">{{navbarTitle}}</div>

        <div class="right">
          <!-- 发布班级动态 -->
          <a href="javascript: void(0);" class="tabbar-btn"
              @click="momentAdd" v-show="showAddMoment">
            <i class="f7-icons">add</i>
          </a>
        </div>
      </div>
    </div>

    <div class="weui-tab__panel" :class="{'no-tabbar': !isTabShow()}">
      <!-- <div style="padding-left: 5px; background: lightgray;">{{ $router.history.current.path }}</div> -->
      <router-view @eventPop_updateTabbar="updateSomeValue"></router-view>
    </div>

    <div :class="{'weui-tabbar-hide': !isTabShow(), 'weui-tabbar': isTabShow()}">
      <router-link href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': isCurrent('class')}" to="/class/classList">
        <i class="weui-tabbar__icon my-icon icon-home"></i>
        <p class="weui-tabbar__label">班级空间</p>
      </router-link>
      <!-- <router-link href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': isCurrent('chat')}" to="/chat/chatList">
        <i class="weui-tabbar__icon my-icon icon-mail"></i>
        <p class="weui-tabbar__label">私信</p>
      </router-link> -->
      <router-link href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': isCurrent('user')}" to="/user/userInfo">
        <i class="weui-tabbar__icon my-icon icon-user"></i>
        <p class="weui-tabbar__label">我</p>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Global from '@/components/Global'

  export default {
    name: 'tabbar',
    data () {
      return {
        // msg: 'This is my component',
        navbarTitle: '----',
        backPath: '',
        showAddMoment: false,
        showBackBtn: true,
      }
    },
    created () {
      // 更新新增动态按钮的显示状态
      this.updateShowAddMoment()
      // 更新返回按钮的显示状态
      this.updateShowBackBtn()
    },
    methods: {
      go: function (path) {
        // console.log('>>>', this.$router.history.current.path + '/' + path)
        this.$router.push(this.$router.history.current.path + '/' + path)
      },
      goBack: function () {
        if (!this.backPath) {
          this.$router.back()
        } else {
          let backPath = this.backPath
          this.backPath = ''
          this.$router.push(backPath)
        }
      },
      // 是当前路径
      isCurrent: function (path) {
        return (this.$router.history.current.path.indexOf(path) > -1)
      },
      // 是否显示navbar
      isNavShow: function () {
        // console.log('params>>>', this.$route)
        let hideNavPath = ['/user/userInfo']
        return (hideNavPath.indexOf(this.$router.history.current.path) === -1)
      },
      // 是否显示navbar
      isTabShow: function () {
        // console.log('params>>>', this.$route)
        let hideTabPath = ['/class/momentAdd']
        return (hideTabPath.indexOf(this.$router.history.current.path) === -1)
      },
      
      // 更新新增动态按钮的显示状态
      updateShowAddMoment: function () {        
        let ut = window.uls.get('userInfo', 'userType')
        // 是moments路径，且身份为老师或助教
        console.log('>>> ut:', ut)
        console.log(' -> 显示新增按钮:' + (new RegExp('\/class\/[^\/]*\/moments')).test(this.$router.history.current.path) + ' && ' + (ut === Global.userType.TEACHER))
        this.showAddMoment = (new RegExp('\/class\/[^\/]*\/moments')).test(this.$router.history.current.path) && (ut === Global.userType.TEACHER)
      },
      
      // 更新返回按钮的显示状态
      updateShowBackBtn: function () {
        this.showBackBtn = (this.$router.history.current.path !== '/class/classList')
      },
      
      // 更新一些值
      updateSomeValue: function(data) {
        // console.log('getNavbarTitle>>>>>>>>', this.navbarTitle, navbarTitle)
        for (let key in data) {
          this[key] = data[key]
        }
        // 更新新增动态按钮的显示状态
        this.updateShowAddMoment()
        // 更新返回按钮的显示状态
        this.updateShowBackBtn()
      },
      // 进入班级动态
      momentAdd () {    
        this.$router.push('/class/momentAdd')
      }
    }
  }
</script>

<style scoped>
  .tabbar-btn {
    color: #333!important;
  }
  .tabbar-btn i.f7-icons {
    font-size: 18px;
  }
  .right {
    min-width: 18px;
  }
</style>
