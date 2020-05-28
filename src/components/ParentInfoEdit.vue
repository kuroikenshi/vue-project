<template>
  <div class="page">
    <div class="weui-cells weui-cells_form no-line">

      <div class="weui-cell invalid-event-handler weui-cell-taller">
        <div class="weui-cell__hd">
          <label class="weui-label">学生姓名</label>
        </div>
        <div class="weui-cell__bd">
          {{stuName}}
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>

      <div class="weui-cell invalid-event-handler weui-cell-taller">
        <div class="weui-cell__hd">
          <label class="weui-label">称谓</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" id="relation" v-model="formData.relation" placeholder="请输入您的称谓(如: 父亲、母亲)" />
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>

      <div class="weui-cell invalid-event-handler weui-cell-taller">
        <div class="weui-cell__hd">
          <label class="weui-label">电话</label>
        </div>
        <div class="weui-cell__bd">
          <input type="mobile" class="weui-input" id="mobile" v-model="formData.mobile" placeholder="请输入手机号(作为登录账号使用)" />
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>

    </div><!-- END OF .weui-cells -->

    <!-- 隐私条款 -->
    <div class="weui-agree">
      <input type="checkbox" class="weui-agree__checkbox" v-model="agree">
      <span class="weui-agree__text">
        我接受并同意
        <a href="http://www.xdf.cn/zhuanti/contract-pc/index.html" target="_blank">《用户服务条款》</a>
        和
        <a href="http://www.xdf.cn/zhuanti/privacy-pc/index.html" target="_blank">《隐私权相关政策》</a>
      </span>
    </div>

    <div class="weui-btn-area">
      <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="editParentInfo" v-bind:disabled="!agree">修改</a>
    </div>
  </div>
</template>

<script>
  // 报错提示
  function setInvalid(id, tipText) {
    window.weuiErr(tipText)

    // 提示标志
    $('#' + id).closest('.invalid-event-handler').addClass('weui-cell_warn').one('focusin', function() {
      $(this).removeClass('weui-cell_warn')
    })
  }

  export default {
    name: 'ParentInfoEdit',
    data () {
      return {
        stuName: window.uls.get('userInfo', 'stuName'),
        formData: {
          id: '',
          relation: '-- 查询中 --',
          mobile: '-- 查询中 --'
        },
        agree: true,
      }
    },
    computed: {
    },
    created () {
      // 更新tabbar参数
      this.$emit('eventPop_updateTabbar', {
        'navbarTitle': '修改家长信息',
        'backPath': '/user/parentInfoList'
      })

      // 获取原始信息
      let postData = this.$qs.stringify({id: this.$route.params.uid})
      this.$axios.post('/user/getUserInfoById', postData).then(res => {
        console.log('/user/getUserInfoById resp>>>', res)
        if (res.status === 200 && res.data.status === 200) {
          this.formData['id'] = this.$route.params.uid
          this.formData['relation'] = res.data.data.relation
          this.formData['mobile'] = res.data.data.mobile
        } else {
          window.weuiErr(res.data.status + ': ' + res.data.msg)
        }
      })
    },
    methods: {
      editParentInfo: function () {
        console.log(this.formData)

        // 校验是否同意隐私条款
        if (!this.agree) {
          window.weuiErr('请阅读并同意隐私条款')
          return
        }

        // 校验必填
        let isValid = true
        Object.keys(this.formData).forEach((kw) => {
          console.log(kw, this.formData[kw], !(this.formData[kw].trim()))
          if (!this.formData[kw].trim()) {
            setInvalid(kw, '请补充空白数据')
            isValid = false
          }
        })
        if (!isValid) {
          return
        }

        // 校验手机号
        var mobileRegx = new RegExp('(^1\\d{10}$)|(^09\\d{8}$)')
        if (!mobileRegx.test(this.formData.mobile)) {
          setInvalid('mobile', '请输入11位手机号，不带空格')
          return
        }

        // 信息提交
        let postData = this.$qs.stringify(this.formData)
        this.$axios.post('/user/updateUserInfoById', postData).then(res => {
          console.log('/user/updateUserInfoById resp>>>', res)
          if (res.status === 200 && res.data.status === 200) {
            window.weuiSuccess('修改家长信息成功')
            this.$router.back()
          } else {
            window.weuiErr(res.data.status + ': ' + res.data.msg)
          }
        })
      }
    }
  }
</script>

<style scoped>
  /* 家长信息每行样式调整 */
  .weui-cell-thinner {
    padding: 10px 25px;
  }
</style>
