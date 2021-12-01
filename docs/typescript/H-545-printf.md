```typescript

type createResult<T extends unknown[]> = T extends [infer F, ...infer L] ? (args: F) => createResult<L> : string

type createArr<T extends string> = T extends `${infer F}%s${infer L}` ? T extends `${infer F1}%d${infer L1}` ? [number,...createArr<L1>] : [string, ...createArr<L>] : T extends `${infer F2}%d${infer L2}` ? [number, ...createArr<L2>] : []
type Format<T extends string> = createResult<createArr<T>>

```

这里想明白就不难 其实就是%s %d 会变成一个逻辑 先把他摘出来 然后给予顺序去创建期望结构


下面是我看到更好的逻辑 主要是获取匹配字符 这里 比我的好
```typescript

type CharToType = {
  's': string,
  'd': number
}

type Format<T extends string> =
  T extends `${infer F}%${infer Char}${infer R}`
    ? Char extends keyof CharToType
      ? (arg: CharToType[Char]) => Format<R>
      : Format<R>
    : string

```
