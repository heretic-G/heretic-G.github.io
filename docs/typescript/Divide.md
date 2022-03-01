```typescript

type Divide<F extends number, L extends number> = 
  [numToArr<F>, numToArr<L>] extends [infer f, infer l] ? subtrArr<f extends unknown[] ? f : [], l extends unknown[] ? l : []> : never

type numToArr<N extends number, A extends unknown[] = []> = N extends A['length'] ? A : numToArr<N, [...A, 1]>

type subtrArr<L extends unknown[], R extends unknown[], N extends unknown[] = []> = 
  L['length'] extends N['length'] ? 0 : R['length'] extends 0 ? never : R['length'] extends 1 ? L['length'] : L extends [...R, ...infer Rest] ? subtrArr<Rest, R, [...N, 1]> : N['length']

type demo = Divide<50, 0>
type demo1 = Divide<50, 1>
type demo2 = Divide<0, 50>
type demo3 = Divide<50, 3>
type demo4 = Divide<50, 10>

```

就是除法的逻辑 这里先转数组 然后其实按照的是减法的逻辑去判断 是不是够 够就做个数组每次push1个 然后最后输出下长度

思路还是很简答的 实际的问题在于ts在预测deep error的时候 这里我有印象的是对象26个吧 在互相组合会判断过深 extends 估计也是类似的
判断组合数量 实际很多分支可能上面都减掉了 但是我猜测这里应该直接都是*2或者更多的可能性 处理deep的问题花了好久 但是目前也没有个很全面的思路去理解和解决他
