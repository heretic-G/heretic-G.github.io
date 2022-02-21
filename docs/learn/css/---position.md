目前是5个值 

positioning schemes 一共5个值 

positioned box

##### static 

##### relative 
相对定位 这里实质不会对周边产生影响 不过可能会增加父元素 可滚动溢出区(scrollable overflow area)

##### sticky 
这里其实是基于 scroll container’s scrollport(大概就是滚动容器的滚动窗口) 这个窗口是对外展示的内容大小 粘性定位就是基于这里去做的定位

##### absolute 他只依赖于绝对定位包含块

默认开始位置看是否是inline box 不是的话 比如block 就是padding edge



##### fixed 