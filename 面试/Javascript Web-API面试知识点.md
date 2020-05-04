# Javascript Web-API面试知识点

> 从JS基础到JS-Web-API:

JS基础知识，规定语法（ECMA262标准）<br />JS Web API，网页操作的API（W3C标准）<br />前者是后者的基础，两者结合才能真正实际应用

> JS基础知识有哪些？

变量的类型和计算、原型和原型链、作用域和闭包（还有异步，异步是借用JS Web API去实现的）

> JS Web API有哪些？

DOM、BOM、事件绑定、ajax、存储
<a name="P4UJ1"></a>
## DOM
> DOM操作（Document Object Model）

<a name="wMPIG"></a>
### 1. DOM本质
DOM的本质就是从HTML解析出来的一棵树，是树形的数据结构。如下：
```javascript
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
<div><p>this is p</p></div>
</body>
</html>
```

<a name="n5l7K"></a>
### 2. DOM节点操作

- 获取 DOM 节点
- attribute
- property
<a name="dUIFA"></a>
#### 获取 DOM 节点
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584432530196-29886f66-79ff-4e56-8cb2-32c4b05b3603.png#align=left&display=inline&height=148&name=image.png&originHeight=230&originWidth=775&size=153955&status=done&style=none&width=500)

<a name="sBdtT"></a>
#### DOM 节点的 property
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584432909734-cbf8376c-bbb5-4393-973c-15c10c7e906e.png#align=left&display=inline&height=284&name=image.png&originHeight=299&originWidth=526&size=188006&status=done&style=none&width=500)

<a name="mnkvv"></a>
#### DOM 节点的attribute
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584441935879-85ef742c-fc50-4633-ba8f-5e13aef624c1.png#align=left&display=inline&height=167&name=image.png&originHeight=483&originWidth=1448&size=682245&status=done&style=none&width=500)

<a name="jSjSx"></a>
#### property 和 attribute 区别

- property：修改对象属性，不会体现到 html 结构中
- attribute：修改 html 属性，会改变 html 结构
- 两者都有可能引起 DOM 重新渲染

<a name="vP6qT"></a>
### 3. DOM 结构操作

- 新增/插入节点
- 获取子元素列表，获取父元素
- 删除子元素

```javascript
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
// 新建节点
const newP = document.createElement('p');
newP.innerHTML = 'this is new p';
// 插入节点
div1.appendChild(newP);

// 移动节点
const p1 = document.getElementById('p1');
div2.appendChild(p1);

// 获取父元素
console.log(p1.parentNode);

// 获取子元素列表
const div1ChildNodes = div1.childNodes;
console.log(div1.childNodes); 	// NodeList(7) [text, text, p, text, p, text, p]
const div1ChildNodesP = Array.prototype.slice.call(div1.childNodes).filter(child => child.nodeType === 1);
console.log(div1ChildNodesP);

// 刪除子元素
div1.removeChild(div1ChildNodesP[0]);
```

<a name="gXoq6"></a>
### 4. DOM 性能
DOM操作非常“昂贵”，我们需要避免频繁的DOM操作
<a name="f3owd"></a>
#### 对 DOM 查询做缓存
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584454133507-573157a7-07b0-464d-8b3a-9185fd14bbe6.png#align=left&display=inline&height=210&name=image.png&originHeight=639&originWidth=1520&size=652028&status=done&style=none&width=500) 

<a name="ZpU82"></a>
#### 将频繁操作改为一次性操作
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584454595634-86c3d19b-6440-48c0-8d91-c666945cc098.png#align=left&display=inline&height=352&name=image.png&originHeight=661&originWidth=939&size=588458&status=done&style=none&width=500)


---


<a name="mGgTt"></a>
## BOM
> BOM  操作（Browser Object Model）<br />

