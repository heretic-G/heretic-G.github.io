```typescript
function foo<
  Value extends | null | string | number | boolean| [Value], // 递归推断, 如何
  Key extends PropertyKey,
  T extends Record<Key, Value> | Value[] | [Value]
>(a: T): T {
  return a
}

const t1 = foo([1,2,{name: 2,c: '123', d: [true]}]) // ok

```

没有完全明白但是我的理解是 extends 是一个兜底范围 而不是声明了一个类型

这里的泛型推导会依赖3方 第一就是传入 第二就是函数参数 第三就是默认值 

当这里没有传入的时候 就会依赖参数的类型 参数类型会被约束为extends及其以上 这时候 看来ts选择做更窄的类型 这样导致 类型收窄到了字面量

函数的默认值不能使用泛型推导 这里存在的可能性 导致类型无法确认后面用户使用时的类型安全 所以需要我们使用as去做处理
