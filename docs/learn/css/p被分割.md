在[html规范](https://html.spec.whatwg.org/multipage/grouping-content.html#the-p-element)
中p 存在被闭合的元素 有一大片 


这里在被闭合的时候在[Text-level](https://html.spec.whatwg.org/multipage/text-level-semantics.html#text-level-semantics)
类的标签会在被分割的两边在次包裹 这里主要是text level 主要都是文本效果的标签 这里是为了防止效果失效

```html
// text level
<p>
    <a href="">
        <div></div>
    </a>
</p>

// 非 text level

<p>
    <meter>
        <div></div>
    </meter>
</p>

```

有没有能够包含的呢...我还真找出来一个(无意中测试的 没有发现特殊的)

```html
<p>
    <button>
        <div></div>
    </button>
</p>

```

但是没有发现哪类会不触发这个逻辑...或者那个逻辑会停止打断...
