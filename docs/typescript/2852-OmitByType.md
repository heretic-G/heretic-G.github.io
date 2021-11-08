排除一些值的key从对象中...嗯 逻辑应该是这样的

```typescript

type OmitByType<T, U> = {
  [key in keyof T as T[key] extends U ? never : key]: T[key]
}

```

算是比较简单的题 就是key判断val 然后never就好了

看了下别人实现 都一样吧 有个别有差异的 也没啥思想的区别 
