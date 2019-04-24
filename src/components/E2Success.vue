<template>
  <div>
    登录成功，请稍候……
  </div>
</template>

<script>
  export default {
    name: 'MyComp',
    created () {
      setTimeout(() => {
        // 跳转回redirect地址
        if (!!this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        }
        // 如果没有就默认跳转到用户信息页面
        else {
          this.$router.push('user/userInfo')
        }
      }, 1000)
    }
  }
</script>

<style>
</style>
