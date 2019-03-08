<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data () {
    return { 
    }
  },
  created () {
    this.$emit('eventPop_updateNavbarTitle', '发布状态')
  },
  methods: {
  }
}
</script>

<style>

</style>
