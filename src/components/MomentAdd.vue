<template>
  <div>
    <form>
      <div class="weui-cells no-line no-margin-top">
        <div class="weui-cell weui-cell-taller">
          
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" name="" placeholder="输入正文..." rows="3"></textarea>
            
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
      
        <a class="weui-cell weui-cell_access weui-cell-taller" href="javascript: void(0);">
          <div class="weui-cell__hd">
            <i class="icon icon-book"></i>
          </div>
          <div class="weui-cell__bd">
            <p>班级</p>
          </div>
          <div class="weui-cell__ft">
            PE19003
          </div>
        </a>
      
        <a class="weui-cell weui-cell_access weui-cell-taller" href="javascript: void(0);">
          <div class="weui-cell__hd">
            <i class="icon icon-schedule"></i>
          </div>
          <div class="weui-cell__bd">
            <p>类型</p>
          </div>
          <div class="weui-cell__ft">
            通知
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
    }
  },
  created () {
    this.$emit('eventPop_updateNavbarTitle', '发布状态')
  },
  methods: {
  }
}
</script>

<style>
  
</style>
