```typescript

type stringToArr<S> = S extends `${infer F}${infer Rest}` ? [F, ...stringToArr<Rest>] : []

type LengthOfString<S extends string> = stringToArr<S>['length']

```

字符串很多操作都是转成数组去操作的 