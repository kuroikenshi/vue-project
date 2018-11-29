<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title login-title-row">
        <span>登录</span>
        <img src="/static/imgs/user-photo.png" class="pull-right login-user-img"/>
      </h1>
    </div>
    <div class="page__bd">
      <div class="weui-cells no-line no-margin-top">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input type="text" class="weui-input" name="username" v-model="username" placeholder="请输入用户名" />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <input type="password" class="weui-input" name="password" v-model="password" placeholder="请输入密码" />
          </div>
        </div>

        <div class="weui-btn-area">
          <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="login">登录</a>
          <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="loginTestParent">登录-家长</a>
        </div>
      </div>
    </div><!-- end of .page__bd -->
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 登陆方法
    login: function (event) {
      // this.username = '18311021317'
      // this.password = '123'
      // 使用qs解决
      let postData = this.$qs.stringify({
        username: this.username,
        password: this.password
      })

      this.$axios.post('api/login', postData).then(res => {
        console.log('login>>>', res)
        // 登陆成功
        if (res.status === 200 && res.data.status === 200) {
          // 保存用户信息状态
          this.$cookie.set('user', this.$qs.stringify(res.data.data), {
            expires: 'session'
          })
          console.log('get cookie:', this.$cookie.get('user'))

          window.uls.init(res.data.data.username)

          // 跳转
          this.$router.push(this.$route.query.redirect)
        } else {
          alert(res.data.status + ': ' + res.data.msg)
        }
      })
    },

    // TODEL: 测试方法，上线删除
    loginTestParent: function (event) {
      this.username = '18311021317'
      this.password = '123'
      // 使用qs解决
      let postData = this.$qs.stringify({
        username: this.username,
        password: this.password
      })

      this.$axios.post('api/login', postData).then(res => {
        console.log('login>>>', res)
        // 登陆成功
        if (res.status === 200 && res.data.status === 200) {
          // 保存用户信息状态
          this.$cookie.set('user', this.$qs.stringify(res.data.data), {
            expires: 'session'
          })
          console.log('get cookie:', this.$cookie.get('user'))

          window.uls.init(res.data.data.username)

          // 跳转
          this.$router.push(this.$route.query.redirect)
        } else {
          alert(res.data.status + ': ' + res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
  .page__title {
    padding: 40px 25px 20px 25px;
    text-align: left;
    font-size: 18px;
    font-weight: 400;
  }
  .login-title-row {
    line-height: 60px;
    vertical-align: middle;
  }
  .login-user-img {
    height: 60px;
    border-radius: 60px;
  }
  .weui-cell {
    padding: 10px 25px;
  }
  .weui-input {
    font-size: 15px;
  }
  .weui-btn-area {
    margin: 1.17647059em 25px .3em;
  }
</style>
