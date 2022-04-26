```typescript

type divideZero<N extends string> = N extends `0${infer Rest}` ? divideZero<Rest> : N
type BinaryDivideOne<N extends string, D extends string = ''> = 
  N extends `${infer F}0` 
  ? BinaryDivideOne<F, `1${D}`> 
  : N extends `${infer F}1` 
    ? `${F}0${D}` 
    : '0'
type BinaryToDecimal<S extends string, A extends ReadonlyArray<unknown> = []> = divideZero<S> extends '' ? A['length'] : BinaryToDecimal<BinaryDivideOne<S>, [...A, 1]>

```

其实要么走加法 要么走减法

我走的减法 每次数组增加 二进制减少1 然后判断是不是到0了 到了就是这个数
