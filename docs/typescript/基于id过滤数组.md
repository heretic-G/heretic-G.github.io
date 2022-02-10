```typescript

type a = [{ id: 1, name: '11' }, { id: 2, name: '22' }]
type b = [{ id: 1, name: '33' }, { id: 3, name: '44' }]

type changeArr<Arr extends unknown[], Index extends number = 0, Val extends unknown = undefined,  Rest extends unknown[] = []> = 
    Rest['length'] extends Index 
        ? Arr extends [infer F, ...infer R] 
            ? [...Rest, Val, ...R] 
            : [...Rest, Val] 
        : Arr extends [infer F, ...infer R] 
            ? changeArr<R, Index, Val, [...Rest, F]> 
            : Rest

type merge<A extends ({id: number, name: string})[], O extends ({id: number, name: string})[] = [], S extends Record<number, number> = {}> =
    A extends [infer L, ...infer R] 
        ? L extends {id: number, name: string} 
            ? L['id'] extends keyof S 
                ? merge<R extends ({id: number, name: string})[] ? R : [], changeArr<O, S[L['id']], L>, S>
                : merge<R extends ({id: number, name: string})[] ? R : [], [...O, L], S & {[key in L['id']]: O['length']}>
            : O 
        : O

type z = merge<[...a,...b]>
```

总体实现了 但是感觉怪怪的 可能是部分逻辑在ts中实现比较麻烦吧

整体其实和js差异不大 有个对象 key是id val是 生成的数组所处的位置 

如果存在就做替换操作 如果不存在就推入数组中 处理完毕 直接返回数组
