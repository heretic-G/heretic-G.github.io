
const broadcast = new BroadcastChannel('count-channel');
self.addEventListener('install', function(event) {
  self.skipWaiting()
})
self.addEventListener('activate', function(event) {
  self.clients.claim()
})


broadcast.addEventListener('message', function (payload) {
  const now = performance.now()
  switch (payload.data.type) {
    case 'init':
      console.log('init 初始化开始')
      for (let key in broadcastReq) {
        if (broadcastReq[key] < now - payload.data.payload) {
          delete broadcast[key]
        }
      }
      broadcast.postMessage({ type: 'ack', payload: Object.keys(broadcastReq)})
      break
    case 'ack':
      payload.data.payload.forEach(curr => {
        delete broadcastReq[curr]
      })
      break
  }
})

let broadcastReq = {}

self.addEventListener('fetch', function(event) {
  if (event.request.method.toUpperCase() !== 'HEAD') {
    if (event.request.url.indexOf('chrome-extension') !== 0) {
      broadcastReq[event.request.url] = self.performance.now()
      broadcast.postMessage({ type: 'fetch', payload: Object.keys(broadcastReq) })
    }
  }
});
