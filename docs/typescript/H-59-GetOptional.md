```typescript

type getRequire<T> = {
  [key in Exclude<keyof T, never>]: 1
}

type getOption<T> = {
  [key in keyof T]: 1
}

type GetOptional<T> = {
  [key in keyof T as [getOption<T>[key]] extends [getRequire<T>[key]] ? never : key]: T[key]
}

```

这个和57都是一个系列的题...没啥别的更多的内容