<a name="ZRky5"></a>
### 1. navigator 和 screen
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584457471322-213a1986-d393-4a4d-a207-55b985695f8c.png#align=left&display=inline&height=264&name=image.png&originHeight=684&originWidth=1295&size=566109&status=done&style=none&width=500)
<a name="FxKWz"></a>
### 2. location 和 history
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584457708932-433e4d64-f1b0-44ae-bdf1-d8b628b01c4d.png#align=left&display=inline&height=246&name=image.png&originHeight=684&originWidth=1390&size=678635&status=done&style=none&width=500)
<a name="dzBt1"></a>
### 3. 练习题
<a name="vaE7O"></a>
#### （1）如何识别浏览器的类型
```javascript
function browserType() {
  let ua = navigator.userAgent; //取得浏览器的userAgent字符串
  
  let isOpera = ua.indexOf("opera") > -1;
  // 判断是否是Opera浏览器
  if (isOpera) {
    return "Opera";
  }
  //判断是否Firefox浏览器
  if (ua.indexOf("Firefox") > -1) {
    return "Firefox";
  }
  //判断是否chorme浏览器
  if (ua.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  //判断是否Safari浏览器
  if (ua.indexOf("Safari") > -1) {
    return "Safari";
  }
  //判断是否IE浏览器
  if (ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  }
  //判断是否Edge浏览器
  if (ua.indexOf("Trident") > -1) {
    return "Edge";
  };
}
let result = browserType();
console.log(result);
```

<a name="emvUG"></a>
#### （2）如何拆解 url 各个部分
```javascript
// https://coding.imooc.com/class/chapter/115.html?a=100b=200#Anchor
console.log(location.href); 		// 'https://coding.imooc.com/class/chapter/115.html'
console.log(location.protocol)  // 'https:'
console.log(location.host) 			// 'coding.imooc.com'
console.log(location.pathname)  // '/class/chapter/115.html'
console.log(location.search)	  // '?a=100b=200'
console.log(location.hash)	    // '#Anchor'
```

<a name="j6AzT"></a>
## 事件
<a name="Fn5AD"></a>
### 1. 事件绑定
> 基础的事件绑定：

```javascript
const btn = document.getElementById('btn');
btn.addEventListener('click', event => {
  console.log('clicked');
});
```

> 通用的事件绑定函数

```javascript
// 事件绑定函数
function bindEvent(elem, type, fn) {
  elem.addEventListener(type, fn);
}
 
const btn = document.getElementById('btn');
bindEvent(btn, 'click', event => {
  console.log(event.target);  // event.target就是触发点击的元素，这里就是btn
  event.preventDefault();  // 阻止默认行为，如果这里是<a>标签，阻止默认跳转
  alert('clicked');
});
```

