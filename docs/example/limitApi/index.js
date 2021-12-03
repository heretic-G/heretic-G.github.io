// 防止多次请求的总拦截(简单处理拦截)
let apiMap = {}
let keyMap = {}
let key = 1
let __activeKey = ''

function getKey () {
  key += 1
  return key
}

function clearActiveKey (_key) {
  if (keyMap[_key] && keyMap[_key].length) {
    keyMap[_key].length.length -= 1
    if (keyMap[_key].length.length === 0) {
      let all = keyMap[_key].all
      let arr = all.split('-')
      arr.forEach(curr => {
        if (curr) {
          let urlKey = keyMap[curr]
          delete apiMap[urlKey]
          delete keyMap[curr]
        }
      })
      document.querySelector(`[data-api-check="${all}"]`).removeAttribute('data-api-check')
    }
  } else {
    let urlKey = keyMap[_key]
    delete apiMap[urlKey]
    delete keyMap[_key]
  }
}

function bindCheckApi () {
  document.addEventListener('click', function (e) {
    if (__activeKey) {
      if (e.target.className.indexOf('disabled') < 0) {
        let active = __activeKey.split('-')
        let num = { length:active.length - 1 }
        active.forEach(curr => {
          if (keyMap[curr]) {
            keyMap[curr].all = __activeKey
            keyMap[curr].length = num
          }
        })
        e.target.setAttribute('data-api-check', __activeKey)
        __activeKey = ''
      }
    }
  })
  document.addEventListener('click', function (e) {
    __activeKey = ''
    let apiCheck = e.target.getAttribute('data-api-check')
    if (apiCheck) {
      e.stopPropagation()
    }
  }, true)
}

function fetch (option) {
  let urlKey = option.url + option.type + JSON.stringify(option.params)
  let _key
  if (!apiMap[key]) {
    _key = getKey()
    apiMap[urlKey] = _key
    keyMap[_key] = {
      key: urlKey
    }
    __activeKey += '-' + _key
  }
  return new Promise((res, rej) => {
    new Promise((_res, _rej) => {
      setTimeout(() => {
        _res(1)
      }, 1000)
    }).then(() => {
      clearActiveKey(_key)
      res()
    }, () => {
      clearActiveKey(_key)
      rej()
    })
  })
}
