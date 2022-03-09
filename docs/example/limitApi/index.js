// 防止多次请求的总拦截(简单处理拦截)
let key = 1
let domMap = new Map()
let keyToDomMap = new Map()
let __activeKey = false
let __activeDom

function getKey () {
  key += 1
  return key
}

function clearActiveKey (_key) {
  if (keyToDomMap.has(_key)) {
    const dom = keyToDomMap.get(_key)
    const keyInfo = domMap.get(dom)
    keyInfo.length -= 1
    setTimeout(() => {
      console.log(keyInfo)
      if (keyInfo.length === 0) {
        domMap.delete(dom)
        dom.removeAttribute('data-api-loading')
      }
    }, 0)
    keyToDomMap.delete(_key)
  }
}

function setActiveKey (activeKeyArr) {
  if (activeKeyArr.length > 0) {
    if (!domMap.has(__activeDom)) {
      domMap.set(__activeDom, {
        length: 0,
        arr: []
      })
    }
    let domInfo = domMap.get(__activeDom)
    domInfo.length += activeKeyArr.length
    domInfo.arr = domInfo.arr.concat(activeKeyArr)
    domMap.set(__activeDom, domInfo)
    for (let i = 0;i < activeKeyArr.length; i++) {
      keyToDomMap.set(activeKeyArr[i], __activeDom)
    }
    if (domInfo.length > 0 && !__activeDom.hasAttribute('data-api-loading')) {
      __activeDom.setAttribute('data-api-loading', 'true')
    }
  }
}

function bindCheckApi () {
  document.addEventListener('click', function (e) {
    const hasLimitApi = e.target.hasAttribute('data-limit-api')
    if (hasLimitApi) {
      setActiveKey(__activeKey)
      __activeKey = false
    }
  })
  document.addEventListener('click', function (e) {
    const hasLimitApi = e.target.hasAttribute('data-limit-api')
    if (hasLimitApi) {
      __activeKey = []
      __activeDom = e.target
      let apiCheck = e.target.hasAttribute('data-api-loading')
      if (apiCheck) {
        e.stopPropagation()
      }
    } else {
      __activeKey = false
    }
  }, true)
}

function fetch () {
  let _key
  let _resolveFun
  let _rejectFun
  let _resNext
  let _rejNest
  const fetchApi = new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, 1000)
  })
  if (!Array.isArray(__activeKey)) {
    return fetchApi.finally(() => {
      clearActiveKey(_key)
    })
  }

  _key = getKey()
  __activeKey.push(_key)

  fetchApi.then((r) => {
    __activeKey = []
    __activeDom = keyToDomMap.get(_key)
    if (typeof _resolveFun === 'function') {
      try {
        let result = _resolveFun()
        _resNext(result)
      } catch (e) {
        _rejNest(e)
      } finally {
        setActiveKey(__activeKey)
        __activeKey = false
      }
    } else {
      _resNext(r)
    }
  }, (r) => {
    __activeKey = []
    __activeDom = keyToDomMap.get(_key)
    if (typeof _rejectFun === 'function') {
      try {
        let result = _rejectFun()
        _resNext(result)
      } catch (e) {
        _rejNest(e)
      } finally {
        setActiveKey(__activeKey)
        __activeKey = false
      }
    } else {
      _rejNest(r)
    }
  })

  return {
    then: function (resolve, reject) {
      _resolveFun = resolve
      _rejectFun = reject
      return new Promise((_res, _rej) => {
        _resNext = _res
        _rejNest = _rej
      }).finally(() => {
        clearActiveKey(_key)
      })
    }
  }
}