<template>
  <div>
    <form>
      <div class="weui-cells no-line no-margin-top">
        <div class="weui-cell weui-cell-taller">

          <div class="weui-cell__bd">
            <textarea class="weui-textarea" name="" placeholder="输入正文..." rows="3" v-model="content"></textarea>

            <div class="weui-uploader">
              <!-- <div class="weui-uploader__hd">
                <p class="weui-uploader__title">图片上传</p>
                <div class="weui-uploader__info">0/2</div>
              </div> -->
              <div class="weui-uploader__bd allow-overflow">
                <ul class="weui-uploader__files" id="uploaderFiles">
                  <li class="weui-uploader__file touch-control" v-for="(imageUrl, key) in images" :key="key"
                      :style="{width: thumbnailWidth + 'px', height: thumbnailWidth + 'px'}"
                      :class="{'touching': touching == key}"
                      @touchstart="touchstart(key)" @touchmove="touchmove(key)" @touchend="touchend(key)">
                    <div class="img-border" :class="{moving: (touching == key && touchmoveEvent != undefined)}"
                        :style="{
                          width: thumbnailWidth + 'px',
                          height: thumbnailWidth + 'px',
                          left: (touching == key && touchmoveEvent != undefined) ? touchmoveEvent.touches[0].pageX - thumbnailWidth / 2 + 'px' : 'unset',
                          top: (touching == key && touchmoveEvent != undefined) ? touchmoveEvent.touches[0].pageY - thumbnailWidth / 2 + 'px' : 'unset'
                        }">
                      <img :src="imageUrl">
                    </div>
                    <!-- 移动中占位用 -->
                    <div class="img-border-dummy" v-show="touching == key"></div>
                  </li>
                  <!-- <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                  <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                  <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                  <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
                    <div class="weui-uploader__file-content">
                      <i class="weui-icon-warn"></i>
                    </div>
                  </li>
                  <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
                    <div class="weui-uploader__file-content">50%</div>
                  </li> -->
                </ul>

                <!-- 新增图片按钮 -->
                <div class="weui-uploader__input-box"
                    v-show="(this.imageFiles.length < this.imageLimit)"
                    :style="{width: thumbnailAddWidthPX, height: thumbnailAddWidthPX}">
                  <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple @change="imageChanged">
                </div>
              </div>
            </div>
          </div>

        </div>

        <a class="weui-cell weui-cell_access weui-cell-taller" href="javascript: void(0);" @click="classCodeSelect">
          <div class="weui-cell__hd">
            <i class="icon icon-book"></i>
          </div>
          <div class="weui-cell__bd">
            <p>班级</p>
          </div>
          <div class="weui-cell__ft">
            {{ classCode }}
          </div>
        </a>

        <a class="weui-cell weui-cell_access weui-cell-taller" href="javascript: void(0);" @click="momentTypeSelect">
          <div class="weui-cell__hd">
            <i class="icon icon-schedule"></i>
          </div>
          <div class="weui-cell__bd">
            <p>类型</p>
          </div>
          <div class="weui-cell__ft">
            {{ momentType }}
          </div>
        </a>
      </div>

      <div class="weui-btn-area">
        <a href="javascript:void(0);" class="weui-btn weui-btn_primary" @click="submit()" v-bind:disabled="submitDisabled">发布</a>
      </div>
    </form>

    <div class="delete-area" :class="{show: touching != undefined, active: touchingToDelete}">
      <div class="center">拖到此处删除图片</div>
    </div>
  </div>
</template>

<script>
// 获取绝对偏移量
function offset(curEle) {
  var totalLeft = null,
    totalTop = null,
    par = curEle.offsetParent;
  // 首先加自己本身的左偏移和上偏移
  totalLeft += curEle.offsetLeft;
  totalTop += curEle.offsetTop
  // 只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
  while (par) {
    if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
      // 累加父级参照物的边框
      totalLeft += par.clientLeft;
      totalTop += par.clientTop
    }

    // 累加父级参照物本身的偏移
    totalLeft += par.offsetLeft;
    totalTop += par.offsetTop
    par = par.offsetParent;
  }

  return {
    left: totalLeft,
    top: totalTop
  }
}
// 返回当前xy坐标覆盖图片的序号
function indexOfCoveringImg(x, y) {
  var targets = document.getElementsByClassName('img-border');
  for (var i = 0; i < targets.length; i++) {
    var nodeOffset = offset(targets[i]);
    // console.log(offset(node), node.offsetWidth, node.offsetHeight);
    if (
      x > nodeOffset.left &&
      y > nodeOffset.top &&
      x < (nodeOffset.left + targets[i].offsetWidth) &&
      y < (nodeOffset.top + targets[i].offsetHeight) &&
      targets[i].classList.value.indexOf('moving') == -1
    ) {
      return i;
    }
  }
  return -1;
}

