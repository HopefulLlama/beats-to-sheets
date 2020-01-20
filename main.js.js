const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawLine(startPoint, endPoint, width) {
	ctx.beginPath();
	ctx.moveTo(startPoint.x, startPoint.y);
	ctx.lineTo(endPoint.x, endPoint.y);
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.closePath();
}

class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

class Bar {
	constructor(startingPoint) {
		this.width = 280
		this.height = 80
		this.topLeft = startingPoint
		this.bottomLeft = new Point(this.topLeft.x, this.topLeft.y + this.height)
		this.bottomRight = new Point(this.bottomLeft.x + this.width, this.bottomLeft.y)
		this.topRight = new Point(this.bottomRight.x, this.bottomRight.y - this.height)

		this.drawBox()
		this.drawGridLines()
	}

	drawBox(){

		drawLine(this.topLeft, this.bottomLeft, 5);
		drawLine(this.bottomLeft, this.bottomRight, 1);
		drawLine(this.bottomRight, this.topRight, 5);
		drawLine(this.topRight, this.topLeft, 1);

	}

	drawGridLines() {
		var point1 = new Point(this.topLeft.x, this.topLeft.y + (this.height / 4))
		var point2 = new Point(this.topLeft.x + this.width, point1.y)
		drawLine(point1, point2, 1)

		point1 = new Point(point1.x, point1.y + (this.height / 4))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2, 1)

		point1 = new Point(point1.x, point1.y + (this.height / 4))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2, 1)
	}

}

class Sheet {
	constructor() {
		this.startingPoint = new Point(40, 40)
		this.bars = [new Bar(this.startingPoint)]
	}

	addBar() {

		const lastBar = this.bars[this.bars.length - 1]

		if (this.bars.length % 4) {
			var bar = new Bar(lastBar.topRight)
		} else {
			const newLineStartingPoint = new Point(this.startingPoint.x, lastBar.bottomLeft.y + 40)
			var bar = new Bar(newLineStartingPoint)
		}

		this.bars.push(bar)

	}
}

var sheet = new Sheet()
// sheet.addBar()