### 全是代码片段的分析 以横线分割

---

```javascript

~!+[]

```

最开始这个给很多人都可以得到结果 -2

但是大多数其实说不清楚里面的每一步的逻辑 这里拆分下

1. 这里包含什么=>包含3个运算符和一个数组
2. 大家都是下意识的从右计算(其实也没法从左)为什么呢


    因为运算符不光包含优先级 还有一个结合性
    然后都属于同优先级所以开始计算[]


3. +[]这里隐形类型转换 期望number 先valueOf 再toString 得到''
   然后转换成number 变为0
4. !0先转boolean false 然后取否为true
5. ~true这里~期望number(这里不会走ToPrimitive)直接ToNumber 返回1
6. ~的逻辑单独拆出来


    ~大多数人都是记得(-x) - 1这个是结果 ~是按位取反 这里是反符号位的
    举个例子(全都用8位方便表示) 1 === 0b_0000_0001 
    变为0b_1111_1110
    这个就是实际的值 但是因为负数存的是补码需要转下
    0b_1000_0001 => 0b_1000_0010就是-2 补码转原码就是除符号位按位取反在+1 原码转补码一样(这是一种计算方法)

这里就得到了-2 其实整体流程还是很长的

---

```javascript

function People() {}
People.prototype = null;
const people = new People();
// prople 是啥

people instanceof People
// 输出结果

```

其实看题目就可以了解就是prototype 为null的影响是什么

这里看规范new的逻辑 中间有一步`Let thisArgument be ? OrdinaryCreateFromConstructor(newTarget, "%Object.prototype%").`

`OrdinaryCreateFromConstructor`传入了原fun 和`Object.prototype`

然后触发了`GetPrototypeFromConstructor` 这里会获取fun的prototype 看看是不是object 这里的判断是内部的Type 所以null 返回的就是null
和typeof不一样 然后使用了`Object.prototype` 嗯 后面都是一样的

instanceof 其实先理解instanceof的含义 他是通过调用@@hasInstance来看是不是右侧的实例

或者判断left的prototype 是不是在right的原型链上

主要的逻辑在 `OrdinaryHasInstance` 上面 这里会check right的prototype是不是object 不是就报错了



这里有的人可能会思考 为什么在控制台输出 people 会是 `People {}`因为这里其实已经没有关联了整体新的对象都是`Object.prototype`了

下面都是个人猜测

然后我测试函数返回object 发现这时候就没有这个标签(虽然整体输出优化是浏览器去实现的 但是肯定存在一个属性去记录了)

这时候看差异就是返回对象和不返回对象的差异 我这里猜可能是`GetPrototypeFromConstructor`的`GetFunctionRealm`
当然一切都是猜测......
---

```javascript
var b = 10;
(function b(){
   b = 20;
   console.log(b); 
})();


var a;
if (!("userName" in window)) {
   userName = "毛十八";
}
console.log(userName)

new Promise((res, rej) => {
    new Error(1)
}).then(res => {
   console.log(res, 2)
}).catch(err => {
   console.log(err, 1)
})

new Promise((res, rej) => {
   throw new Error(1)
}).then(res => {
   console.log(res, 2)
}).catch(err => {
   console.log(err, 1)
})

var x = 1;
function f(x, y = function () { console.log(x, 44); x = 3; console.log(x, 55); }) {
   console.log(x, 11);
   var x = 2;
   y();
   console.log(x, 22);
}
f(4);
console.log(x, 33)


// 11 undefined 33 1 55 3 22 2


async function a () {
   let bb = await 1
   console.log('11')
   return bb
}
async function a2 () {
   return 1
}
async function a1 () {
   let bb = await Promise.resolve(1)
   return bb
}
async function a4 () {
   let bb = await Promise.resolve(1).then(res => 2)
   return bb
}

async function a3 () {
   let bb = Promise.resolve(1)
   return bb
}
Promise.resolve().then(res => {
   console.log(0)
}).then(res => {
   console.log(1)
}).then(res => {
   console.log(2)
}).then(res => {
   console.log(3)
}).then(res => {
   console.log(4)
})
a().then(res => {console.log(5)})
a2().then(res => {console.log(7)})
a1().then(res => {console.log(6)})
a3().then(res => {console.log(8)})
a4().then(res => {console.log(9)})

```
