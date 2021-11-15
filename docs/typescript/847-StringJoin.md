```typescript

type arrTostr<A extends string[], P extends string = ''> = A extends [F: infer First, ...rest: infer R] ? `${First & string}${P}${ R extends string[] ? arrTostr<R, P> : ''}` : ''

type removeLast<S extends string, P extends string> = S extends `${infer R}${P}` ? R : S

declare function join<P extends string>(delimiter: P): <A extends string[]>(...parts: A) => removeLast<arrTostr<A, P>, P>;


```
实现join  我的思路就是基本的顺着流程 每个添加然后最后判断去除下 很简单的一题也是

别人的思路 具体的差异在于 拼接字符串的地方 有个方案看数组是不是1个的 不是那就是2+ 直接
`${F}${Separator}` 1个就直接返回 这样判断少了单独的去处最后末尾的多余符号的问题
