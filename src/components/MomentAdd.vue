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

              <!-- 测试信息 -->
              <!-- <div style="background: darkgray; color: white; line-height: initial; padding: 5px;">
                {{coveringIndex}}
                <br>
                ({{ Math.round(images.length / 3) }} + {{ ([0, 3, 6].indexOf(images.length) != -1 ? 1 : 0) }})
                *
                {{ (thumbnailWidth + 10) }}
                =
                {{ (Math.round(images.length / 3) + ((images.length % 3 != 0) ? 1 : 0)) * (thumbnailWidth + 10) }}

                <hr>
                coveringIndex: {{coveringIndex}}
              </div> -->

              <!-- ((images.length % 3 != 0) ? 1 : 0) + -->
              <div class="weui-uploader__bd grid-thumbnails-container"
                  :style="{
                    height: (
                      Math.ceil(images.length / 3) +
                      ([0, 3, 6].indexOf(images.length) != -1 ? 1 : 0)
                    ) * (thumbnailWidth + 10) + 'px'
                  }">

                <!--
                  'left': (key % 3) * (thumbnailWidth + 10) + 'px',
                  'top': (parseInt(key / 3)) * (thumbnailWidth + 10) + 'px',
                -->

                <!-- 每个图片容器对象 -->
                <div class="grid-thumbnails-item touch-control" v-for="(imageUrl, key) in images" :key="key"
                    :style="{
                      'width': gridThumbItemStyles[key]['width'],
                      'height': gridThumbItemStyles[key]['height'],
                      'left': gridThumbItemStyles[key]['left'],
                      'top': gridThumbItemStyles[key]['top']
                    }"
                    :class="{'touching': touching == key, 'moving': (touching == key && touchmoveEvent != undefined), 'no-transition': touching == undefined}"
                    @touchstart="touchstart(key)" @touchmove="touchmove(key)" @touchend="touchend(key)">

                  <div class="img-border"
                      :style="{
                        'width': thumbnailWidth + 'px',
                        'height': thumbnailWidth + 'px',
                        'left': (touching == key && touchmoveEvent != undefined) ? touchmoveEvent.touches[0].pageX - thumbnailWidth / 2 + 'px' : 'unset',
                        'top': (touching == key && touchmoveEvent != undefined) ? touchmoveEvent.touches[0].pageY - thumbnailWidth / 2 + 'px' : 'unset'
                      }">
                    <img :src="imageUrl">
                  </div>
                </div>

                <!-- 新增图片按钮 -->
                <div class="weui-uploader__input-box grid-thumbnails-item"
                    v-show="(this.imageFiles.length < this.imageLimit)"
                    :style="{
                      'width': thumbnailAddWidthPX,
                      'height': thumbnailAddWidthPX,
                      'left': (images.length % 3) * (thumbnailWidth + 10) + 'px',
                      'top': (parseInt(images.length / 3)) * (thumbnailWidth + 10) + 'px'
                      }
                    ">
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

      <div class="weui-btn-area margin-bottom-20">
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
  var targets = document.getElementsByClassName('touch-control');
  for (var i = 0; i < targets.length; i++) {
    var nodeOffset = offset(targets[i]);
    // console.log(offset(node), node.offsetWidth, node.offsetHeight);
    if (
      x > nodeOffset.left &&
      y > nodeOffset.top &&
      x < (nodeOffset.left + targets[i].offsetWidth) &&
      y < (nodeOffset.top + targets[i].offsetHeight) &&
      // targets[i].parentNode.classList.value.indexOf('moving') == -1
      targets[i].classList.value.indexOf('moving') == -1
    ) {
      return i;
    }
  }
  return undefined;
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

      touching: undefined,  // 当前触摸的对象idx
      touchmoveEvent: undefined,
      touchingToDelete: false,  // touching对象将要被删除

      imagesCtnAreas: [],   // 触摸开始瞬间，图片容器位置的绝对定位值和范围，用于计算touchmove中图片移动位置的动画
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
      this.$axios.post('/classes/getClassList').then(res => {
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
    },

    // 当前移动对象与其他对象重合，如果重合返回其index
    coveringIndex: function () {
      let idx = undefined

      if (this.touchmoveEvent != undefined) {
        let x = this.touchmoveEvent.touches[0].pageX
        let y = this.touchmoveEvent.touches[0].pageY
        // 找出所在区域的index
        for (let i = 0; i < this.imagesCtnAreas.length; i++) {
          let nodeOffset = this.imagesCtnAreas[i]
          // 在区域内的计算方法
          if (
            x > nodeOffset.left &&
            x < (nodeOffset.left + this.thumbnailWidth) &&
            y > nodeOffset.top &&
            y < (nodeOffset.top + this.thumbnailWidth) // &&
            // targets[i].classList.value.indexOf('moving') == -1
          ) {
            idx = i
          }
        }
      }

      return idx
    },

    // 预览图片的样式数组
    gridThumbItemStyles: function () {
      console.log('touching ->', this.touching, 'coveringIndex ->', this.coveringIndex)
      if (this.images.length > 0) {
        let sArr = []
        for (let idx = 0; idx < this.images.length; idx++) {
          let stl = {}

          // 没开始触摸 或 开始触摸，但是没重合
          if (this.touching == undefined || (this.touching != undefined && this.coveringIndex == undefined)) {
            stl['width'] = this.thumbnailWidth + 'px'
            stl['height'] = this.thumbnailWidth + 'px'
            stl['left'] = (idx % 3) * (this.thumbnailWidth + 10) + 'px'
            stl['top'] = (parseInt(idx / 3)) * (this.thumbnailWidth + 10) + 'px'
          }
          // 重合覆盖
          else {
            // 大小
            // 当前移动对象
            if (this.touching == idx) {
              stl['width'] = 0 + 'px'
              stl['height'] = 0 + 'px'
            }
            // // 当前重合对象
            // else if (this.coveringIndex == idx) {
            //   stl['width'] = this.thumbnailWidth * 2 + 10  + 'px'
            //   stl['height'] = this.thumbnailWidth + 'px'
            // }
            // 其他对象
            else {
              stl['width'] = this.thumbnailWidth + 'px'
              stl['height'] = this.thumbnailWidth + 'px'
            }

            // 偏移量
            // 移动对象向左移的情况
            if (this.touching > this.coveringIndex) {
              // 移动对象和插入点对象之间的对象（包括插入点）向右移动
              if (idx >= this.coveringIndex && idx <= this.touching) {
                let _idx = idx + 1

                stl['left'] = (_idx % 3) * (this.thumbnailWidth + 10) + 'px'
                stl['top'] = (parseInt(_idx / 3)) * (this.thumbnailWidth + 10) + 'px'
              }
              // 其他对象不变
              else {
                stl['left'] = (idx % 3) * (this.thumbnailWidth + 10) + 'px'
                stl['top'] = (parseInt(idx / 3)) * (this.thumbnailWidth + 10) + 'px'
              }
            }
            // 移动对象向右移的情况
            else {
              // 移动对象和插入点对象之间的对象（包括插入点）向左移动
              if (idx >= this.touching && idx <= this.coveringIndex) {
                let _idx = idx - 1

                stl['left'] = (_idx % 3) * (this.thumbnailWidth + 10) + 'px'
                stl['top'] = (parseInt(_idx / 3)) * (this.thumbnailWidth + 10) + 'px'
              }
              // 其他对象不变
              else {
                stl['left'] = (idx % 3) * (this.thumbnailWidth + 10) + 'px'
                stl['top'] = (parseInt(idx / 3)) * (this.thumbnailWidth + 10) + 'px'
              }
            }
          }
          console.log(' ->', idx, JSON.stringify(stl))
          sArr.push(stl)
        }
        // console.log('sArr', sArr)
        return sArr
      }
      else {
        return []
      }
    }
  },
  methods: {
    // 图片点住
    touchstart: function (key) {
      console.log('touchstart')
      this.touching = key
      this.touchingToDelete = false

      // 点住开始瞬间，更新容器范围数组
      this.imagesCtnAreas = []
      let targets = document.getElementsByClassName('touch-control')
      for (let i = 0; i < targets.length; i++) {
        let nodeOffset = offset(targets[i])
        this.imagesCtnAreas.push(nodeOffset)
      }
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
          if (this.coveringIndex != undefined) {
            // 取出正在移动的图片文件
            let movingFile = this.imageFiles.splice(this.touching, 1)[0]
            let movingImg = this.images.splice(this.touching, 1)[0]
            // 从左向右
            if (this.touching < this.coveringIndex) {
              this.imageFiles.splice(this.coveringIndex, 0, movingFile)
              this.images.splice(this.coveringIndex, 0, movingImg)
            }
            // 从右向左
            else {
              this.imageFiles.splice(this.coveringIndex, 0, movingFile)
              this.images.splice(this.coveringIndex, 0, movingImg)
            }
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

        // 如果在某图片上，替换位置

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
      this.classCode = this.$route.params.classCode || menuData[0].label
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

      // 限制图片张数
      if ((this.imageFiles.length + Array.from(event.target.files).length) > this.imageLimit) {
        window.weuiErr('发布图片不能超过' + this.imageLimit + '张，当前选择超出' + ((this.imageFiles.length + Array.from(event.target.files).length) - this.imageLimit) + '张')
        event.target.files = []
        return
      }
      
      // 限制单张图片大小，限制图片类型
      var allowMimeType = [
          "image/jpg", "image/jpeg", "image/pjpeg", 
          "image/gif", "image/nbmp", "image/bmp", 
          "image/png", "image/x-png"]
      Array.from(event.target.files).forEach(file => {
        if (file.size != undefined && file.size >  10 * 1024 * 1024) {
          window.weuiErr('单张图片大小不能超过10M！检测到图片大小' + (file.size / 1024 / 1024).toFixed(3) + 'M，请重新选择！')
          event.target.files = []
          return
        }
        else if (file.type != undefined && allowMimeType.indexOf((file.type || '').toLowerCase()) == -1) {
          window.weuiErr('只允许上传[' + allowMimeType.join('|') + ']类型的文件！"' + (file.type || '').toLowerCase() + '"不是合法类型，请重新选择！')
          event.target.files = []
          return
        }
      })

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

  /* 表格式缩略图容器 */
  .grid-thumbnails-container {
    overflow: visible;  /* 允许放大出界 */
    position: relative;
  }
  .grid-thumbnails-container .grid-thumbnails-item {
    position: absolute;
  }
  .touch-control {
    transition: all 0.3s ease-in-out;
    max-width: 100%;
    /* background: green; */ /* 调试用 */
  }
  .touch-control.no-transition {
    transition-duration: 0s;
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
    z-index: 10;
  }
  /* .touch-control.touching .img-border {
    width: 120%;                  /* 放大相框 * /
    height: 120%;                 /* 放大相框 * /
    margin-top: -10%;             /* 居中处理 * /
    margin-left: -10%;            /* 居中处理 * /
  } */
  /* 移动中 */
  .touch-control.moving {
    max-width: 0;
    margin-right: 0;
  }
  .touch-control.moving .img-border {
    /* background: red; */ /* 调试用 */
    position: fixed;
    z-index: 10;
    transition-duration: 0s;
  }

  /* 删除区域 */
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
    z-index: 510;
  }
  .delete-area.show {
    opacity: 1;
    height: 53px;
    line-height: 53px;
  }
  .delete-area.show.active {
    height: 70px;
    line-height: 70px;
  }
</style>
