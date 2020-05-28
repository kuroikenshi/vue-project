<template>
  <div>
    登录成功，请稍候……<br>
    如果响应时间过长，请尝试刷新<br>
    如果页面报错，请联系管理员
  </div>
</template>

<script>
  import Global from '@/components/Global'
  import store from 'store'

  export default {
    name: 'MyComp',
    created () {
      // e2登陆成功后，请求用户信息，初始化uls
      console.log('e2登陆成功后，请求用户信息，初始化uls')
      this.$axios.post('/login/getTeacherInfo').then(res => {
        console.log('login Resp>>>', res)
        // 成功
        if (res.status === 200 && res.data.status === 200) {
          // 保存用户信息状态
          this.$cookie.set('user', this.$qs.stringify(res.data.data.user), {
            expires: 'session'
          })

          let userInfo = this.$qs.parse(this.$cookie.get('user'))
          console.log('get cookie:', userInfo)

          // if (!!userInfo['username']) {
          if (!!userInfo['id']) {
            // uls指定用户并初始化
            store.set('clastooCurrentUser', userInfo['id'])
            window.uls.init(userInfo['id'])

            console.log('userInfo:', userInfo)

            // 将值放入uls
            let keys = Object.keys(userInfo)
            for (let i = 0; i < keys.length; i++) {
              window.uls.set('userInfo', keys[i], userInfo[keys[i]])
            }

            // 测试用
            let ut = window.uls.get('userInfo', 'userType')
            console.log('登陆身份参数 >>>', ut)
            console.log(Global.userType.ADMIN === ut, Global.userType.PARENT === ut, Global.userType.TEACHER === ut)

            // 跳转回redirect地址
            if (!!this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            }
            // 如果没有就默认跳转到用户信息页面
            else {
              this.$router.push('user/userInfo')
            }
          }
          // 万一没有username的情况
          else {
            window.weuiErr('Cookie中username为: ' + this.username + '')
            return
          }
        } else {
          window.weuiErr(res.data.status + ': ' + res.data.msg)
        }
      })
    }
  }
</script>

<style>
</style>
