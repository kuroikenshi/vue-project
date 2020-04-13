<template>
  <div class="page user-info">
    <div class="user-info-bg">
      <h1 class="user-title">个人中心</h1>
      <!-- <router-link to="/user/edit" class="edit weui-tabbar__label">
        <i class="edit-icon"></i>
        <span class="edit-text">编辑</span>
      </router-link> -->
      <div class="card">
        <img :src="user.userface" alt="" class="user-photo"/>
        <p class="user-name">{{ user.name }}</p>
      </div>
    </div>

    <!--
    <div class="weui-cells__title">带说明的列表项</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>标题文字</p>
        </div>
        <div class="weui-cell__ft">说明文字</div>
      </div>
    </div>
    <div class="weui-cells__title">带图标、说明的列表项</div>
    -->

    <div class="weui-cells no-line">
      <div class="weui-cell weui-cell-taller" v-if="isParent">
        <div class="weui-cell__hd">
          <i class="icon icon-gender"></i>
        </div>
        <div class="weui-cell__bd">
          <p>学员性别</p>
        </div>
        <div class="weui-cell__ft">{{ user.stuSex }}</div>
      </div>

      <div class="weui-cell weui-cell-taller">
        <div class="weui-cell__hd">
          <i class="icon icon-smart-phone"></i>
        </div>
        <div class="weui-cell__bd">
          <p>联系电话</p>
        </div>
        <div class="weui-cell__ft">{{ user.mobile }}</div>
      </div>

      <!-- <router-link class="weui-cell weui-cell_access weui-cell-taller"
          to="/user/parentInfoList" v-if="isParent">
        <div class="weui-cell__hd">
          <i class="icon icon-mail-opened"></i>
        </div>
        <div class="weui-cell__bd">
          <p>家长信息</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link> -->

      <router-link class="weui-cell weui-cell_access weui-cell-taller"
          to="/user/classContacts">
        <div class="weui-cell__hd">
          <i class="icon icon-book"></i>
        </div>
        <div class="weui-cell__bd">
          <p>班级通讯录</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>

      <router-link class="weui-cell weui-cell_access weui-cell-taller"
          to="/user/schedule">
        <div class="weui-cell__hd">
          <i class="icon icon-schedule"></i>
        </div>
        <div class="weui-cell__bd">
          <p>班级课程表</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>

    <div class="weui-btn-area margin-bottom-20">
      <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="logout">退出登录</a>
    </div>

  </div>
</template>

<script>
import VueCookie from 'vue-cookie'
import Global from '@/components/Global'

export default {
  name: 'MyComp',
  beforeCreate: function() {
    this.user = {
      name: window.uls.get('userInfo', 'username'),
      userface: window.uls.get('userInfo', 'userface') || '/banji/static/imgs/user-photo.png',
      stuSex: window.uls.get('userInfo', 'stuSex') || '-- 未设置 --',
      mobile: window.uls.get('userInfo', 'mobile') || '-- 未设置 --',
    }

    // 是家长
    this.isParent = (window.uls.get('userInfo', 'userType') === Global.userType.PARENT)
    console.log('UserInfo.vue: isParent: ' + (window.uls.get('userInfo', 'userType') === Global.userType.PARENT))
  },
  data () {
    return {
      // fuser: this.$qs.parse(this.$cookie.get('user'))
    }
  },
  methods: {
    goback: function (event) {
      console.log(this.$router)
      this.$router.back()
    },
    // 登出方法
    logout: function (event) {
      this.$axios.post('/banji/login/logout').then(res => {
          console.log('logout>>>', res.data)
          // 清除当前用户
          store.remove('clastooCurrentUser')

          // 登出时清除classList的缓存
          window.uls.del('personalData', 'classList')

          window.location = res.data.data
          return Promise.resolve()
        }).catch(err => {
          console.log('加载logout返回数据失败:', err)
          return Promise.reject(err)
        })
    }
  }
}
</script>

<style scoped>
.user-info .user-info-bg {
  padding-top: 1px;
  background: url('/banji/static/imgs/bg-user.png') no-repeat;
  background-size: 100% 100%;
  background-position-x: center;
  background-position-y: top;
}
.user-title {
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  margin: 20px 0;
  color: #fff;
}
.card {
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 0 25px 1px rgba(9, 183, 141, 0.2);
  margin: 5px 18px;
  padding: 10px;
  text-align: center;
}
.user-photo {
  width: 90px;
  height: 90px;
  border-radius: 90px;
  margin: 8px;
}
.user-name {
  margin-bottom: 15px;
}
.edit {
  float: right;
  position: relative;
  right: 30px;
  top: 5px;
}
i.edit-icon {
  margin: 5px 0 -5px 4px;
  width: 24px;
  height: 24px;
  display: block;
  background: url('/banji/static/imgs/icon-edit.png') no-repeat;
  background-size: contain;
}
.edit-text {
  font-size: 10px;
  color: #09b78d;
}

/* 最后一个.weui-cell加下划线 */
/* .weui-cell:last-child:after {
  content: " ";
  position: absolute;
  left: 15px;
  bottom: 0;
  right: 15px;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
  z-index: 2;
} */

.icon {
  margin-right: 5px;
}

/* 根据设计稿，行内字号重定义，已在app.css中加入 */
/*
.weui-cell__bd {
  font-size: 15px;
}
.weui-cell__ft,
.weui-cell__ft i {
  font-size: 14px;
}
*/

</style>
