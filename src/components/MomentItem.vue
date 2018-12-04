<template>
  <div class="moment">
    <div class="title-row">
      <img :src="userPhoto" class="user-photo" v-once/>
      <a class="link-color font-size-l stronger display-ib margin-v3" v-once>{{ createBy }}</a>
      <p class="sub-color font-size-xs" v-once>{{ createDateFormatted }}</p>
    </div>
    <div class="detail-row">
      <p class="content-row font-size-m" v-once>
        {{ content }}
      </p>
      <div class="thumbnails-row">
        <!-- <s p an class="thumbnail" v -for="(val, key) in imagesContent" : key="key"
            :style="{height: thumbnailWidth, width: thumbnailWidth}" @click="gallaryShow">
          <i mg : src="val" />
        </span> -->
        <photo-broswer></photo-broswer>
      </div>
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
      <div class="comment-block">
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
  </div>
</template>

<script>
import weui from 'weui.js'
import PhotoBrowser from '@/components/PhotoBrowser'

export default {
  name: 'MyComp',
  components: {
    'photo-broswer': PhotoBrowser
  },
  data () {
    return {
      'momentId': 1,
      'classCode': 'GWC182021',
      'content': '今天的音乐课，大家一起欣赏了XXX音乐，受到艺术熏陶。今天的音乐课，大家一起欣赏了XXX音乐，受到艺术熏陶。',
      'imagesContent': [
        '/static/imgs/user-photo.png',
        '/static/imgs/timg.jpg',
        '/static/imgs/user-photo.png',
        '/static/imgs/user-photo.png'
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
    createDateFormatted: function () {
      return this.createDate.replace(/\..*$/, '')
    },
    photos: function () {
      let arr = []
      this.imagesContent.forEach(imgUrl => {
        arr.push({
          url: imgUrl
        })
      })
      return arr
    }
  },
  created () {
    // initImageBrowser
    this.thumbnailWidth = ((window.screen.width - 50) / 3).toFixed(2) + 'px'
  },
  methods: {
    gallaryShow: function (evt) {
      console.log('evt', evt, weui)
      weui.gallery(evt.target.getAttribute('src'))
    },
    onF7PBOpen: function (evt) {
      console.log('onF7PBOpen')
    }
  }
}
</script>

<style scoped>
.moment {
  // margin: 15px;
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
  // margin-right: 8px;
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
.liked-cname + .liked-cname:before {
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
</style>
