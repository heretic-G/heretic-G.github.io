

const fileEl = document.querySelector('#getFiles')
const textArea = document.querySelector('textarea')
let activeFile

fileEl.addEventListener('click', async function () {
  const [fileHandle] = await window.showOpenFilePicker()
  activeFile = fileHandle
  await activeFile.requestPermission({
    mode: 'readwrite'
  })
  const spanEl = document.querySelector('span')
  spanEl.innerText = activeFile.name
  getFileContent(activeFile, textArea)
})

const inputHandleThrottle = throttle(inputHandle, 300)

textArea.addEventListener('input', inputHandleThrottle)

function inputHandle () {
  updateFileContent(activeFile, textArea.value)
}

function throttle(func, wait = 300) {
  let timeout

  return function() {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.call(this, arguments)
      }, wait)
    }
  }
}

async function updateFileContent (file, value) {
  const writable = await file.createWritable();
  await writable.write(value);
  await writable.close();
}

function getFileContent (fileHandle, el) {
  fileHandle.getFile().then(file => {
    file.text().then(content => {
      el.value = content
    })
  })
}
