<template>
  <div class="moment" v-show="!momentHasBeenDeleted">
    <!-- 标题块 -->
    <div class="title-row">
      <!-- 伪删除按钮 -->
      <a class="sub-color moment-btn" @click="deleteMoment" v-show="showDeleteBtn">
        <i class="icon icon-x"></i>
      </a>

      <!-- 头像 -->
      <!-- <img :src="momentItem.userPhoto" class="user-photo" v-once /> -->
      <img src="/static/imgs/bg-user.png" class="user-photo" v-once />
      <!-- 发布人姓名 -->
      <a class="link-color font-size-l display-ib margin-v3 user-title" v-once>
        <span>{{ momentItem.createName }}</span>
        <span><span class="user-badge" v-show="!!momentItem.role">{{ momentItem.role }}</span></span>
      </a>
      <!-- 发布时间 -->
      <p class="sub-color font-size-xs" v-once>{{ createDateFormatted }} <span class="moment-badge" v-show="!!momentItem.type">{{ momentItem.type }}</span></p>
    </div>

    <!-- 状态详情块 -->
    <div class="detail-row">
      <!-- 内容行 -->
      <p class="content-row font-size-m" v-once>
        {{ momentItem.content }}
      </p>

      <!-- 图片行 -->
      <div class="thumbnails-row">
        <span class="thumbnail" v-for="(val, key) in momentItem.elementUrl" :key="key"
             :style="{height: thumbnailWidth, width: thumbnailWidth}"
             @click="openPB(key)">
          <img :src="val" v-on:load="imageAdjust" />
        </span>
      </div>

      <!-- 点赞评论行 -->
      <div class="act-buttons-row">
        <a class="act-button" @click="toggleLiked">
          <i class="icon" :class="{ 'icon-heart': !currentUserLiked, 'icon-heart-a': currentUserLiked }"></i>
          <span class="sub-color font-size-m">{{ currentUserLiked ? "已" : "" }}赞</span>
        </a>
        <a class="act-button" @click="comment">
          <i class="icon icon-comment"></i>
          <span class="sub-color font-size-m">评论</span>
        </a>
      </div>

      <!-- 评论块 -->
      <div class="comment-block">

        <!-- 点赞行 -->
        <div class="likes-row" v-show="!!likedUsernames&&!!likedUsernames.length">
          <span><i class="liked-icon icon icon-heart"></i></span>
          <span class="liked-cname font-size-m link-color" v-for="(likedUsername, key) in likedUsernames" :key="key">{{ likedUsername }}</span>
        </div>

        <!-- 评论列表 -->
        <div class="comments-list" v-show="!!momentItem.commentsList&&!!momentItem.commentsList.length">
          <div class="comment" v-for="(comment, key) in momentItem.commentsList" :key="key" @click="clickedCommentItem(comment)">
            <span class="author-label">
              <a href="javascript:void(0);" class="author font-size-m link-color">{{ comment.authorName }}</a>
              <!-- <span v-if="!!comment.toUserName" v-once>回复</span> -->
              {{ !!comment.toUserName ? '回复' : '' }}
              <a href="javascript:void(0);" class="to-user font-size-m link-color" v-if="!!comment.toUserName" v-once>{{ comment.toUserName }}</a>
            </span>
            <span class="comment-content">
              {{ comment.content }}
            </span>
          </div><!-- END OF .comment -->
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import _ from 'lodash'
  import Global from '@/components/Global'

  // 弹出评论输入框
  function __popCommentInputBox() {
    $commentContainer.show()
    $commentContainer.addClass('weui-actionsheet_toggle')
    $commentMask.fadeIn(180)  // 这里必须有值，在为0的时候，会出现光标错位问题

    // 输入框清空回复给用户的字样
    $input.removeAttr('placeholder')
    $input.val('')
    $input.focus()
    setTimeout(function() {
      $input.focus()
    }, 600)
  }

  export default {
    name: 'MyComp',
    props: ['momentItemBased'],   // 用来存储一进来的、旧的momentItem值
    beforeCreate: function () {
      // 是否显示删除动态按钮
      this.showDeleteBtn = (Global.userType.TEACHER === window.uls.get('userInfo', 'userType'))
    },
    data() {
      return {
        momentItemUpdated: undefined,  // 用来存储更新后的momentItem
        commentSubmitting: false,      // 用来避免重复提交的变量
        momentHasBeenDeleted: false    // 临时删除用
      }
    },
    computed: {
      // 合并动态数据
      momentItem: function() {
        let _momentItem = this.momentItemUpdated || this.momentItemBased

        // 处理下ArrayString
        if (window.isArrayString(_momentItem.elementUrl)) {
          // 防止出现单引号，转换出错
          _momentItem.elementUrl = _momentItem.elementUrl.replace(/'/g, '"')
          _momentItem.elementUrl = JSON.parse(_momentItem.elementUrl)
        }

        return _momentItem
      },
      createDateFormatted: function() {
        if (this.momentItem.createDate) {
          if (typeof this.momentItem.createDate === 'number') {
            return (new Date(this.momentItem.createDate)).Format('yyyy-MM-dd hh:mm')
          }
          else if (typeof this.momentItem.createDate === 'string') {
            return this.momentItem.createDate.replace(/\..*$/, '')
          }
        } else {
          return '-- 迷之发布时间 --'
        }
      },
      // 点赞用户名单
      likedUsernames: function () {
        let usernameArr = []
        if (_.isArray(this.momentItem.likes)) {
          this.momentItem.likes.forEach(likedItem => {
            usernameArr.push(likedItem.username)
          })
        }
        // 处理下ArrayString
        else if (window.isArrayString(this.momentItem.likes)) {
          JSON.parse(this.momentItem.likes).forEach(likedItem => {
            usernameArr.push(likedItem.username)
          })
        }
        return usernameArr
      },
      // 当前用户已点赞
      currentUserLiked: function () {
        let userIdArr = []
        if (_.isArray(this.momentItem.likes)) {
          this.momentItem.likes.forEach(likedItem => {
            userIdArr.push(likedItem.userId)
          })
        }
        // 处理下ArrayString
        else if (window.isArrayString(this.momentItem.likes)) {
          JSON.parse(this.momentItem.likes).forEach(likedItem => {
            userIdArr.push(likedItem.userId)
          })
        }
        // alert('已点赞>>>' + (userIdArr.indexOf(window.uls.get('userInfo', 'username')) != -1))
        return (userIdArr.indexOf(window.uls.get('userInfo', 'id')) != -1)
      }
      /* ,
      ...mapGetters([
        'photos'
      ]) */
    },
    created() {
      this.thumbnailWidth = ((window.screen.width - 50) / 3).toFixed(2) + 'px'
    },
    methods: {
      // 调整缩略图宽度等样式
      imageAdjust: function (evt) {
        let img = evt.target
        let w = img.naturalWidth
        let h = img.naturalHeight
        // console.log('imgLoaded>>>', w, h)
        if (w > h) {
          img.style.width = 'initial'
          img.style.height = '100%'
          img.style.textAlign = 'center'
        }
      },

      // 打开PhotoBrowser
      openPB: function (idx) {
        let pb = $.photoBrowser({
          items: this.momentItem.elementUrl,
          initIndex: idx,
          onClose: function() {
            console.log(this)
            $('.weui-photo-browser-modal').remove()
          }
        })

        pb.open()

      },

      // 点击喜欢
      toggleLiked: function () {
        console.log('toggleLiked')

        let postData = this.$qs.stringify({
          momentId: this.momentItem.momentId,
          userId: window.uls.get('userInfo', 'id')
        })

        this.$axios.post('/moments/toggleLike', postData).then(res => {
          console.log('toggleLike>>>', res.data)

          this.momentItemUpdated = res.data.data
//           this.momentList = res.data.data
//           this.momentListLoaded = true
          return Promise.resolve()
        }).catch(err => {
          console.log('加载toggleLike返回数据失败:', err)
//           this.momentListLoaded = true
//           this.momentListErrMsg = '-- 加载失败 --'
          return Promise.reject(err)
        })
      },

      // 直接评论
      comment: function () {
        __popCommentInputBox()
        this.__initSubmit()
      },

      // 回复某人
      __replyToUser: function (toUserId, toUserName) {
        // 稍后弹出输入框
        __popCommentInputBox()
        $input.attr('placeholder', '回复' + toUserName + ':')
        this.__initSubmit(toUserId, toUserName)
      },

      // 点击了评论对象 -> 回复或删除
      clickedCommentItem: function (comment) {
        // 点击对象行加高亮
        let $tgtNode = $(event.target)
        $tgtNode.closest('.comment').addClass('active')
        // 稍后取消高亮
        setTimeout(() => {
          $tgtNode.closest('.comment').removeClass('active')
        }, 600)

        // 如果点击的是自己的评论 -> 删除
        console.log('作者id:', comment.authorId, '<->', window.uls.get('userInfo', 'id'))
        if (comment.authorId === window.uls.get('userInfo', 'id')) {
          this.__promptToDelete(comment.commentId)
        }
        // 点击别人的评论 -> 回复
        else {
          this.__replyToUser(comment.authorId, comment.authorName)
        }
      },

      // 初始化设置、绑定事件用来评论
      __initSubmit: function (toUserId, toUserName) {
        $submit.off('click')
        $submit.on('click', () => {
          if (!this.commentSubmitting) {
            console.log('>>>', this.momentItem.momentId)

            let postData = this.$qs.stringify({
              momentId: this.momentItem.momentId,
              content: $input.val(),
              authorId: window.uls.get('userInfo', 'username'),
              authorName: '华晨名',  // TODO
              toUserId: toUserId,
              toUserName: toUserName
            })

            if ($input.val().length > 0) {
              this.commentSubmitting = true

              this.$axios.post('/comments/publishComment', postData).then(res => {
                console.log('publishComment>>>', res.data)

                this.momentItemUpdated = res.data.data

                this.commentSubmitting = false

                // 解决键盘收起来，画面键盘位置留白的问题
                window.scrollTo(0, 500);

                $commentContainer.removeClass('weui-actionsheet_toggle')
                $commentMask.fadeOut(180)

                return Promise.resolve()
              }).catch(err => {
                this.commentSubmitting = false
                console.log('加载publishComment返回数据失败:', err)
                return Promise.reject(err)
              })
            }

          }
        })
      },

      // 引导删除评论
      __promptToDelete: function (commentId) {
        console.log('<<<__promptToDelete>>> ', commentId)

        this.weuijsPopedItem = this.$weui.actionSheet(
          [{
            label: '删除',
            onClick: () => {
              // 删除评论数据
              let postData = this.$qs.stringify({
                momentId: this.momentItem.momentId,
                commentId: commentId
              })

              this.$axios.post('/comments/deleteComment', postData).then(res => {
                console.log('deleteComment>>>', res.data)
                this.momentItemUpdated = res.data.data
                return Promise.resolve()
              }).catch(err => {
                console.log('加载deleteComment返回数据失败:', err)
                return Promise.reject(err)
              })
            }
          }],
          [{
            label: '取消',
            onClick: function() {
              console.log('取消')
            }
          }],
          {
            className: 'weui-actionsheet-limit'
          }
        )
      },

      // 删除本条动态
      deleteMoment: function () {
        window.vue.$weui.confirm('删除这条动态后家长将无法查看和评论，是否删除', {
          className: 'xdf-confirm',
          buttons: [{
            label: '取消',
            type: 'default',
            onClick: function () {
            }
          }, {
            label: '删除',
            type: 'primary',
            onClick: () => {
              // 删除本条动态
              let postData = this.$qs.stringify({
                momentId: this.momentItem.momentId
              })

              this.$axios.post('/moments/deleteMoment', postData).then(res => {
                console.log('deleteMoment>>>', res.data)
                let deleteCount = res.data.data
                if (deleteCount > 0) {
                  window.weuiSuccess('删除成功')

                  this.momentHasBeenDeleted = true

                } else {
                  window.weuiErr('删除失败...请刷新确认后重试')
                }
                return Promise.resolve()
              }).catch(err => {
                console.log('加载deleteMoment返回数据失败:', err)
                return Promise.reject(err)
              })
            }
          }]
        })
      }
      /* ,
     ...mapMutations(['setPhotos', 'PBshow']) */
    }
  }
</script>

<style scoped>
  .moment {
    /* margin: 15px; */
    padding: 0 15px 15px 15px;
    border-bottom: 1px solid #ccc;
  }

  .moment-btn {
    float: right;
  }
  .moment-btn i {
    margin-right: 0;
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

  .user-title {
    color: #039974;
    font-weight: 600;
  }

  .user-badge {
    background: #039974;
    color: #fff;
    border-radius: 3px;
    font-weight: 100;
    font-size: 12px;
    display: inline-block;
    line-height: 17px;
    height: 17px;
    padding: 0 4px;
    text-align: center;
    vertical-align: top;
    margin-top: 4px;
    margin-left: 5px;
  }

  .moment-badge {
    font-size: 10px;
    color: #039974;
    background: #ddd;
    display: inline-block;
    line-height: 16px;
    padding: 1px 5px 1px 4px;
    margin-left: 5px;
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
    background: rgba(0, 0, 0, 0.1);
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

  .icon-x {
    background: url('/static/imgs/icon-x.png') no-repeat;
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
  .act-button.active span {
    color: rgba(0, 255, 0, 1);
    transition: all 0.3s;
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

  .comments-list {
    padding: 5px 0px;
  }
  .comment {
    padding: 0px 12px;
    font-size: 15px;
  }

  .author-label {
    float: left;
  }

  .author-label:after {
    content: '：';
    display: inline-block;
    width: 10px;
    margin-right: 5px;
  }

  /* .to-user:before {
    content: '回复';
    margin-left: -2px;
    padding-right: 2px;
    color: #000;
  } */

  .comment.active {
    background: #ddd;
  }

</style>
