判断回文数 比想象的容易...

```typescript


type strToArray<S extends string> = S extends `${infer L}${infer R}` ? [L, ...strToArray<R>] : []

type palindromeArr<S extends unknown[]> = S extends [f: infer F, ...args: infer M, l:infer L] ? F extends L ? palindromeArr<M> : false : true

type isPalindromeNum<N extends number> = palindromeArr<strToArray<`${N}`>>

declare function testFun<N extends number> (num: N, result: isPalindromeNum<N>): void

testFun(1, true)
testFun(113, false)
testFun(1221, true)
testFun(121, true)



```
