```typescript

type checkRequire<T, K extends keyof T> = {
    [key in K]: T[key]
} extends {
    [key in Exclude<K, never>]: Exclude<T[key], undefined>
} ? true : false

type IsRequiredKey<T, K extends keyof T> = checkRequire<{
    [key in keyof T]: 1
}, K>

```

判断可选属性我自己理解存在2个特性 第一个直接map type 会继续是可选属性

可选属性的值会增加一个undefined 

所以我直接重新构建一个可选属性对象 把值重置 防止any undefined和unknown的影响 然后判断剔除undefined 是不是相等 就可以判断了


看了下 感觉没有比我好的答案 - -  哈哈哈哈哈哈
