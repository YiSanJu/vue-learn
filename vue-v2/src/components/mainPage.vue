
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane label="vue Router" name="first"></el-tab-pane>
        <el-tab-pane label="vuex" name="second"></el-tab-pane>
        <el-tab-pane label="others" name="third"></el-tab-pane>
        <el-tab-pane label="404" name="fourth"></el-tab-pane>
    </el-tabs>
      <!-- <li><router-link to="/routerPage">路由</router-link></li>
      <li><router-link :to="{
        path:'/vuexPage',
        query:{
          id:1,
          name:'老张'
        }
      }">状态管理</router-link></li>
      <li><router-link to="/">主页</router-link></li>
      <li><router-link to="/44">404</router-link></li> -->

    <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js 2.0',
      activeName: 'third'
    }
  },
  methods: {
    handleClick (tab, event) {
      switch (tab.name) {
        case 'first':
          this.$router.push({ path: '/routerPage' })
          break
        case 'second':
          this.$router.push({path: '/vuexPage', query: {id: 1, name: 'jack'}})
          break
        case 'third':
          this.$router.push('/')
          break
        case 'fourth':
          this.$router.push('/404')
          break
        default:this.$router.push('/')
      }
      console.log(tab, event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
