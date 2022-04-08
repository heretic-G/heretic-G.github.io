```typescript
type isAny<T> = [2] extends [1 & T] ? true : false

type sameType<L, R> = isAny<R> extends true ? isAny<L> extends true ? true : false : [L, R] extends [R, L] ? true : false

type hasType<A, V> = {
    [key in keyof A as key extends 'length' ? never : sameType<A[key], V> extends true ? key : never]: A[key]
}

type Unique<T, R extends unknown[] = []> =
    T extends [infer F, ...infer Rest] ?
        hasType<R, F> extends infer O ? [O, {}] extends [{}, O] ? Unique<Rest, [...R, F]> : Unique<Rest, R> : R : R

```

这里卡的最久的就是数组自带一个length属性这个属性的值是可能和比较值相同的导致无法被添加

我最开始只是关注的顺序 卡了好久 后来挨个想才想通  真的一个有意思的地方 T-T

第二个就是any判断 嵌套逻辑多了 ts不能断点 有时候真的不是很好调试很多时候必须要一步一步的手动去获取type 类型 是个体力活
