```typescript


type stringToArr<S extends string, A extends string[] = []> = S extends `${infer F}&${infer L}` ? stringToArr<L, [...A, F]> : [...A, S]

type hasEqual<A extends string[]> = {
  [key in A[number] as key extends infer K ? K extends `${infer F}=${infer L}` ? F : K : never ]: 1
}

type filterVal<O, S> = {
  [key in keyof O]: S extends `${infer F}${key & string}=${infer L}` ? getValue<key & string, S> extends infer A ? A extends unknown[] ? A['length'] extends 1 ? A[0] : A : never : never : true
}

type getValue<K extends string, S extends string, A extends string[] = []> = 
  S extends `${infer F}${K}=${infer Rest}` ? Rest extends `${infer RF}&${infer RestL}` ? getValue<K, RestL,notSame<A, RF>> : notSame<A, Rest> : A

type notSame<A extends unknown[], I> = I extends A[number] ? A : [...A,I]

type ParseQueryString<S extends string> = S extends '' ? {} : filterVal<hasEqual<stringToArr<S>>, S>


```

感觉我的逻辑有一些啰嗦了 

其实梳理下来就是构造对象 利用key去string中去捕获值 再根据值的区别 做不同的展示

可以过滤相同的值