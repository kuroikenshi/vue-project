<template>
  <div>
    <moment-item v-for="momentItem in momentList" v-bind:key="momentItem.momentId" v-bind:momentItemBased="momentItem" />
    
    <!-- 滚动加载提示 -->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="scrollLoadDisabled" infinite-scroll-distance="-40" infinite-scroll-throttle-delay="200">
      <div class="loading-tips" v-show="scrollLoading">加载中...</div>
      <div class="loading-tips" v-show="noMoreData">-- 没有更多数据啦 --</div>
      <div class="loading-tips" v-show="!noMoreData && !scrollLoading">-- 下拉加载更多 --</div>
    </div>
  </div>
</template>

<script>
import MomentItem from '@/components/MomentItem'
  
export default {
  name: 'MyComp',
  components: {
    'moment-item': MomentItem
  },
  data () {
    return {
      classCode: this.$route.params.classCode,
      momentList: [],
      scrollLoading: false,       // 正在滚动加载
      firstDataNotLoaded: true,   // 首批数据尚未装载，用来限制滚动加载
      firstDataLoadError: false,  // 首批数据加载失败
      noMoreData: false           // 没有更多的数据了
    }
  },
  computed: {
    // 禁用滚动加载
    scrollLoadDisabled: function () {
      return this.firstDataNotLoaded || this.firstDataLoadError || this.scrollLoading || this.noMoreData
    },
    // 老的动态id
    oldestMomentId: function () {
      if (this.momentList.length > 0) {
        return this.momentList[this.momentList.length - 1].momentId
      }
      else {
        return ''
      }
    }
  },
  created () {
    // 更新tabbar参数
    this.$emit('eventPop_updateTabbar', {
      'navbarTitle': this.$route.params.classCode + '班级空间',
      'backPath': '/class/classList'
    })
    
    this.getFirstMoments()
  },
  methods: {
    // 获取首次动态数据
    getFirstMoments () {
      let postData = this.$qs.stringify({
        classCode: this.classCode,    // 班级code
        lastUpdateTime: window.uls.get('lastUpdateTime', this.classCode) || '',   // 提供上次更新时间戳，没有为空
        mode: 'new'   // 查找最新的
      })
      
      // console.log('>>> 获取动态数据')
      
      return this.$axios.post('demo/moments/getMoments', postData).then(res => {
        console.log('getFirstMoments>>>', res.data)
        
        // 加载新的，重置没有更多的开关
        this.noMoreData = false
        
        this.momentList = res.data.data
        this.momentListLoaded = true
        this.firstDataNotLoaded = false
        return Promise.resolve()
      }).catch(err => {
        console.log('加载momentList失败:', err)
        this.momentListLoaded = true
        this.firstDataLoadError = true
        this.momentListErrMsg = '-- 加载失败 --'
        this.firstDataNotLoaded = false
        return Promise.reject(err)
      })
    },
    loadMore: function() {
      this.scrollLoading = true
      console.log('加载中...')
      
      
      let postData = this.$qs.stringify({
        classCode: this.classCode,      // 班级code
        momentId: this.oldestMomentId,  // 最旧一条动态的id
        mode: 'old'                     // 查找之前的
      })
      
      return this.$axios.post('demo/moments/getMoments', postData).then(res => {
        console.log('getMoreMoments>>>', res.data)
        
        if (res.data.data.length == 0) {
          console.log('没有更多数据了~')
          this.noMoreData = true
        }
        
        this.momentList = [...this.momentList, ...res.data.data]
        this.momentListLoaded = true
        this.firstDataNotLoaded = false
        
        console.log('加载结束!')
        this.scrollLoading = false
        return Promise.resolve()
      }).catch(err => {
        console.log('加载更多momentList失败:', err)
        this.momentListLoaded = true
        this.momentListErrMsg = '-- 加载失败 --'
        this.firstDataNotLoaded = false
        
        console.log('加载结束!')
        this.scrollLoading = false
        return Promise.reject(err)
      })
    },
    goback: function (event) {
      console.log(this.$router)
      this.$router.back()
    }
  }
}
</script>

<style>
  .loading-tips {
    text-align: center;
    padding: 20px;
  }
</style>
