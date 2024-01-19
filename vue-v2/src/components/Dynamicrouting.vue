<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>路由传值id： {{$route.params.id}}</h2>
      <h2>路由传值name：{{$route.params.name}}</h2>
      <h2>路由传值age：{{$route.params.age}}</h2>
    </div>
  </template>

<script>
export default {
  name: 'Dynamicrouting',
  data () {
    return {
      msg: '路由管理--动态路由'
    }
  },
  methods: {

  }
}
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

  </style>
