```typescript


type ObjectKeyPaths<T extends object, PreStr extends string = ''> = {
  [key in keyof T]: 
    ([PreStr, ''] extends ['', PreStr] ? key : `${PreStr}.${key & string}`) extends infer Key 
      ? T[key] extends ReadonlyArray<unknown> ? ArrayKeyPaths<T[key], Key & string> | Key
        : T[key] extends Record<PropertyKey, unknown> 
          ? ObjectKeyPaths<T[key], Key & string> | Key 
          : Key 
      : never 
}[keyof T];

type ArrayKeyPaths<T extends ReadonlyArray<unknown>, PreStr extends string = ''> = {
  [key in keyof T]: key extends string 
    ?([PreStr, ''] extends ['', PreStr] ? key : `${PreStr}.${key}` | `${PreStr}[${key}]` | `${PreStr}.[${key}]`) extends infer Key 
      ? T[key] extends ReadonlyArray<unknown> ? ArrayKeyPaths<T[key], Key & string> | Key
        : T[key] extends Record<PropertyKey, unknown> 
          ? ObjectKeyPaths<T[key], Key & string> | Key 
          : Key 
      : never 
    : never
}[number];
```

~~测试数据有问题 卡死我了 我说总是不成~~

哎 想多了... 看了下别人的思路 自己的问题
```typescript
type ObjectKeyPaths<
  T extends object,
  NotFirst extends boolean = false,
  K extends keyof T = keyof T
> = K extends string | number
  ?
      | (NotFirst extends true
          ? `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never)
          : `${K}`)
      | (T[K] extends object
          ? `${NotFirst extends true
              ? `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never)
              : `${K}`}${ObjectKeyPaths<T[K], true>}`
          : never)
  : never;

```
