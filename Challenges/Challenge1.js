$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	var cw = 50;

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx. strokeRect(0, 0, w, h);

	ctx.fillStyle = "blue";
	ctx.fillRect(200, 200, cw, cw);
	ctx.strokeStyle = "black";
	ctx.strokeRect(200, 200, cw, cw);

	ctx.fillStyle = "blue";
	ctx.fillRect(150, 150, cw, cw);
	ctx.strokeStyle = "black";
	ctx.strokeRect(150, 150, cw, cw);

	ctx.fillStyle = "blue";
	ctx.fillRect(250, 250, cw, cw);
	ctx.strokeStyle = "black";
	ctx.strokeRect(250, 250, cw, cw);

	ctx.fillStyle = "blue";
	ctx.fillRect(250, 150, cw, cw);
	ctx.strokeStyle = "black";
	ctx.strokeRect(250, 150, cw, cw);

	ctx.fillStyle = "blue";
	ctx.fillRect(150, 250, cw, cw);
	ctx.strokeStyle = "black";
	ctx.strokeRect(150, 250, cw, cw);
});
