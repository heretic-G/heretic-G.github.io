



const btn = document.querySelector('#calculate')
const workerBtn = document.querySelector('#webWorker')
const workerWasmBtn = document.querySelector('#webWorkerWasm')
const fileEl = document.querySelector('input')
const addIdEl = document.querySelector('#addId')
const step = 5 * 1024 * 1024
const workerLimit = navigator.hardwareConcurrency || 4

let num = 0

setInterval(() => {
    num += 1
    addIdEl.innerText = num
}, 1000)

workerBtn.addEventListener('click', function () {
    workerMd5('worker')
})

workerWasmBtn.addEventListener('click', function () {
    workerMd5('workerWasm')
})

function workerMd5 (name) {
    console.time('worker')
    const arr = Array(Math.ceil(fileEl.files[0].size / step))
    const workerFreeSet = new Set()
    const datMap = new Map()
    let start = 0
    let index = 0
    let success = -1
    let readSuccess = false
    for (let i = 0; i < workerLimit; i++) {
        let worker = new Worker(`./${name}.js`)
        workerFreeSet.add(worker)
        worker.addEventListener('message', function (e) {
            success += 1
            arr[e.data.index] = e.data.payload
            workerFreeSet.add(worker)
            useWorker()
            if (readSuccess && success === index) {
                let all = new SparkMD5()
                all.append(arr.join(''))
                workerFreeSet.forEach(curr => {
                    curr.terminate()
                })
                console.log(all.end())
                console.timeEnd('worker')
            }
        })
    }
    const fileReader = new FileReader()
    fileReader.addEventListener('loadend', async (e) => {
        datMap.set(index, e.target.result)
        useWorker()
        if (start >= fileEl.files[0].size) {
            readSuccess = true
            return
        }
        start += step
        index += 1
        fileReader.readAsArrayBuffer(fileEl.files[0].slice(start, start + step))
    })
    fileReader.readAsArrayBuffer(fileEl.files[0].slice(start, start + step))
    function useWorker () {
        if (datMap.size > 0 && workerFreeSet.size) {
            let worker = workerFreeSet.values().next().value
            let index = datMap.keys().next().value
            let buffer = datMap.get(index)
            datMap.delete(index)
            workerFreeSet.delete(worker)
            worker.postMessage({
                index,
                payload: buffer
            }, [buffer])
        }
    }
}


btn.addEventListener('click', function () {
    console.time('md5')
    let start = 0
    const fileReader = new FileReader()
    let str = ''
    fileReader.addEventListener('loadend', async (e) => {
        let sparkBuffer = new SparkMD5.ArrayBuffer()
        sparkBuffer.append(e.target.result)
        str += sparkBuffer.end()
        if (start >= fileEl.files[0].size) {
            let all = new SparkMD5()
            all.append(str)
            console.log(all.end())
            console.timeEnd('md5')
            return
        }
        start += step
        fileReader.readAsArrayBuffer(fileEl.files[0].slice(start, start + step))
    })
    fileReader.readAsArrayBuffer(fileEl.files[0].slice(start, start + step))
})