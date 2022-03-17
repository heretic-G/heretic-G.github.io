class animationControl {
	constructor(el) {
    	this.renderArr = []
		this.canvas  = el
		this.ctx = el.getContext('2d')
  	}
	
	start () {
		this.cancelKey = requestAnimationFrame(this.draw)
	}
	stop () {
		cancelAnimationFrame(this.cancelKey || 0)
	}

	draw () {
		if (this.renderArr.length > 0) {
			renderArr
		}
	}
	
}