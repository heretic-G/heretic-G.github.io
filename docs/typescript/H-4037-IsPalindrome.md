```typescript


type toStr<T> = T extends number ? `${T}` : T
type toArr<T, A extends unknown[] = []> =  T extends `${infer F}${infer Rest}` ? toArr<Rest,[...A, F]> : A

type IsPalindrome<T> = (T extends string | number ? toArr<toStr<T>> : T)  extends [infer F, ...infer M, infer L] ? F extends L ? IsPalindrome<M> : false : true


```

转成数组挨个判断 因为字符串没有rest逻辑

