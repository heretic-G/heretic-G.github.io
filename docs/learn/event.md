[补充] 如果passive设置为true 那其实preventDefault 就会无效 因为 passive 为true 会导致初始化的时候cancelable为false

event.preventDefault 不能取消的没有固定哪一个类 主要是在规范中有没有定义Default Action 还有即使是定义了Default Action
那在实际中可能也会在不同的触发时间存在或不存在默认行为 所以可以依赖event.cancelable 来处理Default Action

如果只是简单列举下 具体可以去 https://w3c.github.io/uievents/#events-wheelevents 自己看看 当然不是全部event这里都有我就不都粘这里了

UI Event

    load
    unload
    abort
    error
    select
Focus Event

    blur
    focus
    focusin
    focusout
Mouse Event

    dbclick
    mousedown   部分情况
    mouseenter
    moouseleave
    moousemove
    mouseout
    mouseleave
    mouseup     鼠标左右
Input Event

    input
Keyboard

    keydown 部分情况
    keyup
Composition Event

    compositionupdate
    compositionend

Touch Event

    touchstart
    touchend    部分情况
    touchmove
    touchcancel	



Touch Event
    
    touchstart
    touchend    部分情况
    touchmove
    touchcancel	

scroll 规范中没有定义他的Event归属 其实算是wheel的后续操作


检查能不能取消默认事件可以使用 cancelable

是否被取消了默认事件defaultPrevented

取消默认 preventDefault 或者 e.returnValue = false

正常一个event是带有7个tag

stop propagation flag   =>  stopPropagation | cancelBubble | stopImmediatePropagation

stop immediate propagation flag     =>      stopImmediatePropagation

canceled flag   =>  returnValue设置false 会导致这里是false | preventDefault

in passive listener flag    =>  passive是在addEventListener的第三个config里面可以设置

composed flag   =>  用来指示该事件是否可以从 Shadow DOM 传递到一般的 DOM

initialized flag    没有理解

dispatch flag




https://www.w3.org/TR/DOM-Level-3-Events/#event-flow-default-cancel

Many implementations additionally interpret an event listener’s return value, such as the value false, to mean that the default action of cancelable events will be cancelled (though window.onerror handlers are cancelled by returning true).
许多实现额外解释事件侦听器的返回值，例如值 false，表示可取消事件的默认操作将被取消（尽管 window.onerror 处理程序通过返回 true 被取消）。

一部分规范资料地址

https://w3c.github.io/uievents/#events-wheelevents

https://dom.spec.whatwg.org/#dom-event-preventdefault
