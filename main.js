const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawLine(startPoint, endPoint, width=1, opacity=1) {
	ctx.beginPath();
	ctx.moveTo(startPoint.x, startPoint.y);
	ctx.lineTo(endPoint.x, endPoint.y);
	ctx.lineWidth = width;
	ctx.globalAlpha = opacity;
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
		this.width = 560
		this.height = 160
		this.topLeft = startingPoint
		this.bottomLeft = new Point(this.topLeft.x, this.topLeft.y + this.height)
		this.bottomRight = new Point(this.bottomLeft.x + this.width, this.bottomLeft.y)
		this.topRight = new Point(this.bottomRight.x, this.bottomRight.y - this.height)

		this.noOfNotes = 4
		this.typeOfNote = 1/4
		this.noOfBeats = this.noOfNotes / this.typeOfNote

		this.drawEdges()
		this.drawGridLines()
		this.drawVerticalLines()
	}

	drawEdges(){

		drawLine(this.topLeft, this.bottomLeft, 5);
		drawLine(this.bottomRight, this.topRight, 5);

	}

	drawVerticalLines() {
		var that = this
		var point1 = this.topLeft
		var point2 = this.bottomLeft
		drawLine(point1, point2)
		ctx.textAlign = "center";
		ctx.fillText("1", point1.x , point1.y);

		function addVericalLine(opacity=0.5) {
			point1 = new Point(point1.x + (that.width / (that.noOfBeats)), point1.y)
			point2 = new Point(point2.x + (that.width / (that.noOfBeats)), point2.y)
			drawLine(point1, point2, opacity=opacity)
		}

		for (var i = 1; i < this.noOfBeats; i++) {
			if (!(i % 4)) {
				addVericalLine(1)
				ctx.textAlign = "center";
				ctx.fillText((i/4) + 1, point1.x , point1.y);
			} else {
				addVericalLine()
			}
		}
	}

	drawGridLines() {
		var point1 = this.topLeft
		var point2 = this.topRight
		drawLine(point1, point2)
		point1 = new Point(point1.x, point1.y + (this.height / 8))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2, 0.5)
		point1 = new Point(point1.x, point1.y + (this.height / 8))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2)
		point1 = new Point(point1.x, point1.y + (this.height / 8))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2, 0.5)
		point1 = new Point(point1.x, point1.y + (this.height / 8))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2)
		point1 = new Point(point1.x, point1.y + (this.height / 8))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2, 0.5)
		point1 = new Point(point1.x, point1.y + (this.height / 8))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2)
		point1 = new Point(point1.x, point1.y + (this.height / 8))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2, 0.5)
		point1 = new Point(point1.x, point1.y + (this.height / 8))
		point2 = new Point(point1.x + this.width, point1.y)
		drawLine(point1, point2)
	}

}

class Sheet {
	constructor() {
		this.startingPoint = new Point(40, 40)
		this.bars = [new Bar(this.startingPoint)]
		this.verticalBarGap = 60
		this.barsPerLine = 2
	}

	addBar() {

		const lastBar = this.bars[this.bars.length - 1]

		if (this.bars.length % this.barsPerLine) {
			var bar = new Bar(lastBar.topRight)
		} else {
			const newLineStartingPoint = new Point(this.startingPoint.x, lastBar.bottomLeft.y + this.verticalBarGap)
			var bar = new Bar(newLineStartingPoint)
		}

		this.bars.push(bar)

	}
}

var sheet = new Sheet()
// sheet.addBar()