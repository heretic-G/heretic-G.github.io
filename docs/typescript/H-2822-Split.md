```typescript

type Split<S extends string, SEP extends string> = [S, string] extends [string, S] ? string[] : [S] extends [SEP] ? [] : S extends `${infer F}${SEP}${infer L}` ? [F, ...Split<L, SEP>] : [S]

```

其实直接分数组很简单 他还要求在拆分数组的基础上面在进行''和string的处理其他的难度就没啥了
