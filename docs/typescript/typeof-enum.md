
枚举在typeof 后会使一个什么类型？

这个问题是在使用的时候产生的疑问

```typescript

enum Data {
  aa,
  cc = 1001,
  bb,
  ee
}

type enumToObj<T> = {
    [key in keyof T]: T[key]
}
type test = enumToObj<typeof Data>
// type test = {
//     [x: number]: string;
//     readonly aa: a.aa;
//     readonly cc: a.cc;
//     readonly bb: a.bb;
//     readonly ee: a.ee;
// }

```

看完例子可以看到结果其实想下枚举的创建过程 一个对象 在没有val时候使用0开始的顺序
存在number 接着number开始 如果是一个非number 这里后面必须设置值 不设置会报错

在类型上 测试了一轮 其实类型应该是一个拼接类型 大概就是下面这样

```typescript

type mockType = {
    aa: 0,
    cc: 1001,
    bb: 1002,
    ee: 1003
} & {
    [key in number]: string
}

type test1 = enumToObj<mockType>
// type test1 = {
//     [x: number]: string;
//     aa: 0;
//     cc: 1001;
//     bb: 1002;
//     ee: 1003;
// }

```
