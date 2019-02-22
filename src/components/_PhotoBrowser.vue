<template>
  <div class="weui-gallery weui-animate-fade-in" id="box" :style="{display: isShow}" @click="handleClick">
    <swipe ref="PBSwipe" class="weui-gallery__img" :auto="0" :continuous="false">
      <swipe-item v-for="(item, index) in photos" :key="item.id" :index="index" class="box">
        <div class="photo-holder">
          <img :src="item.url" />
        </div>
      </swipe-item>
    </swipe>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'photo-browser',
    data() {
      return {
        auto: 0,
        PBClickTimer: null
      }
    },
    computed: {
      ...mapState({
        photos(state) {
          console.log('state>>>', state.PhotoBrowser.photos)
  //           setTimeout(function() {
  //           }, 0)
          return state.PhotoBrowser.photos
        }
      }),
      ...mapGetters({
        isShow: 'isShow'
      })
    },
    mounted() {
      window.PBSwipe = this.$refs.PBSwipe
            if (!!this.$refs.PBSwipe) {
              window.PBSwipe.goto(this.$store.state.PhotoBrowser.activeIndex)
            }
    },
    methods: {
      ...mapMutations(['PBhide']),
      
      goto: function (idx) {
        
      },
      
      handleClick: function(evt) {
        var that = this
        console.log('single')

        // 双击
        if (this.PBClickTimer !== null) {
          clearTimeout(this.PBClickTimer)
          this.PBClickTimer = null
          console.log('db')
          
          // this.$refs.swipe.goto(3)
        }
        // 单击
        else {
          this.PBClickTimer = setTimeout(() => {
            console.log('single go')
            this.PBhide()
            
            this.PBClickTimer = null
          }, 300);

        }
      }
      
    }
  }
</script>

<style scroped>
  .weui-gallery {
    z-index: 10000;
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
    transform: translate(-50%, -50%);
  }

  .photo-holder img {
    width: 100%;
    display: block;
  }
  
  .mint-swipe-indicator.is-active {
    background: orange;
  }
  .mint-swipe-indicator {
    background: #09b78d;
    opacity: 0.5;
    box-shadow: 0 0 0px 1px #fff;
  }
</style>
