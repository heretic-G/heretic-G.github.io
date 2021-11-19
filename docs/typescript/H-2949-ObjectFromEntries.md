```typescript

type UnionToIntersection<T> = (T extends infer A ? (arg: A) => void : never) extends (arg: infer B) => void ? B : never
type mapType<T> = {
  [key in keyof T]: T[key]
}
type ObjectFromEntries<T extends [string, unknown]> = mapType<UnionToIntersection<T extends [infer F, infer L] ? {
  [key in F & string]: L
} : never>>


```

很无聊的一题 基本就是考的联合转交叉 然后map type 可以处理下交叉 让他一致(因为test的Equal能判断出这些)

剩下的直接处理就好了

看了看别人也是这样...没意思
