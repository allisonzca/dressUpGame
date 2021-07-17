var height = 500;
var width = 700;

var baseX = 275;
var baseY = 170;

var headX = baseX + 10;
var headY = baseY - 130;

var empty = {file: "images/empty.svg", type: "empty", x: 0, y: 0, width: 0};

var xScale = d3.scaleLinear()
	.domain([0, 700])
	.range([0, width]);

var yScale = d3.scaleLinear()
	.domain([0, 500])
	.range([0, height]);

var skinTones = [
	{r: 141, g: 85, b: 36},
	{r: 198, g: 134, b: 66},
	{r: 224, g: 172, b: 105},
	{r: 241, g: 194, b: 125},
	{r: 255, g: 219, b: 172}
	];

var heads = [{file: "images/head0.svg", x: headX, y: headY, width: 150}, 
	{file: "images/head1.svg", x: headX, y: headY, width: 150},
	{file: "images/head2.svg", x: headX, y: headY, width: 150},
	{file: "images/head3.svg", x: headX, y: headY, width: 150}, 
	{file: "images/head4.svg", x: headX, y: headY, width: 150}]


var bodies = [{file: "images/body0.svg", x: baseX, y: baseY, width: 150}, 
	{file: "images/body1.svg", x: baseX, y: baseY, width: 150}, 
	{file: "images/body2.svg", x: baseX, y: baseY, width: 150}, 
	{file: "images/body3.svg", x: baseX, y: baseY, width: 150},
	{file: "images/body4.svg", x: baseX, y: baseY, width: 150}]

var bases = [{head: heads[0], body: bodies[0], color: skinTones[0]},
	{head: heads[1], body: bodies[1], color: skinTones[1]},
	{head: heads[2], body: bodies[2], color: skinTones[2]},
	{head: heads[3], body: bodies[3], color: skinTones[3]},
	{head: heads[4], body: bodies[4], color: skinTones[4]}];

var items = [
	{file: "images/eyes1.svg", x: 335, y: 123, width: 80, type:"face"},
	{file: "images/hair1.svg", x: 260, y: 37.808, width: 187, type:"hair"},
	{file: "images/sweater1.svg", x: 278, y: 181, width: 144, type:"top"},
	{file: "images/pants1.svg", x: 318, y: 270, width: 86, type:"bottom"},
	{file: "images/sweater2.svg", x: 278, y: 181, width: 144, type:"top"},
	{file: "images/pants2.svg", x: 318, y: 270, width: 86, type:"bottom"},
	{file: "images/hair2.svg", x: 260, y: 37.808, width: 187, type:"hair"},
	{file: "images/glasses1.svg", x: 325, y: 130, width: 95, type:"hat"},
	{file: "images/shoes1.svg", x: 334.226, y:413.221, width: 89.335, type:"shoes"},
	{file: "images/shoes2.svg", x: 334.226, y:413.221, width: 89.335, type:"shoes"},
	{file: "images/glasses2.svg", x: 325, y: 130, width: 95, type:"hat"}
	
];

// defaults
var selectedHead = heads[4];
var selectedBody = bodies[4];
var selectedTop = items[2];
var selectedBottom = items[3];
var selectedShoes = empty;
var selectedFace = items[0];
var selectedHair = items[1];
var selectedHat = empty;

var selectedItems = 
[selectedBody, selectedShoes, selectedBottom, selectedTop, selectedHead, selectedFace, selectedHair, selectedHat];

var screen = d3.select("#screen")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var sky = screen.append("g");
var room = screen.append("g");
var character = screen.append("g");
var skins = screen.append("g");


// background ------------------------------------------------------

var bg = sky.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "#24609A");

// rain animation
d3.select("#rain").on("click", function() {
	startRain(true);
	startClouds(false);
	});

d3.select("#clouds").on("click", function() {
	startClouds(true);
	startRain(false);
	});

var rainAnimation;
var cloudAnimation;
function startRain(clicked) {
	if (clicked) {
		bg.transition()
			.duration(3000)
			.attr("fill", "#24609A");
	rainAnimation = setInterval(function() {

		var xPos = Math.random() * width + width * 0.3;
		var yPos = -40;
		var dropLength = Math.random() * 20 + 20;
		var dropWidth = Math.random() * 3;

		sky.append("rect")
			.attr("x", xPos)
			.attr("y", yPos)
			.attr("height", dropLength)
			.attr("width", dropWidth)
			.attr("fill", "#DDDDDD")
			.attr("opacity", Math.random() * 0.75)
			.transition()
				.duration(1300)
				.delay(function(d,i) { return Math.random() * i * 1000; })
				.ease(d3.easeQuadIn)
	            .attr("x", xPos)
	            .attr("y", height)
	            .remove();}, 30);
	} else {
		clearInterval(rainAnimation);
	}
}


function startClouds(clicked) {
	if (clicked) {
		bg.transition()
			.duration(3000)
			.attr("fill", "#6BB2CC");

		cloudAnimation = setInterval(function() {
		var yPos = Math.random() * 20;
		var xPos = Math.random() * 20;
		sky.append("svg:image")
		.attr("xlink:href", "images/cloud3.svg")
		    .attr("x", -100 + xPos)
		    .attr("y", yPos)
		    .transition()
				.duration(20000)
				.ease(d3.easeLinear)
	            .attr("x", width)
	            .attr("y", yPos)
	            .remove();}, 
	7000);

	} else {
		clearInterval(cloudAnimation);
	}

}

