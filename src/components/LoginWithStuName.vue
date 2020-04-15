<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title login-title-row">
        <span>请输入学生姓名和手机号登录</span>
        <img src="/banji/static/imgs/user-photo.png" class="pull-right login-user-img" />
      </h1>
    </div>
    <div class="page__bd">
      <form id="loginForm">
        <div class="weui-cells no-line no-margin-top weui-cells_form">

          <!-- 学员姓名 -->
          <div class="weui-cell invalid-event-handler">
            <div class="weui-cell__bd">
              <input type="text" class="weui-input" id="name" v-model="name" placeholder="请输入学生姓名" v-on:change="nameChange" />
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          
          <!-- 手机号码 -->
          <div class="weui-cell invalid-event-handler">
            <div class="weui-cell__bd">
              <input type="tel" class="weui-input" id="mobile" v-model="mobile" placeholder="请输入手机号" v-on:change="mobileChange" />
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>

          <!-- 图像验证码 -->
          <div class="weui-cell invalid-event-handler">
            <div class="weui-cell__bd">
              <input type="text" class="weui-input" id="kaptchaText" v-model="kaptchaText" placeholder="请输入验证码">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
              <img class="weui-vcode-img" style="height: 35px;" v-bind:src="captchaUrl" v-on:click="getCaptcha">
            </div>
          </div>

          <div class="weui-btn-area">
            <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="login">登录</a>
          </div>
          <div class="weui-btn-area">
            <!-- <a href="javascript:void(0);" class="weui-btn weui-btn_warn" v-on:click="fillInfo">马小雅</a> -->
            <!-- <a href="javascript:void(0);" class="weui-btn weui-btn_warn" v-on:click="loginParentTest">loginParentTest</a> -->
            <!-- <a href="javascript:void(0);" class="weui-btn weui-btn_warn" v-on:click="teacherLoginTest">teacherLoginTest</a> -->
          </div>
        </div>
      </form>

      <div class="weui-cells no-line no-margin-top">
        <!-- 跳转到其他登陆页 -->
        <div class="weui-flex weui-cells__tips">
            <div class="weui-flex__item">
              <div class="placeholder">
                <!-- <a class="link-color" href="javascript: void(0);">遇到问题?</a> -->
              </div>
            </div>
            <div>
              <div class="placeholder">
                <a class="link-color" href="/banji/login/teacherLogin">教师登录</a>
              </div>
            </div>
        </div>
      </div>
    </div><!-- end of .page__bd -->
  </div>
</template>

