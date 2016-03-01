$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var checkerBoard = [];

	var cellWidth = 56.25;

	var draw = true;

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx. strokeRect(0, 0, w, h);


	
function makeCheckerBoard(){
	for(var i = 0; i < w/cellWidth; i++){
		if(i % 2 === 0){
			for(var j = 0; j < h/cellWidth; j += 2){
				checkerBoard.push({x:i, y:j});
			}
		} else {
			for(var j = 1; j < h/cellWidth; j += 2){
				checkerBoard.push({x:i, y:j});
			}
		}
	}
}
makeCheckerBoard();
console.log(checkerBoard);

function paint(arr, cw){
	for(var i = 0; i < arr.length; i++){
		var c = arr[i];
		ctx.fillStyle = "black";
		ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
		
	}
}

paint(checkerBoard, cellWidth);
});