<template>
  <div class="moment">
    <div class="title-row">
      <img src="/static/imgs/user-photo.png" class="user-photo"/>
      <a class="link-color font-size-l stronger display-ib margin-v3">托尼老师</a>
      <p class="sub-color font-size-xs">2018-09-13 12:00</p>
    </div>
    <div class="detail-row">
      <p class="content-row font-size-m">
        今天的音乐课，大家一起欣赏了XXX音乐，受到艺术熏陶。今天的音乐课，大家一起欣赏了XXX音乐，受到艺术熏陶。
      </p>
      <div class="thumbnails-row">
        <img src="/static/imgs/user-photo.png" alt="" class="thumbnail"/>
        <img src="/static/imgs/user-photo.png" alt="" class="thumbnail"/>
        <img src="/static/imgs/user-photo.png" alt="" class="thumbnail"/>
        <img src="/static/imgs/user-photo.png" alt="" class="thumbnail"/>
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
export default {
  name: 'MyComp',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
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
  width: calc((100% - 35px) / 3);
  margin: 10px 10px 0px 0;
  float: left;
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
