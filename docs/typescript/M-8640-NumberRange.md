```typescript

type NumberRange<L, H, A extends ReadonlyArray<unknown> = [], U = never, O extends boolean = false> =
  O extends true 
  ? A['length'] extends H 
    ? U | H 
    : NumberRange<L, H, [...A, 1], U | A['length'], true> 
  : A['length'] extends L
    ? NumberRange<L, H, [...A, 1], A['length'], true>
    : NumberRange<L, H, [...A, 1]>

```

判断收集数据就可以 不过这样即使尾递归 最大也就是1000这里需要注意
