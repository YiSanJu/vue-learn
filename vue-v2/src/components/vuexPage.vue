
<template>
    <div class="hello">
      <h1>主题： {{ msg }}</h1>
      <h1>vuex直接读取值：{{$store.state.count}}</h1>
      <h1>vuex通过mapstate取值：{{banana}}</h1>
      <h1>vuex通过mapstate取值：{{apple}}</h1>
      <h2>路由通过对象传值（query）：{{$route.query.id}}</h2>
      <h2>路由通过对象传值（query）：{{$route.query.name}}</h2>
      <button @click="count">增加count</button>
    </div>
  </template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'vuexPage',
  data () {
    return {
      msg: '状态管理'
    }
  },
  computed: {
    ...mapState(['apple', 'banana'])
  },
  methods: {
    count () {
      this.$store.commit('increment')
    }
  }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
