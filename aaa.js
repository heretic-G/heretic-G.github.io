var productExceptSelf = function(nums) {
  let n = nums.length
  let result = Array(n)
  let curr = nums[0]
  result[0] = 1
  for (let i = 1; i < n; i++) {
    result[i] = result[i - 1] * curr
    curr = nums[i]
  }
  curr = 1
  for (let i = n - 1;i >= 0; i--) {
    result[i] = result[i] * curr
    curr *= nums[i]
  }
  return result
};

// console.log(productExceptSelf([-1,1,0,-3,3]))
var nthSuperUglyNumber = function(n, primes) {
  let result = [1]
  let pos = Array(primes.length).fill(1)
  let temp = [...primes]
  let l = temp.length
  let map = {}
  function getMin () {
    let index = 0
    for (let i = 1; i < l; i++) {
      if (temp[i] < temp[index]) {
        index = i
      }
    }
    return index
  }
  let i = 0
  while (result.length < n) {
    let index = getMin()
    let data = temp[index]
    pos[index] += 1
    if (!map[data]) {
      result.push(data)
      map[data] = 1
    }
    temp[index] = result[pos[index] - 1] * primes[index]
  }
  return result[n - 1]
};
// console.log(nthSuperUglyNumber(12, [2,7,13,19]))
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */

var findAnagrams = function(s, p) {
  let pMap = { length: 0}
  let result = []
  for (let i = 0; i < p.length; i++) {
    let s = p[i]
    if (!pMap[s]) {
      pMap[s] = 0
    }
    pMap[s] += 1
    pMap.length += 1
  }
  let left = 0
  let right = 0
  let tMap = {...pMap}
  while (right < s.length) {
    if (tMap[s[right]] === undefined) {
      tMap = {...pMap}
      right += 1
      left = right
    } else {
      if (tMap[s[right]] === 0) {
        tMap[s[left]] += 1
        tMap.length += 1
        left += 1
      } else {
        tMap[s[right]] -= 1
        tMap.length -= 1
        right += 1
        if (tMap.length === 0) {
          result.push(left)
        }
      }
    }
  }
  return result
};


// console.log(findAnagrams("abab", "ab"))

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

// console.log(mySqrt(8))
// console.time()
// let map = new Map()
// for (let i = 0; i < 10000000;i++) {
//
//   map.set(String(Math.random() * 100000000 | 0), Math.random() * 1000000 | 0)
// }
// console.timeEnd()
// console.time()
// map.get('31231241')
// console.timeEnd()
// console.time()
// map.get('3123124111')
// console.timeEnd()
// console.log(map.size)


var findDisappearedNumbers = function(nums) {
  let n = nums.length
  for (let i = 0; i < n; i++) {
    nums[(nums[i] - 1) % n] += n
  }

  let result = []
  for (let i = 0; i < n; i++) {
    if (nums[i] <= n) {
      result.push(i + 1)
    }
  }
  return result
};

// findDisappearedNumbers([4,3,2,7,8,2,3,1])


var findDuplicate = function(nums) {
  let slow = 0
  let fast = 0
  slow = nums[slow]
  fast = nums[nums[fast]]
  while (slow !== fast) {
    slow = nums[slow]
    fast = nums[nums[fast]]
  }
  let next = 0
  while (next !== slow) {
    next = nums[next]
    slow = nums[slow]
  }
  return next
};

// console.log(findDuplicate([1,3,4,2,2]))


var addTwoNumbers = function(l1, l2) {
  let result = []
  let next = 0
  while (l1 || l2) {
    let l1N = l1 && l1.val || 0
    let l2N = l2 && l2.val || 0
        console.log(l1N, l2N)
    let num = l1N + l2N + next
    if (num > 9) {
      num -= 10
      next = 1
    } else {
      next = 0
    }
    result.push(num)
    l1 = l1 && l1.next
    l2 = l2 && l2.next
  }
  if (next === 1) result.push(1)
  return result
};

// console.log(addTwoNumbers({val: 2, }, {val: 2, next: {val: 5}}))


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  let minDeep
  function dfs (root, deep) {
    if (!root) {
      console.log(minDeep, deep, Math.abs(deep - minDeep))
      if (!minDeep) {
        minDeep = deep
        return true
      } else {
        return Math.abs(deep - minDeep) <= 1
      }
    }
    return dfs(root.left, deep + 1) && dfs(root.right, deep + 1)
  }
  return dfs(root, 0)
};

// console.log(isBalanced(buildTree([[1,2,3,4,5,6,null,8]])))


var isHappy = function(n) {
  let map = {}
  n = String(n)
  while (n !== '1' && !map[n]) {
    console.log(n, map)
    map[n] = true
    let sum = 0
    for (let i = 0; i < n.length; i++) {
      sum += Math.pow(n[i], 2)
    }
    n = String(sum)
  }
  return n === '1'
};

// console.log(isHappy(2))




function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function buildTree(nums){
  var root = new TreeNode(nums[0]);
  var queue = [];
  queue.push(root);
  var cur;
  var lineNodeNum = 2;
  var startIndex = 1;
  var restLength = nums.length - 1;
  while(restLength > 0) {
    for (var i = startIndex; i < startIndex + lineNodeNum; i = i + 2) {
      if (i == nums.length) return root;
      cur = queue.shift();
      if (nums[i] != null) {
        cur.left = new TreeNode(nums[i]);
        queue.push(cur.left);
      }

      if (i + 1 == nums.length) return root;
      if (nums[i + 1] != null) {
        cur.right = new TreeNode(nums[i + 1]);
        queue.push(cur.right);
      }
    }
    startIndex += lineNodeNum;
    restLength -= lineNodeNum;
    lineNodeNum = queue.length * 2;
  }
  return root;
}


