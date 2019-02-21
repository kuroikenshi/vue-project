<template>
  <div class="moment">
    <div class="title-row">
      <img :src="userPhoto" class="user-photo" v-once />
      <a class="link-color font-size-l stronger display-ib margin-v3" v-once>{{ createBy }}</a>
      <p class="sub-color font-size-xs" v-once>{{ createDateFormatted }}</p>
    </div>

    <!-- 状态详情块 -->
    <div class="detail-row">
      <!-- 内容行 -->
      <p class="content-row font-size-m" v-once>
        {{ content }}
      </p>

      <!-- 图片行 -->
      <div class="thumbnails-row">
        <span class="thumbnail" v-for="(val, key) in imagesContent" :key="key" 
             :style="{height: thumbnailWidth, width: thumbnailWidth}"
             @click="gallaryShow2(key)">
          <img :src="val" />
        </span>
      </div>

      <!-- 点赞评论行 -->
      <div class="act-buttons-row">
        <a class="act-button">
          <i class="icon icon-heart"></i>
          <span class="sub-color font-size-m">赞</span>
        </a>
        <a class="act-button">
          <i class="icon icon-comment"></i>
          <span class="sub-color font-size-m">评论</span>
        </a>
      </div>

      <!-- 评论块 -->
      <div class="comment-block">

        <!-- 点赞行 -->
        <div class="likes-row">
          <span><i class="liked-icon icon icon-heart"></i></span>
          <span class="liked-cname font-size-m link-color">八月父亲</span>
          <span class="liked-cname font-size-m link-color">九月母亲</span>
          <span class="liked-cname font-size-m link-color">大花父亲</span>
          <span class="liked-cname font-size-m link-color">大花父亲</span>
          <span class="liked-cname font-size-m link-color">大花父亲</span>
          <span class="liked-cname font-size-m link-color">大花父亲</span>
          <span class="liked-cname font-size-m link-color">大花父亲</span>
        </div>

        <!-- 评论列表 -->
        <div class="comments-list">
          <div class="comment">
            <span class="author-label">
              <a href="javascript:void(0);" class="author font-size-m link-color">八月助教</a>
            </span>
            <p class="comment-content">
              特别好！！特别好！！特别好！！特别好！特别好！！
            </p>
          </div>
          <div class="comment">
            <span class="author-label">
              <a href="javascript:void(0);" class="author font-size-m link-color">小五父亲</a>
              <a href="javascript:void(0);" class="to-user font-size-m link-color">八月父亲</a>
            </span>
            <p class="comment-content">
              特别好！！特别好！！特别好！！特别好！！特别好！！特别好！！特别好！！特别好！！特别好！！特别好！！
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- PhotoBrowser -->
    <!-- <div class="weui-gallery weui-animate-fade-in" id="box" :style="{display: isShow}" @click="handleClick">
      <swipe ref="swipe" class="weui-gallery__img" :auto="0">
        <swipe-item v-for="(item, index) in photos" :key="item.id" :index="index" class="box">
          <div class="photo-holder">
            <img :src="item.url" />
          </div>
        </swipe-item>
      </swipe>
    </div> -->

  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapGetters, mapMutations } from 'vuex'
  // import weui from 'weui.js'
  
  var timer = null

  export default {
    name: 'MyComp',
    data() {
      return {
        'defaultIndex': 1,
        
        'showPB': false,
        'momentId': 1,
        'classCode': 'GWC182021',
        'content': '今天的音乐课，大家一起欣赏了XXX音乐，受到艺术熏陶。今天的音乐课，大家一起欣赏了XXX音乐，受到艺术熏陶。',
        'imagesContent': [
          '/static/imgs/th1.jpg',
          '/static/imgs/m3.jpg',
          '/static/imgs/sb1.jpg',
          '/static/imgs/s5.jpg',
          '/static/imgs/sb3.jpg',
          '/static/imgs/sb4.jpg',
          '/static/imgs/timg.jpg'
        ],

        'userPhoto': '/static/imgs/user-photo.png',
        'createBy': '托尼老师',
        'createDate': '2018-11-05 14:57:25.0',

        'commentsList': [{
          'id': 1,
          'momentId': 1,
          'author': '八月助教',
          'content': '特别好',
          'toUser': null
        }, {
          'id': 2,
          'momentId': 1,
          'author': '小五父亲',
          'content': '真的特别好',
          'toUser': null
        }]
      }
    },
    computed: {
      createDateFormatted: function() {
        return this.createDate.replace(/\..*$/, '')
      },
      photoArr: function() {
        // 初始化photos
        let photoArr = []
        this.imagesContent.forEach(imgUrl => {
          console.log(imgUrl)
          let imgItem = {
            id: photoArr.length,
            url: imgUrl
          }
          photoArr.push(imgItem)
        })
        return photoArr
      },
      ...mapGetters([
        'photos'
      ])
    },
    created() {
      // initImageBrowser
      this.thumbnailWidth = ((window.screen.width - 50) / 3).toFixed(2) + 'px'
      console.log('vue>>>', window.vue)
      

      // 绑定双指操作
      /* setTimeout(function() {
        
        // var box = document.querySelector("#box")
        var boxes = document.querySelectorAll(".box")
        
        const toScaleMin = 1;
        const toScaleMax = 3;
        
        _.forEach(boxes, function(box, idx) {
//           let box = boxes[idx]
//           console.log('name:', name, 'idx:', idx, 'box:', box)
          let originScale = 1;
          
          let boxGesture = setGesture(box); //得到一个对象
          boxGesture.gesturestart = function() { //双指开始
            box.style.backgroundColor = "yellow";
            let _originScale = box.querySelector('.photo-holder').querySelector('img').style.transform.match(/scale\((.*)\)/)[1]
            if (parseFloat(_originScale) !== NaN && !!parseFloat(_originScale).toFixed) {
              originScale = parseFloat(_originScale).toFixed(2)
            }
          };
          boxGesture.gesturemove = function(e) { //双指移动
            // box.innerHTML = e.scale + "<br />" + e.rotation;
            // box.style.transform = "scale(" + e.scale + ") rotate(" + e.rotation + "deg)"; //改变目标元素的大小和角度
            // box.style.transform = "scale(" + e.scale + ")"; //改变目标元素的大小
            
            console.log('>>>', box.querySelector('.photo-holder').classList)
            // box.querySelector('.photo-holder').classList.add('in-scale')
            
            // 计算缩放
            let toScale = (parseFloat(originScale) * parseFloat(e.scale)).toFixed(2)
            if (toScale > toScaleMax) {
              toScale = toScaleMax
            } else if (toScale < toScaleMin)  {
              toScale = toScaleMin
            }
            
            box.querySelector('.photo-holder').querySelector('img').style.transform = "scale(" +  toScale  + ")"
          };
          boxGesture.gestureend = function() { //双指结束
            // box.innerHTML = "";
            // box.style.cssText = "background-color:red";
            box.style.backgroundColor = "red";
          };
        })
        
      }, 1000); */

    },
    methods: {
      gallaryShow2: function(idx) {
        // 切换显示图片
        this.$store.state.PhotoBrowser.photos = this.photoArr
        // 定位到点击的图片
        window.PBSwipe.goto(idx)

        // TODO: 过度动画

        let that = this
        setTimeout(() => {
          this.PBshow()
        }, 350)
        console.log(this.$store.state.PhotoBrowser.photos)
      },
     ...mapMutations(['PBshow'])
    }
  }
