```typescript

type merge<L, R> = {
  [key in keyof L| keyof R]: key extends keyof R ? R[key] : key extends keyof L ? L[key] : never
}

type Subtraction<A extends ReadonlyArray<unknown>, B extends ReadonlyArray<unknown>> = 
  B extends [...A, ...infer Rest] 
  ? -1
  : A extends [...B, ...infer Rest] 
    ? Rest['length']
    : never

/* _____________ Your Code Here _____________ */
type numToMap<N extends number[], O extends Record<string, number> = {}> = 
  N extends [infer F, ...infer Rest] 
  ? F extends keyof O 
    ? numToMap<Rest extends number[] ? Rest : [], merge<O, {[key in F]: 2 }>> 
    : numToMap<Rest extends number[] ? Rest : [], merge<O, {[key in F extends number ? F : never]: 1 }>>
  : O 
type numToArr<N, A extends ReadonlyArray<unknown> = []> = A['length'] extends N ? A : numToArr<N, [...A, 1]> 
type TwoSum<T extends number[], U extends number, O extends Record<string, number> = numToMap<T>> = 
  T extends [infer F, ...infer Rest] 
  ? Subtraction<numToArr<U>, numToArr<F>> extends infer S 
    ? [S, F] extends [F, S] 
      ? S extends keyof O 
        ? O[S] extends 2 ? true : TwoSum<Rest extends number[] ? Rest : [], U, O>
        : TwoSum<Rest extends number[] ? Rest : [], U, O>
      : S extends keyof O ? true : TwoSum<Rest extends number[] ? Rest : [], U, O>
    : false
  : false

```

感觉自己搞的很蠢...应该有更好的办法

发现个减法 但是目前只能返回正数 不能返回负数