/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
  this.arr =  nums
  let sumArr = [0]
  let sum = 0
  for (let i = 0;i < nums.length; i++) {
    sum += nums[i]
    sumArr.push(sum)
  }
  this.sumArr = sumArr
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(index, val) {
  if (this.arr.length > index) {
    let num = this.arr[index] - val
    this.arr[index] = val
    for (let i = index; i < this.arr.length; i++) {
      this.sumArr[i + 1] -= num
    }
  } else {
    this.arr[index] = val
    this.sumArr.push(this.sumArr[index] + val)
  }
};

/**
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
  return this.sumArr[right + 1] - this.sumArr[left]
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */
// var obj = new NumArray([1,3,5])
// obj.sumRange(0, 2)
//
// obj.update(1, 2)
// obj.sumRange(0, 2)
// react-query relay Apollo immer


class MaxHeap {
  constructor(arr) {
    this.heap = []
    this.init(arr)
  }

  init (arr) {
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i])
    }
  }
  insert (data) {
    this.heap.push(data)
    let index = this.heap.length - 1
    this.moveUp(index)
  }
  moveUp (index) {
    let pIndex = index - 1 >> 1
    while (pIndex >= 0) {
      if (this.heap[pIndex] < this.heap[index]) {
        let temp = this.heap[index]
        this.heap[index] = this.heap[pIndex]
        this.heap[pIndex] = temp
        index = pIndex
        pIndex = index - 1 >> 1
      } else {
        break
      }
    }
  }
  moveDown (index) {
    while (index < this.heap.length - 1) {
      let left = index * 2 + 1
      let right = index * 2 + 2
      let leftVal = this.heap[left]
      if (leftVal === undefined) {
        leftVal = -Infinity
      }
      let rightVal = this.heap[right]
      if (rightVal === undefined) {
        rightVal = -Infinity
      }
      let max = Math.max(leftVal, rightVal, this.heap[index])
      if (max === this.heap[index]) {
        break
      } else if (max === leftVal) {
        let temp = leftVal
        this.heap[left] = this.heap[index]
        this.heap[index] = temp
        index = left
      } else {
        let temp = rightVal
        this.heap[right] = this.heap[index]
        this.heap[index] = temp
        index = right
      }
    }
  }
  pop () {
    let result = this.heap[0]
    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.moveDown(0)
    return result
  }
}
// let a = new MaxHeap([1,2,3, 4])
// console.log(a)
// console.log(a.pop())
// console.log(a)

function a (arr) {
  let hl = arr[0].length
  let zl = arr.length
  for (let i = 0; i < hl + zl; i++) {
    let left
    let right
    if (i < hl) {
      left = 0
      right = i
    } else {
      left = i - hl + 1
      right = hl - 1
    }
    while (left < zl && right >= 0) {
      left += 1
      right -= 1
    }
  }
}
//
// const data = [
// [1,   2,  3,  4,   5],
// [6,   7,  8,  9,  10],
// [11,  12, 13, 14, 15],
// [16,  17, 18, 19, 20],
// ]
//
// a(data)




















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
    return this.cache[this.cacheMap.get(key)].value
  }
  return undefined
}




const data = [
  { orderId: 19, title: "123", desc: "1" },
  { orderId: 20, title: "456", desc: "4" },
  { orderId: 20, title: "12", desc: "3" },
  { orderId: 19, title: "123", desc: "x1x" },
  { orderId: 18, title: "xxxx", desc: "3" }
];
function find(origin) {
  class Find {
    constructor(origin = []) {
      this.data = origin;
    }
    where(obj) {
      Object.keys(obj).forEach((key) => {
        const regx = new RegExp(obj[key]);
        this.data = this.data.filter((item) => regx.test(item[key]));
      });
      return this;
    }

    orderBy(...args) {
      const orders = args.map((key) => (a, b) => a[key] - b[key]);
      const sortCompose = (a, b) =>
          orders.reduce((acc, fn) => {
            return acc || fn(a, b);
          }, 0);
      return this.data.sort(sortCompose);
    }
  }
  return new Find(origin);
}
console.log(
    "==",
    find(data).where({ title: /\d/, desc: /\d/ }).orderBy("orderId", "desc")
);



const data = [
  { orderId: 19, title: "123", desc: "1" },
  { orderId: 20, title: "456", desc: "4" },
  { orderId: 20, title: "12", desc: "3" },
  { orderId: 19, title: "123", desc: "x1x" },
  { orderId: 18, title: "xxxx", desc: "3" }
];

function orderBy (...args) {
  let type = args.pop()

  data.sort((prev, next) => {
    for (let i = 0;i < args.length; i++) {
      if (prev !== next) {
        let curr = args[i]
        switch (type) {
          case 'desc':
            if (prev[curr] > next[curr]) {
              return -1
            } else {
              return 1
            }
          case 'asc':
            if (prev[curr] > next[curr]) {
              return 1
            } else {
              return -1
            }
        }
      }
    }
    return 0
  })
}
