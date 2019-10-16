<template>
  <div class="page">
    <div class="weui-cells no-line"
        v-bind:class="{'no-margin-top': (idx > 0)}"
        v-for="(parentItem, idx) in parentList" v-bind:key="idx">
      <div class="weui-cell weui-cell-taller weui-cell-title">
        <div class="weui-cell__bd">
          <p>
            {{ parentItem.relation }}信息
            <button class="weui-btn weui-btn_mini edit-button" @click="editBtnsPop(parentItem)">编辑</button>
          </p>
        </div>
      </div>
      <div class="weui-cell weui-cell-taller weui-cell-thinner">
        <div class="weui-cell__bd">
          <p>{{ parentItem.relation }}姓名</p>
        </div>
        <div class="weui-cell__ft">{{ parentItem.username || '-- 未设置 --' }}</div>
      </div>
      <div class="weui-cell weui-cell-taller weui-cell-thinner">
        <div class="weui-cell__bd">
          <p>{{ parentItem.relation }}电话</p>
        </div>
        <div class="weui-cell__ft">{{ parentItem.mobile || '-- 未设置 --' }}</div>
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
            relation: '母亲',
            username: '欧阳华',
            mobile: '1810000222'
          },
          {
            relation: '父亲',
            username: '德玛西亚',
            mobile: '1810000222'
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

      // 获取家长信息
      this.getParentInfoList()
    },
    methods: {
      // 弹出编辑操作界面
      editBtnsPop: function (parentItem) {
        /* this.weuijsPopedItem = */this.$weui.actionSheet(
          [{
            label: '修改',
            onClick: () => {
              // 修改家长信息
              this.$router.push('/user/parentInfoEdit/' + parentItem.id)
            }
          }, {
            label: '删除',
            onClick: () => {
              this.$weui.confirm('姓名: ' + parentItem.username + '<br>电话: ' + parentItem.mobile + '<br><br>点击确认删除', () => {
                // 点击确认
                this._deleteParentInfo(parentItem.id)

              }, () => {
                // 点击取消
                // do nothing
              }, {
                    title: '确认删除"' + parentItem.username + '"的信息？'
              });
            }
          }],
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

      // 删除家长信息
      _deleteParentInfo(uid) {
        let postData = this.$qs.stringify({id: uid})
        this.$axios.post('/banji/user/delUserInfo', postData).then(res => {
          console.log('/banji/user/delUserInfo resp>>>', res)
          if (res.status === 200 && res.data.status === 200) {
            window.weuiSuccess('删除成功')
            // 获取家长信息
            this.getParentInfoList()
          } else {
            window.weuiErr(res.data.status + ': ' + res.data.msg)
          }
        })
      },

      // 获取家长信息列表
      getParentInfoList () {
        console.log('>>> 获取家长信息')

        return this.$axios.post('/banji/user/getUserList').then(res => {
          console.log('getUserList>>>', res.data)
          this.parentList = res.data.data
          return Promise.resolve()
        }).catch(err => {
          console.log('getUserList失败:', err)
          return Promise.reject(err)
        })
      }
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

  .edit-button {
    /* background: #039974;
    color: #fff; */
    color: #039974;
    background: transparent;
    border-color: transparent;
    border-width: 0px;;
    float: right;

    border-radius: 3px;
    font-weight: 100;
    font-size: 12px;
    display: inline-block;
    /* line-height: 17px; */
    /* height: 17px; */
    padding: 0 10px;
    text-align: center;
    /* vertical-align: top; */
    margin-top: 4px;
    margin-left: 5px;
  }
  .edit-button:after {
    border-width: 0px;
  }
</style>
