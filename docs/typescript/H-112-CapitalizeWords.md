```typescript

type CapitalizeWords<S extends string> =
    S extends `${infer F},${infer L}` ? `${CapitalizeWords<F>},${CapitalizeWords<L>}` :
        S extends `${infer F}.${infer L}` ? `${CapitalizeWords<F>}.${CapitalizeWords<L>}` :
            S extends `${infer F} ${infer L}` ? `${CapitalizeWords<F>} ${CapitalizeWords<L>}` : Capitalize<S>

```
如果只是得到结果其实这不像是一道hard的题

我有尝试去把间隔符变成一个类型去匹配 但是这时候会分发...

看了下别人的答案另一种就是一个一个匹配了 挨个匹配可能还会有一些小差异 但是差异就不大了

```typescript

type CapitalizeWords<S extends string, Flag extends boolean = true> = S extends `${infer First}${infer Rest}`
  ? `${Flag extends true ? Uppercase<First> : First}${CapitalizeWords<Rest, Uppercase<First> extends Lowercase<First> ? true : false>}`
  : S

```
