```typescript

type ParsePrintFormat<S, A extends unknown[] = []> = S extends `${infer F}%${infer L}${infer Rest}` ? L extends keyof ControlsMap ? ParsePrintFormat<Rest, [...A, ControlsMap[L]]> : ParsePrintFormat<Rest, A> : A

```

判断%后面的字符有没有对应的map 有就添加个数组