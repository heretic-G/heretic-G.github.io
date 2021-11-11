```typescript

type StringToUnion<T extends string, S extends unknown[] = []> = T extends `${infer F}${infer L}` ? StringToUnion<L, [...S, F]> : S[number]

```

我的思路很简单就是转数组使用`array[number]`来吧数组在转联合类型

这里遇到一个坑 我最开始写的是

```typescript

type StringToUnion<T extends string> = (T extends `${infer F}${infer L}` ? [F, ...StringToUnion<L>]  : [])[number]

```

这里一直不正确 后来想明白了 其实这里ts应该在rest报错的 简单的想 每个StringToUnion都是返回的`[number]`的结果也就是一个联合
但其实联合是不能`rest`(不然联合转数组不就不需要兜一大圈子了吗)


别人的答案 哎 想复杂了 或者说固定思维了 可以直接拼接联合 仔细想最开始有想过 不过我当时觉得不可以 直接否了...


```typescript

type StringToUnion<T extends string> = T extends `${infer F}${infer L}` ? F | StringToUnion<L> : never

```
