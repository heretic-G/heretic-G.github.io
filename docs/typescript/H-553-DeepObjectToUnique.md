```typescript


type DeepObjectToUniq<O extends object> = {
  [key in keyof O]: O[key] extends object ? DeepObjectToUniq<O[key]> & {
    _uniq: [O, key]
  } : O[key]
}


```

没搞定 看了他们的回答发现需要&一个特殊的obj以保证A和B的类型不相等...看到这真的笑了...打开眼界

