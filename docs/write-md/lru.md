```javascript



function LRU (size = 10) {
  this.size = size
  this.cache = []
  this.cacheMap = new Map()
}

LRU.prototype.set = function (key, value) {
  if (this.cacheMap.has(key)) {
    let index = this.cacheMap.get(key)
    let temp = this.cache[index]
    for (let i = 1;i < index + 1; i++) {
      this.cache[i] = this.cache[i - 1]
      this.cacheMap.set(this.cache[i].key, i)
    }
    this.cache[0] = temp
    this.cacheMap.set(key, 0)
  } else {
    let map = new Map()
    let limit = Math.min(this.cache.length + 1, this.size)
    let arr = Array(limit)
    arr[0] = {
      key,
      value: value
    }
    map.set(key, 0)
    for (let i = 1; i < limit; i++) {
      arr[i] = this.cache[i - 1]
      map.set(arr[i].key, i)
    }
    this.cache = arr
    this.cacheMap = map
  }
}

LRU.prototype.get = function (key) {
  if (this.cacheMap.has(key)) {
      let index = this.cacheMap.get(key)
      let temp = this.cache[index]
      for (let i = 1;i < index + 1; i++) {
          this.cache[i] = this.cache[i - 1]
          this.cacheMap.set(this.cache[i].key, i)
      }
      this.cache[0] = temp
      this.cacheMap.set(key, 0)
      return temp.value
  }
  return undefined
}

```

基本依赖key去生成缓存 然后基于key去获取

每次存在扔到最上面不存在扔到最上面

超出的直接删除


```javascript

class LRU {
    constructor(size) {
        this.size = size
        this.cache = new Map()
    }

    set (key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key)
        } else {
            if (this.size <= this.cache.size) {
                this.cache.delete(this.cache.keys().next().value)
            }
        }
        this.cache.set(key, value)
    }
    get (key) {
        if (this.cache.has(key)) {
            let value = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, value)
            return value
        }
    }
}


```

看到一个map方案 更简单