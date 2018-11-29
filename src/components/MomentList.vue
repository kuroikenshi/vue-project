<template>
  <div>
    <h1>HOME</h1>
    <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="goback">goback</a>
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data () {
    return {
      classCode: this.$route.params.classCode,
      navbarTitle: this.$route.params.classCode + '班级空间'
    }
  },
  created () {
    this.updateNavbarTitle()
  },
  methods: {
    // 更新navbar标题
    updateNavbarTitle () {
      this.$emit('eventPop_updateNavbarTitle', this.navbarTitle)
    },
    goback: function (event) {
      console.log(this.$router)
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
