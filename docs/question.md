一些单独的代码题考察点

```javascript
const arr = {
  '2': 3,
  '3': 4,
  'length': 2,
  'splice': Array.prototype.splice,
  'push': Array.prototype.push
}
arr.push(1)
arr.push(2)
arr.length // 输出啥 为什么

```

```javascript

new Promise(resolve => {
  console.log(1)
  resolve()
  reject()
  console.log(2)
}).then(res => {
  console.log(3)
}).catch(res => {
  console.log(4)
})
console.log(5)
// 输出顺序  

// 这里发现个更好玩的 最后控制台结束输出的啥 顺序是啥 为啥...
```

```javascript

function f1(a) {

    console.log(a);// 10;  这里我开始觉得是undefined的

    // 我以为var a=1会先把var a=undefined 放在函数的最前面 但是好像并没有

    var a=1;

    console.log(a);// 1 

    console.log(arguments[0])// 1;  这里我觉得也是10

}

f1(10)

```

```javascript

1 + (function x(){}) + x
if (false) var a = 1
if (false) let a = 1

```

```javascript

function myFunc(num) {
  var num = num + 1
  return num
}

console.log(myFunc(10))

```
