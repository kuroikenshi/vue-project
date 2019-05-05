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
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
                  <li class="weui-uploader__file" v-for="(imageUrl, key) in images" :key="key" 
                      :style="{backgroundImage:'url(' + imageUrl + ')', width: thumbnailWidth, height: thumbnailWidth}">
                    <!-- <img :src="imageUrl" alt=""> -->
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
                    :style="{width: thumbnailAddWidth, height: thumbnailAddWidth}">
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
  </div>
</template>

<script>
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
      imageLimit: 9
    }
  },
  created () {
    this.thumbnailWidth = ((window.screen.width - 78) / 3).toFixed(2) + 'px'
    this.thumbnailAddWidth = ((window.screen.width - 78) / 3 - 2).toFixed(2) + 'px'
    
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
      console.log('notBlank', this.content.length, this.imageFiles.length, (this.content.length > 0) || (this.imageFiles.length > 0))
      return (this.content.length > 0) || (this.imageFiles.length > 0)
    },
    
    // 内容合法
    contentIsValid: function () {
      return this.content.length <= 2000 && this.imageFiles.length <= 9
    },
    
    // 提交可用
    submitDisabled: function () {
      console.log('submitDisabled>>>', !this.classCodeIsReady, !this.contentIsNotBlank, !this.contentIsValid)
      return !this.classCodeIsReady || !this.contentIsNotBlank || this.contentIsValid
    }
  },
  methods: {
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

<style>
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
</style>
