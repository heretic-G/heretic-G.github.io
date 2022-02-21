
const webWorker1 = new Worker('./web-worker.js')
const webWorker2 = new Worker('./web-worker.js')
const webWorker3 = new Worker('./web-worker.js')
const webWorker4 = new Worker('./web-worker.js')

//1  1800 2 1800-1900 3 2000 4 2100-2400 后面的会慢 5 2500-2700 6 3070-3200


let arr1 = [webWorker1, webWorker2, webWorker3,webWorker4]
arr1.forEach((curr, index) => {
  curr.postMessage(`${performance.now() | 0} ---- ${index}`)
  curr.addEventListener('message', function (e) {
    console.log(e.data)
    console.log(performance.now())
  })
})
let e = {
  data: 'main'
}
console.log(performance.now() | 0)
const arr = new Array(5000000).fill(1).map(curr => {
  return Math.random() * 500000 | 0
})
arr.sort((prev, next) => prev - next)
console.log(performance.now() | 0)
