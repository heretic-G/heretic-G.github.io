let timeLineType = getQueryString('type')
let token = localStorage.getItem('_token')
let mask = document.querySelector('.mask')
let addEventBtn = document.querySelector('#addEventBtn')
let shareBtn = document.querySelector('#shareBtn')
let addEventCancel = document.querySelector('#addEventCancel')
let eventLogoList = document.querySelector('.event-logo-list')
let fieldAdd = document.getElementById('addDatepicker')
let fieldEdit = document.getElementById('editDatepicker')
let deleteBtn = document.querySelector('#delete')
let editBtn = document.getElementById('editEventBtn')
let addEventTimeLine = document.querySelector('.add-event-timeLine')
let chooseTimeLine = document.querySelector('#chooseTimeLine')
let canvasEl = document.querySelector('#canvas')
let canvasElCtx = canvasEl.getContext('2d')
let copyLink = document.getElementById('copyLink')
let shuttleNotActive = document.querySelector('.not-active-timeline')
let shuttleActive = document.querySelector('.active-timeline')
let _SHARE = false
let sureShuttleBtn = document.querySelector('.sure-shuttle-btn')
let headerEl = document.querySelector('.timeLine-tags-con')
let headerTempEl = document.querySelector('.timeLine-tags-temp')
let logoutEl = document.querySelector('#logout')
let headerPos = getElemPos(headerEl)
let _showIDArr = []
let openMoreWid = 0
let _deleteData
let _editData
let _formatData
let formatTimeLine
let mouseDownPos = {}
let timeLineData
let TIMELINEARR = []
let CURRENTTIMEPOS = 0
let canvasPos

let activeOpt = {
  index: null,
  children: null
}
let tempCanvas = document.createElement('canvas')
bodyScrollFun()
var pickerAdd = new Pikaday({
  field: fieldAdd,
  onSelect: function(date) {
    let _date = new Date(date)
    fieldAdd.setAttribute('date-time', _date.getTime())
    fieldAdd.value = formatTime(date)
  }});
var pickerEdit = new Pikaday({
  field: fieldEdit,
  onSelect: function(date) {
    let _date = new Date(date)
    fieldEdit.setAttribute('date-time', _date.getTime())
    fieldEdit.value = formatTime(date)
  }});
let clickCallbackArr = [
  editEvent,
  deleteEvent,
  addEvent
]
// 放大、缩小按键重绘canvas 解决按钮不对应的问题
window.onresize = function () {
  canvasPos = getElemPos(document.querySelector('.canvas-con'))
  RATIO = getPixelRatio(document.createElement('canvas'))
  resetTimeLine(timeLineData)
}

// 不是登录状态也没有类型
if (!token && !timeLineType) {
  window.location.href = '/login'
} else if (token && !timeLineType) {
  // 存在token 但是没有分享类型的
  axios.post('/check', {
    token: token
  }).then((data) => {
    if (data.data.code === '0000') {
      document.querySelector('#userInfo-name').innerText = data.data.username
      document.querySelector('.timeLine-userInfo-con').style.display = 'flex'
      document.querySelector('.share-btn').style.display = 'flex'
      document.querySelector('.create-img-btn').style.display = 'flex'
      let saveTimeLineObj
      if (!_SHARE) {
        saveTimeLineObj = JSON.parse(localStorage.getItem('saveTimeLineObj') || '{}')
      }
      getTimeLineList(saveTimeLineObj)
      eventBind()
    } else {
      localStorage.removeItem('_token')
      window.location.reload()
    }
  })
} else if (!token && timeLineType) {
  let toLogin = document.querySelector('#timeLine-to-login')
  toLogin.style.display = 'inline-block'
  toLogin.href = `/login?type=${timeLineType}`
  // 有分享类型 没有token的
  axios.post('/getShareLine', {
    share: timeLineType
  }).then((data) => {
    if (data.data.code === '0000') {
      activeOpt = {
        index: null,
        children: null
      }
      timeLineData = data.data.data
      _SHARE = true
      timeLineData.forEach(curr => {
        curr.active = true
        curr.data = curr.data.filter((curr) => {
          return curr
        })
      })
      resetTimeLine(timeLineData)
      eventBind()
    } else {
      alert('分享码不可用')
      window.location.href = '/login'
    }
  })
} else if (token && timeLineType) {
  axios.post('/getShareLine', {
    token: token,
    share: timeLineType
  }).then((data) => {
    if (data.data.code === '0000') {
      document.querySelector('#userInfo-name').innerText = data.data.username
      document.querySelector('.timeLine-userInfo-con').style.display = 'flex'
      activeOpt = {
        index: null,
        children: null
      }
      timeLineData = data.data.data
      timeLineData.forEach(curr => {
        curr.active = data.data.active.includes(curr.name)
        curr.data = curr.data.filter((curr) => {
          return curr
        })
      })
      resetTimeLine(timeLineData)
      eventBind()
    } else {
      alert('分享码不可用')
      window.location.href = '/login'
    }
  })
}

function showMask (classN) {
  let mask = document.querySelector('.mask')
  let maskBody = document.querySelector('.mask-body')
  let childNodes = maskBody.childNodes
  for (let i = 0;i < childNodes.length; i++ ) {
    let className = childNodes[i].className
    if (className) {
      if (className.split(' ').includes(classN)) {
        childNodes[i].style.display = 'block'
      } else {
        childNodes[i].style.display = 'none'
      }
    }
  }
  mask.style.display = 'block'
}


