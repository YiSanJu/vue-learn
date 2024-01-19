// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//  引入vue2
import Vue from 'vue'
import App from './App'

//  引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' //  element ui 样式文件单独使用

//  引入vue-router
import router from './router'
import store from './vuex/store'
// 国际化

// import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { zhLocale })
Vue.config.productionTip = false
let isLogin = true

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/routerPage' && !isLogin) {
    alert('非开发者,路由前置守卫拦截')
  } else {
    next()
  }
})
/* eslint-disable no-new */

// 挂载app元素并且传递所需要的对象值
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
