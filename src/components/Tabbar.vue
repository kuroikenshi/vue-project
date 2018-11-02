<template>
  <div class="weui-tab">
    <!-- 上部导航条，class设置为weui-navbar-hide不显示 -->
    <div :class="{'weui-navbar-hide': !isNavShow(), 'weui-navbar': isNavShow()}">
      <div class="weui-navbar-inner">
        <div class="left sliding">
          <a href="#" class="back link">
            <i class="f7-icons">chevron_left</i>
            <!--span class="f7-icons-text">Back</span-->
          </a>
        </div>
        <div class="center sliding">{{navbarTitle}}</div>
        <div class="right">
          <a href="#" class="link open-panel" data-panel="right">
            <!--span class="f7-icons-text">Prev</span-->
            <i class="f7-icons">add</i>
          </a>
        </div>
      </div>
    </div>

    <div class="weui-tab__panel">
      <router-view @eventPop_updateNavbarTitle="getNavbarTitle"></router-view>
    </div>

    <div class="weui-tabbar">
      <router-link href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': isCurrent('class')}" to="/class/classList">
        <i class="weui-tabbar__icon my-icon icon-home"></i>
        <p class="weui-tabbar__label">班级空间</p>
      </router-link>
      <router-link href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': isCurrent('chat')}" to="/chat/chatList">
        <i class="weui-tabbar__icon my-icon icon-mail"></i>
        <p class="weui-tabbar__label">私信</p>
      </router-link>
      <router-link href="javascript:;" class="weui-tabbar__item" :class="{'weui-bar__item_on': isCurrent('user')}" to="/user/userInfo">
        <i class="weui-tabbar__icon my-icon icon-user"></i>
        <p class="weui-tabbar__label">我</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  data () {
    return {
      // msg: 'This is my component',
      navbarTitle: '----'
    }
  },
  methods: {
    go: function (path) {
      console.log('>>>', this.$router.history.current.path + '/' + path)
      this.$router.push(this.$router.history.current.path + '/' + path)
    },
    // 是当前路径
    isCurrent: function (path) {
      return (this.$router.history.current.path.indexOf(path) > -1)
    },
    // 是否显示navbar
    isNavShow: function () {
      console.log('params>>>', this.$route)
      let hideNavPath = ['/user/userInfo']
      return (hideNavPath.indexOf(this.$router.history.current.path) === -1)
    },
    getNavbarTitle (navbarTitle) {
      console.log('getNavbarTitle>>>>>>>>', this.navbarTitle, navbarTitle)
      this.navbarTitle = navbarTitle
    }
  }
}
</script>

<style>

</style>
