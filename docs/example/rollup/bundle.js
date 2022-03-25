import other$1 from 'web-worker:./other.js';

var zz = function () {
    console.log('this is other');
};

var other = {
	zz: zz
};

// import DataWorker from 'web-worker:./DataWorker'



const dataWorker = new other$1();
dataWorker.postMessage('Hello World!');
other.zz();

var main = {

};

export { main as default };
