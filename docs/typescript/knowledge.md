



协变与逆变（Covariance and contravariance）是在计算机科学中，

描述具有父/子类型关系的多个类型通过类型构造器、构造出的多个复杂类型之间是否有父/子型别关系的用语。





记录一些遇到的情况和笔记

一个很有意思的图 [图片地址](https://gist.github.com/laughinghan/31e02b3f3b79a4b1d58138beff1a2a89)


[地址2](https://github.com/microsoft/TypeScript/issues/33025)

```typescript
// ts中 所有人都是值得集合 只有一个人例外 就是never

// 一个有意思的问题 为什么keyof never是 string | number | symbol
// 在[地址2]中有讨论



// type zasd = { [K in never]: any } & { foo?: number } => {} & {foo?: number}
// 但是如果你用{} & {foo?:number} => {foo?: number}  而且第一个nb在可以string extends zasd 是true 没理解说实话


// 过滤可选属性 使用 {} extends { name?: string } 是会返回true的 
// 在最开始的ts提交这个属性 就存在过一个问题 就是一个{ name?: string } 不能设置name是undefined 只能进行删除 感觉那时候
// 类似于是{name: string} | {}
// 现在类似于{ name: string }| {name: undefined}| {}


//  {} | null | undefined

// 在[Key in Obj] 中 其实Key只能是一个key 但是我们可以改变Key的值使用as 使用as后可以让他基于新的去遍历

// 在val的设置中 经常去T[Key] 这里必须要Key 是T中的值 这里的要的含义是ts类型能够推断出 经常会丢失

// ``中设置变量 ${T} 这种 其实需要T 类型必须string | number | bigint | boolean | null | undefined 中的一种 这里有个简单的小技巧 其实只要 & 一个就可以

// ``中有一种遍历生成 这个也是我最近遇到的 如何生成一个 'a' | 'b' 变为 'aa' | 'ab' | 'bb' | 'ba' 只要 `${keyof T}${keyof T}` 就可以
// 这个应该是模板字符串会去处理的一个逻辑 但是具体的更详细还没理解 等后面理解更深刻在补充 

// 今天钻的一个牛角尖 一个数组的typeof 类型是number[] 所以在 1是可以符合


// `${infer F}${infer L}` 字符串匹配的时候什么时候会失败呢 其实只要是连续2个"" 就是失败 
// 举个例子 
    type str<S extends strring> = S extends `${infer F}-${infer M}${infer L}` ? 1 : 0
// 这种匹配最低需要个什么样子的str呢 其实'-b' 就可以 这时候F和L都是'' 但是只要不连续 就不会认为是匹配失败


// as 我目前理解 分成两种 第一种是基于in前的Key 那这是时候可以过滤Key 如果不是 会导致后面的值对应的val是in之后合并的val


// extends在联合类型naked 泛型时会做类型分发 这时候其实是 语义上的泛型 而不是语法上的泛型 
// 举个例子 
type A<T> = T extends infer U ? U : never;
type B<T> = A<T> extends 1 ? "X" : "Y";
type C = B<1 | 2>; // "Y"
// 可以看到A返回一个泛型U 但是这个泛型在B中没有当做泛型 然后做分发 而是当做一个联合类型 然后直接判断是不是extends

// 还有一个情况特殊记录 这个情况可能是因为bug导致的 具体时效不清晰 而且我不确定我列举了全部过程
type IsUnion<T> =
    [T] extends [infer R]
    ? T extends any 
        ? T extends never 
            ? never 
            : Exclude<R, T> extends T 
                ? 7 
                : 8 
        : 9
    : 10
type test = IsUnion<'a' | 'b' | 'c' | 'd'> // 2

// 在T变为元组后 如果后面是个元组那这时候需要 T extends any 然后在true分支中进行 T extends never 在false 里面就可以继续使用分发了
// 原因不清楚 就是能用... never这一步也可以使用需要后面使用的内置函数 如果不用 那其实any后就已经可以分发了



```


[查看地址](https://github.com/microsoft/TypeScript/issues/44520)
```typescript
// 无约束泛型 在传递到类型限制是{} 的时候不会报错 因为官方的{}定义为重要类型 所以他比null/undefined 更早这里匹配上了
// 但是在上面T中进行unknow 就可以限制这种行为 一个有意思的内部逻辑 具体可以看这里 上面的[查看地址]


function a (args: {}) {}

function b<T> (args: T) {
    a(args)
}

a(null)

```


---

泛型推导 + 可选 + 修改key 会导致 ts解析从第二属性开始不做提示信息展示




naked params 的分发行为中 naked是一个语义上的行为 而不是一个语法上的行为 这个行为是会做一些简单的推断的 也就是


[Non-naked type parameter match still has distributive behavior](https://github.com/microsoft/TypeScript/issues/43727)
