flex 布局属性设置分为容器和item (这里只是一个记录 和绝大多数的基础文章没有啥差异)

#### 容器
1. flex-direction

    row 默认值 主轴是水平 左向右 
   
    row-reverse 右向左
   
    column 主轴是垂直 上向下
   
    column-reverse 下向上
   
2. flex-wrap
   
   nowrap 默认 不换行
   
   wrap 换行 第一行在上
   
   wrap-reverse 换行 第一行在下

3. flex-flow
   
    flex-direction || flex-wrap 默认 row nowrap
   
4. justify-content 主轴的对齐方式

   flex-start  开始端
   
   flex-end 结束端
   
   center 居中
   
   space-between item中间有间隙
   
   space-around 四周有间隙
   
5. align-items 交叉轴对齐方式

   flex-start 开始端
   
   flex-end 结束端
   
   center 居中
   
   baseline item第一行的文字基线
   
   stretch 未设置高度或者为auto 为100%
   
6. align-content 多根轴线对齐方式

   flex-start 开始端
   
   flex-end 结束端
   
   center 居中
   
   space-between 只有轴线中有间距
   
   space-around 轴线四周都存在间距
   
   stretch 铺满

#### item
1. order
   
    数值越小 越靠前
2. flex-grow
   
    放大比例 默认是0 有剩余也不放大
3. flex-shrink
   
    缩小比例 默认是1 0的不缩小
4. flex-basis
   
    占据的空间 默认是auto
5. flex

   none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
   
   默认值 0 1 auto
   
   auto 是 1 1 auto
   
   none 是 0 0 auto
   
6. align-self 默认值是auto也就是父元素的如果父元素没有就是stretch

   auto
   
   flex-start
   
   flex-end
   
   center
   
   baseline
   
   stretch
