<template>
  <scroller ref="scroller" class="scroller-adjust"
      :on-refresh="refresh"
      :on-infinite="infinite" >
    <!-- 每条动态 -->
    <moment-item v-for="momentItem in momentList" v-bind:key="momentItem.momentId" v-bind:momentItemBased="momentItem" />
    
    <!-- 滚动加载提示 -->
    <!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="scrollLoadDisabled" infinite-scroll-distance="-40" infinite-scroll-throttle-delay="200">
      <div class="loading-tips" v-show="scrollLoading">加载中...</div>
      <div class="loading-tips" v-show="noMoreData">-- 没有更多数据啦 --</div>
      <div class="loading-tips" v-show="!noMoreData && !scrollLoading">-- 下拉加载更多 --</div>
    </div> -->
  </scroller>
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
      
      loadCD: 0,               // 加载更多失败时，等待秒数
      loadChance: 0,           // 加载更多可以失败的次数
      /* scrollLoading: false,       // 正在滚动加载
      firstDataNotLoaded: true,   // 首批数据尚未装载，用来限制滚动加载
      firstDataLoadError: false,  // 首批数据加载失败
      noMoreData: false           // 没有更多的数据了 */
    }
  },
  computed: {
    // 禁用滚动加载
    scrollLoadDisabled: function () {
      return this.firstDataNotLoaded || this.firstDataLoadError || this.scrollLoading || this.noMoreData
    },
    
    // 老的动态时间戳
    oldestMomentCreateDate: function () {
      if (this.momentList.length > 0) {
        return (new Date(this.momentList[this.momentList.length - 1].createDate)).Format('yyyy-MM-dd hh:mm:ss')
      }
      else {
        console.log('momentList.length <= 0!!')
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
    
    this._resetLoadParam()
  },
  methods: {
    /**
     * 下拉刷新
     */
    refresh () {
      console.log('refresh')
      // this.momentList = []
      this.getFirstMoments()
      setTimeout(() => {
        // 手动触发scroller的结束刷新方法
        this.$refs.scroller.finishPullToRefresh()
      }, 10000)
    },
    
    /**
     * 上拉加载更多
     */
    infinite (loadMoreDone) {
      console.log('infiniteinfinite', loadMoreDone)
      
      this.loadMore(loadMoreDone)
      
    },
    
    // 重试冷却和次数还原
    _resetLoadParam () {
      this.loadCD = 1
      this.loadChance = 3
    },
    
    // 处理加载失败子逻辑
    _handleLoadFail (loadMoreDone) {
      // 加载失败时，先等n秒钟
      setTimeout(() => {
        this.$refs.scroller.finishPullToRefresh()
        if (this.loadChance > 0) {
          !!loadMoreDone && loadMoreDone(false)
          this.loadChance -= 1
          this.loadCD += 2
        } else {
          !!loadMoreDone && loadMoreDone(true)
          window.weuiErr('网络/服务可能暂时不可用，请晚些时候重试，或联系系统管理员')
        }
      }, 1000 * this.loadCD)
    },
    
    // 获取首次动态数据
    getFirstMoments () {
      console.log('加载中...')
      let postData = this.$qs.stringify({
        classCode: this.classCode,    // 班级code
        lastUpdateTime: window.uls.get('lastUpdateTime', this.classCode) || '',   // 提供上次更新时间戳，没有为空
        mode: 'new'   // 查找最新的
      })
      return this.$axios.post('moments/getMoments', postData).then(res => {
        console.log('加载成功>>>', res.data)
        this.$refs.scroller.finishPullToRefresh()
        this.momentList = res.data.data

        // 重试冷却和次数还原
        this._resetLoadParam ()
        
        return Promise.resolve()
      }).catch(err => {
        window.weuiErr('加载失败:' + err)
        
        // 处理加载失败
        this._handleLoadFail()
        
        return Promise.reject(err)
      })
    },
    
    // 加载更多
    loadMore: function(loadMoreDone) {
      this.scrollLoading = true
      console.log('加载更多-加载中...')
      
      let postData = this.$qs.stringify({
        classCode: this.classCode,                    // 班级code
        lastUpdateTime: this.oldestMomentCreateDate,  // 最旧一条动态的发布时间
        mode: 'old'                                   // 查找之前的
      })
      
      return this.$axios.post('moments/getMoments', postData).then(res => {
        console.log('加载更多-加载成功>>>', res.data)
        
        // 拼合数据
        this.momentList = [...this.momentList, ...res.data.data]
        
        // 重试冷却和次数还原
        this._resetLoadParam ()
        
        console.log('加载更多-结束!')
        
        // 结束上拉加载更多(是否最底)
        if (res.data.data.length == 0) {
          loadMoreDone(true)
        } else {
          loadMoreDone(false)
        }
        return Promise.resolve()
      }).catch(err => {
        window.weuiErr('加载更多:' + err)
        
        // 处理加载失败
        this._handleLoadFail(loadMoreDone)
        
        return Promise.reject(err)
      })
    },
  }
}
</script>

<style>
  .scroller-adjust {
    margin-top: 44px;
    height: calc(100% - 97px)!important;  /* 强行置换VueScroller容器样式 */
  }
  
  .loading-tips {
    text-align: center;
    padding: 20px;
  }
</style>
