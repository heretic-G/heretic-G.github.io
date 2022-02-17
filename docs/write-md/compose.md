这里主要学习两种一种是redux 一种是koa的
```javascript

function compose (...funArr) {
    return function (...args) {
        let result = args
        for (let i = 0;i < funArr.length;i++) {
            if (typeof funArr[i] === 'function') {
                result = [funArr[i](...result)]
            }
        }
        return result.length === 1 ? result[0] : result
    }
}

```
```javascript

function compose (middleware) {
  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

```
