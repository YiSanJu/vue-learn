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

## 基础使用

### 挂载

​		挂载实例及数据对象（例如router）后，建立响应式

```javascript
//当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。

//挂载app元素并且传递所需要的对象值
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```

### 生命周期

​		![lifecycle](D:\edge下载目录\lifecycle.png)

### 模板语法

#### 	插值

​		文本插值

```javascript
//双括号
<span>Message: {{ msg }}</span>  //存在响应式

//原始html v-html
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

​		标签的属性

```javascript
//使用v-bind和数据绑定
<div v-bind:id="dynamicId"></div>
//对于布尔 attribute (它们只要存在就意味着值为 true)，v-bind 工作起来略有不同，在这个例子中：

<button v-bind:disabled="isButtonDisabled">Button</button>
//如果 isButtonDisabled 的值是 null、undefined 或 false，则 disabled attribute 甚至不会被包含在渲染出来的 <button> 元素中。
```

#### 	指令	

​	指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

```javascript
//指令 (Directives) 是带有 v- 前缀的特殊 attribute。指令 attribute 的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)
	v-if/v-else
    v-bind（缩写：）
		<!--
			注意，参数表达式的写法存在一些约束，如之后的“对动态参数表达			式的约束”章节所述。
			-->
		<a v-bind:[attributeName]="url"> ... </a>
        (attributeName为动态参数，例如此处可以为href，id，class等)
	v-on（缩写@）
```

####       修饰符

​			修饰符 (modifier) 是以半角句号 `.` 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

​	表单修饰符

```javascript
.lazy //在我们填完信息，光标离开标签的时候，才会将值赋予给value，也就是在change事件之后再进行信息同步
.trim //自动过滤用户输入的首空格字符，而中间的空格不会过滤
.number //限制输入数字或者输入的东西转换成数字，但是并不是那么好用。

```

​	事件修饰符

```javascript
.stop //阻止事件冒泡
.prevent //用于阻止事件的默认行为
.self //只当事件是从事件绑定的元素本身触发时才触发回调
.once //这个修饰符的用法也是和名字一样简单粗暴，只能用一次，绑定了事件以后只能触发一次，第二次就不会触发。
.capture  //使用捕获模式
```

​	鼠标按键修饰符

```javascript
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
    
    //为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
```

​	系统修饰符

```javascript
//可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

.ctrl
.alt
.shift
.meta

<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```



#### 侦听与计算

​	computed初衷用于解决模板内的表达式过于复杂；也可以替代watch去侦听

```javascript
//例如
<div id="example">
  {{ message.split('').reverse().join('') }}
</div>

//使用computed将表达式设置至vue实例的computed属性中
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
//计算属性 vs 方法

	计算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值。至于方法：每当触发重新渲染时，调用方法将总会再次执行函数。
    
//计算属性的setter
computed: {
  fullName: {
    // getter  当调用的时候触发的函数
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter  当赋值/值改变的时候出发的函数
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
    
```

​           虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的	

```javascript
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  })
  
  //使用场景：computed当一个属性受多个属性影响的时候；例如购物车商品结算；watch当一条数据影响多条数据的时候，例如搜索框


//区别
computed是计算属性，watch是监听一个值的变化而执行对应的回调。

computed函数所依赖的属性不变的时候会调用缓存；watch每次监听的值发生变化时候都会调用回调。

是否调用return：computed必须有；watch可以没有

使用场景：computed当一个属性受多个属性影响的时候；例如购物车商品结算；watch当一条数据影响多条数据的时候，例如搜索框

是否支持异步：computed函数不能有异步；watch可以


```

####     class与style绑定

​		操作元素的 class 列表和内联样式是数据绑定的一个常见需求。因为它们都是 attribute，所以我们可以用 `v-bind` 处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦且易错。因此，在将 `v-bind` 用于 `class` 和 `style` 时，**Vue.js 做了专门的增强。表达式结果的类型除了字符串之外，还可以是对象或数组。**

​	绑定html class

​		**对象语法**

```javascript
//表达式为单个对象
<div v-bind:class="{ active: isActive }"></div>

//表达式为多个对象
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

//我们也可以在这里绑定一个返回对象的计算属性。这是一个常用且强大的模式：

