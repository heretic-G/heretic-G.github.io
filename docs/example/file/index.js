
const treeMap = {}

const OPTIONMAP = {
  'remove': 'remove',
  'edit': 'edit'
}

let active

const fileEl = document.querySelector('#getFiles')
const treeRoot = document.querySelector('#list')
const textArea = document.querySelector('textarea')
const saveFile = document.querySelector('#save')



fileEl.addEventListener('click', async function () {
  const handle = await window.showDirectoryPicker()
  const ul = document.createElement('ul')
  const tree = await createFileTree(handle, ul, true)
  const list = document.querySelector('#list')
  ul.append(tree)
  list.append(ul)
})

treeRoot.addEventListener('click', function (event) {
  const option = event.target.getAttribute('option')
  const id = findTreeId(event.target)
  active = id
  if (treeMap[id]) {
    const directory = treeMap[id].directory
    const file = treeMap[id].file
    if (option === OPTIONMAP.remove) {
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
    if (option === OPTIONMAP.edit) {
      file.getFile().then(res => {
        res.text().then(res => {
          console.log(res)
          textArea.value = res
        })
      })
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
      const edit = document.createElement('button')
      edit.innerText = '编辑'
      edit.setAttribute('option', OPTIONMAP.edit)
      const remove = document.createElement('button')
      remove.innerText = '删除'
      remove.setAttribute('option', OPTIONMAP.remove)
      li.append(edit, remove)
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

function createRandom () {
  const now = String(Date.now())
  const nowStr = now.slice(-10, now.length)
  const randomStr = String(Math.random()).slice(3, 13)
  return `${Number(randomStr).toString(32)}${Number(nowStr).toString(32)}`
}
