<template>
  <div class="weui-tab">
    <div class="weui-tab__panel">
      <router-view></router-view>
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
      msg: 'This is my component'
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
    }
  }
}
</script>

<style>

</style>