startRain(true);

// walls -------------------------------------------------------------
for (var i = 0; i < 10; i++) {
	room.append("rect")
		.attr("x", i * 0.1 * width)
		.attr("y", 0)
		.attr("width", 5)
		.attr("height", height)
		.attr("fill", "#533633");
	room.append("rect")
		.attr("x", 0)
		.attr("y", i * 0.15 * height - 20)
		.attr("width", width)
		.attr("height", 5)
		.attr("fill", "#533633");
}

var wall1 = room.append("rect")
	.attr("x", 0)
    .attr("y", 0)
    .attr("width", width * 0.3)
    .attr("height", height)
    .attr("fill", "#E4DDD4");

var wall2 = room.append("rect")
	.attr("x", width * 0.9 + 5)
    .attr("y", 0)
    .attr("width", width * 0.3)
    .attr("height", height)
    .attr("fill", "#E4DDD4");

var wall3 = room.append("rect")
	.attr("x", 0)
    .attr("y", height * 0.15 * 5 - 15)
    .attr("width", width)
    .attr("height", height * 0.3)
    .attr("fill", "#E4DDD4");

var floor = room.append("rect")
	.attr("x", 0)
    .attr("y", height * 0.15 * 5.5)
    .attr("width", width)
    .attr("height", height * 0.3)
    .attr("fill", "darkgray");

for (var n = 0; n < 6; n++) {
	room.append("line")
		.attr("x1", 0)
		.attr("y1", height * 0.825 + (Math.pow(n, 1.5)) * 7)
		.attr("x2", width)
		.attr("y2", height * 0.825 + (Math.pow(n, 1.5)) * 7)
		.attr("stroke", "gray")
		.attr("stroke-width", 2);
}


//character------------------------------------------------------------

function drawChar() {
	character.selectAll("image")
		.remove();

	var drawnItems = character.selectAll("image")
		.data(selectedItems)
		.enter()
		.append("svg:image")
			.attr("xlink:href", function(d) {return d.file;})
			.attr("x", function(d) {return xScale(d.x);} )
		    .attr("y", function(d) {return yScale(d.y);} )
		    .attr("width", function(d) {return d.width;} ); 
	}


// item box ---------------------------------------------------------
var itemBox = d3.select("#itemList");

var itemIcons = itemBox.selectAll("li")
	.data(items)
	.enter()
	.append("li")
		.attr("class", "item")
		.append("img")
			.attr("src", function(d) {return d.file;} );

drawChar();

var selected;
var imageData;

itemIcons.on("click", function() {
	imageData = d3.select(this)._groups[0][0].__data__;
	updateChar(imageData);});

function updateChar(newSelected) {
	if (newSelected != selected) {
		selected = newSelected;
		if (selected.type == "hair" && selectedItems[6] != selected) {
			selectedItems[6] = selected;
		}
		else if (selected.type == "face" && selectedItems[5] != selected) {
			selectedItems[5] = selected;
		}
		else if (selected.type == "hat" && selectedItems[7] != selected) {
			selectedItems[7] = selected;
		}
		else if (selected.type == "top" && selectedItems[3] != selected) {
			selectedItems[3] = selected;
		}
		else if (selected.type == "bottom" && selectedItems[2] != selected) {
			selectedItems[2] = selected;
		}
		else if (selected.type == "shoes" && selectedItems[1] != selected) {
			selectedItems[1] = selected;
		}
		drawChar();
	}
}



//skin tones--------------------------

var boxSize = 20;
var tonePalette = skins.selectAll("rect")
    .data(bases)
    .enter()
    .append("rect")
    	.attr("x", 10)
    	.attr("y", function(d, i) { return i * (boxSize + 10) + 10; })
    	.attr("width", boxSize)
    	.attr("height", boxSize)
    	.attr("fill", function(d) { return "rgb(" + d.color.r + ", " + d.color.g + ", " + d.color.b +  ")"; } )
    	.attr("stroke", function(d) { return "rgb(" + (d.color.r - 10) + ", " + (d.color.g - 30) + ", " + (d.color.b - 20) +  ")"; })
    	.style("cursor", "pointer")
    	.on("click", function(d) {
    		selectedItems[4] = d.head;
    		selectedItems[0] = d.body;
    		d3.selectAll("rect")
    			.attr("stroke-width", 1);
    		d3.select(this)
    			.transition()
    			.duration(250)
    			.ease(d3.easeLinear)
    			.attr("stroke-width", 3);
    		drawChar();
    	});


// clear ------------------------------
d3.selectAll(".clear").on("click", function() {
	if (this.id == "clearFace") {
		selectedItems[5] = empty;
	}
	else if (this.id == "clearHat") {
		selectedItems[7] = empty;
	}
	else if (this.id == "clearHair") {
		selectedItems[6] = empty;
	}
	else if (this.id == "clearTop") {
		selectedItems[3] = empty;
	}
	else if (this.id == "clearBottom") {
		selectedItems[2] = empty;
	}
	else if (this.id == "clearShoes") {
		selectedItems[1] = empty;
	}
	else if (this.id == "clearAll") {
		console.log("clear all");
		for (var i = 1; i < selectedItems.length; i++) {
			if (i !== 4) {
				selectedItems[i] = empty;
			}
		}
	}
	drawChar();
});