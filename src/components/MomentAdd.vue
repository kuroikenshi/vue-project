<template>
  <div>
    <form>
      <div class="weui-cells no-line no-margin-top">
        <div class="weui-cell weui-cell-taller">
          
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" name="" placeholder="输入正文..." rows="3" @click="test"></textarea>
            
            <div class="weui-uploader">
              <!-- <div class="weui-uploader__hd">
                <p class="weui-uploader__title">图片上传</p>
                <div class="weui-uploader__info">0/2</div>
              </div> -->
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
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
                <div class="weui-uploader__input-box">
                  <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="">
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
        <a href="javascript:void(0);" class="weui-btn weui-btn_primary">发布</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data () {
    return {
      classCode: 'PE19003',
      classCodeOptions: ['PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005', 'PE19003', 'PE19004', 'PE19005'],
      momentType: '通知',
      momentTypeOptions: ['通知', '作业', '其他']
    }
  },
  created () {
    this.$emit('eventPop_updateNavbarTitle', '发布状态')
  },
  computed: {
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
    test: function() {
      // 便于全局关闭
      this.weuijsDialog = this.$weui.dialog({
        title: '提示',
        content: '是否领取礼品',
        buttons: [{
          label: '取消',
          type: 'default',
          onClick: () => {
            alert('您已取消领取礼品！')
          }
        }, {
          label: '确定',
          type: 'primary',
          onClick: () => {
            alert('您已确定领取礼品！')
          }
        }]
      })
    },
    classCodeSelect: function() {
      this.weuijsActionSheet = this.$weui.actionSheet(
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
    momentTypeSelect: function() {
      this.weuijsActionSheet = this.$weui.actionSheet(
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
</style>
