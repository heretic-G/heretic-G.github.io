```javascript

let parent = {
    _name: 'parent',
    get name () {
        return this._name
    }
}
let child = Object.create(parent)
child._name = 'child'
console.log(child.name)
// 返回'child'

let parent = {
    _name: 'parent',
    get name () {
        return this._name
    }
}
let Child = new Proxy(parent, {
    get (target, key) {
        return target[key]
    }
})
let child = Object.create(Child)
child._name = 'child'
console.log(child.name)
// 返回'parent'

```

在代理中如果直接返回会导致this变更位返回的target的this 这里可以使用Reflect的get 来保证返回的this一致


```javascript

let parent = {
    _name: 'parent',
    get name () {
        return this._name
    }
}
let Child = new Proxy(parent, {
    get (target, key, receiver) {
        return Reflect.get(target, key, receiver)
    }
})
let child = Object.create(Child)
child._name = 'child'
console.log(child.name)
// 返回'child'

```

Reflect.set 会返回操作是true还是false

```javascript

let a = {name: 3}
Object.freeze(a)
a.name = 4
// 非严格会静默失败

'use strict'
let a = {name: 3}
Object.freeze(a)
a.name = 4
// 严格会报错

let a = {name: 3}
Object.freeze(a)
Reflect.set(a, 'name', 5)
// 会返回操作的结果 可以让开发者基于结果去做处理

```