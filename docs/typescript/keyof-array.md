// 本章内容是 H-472-TupletoEnumObject的中间关于keyof 的独立
内容都一致 只是单独出来方便自己看

数组的keyof期望和对象不一致

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

还有一个情况是如果array 里面& 到别的非array 会导致map type 里面的key包含所有

```typescript

let arr = [1,2,3,4,5] as const

type arrToObj<T> = {
  [key in keyof T]: key
}

type test = arrToObj<typeof arr & { name: string}>
// type test = {
//     [x: number]: number;
//     readonly 0: "0";
//     readonly 1: "1";
//     readonly 2: "2";
//     readonly 3: "3";
//     readonly 4: "4";
//     length: "length";
//     toString: "toString";
//     toLocaleString: "toLocaleString";
//     concat: "concat";
//     ... 18 more ...;
//     name: "name";
// }

```

