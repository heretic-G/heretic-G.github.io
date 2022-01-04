```javascript

export class Solution {

  /**
   * aplusb
   *
   * @param a: An integer
   * @param b: An integer
   * @return: The sum of a and b 
   */
  aplusb(a, b) {
    while (a & b) {
        let temp = (a & b) << 1
        a = a ^ b
        b = temp
    }
    return a | b
  }

}

```

其实就是二进制加法&的需要进位 ^的就是不动的位 如果进位和不动的位还需要在处理就重复逻辑
