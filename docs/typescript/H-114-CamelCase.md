```typescript

type CamelCase<S extends string> = S extends `${infer F}_${infer L}${infer Rest}` ? `${Lowercase<F>}${Uppercase<L>}${CamelCase<Rest>}` : Lowercase<S>

```

直接分割 没啥难的