function eventBind () {
  document.body.addEventListener('click', function (e) {
    let className = e.target.className
    if (className) {
      let classNameArr = className.split(' ')
      if (classNameArr.includes('hide-mask')) {
        let mask = document.querySelector('.mask')
        mask.style.display = 'none'
      }
    }
  })
  addEventCancel.addEventListener('click', function () {
    mask.style.display = 'none'
  })
  shareBtn.addEventListener('click', function () {
    let timeline = []
    timeLineData.forEach((curr) => {
      if (curr.active && curr.name !== '我创建的时间线') {
        timeline.push(curr.name)
      }
    })
    if (timeline.length > 0) {
      axios.post('/share', {
        token: token,
        timeline: timeline
      }).then((data) => {
        if (data.data.code === '0000') {
          document.getElementById('shareInput').value = `${window.location.href}?type=${data.data.data.share}`
          showMask('share-con')
        }
      })
    }else {
      alert('没有可分享的时间线~')
    }
  })
  copyLink.addEventListener('click', function () {
    let Url2 = document.getElementById("shareInput")
    Url2.select()
    document.execCommand("Copy")
  })
  addEventBtn.addEventListener('click', function () {
    let logoEl = document.querySelector('.add-event-con').querySelector('.event-logo-item_active')
    let nameEl = document.querySelector('#add-name')
    let timeEl = document.querySelector('#addDatepicker')
    let liablePersonEl = document.querySelector('#addLiablePerson')
    let descEl = document.querySelector('#add-desc')
    let timeLineEl = document.querySelector('.add-event-timeLine')
    let logo = logoEl.getAttribute('data-url')
    let name = nameEl.value
    let time = + timeEl.getAttribute('date-time')
    let desc = descEl.value
    let liablePerson = liablePersonEl.value
    timeLineEl.children
    let timeLineArr = []
    for (let i = 0;i < timeLineEl.children.length; i++ ) {
      if (timeLineEl.children[i].classList.contains('timeLine-tags-item')) {
        timeLineArr.push(timeLineEl.children[i].getAttribute('data-value'))
      }
    }
    let timeLineObj = {}
    timeLineArr.forEach(curr => {
      timeLineObj[curr] = true
    })
    if (token && logo && name && time && liablePerson && timeLineArr.length > 0) {
      axios.post('/addEvent',{
        token: token,
        logo: logo,
        title: name,
        time: time,
        liablePerson: liablePerson,
        description: desc,
        timeline: Object.keys(timeLineObj)
      }).then(() => {
        getTimeLineList()
        mask.style.display = 'none'
      })
    }
  })
  document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('event-logo-item')) {
      let childNodes = e.target.parentNode.children
      for (let i = 0; i< childNodes.length; i++ ){
        if (childNodes[i] === e.target) {
          childNodes[i].classList.add('event-logo-item_active')
        } else {
          childNodes[i].classList.remove('event-logo-item_active')
        }
      }
    }
  })
  let addInputEl = document.querySelectorAll('.add-timeLine-input')
  let addInputElLength = addInputEl.length
  for (let i = 0;i < addInputElLength; i++) {
    addInputEl[i].addEventListener('focus', function (e) {
      e.target.nextElementSibling.style.display = 'block'
    })
    addInputEl[i].addEventListener('blur', function (e) {
      e.target.nextElementSibling.style.display = 'none'
    })
  }
  document.body.addEventListener('mousedown', function (e) {
    if (e.target.parentNode.classList.contains('timeLine-list-item')) {
      let parentEl = e.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.timeLine-tags-item')
      let timeLineText = []
      for (let i = 0; i< parentEl.length; i++) {
        timeLineText.push(parentEl[i].querySelector('span').innerText.trim())
      }
      let value = e.target.parentNode.innerText.trim()
      if (!timeLineText.includes(value)) {
        let dom = document.createElement('div')
        let template = `<div data-value="${value}" class="timeLine-tags-item timeLine-tags-active">
                                <span>${value}</span>
                                <img class="timeLine-tags-close removeTimeLine" src="../image/close.svg" alt="">
                            </div>`
        dom.innerHTML = template
        e.target.parentNode.parentNode.parentNode.parentNode.insertBefore(dom.childNodes[0], e.target.parentNode.parentNode.parentNode)
      }
    }
  })
  document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-timeLine-btn')) {
      let parentEl = e.target.parentNode.parentNode.querySelectorAll('.timeLine-tags-item')
      let timeLineText = []
      for (let i = 0; i< parentEl.length; i++) {
        timeLineText.push(parentEl[i].querySelector('span').innerText.trim())
      }
      let value = e.target.previousElementSibling.previousElementSibling.value.trim()
      if (value && value !== '我创建的时间线') {
        if (timeLineText.includes(value)) {
          e.target.previousElementSibling.previousElementSibling.value = ''
        } else {
          let dom = document.createElement('div')
          let template = `<div data-value="${value}" class="timeLine-tags-item timeLine-tags-active">
                                <span>${value}</span>
                                <img class="timeLine-tags-close removeTimeLine" src="../image/close.svg" alt="">
                            </div>`
          dom.innerHTML = template
          e.target.parentNode.parentNode.insertBefore(dom.childNodes[0], e.target.parentNode)
          e.target.previousElementSibling.previousElementSibling.value = ''
        }
      }
    }
  })
  document.body.addEventListener('keypress', function (e) {
    if(e.keyCode == 13){
      if (document.activeElement.classList.contains('add-timeLine-input')) {
        let parentEl = document.activeElement.parentNode.parentNode.querySelectorAll('.timeLine-tags-item')
        let timeLineText = []
        for (let i = 0; i< parentEl.length; i++) {
          timeLineText.push(parentEl[i].querySelector('span').innerText.trim())
        }
        let value = document.activeElement.value.trim()
        if (value && value !== '我创建的时间线') {
          if (timeLineText.includes(value)) {
            document.activeElement.value = ''
          } else {
            let dom = document.createElement('div')
            let template = `<div data-value="${value}" class="timeLine-tags-item timeLine-tags-active">
                                <span>${value}</span>
                                <img class="timeLine-tags-close removeTimeLine" src="../image/close.svg" alt="">
                            </div>`
            dom.innerHTML = template
            document.activeElement.parentNode.parentNode.insertBefore(dom.childNodes[0], document.activeElement.parentNode)
            document.activeElement.value = ''
          }
        }
      }
    }
  })
  deleteBtn.addEventListener('click', function () {
    axios.post('/deleteEvent', {
      token: token,
      _id: _deleteData.d._id
    }).then((data) => {
      if (data.data.code === '0000') {
        getTimeLineList()
        mask.style.display = 'none'
      }
    })
  })
  editBtn.addEventListener('click',function () {
    let logoEl = document.querySelector('.edit-event-con').querySelector('.event-logo-item_active')
    let nameEl = document.querySelector('#edit-name')
    let timeEl = document.querySelector('#editDatepicker')
    let liablePersonEl = document.querySelector('#editLiablePerson')
    let descEl = document.querySelector('#edit-desc')
    let timeLineEl = document.querySelector('.edit-event-timeLine')
    let logo = logoEl.getAttribute('data-url')
    let name = nameEl.value
    let liablePerson = liablePersonEl.value
    let time = + timeEl.getAttribute('date-time')
    let desc = descEl.value
    timeLineEl.children
    let timeLineArr = []
    for (let i = 0;i < timeLineEl.children.length; i++ ) {
      if (timeLineEl.children[i].classList.contains('timeLine-tags-item')) {
        timeLineArr.push(timeLineEl.children[i].getAttribute('data-value'))
      }
    }
    let timeLineObj = {}
    timeLineArr.forEach(curr => {
      timeLineObj[curr] = true
    })
    if (token && logo && name && time && liablePerson && timeLineArr.length > 0) {
      axios.post('/editEvent',{
        token: token,
        logo: logo,
        title: name,
        time: time,
        description: desc,
        liablePerson: liablePerson,
        timeline: Object.keys(timeLineObj),
        _id: _editData.d._id
      }).then(() => {
        getTimeLineList()
        mask.style.display = 'none'
      })
    }
  })
  document.body.addEventListener('click', function (e) {
    if (
      ((e.target.parentNode && e.target.parentNode.classList.contains('timeLine-tags-blur')) || e.target.classList.contains('timeLine-tags-blur'))
      && !e.target.classList.contains('removeTimeLine')) {
      let index
      if (e.target.classList.contains('timeLine-tags-blur')) {
        index = e.target.getAttribute('data-index')
      } else {
        index = e.target.parentNode.getAttribute('data-index')
      }
      if (index) {
        timeLineData[index].active = true
        let tempObj = {}
        timeLineData.forEach((curr) => {
          tempObj[curr.name] = curr.active
        })
        if (!_SHARE) {
          localStorage.setItem('saveTimeLineObj', JSON.stringify(tempObj))
        }
        resetTimeLine(timeLineData)
      }
    }
  })
  document.body.addEventListener('click', function (e) {
    if (
      ((e.target.parentNode && e.target.parentNode.classList.contains('timeLine-tags-focus'))
        || e.target.classList.contains('timeLine-tags-focus'))
      && !e.target.classList.contains('removeTimeLine')) {
      let index
      if (e.target.classList.contains('timeLine-tags-focus')) {
        index = e.target.getAttribute('data-index')
      } else {
        index = e.target.parentNode.getAttribute('data-index')
      }
      if (index) {
        timeLineData[index].active = '2'
        let tempObj = {}
        timeLineData.forEach((curr) => {
          tempObj[curr.name] = curr.active
        })
        if (!_SHARE) {
          localStorage.setItem('saveTimeLineObj', JSON.stringify(tempObj))
        }
        resetTimeLine(timeLineData)
      }
    }
  })
  document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('removeTimeLine')) {
      let index = e.target.getAttribute('data-index')
      if (index) {
        timeLineData[index].active = false
        let tempObj = {}
        timeLineData.forEach((curr) => {
          tempObj[curr.name] = curr.active
        })
        if (!_SHARE) {
          localStorage.setItem('saveTimeLineObj', JSON.stringify(tempObj))
        }
        resetTimeLine(timeLineData)
      }
      let timeline = e.target.parentNode
      if (timeline.parentNode) {
        timeline.parentNode.removeChild(timeline)
      }
    }
  })

  canvasPos = getElemPos(document.querySelector('.canvas-con'))
  let htmlScrollEl = document.body.parentNode
  canvasEl.addEventListener('mousemove', function (e) {
    if (_formatData) {
      let x = e.clientX - canvasPos.x
      let y = htmlScrollEl.scrollTop + e.clientY - canvasPos.y
      judgePosition(_formatData, x, y, activeOpt)
    }
  })
  canvasEl.addEventListener('mousedown', function () {
    mouseDownPos = {...activeOpt}
  })
  canvasEl.addEventListener('mouseup', function () {
    // if (mouseDownPos.open === activeOpt.open && activeOpt.open !== null) {
    //   let watchData = _formatData.watchArr[mouseDownPos.open]
    //   _showIDArr.push(_formatData['rectBox'][watchData.i].d._id)
    //   _formatData['rectBox'][watchData.i].d.open = true
    //   let formatData = formatDataFun(formatTimeLine)
    //   _formatData = formatData
    //   requestAnimationFrame(function () {
    //     renderDataFun(formatData)
    //   })
    //   return
    // }
    // if (mouseDownPos.hide === activeOpt.hide && activeOpt.hide) {
    //   let watchData = _formatData.watchArr[mouseDownPos.hide]
    //   _showIDArr = _showIDArr.filter(curr => {
    //     return curr !== _formatData['rectBox'][watchData.i].d._id
    //   })
    //   _formatData['rectBox'][watchData.i].d.open = false
    //   let formatData = formatDataFun(formatTimeLine)
    //   _formatData = formatData
    //   requestAnimationFrame(function () {
    //     renderDataFun(formatData)
    //   })
    //   return
    // }
    if(mouseDownPos.index === activeOpt.index && mouseDownPos.children === activeOpt.children) {
      if (activeOpt.index !== null && activeOpt.children === null) {
        let watchData = _formatData.watchArr[activeOpt.index]
        if (watchData.clickCallback) {
          clickCallbackArr[watchData.clickCallback](_formatData[watchData.key][watchData.i])
        }
      }
      if (activeOpt.index !== null && activeOpt.children !== null) {
        let watchData = _formatData.watchArr[activeOpt.index]
        clickCallbackArr[watchData.children[activeOpt.children].clickCallback](_formatData[watchData.key][watchData.i])
      }
    }
  })
  chooseTimeLine.addEventListener('click', function () {
    renderShuttle()
    showMask('create-timeLine-con')
  })
  shuttleNotActive.addEventListener('click', function (e) {
    let target = e.target.parentNode
    if (target.classList.contains('shuttle-timeline-item')) {
      shuttleActive.appendChild(target)
    }
  })
  shuttleActive.addEventListener('click', function (e) {
    let target = e.target.parentNode
    if (target.classList.contains('shuttle-timeline-item')) {
      shuttleNotActive.appendChild(target)
    }
  })
  sureShuttleBtn.addEventListener('click', function () {
    let activeList = []
    let length = shuttleActive.children.length
    let tempObj = {}
    for(let i = 0; i< length;i++) {
      activeList.push(+shuttleActive.children[i].getAttribute('data-index'))
    }
    timeLineData.forEach((curr, index) => {
      if (activeList.includes(index)) {
        tempObj[curr.name] = true
        curr.active = true
      } else {
        tempObj[curr.name] = false
        curr.active = false
      }
    })
    if (!_SHARE) {
      localStorage.setItem('saveTimeLineObj', JSON.stringify(tempObj))
    }
    resetTimeLine(timeLineData)
    mask.style.display = 'none'
  })
  window.document.body.onscroll = bodyScrollFun
  logoutEl.addEventListener('click', function () {
    axios.post('/logout', {
      token: token
    }).then(() => {
      localStorage.removeItem('_token')
      if(timeLineType) {
        window.location.reload()
      } else {
        window.location.href = '/login'
      }

    })
  })
  let downloadEl = document.querySelector('#createImg')
  downloadEl.addEventListener('click', function (e) {
    let dom = document.createElement('a')
    dom.href = canvasEl.toDataURL("image/jpeg")
    dom.setAttribute('download','timeline')
    dom.click()
  })
}

