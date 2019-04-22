<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <!-- <photo-broswer/> -->
  </div>
</template>

<script>
// import PhotoBrowser from '@/components/PhotoBrowser'

// console.log(PhotoBrowser)

export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload,
    }
  },
  data () {
    return {
      isRouterAlive: true,
      showPlus: 'abc'
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
  components: {
    // 'photo-broswer': PhotoBrowser
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
