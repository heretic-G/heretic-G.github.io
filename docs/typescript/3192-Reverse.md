翻转数组

```typescript

type Reverse<T, Arr extends unknown[] = []> = T extends [...args:infer F, Last: infer L] ? Reverse<F, [...Arr, L]> : Arr

```

也不是很难 顺着写就ok了 这里还想明白一个逻辑 
对于`string`和`Array`使用`infer`为什么 一个字符串长度可以支持2个`infer` 
而数组必须要2长度
```typescript

    // [First:infer F ,Last:infer L]    最少需要2个长度
    // `${infer F}${infer L}`           最少需要一个长度

```

这里的区别是`rest` `rest`在不满足的时候默认为了0长度 而一个`infer`最低需要1长度
`string`可以1长度是因为最后一个默认就是`rest`的逻辑

别人的思路

```typescript

type Reverse<T> = T extends [...infer U, infer R] ? [R, ...Reverse<U>] : []

```

区别在于我是传递到逻辑上 他是直接`rest`来保持不断的迭代 

还有就是数组直接`infer`就可以 但是我还声明了一个变量(这个逻辑忘记从哪里养成了习惯)