<div v-bind:class="classObject"></div>

data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}


```

​		**数组语法**

```javascript
<div v-bind:class="[activeClass, errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}

//三元表达式
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

//数组对象
<div v-bind:class="[{ active: isActive }, errorClass]"></div>


//这种语法用在组件上
//当在一个自定义组件上使用 class property 时，这些 class 将被添加到该组件的根元素上面。这个元素上已经存在的 class 不会被覆盖。

```

 	绑定内联样式

​		CSS property 名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名

```javascript

//常见用法
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}


//集合
<div v-bind:style="styleObject"></div>

data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}

//同样的有数组用法
<div v-bind:style="[baseStyles, overridingStyles]"></div>

//自动添加前缀
//当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS property 时，如 transform，Vue.js 会自动侦测并添加相应的前缀。

//多重值
//从 2.3.0 起你可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
--这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
```

#### 	条件渲染

​		**v-if/v-else/v-else-if**

```javascript
//使用template元素代替无用的div。下列写法渲染时将不包含template元素
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>

//v-else 元素必须紧跟在带 v-if 或者 v-else-if 的元素的后面，否则它将不会被识别。

<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>

```

​		Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。所以学会使用key管理可复用的元素,以下例子会有问题

```javascript
//问题：换 loginType 将不会清除用户已经输入的内容。因为两个模板使用了相同的元素，<input> 不会被替换掉——仅仅是替换了它的 placeholder。
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>

//这样也不总是符合实际需求，所以 Vue 为你提供了一种方式来表达“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key attribute 即可
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>


//不推荐同时使用 v-if 和 v-for。请查阅风格指南以获取更多信息。当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级
```

​       **v-show**

​		另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样

```javascript
<h1 v-show="ok">Hello!</h1>
//不同的是带有 v-show 的元素始终会被渲染并保留在 DOM 中。v-show 只是简单地切换元素的 CSS property display
//注意，v-show 不支持 <template> 元素，也不支持 v-else。
```

#### 	列表渲染

​		**v-for**

```javascript
//我们可以用 v-for 指令基于一个数组来渲染一个列表。v-for 指令需要使用 item in items 形式的特殊语法，其中 items 是源数据数组，而 item 则是被迭代的数组元素的别名。
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>

var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})

//用 v-for 来遍历一个对象的 property。

<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul

new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```

​             **维护状态（就地更新）**

```javascript
//当 Vue 正在更新使用 v-for 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个类似 Vue 1.x 的 track-by="$index"。

//这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。

//为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key attribute

<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>

//不要使用对象或数组之类的非基本类型值作为 v-for 的 key。请用字符串或数值类型的值
```

​         **数组替换方法**

**变更方法**：Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括

```
- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`
```

**替换方法**：例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而**总是返回一个新数组**。当使用非变更方法时，可以用新数组替换旧数组

### 事件处理

#### 	v-on监听DOM事件

```javascript
//有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法：

<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}

```

#### 	事件修饰符

​		在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

```javascript
1.event.preventDefault()
preventDefault() 方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）

2.event.stopPropagation()
event.stopPropagation() 方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行。尤其是点击事件。

//DOM事件流分为三个阶段

1、捕获阶段：从最外面不具体的元素，到最具体的元素。document - html - body - box1 - box2 - box3

2、处于目标阶段

3、冒泡阶段：从最里面具体的元素，到最外面不具体的元素。box3 - box2 - box1 - body - html - document

当经过某个元素时，同时这个元素上面也绑定着事件，哪这个事件就会被触发

如果要捕获，就必须addEventListener绑定，而冒泡是默认存在的，即"元素.事件"和"attacheEvent"这种绑定都只有冒泡
```

```javascript
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

### 表单输入绑定

​	用 `v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

```javascript
//text 和 textarea 元素使用 value property 和 input 事件；
//checkbox 和 radio 使用 checked property 和 change 事件；
//select 字段将 value 作为 prop 并将 change 作为事件。
```

```javascript
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>

//
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})

//值的绑定和value有关

<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

## 深入使用

### 	组件

#### 	介绍

​	组件是可复用的 Vue 实例

```javascript
//因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。


