<template>
  <div class="page">
    <div class="weui-cells no-margin-top" :class="{'no-line': (!classListErrMsg && classListLoaded)}">

      <div v-show="classList.length <= 0" class="weui-cell weui-cell-taller">
        <div class="weui-cell__bd center">
          {{ !classListErrMsg ? (!classListLoaded ? "加载中..." : "") : classListErrMsg }}
          <!--
          <br/>
          已加载 > {{ !!classListLoaded }}<br/>
          成功 > {{ !classListErrMsg }}<br/>
          失败消息 > "{{ classListErrMsg }}"<br/>
          -->
        </div>
      </div>

      <a v-for="classItem in classList" v-bind:key="classItem.classCode" href="javascript: void(0);"
          v-show="newsCountReqFinishCount == classList.length"
          class="weui-cell weui-cell_access weui-cell-taller" v-on:click="enterClassMoments(classItem.classCode)">
        <!-- <div class="weui-cell__hd">
          <i class="icon icon-mail-opened"></i>
        </div> -->
        <div class="weui-cell__bd padding-right-10">
          <!-- <p>{{ classItem.classCode }}</p> -->
          <p>{{ classItem.className }} <span class="class-code"><span class="class-code-label">编码</span>{{ classItem.classCode }}</span></p>
        </div>
        <div class="weui-cell__ft">
          <!-- 新消息数 -->
          <span class="new-msg">{{ ((classItem.count === undefined || classItem.count === 0) ? "无新消息" : (classItem.count) + '条新消息') }}</span>
        </div>
      </a>

    </div>

    <!-- 没有找到班级单独提示 -->
    <div v-show="(!classListErrMsg && classListLoaded && classList.length <= 0)" class="no-class-data"></div>
  </div>
</template>

<script>
  import Global from '@/components/Global'

  export default {
    name: 'MyComp',
    data () {
      return {
        classListLoaded: false,
        classListErrMsg: '',
        classList: [],
        newsCountReqFinishCount: 0
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
        // 优先从缓存中取，否则再请求并更新到缓存
        if (!!window.uls.get('personalData', 'classList')) {
          this.classList = window.uls.get('personalData', 'classList')
          this.classListLoaded = true

          this.getEachClassNewsCount()

          return true
        }

        else {
          return this.$axios.post('/banji/classes/getClassList').then(res => {
            console.log('getClassList>>>', res.data)
            this.classList = res.data.data
            this.classListLoaded = true

            // 放入缓存
            window.uls.set('personalData', 'classList', res.data.data)

            return Promise.resolve()
          }).then(() => {
            this.getEachClassNewsCount()

            return Promise.resolve()
          }).catch(err => {
            console.log('加载classList失败:', err)
            this.classListLoaded = true
            this.classListErrMsg = '-- 加载失败 --'
            return Promise.reject(err)
          })
        }


      },

      // 获取班级最新消息个数
      getEachClassNewsCount () {
        this.newsCountReqFinishCount = 0
        let that = this

        // 遍历加载新消息个数
        this.classList.forEach((classItem, idx) => {
          console.log('>>> 遍历加载新消息个数', classItem.classCode)

          // 如果没有，给默认值
          if (!window.uls.get(classItem.classCode, 'lastUpdateTime')) {
            window.uls.set(classItem.classCode, 'lastUpdateTime', new Date().setYear(2018))
          }

          let postData = that.$qs.stringify({
            classCode: classItem.classCode,
            lastUpdateTime: window.uls.get(classItem.classCode, 'lastUpdateTime')
          })

          console.log('postData>>>', postData)

          this.$axios.post('/banji/moments/getNewsCount', postData).then(res => {
            console.log('getNewsCount>>>', res.data)
            this.classList[idx].count =  'n'
            if (res.status === 200) {
              console.log('    count:', res.data.data)
              console.log('    classItem.count:', classItem.count)
              classItem.count = res.data.data
              this.classList[idx].count = res.data.data
              this.newsCountReqFinishCount += 1
              console.log('    >>>>>', this.classList[idx].count)
            } else {
              window.weuiErr(res.data.status + ': ' + res.data.msg)
              this.classList[idx].count =  'n'
            }
            return Promise.resolve()
          }).catch(err => {
            console.log('获取班级最新消息个数错误:', err)
            this.classList[idx].count =  'n'
            return Promise.reject(err)
          })
        })

        // 安全方法，预防加载新消息个数卡住的bug
        setTimeout(() => {
          this.newsCountReqFinishCount = this.classList.length
        }, 5000)
      }
    }
  }
</script>

<style scoped>
/* 最后一个.weui-cell加下划线 */
/* .weui-cell:last-child:after {
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
} */
.no-class-data {
  width: 231.5px;
  height: 187.5px;
  position: absolute;
  left: calc(50% - 115.75px);
  top: calc(50% - 93.75px);
  background: url(/banji/static/imgs/no-class-data.png) no-repeat;
  background-size: contain;
}

.center {
  text-align: center;
}

.padding-right-10 {
  padding-right: 10px;
}

</style>
