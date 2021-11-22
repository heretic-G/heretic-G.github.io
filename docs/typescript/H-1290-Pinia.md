```typescript

type MapGetters<G> = { readonly [K in keyof G]: G[K] extends (...args: any[]) => infer R ? R : never }
declare function defineStore<S, G, A>(store: {
    id: string,
    state: () => S,
    getters: G & ThisType<Readonly<S> & MapGetters<G>>,
    actions: A & ThisType<S & MapGetters<G> & A>
}): Readonly<S> & MapGetters<G> & A & {
    init: (...args: unknown[]) => unknown
}

```

没想到这道没有写出来 卡在了getters 我是通过func 绑定的this 实质这里需要obj这里&this

这里的思路问题导致getters的类型一致处理不掉 因为getters是一个类型是key: function 
this上面表现是key: type 的类型