//组件的data必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

//组件必须只有单个根元素
<h3>{{ title }}</h3>
<div v-html="content"></div>
//Vue 会显示一个错误，并解释道 every component must have a single root element (每个组件必须只有一个根元素)。你可以将模板的内容包裹在一个父元素内，来修复这个问题
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```

#### 	组件的注册

​		全局注册

```javascript
//全局注册,也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中
Vue.component('my-component-name', {
  // ... options ...
})
```

​		局部注册

```javascript
//全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

//局部注册的组件在其子组件中不可用
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})

//如果你希望 ComponentA 在 ComponentB 中可用，则你需要这样写：
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

#### 模板系统

​	使用了诸如 Babel 和 webpack 的模块系统。在这些情况下，我们推荐创建一个 `components` 目录，并将每个组件放置在其各自的文件中。

##### 在模板系统中局部注册

```javascript
//然后你需要在局部注册之前导入每个你想使用的组件。例如，在一个假设的 `ComponentB.js` 或 `ComponentB.vue` 文件中：

import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}

```

##### 基础组件的自动化全局注册

```javascript
//使用 require.context 只全局注册这些非常通用的基础组件
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

```



#### 	组件的相互传值

##### 父传子	

###### prop

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

```javascript
//父传子
	props
//数组形式
    props: ['title', 'likes', 'isPublished', 'commentIds', 'author']

//对象形式
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other 	constructor
}

//例子-----camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})

<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-pos
//静态

<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

//动态
<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>

//传入一个对象的所有property
//可以使用不带参数的 v-bind (取代 v-bind:prop-name)。例如，对于一个给定的对象 post：
   
post: {
  id: 1,
  title: 'My Journey with Vue'
}

<blog-post v-bind="post"></blog-post>

```

###### prop验证

```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  }
})
```

​	非prop的attribute

```javascript
//一个非 prop 的 attribute 是指传向一个组件，但是该组件并没有相应 prop 定义的 attribute。

//例如，想象一下你通过一个 Bootstrap 插件使用了一个第三方的 <bootstrap-date-input> 组件，这个插件需要在其 <input> 上用到一个 data-date-picker attribute。我们可以将这个 attribute 添加到你的组件实例上

<bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>

然后这个 data-date-picker="activated" attribute 就会自动添加到 <bootstrap-date-input> 的根元素上
```

##### 	子传父

###### 	emit

```javascript
//事件名
//不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称

//自定义组件的v-model
//一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。model 选项可以用来避免这样的冲突

<base-checkbox v-model="lovingVue"></base-checkbox>

Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})

//将原生事件绑定到组件

//你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 v-on 的 .native 修饰符

<base-input v-on:focus.native="onFocus"></base-input>

//.sync修饰符


```



#### 	插槽

​	将组件部分内容由使用者去自定义

```
Vue 实现了一套内容分发的 API，这套 API 的设计灵感源自 ，将 `<slot>` 元素作为承载分发内容的出口。
```

##### 	默认插槽

```javascript
//没有具体名字的插槽，如果没有提供插槽内容，则使用默认的内容，反之，使用具体内容
```

##### 	具名插槽

​		有时候我们需要使用多个插槽,使用v-slot:name定义，name=“name”填充

```javascript
//组件base-layout
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>


<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>


//缩写

<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>

//注意 v-slot 只能添加在 <template> 上 (只有一种例外情况)，这一点和已经废弃的 slot attribute 不同。
```

##### 	作用域插槽

​		有时让插槽内容能够访问子组件中才有的数据是很有用的

```javascript
//组件current-user

//绑定在 <slot> 元素上的 attribute 被称为插槽 prop。
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>


<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>

//实例

//todo-list组件
<ul>
  <li
    v-for="todo in filteredTodos"
    v-bind:key="todo.id"
  >
    <!--
    我们为每个 todo 准备了一个插槽，
    将 `todo` 对象作为一个插槽的 prop 传入。
    -->
    <slot name="todo" v-bind:todo="todo">
      <!-- 后备内容 -->
      {{ todo.text }}
    </slot>
  </li>
</ul>

//使用组件
<todo-list v-bind:todos="todos">
  <template v-slot:todo="{ todo }">
    <span v-if="todo.isComplete">✓</span>
    {{ todo.text }}
  </template>
</todo-list>
```

