```typescript

type createFun<T, B> = T extends [infer F, ...infer R] ? (args:F) => createFun<R ,B> : B

declare function Currying<T extends (...args: never[]) => unknown>(fn: T): createFun<Parameters<T>, ReturnType<T>>

```

第一次这样写 没有过 为什么 因为这里返回值 是boolean 应该是因为引用类型 直接extends之后这里会变为boolean 

所以这里需要要么const 或者直接去infer取 不要在参数上宽泛一层类型 这里一宽泛 有一些类型会变成了父类型 导致无法反推回去 

```typescript

type createFun<T, B> = T extends [infer F, ...infer R] ? (args:F) => createFun<R ,B> : B

declare function Currying<T>(fn: T): T extends (...args: infer P) => infer R ? createFun<P, R> : never

```

所以下面就是ok的 这里直接取 可以取到原有的类型 这里需要记住
