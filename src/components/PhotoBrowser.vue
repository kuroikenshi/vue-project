<template>
  <div class="weui-gallery weui-animate-fade-in" @click="close" ref="aaa">

    <swipe class="weui-gallery__img" :auto="0">
      <swipe-item v-for="(val, key) in photos" :key="key">
        <div class="photo-holder">
          <img :src ="val" />
        </div>
       </swipe-item>
    </swipe>

  </div>
</template>

<script>
export default {
  name: 'photo-browser',
  props: [
    'photos',
    'isShow'
  ],
  data () {
    return {
      auto: 0
    }
  },
  computed: {
    pbDisplay: function () {
      console.log('isShow=', this.isShow)
      if (this.isShow) {
        return 'block'
      } else {
        return 'none'
      }
    }
  },
  methods: {
    close: function (evt) {
      console.log('this.isShow', this.isShow)
      this.isShow = false
      console.log('this.isShow', this.isShow)
    }
  }
}
</script>

<style scroped>
.weui-gallery {
  z-index: 10000000;
  position: absolute;
  float: left;
}
.photo-holder {
  width: 100%;
  /* 用最大高度一屏来保证滚动条的出现，动态高度保证居中 */
  max-height: 100%;
  overflow-y: auto;
  /* 纵向居中，配合高度一屏保证超出无效 */
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%,-50%);
}
.photo-holder img {
  width: 100%;
  display: block;
}
</style>
