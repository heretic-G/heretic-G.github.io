.......看到题 脑子一片空白 

剩下都是分析别人的答案 学习内容 先给出答案 

```typescript

type mergeObj<D, C, M> = D & M & {
  [key in keyof C]: C[key] extends () => infer R ? R : never
}

type options<D extends Record<string, any>, C extends Record<string, Function>, M extends Record<string, Function>> = {
  data: (this: void) => D;
  computed: C & ThisType<mergeObj<D, C, M>>;
  methods: M & ThisType<mergeObj<D, C, M>>;
}

declare function SimpleVue<D extends Record<string, any>, C extends Record<string, Function>, M extends Record<string, Function>>(options: options<D,C,M>): any

```
一步一步来 `data`是一个函数返回对象 这里其实函数意义不大 因为`vue`会把`data`的`return`绑定到`this`上 方便实用
而函数是防止多次复用组件导致公用数据的问题 所以这里`return`才是关键

我想到了`methods`是声明`Record<string, Function>` 但是我没想到其实`computed`的结构是相同的 不过这里需要的也是`return`

然后就是挂载`this` 这里有个`ThisType`的知识点 `computed`和`methods`都是对象 需要关联上其他`this`的数据

还有一个就是`data`中是不能调用`this`的 这里有个知识点是函数可以`(this: void)`来标注这个函数的`this`的值