function bodyScrollFun() {
  let scrollTop = window.document.body.parentNode.scrollTop
  if (scrollTop > headerPos.y) {
    headerEl.style.position = 'fixed'
    headerTempEl.style.display = 'block'
  } else {
    headerEl.style.position = 'static'
    headerTempEl.style.display = 'none'
  }
}
function createTimeLineTypes(data) {
  let timelineCon = document.querySelector('.timeLine-tags-body')
  let length = timelineCon.children.length
  for (let i = length - 1; i >= 0; i--) {
    if(timelineCon.children[i].classList.contains('timeLine-tags-active')) {
      timelineCon.children[i].parentNode.removeChild(timelineCon.children[i])
    }
  }
  let dom = document.createElement('div')

  data.forEach((curr, index) => {
    if (curr.data.length > 0 && curr.active) {
      dom.innerHTML = `<div data-index="${index}" class="timeLine-tags-item timeLine-tags-active ${curr.active == '2' ? 'timeLine-tags-blur' : 'timeLine-tags-focus'}"><span>${curr.name}</span><img data-index="${index}" class="timeLine-tags-close removeTimeLine" src="../image/close.svg" alt=""></div>`
      chooseTimeLine.parentNode.insertBefore(dom.childNodes[0],chooseTimeLine)
    }
  })
  chooseTimeLine.style.display = 'flex'
}

