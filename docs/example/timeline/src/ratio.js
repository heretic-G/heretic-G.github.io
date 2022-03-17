// window.devicePixelRatio = 1

let RATIO = getPixelRatio(document.createElement('canvas'))

const CANVASFUNCTION = {
  moveTo: CanvasRenderingContext2D.prototype.moveTo,
  lineTo: CanvasRenderingContext2D.prototype.lineTo,
  arcTo: CanvasRenderingContext2D.prototype.arcTo,
  fillText: CanvasRenderingContext2D.prototype.fillText,
  drawImage: CanvasRenderingContext2D.prototype.drawImage,
  arc: CanvasRenderingContext2D.prototype.arc,
}

CanvasRenderingContext2D.prototype.moveTo = function (x,y) {
  CANVASFUNCTION.moveTo.call(this,x * RATIO,y * RATIO)
}
CanvasRenderingContext2D.prototype.lineTo = function (x,y) {
  CANVASFUNCTION.lineTo.call(this,x * RATIO,y * RATIO)
}
CanvasRenderingContext2D.prototype.arcTo = function (x1,y1,x2,y2,r) {
  CANVASFUNCTION.arcTo.call(this,x1 * RATIO,y1 * RATIO,x2 * RATIO,y2 * RATIO,r * RATIO)
}
CanvasRenderingContext2D.prototype.arc = function (x,y,r,sAngle,eAngle,counterclockwise) {
  CANVASFUNCTION.arc.call(this,x * RATIO,y * RATIO,r * RATIO,sAngle,eAngle,counterclockwise)
}
CanvasRenderingContext2D.prototype.fillText = function (text,x,y,maxWidth) {
  CANVASFUNCTION.fillText.call(this,text,x * RATIO,y * RATIO,maxWidth)
}
CanvasRenderingContext2D.prototype.drawImage = function (img,sx,sy,sw,sh,x,y,w,h) {
  let args = []
  let temp = [sx,sy,sw,sh,x,y,w,h]
  temp.forEach((curr) => {
    if (curr !== undefined) {
      args.push(curr * RATIO)
    }
  })
  args.unshift(img)
  CANVASFUNCTION.drawImage.apply(this,args)
}