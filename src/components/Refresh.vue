<template>
  <div>refresh</div>
</template>

<script>
   export default {
    name: 'refresh',
    created: function () {
      window.vue.$router.back()
    },
  }
</script>

<style>
</style>
