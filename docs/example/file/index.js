
let treeMap = {}
let root
const OPTIONMAP = {
  remove: 'remove',
  edit: 'edit',
  rename: 'rename'
}

let active

const fileEl = document.querySelector('#getFiles')
const treeRoot = document.querySelector('#list')
const textArea = document.querySelector('textarea')
const saveFile = document.querySelector('#save')
const createFile = document.querySelector('#createFile')

fileEl.addEventListener('click', async function () {
  const handle = await window.showDirectoryPicker()
  initTreeList(handle)
})

treeRoot.addEventListener('click', function (event) {
  const option = event.target.getAttribute('option')
  const id = findTreeId(event.target)
  active = id
  if (treeMap[id]) {
    const directory = treeMap[id].directory
    const file = treeMap[id].file
    switch (option) {
      case OPTIONMAP.remove:
        removeFile(directory, file, id)
        break
      case OPTIONMAP.edit:
        editFile(file)
        break
      // case OPTIONMAP.rename:
      //   renameFile(directory, file, id)
      //   break
    }
  }
})

saveFile.addEventListener('click', async function () {
  if (active && treeMap[active]) {
    const file = treeMap[active].file
    const val = textArea.value
    const writable = await file.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(val);
    // Close the file and write the contents to disk.
    await writable.close();
  }
})

createFile.addEventListener('click', async function () {
  const newHandle = await window.showSaveFilePicker()
  if (root) {
    initTreeList(root)
  }
})

async function initTreeList (handle) {
  root = handle
  treeMap = {}
  active = undefined
  const ul = document.createElement('ul')
  const tree = await createFileTree(handle, ul, true)
  const list = document.querySelector('#list')
  ul.append(tree)
  list.innerHTML = ''
  list.append(ul)
}

async function createFileTree (directory, parentUl, root = false) {
  const ul = document.createElement('ul')
  const li = createTreeDom(directory, root)
  parentUl.append(li)
  for await (const item of directory.values()) {
    if (item.kind === 'file') {
      const li = createTreeDom(item, false, directory)
      ul.append(li)
    }
    if (item.kind === 'directory') {
      const children = await createFileTree(item, ul, false)
      ul.append(children)
    }
  }
  return ul
}

function createTreeDom (file, root, directory) {
  const li = document.createElement('li')
  const text = document.createElement('span')
  text.innerText = file.name
  li.append(text)

  if (!root) {
    if (file.kind === 'file') {
      const btnArr = [{
        label: '编辑',
        key: 'edit'
      }, {
        label: '删除',
        key: 'remove'
      }
      // , {
      //   label: '重命名',
      //   key: 'rename'
      // }
      ]
      li.append(...btnArr.map(curr => {
        return createBtn(curr.label, curr.key)
      }))
    }
  }

  const id = createRandom()
  li.setAttribute('treeId', id)
  treeMap[id] = {
    directory: directory,
    file: file
  }
  return li
}

function findTreeId (el) {
  while (el) {
    const treeId = el.getAttribute('treeId')
    if (treeId) {
      return treeId
    }
    el = el.parentNode
  }
  return false
}

function showModal (tip) {
  const input = window.prompt(tip)
  return input
}

function removeFile (directory, file, id) {
  if (directory) {
    directory.removeEntry(file.name).then(res => {
      const removeEl = document.querySelector(`[treeid="${id}"]`)
      removeEl.remove()
      if (active === id) {
        active = undefined
        textArea.value = ''
      }
      treeMap[id] = undefined
    })
  }
}

async function renameFile (directory, file, id) {

  const inputVal = showModal('新的文件名称')
  if (inputVal && inputVal.trim()) {
    const val = inputVal.trim()
    for await (const key of directory.keys()) {
      if (key === val) {
        alert('存在重名文件')
      }
    }
  }
}

function editFile (file) {
  file.getFile().then(res => {
    res.text().then(res => {
      textArea.value = res
    })
  })
}

function createRandom () {
  const now = String(Date.now())
  const nowStr = now.slice(-10, now.length)
  const randomStr = String(Math.random()).slice(3, 13)
  return `${Number(randomStr).toString(32)}${Number(nowStr).toString(32)}`
}

function createBtn (label, key) {
  const button = document.createElement('button')
  button.innerText = label
  button.setAttribute('option', OPTIONMAP[key])
  return button
}
