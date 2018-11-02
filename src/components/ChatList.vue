<template>
  <div>
    <h1>CHAT LIST</h1>
    <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="goback">goback</a>
    <router-link to="/chating">go to chating</router-link>
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data () {
    return {
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

<style>

</style>