export default {
  name: 'MyComp',
  data () {
    return {
      content: '',    // 要发布的内容
      classCode: '',
      classCodeMenu: [],
      classCodeIsReady: true,

      momentType: '通知',
      momentTypeOptions: ['通知', '作业', '其他'],

      images: [],     // 已选中图片的预览
      imageFiles: [], // 要发布的图片
      imageLimit: 9,

      touching: undefined,
      touchmoveEvent: undefined,
      touchingToDelete: false,  // touching对象将要被删除
    }
  },
  created () {
    this.thumbnailWidth = parseFloat(((window.screen.width - 78) / 3).toFixed(2))
    this.thumbnailAddWidthPX = ((window.screen.width - 78) / 3 - 2).toFixed(2) + 'px'

    // 更新tabbar参数
    this.$emit('eventPop_updateTabbar', {
      'navbarTitle': '发布状态',
      'backPath': undefined
    })

    // 初始化发布班级列表
    // 优先从uls中取得
    let classList = window.uls.get('personalData', 'classList')
    if (classList) {
      this._setClassCodeParam(classList)
    }
    // 如果没有，尝试api取得
    else {
      this.$axios.post('classes/getClassList').then(res => {
        console.log('getClassList>>>', res.data)
        classList = res.data.data
        window.uls.set('personalData', 'classList', classList)
        this._setClassCodeParam(classList)
        return Promise.resolve()
      }).catch(err => {
        window.weuiErr('加载班级列表失败:' + err)
        this.classCodeIsReady = false
        return Promise.reject(err)
      })
    }

  },
  computed: {
    momentTypeMenu: function() {
      let menuData = []
      let that = this
      this.momentTypeOptions.forEach(item => {
        menuData.push({
          label: item,
          onClick: () => {
            console.log(item)
            that.momentType = item
          }
        })
      })
      return menuData
    },

    // 内容非空
    contentIsNotBlank: function () {
      return (this.content.length > 0) || (this.imageFiles.length > 0)
    },

    // 内容合法
    contentIsValid: function () {
      return this.content.length <= 2000 && this.imageFiles.length <= 9
    },

    // 提交可用
    submitDisabled: function () {
      return !this.classCodeIsReady || !this.contentIsNotBlank || !this.contentIsValid
    }
  },
  methods: {
    // 图片点住
    touchstart: function (key) {
      console.log('touchstart')
      this.touching = key
      this.touchingToDelete = false
    },
    // 图片松手
    touchend: function (key) {
      if (this.touchmoveEvent != undefined) {
        // 删除模式
        if (this.touchingToDelete) {
          // 删掉预览图
          this.images.splice(key, 1)
          // 删掉准备上传的选中图
          this.imageFiles.splice(key, 1)
        }
        // 位置改变
        else {
          var idx = indexOfCoveringImg(this.touchmoveEvent.touches[0].pageX, this.touchmoveEvent.touches[0].pageY);
          if (idx != -1 && idx != key) {
            // 替换图片顺序
            var tmp = this.images[idx]
            this.images[idx] = this.images[key]
            this.images[key] = tmp

            // 替换上传数组顺序
            var tmpFile = this.imageFiles[idx]
            this.imageFiles[idx] = this.imageFiles[key]
            this.imageFiles[key] = tmpFile

            console.log('changed: ', idx, '<->', key)
          }
        }
      }

      console.log('touchend')
      this.touching = undefined
      this.touchmoveEvent = undefined
    },
    // 图片拖动
    touchmove: function (key) {
      // 避免拖动的时候整个页面跟着滚动
      event.preventDefault();

      if (this.touching != undefined) {
        this.touchmoveEvent = event
        console.log(key, event.touches[0].pageX, event.touches[0].pageY)

        // 判断是否要删除
        var deleteAreaOffset = offset(document.getElementsByClassName('delete-area')[0]);
        if (event.touches[0].pageY > deleteAreaOffset.top) {
          this.touchingToDelete = true
        } else {
          this.touchingToDelete = false
        }
      } else {
        this.touchmoveEvent = undefined
      }
    },

    // 设置班级列表参数
    _setClassCodeParam: function (classList) {
      let menuData = []
      classList.forEach(item => {
        menuData.push({
          label: item.classCode,
          onClick: () => {
            this.classCode = item.classCode
          }
        })
      })

      this.classCodeMenu = menuData

      // 设置已选中班级
      console.log(this.$router)
      this.classCode = menuData[0].label
    },
    // 选择班级
    classCodeSelect: function () {
      this.weuijsPopedItem = this.$weui.actionSheet(
        this.classCodeMenu,
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
    // 选择类型
    momentTypeSelect: function() {
      this.weuijsPopedItem = this.$weui.actionSheet(
        this.momentTypeMenu,
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
    // 上传图片
    imageChanged: function() {
      console.log('imageChanged>>>', event.target.files.length)

      if ((this.imageFiles.length + Array.from(event.target.files).length) > this.imageLimit) {
        window.weuiErr('发布图片不能超过' + this.imageLimit + '张，当前选择超出' + ((this.imageFiles.length + Array.from(event.target.files).length) - this.imageLimit) + '张')
        event.target.files = []
        return
      }

      Array.from(event.target.files).forEach(file => {
        this.imageFiles.push(file)
      })
      console.log('当前准备上传文件个数:', this.imageFiles.length, this.imageFiles)

      // 根据要上传的文件，更新预览图
      this.images = []
      this.imageFiles.forEach(img => {
        let url = window.URL.createObjectURL(img)
        if (this.images.indexOf(url) == -1) {
          this.images.push(url)
        }
      })
      console.log(this.images)
    },
    // 提交动态
    submit: function() {
      if (this.submitDisabled) {
        if (!this.classCodeIsReady) {
          window.weuiErr('班级列表获取失败，无法发布')
          return
        }

        if (!this.contentIsNotBlank) {
          window.weuiErr('内容为空，无法发布')
          return
        }

        if (!this.contentIsValid) {
          window.weuiErr('内容不合法(文字长度超过2000或图片超过9张)，无法发布')
          return
        }
      }

      let data = {
        content: this.content,
        classCode: this.classCode,
        type: this.momentType,
        imageFiles: this.imageFiles
      }
      window.backgroundSubmit(data)
      // console.log(postData)
    }
  }
}
</script>

<style scoped>
  /* 限制action-sheet的menu最大高度 */
  .weui-actionsheet-limit .weui-actionsheet__menu {
    max-height: 370px;
    overflow-y: auto;
  }

  .weui-cell {
    padding: 10px 30px;
  }
  .weui-cell:before {
    right: 30px;
    left: 30px;
  }

  .weui-btn-area {
    margin-left: 30px;
    margin-right: 30px;
  }

  /* 触摸原地放大的实现 */
  .allow-overflow {
    overflow: visible;  /* 允许放大出界 */
  }
  .touch-control .img-border {
    width: 100%;
    height: 100%;
    background: black;
    overflow: hidden;   /* 裁剪图片 */
    transition: all 1s;
  }
  .touch-control .img-border img {
    height: 100%;                 /* 纵向居中 */
    margin-left: 50%;             /* 横向居中 */
    transform: translateX(-50%);  /* 横向居中 */
  }
  .touch-control.touching .img-border {
    /* width: 120%;                  /* 放大相框 * / */
    /* height: 120%;                 /* 放大相框 * / */
    /* margin-top: -10%;             /* 居中处理 * / */
    /* margin-left: -10%;            /* 居中处理 * / */
  }
  .touch-control .img-border-dummy {
    width: 100%;
    height: 100%;
    overflow: hidden;   /* 裁剪图片 */
    transition: all 1s;
  }
  /* 移动中 */
  .touch-control .img-border.moving {
    background: red;
    position: fixed;
    transition-duration: 0s;
  }
  .touch-control .img-border.moving + .img-border-dummy {
    width: 0%;
    background: green;
  }

  .delete-area {
    background: red;
    color: white;
    bottom: 0px;
    position: absolute;
    width: 100%;
    height: 0px;
    line-height: 0px;
    transition: all 0.3s;
    opacity: 0;
  }
  .delete-area.show {
    opacity: 1;
    height: 45px;
    line-height: 45px;
  }
  .delete-area.show.active {
    height: 60px;
    line-height: 60px;
  }
</style>