function mergeTimeLine(data) {
  let result = []
  let tempObj = {}
  let activeArr = []
  data.forEach((curr) => {
    if (!(curr.active == true)) {
      activeArr.push(curr.name)
    }
    curr.data.forEach(_curr => {
      if (_curr) {
        if (!tempObj[_curr._id]) {
          tempObj[_curr._id] = {
            index: result.length,
          }
          _curr.timeLine = [curr.name]
          result.push(_curr)
        } else {
          result[tempObj[_curr._id].index].timeLine.push(curr.name)
        }
      }
    })
  })
  return result.filter((curr) => {
    let timeLineArr = curr.timeLine.filter(timeLineName => {
      return !activeArr.includes(timeLineName)
    })
    if (timeLineArr.length > 0) {
      return true
    } else {
      return false
    }
  })
}

function getTimeLineList(timeline) {
  let tempActiveObj = timeline || {}
  if (timeLineData && timeLineData.length > 0) {
    let tempObj = {}
    timeLineData.forEach(curr => {
      tempObj[curr.name] = curr.active
      tempActiveObj[curr.name] = curr.active
    })
    if (!_SHARE) {
      localStorage.setItem('saveTimeLineObj', JSON.stringify(tempObj))
    }
  }
  axios.post('/getTimeLineList', {
    token: token
  }).then((_data) => {
    activeOpt = {
      index: null,
      children: null
    }
    timeLineData = _data.data.data
    timeLineData.forEach(curr => {
      curr.active = tempActiveObj[curr.name] !== undefined ? tempActiveObj[curr.name] : true
      curr.data = curr.data.filter((curr) => {
        return curr
      })
    })
    resetTimeLine(timeLineData)
  })
}
function judgePosition(data, x, y, activeOpt) {
  let reRender = false
  let FORMATIONDATA = data
  if (activeOpt.index !== null) {
    let watchData = data.watchArr[activeOpt.index]
    if (!judgePosInRect(x,y,watchData.x,watchData.y,watchData.w,watchData.h)) {
      data[watchData.key][watchData.i].active = false
      if (activeOpt.children !== null) {
        data[watchData.key][watchData.i].children[activeOpt.children].active = false
        activeOpt.children = null
      }
      activeOpt.index = null
      reRender = true
    } else {
      if (activeOpt.children !== null) {
        let childData = data.watchArr[activeOpt.index].children[activeOpt.children]
        if (!judgePosInRect(x,y,childData.x,childData.y,childData.w,childData.h)) {
          data[watchData.key][watchData.i].children[activeOpt.children].active = false
          activeOpt.children = null
          reRender = true
        }
      }
    }
  }
  let pointer = false
  let _arm = false
  data.watchArr.some((curr, index) => {
    if (judgePosInRect(x,y,curr.x,curr.y,curr.w,curr.h)) {
      _arm = true
      if (curr.key === 'rectBoxOpen') {
        activeOpt.open = index
        mouseDownPos = {...activeOpt}
        if (mouseDownPos.open === activeOpt.open && activeOpt.open !== null) {
          let watchData = _formatData.watchArr[mouseDownPos.open]
          _showIDArr.push(_formatData['rectBox'][watchData.i].d._id)
          _formatData['rectBox'][watchData.i].d.open = true
          let _id = _formatData['rectBox'][watchData.i].d._id
          if (activeOpt._id !== _id) {
            activeOpt._id = _id
            let formatData = formatDataFun(formatTimeLine)
            _formatData = formatData
            FORMATIONDATA = formatData
            reRender = true
            return true
          }
        }
      }
      // } else if(activeOpt._id !== '') {
      //   activeOpt.open = null
      //   activeOpt._id = ''
      //   let formatData = formatDataFun(formatTimeLine)
      //   _formatData = formatData
      //   FORMATIONDATA = formatData
      // }
      // if (curr.key === 'rectBoxHide') {
      //   if (activeOpt.show)
      //   activeOpt.hide = index
      //   // pointer = true
      //   mouseDownPos = {...activeOpt}
      //   if (mouseDownPos.hide === activeOpt.hide && activeOpt.hide) {
      //     let watchData = _formatData.watchArr[mouseDownPos.hide]
      //     _showIDArr = _showIDArr.filter(curr => {
      //       return curr !== _formatData['rectBox'][watchData.i].d._id
      //     })
      //     _formatData['rectBox'][watchData.i].d.open = false
      //     let formatData = formatDataFun(formatTimeLine)
      //     _formatData = formatData
      //     requestAnimationFrame(function () {
      //       renderDataFun(formatData)
      //     })
      //     return true
      //   }
      //   return true
      // } else {
      //   activeOpt.hide = null
      // }
      if (!_SHARE && curr.key !== 'rectBoxOpen') {
        data[curr.key][curr.i].active = true
        activeOpt.index = index
        reRender = true
        if (curr.children) {
          curr.children.some((childCurr,childIndex) => {
            if (judgePosInRect(x,y,childCurr.x,childCurr.y,childCurr.w,childCurr.h)) {
              data[curr.key][curr.i].children[childIndex].active = true
              activeOpt.children = childIndex
              reRender = true
              return true
            }
          })
        }
        return true
      }
    }
  })
  if (!_arm && activeOpt._id !== '') {
    activeOpt.hide = null
    activeOpt.open = null
    activeOpt._id = ''
    reRender = true
    let formatData = formatDataFun(formatTimeLine)
    _formatData = formatData
    FORMATIONDATA = formatData
  }
  if (pointer) {
    canvasEl.style.cursor = 'pointer'
  } else {
    if(activeOpt.index !== null && activeOpt.children !== null) {
      if (data.watchArr[activeOpt.index].children[activeOpt.children].clickCallback !== undefined) {
        canvasEl.style.cursor = 'pointer'
      } else {
        canvasEl.style.cursor = 'default'
      }
    } else if (activeOpt.index !== null && activeOpt.children === null) {
      if (data.watchArr[activeOpt.index].clickCallback !== undefined) {
        canvasEl.style.cursor = 'pointer'
      } else {
        canvasEl.style.cursor = 'default'
      }
    } else {
      canvasEl.style.cursor = 'default'
    }
  }
  if (reRender) {
    requestAnimationFrame(function () {
      renderDataFun(_formatData)
    })
  }
}

