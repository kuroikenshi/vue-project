<template>
  <div class="page">
    <div class="not-teacher"></div>
    <div class="weui-btn-area fix-not-teacher">
      <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="backToLogin">返回登录页面</a>
    </div>
  </div>
</template>

<script>
  import Global from '@/components/Global'

  export default {
    name: 'MyComp',
    data () {
      return {}
    },
    methods: {
      backToLogin: function () {
        this.$router.push('login')
      }
    }
  }
</script>

<style scoped>
.not-teacher {
  width: 231.5px;
  height: 187.5px;
  position: absolute;
  left: calc(50% - 115.75px);
  top: calc(40% - 93.75px);
  background: url(/banji/static/imgs/not-teacher.png) no-repeat;
  background-size: contain;
}

.weui-btn-area.fix-not-teacher {
  width: 100%;
  margin: 0;
  position: absolute;
  left: 0;
  top: calc(50% + 93.75px);
}
.weui-btn-area.fix-not-teacher .weui-btn {
  margin: 1.17647059em 15px .3em;
}
</style>
