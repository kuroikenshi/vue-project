<template>
  <div id="app">
    <router-view/>
    <!-- <photo-broswer/> -->
  </div>
</template>

<script>
// import PhotoBrowser from '@/components/PhotoBrowser'

// console.log(PhotoBrowser)

export default {
  name: 'App',
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