#### 	动态组件

​		使用 `is` attribute 来切换不同的组件

```
<component v-bind:is="currentTabComponent"></component>
```

​		keep-alive缓存	

```javascript
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

#### 	边界处理

```
$root	//访问根元素实例
$parent  //访问父组件实例
添加ref属性  //this.$refs.usernameInput访问子组件实例
依赖注入project和inject  //可以让我们在任意后代组件中访问 getMap

实际上，你可以把依赖注入看作一部分“大范围有效的 prop”，除了：
祖先组件不需要知道哪些后代组件使用它提供的 property
后代组件不需要知道被注入的 property 来自哪里
```

## 常见问题

#### 	一、谈一谈对 *MVVM* 的理解？

​	**前身MVC**

​		Model ：管理数据

​		View ：UI布局，展示数据

　　	Controller ：响应用户操作，并将 Model 更新到 View 上

​	**痛点**

​		Controller层频繁的操作DOM，处理繁琐；大量的DOM 操作使页面渲染性能降低（例如jq）

​	**MVVM**

​		Model：数据模型，定义数据修改和操作的业务逻辑

​		View ：代表UI 组件

​		ViewModel ：通过双向数据绑定把 View 层和 Model 层连接了起来（自动化）

#### 	二、VUE原理：响应式和数据绑定？

​		**响应式编程**

​			是指 Vue 会自动对页面中某些数据的变化做出响应

```
响应式基于双向数据绑定  M<=====>V
	实现  M=====>V 是通过监听Object.defineProperty的setter和getter实现的
	实现  V=====>M是通过vue的事件绑定，触发相应函数，然后同步数据
	
	Vue3.x 放弃了 Object.defineProperty ，使用 ES6 原生的 Proxy，来解决以前使用 Object.defineProperty 所存在的一些问题。
	

虽然 Object.defineProperty 在之前的 Vue 版本中被用于实现响应式系统，但它也存在一些问题，这些问题在 Vue 3 中通过使用 Proxy 得到了解决。

新增属性的监听问题：Object.defineProperty 只能监听已经存在的属性，无法监听动态新增的属性。而 Proxy 可以拦截整个对象，包括属性的动态新增和删除。

数组变化的监听问题：Object.defineProperty 无法直接监听数组的变化操作，比如 push、pop、splice 等。数组的变化需要通过特殊的方法来进行处理。而 Proxy 可以直接拦截数组的变化操作，提供了更直观和便捷的数组操作监听。

性能问题：由于 Object.defineProperty 需要遍历对象的属性，并通过 defineProperty 方法进行劫持，因此当对象属性较多时，劫持的性能会受到影响。而 Proxy 的性能更好，因为 Proxy 是在整个对象上进行劫持。

深度嵌套对象问题：Object.defineProperty 只能对对象的一级属性进行劫持，无法对深度嵌套的对象进行劫持。而 Proxy 可以递归地劫持整个对象及其嵌套属性。

总之，虽然 Object.defineProperty 在之前的 Vue 版本实现了响应式系统，但 Proxy 在一些方面具有更好的优势，更适合用于实现 Vue 3 的响应式机制，解决了 Object.defineProperty 存在的一些问题。这些问题包括对新增属性的监听、数组变化的监听、性能问题和深度嵌套对象的问题。
	
```

​		**数据绑定**

​			Vue 通过组件，把一个单页应用中的各种模块拆分到一个一个单独的组件（component）中，通过引入这些组件拼接成一个完整的页面，便于协同开发

​		**虚拟DOM**

​			DOM预处理，通过比较虚拟dom和实际dom来更新dom

#### 三、通信方式

​	父传子：props

```javascript
//父组件
<el-button type="warning">按钮</el-button>
//子组件
props: {
  type: {
    type: String,
    default: 'default'
  },
  size: String,
  icon: {
    type: String,
    default: ''
  },
  nativeType: {
    type: String,
    default: 'button'
  },
  loading: Boolean,
  disabled: Boolean,
  plain: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean
},
```

​	子传父：$emit自定义事件

```javascript
//父组件
<template>
  <div class="section">
    <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
    <p>{{currentIndex}}</p>
  </div>
