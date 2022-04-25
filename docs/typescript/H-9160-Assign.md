```typescript

type Assign<T extends Record<string, unknown>, U extends ReadonlyArray<unknown>> = 
  U['length'] extends 0 
  ? T 
  : U extends [infer F, ...infer Rest] 
    ? F extends Record<PropertyKey, unknown> 
      ? { 
          [key in (keyof T | keyof F)]: key extends keyof F ? F[key] : key extends keyof T ? T[key] : never
        } extends infer D ? D extends Record<string, unknown> ? Assign<D, Rest> : never : never
      : Assign<T, Rest>
    : T


```

还是满基础的assign 这里看测试没有要求去做递归的处理 所以整体上难度没有很大
