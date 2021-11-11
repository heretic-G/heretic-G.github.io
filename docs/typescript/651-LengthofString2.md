```typescript

type LengthOfString<S extends string, Arr extends string[] = []> = 
    S extends `${infer A}${infer B}${infer C}${infer D}${infer E}${infer F}${infer G}${infer H}${infer I}${infer J}${infer K}` ? LengthOfString<K, [A,B,C,D,E,F,G,H,I,J, ...Arr]> 
        : S extends `${infer AA}${infer ZZ}` ? LengthOfString<ZZ, [AA, ...Arr]> : Arr['length']

```

我真的...这里了解到一个限制就是不能超过45次 那也就是老的方式实现的最多只能支持45的string 获取长度 

然后这题要支持百的长度 咋办呢...一次多取点这样就可以搞的很长了...我竟无言以对

而且目前我觉得只有这个方式 只有一次多搞点才能满足需求不然都会导致循环次数不够用 
