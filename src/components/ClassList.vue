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
      navbarTitle: '班级列表'
    }
  },
  created () {
    this.updateNavbarTitle()
  },
  // $emit: {
  //   navbarTitle: this.navbarTitle
  // },
  methods: {
    goback: function (event) {
      console.log(this.$router)
      this.$router.back()
    },
    updateNavbarTitle () {
      this.$emit('eventPop_updateNavbarTitle', this.navbarTitle)
    }
  }
}
</script>

<style>

</style>
