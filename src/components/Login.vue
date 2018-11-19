<template>
  <div class="ctn">
    <h1>Login Page</h1>

    <input type="text" name="username" v-model="username" />
    <input type="text" name="password" v-model="password" />
    {{ username }}
    {{ password }}

    <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="login">login</a>

    <a href="javascript:void(0);" class="weui-btn weui-btn_primary" v-on:click="goback">goback</a>
  </div>
</template>

<script>
import axios from 'axios'
console.log(axios)

export default {
  name: 'Login',
  data () {
    return {
      username: 'admin',
      password: '123'
    }
  },
  methods: {
    goback: function (event) {
      console.log(this.$router)
      this.$router.back()
    },
    login: function (event) {
      this.$store.commit('login', {
        username: this.username,
        password: this.password
      })

      console.log(this.$store)
      /*
      axios({
        method: 'post',
        url: 'api/login',
        dataType: 'json',
        params: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log('a1>>>', res)
      })

      axios({
        method: 'post',
        url: 'api/login',
        dataType: 'json',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log('a2>>>', res)
      })

      axios.post('api/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        console.log('a3>>>', res)
      })
      */
    }
  }
}
</script>

<style>
  .ctn {
    padding: 20px;
  }
</style>
