

npm 在做包依赖分析的时候 现在都是扁平的 按照顺序的 也就是默认都是安装到最外层 如果最外层存在并且不能合并就会在自己的下面在安装一个 

依赖的顺序会导致可能存在体积扩大的可能性  比如A 依赖B@1.0.0  而C D都是依赖B@2.0.0 因为A先安装会导致 CD都要在自己的下面单独安装

这时候npm需要 ddp 来优化

这里yarn和npm存在个差异就是 yarn会在install的时候直接dedupe 而不需要单独的dedupe

#### dependencies

    在依赖包中声明的这些 会安装下来 依赖的过程是按照顺序的 如果多个包可以和一个 如果不同的版本 会依赖顺序 最开始的安装最外层 
    然后安装在包下 npm 可以使用ddp去优化 yarn好像是每次add都会去处理这个

#### devDependencies

    依赖包中不安装 这个是开发依赖中的开发环境使用的

    使用 --production 或者 NODE_ENV 为production

#### peerDependencies

    外部判断是不是存在 如果不存在 7及以上会自动安装 冲突会报错 实际作用就是防止多版本的包存在 把包从dependencies 移到外部
    

#### bundledDependencies

    一个数组 会把数组内的包也打入进来 在dependencies也存在 
    但是使用publish 这个属性不会生效 只是作用在pack

#### optionalDependencies

    可选安装 就算是安装失败也无所谓不会报错..目前还没看到哪个库会存在这个 


#### resolutions

    会导致所有的库都是以这个版本为主 这个会大幅降低一些库的大小 但是可能会因为统一版本号带来潜在的隐患 
    看了下 好像只是yarn支持