const MONTHMAP = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec']

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
function preFixNum(num) {
  if (num < 10) {
    return '0' + num
  } else {
    return '' + num
  }

}

function getPixelRatio (context) {
  let backingStore = context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
}

function formatTime(time) {
  let date = new Date(time)
  return `${date.getFullYear()}-${preFixNum(date.getMonth() + 1)}-${preFixNum(date.getDate())}`

}

function calculateTimeBox (eventNum, eventHeight = 120, eventSpace = 24) {
  if (eventNum === 1) {
    return 130
  } else {
    let result = eventNum / 2 | 0
    return eventHeight * (result + eventNum % 2) + eventSpace * (result)
  }

}

function paintMonths (newTime, timeRectPosY, timeBoxHeight, _opt) {
  let currPosY = _opt.timePosY + timeRectPosY
  if (typeof _opt.prevPos.y === 'number') {
    let monthArr = spaceMonths(_opt.prevPos.time, newTime)
    if (monthArr.length > 0) {
      let space = _opt.monthMin
      let difference = 0
      if (currPosY - _opt.prevPos.y > (monthArr.length + 1) * space + 48) {
        space = (currPosY - _opt.prevPos.y - 48) / (monthArr.length + 1)
        // 间隔距离足够
      } else {
        // 间隔距离不足
        difference = (monthArr.length + 1) * space + 48 - (currPosY - _opt.prevPos.y)
      }
      let prev = _opt.prevPos.y + 28
      monthArr.forEach((curr) => {
        prev += space
        _opt.monthsPointArr[curr] = {
          time: curr,
          offsetY: prev
        }
      })
      return difference
    }
  }
}

function calculateTimeRectPos (eventNum, timeBoxHeight) {
  if (eventNum < 3) return 44
  return timeBoxHeight / 2 - 24
}

function calculateEventSpace (eventNum, eventSpace, eventHeight) {
  let result = eventNum / 2 | 0
  return eventSpace * (result + eventNum % 2) + eventHeight * (result)
}
function calculateEventBoxPos (num, _opt) {
  let x
  if (_opt.currNum % 2 === 1) {
    x = _opt.canvasWidth / 2 - _opt.timeWidth / 2 - _opt.timeToEvent - _opt.eventWidth
  } else {
    x = _opt.canvasWidth / 2 + _opt.timeWidth / 2 + _opt.timeToEvent
  }
  return {
    x: x,
    y: calculateEventSpace(num, _opt.eventSpace, _opt.eventHeight)
  }
}

function calculateTimeToEventLine (eventPos, timeRectPosY, _opt) {
  let start = {
    x: eventPos.x,
    y: eventPos.y + _opt.timePosY
  }
  let end = {
    x: _opt.canvasWidth / 2,
    y: timeRectPosY + _opt.timePosY
  }
  if (_opt.currNum % 2 === 1) {
    start.x += _opt.eventWidth
    end.x -= _opt.timeWidth / 2
  } else {
    end.x += _opt.timeWidth / 2
  }
  start.y += 44
  return {
    start,
    end
  }
}

function getElemPos(el) {
  let pos = {"top":0, "left":0};
  if (el.offsetParent){
    while (el.offsetParent){
      pos.top += el.offsetTop;
      pos.left += el.offsetLeft;
      el = el.offsetParent;
    }
  }
  return {x:pos.left, y:pos.top};
}

function spaceMonths (old, curr) {
  let oldD = new Date(old)
  let currD = new Date(curr)
  if (oldD.getDate() === 1) {
    oldD.setHours(-24)
  }
  if(currD.getDate() === 1) {
    currD.setDate(2)
  }
  let result = []
  oldD.setDate(1)
  while(oldD.getTime() > currD.getTime()) {
    result.push(formatTime(oldD.getTime()))
    oldD.setMonth(oldD.getMonth() - 1)
  }
  return result
}

