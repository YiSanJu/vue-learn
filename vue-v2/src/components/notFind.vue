
<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>404</h2>
    </div>
  </template>

<script>
export default {
  name: 'notFind',
  data () {
    return {
      msg: '路由匹配失败'
    }
  },
  methods: {

  }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
