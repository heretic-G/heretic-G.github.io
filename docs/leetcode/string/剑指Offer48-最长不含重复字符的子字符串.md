```javascript

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let map = new Map()
    let maxL = 0
    let left = 0
    for (let i = 0;i < s.length; i++) {
        if (map.has(s[i])) {
            maxL = Math.max(maxL, map.size)
            while (map.has(s[i])) {
                map.delete(s[left])
                left += 1
            }
        }
        map.set(s[i], 1)
    }
    maxL = Math.max(maxL, map.size)
    return maxL
};

```