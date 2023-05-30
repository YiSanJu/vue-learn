# VUE学习

## 特点

### 	声明式渲染

​		实现原理

```
声明式渲染是由前端框架实现的一种高级渲染模式。不同的框架可能有不同的实现方式，下面以 Vue 框架为例。

Vue 的声明式渲染主要是通过数据绑定和模板语法来实现的。数据绑定是指将数据对象和视图之间建立自动化的关联，当数据对象发生更新时，Vue 自动将视图更新。而模板语法则是一种基于 HTML 的模板语言，可以在模板中插入 JavaScript 表达式。

在 Vue 中，可以通过绑定指令来实现数据的双向绑定和渲染。比如，使用 v-model 来将表单元素和数据对象中的属性进行双向绑定。在模板中使用条件语句、循环语句和表达式等来声明渲染结果，同时也可以使用组件、过滤器和事件等来增强模板的功能。

Vue 会将模板编译成一个 JavaScript 渲染函数，它会生成 Virtual DOM，然后将 Virtual DOM 映射到实际的 DOM 上。当数据发生变化时，Vue 会重新生成 Virtual DOM，然后将新旧 Virtual DOM 进行比较，找出差异，最终只对差异进行更新，从而减少了 DOM 操作的次数。这种方式避免了直接操作 DOM 的性能问题，也实现了声明式渲染的特性。

总的来说，Vue 借助模板语言和数据绑定实现了声明式渲染，它的实现方式包括模板编译、Virtual DOM 和差异化更新等。通过把数据和视图之间的关联转化为数据绑定和模板语法，Vue 让组件的开发更加简单、高效，同时也提高了代码的可读性、可维护性和性能表现。
```

### 	响应式

​	实现原理

```
Vue的响应式实现原理基于ES5的Object.defineProperty()函数和getter/setter函数。它将Vue实例中的每一个数据属性都转化为getter/setter函数，并且在调用getter函数时，会自动收集依赖。所有依赖于该数据属性的地方都会被记录下来，例如模板、计算属性和watcher对象等。一旦这个数据属性被修改，就会自动触发setter函数，并且通知所有依赖于该数据属性的地方进行更新。这个过程是递归执行的，直到所有相关的依赖都被更新为止。

下面是一个简单的实例说明Vue中响应式的实现原理：

var data = { message: 'Hello, World!' };

Object.defineProperty(data, 'message', {
  get: function() {
    console.log('get message:', this._message);
    return this._message;
  },
  set: function(newValue) {
    console.log('set message:', newValue);
    this._message = newValue;
  }
});

data.message = 'Hello, Vue!'; // set message: 'Hello, Vue!'
console.log(data.message); // get message: 'Hello, Vue!'
在上面的代码中，我们通过Object.defineProperty()函数将data对象中的message属性转化为getter/setter函数。当我们对data.message进行赋值时，会自动触发set函数，并将新的值保存在this._message中；当我们取出data.message的值时，会自动触发get函数，并返回this._message的值。这就是Vue中响应式实现原理的基本框架。
```

 与v-bind差异

```
v-bind 和将属性定义到data里都可以实现响应式，但它们的实现原理略有不同。

v-bind 通过绑定数据到HTML元素的属性上来实现响应式。当数据发生变化时，HTML元素的属性就会自动更新。例如：

<img v-bind:src="imageUrl">
在这个例子中，src 属性绑定到对象中的 imageUrl 属性上。当 imageUrl 发生变化时，img 元素的 src 属性也会自动更新。

将数据定义到 data 属性中可以通过 Vue 实例来访问。在 Vue 实例初始化时，Vue 会使用 Object.defineProperty 将对象中的每个属性都变成响应式的。当数据发生变化时，会自动通知相关的视图进行更新。例如：

var data = {
  message: 'Hello, Vue!'
}

var app = new Vue({
  el: '#app',
  data: data
})

app.message = 'Hello, World!'
在这个例子中，message 定义在 data 对象中，并且通过 Vue 实例进行访问。当 message 发生变化时，与之相关的视图也会自动更新。

综上所述，无论是通过 v-bind 还是将数据属性定义到 data 对象中，都可以实现响应式。但是，在实际开发中，我们通常将数据属性定义到 data 对象中，因为它更符合 Vue 的设计思想，并且能够充分利用 Vue 响应式机制的优势。
```



### 	API风格

#### 		选项式与组合式

```
选项式（option API）：
	必须按照指定格式挂载数据，格式统一使用比较简单
	难支持类型script(TS)
组合式(composition API)：
	按需调用，使用相比option API较复杂
	支持TS
```

