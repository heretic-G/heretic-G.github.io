### Shadow Dom

shadow dom其实很简单

就一个API 挂载在Element下面 attachShadow 存在两个参数 

shadowRootInit: { node: boolean } delegatesFocus: boolean

mode 只是影响shadow host 里面有没有shadowRoot(这里其实意义不大)

delegatesFocus 处理焦点问题

不是所有的dom都可以添加shadow dom 而且根据实际情况 一个dom添加完shadow dom 
那么就不能展示其他的dom了


### Custom Elements

CustomElementRegistry存在4个方法 都放在了 window.customElements

##### CustomElementRegistry.define()
创建一个新的元素 完全自定义或者 继承一个已经存在的element

    name string 中间必须存在- 

    constructor 构造函数 需要继承HTMLElement 或者 你继承的Element

    options? { extends } 如果是继承的这里需要告诉是谁

继承还有一个麻烦事createElement 之类也需要写出来

##### CustomElementRegistry.get()

获取元素构造函数

##### CustomElementRegistry.upgrade()


#### 生命周期

1. connectedCallback        // 首次插入
2. disconnectedCallback     // 删除
3. adoptedCallback          // 插入新文档
4. attributeChangedCallback // 添加、删除、修改属性


### Templates and Slots

template 里面的元素不会触发正常的逻辑 这里的意思是dom不会加载 style 不会合并到css tree 资源指向不会触发下载

slot就是槽的意思 可以通过自定义标签里面的name 插入到里面 slot 插槽的dom的css依赖外部的样式