<script>
  import Global from '@/components/Global'
  import store from 'store'
  import _ from 'lodash'
  import weui from 'weui.js'

  // 报错提示
  function setInvalid(id, tipText) {
    window.weuiErr(tipText)

    // 提示标志
    $('#' + id).closest('.invalid-event-handler').addClass('weui-cell_warn').one('click', function() {
      $(this).removeClass('weui-cell_warn')
    })
  }

  export default {
    name: 'Login',
    data () {
      return {
        gotCaptchaUrl: '',  // 获取kaptcha的url

        name: '',        // 学生姓名
        nameOld: '',     // 上一次存储的学生姓名
        mobile: '',         // 手机号
        mobileOld: '',      // 上一次存储的手机号
        kaptchaText: ''     // kaptcha图片中的文字
      }
    },
    created: function () {
      // 先判断是否已经登录，但是误进入登陆页面
      if (!!store.get('clastooCurrentUser') && window.uls.isReady()) {
        this._goCallback()
      }

      this.getCaptcha()
    },
    beforeDestroy: function() {
    },
    computed: {
      captchaUrl: function () {
        return this.gotCaptchaUrl || "/banji/static/imgs/captcha-loading.gif"
      },
    },
    methods: {
      // 手机号改变时的处理
      mobileChange: function () {
        // 第一次输入手机号时，不触发刷新图片二维码，减少负载
        if (this.mobileOld !== '' && this.mobileOld !== this.mobile) {
          this.getCaptcha()
        }
        this.mobileOld = this.mobile
      },
      
      // 学员姓名改变时进行的处理
      nameChange: function () {
        // 第一次输入学员姓名时，不触发刷新图片二维码，减少负载
        if (this.nameOld !== '' && this.nameOld !== this.name) {
          this.getCaptcha()
        }
        this.nameOld = this.name
      },

      // 获取图片验证码的方法
      getCaptcha: function () {
        this.gotCaptchaUrl = undefined
        let img = new Image()
        let url = '/banji/login/getkaptcha?_=' + (new Date()).valueOf() + Math.random()
        img.onload = () => {
          this.gotCaptchaUrl = url
        }
        img.onerror = () => {
          this.gotCaptchaUrl = "/banji/static/imgs/captcha-failed.png"
        }
        img.src = url
      },
      
      // 步骤: 跳转callback
      _goCallback: function () {
        // 跳转回redirect地址
        if (!!this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        }
        // 如果没有就默认跳转到用户信息页面
        else {
          this.$router.push('user/userInfo')
        }
      },

      // TO DEL: 绕过手机短信登陆，上线删除
      /* loginParentTest: function (event) {
        this.$axios.post('/banji/login/parentTest').then(res => {
          console.log('login Resp>>>', res)
          // 登陆成功
          if (res.status === 200 && res.data.status === 200) {
            // 保存用户信息状态
            this.$cookie.set('user', this.$qs.stringify(res.data.data.user), {
              expires: 'session'
            })

            var userInfo = this.$qs.parse(this.$cookie.get('user'))
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
              if (!Array.isArray(ut)) {
                ut = [ut]
              }
              ut.forEach(item => {
                console.log(Global.userType.ADMIN === parseInt(item), Global.userType.PARENT === parseInt(item), Global.userType.TEACHER === parseInt(item))
              })
            }
            // 万一没有username的情况
            else {
              window.weuiErr('Cookie中username为: ' + this.username + '')
              return
            }

            // 跳转回redirect地址
            this._goCallback()
          } else {
            window.weuiErr(res.data.status + ': ' + res.data.msg)
          }
        })
      }, 
      */

      // TO DEL: 绕过手机短信登陆，上线删除
      /* teacherLoginTest: function (event) {
        this.$axios.post('/banji/login/teacherLoginTest').then(res => {
          console.log('login Resp>>>', res)
          // 登陆成功
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
            }
            // 万一没有username的情况
            else {
              window.weuiErr('Cookie中username为: ' + this.username + '')
              return
            }

            // 跳转回redirect地址
            this._goCallback()
          } else {
            window.weuiErr(res.data.status + ': ' + res.data.msg)
          }
        })
      }, 
      */

      // TO DEL: 填写马小雅信息，测试用，上线删除
      /* fillInfo: function (event) {
        if (window.fi_click_count == undefined) {
          window.fi_click_count = 1;
        } else {
          window.fi_click_count += 1;
        }
        
        if (window.fi_click_count == 20) {
          this.name = '马小雅'
          this.mobile = '13811118041'
          window.fi_click_count = undefined
        }
      }, */

      // 登陆方法
      login: function (event) {
        let formData = {
          name: this.name,
          mobile: this.mobile,
          kaptchaText: this.kaptchaText,
        }

        // 校验必填
        let isValid = true
        Object.keys(formData).forEach((kw) => {
          console.log(kw, formData[kw], !(formData[kw].trim()))
          if (!formData[kw].trim()) {
            setInvalid(kw, '请补充空白数据')
            isValid = false
          }
        })
        if (!isValid) {
          return
        }

        // 使用qs解决
        let postData = this.$qs.stringify(formData)

        this.$axios.post('/banji/login/parentLogin', postData).then(res => {
          console.log('login Resp>>>', res)
          
          // 登陆成功
          if (res.status === 200 && res.data.status === 200) {
            // 保存用户信息状态
            this.$cookie.set('user', this.$qs.stringify(res.data.data.user), {
              expires: 'session'
            })

            let userInfo = this.$qs.parse(this.$cookie.get('user'))
            console.log('get cookie:', userInfo)

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
              // if (!Array.isArray(ut)) {
              //   ut = [ut]
              // }
              // ut.forEach(item => {
              //   console.log(Global.userType.ADMIN)
              //   console.log(Global.userType.PARENT)
              //   console.log(Global.userType.TEACHER)
              //   console.log(parseInt(item))
              //   console.log(Global.userType.ADMIN === parseInt(item), Global.userType.PARENT === parseInt(item), Global.userType.TEACHER === parseInt(item))
              // })
            }
            // 万一没有username的情况
            else {
              window.weuiErr('Cookie中username为: ' + this.username + '')
              return
            }

            // 跳转回redirect地址
            this._goCallback()
          } else {
            window.weuiErr(res.data.status + ': ' + res.data.msg)
          }
          
          // 重新申请kaptcha
          this.getCaptcha()
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
    height: 35px;
    padding: 10px 25px;
  }
  .weui-cell.with-bottom-line:after {
    content: " ";
    position: absolute;
    right: 15px;
    bottom: 0;
    left: 15px;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    z-index: 2;
  }

  .weui-cell__ft i.weui-icon-warn {
    font-size: 23px;
  }

  .weui-cells__tips {
    margin-top: 0;
  }
  .weui-vcode-img {
    width: 100px;
    background: #eee;
  }
  .weui-input {
    font-size: 15px;
  }
  .weui-btn-area {
    /* margin: 1.17647059em 25px .3em; */
    margin: 5px 15px 20px;
  }
</style>
