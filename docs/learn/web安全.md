[安全指导](https://infosec.mozilla.org/guidelines/web_security)


#### cors

跨域 被请求方允许可以访问他，这个是保护的被请求方

[文章](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
可以仔细看看这个文章 关于简单和非简单 preflight cookie携带

#### csp

阻止除自己以外的资源加载
保护自己

限制加载资源的来源

#### HTTPS

在http和tcp中增加一层加密解密层 实现在传输中是密文

坏处是成本 https 需要在上面在建立tls连接 需要去找ca机构认证和数字证书

好处是安全

但是https也不是不存在问题 首先是秘钥问题服务端不能丢失 然后是ca机构需要是一个可信度 安全性高的

实际客户端和服务端连接就是靠ca去完成

还有就是代理人 如果在中间他可以和服务端建立https连接 和客户端建立http连接 

#### HSTS
    
只能在https中设置设置后在访问默认会本地307到https然后发起请求

拒绝http链接 拒绝不安全的证书

减少了第一次需要服务器去做重定向的时间 防止中间人会通过第一次http的请求去删除hsts的头信息 防止被设置上 导致浏览器可以让用户去使用
非安全证书和http访问

可以加入pre list 但是有风险 一旦设置出现问题 这玩意短时间撤不下来

#### cookie

domain path Secure httponly samesite
前缀 __Secure __Host

#### csrf

其实也就是跨域请求 携带了cookie 导致使用用户权限做了一些事情

referer check下 不过因为隐私问题 可能被用户关闭 

那就是携带token 正常凭证在cookie中那就可能被默认携带



#### xss

无论是存储还是反射其实防御都是对于输入输出进行编解码

#### Authorization

感觉没有别的特别的好处 只是规范定义给他 但是没有找到别的依赖与他的其他保障

#### Subresource Integrity

资源完整校验 浏览器在加载完资源后会校验资源完整 不完整不会接受

#### X-Frame-Options

约束怎么被嵌入到页面中 