</template>

<script>
import comArticle from './test/article.vue'
export default {
  name: 'HelloWorld',
  components: { comArticle },
  data() {
    return {
      currentIndex: -1,
      articleList: ['红楼梦', '西游记', '三国演义']
    }
  },
  methods: {
    onEmitIndex(idx) {
      this.currentIndex = idx
    }
  }
}
</script>

	
//子组件
methods: {
	emitIndex(index) {
		this.$emit('onEmitIndex',index)
	}
}


//子组件触发emitIndex后，将index值传递给父组件，触发父组件的相应绑定方法
```

$children / $parent/ref：通过$children/this.$parent来访问子组件/父组件实例对象，通过实例对象来访问对应的值; 通过给组件添加ref标记后，使用this.$ref来后去该组件实例

$attrs和$listeners；用于在父组件向子组件传递非props属性和监听器。

```javascript
//父组件

//$attrs: 它是一个对象，包含了父组件中传递给子组件的所有非props属性。父组件中的数据绑定，除了props之外的所有属性（包括class和style等），都会被自动添加到子组件的$attrs中。子组件可以通过$attrs访问这些属性。
<template>
  <div>
    <child-component v-bind="$attrs"></child-component>
  </div>
</template>

//子组件

//$listeners: 它也是一个对象，包含了父组件中传递给子组件的所有事件监听器。父组件中通过v-on绑定的事件监听器会自动添加到子组件的$listeners中。子组件可以通过$listeners获取这些监听器。
<template>
  <div>
    <child-component v-on="$listeners"></child-component>
  </div>
</template>
```

跨组件：状态管理，所有组件都可以访问和修改其中的数据，例如Vuex

祖先后代传值：**Provide / Inject (依赖注入)**父组件可以使用 `provide` 选项提供数据，并在其包裹的子组件中使用 `inject` 选项注入数据。

```javascript
//A中provide一个数据后，A的后续所有子组件都能通过inject获得数据

// A.vue

<template>
  <div>
	<comB></comB>
  </div>
</template>

<script>
  import comB from '../components/test/comB.vue'
  export default {
    name: "A",
    provide: {
      for: "demo"
    },
    components:{
      comB
    }
  }
</script>

// B.vue

<template>
  <div>
    {{demo}}
    <comC></comC>
  </div>
</template>

<script>
  import comC from '../components/test/comC.vue'
  export default {
    name: "B",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    components: {
      comC
    }
  }
</script>

// C.vue
<template>
  <div>
    {{demo}}
  </div>
</template>

<script>
  export default {
    name: "C",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>

```

​	任何组件间的传值：eventBus（事件总线）

> vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件。

```javascript
// ComponentA.vue

import eventBus from './EventBus';

// 发送事件
eventBus.$emit('custom-event', data);


// ComponentB.vue

import eventBus from './EventBus';

// 接收事件

eventBus.$on('custom-event', (data) => {
  // 处理接收到的数据
});

//移除事件
import { eventBus } from 'event-bus.js'
EventBus.$off('addition', {})

//一般可以将其注册到vue实例的原型对象上，避免总是使用import引入
```



#### 四、路由实现方式 vue router

##### 	基础

```javascript
import Router from 'vue-router'
//Router实际上是一个类，有配置参数routes、mode等

//注册Router
//一旦注册了路由插件Router，会给Vue提供两个全局组件和两个全局对象
//全局组件：RouterLink（跳转路由） 和 RouterView（匹配规则后显示组件）；
//全局对象：$router 和 $route；
Vue.use(Router)

router = new Router({
  // 定义模式
  mode: 'history',

  // 用于定义路由表匹配规则
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: mainPage,
      children: [
        {
          path: 'routerPage',
          component: routerPage
        },
        {
          path: 'vuexPage',
          component: vuexPage
        }
      ]
    }
  ]
})


// 将路由实例挂载在vue实例上使用
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

##### 	传值方式

