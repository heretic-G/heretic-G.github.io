

我是基于原型继承的方式 实现 

其实更好的是使用obj 直接

    {
        data: data,
        option: method
    }

这样的话 其实直接存在this  但是看别人实现过了 所以换个方式 

这里遇到一个问题就是不分Array的api其实会造成返回的数组是新的
这些行为会导致原有生成的原型继承方法会丢失 需要从新的封装 感觉这里是个坑 需要注意
```javascript
const data = [
    {userId: 8, title: 'title1'},
    {userId: 11, title: 'other'},
    {userId: 15, title: null},
    {userId: 19, title: 'title2'}
];

// 查找data中，符合where中条件的数据，并根据orderBy中的条件进行排序
const result = find(data).where({
    "title": /\d$/   // 这里意思是过滤出数组中，满足title字段中符合 /\d$/的项
}).orderBy('userId', 'desc');  // 这里的意思是对数组中的项按照userId进行倒序排列

const find = (data) => {
    let dealFun = {
        where () {
            return this.returnVal({})
        },
        orderBy () {
            return this.returnVal({})
        },
        find() {
            return this.returnVal({})
        },
        returnVal (obj) {
            Object.setPrototypeOf(obj, dealFun)
            return obj
        }
    }
    Object.setPrototypeOf(data, dealFun)
    return data.find()
}
find(data).where({ title: 123 }).orderBy('userId', '123')


// 简单的多属性排序
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


```

find返回实际就是返回一个携带这些方法的对象 每次处理后挂载方法返回 
