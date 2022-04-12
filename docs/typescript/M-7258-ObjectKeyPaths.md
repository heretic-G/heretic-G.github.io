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

测试数据有问题 卡死我了 我说总是不成