<a name="tQroS"></a>
### 2. 事件冒泡<br />
![](https://cdn.nlark.com/yuque/0/2020/jpeg/225870/1584510131040-2c0646f2-7e20-46df-a085-ae1b509d41b3.jpeg#align=left&display=inline&height=188&originHeight=188&originWidth=346&size=0&status=done&style=none&width=346)<br />一个事件触发后，会在子元素和父元素之间传播。这种传播分成三个阶段：

- 捕获阶段：从 window 对象传导到目标节点（上层传到底层）称为“捕获阶段”（capture phase），捕获阶段不会响应任何事件；
- 目标阶段：在目标节点上触发，称为“目标阶段”
- 冒泡阶段：从目标节点传导回 window 对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。

事件冒泡的应用场景就是**事件代理，**即利用事件冒泡的机制把里层所需要响应的事件绑定到外层；

> **event.stopPropagation()：阻止冒泡**

![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584508452855-024ce25b-2768-49f4-b24c-b001c0edd67e.png#align=left&display=inline&height=222&name=image.png&originHeight=633&originWidth=577&size=300430&status=done&style=none&width=202)![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584508470484-4b899a95-d79c-41b5-a1ca-0ca40383aca6.png#align=left&display=inline&height=221&name=image.png&originHeight=538&originWidth=1243&size=473131&status=done&style=none&width=510)
<a name="E6tCr"></a>
### 3. 事件代理
事件代理（Event Delegation），又称之为事件委托。是JavaScript中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定在子元素的响应事件（click、keydown......）委托给父元素，让父元素担当事件监听的职务。**事件代理的原理是DOM元素的事件冒泡。**<br />**<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584509372695-8c9ba374-ac92-4aa0-8d85-1054042ea8ff.png#align=left&display=inline&height=199&name=image.png&originHeight=563&originWidth=571&size=250898&status=done&style=none&width=202)![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584509392144-3fd821c2-ee33-4e28-bd9e-637fa78e0b10.png#align=left&display=inline&height=200&name=image.png&originHeight=489&originWidth=1254&size=400079&status=done&style=none&width=510)

**<br />**事件绑定的优点：**

- 可以大量节省内存占用，减少事件注册，比如在 ul 上代理所有 li 的 click 事件就非常棒
- 可以实现当新增子对象时无需再次对其绑定（动态绑定事件）

<a name="KMLwE"></a>
### 练习题
<a name="SUKDx"></a>
#### 1. 编写一个通用的事件监听函数
```html
<div id="div">
  <a href="#">A</a>
  <a href="#">B</a>
  <a href="#">C</a>
  <a href="#">D</a>
  <p>P</p>
  <button>button</button>
</div>
```

```javascript
// 普通绑定
let btn = document.getElementsByTagName("button")[0];
bindEvent(btn, 'click', function(event) {
  // console.log(event);
  console.log(this.innerHTML);
});
// 代理绑定
let div = document.getElementById('div');
bindEvent(div, 'click', function(event) {
  event.preventDefault();
  console.log(this.innerHTML);
});
// 事件代理函数
function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector;
    selector = null;
  }
  elem.addEventListener(type, e => {
    const target = e.target;
    if (selector) {
      // 代理绑定
      // matches：主要是用来判断当前 DOM 节点是否能完全匹配对应的选择器规则
      // 如果匹配成功，返回true，反之则返回false。
      if (target.matches(selector)) {
        fn.call(target, e);		// 改变 fn 的 this
      }
    } else {
      // 普通绑定
      fn.call(target, e);
    }
  });
}
```

<a name="2JLOL"></a>
#### 2. 无限下拉图片列表，如何监听每个图片的点击

- 事件代理
- 用 e.target 获取触发元素
- 用 matches 来判断是否是触发元素

---


<a name="6gIjA"></a>
## Ajax
<a name="71dCq"></a>
### 1. XMLHttpRequest
<a name="kdKVa"></a>
#### （1）get 请求
```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', './data/test.json', true); // true为异步，false为同步
xhr.onreadystatechange = function () {
  // 这里的函数异步执行
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // console.log(JSON.parse(xhr.responseText));
      console.log(xhr.responseText);
    } else {
      console.log('其他情况');
    }
  }
}
xhr.send(null);
```

<a name="wLdcV"></a>
#### （2）post 请求
```javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', '/login', true)
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    } if (xhr.status === 404) {
      console.log('404 not found');
    } else {
      console.log('其他情况');
    }
  }
}
const postData = {
  username: 'zhangsan',
  password: 'xxx'
};
xhr.send(JSON.stringify(postData));
```

<a name="R3CEs"></a>
#### （3）xhr.readyState

- 0 -（未初始化）还没有调用 send() 方法
- 1 -（载入）已调用 send() 方法，正在发送请求
- 2 -（载入完成）send() 方法执行完成，已经接收到全部的响应内容
- 3 -（交互）正在解析响应内容
- 4 -（完成）响应内容解析完成，可以在客户端调用

<a name="gjAYE"></a>
#### （4）xhr.status

- 2xx - 表示成功处理请求，如 200
- 3xx - 需要重定向，浏览器直接跳转，如 301、302、304
- 4xx - 客户端请求错误，如 404、403
- 5xx - 服务器错误

<a name="vUeQ6"></a>
### 2. 同源策略和跨域
<a name="OGqIp"></a>
#### 同源策略
> 同源：协议、域名、端口，三者必须一致

ajax 请求时，**浏览器要求**和当前网页的 server 必须同源（安全）

比如：前端 http://a.com:8080/；server 是https://b.com/api/xxx。这个前端网页上发 ajax 去请求 server 页面的数据，浏览器肯定会截获，不符合同源，不管是 get 还是 post 都不会让你发；服务端 server 不一样，没有同源策略，可以去获取其他的数据。<br />**加载 img、css、js 可以无视同源策略。**

- <img /> 可用于统计打点，可使用第三方统计服务
- <link /><script /> 可使用 CDN，CDN 一般都是外域
- <script />可实现 JSONP


<a name="ylQbc"></a>
#### 跨域

- 所有的跨域，都必须经过 server 端允许和配合
- 未经 server 端允许就实现跨域，说明浏览器有漏洞，危险信号
<a name="hpGbN"></a>
### 3. JSONP
> 访问 https://imooc.com/，服务端一定返回一个 html 文件吗？
> 不是。如果是这样就是静态网页了，不会动态更新。服务器可以任意动态拼接数据返回，只要符合 html 格式要求。
> 同理：<script src="http://imooc.com/getData.js">就一定返回 js 文件吗？
> 不一定，都是url网址，不管是啥，服务器都会拼接任何满足条件的数据返回给你。这里服务器只需要拼接的东西符合 js 格式不报错就可以了。

- <script /> 可绕过跨域限制
- 服务器可以任意动态拼接数据返回

所以  <script /> 就可以获得跨域的数据，只要是服务端愿意返回。

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>jsonp 演示</title>
    </head>
    <body>
        <script>
            window.callback = function (data) {
                console.log(data)
            }
        </script>
        <!-- 实际操作可以写函数把下面的script动态插入 -->
        <script src="http://localhost:8002/jsonp.js?username=xxx&callback=callback"></script>
    </body>
</html>
```
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584530142856-cc9a31b9-db23-45ca-a82e-1c156e6b040d.png#align=left&display=inline&height=272&name=image.png&originHeight=901&originWidth=1659&size=819671&status=done&style=none&width=501)
<a name="NJjC9"></a>
### 4. CORS - 服务器设置 http header
![image.png](https://cdn.nlark.com/yuque/0/2020/png/225870/1584530425151-f27b9351-a67d-4c88-a6b8-ad0c437b4e5a.png#align=left&display=inline&height=128&name=image.png&originHeight=402&originWidth=1875&size=734919&status=done&style=none&width=596)

<a name="y6pBk"></a>
### 练习题
<a name="xDciC"></a>
#### 1. 手写一个简易的 ajax 

```javascript
function ajax(option) {
  return new Promise((resolve, reject) => {
    let { url, method = 'GET', data = null } = option;
    if (data) {
      // 将参数编码成表单的键值对形式
      let formData = [];
      for (const key in data) {
        formData.push(''.concat(key, '=', data[key]));
      }
      data = formData.join('&');
    }
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    // 设置content-type
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else if (xhr.status === 404) {
          reject(new Error("404 not found"));
        } else {
          reject("其他错误");
        }
      }
    }
    xhr.send(data);
  });
}
// get 请求
ajax({
  url: "http://127.0.0.1:5500/part1/inde.html"
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});
// post 请求
// ajax({
//   url: "http://127.0.0.1:5500/part1/inde.html",
//   method: "POST",
//   data: {
//     username: "张三",
//     password: "admin123"
//   }
// }).then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });
```

<a name="xiTPf"></a>
#### 2. 跨域的常用实现方式
**（1）jQuery：**
```javascript
$(function(){
    //请求参数
    var list = {};
    //
    $.ajax({
        //请求方式
        type : "POST",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "http://127.0.0.1/admin/list/",
        //数据，json字符串
        data : JSON.stringify(list),
        //请求成功
        success : function(result) {
            console.log(result);
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

```

**（2）fetch：**
```javascript
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```

**（3）axios**

```javascript
const axios = require('axios');

axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```


---


<a name="fVJIT"></a>
## 存储
<a name="gPFr0"></a>
### 1. cookie 存储
<a name="ey18C"></a>
#### cookie 特点
  cookie 本身用于浏览器和 server 通讯，是http请求的一部分。<br />被"借用"到本地存储上来（ localstorage 和 sessionstorage 是 H5 之后才提出的，存储不是 cookie 主要应该做的事），可用 document.cookie = '....' 来修改（前后端都可以修改 cookie）。cookie 的价值不在于本地存储，而在于本地和服务器端的通讯。
<a name="SjKs1"></a>
#### cookie 缺点

- 存储大小最大是** 4KB**
- http 请求时需要发送到服务端，增加请求数据量（刷新一个网页是有很多请求的，如果每个请求都带上这个 cookie，那将是一个非常大的开销）
- 只能用 document.cookie = '...' 来修改，太过于简陋
<a name="ObspR"></a>
### 2. html5 存储
<a name="gPGPr"></a>
#### localStorage 和 sessionStorage 特点

- localStorage 和 sessionStorage 是 HTML5 专门为存储设计的，每个域最大可存储** 5M**
- localStorage 和 sessionStorage 的 API 简单易（用 setItem、getItem处理）
- 不会随着 http 请求被发送出去（cookie 就会被发送出去）
<a name="63CsQ"></a>
#### localStorage 和 sessionStorage 区别

- localStorage 数据会永久存储，除非手动删除或者代码删除
- sessionStorage 数据只存在于当前会话，浏览器关闭则清空
- 一般 localStorage 使用会更多一些
