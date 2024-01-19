import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 数据存储
  state: {
    count: 0,
    num: 15,
    apple: 5,
    banana: 58
  },
  // 修改数据的同步方法
  mutations: {
    increment (state) {
      state.count++
    }
  },
  // 修改数据的异步方法
  actions: {
    /**
     *
     * @param {*} context 上下文默认传递的参数
     * @param {*} newName 自己传递的参数
     */
    // 定义一个异步的方法 context是 store
    changeNameAsync (context, newName) {
      // 这里用 setTimeout 模拟异步
      setTimeout(() => {
        // 在这里调用 mutations 中的处理方法
        context.commit('changeName', newName)
      }, 2000)
    }
  },
  modules: {}
})
export default store
