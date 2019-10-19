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
          <!-- TODO: 可以加一个自由定义的按钮，目前判断成本过高，放弃优化 -->

          <!-- 发布班级动态 -->
          <a href="javascript: void(0);" class="tabbar-btn"
              @click="momentAdd" v-show="showMomentAdd">
            <i class="f7-icons">add</i>
          </a>

          <!-- 添加家长信息 -->
          <a href="javascript: void(0);" class="tabbar-btn link-color"
              @click="parentAdd" v-show="showParentAdd">
            添加
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

        showMomentAdd: false,
        showParentAdd: false,
        showBackBtn: true,
      }
    },
    created () {
      // 更新显示状态
      this._updateShowState()
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
        // 根据开头路径区分
        return (this.$router.history.current.path.indexOf('/' + path) == 0)
      },

      // 是否显示navbar
      isNavShow: function () {
        // console.log('params>>>', this.$route)
        let hideNavPath = ['/user/userInfo']
        return (hideNavPath.indexOf(this.$router.history.current.path) === -1)
      },

      // 是否显示tabbar
      isTabShow: function () {
        // console.log('params>>>', this.$route)
        let hideTabPath = ['/class/momentAdd']
        return (hideTabPath.indexOf(this.$router.history.current.path) === -1)
      },

      // 更新显示状态
      _updateShowState: function () {
        let ut = window.uls.get('userInfo', 'userType')
        // 显示发布动态按钮: 是moments路径，且身份为老师或助教
        this.showMomentAdd = (new RegExp('\/class\/[^\/]*\/moments')).test(this.$router.history.current.path) && (ut === Global.userType.TEACHER)

        // 显示新增家长按钮: 是/user/parentInfoList路径
        this.showParentAdd = (this.$router.history.current.path == '/user/parentInfoList')

        // 显示返回按钮: 非此路径
        this.showBackBtn = (this.$router.history.current.path !== '/class/classList')
      },

      // 更新一些值
      updateSomeValue: function(data) {
        // console.log('getNavbarTitle>>>>>>>>', this.navbarTitle, navbarTitle)
        for (let key in data) {
          this[key] = data[key]
        }
        // 更新显示状态
        this._updateShowState()
      },


      // 进入添加动态页面
      momentAdd () {
        this.$router.push('/class/' + this.$route.params.classCode + '/momentAdd')
      },

      // 进入添加家长信息页面
      parentAdd () {
        this.$router.push('/user/parentInfoAdd')
      },
    }
  }
</script>

<style scoped>
  .tabbar-btn .f7-icons {
    color: #333;
  }
  .tabbar-btn i.f7-icons {
    font-size: 18px;
  }
  .left {
    min-width: 18px;
  }
  .right {
    min-width: 18px;
  }
  .tabbar-btn.link-color {
    font-size: 16px;
  }
</style>
