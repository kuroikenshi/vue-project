<template>
  <div class="page user-info">
    <h1 class="user-title">个人中心</h1>
    <router-link to="/user/edit" class="edit weui-tabbar__label">
      <i class="edit-icon"></i>
      <span class="edit-text">编辑</span>
    </router-link>
    <div class="card">
      <img :src="user.userface" alt="" class="user-photo"/>
      <p class="user-name">{{ user.name }}</p>
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
      <div class="weui-cell weui-cell-taller">
        <div class="weui-cell__hd">
          <i class="icon icon-gender"></i>
        </div>
        <div class="weui-cell__bd">
          <p>学员性别</p>
        </div>
        <div class="weui-cell__ft">男</div>
      </div>

      <div class="weui-cell weui-cell-taller">
        <div class="weui-cell__hd">
          <i class="icon icon-smart-phone"></i>
        </div>
        <div class="weui-cell__bd">
          <p>联系电话</p>
        </div>
        <div class="weui-cell__ft">13800138000</div>
      </div>

      <a class="weui-cell weui-cell_access weui-cell-taller" href="javascript: void(0);">
        <div class="weui-cell__hd">
          <i class="icon icon-mail-opened"></i>
        </div>
        <div class="weui-cell__bd">
          <p>家长信息</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>

      <a class="weui-cell weui-cell_access weui-cell-taller" href="javascript: void(0);">
        <div class="weui-cell__hd">
          <i class="icon icon-book"></i>
        </div>
        <div class="weui-cell__bd">
          <p>班级通讯录</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>

      <a class="weui-cell weui-cell_access weui-cell-taller" href="javascript: void(0);">
        <div class="weui-cell__hd">
          <i class="icon icon-schedule"></i>
        </div>
        <div class="weui-cell__bd">
          <p>班级课程表</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
    
    <div class="weui-btn-area">
      <a href="javascript:void(0);" class="weui-btn weui-btn_warn" v-on:click="logout">退出登录</a>
    </div>

  </div>
</template>

<script>
import VueCookie from 'vue-cookie'
  
export default {
  name: 'MyComp',
  beforeCreate: function() {
    this.user = {
      name: window.uls.get('userInfo', 'username'),
      userface: window.uls.get('userInfo', 'userface') || '/static/imgs/user-photo.png'
    }
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
      this.$axios.post('login/logout').then(res => {
          console.log('logout>>>', res.data)
          sessionStorage.clear()
          localStorage.clear()
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
.user-info {
  background: url('/static/imgs/bg-user.png') no-repeat;
  background-size: contain;
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
  background: url('/static/imgs/icon-edit.png') no-repeat;
  background-size: contain;
}
.edit-text {
  font-size: 10px;
  color: #09b78d;
}

/* 最后一个.weui-cell加下划线 */
.weui-cell:last-child:after {
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
