const a = require( './workerRequire.js')

self.addEventListener('message', function () {
    console.log('this is DataWorker.js')
    a.a()
})