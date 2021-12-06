```typescript

type FilterOut<T extends any[], F, A extends unknown[] = []> = T extends [infer F1, ...infer Rest] ? [F1] extends [F] ? FilterOut<Rest, F, A> : FilterOut<Rest, F, [...A, F1]> : A

```

直接每个过滤就好了 唯一要处理就是never 直接extends会直接never 需要把他变为不是naked的type