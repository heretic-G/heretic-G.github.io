```typescript

type MapTypes<T, R extends { mapFrom: unknown, mapTo: unknown }> = {
  [key in keyof T]: [T[key], R['mapFrom']] extends [R['mapFrom'], T[key]] 
                    ? R['mapTo'] 
                    : true extends (T[key] extends R['mapFrom'] ? true : never) ? R extends infer TR ? ({
                      [k in keyof TR as k extends 'mapFrom' ? k : never]: [T[key], TR[k]] extends [TR[k], T[key]] ? 'mapTo' extends keyof TR ? TR['mapTo'] : never : never
                    }) extends infer C ? C[keyof C] : never : never : T[key]
}

```

我的思路感觉出了问题...看了下大佬的思路

```typescript

type GetMapToType<
  T,
  R,
  Type = R extends { mapFrom: T; mapTo: infer To } ? To : never
> = [Type] extends [never] ? T : Type

type MapTypes<T, R> = {
  [key in keyof T]: GetMapToType<T[key], R>
}

```
直接去结构替换 哎 真的很巧妙 差距呀....
