<template>
  <div class="page">
    <div class="page__hd">
      <h1 class="page__title login-title-row">
        <span>手机号验证码登录</span>
        <img src="/static/imgs/user-photo.png" class="pull-right login-user-img"/>
      </h1>
    </div>
    <div class="page__bd">
      <form id="loginForm">
        <div class="weui-cells no-line no-margin-top weui-cells_form">
          
          <div class="weui-cell invalid-event-handler">
            <div class="weui-cell__bd">
              <input type="tel" class="weui-input" id="mobile" v-model="mobile" placeholder="请输入手机号" v-on:change="mobileChange" />
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
            </div>
          </div>
          
          <div class="weui-cell invalid-event-handler">
            <div class="weui-cell__bd">
              <input type="text" class="weui-input" id="kaptchaText" v-model="kaptchaText" placeholder="请输入验证码">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
              <img class="weui-vcode-img" style="height: 35px;" v-bind:src="captchaUrl" v-on:click="getCaptcha">
            </div>
          </div>
          
          <div class="weui-cell invalid-event-handler">
            <div class="weui-cell__bd">
              <input type="number" class="weui-input" id="verificationCode" v-model="verificationCode" placeholder="请输入短信验证码">
            </div>
            <div class="weui-cell__ft">
              <i class="weui-icon-warn"></i>
              <button type="button" class="weui-btn weui-btn_mini weui-btn_primary" style="height: 35px;" v-on:click="sendSmsCode" v-bind:disabled="!sendSmsBtnEnable">{{sendSmsBtnText}}</button>
            </div>
          </div>
           
          <div class="weui-cell weui-cells__tips">新手机号首次登录会自动创建新账号</div>

          <div class="weui-btn-area">
            <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="login">登录</a>
          </div>
        </div>
      </form>
      
      <div class="weui-cells no-line no-margin-top">
        <!-- 跳转到其他登陆页 -->
        <div class="weui-flex weui-cells__tips">
            <div class="weui-flex__item">
              <div class="placeholder">
                <a class="link-color" href="javascript: void(0);">遇到问题?</a></div>
            </div>
            <div>
              <div class="placeholder">
                <a class="link-color" href="javascript: void(0);">教师登录</a></div>
            </div>
        </div>
      </div>
    </div><!-- end of .page__bd -->
  </div>
</template>

<script>
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
        gotCaptchaUrl: '',
        
        verifyCodeCD: 0,    // 发送手机短信方法的冷却值
        verifyCodeTimer: undefined,   // 发送手机短信冷却的计时器
        
        mobile: '',
        mobileOld: '',
        kaptchaText: '',
        verificationCode: ''
      }
    },
    created: function () {
      this.getCaptcha()
    },
    beforeDestroy: function() {
      this.verifyCodeCD = 0
    },
    computed: {
      captchaUrl: function () {
        return this.gotCaptchaUrl || "/static/imgs/captcha-loading.gif"
      },
      // 发送短信按钮是否可用
      sendSmsBtnEnable: function () {
        return this.verifyCodeCD == 0
      },
      // 发送短信按钮上的文字
      sendSmsBtnText: function () {
        if (this.verifyCodeCD == 0) {
          return '获取短信验证码'
        } else {
          return this.verifyCodeCD + '秒后重发'
        }
      }
    },
    methods: {
      // 手机号改变时的处理
      mobileChange: function () {
        if (this.mobileOld !== '' && this.mobileOld !== this.mobile) {
          this.getCaptcha()
        }
        this.mobileOld = this.mobile
      },
      
      // 获取图片验证码的方法
      getCaptcha: function () {
        this.gotCaptchaUrl = undefined
        let img = new Image()
        let url = 'login/getkaptcha?_=' + (new Date()).valueOf() + Math.random()
        img.onload = () => {
          this.gotCaptchaUrl = url
          this.verifyCodeCD = 0
        }
        img.onerror = () => {
          this.gotCaptchaUrl = "/static/imgs/captcha-failed.png"
          this.verifyCodeCD = 0
        }
        img.src = url
      },
      
      // 发送手机验证码的方法
      sendSmsCode: function () {
        this.verifyCodeCountDown()
        
        // 校验手机号
        var mobileRegx = new RegExp('(^1\\d{10}$)|(^09\\d{8}$)')
        if (!mobileRegx.test(this.mobile)) {
          setInvalid('mobile', '请输入11位手机号，不带空格')
          this.verifyCodeCD = 0
          return
        }
        // 校验kaptchaText
        else if (!this.kaptchaText) {
          setInvalid('kaptchaText', '输入图片验证码')
          this.verifyCodeCD = 0
          return
        }
        
        // 请求手机验证码
        let postData = this.$qs.stringify({
          mobile: this.mobile,
          kaptchaText: this.kaptchaText
        })
        this.$axios.post('login/smsLogin/sendSmsCode', postData).then(res => {
          console.log('login/smsLogin/sendSmsCode resp>>>', res)
          if (res.status === 200 && res.data.status === 200) {
            window.vue.$weui.topTips('已发送短信到手机', {
              duration: 3000,
              className: 'weui-toptips_visible xdf_green'
            })
          } else {
            window.weuiErr(res.data.status + ': ' + res.data.msg)
          }
        })
      },
      
      // 发送按钮冷却// 验证码重发倒计时
      verifyCodeCountDown: function () {
        if (this.verifyCodeTimer === undefined) {
          this.verifyCodeCD = 60 // 设置60秒的cd
          this.verifyCodeTimer = setInterval(() => {
            this.verifyCodeCD -= 1
            if (this.verifyCodeCD <= 0) {
              this.verifyCodeCD = 0
              clearInterval(this.verifyCodeTimer)
              this.verifyCodeTimer = undefined
            }
          }, 1000);
        }
      },
      
      // 登陆方法
      login: function (event) {
        // 使用qs解决
        let postData = this.$qs.stringify({
          mobile: this.mobile,
          kaptchaText: this.kaptchaText,
          verificationCode: this.verificationCode
        })
        
        this.$axios.post('login/smsLogin/verifySmsCode', postData).then(res => {
          console.log('login Resp>>>', res)
          // 登陆成功
          if (res.status === 200 && res.data.status === 200) {
            // 保存用户信息状态
            this.$cookie.set('user', this.$qs.stringify(res.data.data.user), {
              expires: 'session'
            })
            console.log('get cookie:', this.$qs.parse(this.$cookie.get('user')))

            if (!!this.$qs.parse(this.$cookie.get('user'))['username']) {
              // 加载指定用户的uls
              window.uls.init(this.$qs.parse(this.$cookie.get('user'))['username'])
              // 更新uls中存储的信息（中文名，userId）
              window.uls.set('userinfo', 'username', this.$qs.parse(this.$cookie.get('user'))['username'])
              window.uls.set('userinfo', 'id', this.$qs.parse(this.$cookie.get('user'))['id'])
              window.uls.set('userinfo', 'userType', this.$qs.parse(this.$cookie.get('user'))['userType'])
            }
            // 万一没有username的情况
            else {
              window.weuiErr('Cookie中username为: ' + this.username + '')
              return
            }
            
            // 跳转回redirect地址
            if (!!this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            }
            // 如果没有就默认跳转到用户信息页面
            else {
              this.$router.push('user/userInfo')
            }
          } else {
            window.weuiErr(res.data.status + ': ' + res.data.msg)
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
