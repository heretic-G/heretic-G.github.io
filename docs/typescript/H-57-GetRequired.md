```typescript

type resetObj<T> = {
  [key in keyof T]: 1
}

type reuqireObj<T> = {
  [key in Exclude<keyof T, never>]: 1
}

type GetRequired<T> = {
  [key in keyof T as [resetObj<T>[key]] extends [reuqireObj<T>[key]] ? key : never]: T[key]
}

```

key经过处理不会继承可选属性 但是值会存在undefined这里需要手动改下值 然后判断是不是原来的值 不是就是可选属性

其实做过后面那个requireKey这道题不难