function judgePosInRect(pX,pY,x,y,w,h) {
  if (pX >= x && pX <= x + w &&
    pY >= y && pY <= y + h) {
    return true
  }
  return false
}
function formatDataFun(data) {
  let canvas = document.querySelector('#canvas')
  let ctx = canvas.getContext('2d')
  let _opt = {
    data : data,
    canvas: canvas,
    ctx: ctx,
    eventWidth:374,
    eventHeight:120,
    eventRadio: 15,
    eventSpace: 24,
    ce: 24,
    timeWidth: 132,
    timeHeight: 40,
    timeToEvent: 60,
    monthsPointArr: [],
    timePosY: 10,
    monthMin: 48,
    currNum: 0,
    canvasWidth: 1200,
    canvasHeight: 5000,
    RATIO: RATIO
  }
  let _date
  if (data[0] && data[0][0] && data[0][0].time) {
    _date = new Date(data[0][0].time)
  } else {
    _date = new Date()
  }
  _date.setMonth(_date.getMonth() + 4)
  _opt.prevPos = {
    x: _opt.canvasWidth / 2 - _opt.timeWidth / 2,
    y: 10,
    time: _date.getTime()
  }
  let renderData = {
    rectBox: [],
    timeBox: [],
    monthPoint: [],
    connectLine: [],
    watchArr: [],
    opt: _opt
  }
  _opt.halfTimeBoxWidth = _opt.timeToEvent + _opt.eventWidth + _opt.timeWidth / 2
  renderData.timeBox.push({
    x: _opt.canvasWidth / 2 - _opt.timeWidth / 2,
    y: 0,
    w: _opt.timeWidth,
    h: _opt.timeHeight,
    r: 5,
    time: '没有更多了'
  })
  data.forEach((currD) => {
    let curr = currD.length
    let time = currD[0].time
    // 计算一个时间点里所有的事件这个大的盒子的高度
    let timeBoxHeight = calculateTimeBox(curr)
    let openHeight = 0
    currD.forEach((curr) => {
      if (activeOpt._id == curr._id) {
        let descResLength = curr.descRes.data.length < 3 ? 0 : curr.descRes.data.length - 1
        openHeight += (descResLength) * 18
        if (curr.titleRes.data.length > 1) {
          openHeight += (curr.titleRes.data.length - 1) * 18
        }
      }
    })
    timeBoxHeight +=openHeight
    // let openHeight =
    // 计算中间时间框坐标(只是临时的可能会根据月份点有所修改)
    let timeRectPosY = calculateTimeRectPos(curr, timeBoxHeight)
    // 计算中间间隔月份并渲染上月份圆点
    // 返回不足的差值
    let diff = paintMonths(time, timeRectPosY, timeBoxHeight, _opt) || 0
    // 补充到y中
    _opt.timePosY += diff
    _opt.prevPos = {
      x: _opt.canvasWidth / 2,
      y: _opt.timePosY + timeRectPosY,
      time: time
    }
    renderData.timeBox.push({
      x: _opt.canvasWidth / 2 - _opt.timeWidth / 2,
      y: _opt.timePosY + timeRectPosY - _opt.timeHeight / 2,
      w: _opt.timeWidth,
      h: _opt.timeHeight,
      r: 5,
      milliseconds: time,
      time: formatTime(time),
      color: '#FFFFFF',
      children: [{
        desc: '编辑',
      }]
    })
    renderData.watchArr.push({
      x: _opt.canvasWidth / 2 - _opt.timeWidth / 2,
      y: _opt.timePosY + timeRectPosY - _opt.timeHeight / 2 - 9,
      w: _opt.timeWidth,
      h: _opt.timeHeight + 9,
      key: 'timeBox',
      i: renderData.timeBox.length - 1,
      children: [{
        x: _opt.canvasWidth / 2 - _opt.timeWidth / 2,
        y: _opt.timePosY + timeRectPosY - _opt.timeHeight / 2 - 9,
        w: _opt.timeWidth,
        h: _opt.timeHeight + 15,
        i: 0,
        clickCallback: 2
      }]
    })
    let addHeightArr = Array(currD.length).fill(0)
    currD.forEach((curr, i) => {
      let boxPos = calculateEventBoxPos(i, _opt)
      let $openHeight = 0
      if (activeOpt._id == curr._id && curr.descRes.data.length > 2) {
        $openHeight += (curr.descRes.data.length - 1) * 16
      }
      if (activeOpt._id == curr._id && curr.titleRes.data.length > 1) {
        $openHeight += (curr.titleRes.data.length - 1) * 18
      }
      addHeightArr[i] = $openHeight
      let resuce = addHeightArr.reduce((prev,next,index) => {
        if (index < i - 1) {
          return prev + (next || 0)
        } else {
          return prev
        }
      },0)
      boxPos.y += resuce
      let linePos = calculateTimeToEventLine(boxPos, timeRectPosY, _opt)
      // 渲染事件盒子
      renderData.rectBox.push({
        x: boxPos.x,
        y: boxPos.y + _opt.timePosY,
        w: _opt.eventWidth,
        h: _opt.eventHeight + $openHeight,
        r: _opt.eventRadio,
        d: curr,
        children: [{
          desc: '编辑'
        },{
          desc: '删除'
        }]
      })
      if (curr.descRes) {
        if (curr.descRes.omit && !activeOpt._id == curr._id) {
          renderData.watchArr.push({
            x: boxPos.x,
            y: boxPos.y + _opt.timePosY,
            w: _opt.eventWidth,
            h: _opt.eventHeight + $openHeight,
            key: 'rectBoxOpen',
            i: renderData.rectBox.length - 1
          })
        } else {
          renderData.watchArr.push({
            x: boxPos.x,
            y: boxPos.y + _opt.timePosY,
            w: _opt.eventWidth,
            h: _opt.eventHeight + $openHeight,
            key: 'rectBoxOpen',
            i: renderData.rectBox.length - 1
          })
        }
      }
      let editPermission = curr.permission && curr.permission.edit || false
      if (editPermission) {
        renderData.watchArr.push({
          x: boxPos.x + 255,
          y: boxPos.y + _opt.timePosY,
          w: _opt.eventWidth - 255,
          h: _opt.eventHeight + $openHeight,
          key: 'rectBox',
          i: renderData.rectBox.length - 1,
          children: [{
            x: boxPos.x + 285,
            y: boxPos.y + _opt.timePosY + 20,
            w: 60,
            h: 24,
            i: 0,
            clickCallback: 0
          },{
            x: boxPos.x + 285,
            y: boxPos.y + _opt.timePosY + 69,
            w: 60,
            h: 24,
            i: 1,
            clickCallback: 1
          }]
        })
      }
      renderData.connectLine.push({
        start: linePos.start,
        end: linePos.end
      })
      _opt.currNum ++
    })
    _opt.timePosY += timeBoxHeight
  })
  for(let i in _opt.monthsPointArr) {
    renderData.monthPoint.push(_opt.monthsPointArr[i])
    renderData.watchArr.push({
      x: _opt.canvasWidth / 2 - 90 * 0.75,
      y: _opt.monthsPointArr[i].offsetY - 20 / 2,
      w: 135,
      h: 20,
      key: 'monthPoint',
      i: renderData.monthPoint.length - 1,
      clickCallback: 2
    })
  }
  let currTime = Date.now()
  let allArr = calculateCurrentPos(renderData)
  for (let i = 1;i< allArr.length;i++) {
    let prev = allArr[i - 1].t
    let next = allArr[i].t
    if (prev > currTime &&
      next < currTime) {
      let allTime = prev - next
      let currTimePo = prev - currTime
      let allLen = allArr[i].y - allArr[i - 1].y
      CURRENTTIMEPOS = (allLen*currTimePo)/allTime + allArr[i -1].y
      break
    }else {
      CURRENTTIMEPOS = 0
    }
  }
  if (currTime < allArr[allArr.length - 1].t) {
    CURRENTTIMEPOS = renderData.opt.timePosY + 50
  }
  return renderData
}
function calculateCurrentPos (renderData) {
  let timeBoxData = renderData.timeBox
  let monthPointData = renderData.monthPoint
  let timeIndex = 1
  let monthIndex = 0
  let allArr = []
  for (let i = 0; i< timeBoxData.length + monthPointData.length - 1; i++) {
    if (!monthPointData[monthIndex]) {
      allArr.push({
        y: timeBoxData[timeIndex].y + timeBoxData[timeIndex].h + 9,
        t: timeBoxData[timeIndex].milliseconds
      })
      timeIndex++
      continue
    }
    if (!timeBoxData[timeIndex]) {
      allArr.push({
        y: monthPointData[monthIndex].offsetY,
        t: returnMilliseconds(monthPointData[monthIndex].time)
      })
      monthIndex++
      continue
    }
    if (timeBoxData[timeIndex].y + timeBoxData[timeIndex].h + 9 < monthPointData[monthIndex].offsetY) {
      allArr.push({
        y: timeBoxData[timeIndex].y + timeBoxData[timeIndex].h + 9,
        t: timeBoxData[timeIndex].milliseconds
      })
      timeIndex++
    } else {
      allArr.push({
        y: monthPointData[monthIndex].offsetY,
        t: returnMilliseconds(monthPointData[monthIndex].time)
      })
      monthIndex++
    }
  }
  return allArr
}
function returnMilliseconds(date) {
  let d = new Date(`${date} 00:00:00`)
  return d.getTime()
}
function renderDataFun(data) {
  let ctx = data.opt.ctx
  let canvasWidth = data.opt.canvasWidth
  let canvasHeight = data.opt.timePosY + 100
  data.opt.canvas.height = canvasHeight * RATIO
  data.opt.canvas.width = canvasWidth * RATIO
  data.opt.canvas.style.height = canvasHeight + 'px'
  data.opt.canvas.style.width = canvasWidth + 'px'
  // draw timeLine
  if (CURRENTTIMEPOS !== 0) {
    let bgcEl = document.querySelector('.timeLine-currBgc-con')
    bgcEl.style.height = CURRENTTIMEPOS + 100+ 'px'
    ctx.fillStyle = '#fffbf4'
    ctx.fillRect( 0, 0, canvasWidth * RATIO, CURRENTTIMEPOS * RATIO)
    ctx.fillStyle = '#f4f5f7'
    ctx.fillRect( 0, CURRENTTIMEPOS* RATIO, canvasWidth * RATIO, canvasHeight * RATIO)
  } else {
    let bgcEl = document.querySelector('.timeLine-currBgc-con')
    bgcEl.style.height = 0+ 'px'
    ctx.fillStyle = '#f4f5f7'
    ctx.fillRect( 0, 0, canvasWidth * RATIO, canvasHeight * RATIO)
  }
  ctx.fill()
  if (CURRENTTIMEPOS !== 0) {
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#505163'
    ctx.font = `400 ${16 * RATIO}px PingFangSC`
    ctx.fillText('今日', 0, CURRENTTIMEPOS - 40)
    ctx.renderImg('../image/dayTag.svg', 0, CURRENTTIMEPOS - 53, 95, 57)
  }
  ctx.globalAlpha = 0.8
  ctx.lineWidth = 2 * RATIO
  ctx.strokeStyle = '#505163'
  ctx.moveTo(canvasWidth / 2, 4)
  ctx.lineTo(canvasWidth / 2, 17)
  ctx.moveTo(canvasWidth / 2, 22)
  ctx.lineTo(canvasWidth / 2, 35)
  ctx.moveTo(canvasWidth / 2, 40)
  ctx.lineTo(canvasWidth / 2, canvasHeight)
  ctx.stroke()
  ctx.globalAlpha = 1

  data.timeBox.forEach((curr) => {
    if (curr.time !== '没有更多了') {
      ctx.tooltip(curr.x, curr.y, curr.w, curr.h, curr.r, curr.time, curr.color, curr.active)
    }
  })

  data.rectBox.forEach((curr) => {
    ctx.eventRender(curr.x, curr.y, curr.w, curr.h, curr.r, curr.d, curr.active, curr.children)
  })

  data.monthPoint.forEach((curr) => {
    if (curr.active) {
      ctx.lineWidth = 2 * RATIO
      ctx.roundRect(canvasWidth / 2 - 67, curr.offsetY - 9, 60, 18, 5)
      ctx.stroke()
      ctx.fillStyle = '#ffcf73'
      ctx.fill()
      ctx.textAlign = 'left'
      ctx.fillStyle = '#505163'
      ctx.font = `400 ${8 * RATIO}px PingFangSC`
      ctx.textBaseline = 'middle'
      ctx.fillText('+', canvasWidth / 2 - 60, curr.offsetY)
      ctx.fillText('新增事件', canvasWidth / 2 - 48, curr.offsetY)
      ctx.roundWithBorder(canvasWidth / 2, curr.offsetY, 4, '#ffcf73')
    } else {
      ctx.roundWithBorder(canvasWidth / 2, curr.offsetY, 4)
    }
    ctx.textAlign = 'left'
    ctx.fillStyle = '#505163'
    ctx.font = `400 ${12 * RATIO}px PingFangSC`
    ctx.textBaseline = 'middle'
    ctx.fillText(curr.time.slice(0,7), canvasWidth / 2 + 14, curr.offsetY)
  })

  data.connectLine.forEach((curr) => {
    ctx.connectionLine(curr.start, curr.end)
  })
}

