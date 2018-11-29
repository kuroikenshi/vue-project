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
        <a>
          <i class="f7-icons">heart</i>
          <span>赞</span>
        </a>
        <a>
          <i class="f7-icons">comment</i>
          <span>评论</span>
        </a>
      </div>
      <div class="comment-block">
        <div class="likes-row">
          <i class="f7-icons">heart</i>
          <span class="liked-cname">八月父亲</span>
          <span class="liked-cname">九月母亲</span>
          <span class="liked-cname">大花父亲</span>
        </div>
        <div class="comments-list">
          <div class="comment">
            <p class="comment-content"></p>
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
  margin: 0 15px;
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
  margin-top: 10px;
  margin-right: -15px;
}
.thumbnails-row:before,
.thumbnails-row:after {
  content: " ";
  clear: both;
  display: block;
}
.thumbnail {
  width: calc((100% - 46px)/3);
  margin: 0 15px 15px 0;
  float: left;
}

</style>
