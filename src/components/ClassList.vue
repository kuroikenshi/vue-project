<template>
  <div class="page">
    <div class="weui-cells no-margin-top no-line">

      <div v-show="classList.length <= 0" class="weui-cell weui-cell-taller">
        <div class="weui-cell__bd center">
          {{ !classListErrMsg ? (!classListLoaded ? "加载中..." : "-- 未找到绑定班级 --") : classListErrMsg }}
          <!--
          <br/>
          已加载 > {{ !!classListLoaded }}<br/>
          成功 > {{ !classListErrMsg }}<br/>
          失败消息 > "{{ classListErrMsg }}"<br/>
          -->
        </div>
      </div>

      <a v-for="classItem in classList" v-bind:key="classItem.classCode" href="javascript: void(0);"
          class="weui-cell weui-cell_access weui-cell-taller" v-on:click="enterClassMoments(classItem.classCode)">
        <div class="weui-cell__hd">
          <i class="icon icon-mail-opened"></i>
        </div>
        <div class="weui-cell__bd">
          <p>{{ classItem.classCode }}</p>
        </div>
        <div class="weui-cell__ft">
          <span class="new-msg">{{ ((classItem.count === undefined || classItem.count === 0) ? "无新消息" : (classItem.count) + '条新消息') }}</span>
        </div>
      </a>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data () {
    return {
      classListLoaded: false,
      classListErrMsg: '',
      classList: []
    }
  },
  created () {
      // 更新tabbar参数
      this.$emit('eventPop_updateTabbar', {
        'navbarTitle': '班级列表'
      })

    // 加载classList
    this.getClassList()
  },
  methods: {
    // 进入班级动态
    enterClassMoments (classCode) {
      console.log('classCode:', classCode)

      this.$router.push('/class/' + classCode + '/moments')
    },

    // 获取班级列表
    getClassList () {
      console.log('>>> 获取班级列表')

      // return this.$axios.post('classes/getClassList').then(res => {
      return this.$axios.post('classes/getClassListByTeachCodeTest').then(res => {
        console.log('getClassList>>>', res.data)
        this.classList = res.data.data
        this.classListLoaded = true
        return Promise.resolve()
      }).catch(err => {
        console.log('加载classList失败:', err)
        this.classListLoaded = true
        this.classListErrMsg = '-- 加载失败 --'
        return Promise.reject(err)
      })
    }

    // 获取班级最新消息个数
    /* getEachClassNewsCount () {
      console.log('获取班级最新消息个数:', this.classList[0].count)
      let that = this

      // 遍历加载新消息个数
      this.classList.forEach(function (classItem) {
        console.log('>>> 遍历加载新消息个数', classItem.classCode)
        let postData = that.$qs.stringify({
          classCode: classItem.classCode,
          lastUpdate: window.uls.get(classItem.classCode, 'lastUpdate') || new Date(2018).valueOf()
        })

        console.log('postData>>>', postData)

        that.$axios.post('moments/getNewsCount', postData).then(res => {
          console.log('getNewsCount>>>', res.data)
          if (res.status === 200 && res.statusText === 'OK') {
            console.log('    count:', res.data.data)
            console.log('    classItem.count:', classItem.count)
            classItem.count = res.data.data + '条新消息'
            console.log('    >>>>>', that.classList[0].count)
          } else {
            alert('获取班级最新消息个数异常, status=' + res.status + ', statusText=' + res.statusText)
          }
          return Promise.resolve()
        }).catch(err => {
          console.log('获取班级最新消息个数错误:', err)
          classItem.count = '获取新消息个数失败'
          return Promise.reject(err)
        })
      })
    } */
  }
}
</script>

<style scoped>
/* 最后一个.weui-cell加下划线 */
.weui-cell:last-child:after {
  content: " ";
  position: absolute;
  left: 15px;
  bottom: 0;
  right: 15px;
  height: 1px;
  border-top: 1px solid #e5e5e5;
  color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
  z-index: 2;
}

.center {
  text-align: center;
}
</style>
