





self.addEventListener('message', function (e) {
  switch (e.data.type) {
    case 'allowUpdate':
      self.skipWaiting()
  }
})

self.addEventListener('install', function(event) {
  console.log('install')
})
self.addEventListener('activate', function(event) {
  setInterval(() => {
    console.log(new Date(), 2)
  }, 1000)
})
console.log(123)
self.addEventListener('fetch', function (e) {
  console.log(e)
})

// self.addEventListener('fetch', function(event) {
//   console.log(event)
//   event.respondWith(new Response())
//   // if (event.request.method.toUpperCase() !== 'HEAD') {
//   //   if (event.request.url.indexOf('chrome-extension') !== 0) {
//   //     broadcastReq[event.request.url] = self.performance.now()
//   //     broadcast.postMessage({ type: 'fetch', payload: Object.keys(broadcastReq) })
//   //   }
//   // }
// });

