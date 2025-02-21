#### history.scrollRestoration  [](浏览器滚动 自动 禁止)
    
    参数 auto manual
    防止浏览器恢复滚动条位置
    当前history需要根据url参数去滚动页面 这里会冲突 需要停止滚动恢复 
    当前页面数据异步layout会出现大幅抖动 这里也不期望上来滚动 因为滚动位置和之前的预期可能不符合 
    下拉加载页面不期望恢复 这里有时候会导致页面往下自动拉取过多的分页数据 触发一些频限行为


#### history 的记录包括iframe的url变更

    parent      /p/a    /p/a    /p/b          
    iframe      /i/a    /i/b    /i/b
    这里整个histroy是 3 
    回退会从/p/b + /i/b -> /p/a + /i/b -> /p/a + /i/a
    所以如果存在iframe的页面 为了保持浏览器刷新作用 需要用replaceState来更新parent的url
