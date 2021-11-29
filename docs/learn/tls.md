签名
就是把明文P hash => H
H 加密 => S

S + P => 数字证书


数字签名是 明文 + hash + 加密

数字证书就是

颁布信息 + hash + 加密 => 签名

铭文+ 签名 === 数字证书

TLS 分为 RAS  DH  和ECDHE

RAS 里面 第三个随机数的安全完全依靠 服务器的私钥不会被泄露 如果泄露
那之前所有的加密都可以被破解 这也就是 RAS 不支持向前安全

DH 非对称
DHE 因为静态DH不具备向前安全 所以每次都声称新的

ECC 椭圆曲线特性 椭圆曲线满足 乘法交换和结合律
ECDHE ECC+DHE
随机数  ->
<- 随机数 椭圆曲线 G点 服务端公钥
客户端公钥  ->

会话秘钥是 客户端随机数 服务端随机数 ECDHE 算法算出的共享密钥 生成密钥


http2已经不支持不向前安全的密钥交换或者生成协议

只是简单的笔记记录 

具体文章 

[文章1](https://www.cnblogs.com/zipxzf/articles/14336313.html)
[文章1](https://www.cnblogs.com/zipxzf/articles/14346467.html)