```javascript
//二种传值方式
//字符串拼接-----直接拼接  
//对象定义---使用query属性
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li><router-link to="/routerPage?id=0&name='老王'">路由</router-link></li>
      <li><router-link :to="{
        path:'/vuexPage',
        query:{
          id:1,
          name:'老张'
        }
      }">状态管理</router-link></li>
      <li><router-link to="/">主页</router-link></li>
    </ul>
    <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js 2.0'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

// 使用this.$route.query得到路由信息


```

##### 	高阶

###### 		静态/动态路由

​		静态路由的路径是固定的，而动态路由的路径中可以包含占位符，允许匹配动态生成的部分

- 静态路由的路径是固定的，而动态路由的路径中可以包含占位符，允许匹配动态生成的部分。

- 静态路由的路径配置需要明确指定，而动态路由可以根据参数或动态变量来匹配路由。

- 静态路由适用于一组已知的固定页面，而动态路由适用于需要根据不同参数或条件动态加载组件的场景。

  **注意**：

  - 动态路由 不能通过 path + params 配合，因为path会忽略params ；这里的path指的是，RouterLink的to属性的属性值中不能出现path；
  - 正确方式：**`name(需要给对应的路由取名，也叫命名路由) + params`**；
  - 虽然写的是对象，但是最终会转为字符串；

  ```javascript
  //路由配置
   path: 'Dynamicrouting/:id/:name/:age',
   component: Dynamicrouting
  //传值
  <template>
      <div class="hello">
        <h1>{{ msg }}</h1>
        <ul>
          <li><router-link to="/routerPage/Dynamicrouting/01/jack/12">动态路由0</router-link></li>
          <li><router-link to="/routerPage/Dynamicrouting/02/mark/44">动态路由1</router-link></li>
          <li><router-link to="/routerPage/Dynamicrouting/03/marin/48">动态路由2</router-link></li>
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </ul>
      </div>
    </template>
  
  //接值
  
  <template>
      <div class="hello">
        <h1>{{ msg }}</h1>
        <h2>{{$route.params.id}}</h2>
        <h2>{{$route.params.name}}</h2>
        <h2>{{$route.params.age}}</h2>
      </div>
    </template>
  ```

###### 		编程式导航

​			不使用router-link标签跳转，直接使用this.$router提供的API实现；例如 this.$router.**push**('/path')

- `$route`和`$router`区别：
  - `$route`：获取路由参数**，表示 **当前 激活的 路由对象，获取当前路由信息，例如this.$route.meta；
  - `$router`：实现路由跳转**，**`$router.push()`实现跳转；

###### 		路由嵌套

​		二级路由如何配置：

- 创建需要的二级路由组件；

- 在路由规则数组里面对应的对象里面新增 `children` 属性（**属性值 = 数组对象**），在里面配置二级路由规则对象（`path + component`）；

- 对应第一季页面设置给出口，显示二级路由页面；

  ```javascript
  export default new Router({
    // 定义模式
    mode: 'history',
  
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
  ```

  

###### 	路由导航守卫

- 全局前置守卫(router.beforeEach)：

  ```javascript
  //router.beforeEach 注册全局前置守卫函数，该函数会在路由导航触发之前被调用。可以通过该守卫进行用户身份验证、路由权限验证等操作。
  
  router.beforeEach((to, from, next) => {
    // 用户身份验证逻辑
    if (to.meta.requiresAuth && !isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  });
  
  ```

  

- 全局后置守卫

```javascript
//用于在导航被确认之后执行一些逻辑操作。它会在每次路由导航完成后被触发

router.afterEach((to, from) => {
  // 导航完成后的逻辑操作
  console.log(`Navigated from ${from.path} to ${to.path}`);
});
```



- 全局解析守卫		

```javascript
//使用 router.beforeResolve 注册全局解析守卫函数，该函数会在导航被确认之前被调用，同时在所有组件内守卫和异步路由组件被解析之后执行。

router.beforeResolve((to, from, next) => {
  // 在导航被确认之前执行的逻辑
  next();
});
```



- 路由独享守卫；
- 组件内的守卫：

###### 	路由元信息

​		获取路由参数**，表示 **当前 激活的 路由对象，描述当前路由信息，this.$route.meta

#### 五、状态管理vuex

​	所有组件实例的全局变量存储库，有以下二个特点

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

