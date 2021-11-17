
这道题没有想出来 卡在了index 默认取得是string 这里我觉得做个map转 实在是太蠢了 
肯定不是这样 放弃了 前面的转换步骤实现了 看了别人的代码发现自己实现的也不好 整体思考流程太固定了 有一些地方
对于方法的理解存在了固定思维 

```typescript
// 我最后放弃前的实现到的地步
type mapObject<T> = {
    readonly [key in keyof T as Capitalize<key & string>]: key
}

type Enum<T extends readonly string[], N extends boolean = false> = {
    [key in keyof T as T[key] extends string ? T[key] : never]: key & string
} extends infer R ? N extends true ? R : mapObject<R> : never


```

第一个问题是转对象的时候这时候我还是思考用的key去取value 然后在进行转换
写的时候这里遇到个问题是 数组的keyof期望和对象不一致 

实质
`keyof array === typeof Symbol.iterator | typeof Symbol.unscopables | "findIndex" | "fill" |
"copyWithin" | "entries" | "keys" | "values" | "includes" | number|
"pop" | "lastIndexOf" | "every" | "some" | "forEach" | "map" | "filter" | "reduce" | "reduceRight" |
"find" | "push" | "concat" | "join" | "reverse" | "shift" | "slice" | "length" | "toString" | "toLocaleString" |
"sort" | "splice" | "unshift" | "indexOf"` 

加上string的序号

看个demo 
```typescript

type Enum<T extends readonly string[]> = {
  [key in keyof T as T[key] extends string ? T[key] : never]:  T[key]
}

type test = Enum<typeof OperatingSystem>

// type test1 = {
//     readonly macOS: "macOS" | "windows" | "linux";
//     readonly windows: "macOS" | "windows" | "linux";
//     readonly linux: "macOS" | "windows" | "linux";
// }

```

这里的结果可以看出这和对象的逻辑思想来 会发现不一致 

这是因为 在`mapped type`中array key只会是 number + string index 
所以这里的value => T[key] 其实key是number | string index 导致number 取出了所有

我这里才Map两次

仔细想这里之所以没有想array[number] 可能是因为最近看了联合转数组 这里官方说无法是因为联合是无序 
那其实这里array[number]这里使用的其实是一个内部默认的联合顺序 

然后第二个问题是`mapped type`取出来的index是string

这里需要转类型 我一直没想通 因为我自己了解是无法实现的 看了别人的思路 才发现其实不用转换可以使用length 这里有个天然的length 这里真的很巧妙

来个数据演示下 

`['1', '2', '3', '4', '5']` 中获取'3'的序号
只需要每次取出一个扔到一个新数组 如果相等输出新数组当时的长度`newArr[length]` 就是`number index`

别人的答案

```typescript

type Indexof<T extends readonly any[], E, Res extends any[] = []> =
T extends readonly [infer L, ...infer R]
  ? [E, L] extends [L, E]
    ? Res['length']
    : Indexof<R, E, [...Res, 0]>
  : never

type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [P in T[number] as Capitalize<P>]: N extends true ? Indexof<T, P> : P
}

```