</script>

<style scoped>
  .moment {
    /* margin: 15px; */
    padding: 0 15px 15px 15px;
    border-bottom: 1px solid #ccc;
  }

  .title-row {
    padding: 15px 0 6px;
  }

  .user-photo {
    width: 45px;
    height: 45px;
    float: left;
    margin-right: 10px;
  }

  .cname {
    font-weight: 600;
  }

  .thumbnails-row {
    margin-right: -15px;
  }

  .thumbnails-row:before,
  .thumbnails-row:after {
    content: " ";
    clear: both;
    display: block;
  }

  .thumbnail {
    overflow: hidden;
    width: calc((100% - 35px) / 3);
    margin: 10px 10px 0px 0;
    display: block;
    float: left;
  }

  .thumbnail img {
    width: 100%;
  }

  .comment-block {
    background: #eee;
  }

  .icon {
    height: 25px;
    width: 25px;
    display: inline-block;
    /* margin-right: 8px; */
  }

  .icon-heart {
    background: url('/static/imgs/icon-heart.png') no-repeat;
    background-size: contain;
  }

  .icon-heart-a {
    background: url('/static/imgs/icon-heart-a.png') no-repeat;
    background-size: contain;
  }

  .icon-comment {
    background: url('/static/imgs/icon-comment.png') no-repeat;
    background-size: contain;
  }

  .act-buttons-row,
  .act-buttons-row * {
    line-height: 32px;
    vertical-align: middle;
  }

  .act-buttons-row {
    text-align: right;
  }

  .act-button {
    margin-left: 8px;
  }

  .likes-row {
    line-height: 28px;
    vertical-align: middle;
    padding: 3px 6px;
    border-bottom: 1px solid #fff;
  }

  .liked-icon {
    height: 28px;
    line-height: 28px;
    vertical-align: middle;
    display: inline-block;
  }

  .liked-cname+.liked-cname:before {
    content: ', ';
    color: #000;
  }

  .comment {
    padding: 3px 6px;
  }

  .author-label {
    float: left;
  }

  .author-label:after {
    content: '：';
  }

  .to-user:before {
    content: '回复';
    color: #000;
  }

  /* --- PhotoBrowser --- */
  /* .weui-gallery {
    z-index: 10000000;
    position: absolute;
    float: left;
  } */

  /* .photo-holder {
    width: 100%;
    /* 用最大高度一屏来保证滚动条的出现，动态高度保证居中 * /
    max-height: 100%;
    overflow-y: auto;
    /* 纵向居中，配合高度一屏保证超出无效 * /
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
  .photo-holder img {
    width: 100%;
    display: block;
  }
  
  .photo-holder.in-scale {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 255, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #box {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000!important;
    float: left;
    width: 100%;
    height: 100%;
  } */
</style>
