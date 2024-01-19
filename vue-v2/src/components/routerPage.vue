
<template>
    <div class="hello">
      <h1>{{ msg }}</h1>

        <el-button><router-link to="/routerPage/Dynamicrouting/01/jack/12">动态路由0</router-link></el-button>
        <el-button><router-link to="/routerPage/Dynamicrouting/02/mark/44">动态路由1</router-link></el-button>
        <el-button><router-link to="/routerPage/Dynamicrouting/03/marin/48">动态路由2</router-link></el-button>
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
  </template>

<script>
export default {
  name: 'routerPage',
  data () {
    return {
      msg: '路由管理'
    }
  },
  methods: {

  }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