​	

```javascript
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

//挂载在vue实例下即可使用
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

##### 	存储/读取变量

```javascript
state: {
   name: '张三',
   age: 21,
}

//组件中使用this.$store.state.name读取

<h1>vuex直接读取值：{{$store.state.count}}</h1>

//如果过多的话使用mapState,直接挂载在实例的计算属性中
import { mapState } from 'vuex'
 computed: {
    ...mapState(['apple', 'banana'])
  },
```

##### 	修改变量的同步方法

```javascript
 // 修改数据的同步方法
  mutations: {
    increment (state) {
      state.count++
    }
  },
      
 //使用commit调用
this.$store.commit('increment')

//或者使用mapMutations
methods: {
	// 将 mutations 中的 changeName 方法映射到 methods 中，就能直接使用了 changeName 了
    ...mapMutations(['increment'])
  },
```

##### 	修改变量的异步方法

​		`Action` 同样也是用来处理任务，不过它处理的是异步任务，异步任务必须要使用 `Action`，通过 `Action` 触发 `Mutation` 间接改变状态，不能直接使用 `Mutation` 直接对异步任务进行修改

​		使用`this.$store.dispatch()`调用，或者`mapActions`

##### 	Getter

​		`Getter` 类似于计算属性，但是我们的数据来源是 `Vuex` 中的 `state` ,所以就使用 `Vuex` 中的 `Getter` 来完成，应用场景就是需要对 `state` 做一些包装简单性处理 展示到视图当中

```javascript
export default new Vuex.Store({
  state: {
    name: '张三',
    age: 21,
  },
  getters: {
    // 在这里对 状态 进行包装
    /**
     *
     * @param {*} state 状态 如果要使用 state 里面的数据，第一个参数默认就是 state ，名字随便取
     * @returns
     */
    decorationName(state) {
      return `大家好我的名字叫${state.name}今年${state.age}岁`
    },
  },
})


```

​	使用`this.$store.getters[名称]`或者`mapGetters`读取

##### 	Module

​		为了避免在一个复杂的项目 `state` 中的数据变得臃肿，`Vuex` 允许将 `Store` 分成不同的模块，每个模块都有属于自己的 `state`，`getter`，`action`，`mutation`

```javascript
/* animal.js */

const state = {
  animalName: '狮子',
}
const mutations = {
  setName(state, newName) {
    state.animalName = newName
  },
}

//导出
export default {
  state,
  mutations,
}

/* src/store/index.js */

// 导入 Vue
import Vue from 'vue'
// 导入 Vuex 插件
import Vuex from 'vuex'
// 引入模块
import animal from './animal'

// 把 Vuex 注册到Vue 上
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    animal,
  },
})


//使用this.$store.state.animal.animalName调用

```



#### 	六、生命周期

​		对于 vue 来讲，生命周期就是一个 vue 实例从创建到销毁的过程

​		vue2:（before） created、（before） mounted---dom挂载、before （updated）、（before） destoryed

- **多组件（父子组件）中生命周期的调用顺序说一下**（栈调用）

组件的调用顺序都是先父后子，渲染完成的顺序是先子后父。组件的销毁操作是先父后子，销毁完成的顺序是先子后父。

#### 	七、组件化和插槽

#### 	八、vue2.0与vue3.0区别

​	九、nexttick与keep-alive

**nextTick**

作用：vue 更新 DOM 是异步更新的，数据变化，DOM 的更新不会马上完成，nextTick 的回调是在下次 DOM 更新循环结束之后执行的延迟回调。

实现原理：nextTick 主要使用了宏任务和微任务。根据执行环境分别尝试采用

- Promise：可以将函数延迟到当前函数调用栈最末端
- MutationObserver ：是 H5 新加的一个功能，其功能是监听 DOM 节点的变动，在所有 DOM 变动完成后，执行回调函数
- setImmediate：用于中断长时间运行的操作，并在浏览器完成其他操作（如事件和显示更新）后立即运行回调函数
- 如果以上都不行则采用 setTimeout 把函数延迟到 DOM 更新之后再使用，原因是宏任务消耗大于微任务，优先使用微任务，最后使用消耗最大的宏任务。

​	
