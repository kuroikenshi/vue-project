<template>
  <div class="photo-browser">
    <div class="weui-gallery weui-animate-fade-in" style="display: block;"></div>

   	<div>title: {{title}}</div>

    <!-- swipe class="my-swipe">
      <s wipe-item class="slide" v -for="(val, key) in photos" : key="key">
        <img : src ="val" />
       </sw ipe-item>
    </swipe -->

  </div>
</template>

<script>
export default {
  name: 'photo-browser',
  data () {
    return {
      a: 1
    }
  }
}
</script>

<style scroped>
/* 模仿.weui-mask */
.popup-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