function deleteEvent(data) {
  if (data.d._id) {
    showMask('delete-tip')
    _deleteData = data
  } else {
    alert('这只是个demo事件，无法操作')
  }


}

function editEvent(data) {
  if (data.d._id) {
    showMask('edit-event-con')
    _editData = data
    let editName = document.getElementById('edit-name')
    let editDesc = document.getElementById('edit-desc')
    let editTime = document.querySelector('.edit-event-con').querySelector('#editDatepicker')
    let editLiablePerson = document.getElementById('editLiablePerson')
    let editTimeLine = document.querySelector('.edit-event-con').querySelector('.add-timeLine-input')
    let logoList = document.querySelector('.edit-event-con').querySelector('.event-logo-list')
    let editTimeLineCon = document.querySelector('.edit-event-timeLine')
    for (let i = 0; i < logoList.children.length; i++ ) {
      if (logoList.children[i].getAttribute('data-url') === _editData.d.logo) {
        logoList.children[i].classList.add('event-logo-item_active')
      } else {
        logoList.children[i].classList.remove('event-logo-item_active')
      }
    }
    let _date = new Date(_editData.d.time)
    editTime.setAttribute('date-time', _date.getTime())
    editTime.value = formatTime(_editData.d.time)
    editName.value = _editData.d.title
    editDesc.value = _editData.d.description
    editLiablePerson.value = _editData.d.liablePerson || ''
    let timeLineLength = editTimeLineCon.children.length
    for (let k = timeLineLength - 1; k >= 0; k--) {
      let child = editTimeLineCon.children[k]
      if (child.classList.contains('timeLine-tags-item')) {
        child.parentNode.removeChild(child)
      }
    }
    for (let j = 0; j < _editData.d.timeLine.length; j++) {
      if (_editData.d.timeLine[j] !== '我创建的时间线') {
        let dom = document.createElement('div')
        let template = `<div data-value="${_editData.d.timeLine[j]}" class="timeLine-tags-item timeLine-tags-active">
                                <span>${_editData.d.timeLine[j]}</span>
                                <img class="timeLine-tags-close removeTimeLine" src="../image/close.svg" alt="">
                            </div>`
        dom.innerHTML = template
        editTimeLine.parentNode.parentNode.insertBefore(dom.childNodes[0], editTimeLine.parentNode)
      }
    }
  } else {
    alert('这只是个demo事件，无法操作')
  }
}
function addEvent(_data) {
  let nameEl = document.querySelector('#add-name')
  let timeEl = document.querySelector('#addDatepicker')
  let descEl = document.querySelector('#add-desc')
  let timeLineEl = document.querySelector('.add-event-timeLine')
  let addLiablePerson = document.querySelector('#addLiablePerson')
  let addInputEl = document.querySelector('.add-event-timeLine').querySelector('.add-timeLine-input')
  let timeLineLength = timeLineEl.children.length
  for (let k = timeLineLength - 1; k >= 0; k--) {
    let child = timeLineEl.children[k]
    if (child.classList.contains('timeLine-tags-item')) {
      child.parentNode.removeChild(child)
    }
  }
  let activeArr = []
  timeLineData.forEach(curr => {
    if (curr.active) {
      activeArr.push(curr.name)
    }
  })
  for (let j = 0; j < activeArr.length; j++) {
    if (activeArr[j] !== '我创建的时间线') {
      let dom = document.createElement('div')
      let template = `<div data-value="${activeArr[j]}" class="timeLine-tags-item timeLine-tags-active">
                                <span>${activeArr[j]}</span>
                                <img class="timeLine-tags-close removeTimeLine" src="../image/close.svg" alt="">
                            </div>`
      dom.innerHTML = template
      addInputEl.parentNode.parentNode.insertBefore(dom.childNodes[0], addInputEl.parentNode)
    }
  }
  addLiablePerson.value = ''
  nameEl.value = ''
  timeEl.value = ''
  descEl.value = ''
  let date = new Date
  pickerAdd.setDate(_data.time || `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
  showMask('add-event-con')
}


function appendTimeLine(arr) {
  let template = arr.reduce((prev,next) => {
    return prev + (next.name === '我创建的时间线' ? '' :`<li class="timeLine-list-item"><p>${next.name}</p></li>`)
  }, '')
  let listCon = document.querySelectorAll('.timeLine-list-con')
  let length = listCon.length
  for (let i = 0; i< length; i++) {
    listCon[i].innerHTML = template
  }
}

function resetTimeLine(timeLineData) {
  let data = {}
  let timeLineArr = mergeTimeLine(timeLineData)
  if (timeLineData[0]) {
    createTimeLineTypes(timeLineData)
  }
  TIMELINEARR = timeLineData
  appendTimeLine(TIMELINEARR)
  if (timeLineArr.length === 0) {
    timeLineArr.push({
      "title": "demo",
      "time": Date.now(),
      "description": "这只是一个demo事件",
      "logo": "./image/1.svg"
    })
  }
  timeLineArr.forEach((curr) => {
    curr.timeCn = formatTime(curr.time)
    data[curr.timeCn] ? data[curr.timeCn].push(curr) : data[curr.timeCn] = [curr]
  })
  let dataArr = Object.values(data).sort(function (prev, next) {
    return next[0].time - prev[0].time
  })
  dataArr.forEach((curr) => {
    curr.sort((prev,next) => {
      if (prev.time - next.time !== 0) {
       return prev.time - next.time
      } else {
        return parseInt(prev._id, 16) - parseInt(next._id, 16)
      }
    })
  })
  canvasElCtx.font = `400 ${12 * RATIO}px PingFangSC`
  openMoreWid = canvasElCtx.measureText('展开全部').width / RATIO
  dataArr.forEach((_curr) => {
    _curr.forEach((curr) => {
      curr.open = _showIDArr.some(_id => {
        return _id === curr._id
      })
      canvasElCtx.font = `500 ${14 * RATIO}px PingFangSC`
      curr.titleRes = fillText.call(canvasElCtx,curr.title, 220, RATIO, 1)
      canvasElCtx.font = `400 ${12 * RATIO}px PingFangSC`
      curr.descRes = fillText.call(canvasElCtx,curr.description, 220, RATIO, 2, 120)
    })
  })
  formatTimeLine = dataArr
  let formatData = formatDataFun(dataArr)
  _formatData = formatData
  requestAnimationFrame(function () {
    renderDataFun(formatData)
  })
}

function renderShuttle() {
  let notActiveTem = ''
  let activeTem = ''
  shuttleNotActive.innerHTML = ''
  shuttleActive.inner = ''
  timeLineData.forEach((curr, index) => {
    if (curr.active) {
      activeTem += `<div data-index="${index}" class="shuttle-timeline-item">
                            <p>${curr.name}</p>
                        </div>`
    } else {
      notActiveTem += `<div data-index="${index}" class="shuttle-timeline-item">
                            <p>${curr.name}</p>
                        </div>`
    }
  })
  shuttleNotActive.innerHTML = notActiveTem
  shuttleActive.innerHTML = activeTem
}