```typescript

type Subtraction<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>> = B extends [...A, ...infer Rest] ? Rest : A extends [...B, ...infer Rest] ? Rest : never

```

rest 方式实现减法 但是只能返回正数 不能返回负数
