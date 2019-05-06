<template>
  <div class="page">
    <div class="weui-cells no-line"
        v-bind:class="{'no-margin-top': (idx > 0)}"
        v-for="(parentItem, idx) in parentList" v-bind:key="idx">
      <div class="weui-cell weui-cell-taller weui-cell-title">
        <div class="weui-cell__bd">
          <p>{{ parentItem.parentType }}信息</p>
        </div>
      </div>
      <div class="weui-cell weui-cell-taller weui-cell-thinner">
        <div class="weui-cell__bd">
          <p>{{ parentItem.parentType }}姓名</p>
        </div>
        <div class="weui-cell__ft">{{ parentItem.name }}</div>
      </div>
      <div class="weui-cell weui-cell-taller weui-cell-thinner">
        <div class="weui-cell__bd">
          <p>{{ parentItem.parentType }}电话</p>
        </div>
        <div class="weui-cell__ft">{{ parentItem.tel }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ParentInfoList',
    data () {
      return {
        parentList: [
          {
            parentType: '母亲',
            name: '欧阳华',
            tel: '1810000222'
          },
          {
            parentType: '父亲',
            name: '德玛西亚',
            tel: '1810000222'
          }
        ]
      }
    },
    computed: {
    },
    created () {
      // 更新tabbar参数
      this.$emit('eventPop_updateTabbar', {
        'navbarTitle': '家长信息',
        'backPath': '/user/userInfo'
      })
    }
  }
</script>

<style scoped>
  /* 标题 */
  .weui-cell-title {
    padding: 0 15px;
  }
  .weui-cell-title .weui-cell__bd {
    background: #eee;
    color: #666;
    padding: 10px;
    font-weight: 300;
    font-size: 16px;
  }
  
  /* 家长信息每行样式调整 */
  .weui-cell-thinner {
    padding: 10px 25px;
  }
</style>
