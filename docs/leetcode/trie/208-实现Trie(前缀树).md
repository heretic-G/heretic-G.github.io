```javascript

var Trie = function() {
    this.children = {}
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word = '') {
    let node = this.children
    for (let i =0;i<word.length; i++) {
        let char = word[i]
        if (!node[char]) {
            node[char] = {}
        }
        node = node[char]
    }
    node.isEnd = true
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word = '') {
    let node = this.children
    for (let i = 0; i < word.length; i++) {
        if (!node[word[i]]) return false
        node = node[word[i]]
    }
    return !!node.isEnd
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix = '') {
let node = this.children
    for (let i = 0; i < prefix.length; i++) {
        if (!node[prefix[i]]) return false
        node = node[prefix[i]]
    }
    return true
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

```

第一次真的独立完成一个trie 显示看了别人的思路然后自己再写的 

一直都知道这个结构 但是从没写过 这其实就是理论到实际 其实整体构造下来还是很快的 也不难 

我这里是每次判断不存在直接增加的也可以直接找个工厂 每次返回一个全量结构的对象 这样其实在里面可能速度会更快吧 但是空间会更多一些
