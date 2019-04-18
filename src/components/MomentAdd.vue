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
                <div class="weui-uploader__input-box"
                    :style="{width: thumbnailAddWidth, height: thumbnailAddWidth}">
                  <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple @change="imageChanged">
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="weui-cell__ft">男</div> -->
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
        <a href="javascript:void(0);" class="weui-btn weui-btn_primary" @click="submit">发布</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data () {
    return {
      content: '',
      classCode: 'GWC182021',
      classCodeOptions: ['GWC182021', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005'],
      momentType: '通知',
      momentTypeOptions: ['通知', '作业', '其他'],
      images: [],
      imageFiles: []
    }
  },
  created () {
    this.thumbnailWidth = ((window.screen.width - 78) / 3).toFixed(2) + 'px'
    this.thumbnailAddWidth = ((window.screen.width - 78) / 3 - 2).toFixed(2) + 'px'
    this.$emit('eventPop_updateNavbarTitle', '发布状态')
    
    // 更新tabbar参数
    this.$emit('eventPop_updateTabbar', {
      'navbarTitle': '发布状态'
    })
  },
  computed: {
    bgImgs: function() {
      let bgImgs = []
      this.images.forEach(v => {
        bgImgs.push('url(' + v + ')')
      })
      return bgImgs
    },
    classCodeMenu: function() {
      let menuData = []
      let that = this
      this.classCodeOptions.forEach(item => {
        menuData.push({
          label: item,
          onClick: () => {
            console.log(item)
            that.classCode = item
          }
        })
      })
      return menuData
    },
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
    }
  },
  methods: {
    // 选择班级
    classCodeSelect: function() {
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
    imageChanged: function() {
      this.imageFiles = event.target.files
      
      Array.from(this.imageFiles).forEach(img => {
        let url = window.URL.createObjectURL(img)
        if (this.images.indexOf(url) == -1) {
          this.images.push(url)
        }
      })
      console.log(this.images)
    },
    // 提交动态
    submit: function() {
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
