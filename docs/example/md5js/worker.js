importScripts('./comlink.js')
importScripts('./md5.js')


function calculate (buffer) {
    let sparkBuffer = new SparkMD5.ArrayBuffer()
    sparkBuffer.append(buffer)
    return sparkBuffer.end()
}
let index = -1
self.addEventListener('message', function (e) {
    index = e.data.index
    self.postMessage({
        payload: calculate(e.data.payload),
        index
    })
})

// Comlink.expose(calculate)