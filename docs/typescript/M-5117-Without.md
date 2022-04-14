```typescript

type Without<T extends ReadonlyArray<unknown>, U,> 
  = U extends unknown[] ? WithoutDeal<T, U> : WithoutDeal<T, [U]>
type WithoutDeal<T extends ReadonlyArray<unknown>, U extends ReadonlyArray<unknown>, R extends ReadonlyArray<unknown> = []>
 = T extends [infer F, ...infer Rest] ? F extends U[number] ? WithoutDeal<Rest, U, R> : WithoutDeal<Rest, U, [...R, F]> : R
```

这个真的是一个M的难度的题 没啥难度就
