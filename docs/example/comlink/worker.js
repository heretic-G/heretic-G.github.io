
importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
// importScripts("../../../dist/umd/comlink.js");
let num = 1
console.log(self.name)
async function remoteFunction(obj) {
     let z = await obj.cb("A string from a worker");
     return await z + num
}

Comlink.expose(remoteFunction);