<template>
  <div class="page">
   <!-- <div class="weui-filters">
      <div class="weui-filter">
        <div class="weui-filter__label">
          班级编号
        </div>
        <div class="weui-filter__options">

        </div>
      </div>
    </div> -->
    <div class="weui-cells fixed-top">
      <a class="weui-cell weui-cell_access weui-cell-taller" href="javascript: void(0);" @click="classCodeSelect">
        <!-- <div class="weui-cell__hd">
          <i class="icon icon-schedule"></i>
        </div> -->
        <div class="weui-cell__bd">
          <p>班级编号</p>
        </div>
        <div class="weui-cell__ft">
          {{classCode}}
        </div>
      </a>
    </div>

    <!-- 加载提示 -->
    <div v-show="classContactList.length <= 0 && !classContactDataIsReady" class="weui-cells no-margin-top">
      <div class="weui-cell">
        <div class="weui-cell__bd center">
          加载中...
        </div>
      </div>
    </div>
    <div v-show="classContactList.length <= 0 && classContactDataIsReady" class="weui-cells no-margin-top">
      <div class="weui-cell">
        <div class="weui-cell__bd center">
          -- 暂无数据 --
        </div>
      </div>
    </div>

    <!-- 家长端：获取教师的通讯录 -->
    <div v-show="classContactList.length > 0 && isParent" class="weui-cells no-margin-top thinner">
      <div v-for="(contactItem, idx) in classContactList" v-bind:key="idx" class="weui-cell">
        <div class="weui-cell__bd">
          <span>{{contactItem.teacherName}}</span>
          <span class="user-badge" v-show="!!contactItem.role">{{ contactItem.role }}</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel:' + contactItem.tel"><i class="icon icon-phone"></i></a>
        </div>
      </div>
    </div>

    <!-- 教师端：显示家长信息 -->
    <div v-show="classContactList.length > 0 && !isParent" class="weui-cells no-margin-top thinner">
      <div v-for="(contactItem, idx) in classContactList" v-bind:key="idx" class="weui-cell">
        <div class="weui-cell__bd">
          <span>{{contactItem.username}}</span>
          <span class="user-badge" v-show="!!contactItem.role">{{ contactItem.role }}</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel:' + contactItem.mobile"><i class="icon icon-phone"></i></a>
        </div>
      </div>
    </div>

    <!-- for test -->
    <!-- <div class="weui-cells no-margin-top thinner">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <span>username</span>
          <span class="user-badge">role</span>
        </div>
        <div class="weui-cell__ft">
          <a v-bind:href="'tel: 13800138000'"><i class="icon icon-phone"></i></a>
        </div>
      </div>
    </div>
 -->
  </div>
</template>

<script>
  import Global from '@/components/Global'

  export default {
    name: 'ParentInfoList',
    data () {
      return {
        classCode: '',
        classContactDataIsReady: false,
        classContactList: []
      }
    },
    computed: {
    },
    created () {
      // 是家长
      this.isParent = (window.uls.get('userInfo', 'userType') === Global.userType.PARENT)

      // 更新tabbar参数
      this.$emit('eventPop_updateTabbar', {
        'navbarTitle': '班级通讯录',
        'backPath': '/user/userInfo'
      })

      // 初始化发布班级列表
      // 优先从uls中取得
      let classList = window.uls.get('personalData', 'classList')
      if (classList) {
        this._setClassCodeParam(classList)
      }
      // 如果没有，尝试api取得
      else {
        this.$axios.post('/banji/classes/getClassList').then(res => {
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
    },
    methods: {
      // 获取班级通讯录
      getClassContacts () {
        let postData = this.$qs.stringify({classCode: this.classCode})
        this.classContactDataIsReady = false
        this.classContactList = []

        // 判断是家长还是老师
        if (this.isParent) {
          console.log('>>> 获取班级通讯录 from 家长')

          return this.$axios.post('/banji/user/getClassTeacherInfo', postData).then(res => {
            console.log('getClassTeacherInfo>>>', res.data)
            this.classContactList = res.data.data
            this.classContactDataIsReady = true
            return Promise.resolve()
          }).catch(err => {
            window.weuiErr('获取班级通讯录失败:' + err)
            return Promise.reject(err)
          })
        }
        else {
          console.log('>>> 获取班级通讯录 from 教师')

          return this.$axios.post('/banji/user/getClassAddressBook', postData).then(res => {
            console.log('getClassAddressBook>>>', res.data)
            this.classContactList = res.data.data
            this.classContactDataIsReady = true
            return Promise.resolve()
          }).catch(err => {
            window.weuiErr('获取班级通讯录失败:' + err)
            return Promise.reject(err)
          })
        }
      },

      // 设置班级列表参数
      _setClassCodeParam: function (classList) {
        // 更新可选班级菜单数据
        let menuData = []
        classList.forEach(item => {
          menuData.push({
            label: item.classCode,
            onClick: () => {
              this.classCode = item.classCode
              this.getClassContacts()
            }
          })
        })
        this.classCodeMenu = menuData

        if (menuData.length != 0) {
          // 跟新菜单数据后，默认选中第一个
          this.classCode = menuData[0].label
          // 选中后获取当前班级联系信息
          this.getClassContacts()
        }
        else {
          this.classCodeMenu = [{
            'label': '-- 暂时无法查询 --',
            onClick: () => {
              weuiErr('暂时无法查询，请您尝试重新登录')
            }
          }]
          this.classCode = this.classCodeMenu[0].label
          this.classContactDataIsReady = true
        }
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
  /* .weui-cells__title {
    background: #eee;
  } */
  .mini-avatar {
    width: 45px;
    height: 45px;
    border-radius: 45px;
    margin-right: 10px;
  }
  .fake-avatar {
    width: 45px;
    height: 45px;
    margin-right: 10px;
  }
  .parent-cell + .parent-cell:before {
    left: 60px;
  }

  /* .weui-filters {
    display: flex;
    position: relative;
    z-index: 500;
    background-color: #FFFFFF;
    padding-top: env(safe-area-inset-top);
  }
  .weui-filter {
    position: relative;
    display: block;
    flex: 1;
    padding: 8px 0;
    text-align: center;
    font-size: 16px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  } */

  .weui-cells.thinner {
    width: calc(100% - 30px);
    margin-left: 15px;
    margin-right: 15px;
  }

  .user-badge {
    background: #039974;
    color: #fff;
    border-radius: 3px;
    font-weight: 100;
    font-size: 12px;
    display: inline-block;
    line-height: 17px;
    height: 17px;
    padding: 0 4px;
    text-align: center;
    vertical-align: top;
    margin-top: 2px;
    margin-left: 5px;
  }
</style>
