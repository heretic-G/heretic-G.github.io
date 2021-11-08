联合转交叉 

```typescript

type data = {
    name: string
}

type data1 = {
    age: number
}

type transform<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer R) => void ? R : never

type test = transform<'age' | 'name'> // never
type test1 = transform<data | data1> // data & data1

```

这里用了函数参数的逆变逻辑 不过有一点需要注意 在实现的逻辑中不能拆分两个extends
```typescript

type transform1<U> = U extends unknown ? (k: U) => void : never

type transform2<U> = U extends (k: infer R) => void ? R : never

type test2 = transform2<transform1<'age' | 'name'>> // "age" | "name"

```

这里是因为第一个extends在完成后 这里在第二个extends的时候其实没有做分发 虽然是联合类型 而拆开后是会做分发的(具体逻辑还没明白 因为分发是一种逻辑分发)

也就是说要相同的效果需要处理下不让他做分发

```typescript
type transform3<U> = U extends unknown ? [(k: U) => void] : never

type transform4<U> = U extends [(k: infer R) => void] ? R : never

type test3 = transform4<transform3<'age' | 'name'>> // never

```
