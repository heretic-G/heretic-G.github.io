- \_\_webpack_modules__         对象 包含了除入口外的所有模块，示例中即 a.js 模块
- \_\_webpack_module_cache__    对象 用于存储被引用过的模块
- \_\_webpack_require__         函数 实现模块引用(require) 逻辑
- \_\_webpack_require__.d       工具函数 实现将模块导出的内容附加的模块对象上
- \_\_webpack_require__.o       工具函数 判断对象属性用
- \_\_webpack_require__.r       工具函数 在 ESM 模式下声明 ESM 模块标识

异步加载会使用的
- \_\_webpack_require__.e       逻辑上包裹了一层中间件模式与 promise.all ，用于异步加载多个模块
- \_\_webpack_require__.f       供 \_\_webpack_require__.e 使用的中间件对象，例如使用 Module Federation 特性时就需要在这里注册中间件以修改 e 函数的执行逻辑
- \_\_webpack_require__.u       用于拼接异步模块名称的函数
- \_\_webpack_require__.l       基于 JSONP 实现的异步模块加载函数
- \_\_webpack_require__.p       当前文件的完整 URL，可用于计算异步模块的实际 URL

这里可以看到