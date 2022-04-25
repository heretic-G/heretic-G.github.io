```typescript

type Subtraction<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>> = B extends [...A, ...infer Rest] ? Rest : A extends [...B, ...infer Rest] ? Rest : never

```

rest 方式实现减法
