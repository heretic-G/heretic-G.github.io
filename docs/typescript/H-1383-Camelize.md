```typescript

type Camelize<T> = T extends Record<string, unknown> ? {
  [key in keyof T as toUp<key>]: Camelize<T[key]>
} : T extends unknown[] ? {
  [key in keyof T]: Camelize<T[key]>
} : T

```

额 需要判断下数组和对象然后不同处理
