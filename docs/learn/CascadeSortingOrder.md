文章推荐
* [the-future-of-css-cascade-layers-css-at-layer](https://www.bram.us/2021/09/15/the-future-of-css-cascade-layers-css-at-layer/#taming-the-cascade)
* [css-cascade-5](https://drafts.csswg.org/css-cascade-5/#cascading)

css的层叠排序规则

### Origin and Importance

Origins
  1. Author Origin
  2. User Origin
  3. User-Agent Origin
  4. Animation Origin
  5. Transition Origin
---
    
  可以看到important 在origin中具有翻转的

  1. css-transitions
  2. Important user agent
  3. Important user
  4. Important author
  5. Animation
  6. Normal author
  7. Normal user
  8. Normal user agent
  
### Context

  目前这一层我能找到的只有shadow dom 但是shadow dom 存在一个问题是他的整体样式
  外部并不能改变 也就是隔离的效果(目前测试只有* 的外层标签名可以加一个类似全局的效果)
  那怎么去体现优先级呢 可能还没有理解

### Element Attached Styles

  写在dom上的style

### Layers

  @layer搞的 顺序最后的优先级越高

  这里有个特性 important 也会翻转优先级

  如果一个是style 一个是id 那肯定style 展示 加上important也是style

  但是layer就和origin一样A > B 加上important就是B大于A了

### Specificity

  特性也就是

  id
  class | attribute | pseudo-class
  type | pseudo-element

### Order of Appearance

  顺序

通用选择器 (*)，组合符 (+, >, ~, ' ')，和否定伪类 (:not) 不会影响优先级

