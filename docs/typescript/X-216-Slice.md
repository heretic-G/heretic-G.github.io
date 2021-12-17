```typescript


type EndBeforeStart<A extends unknown[], Rest extends unknown[], S extends number, E extends number> = 
    Rest['length'] extends S ? true : `-${A['length']}` extends `${S}` ? true : Rest['length'] extends E ? false : `-${A['length']}` extends `${E}` ? false : A extends [infer F, ...infer R] ? EndBeforeStart<R , [...Rest, F], S, E> : true

type filterArrBy<A extends unknown[], S extends number, R extends unknown[] = [], Result extends unknown[] = []> =
    R['length'] extends S ? [A, Result] : `-${A['length']}` extends `${S}` ? [A, Result] : A extends [infer F, ...infer Rest] ? filterArrBy<Rest, S, [...R, F], [...Result, F]> : [Result, R, []]

type Slice<Arr extends unknown[], Start extends number = 0, End extends number = Arr['length']> =
    EndBeforeStart<Arr, [], Start, End> extends false ? [] : filterArrBy<Arr, Start> extends [infer F, infer L] ? F extends unknown[] ? L extends unknown[] ? filterArrBy<F, End, L>[1] : [] : [] : []

```


哎 搞了好久...主要的逻辑就是 匹配这里 匹配的逻辑前后都一致 但是有个区别是start没有匹配直接[] end没有匹配是看start的结果

其他的没啥 主要是 extends写的多了人都要吐了