<template>
  <div>
    <h1>MY-COMPONENT</h1>
    <p>{{ msg }}</p>
    <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="goback">goback</a>
    <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="goCtn">goContainer</a>
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data () {
    return {
      msg: 'This is my component'
    }
  },
  methods: {
    goback: function (event) {
      console.log(this.$router)
      this.$router.back()
    },
    goCtn: function (event) {
      console.log(this.$router)
      this.$router.go('/ctn-tabbar')
    }
  }
}
</script>

<style>

</style>
