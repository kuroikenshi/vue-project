<template>
  <div class="page">
    <div class="weui-cells fixed-top auto-height">
      <a class="weui-cell weui-cell_access weui-cell-taller class-selector" href="javascript: void(0);" @click="classCodeSelect">
        <div class="weui-cell__bd">
          <p>班级</p>
        </div>
        <div class="weui-cell__ft">
          <span v-show="!!selectedClassCode">
            {{selectedClassName}}
            <span class="class-code">
              <span class="class-code-label">编码</span>
              {{selectedClassCode}}
            </span>
          </span>
          <span v-show="!selectedClassCode">{{selectedClassName}}</span>
        </div>
      </a>
    </div>

    <div class="schedule-container">
      <div class="center" v-show="!scheduleImgSrc && !scheduleImgSrcIsReady">加载中...</div>
      <div class="center" v-show="!scheduleImgSrc && scheduleImgSrcIsReady">-- 暂无数据 --</div>
      
      <!-- 上传部分 -->
      <div class="center" v-show="!scheduleImgSrc && scheduleImgSrcIsReady && isTeacher">
        <div class="weui-btn-area margin-bottom-20">
          <span v-show="choosedFile === undefined">&lt;&lt;&lt; 上传课程表</span>
          <div class="weui-uploader__input-box" v-show="choosedFile === undefined">
            <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*"
                @change="choosedFileChanged">
          </div>
          <a href="javascript:void(0);" class="weui-btn weui-btn_warn"
              v-show="choosedFile !== undefined"
              v-on:click="uploadSchedule">上传</a>
        </div>
      </div>

      <div class="schedule-panel" v-show="!!scheduleImgSrc && scheduleImgSrcIsReady">
        <img :src="scheduleImgSrc" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyComp',
    data () {
      return {
        scheduleImgSrc: undefined,
        scheduleImgSrcIsReady: false,
        
        isTeacher: false,
        
        selectedClassCode: '',
        selectedClassName: '',

        choosedFile: undefined,
      }
    },
    created () {
      // 更新tabbar参数
      this.$emit('eventPop_updateTabbar', {
        'navbarTitle': '班级课程表',
        'backPath': '/user/userInfo'
      })

      // 初始化班级列表
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
          return Promise.reject(err)
        })
      }
      
      this.isTeacher = (window.uls.get('userInfo', 'userType') === Global.userType.TEACHER)
    },
    methods: {
      getSchedule: function () {
        this.scheduleImgSrcIsReady = false
        let postData = this.$qs.stringify({classCode: this.selectedClassCode})

        this.$axios.post('/classes/getClassSchedule', postData).then(res => {
          console.log('getClassSchedule>>>', res.data)
          this.scheduleImgSrc = res.data.data.classScheduleUrl
          this.scheduleImgSrcIsReady = true
          return Promise.resolve()
        }).catch(err => {
          window.weuiErr('获取班级课程表失败:' + err)
          return Promise.reject(err)
        })
      },

      // 选择图片
      choosedFileChanged: function () {
        this.choosedFile = event.target.files[0]
        console.log('图片已选')
      },
      // 上传课程表
      uploadSchedule: function () {
        let formData = new FormData()
        formData.append('file', this.choosedFile)
        formData.append('classCode', this.selectedClassCode)

        this.$axios.post('/classes/addClassSchedule', formData).then(res => {
          console.log('addClassSchedule>>>', res.data)
          this.scheduleImgSrc = res.data.data.classScheduleUrl
          this.scheduleImgSrcIsReady = true
          return Promise.resolve()
        }).catch(err => {
          window.weuiErr('添加班级课程表失败:' + err)
          return Promise.reject(err)
        })
      },

      // 设置班级列表参数
      _setClassCodeParam: function (classList) {
        // 更新可选班级菜单数据
        let menuData = []
        classList.forEach(item => {
          menuData.push({
            label: item.className,
            value: item.classCode,
            onClick: () => {
              this.selectedClassCode = item.classCode
              this.selectedClassName = item.className
              this.getSchedule()
            }
          })
        })
        this.classCodeMenu = menuData

        // 跟新菜单数据后，默认选中第一个
        this.selectedClassCode = menuData[0].value
        this.selectedClassName = menuData[0].label
        // 选中后获取当前班级联系信息
        this.getSchedule()
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
    }
  }
</script>

<style scoped>
  .center {
    padding: 10px 15px;
  }
  .schedule-container {
    height: calc(100% - 44px);
  }
  .schedule-panel {
    height: 100%;
    overflow: scroll;
  }
  .schedule-panel img {
    height: 100%;
  }
</style>
