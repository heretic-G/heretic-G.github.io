```typescript

type strToArr<S extends string = ''> = S extends unknown ? S extends `${infer F}.${infer L}` ? [F, ...strToArr<L>] : [S] : []
type getObjByKey<O extends unknown, K extends string[], A = {}> = K extends [First: infer F, ...rest: infer R] ? O extends {[key: string]: unknown} ? F extends keyof O ? getObjByKey<O[F], R extends string[] ? R : []> : false : false : [O]
type createObj<K extends string[], O = unknown> = K extends [...rest: infer R, Last: infer L] ? createObj<R extends string[] ? R : [], {[key in L extends string ? L : '']: O}> : O

type convert<T> = (T extends infer R ? (args: R) => void : never) extends (args: infer L) => void ? L : never
type DeepPick<O extends {[key in string]: unknown}, S extends string = ''> = 
  convert<S extends string ? strToArr<S> extends infer R ? getObjByKey<O, R extends string[] ? R : []> extends [infer F] ? createObj<R extends string[] ? R : [], F> : unknown : never : never>


```

... 哎 能实现 感觉知己实现的很啰嗦 整体大概用了半个多小时 也不是难度 就是ts的extends多了就开始晕...

整体搞了4个逻辑 

* `strToArr` 这里把str的key转成array

* `getObjByKey` 根据array获取obj上面的值 如果是正确的返回`[result]`的结构

* `createObj` 根据返回的数据来看是不是需要创建对应的obj结构

* `convert` 把联合转为交叉(我觉得我的逻辑存在问题就是这里 我感觉一道题完全没必要实现)

看了别人的结构...嗯 联合转交叉式没问题的 重要的是我的2，3其实可以合并

```typescript

type DeepUnion<T, P extends string> = P extends keyof T
    ? { [key in P]: T[P] }
        : P extends `${infer P1}.${infer P2}`
            ? P1 extends keyof T ? {[key in P1]: DeepUnion<T[P1], P2>} 
            : unknown
        : unknown;

```

嗯 我就是最开始想不通这里 哎 这种一个结构里面的一个是逻辑还能循环得到完整结构的逻辑 我最开始没想通 所以开始拆分的
