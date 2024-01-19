import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/components/mainPage'
import routerPage from '@/components/routerPage'
import vuexPage from '@/components/vuexPage'
import notFind from '@/components/notFind'
import Dynamicrouting from '@/components/Dynamicrouting'

Vue.use(Router)
// 定义路由规则

// 路由实例
// routes：一个必需的选项，用于定义路由表，即各个路由和对应的组件配置。这个参数是一个数组，每个元素表示一个路由对象，包含路径（path）和组件（component）等属性。

// mode：指定路由的模式，默认值是"hash"，表示使用带有"#“的URL哈希模式。另外还支持"history"模式，使用HTML5 History API来实现无”#"的URL。

// base：配置基路径，可以添加在路由的每个URL前面，用于处理部署在子目录的情况。

// linkActiveClass：配置激活路由链接时的CSS类名，默认值是"router-link-active"。可以修改它来自定义激活链接的样式。

// linkExactActiveClass：配置精确激活路由链接时的CSS类名，默认值是"router-link-exact-active"。可以修改它来自定义精确激活链接的样式。

// scrollBehavior：用于设置滚动行为，即在切换路由时页面滚动的行为。它可以是一个方法，接受to和from路由对象作为参数，返回一个滚动位置的对象。

// fallback：在使用history模式时，如果浏览器不支持HTML5 History API，是否回退到哈希模式。默认值是true，表示回退到哈希模式；若设置为false，页面无法访问时会出现404错误。

// parseQuery / stringifyQuery：这两个参数用于自定义查询字符串的解析和序列化函数，可以对URL中的查询参数进行自定义处理。

export default new Router({
  // d定义模式
  mode: 'hash',

  // 用于定义路由表匹配规则
  routes: [
    {
      path: '/',
      component: mainPage,
      children: [
        {
          path: 'routerPage',
          component: routerPage,
          children: [
            {
              path: 'Dynamicrouting/:id/:name/:age',
              component: Dynamicrouting
            }
          ]
        },
        {
          path: 'vuexPage',
          component: vuexPage
        }
      ]
    },
    // 匹配失败后的404，放在 路由规则数组 最后面，path 从上往下 匹配，如果前面没有匹配上的 path 就命中最后这个 *
    {
      path: '*',
      component: notFind
    }
  ]
})
