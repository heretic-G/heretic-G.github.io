importScripts('./comlink.js')
importScripts('./hash-wasm.js')


async function calculate (buffer) {
    let sparkBuffer = await hashwasm.createMD5()
    const view = new Uint8Array(buffer);
    sparkBuffer.update(view)
    return sparkBuffer.digest()
}
let index = -1
self.addEventListener('message', async function (e) {
    index = e.data.index
    let payload = await calculate(e.data.payload)
    self.postMessage({
        payload: payload,
        index
    })
})

// Comlink.expose(calculate)