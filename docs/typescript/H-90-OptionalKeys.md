```typescript

type getRequire<T> = {
    [key in Exclude<keyof T, never>]: 1
}

type getOptional<T> = {
    [key in keyof T]: 1
}

type OptionalKeys<T> = keyof {
    [key in keyof T as [getOptional<T>[key]] extends [getRequire<T>[key]] ? never : key]: 1
}

```

这居然和可选和必填属性这玩意干上了 ... 再有这个题 可能先跳过了