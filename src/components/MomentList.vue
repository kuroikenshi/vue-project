<template>
  <div>
    <moment-item v-for="momentItem in momentList" v-bind:key="momentItem.momentId" v-bind:momentItemBased="momentItem" />
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
      navbarTitle: this.$route.params.classCode + '班级空间',
      momentList: []
    }
  },
  created () {
    this.updateNavbarTitle()
    
    this.getMoments()
  },
  methods: {
    // 更新navbar标题
    updateNavbarTitle () {
      this.$emit('eventPop_updateNavbarTitle', this.navbarTitle)
    },
    // 获取动态数据
    getMoments () {
      // console.log('>>> 获取动态数据')
      
      return this.$axios.post('demo/moments/getMoments').then(res => {
        console.log('getMoments>>>', res.data)
        this.momentList = res.data.data
        this.momentListLoaded = true
        return Promise.resolve()
      }).catch(err => {
        console.log('加载momentList失败:', err)
        this.momentListLoaded = true
        this.momentListErrMsg = '-- 加载失败 --'
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
</style>
