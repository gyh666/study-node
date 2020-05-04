# Javascript基础知识面试知识点

![js.jpg](https://cdn.nlark.com/yuque/0/2020/jpeg/225870/1584376445551-92c1425f-1fb1-45b8-8231-244d52b26fdf.jpeg#align=left&display=inline&height=284&name=js.jpg&originHeight=433&originWidth=651&size=24409&status=done&style=none&width=427)

<a name="MFnge"></a>
## [变量类型和计算](https://blog.csdn.net/qq_34115899/article/details/104094960)
<a name="PmGk9"></a>
### 1. 值类型和引用类型
<a name="mgDLd"></a>
#### （1）值类型
**undefined、string、number、boolean、symbol**
```javascript
  let a = 100;
  let b = a;
  a = 200;
  console.log(b); // 100
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368283546-db1ec16f-6ad2-4a0a-bd44-9b52629b8f02.png#align=left&display=inline&height=74&name=image.png&originHeight=148&originWidth=944&size=45655&status=done&style=none&width=472)
<a name="hcpVC"></a>
#### （2）引用类型
**object、array、null、function**<br />`null：特俗引用类型，指针指向为空地址`<br />`function：特殊引用类型，但不用于存储数据，所以没有“拷贝、复制函数”这一说`
```javascript
  let a = { age: 20 };
  let b = a;
  b.age = 21;
  console.log(a.age); // 21
```

![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368268603-bdd14928-417d-492b-9250-a4a07f560c49.png#align=left&display=inline&height=154&name=image.png&originHeight=307&originWidth=937&size=111987&status=done&style=none&width=468.5)
<a name="ed8186f8"></a>
### 2. typeof 运算符

- 识别所有值类型
- 识别函数
- 判断是否是引用类型（不可再细分）

![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368221216-78d135a7-3a81-4b37-bea3-91bad6ca79d5.png#align=left&display=inline&height=147&name=image.png&originHeight=295&originWidth=935&size=168149&status=done&style=none&width=465)<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368234688-f228bfeb-49c1-459c-b2d5-73ba93bbbfb2.png#align=left&display=inline&height=235&name=image.png&originHeight=469&originWidth=930&size=269722&status=done&style=none&width=465)<br />*** typeof console是"object"，typeof console.log是"function"**
<a name="510a44e6"></a>
### 3. 深拷贝和浅拷贝
<a name="TTzhW"></a>
#### （1）浅拷贝
浅拷贝：操作同一个内存地址
```javascript
const obj1 = {
    age: 20,
    name: 'xxx',
    address: {
        city: 'Beijing'
    },
    arr: ['a', 'b', 'c']
};
 
const obj2 = obj1;
obj2.address.city = 'Shanghai';
console.log(obj1.address.city)	// Shanghai
```

<a name="eSJfT"></a>
#### （2）深拷贝
深拷贝：改变拷贝对象，不会改变原对象。

- 判断值类型和引用类型
- 判断是数组还是对象
- 递归（核心）
```javascript
  const obj = {
    age: 20,
    name: "xxx",
    address: {
      city: "Beijing"
    },
    arr: ["a", "b", "c"]
  };
  const objCopy = deepClone(obj); // 深拷贝
  objCopy.address.city = "Shanghai";
  console.log(obj.address.city);

  /**
   * 深拷贝
   *  @param {Obejct} obj 要拷贝的对象
   */
  function deepClone(obj = {}) {
    if (typeof obj !== 'object' || obj == null) return obj;
    let result = obj instanceof Array ? [] : {};
    // 遍历复制
    for (const key in obj) {
      // 保证 key 不是原型的属性
      if (obj.hasOwnProperty(key)) {
        // 递归调用！！！
        result[key] = deepClone(obj[key]);
      }
    }
    // 返回结果
    return result;
  }
```
<a name="oEAVD"></a>
### 变量计算
<a name="l2kAx"></a>
#### 字符串拼接
```javascript
  const a = 100 + 10;     // 110
  const b = 100 + '10';   // '10010'
  const c = true + '10';  // 'true10'
```

<a name="hj3PP"></a>
#### == 运算符
`==会进行类型转换，产生一些意想不到的结果。除了 null(==) 之外，其他都一律用 ===`
```javascript
100 == '100' // true
0 == ''      // true
0 == false   // true
false = ''   // true
null == undefined // true
------------------------------------------
const obj = { x: 100 };
if (obj.a == null) {// 相当于 if (obj.a === null || obj.a === undefined)
  ...
}
```

<a name="LpIoV"></a>
#### if 语句和逻辑运算符

1. **if 语句**

 * if语句里面判断的是truely变量和falsely变量，并不一定非得是true和false，数字、字符串、null、undefined都可以作为if的条件语句


```javascript
  if (truth) {
    ...
  }
```
  - truth 变量：!!a === true 的变量
  - falsely 变量： !!a === false 的变量

!!a意思就是a代表的值转化成布尔值应该是true还是false（两步非运算）
```javascript
  // 以下是 falsely 变量，除此之外都是 truth 变量
  !!0 === false
  !!NaN === false
  !!'' === false
  !!undefined === false
  !!false === false
```

2. **逻辑判断
**<br />`&&（与）、||（或）、!（非）`
2. ```javascript
  console.log(10 && 0)      // 0
  console.log('' || 'abc')  // 'abc'
  console.log(!window.abc)  // true
```



---


<a name="Ng9mY"></a>
## 原型和原型链
<a name="WFNts"></a>
### 1. class和继承
<a name="DViAO"></a>
#### class
```javascript
class Student {
  constructor(name, number) {
    this.name = name;
    this.number = number;
  }
  sayHi() {
    console.log(`姓名 ${this.name}，学号 ${this.number}`);
  }
}
// 通过类 new 对象/实例
let xialuo = new Student("夏洛", 10010);
console.log(xialuo.name);		// 夏洛
xialuo.sayHi();		// 夏洛，10010
```
<a name="vJdCE"></a>
#### 继承

- extends 继承父类
- super 执行父类的构造函数
- 扩展或重写方法
```javascript
// 父类
class People {
  // 构造器
  constructor(name, number) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} eat something`);
  }
}
// 子类
class Student extends People {
  constructor(name, number) {
    // 执行父类的实例
    super(name);
    this.number = number;
  }
  sayHi() {
    console.log(`${this.name}的学号是：${this.number}`);
  }
}
// 子类
class Teacher extends People {
  constructor(name, major) {
    super(name);
    this.major = major;
  }
  teach() {
    console.log(`${this.name}教${this.major}课`);
  }
}
// 实例
const xialuo = new Student('夏洛', 100);
console.log(xialuo.name);		// '夏洛'
xialuo.sayHi();		// '夏洛的学号是100'
xialuo.eat();		// '夏洛 eat something'

const wanglaoshi = new Teacher('王老师', '语文');
console.log(wanglaoshi.name);		// '王老师'
wanglaoshi.teach();		// '王老师教语文'
```
<a name="WmRfL"></a>
### 2. 类型判断 instanceof
<a name="2wZCO"></a>
### ![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368199170-cec0a78a-49af-4972-a10f-b9f35671709e.png#align=left&display=inline&height=226&name=image.png&originHeight=452&originWidth=933&size=248309&status=done&style=none&width=466.5)
*** 刚刚在 Student 中定义的方法 sayHi()，结果在Student的原型 Student.prototype 中**<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368186233-a965c034-9268-4d89-9aa2-101840722544.png#align=left&display=inline&height=236&name=image.png&originHeight=471&originWidth=779&size=103580&status=done&style=none&width=389.5)
<a name="20Raa"></a>
### 3. 原型
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368156953-bacbebea-792b-4bd0-b797-6c546d8e400f.png#align=left&display=inline&height=175&name=image.png&originHeight=350&originWidth=933&size=207634&status=done&style=none&width=466.5)

**Student.prototype 和 xialuo._ **_**proto_ **_**的关系如下：**在 Student 中定义的方法 sayHi()，结果在 Student 的原型 Student.prototype 中，所以可以说明在 class 中定义的方法是在这个 class 的 prototype 显示原型中的，是所有实例共同拥有的。<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368143686-3171b286-27f1-4dc8-9273-b5ca1aaf7074.png#align=left&display=inline&height=188&name=image.png&originHeight=375&originWidth=954&size=90798&status=done&style=none&width=477)<br />**<br />**原型关系：**

- 每个 class 都有显式原型 prototype
- 每个实例都有隐式原型__ _proto__ _
- 实例的 __ _proto__ _指向对应 class 的 prototype

**<br />**基于原型的执行规则：**<br />  获取属性或者执行方法时，先在自身属性和方法寻找，如果找不到自动去 ___proto___ 中查找

<a name="2RqW5"></a>
### 4. 原型链
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368112785-58e652a4-d93a-48f4-a761-99ec6e31d8aa.png#align=left&display=inline&height=54&name=image.png&originHeight=107&originWidth=934&size=82301&status=done&style=none&width=467)
<a name="v0zV7"></a>
### ![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368095789-2711d20e-1d96-43c2-95b2-fedea68751b1.png#align=left&display=inline&height=230&name=image.png&originHeight=460&originWidth=930&size=101660&status=done&style=none&width=465)
xialuo 是 new Student() 出来的，是一个 Student 对象，xialuo.___proto___ 等于 Student.prototype。这 里People.prototype 和 Student.prototype.___proto___是相等的，也可以认为 Student.prototype 是 new 出来的  People 对象，People.prototype.___proto__ _和 Object.prototype 是相等的，那么可以认为 People.prototype 是 new 出来的 Object 对象<br />

> **Student.prototype instanceof People **为true
> **People.prototype instanceof Object** 也为true


这个关系真的好奇妙：我是你new出来的，我的隐式__pro__等于你的显式prototype；反过来也是，我的隐式__pro__等于你的显式prototype，那么我就是你new出来的对象

<a name="rAzyk"></a>
### 练习题
<a name="mtsxK"></a>
#### （1）如何准确判断一个变量是不是数组？

- arr instanceof Array
- Array.isArray(arr)
- Object.prototype.toString.call(arr)         // 如果值时 [object Array] 则说明是数组
- arr.constructor === Array
<a name="qfy1F"></a>
#### （2）class方法的本质？
  在 class Student 中定义的方法 sayHi() ，结果在 Student 的原型 Student.prototype 中，所以可以说明在 class 中定义的方法是在这个 class 的 prototype 中的，这样才能实现 new 出来的实例都有这个方法。获取属性或执行方法时，先在自身属性和方法寻找，如果找不到则自动去 ___proto___ 中查找。
<a name="f8Csv"></a>
#### （3）手写简易jQuery考虑插件和扩展性
```javascript
class jQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);  // 返回 NodeList
    const length = result.length;
    for (let i = 0; i < length; i++) {
      this[i] = result[i];
    }
    this.length = length;
    this.selector = selector;
  }
  get(index) {
    return this[index];
  }
  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem);
    }
  }
  on(type, fn) {
    return this.each(elem => {
      elem.addEventListener(type, fn, false);
    });
  }
  // 扩展更多的 DOM API 等等
}

// 插件
jQuery.prototype.dialog = function (info) {
  alert(info);
}

// “造轮子”
class myJQuery extends jQuery {
  constructor(selector) {
    super(selector);
  }
  // 扩展自己的方法
  addClass(className) {
    ...
  }
  style(data) {
    ...
  }
}

// const $p = new jQuery('p');
// $p.get(1);
// $p.each((elem) => console.log(elem.nodeName));
// $p.on('click', () => alert('clicked'));
// $p.dialog("哈哈哈");
```


---


<a name="fsY4C"></a>
## 作用域和闭包
<a name="arsbk"></a>
### 1. 作用域和自由变量
<a name="8rlBg"></a>
#### 作用域：

- 全局作用域
- 局部作用域
- 块级作用域

![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368072056-6456aca4-09aa-4213-9097-46266bcf3832.png#align=left&display=inline&height=130&name=image.png&originHeight=260&originWidth=520&size=76390&status=done&style=none&width=260)
<a name="ERbHr"></a>
#### 自由变量：
一个变量在当前作用域没有定义，但被使用了，则向上级作用域一层一层依次寻找，直至找到为止，如果到全局作用域都没找到，则报错 xx is not defined。可以这样理解，凡是跨了自己的作用域的变量都叫自由变量。
<a name="S0jZT"></a>
### 2. 闭包
闭包是作用域应用的特殊情况，有两种表现：<br />1.函数作为参数被传递<br />2.函数作为返回值被传递<br />简单理解：当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时, 就产生了闭包。
```javascript
function create() {
  const a = 100;
  return function () {
    console.log(a);
  };
}
 
const fn = create();
const a = 200;
fn(); // 100
```
**<br />**所有的自由变量的查找，是在函数定义的地方向上级作用域查找，不是在执行的地方！**
```javascript
function print(fn) {
  const a = 200;
  fn();
}
const a = 100
function fn() {
  console.log(a);
}
print(fn); // 100
```
![](https://cdn.nlark.com/yuque/0/2020/png/225870/1584367534808-97aec9fc-8702-485c-9205-c6c17febb1a1.png#align=left&display=inline&height=251&originHeight=251&originWidth=381&size=0&status=done&style=none&width=381)
<a name="jQD7B"></a>
### 3. this
**this的应用场景一般如下：**

1. 在普通函数使用
1. 使用call、apply、bind
1. 在对象方法中被调用
1. 在class方法中调用
1. 在箭头函数中使用

*** this的取值是在函数执行的时候确定的，不是在函数定义的时候确定的，这个规则适用于上面所有场景。**<br />**<br />**（1）**<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368368560-5c16ef1c-09aa-4f70-b062-c9dc9ae4e9b4.png#align=left&display=inline&height=189&name=image.png&originHeight=378&originWidth=576&size=87383&status=done&style=none&width=288)<br />这里直接 fn1() 打印的 this 是 window<br />调用 call 之后打印是 this 是这个对象 { x: 100 }<br />调用 bind 之后不会直接执行，而是返回另外一个函数，执行这个函数，this 指向 bind 的对象{ x : 200 }

**（2）**<br />**![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368477719-637e22c4-8afd-4a45-b6d2-97b6fa5dbe3b.png#align=left&display=inline&height=211&name=image.png&originHeight=422&originWidth=407&size=81286&status=done&style=none&width=203.5)**<br />sayHi() 里面的 this 就是当前对象，这里 setTimeout 里面的函数和普通函数一样，this 就是 window

**（3）**<br />**![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368550826-e59bd6e7-c683-4957-a1ef-3c29df860730.png#align=left&display=inline&height=211&name=image.png&originHeight=422&originWidth=401&size=84976&status=done&style=none&width=200.5)<br />**箭头函数中的 this 是上级作用域的 this 的值，嵌套 setTimeout 也是一样，因为最外层 setTimeout 的 this是上级作用域的 this，所以最内层的 setTimeout 中的 this 还是和外层的一样，即上级作用域的 this。

**（4）**<br />**![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584368708395-49e542ea-7284-4acf-bf81-da5a20d66192.png#align=left&display=inline&height=213&name=image.png&originHeight=426&originWidth=542&size=117149&status=done&style=none&width=271)**<br />class 里面的 this 就是指的当前实例对象
<a name="Bwf4u"></a>
### 练习题
<a name="w1ADn"></a>
#### （1）手写 bind 函数
```javascript
// 模拟 bind
Function.prototype.bind1 = function() {
  // 将参数拆解为数组
  let args = Array.prototype.slice.apply(arguments);
  // 获取绑定的对象
  let target = args.shift();
  // 返回函数
  return () => {
    return this.apply(target, args);
  }
}
```


看Polyfill官网文档写法兼容性更好，这段代码可以使你的 `bind()` 在没有内置实现支持的环境中也可以部分地使用`bind`。
```javascript
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) (function(){
  var slice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0]; // 取第一个参数，目标是this指向的第一个参数
    var args = slice.call(arguments, 1); // 从下标1开始将arguments类数组转换成数组
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      var funcArgs = args.concat(slice.call(arguments)) //这个arguments是return的匿名函数的，和上面的arguments没有关系，不要混淆
      return thatFunc.apply(thatArg, funcArgs);// 最后返回的函数中return this.apply(第一个参数,除了第一个参数之后的参数（可能有bind返回后再次传参的）)
    };
  };
})();
```

<a name="XJhPn"></a>
#### （2）做一个简单的 cache 工具
```javascript
// 闭包隐藏数据，只提供 API
function createCache() {
    const data = {} // 闭包中的数据，被隐藏，不被外界访问
    return {
        set(key, val) {
            data[key] = val
        },
        get(key) {
            return data[key]
        }
    }
}
 
const c = createCache()
c.set('a', 100)
console.log( c.get('a') )		// 100
 
```

<a name="DdGi4"></a>
#### （3）创建10个<a>标签，点击的时候弹出对应的序号
```javascript
let a
for (let i = 0; i < 10; i++) {
    a = document.createElement('a')
    a.innerHTML = i + '<br />'
    a.addEventListener('click', function (e) {
        e.preventDefault()
        alert(i)
    })
    document.body.appendChild(a)
}
```

<a name="8coLH"></a>
#### （4）将[类数组对象转换为数组](https://www.cnblogs.com/yangai/p/11158693.html)

- **Array.from(arg)**
> 可以将任何具有length属性的对象转为数组

- **Array.prototype.slice.call(arg)**
> 数组实例上的slice方法, 在不接受任何参数的情况下是复制一个数组, 再利用call(或apply)调用slice方法, 可以实现将类数组对象转为真实数组

- **[...arg]**
> 扩展运算符..., 可以将所有布署了Iterator接口的对象转为数组

<br />

---


<a name="DSsd2"></a>
## 异步
<a name="OCCJb"></a>
### 1. 同步和异步的区别
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584416609324-df15b346-58cb-4f1c-8980-afa7f18b4747.png#align=left&display=inline&height=126&name=image.png&originHeight=206&originWidth=349&size=74210&status=done&style=none&width=214)
<a name="m4544"></a>
#### 单线程和异步

- JS 是单线程语言，只能同时做一件事
- 浏览器和nodejs已支持JS启动进程，比如Web Worker
- JS 和 DOM 渲染共用同一个线程，因为 JS 可修改 DOM 结构

DOM渲染时，JS执行必须停止；JS执行时，DOM渲染也必须停止
<a name="Z4XQA"></a>
#### 为什么需要异步
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584414551615-2f2faa65-f380-47c2-bbde-57aec0ab5214.png#align=left&display=inline&height=112&name=image.png&originHeight=224&originWidth=515&size=112483&status=done&style=none&width=257.5)<br />  遇到等待（网络请求，定时任务）不能卡住，总不能去等待网络请求然后浏览器卡在这里吧；等待的过程 cpu 也是空闲的，这样也会浪费资源；异步回调都是用 callback 的函数形式。
<a name="YlInh"></a>
### 2.应用场景
**（1）网络请求：**如 ajax 图片加载<br />**a. **<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584415273271-504d9ebc-bb3b-42d4-b7e5-fce4b71c563e.png#align=left&display=inline&height=134&name=image.png&originHeight=180&originWidth=488&size=41967&status=done&style=none&width=364)<br />**b.**<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584415321180-b4fd70bf-31d6-4a47-b551-96f8806dab7f.png#align=left&display=inline&height=176&name=image.png&originHeight=245&originWidth=507&size=68816&status=done&style=none&width=365)<br />**（2）定时任务：**如 setTimeout<br />**a.**<br />**![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584415555422-9bc198b3-ea3d-423f-81ef-2ba2f1a92ba2.png#align=left&display=inline&height=215&name=image.png&originHeight=430&originWidth=731&size=242714&status=done&style=none&width=365.5)**<br />**b.**<br />**![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584415600591-d64f4656-c380-4545-950b-a8445d21d91b.png#align=left&display=inline&height=216&name=image.png&originHeight=432&originWidth=730&size=275798&status=done&style=none&width=365)**
<a name="RfGpU"></a>
### 3.Promise
<a name="iw5BU"></a>
#### （1）callback hell 回调地狱
  早期 JS 会陷入回调地狱（callback hell），获取第一份数据之后再获取第二份数据，获取到第二份数据后再获取第三份数据... 这样的嵌套回调太多了就特别乱，就像地狱一般<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584415999104-0251e42e-f856-4a6e-9a96-56c9c2819559.png#align=left&display=inline&height=383&name=image.png&originHeight=766&originWidth=652&size=334474&status=done&style=none&width=326)
<a name="d9o81"></a>
#### （2）promise
嵌套的回调地狱问题促即了 promise 的出现，也就是说 promise 的出解决了 callback 嵌套的回调地狱的问题。<br />**![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584415933909-c5f7817e-fb03-4641-92ff-4057ebf667ce.png#align=left&display=inline&height=296&name=image.png&originHeight=308&originWidth=461&size=66947&status=done&style=none&width=443)**<br />**![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584416195381-859be865-8aea-44a2-b2cb-453bb1f0a824.png#align=left&display=inline&height=371&name=image.png&originHeight=741&originWidth=888&size=595923&status=done&style=none&width=444)**<br />**<br />注意：promise的then都是并列的管道形式，当然这里也是回调，但是不是嵌套的更方便调试和查看
<a name="0srry"></a>
### 练习题
<a name="GEhLn"></a>
#### 1. 手写用 promise 加载一张图片
```javascript
function loadImg(src) {
  const p = new Promise(
    (resolve, reject) => {
      const img = document.createElement('img')
      img.onload = () => {
        resolve(img)
      }
      img.onerror = () => {
        const err = new Error(`图片加载失败 ${src}`)
        reject(err)
      }
      img.src = src
    }
  )
  return p
}

// const url = 'https://img.mukewang.com/5a9fc8070001a82402060220-140-140.jpg'
// loadImg(url)
//   .then(img => {
//     console.log(img.width)
//     return img
//   })
//   .then(img => {
//     console.log(img.height)
//   })
//   .catch(ex => console.error(ex))

const url1 = 'https://img.mukewang.com/5a9fc8070001a82402060220-140-140.jpg'
const url2 = 'https://img3.mukewang.com/5a9fc8070001a82402060220-100-100.jpg'

loadImg(url1)
  .then(img1 => {
    console.log(img1)
    return img1 // 普通对象
  })
  .then(img1 => {
    console.log(img1)
    return loadImg(url2) // promise 实例
  })
  .then(img2 => {
    console.log(img2)
    return img2
  })
  .then(img2 => {
    console.log(img2)
  })
  .catch(ex => console.error(ex))
```
**运行结果：**<br />![](https://cdn.nlark.com/yuque/0/2020/png/225870/1584430265613-87ce470f-255e-49c0-8ab1-3566953f55c4.png#align=left&display=inline&height=186&originHeight=186&originWidth=1160&size=0&status=done&style=none&width=1160)
<a name="HCJEb"></a>
#### 2. setTimeout 笔试题
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584430379991-2b7e1582-3ac1-423f-b0b0-9eaf24c06218.png#align=left&display=inline&height=355&name=image.png&originHeight=710&originWidth=783&size=493873&status=done&style=none&width=391.5)<br />**运行结果：**
> 先打印1、3、5、4，1s 后打印 2

<a name="o4s1P"></a>
## 
<a name="fVJIT"></a>
## 


**参考链接：**<br />  [深入理解javascript原型和闭包](https://www.cnblogs.com/wangfupeng1988/p/3977924.html)
