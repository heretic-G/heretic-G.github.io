
哎  extends 一个[] 我... 真的裂开 感觉想多了

```typescript

type First<T extends any[]> = T extends [] ? never : T[0]

```

再看这题真的...我估计我可能直接infer 哈哈哈 [0]真的可能就是还是要在进一步 