CanvasRenderingContext2D.prototype.connectionLine = function (start, end) {
  let x = end.x - start.x
  let y = end.y - start.y
  let xSign = x/Math.abs(x)
  let ySign = y/Math.abs(y)
  let radio = 15
  this.beginPath()
  this.strokeStyle = '#595968'
  this.moveTo(start.x, start.y)
  if (Math.abs(y) < 2 * radio) radio = Math.abs(y) / 2
  this.lineTo(start.x + x / 2 - xSign * radio, start.y)
  this.arcTo(start.x + x / 2, start.y,
    start.x + x / 2,start.y + ySign * radio, radio)
  this.lineTo(start.x + x / 2, end.y - ySign * radio)
  this.arcTo(start.x + x / 2, end.y                ,
    start.x + x / 2 + xSign * radio, end.y, radio)
  this.lineTo(end.x, end.y)
  this.stroke()
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y, x+w, y+h, r);
  this.arcTo(x+w, y+h, x, y+h, r);
  this.arcTo(x, y+h, x, y, r);
  this.arcTo(x, y, x+w, y, r);
  return this;
}

CanvasRenderingContext2D.prototype.tooltip = function (x, y, w, h, r, t, c, active) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  y = y + 7
  this.strokeStyle = '#FFCF73'
  this.globalAlpha = 0.4;
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y+h, r);
  this.lineTo(x + w / 2 + 9, y + h)
  this.lineTo(x + w / 2, y + h + 8)
  this.lineTo(x + w / 2 - 9, y + h)
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.fillStyle = '#FFCF73';
  this.fill();
  y = y - 7
  this.beginPath();
  this.globalAlpha = 1;
  this.strokeStyle = '#505163'
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y+h, r);
  this.lineTo(x + w / 2 + 9, y + h)
  this.lineTo(x + w / 2, y + h + 8)
  this.lineTo(x + w / 2 - 9, y + h)
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  if (active) {
    this.fillStyle = '#ffe4b0'
    this.fill();
    this.stroke()
    this.lineWidth = 2 * RATIO
    this.roundRect(x, y - 9, 60, 18, 5)
    this.stroke()
    this.fillStyle = '#ffcf73'
    this.fill()
    this.textAlign = 'left'
    this.fillStyle = '#505163'
    this.font = `400 ${8 * RATIO}px PingFangSC`
    this.textBaseline = 'middle'
    this.fillText('+', x + 8, y)
    this.fillText('新增事件', x + 20, y)
  } else {
    this.fillStyle = c || '#fff';
    this.fill();
    this.stroke()
  }
  this.fillStyle = '#505163'
  this.font = `500 ${18 * RATIO}px PingFangSC`
  this.textAlign = 'center'
  this.textBaseline = 'middle'
  this.fillText(t, x + w / 2, y + h / 2)
  return this;
}

