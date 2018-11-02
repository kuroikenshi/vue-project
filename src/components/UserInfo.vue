<template>
  <div class="page user-info">
    <h1 class="user-title">个人中心</h1>
    <router-link to="/user/edit" class="edit weui-tabbar__label">
      <i class="edit-icon"></i>
      <span class="edit-text">编辑</span>
    </router-link>
    <div class="card">
      <img :src="user.photo" alt="" class="user-photo"/>
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
      <div class="weui-cells">
          <div class="weui-cell">
              <div class="weui-cell__hd"><img alt="" style="width:20px;margin-right:5px;display:block"></div>
              <div class="weui-cell__bd">
                  <p>标题文字</p>
              </div>
              <div class="weui-cell__ft">说明文字</div>
          </div>
          <div class="weui-cell">
              <div class="weui-cell__hd"><img alt="" style="width:20px;margin-right:5px;display:block"></div>
              <div class="weui-cell__bd">
                  <p>标题文字</p>
              </div>
              <div class="weui-cell__ft">说明文字</div>
          </div>
      </div>
      -->
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data () {
    return {
      user: {
        name: '华晨明',
        photo: '/static/imgs/user-photo.png'
      }
    }
  },
  methods: {
    goback: function (event) {
      console.log(this.$router)
      this.$router.back()
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
</style>
