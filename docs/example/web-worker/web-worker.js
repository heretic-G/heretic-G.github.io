
self.addEventListener('message', function (e) {
    let time = self.performance.now() | 0
    const arr = new Array(5000000).fill(1).map(curr => {
        return Math.random() * 500000 | 0
    })
    arr.sort((prev, next) => prev - next)
    self.postMessage(`${time}----${(self.performance.now() | 0) - time}----${e.data}`)
})