CanvasRenderingContext2D.prototype.eventRender = function (x, y, w, h, r, d, active, children) {
  // 边框和背景
  this.roundRect(x, y, w, h, r)
  if (active) {
    this.globalAlpha = .2
    this.fillStyle = '#505163'
  } else {
    this.fillStyle = '#fff'
  }
  this.fill()
  this.globalAlpha = 1
  this.stroke()
  // 标题
  this.roundWithBorder(x + 18.5, y + 25, 5, '#ffcf73')
  this.textAlign = 'left'
  this.fillStyle = '#505163'
  this.font = `500 ${14 * RATIO}px PingFangSC`
  this.textBaseline = 'middle'
  // let titleWid
  // if (d.titleRes.omit) {
  //   this.fillText(d.titleRes.omit, x + 35, y + 24)
  //   titleWid = this.measureText(d.titleRes.omit).width / RATIO
  // } else {
  //   this.fillText(d.titleRes.data[0], x + 35, y + 24)
  //   titleWid = this.measureText(d.titleRes.data[0]).width / RATIO
  // }
  // this.roundWithBorder(x + 52 + titleWid, y + 25, 5, '#ffcf73')
  if(activeOpt._id == d._id) {
    this.font = `500 ${14 * RATIO}px PingFangSC`
    d.titleRes.data.forEach((curr, index) => {
      this.fillText(curr,x + 35, y + 24 + index * 16)
    })
    // 时间和描述
    this.globalAlpha = 0.8
    this.fillStyle = '#505163'
    this.font = `400 ${12 * RATIO}px PingFangSC`
    this.fillText(d.timeCn, x + 35, y + 50 + (d.titleRes.data.length - 1) * 16)
    // 责任人
    this.fillText(d.liablePerson || '', x + 120, y + 50 + (d.titleRes.data.length - 1) * 16)
    this.globalAlpha = 1
    d.descRes.data.forEach((curr, index) => {
      this.fillText(curr,x + 35, y + 75 + index * 16 + (d.titleRes.data.length - 1) * 16)
    })
    this.textAlign = 'left'
    this.fillStyle = '#505163'
  } else {
    this.font = `500 ${14 * RATIO}px PingFangSC`
    if (d.titleRes.omit) {
      this.fillText(d.titleRes.omit, x + 35, y + 24)
    } else {
      this.fillText(d.titleRes.data[0], x + 35, y + 24)
    }
    // 时间和描述
    this.globalAlpha = 0.8
    this.fillStyle = '#505163'
    this.font = `400 ${12 * RATIO}px PingFangSC`
    this.fillText(d.timeCn, x + 35, y + 50)
    // 责任人
    this.fillText(d.liablePerson || '', x + 120, y + 50)
    this.globalAlpha = 1

    if (d.descRes) {
      d.descRes.data.some((curr, index) => {
        if (index < 1) {
          this.fillText(curr,x + 35, y + 75 + index * 16)
        } else if (d.descRes.omit) {
          this.fillText(d.descRes.omit,x + 35, y + 75 + index * 16)
          this.textAlign = 'left'
          this.fillStyle = '#505163'
          return true
        } else {
          this.fillText(curr,x + 35, y + 75 + index * 16)
        }
      })
    }
  }
  if (active) {
    // 操作框
    this.strokeStyle = '#505163'
    this.roundRect(x + 256, y, 118, h, r)
    this.fillStyle = '#fff'
    this.fill()
    this.stroke()
    this.renderImg('./image/edit.svg', x + 285, y + 20, 24 ,24)
    this.fillStyle = '#505163'
    this.font = `300 ${12 * RATIO}px PingFangSC`
    if (children[0].active) {
      this.fillStyle = '#f4ae1f'
    }
    this.fillText('编辑', x + 321, y + 32)
    this.fillStyle = '#505163'
    this.renderImg('./image/delete.svg', x + 285, y + 69, 24 ,24)
    if (children[1].active) {
      this.fillStyle = '#f4ae1f'
    }
    this.fillText('删除', x + 321, y + 81)
    this.lineWidth = 1 * RATIO
    this.moveTo(x + 290, y + 57)
    this.lineTo(x + 290 + 48, y + 57)
    this.stroke()
    this.lineWidth = 2 * RATIO
  } else {
    // 图片
    this.renderImg(d.logo, x + 275, y + 15, 84, 84)
  }
}

CanvasRenderingContext2D.prototype.roundWithBorder = function (x, y, r, bc) {
  this.beginPath()
  this.arc(x, y, r, 0, 2 * Math.PI)
  this.strokeStyle = '#505163'
  this.fillStyle = bc || '#fff'
  this.fill()
  this.stroke()
}

function cache (callback) {
  let c = {}
  return function (key) {
    return c[key] || (c[key] = callback(key))
  }
}

function getImg (url) {
  return new Promise((resolve) => {
    let img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.src = url
  })
}
let cacheImg = cache(getImg)
CanvasRenderingContext2D.prototype.renderImg = function (url, x, y, w, h) {
  let imgResult = cacheImg(url)
  if (Object.prototype.toString.call(imgResult) === '[object Promise]') {
    imgResult.then((img) => {
      this.drawImage(img, x, y, w, h)
    })
  } else {
    this.drawImage(imgResult, x, y, w, h)
  }
}


function fillText (str, maxW, ratio, maxLine, lastWid) {
  maxW = maxW * ratio
  lastWid = lastWid || maxW
  if (str) {
    let length = str.length
    let strTemp = ''
    let strTempWid = 0
    let lineNum = 1
    let i = 0
    let result = {
      data: [],
      omit: ''
    }
    while (i < length) {
      let tempWid = this.measureText(str[i]).width
      if (strTempWid + tempWid > maxW) {
        result.data.push(strTemp)
        strTemp = str[i]
        strTempWid = tempWid
        lineNum++
      } else {
        strTemp += str[i]
        strTempWid += tempWid
      }
      i++
    }
    result.data.push(strTemp)
    if (maxLine && lineNum > maxLine) {
      let str = result.data[maxLine - 1]
      let strWid = this.measureText(str + '...').width
      while (strWid > lastWid){
        str = str.slice(0,str.length - 1)
        strWid = this.measureText(str + '...').width
      }
      result.omit = str + '...'
    }
    return result
  }
}