```javascript

var mySqrt = function(x) {
  let left = 0
  let right = x
  while ((left | 0) !== (right | 0)) {
    let mid = (left + right) / 2
    let result = mid ** 2
    if (result === x) return Math.round(mid)
    if (result < x) {
      left = mid
    } else {
      right = mid
    }
  }
  return left | 0
};

```

就是二分计算 这里计算上 我的逻辑是直接算 然后 整数相等直接跳出来 就完事了 
