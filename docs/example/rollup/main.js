





// import DataWorker from 'web-worker:./DataWorker'
const xx = require('./other.js')
const DataWorker = require('web-worker:./other.js')

const dataWorker = new DataWorker();
dataWorker.postMessage('Hello World!');
xx.zz()

