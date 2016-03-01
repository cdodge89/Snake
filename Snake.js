$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var speed = 100;
	var snake = [];
	var food = [];
	var direction = "right" //or "up","down","left"
	var level = 1;
	var levelDisplay = level;
	var cellWidth = 10;
	var levelUp = false;
	var backgroundColor = "#7ED891";
	var letterColor = "#A05625";
	var pixelColor = "#D35546";
	var strokeColor = backgroundColor; //"#6D5B50";
	var previousScheme = 0;
	var highScore = 0;
	var score = 0;


	var draw = true;

	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = strokeColor;
	ctx. strokeRect(0, 0, w, h);
	ctx.font="250px Impact";
	ctx.fillStyle = letterColor;
	ctx.fillText(levelDisplay, w/2 - 50, h/2 + 70);



makeSnake(snake);
paint(snake,cellWidth, "blue");
makeFood(food, cellWidth, "green", snake);

var gameIntervalID = window.setInterval(function(){
  moveSnake(direction, snake, food);
}, speed);

$(document).keydown(function (e) {
	// console.log(e.which);
    if (e.which == '37' && direction != "right") {
        direction = "left";
    } else if (e.which == '38' && direction != "down") {
        direction = "up";
    } else if (e.which == '39' && direction != "left") {
        direction = "right";
    } else if (e.which == '40' && direction != "up") {
        direction = "down";
    }
});

//can go 0-44 on the rows
//can go 0-44 on the columns
function makeFood(arr, cw, color, arrSnake){
	var i = getRandomInt(0,45);
	var j = getRandomInt(0,45);
	for (var a = 0; a < arrSnake.length; a++){
		if(i === arrSnake[a].x && j === arrSnake[a].y){
			console.log("worked");
			makeFood(arr, cw, color, arrSnake);
			return;
		}
	}
	arr.push({x:i,y:j});
}

function paint(arr, cw, color){
	for(var i = 0; i < arr.length; i++){
		var c = arr[i];
		ctx.fillStyle = color;
		ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
		ctx.strokeStyle = strokeColor;
		ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
		
	}
}

function makeSnake(arr){
	for(var i = 24; i > 19; i--){
		arr.push({x:i,y:22});
	}
}

function clearBoard(){
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = strokeColor;
	ctx. strokeRect(0, 0, w, h);
	levelDisplay = level;
	ctx.font="250px Oswald:700";
	ctx.fillStyle = letterColor;
	ctx.fillText(levelDisplay, w/2 - 50, h/2 + 70);
}


function moveSnake(dir, arr, arrFood){
	var x;
	var y;
	if(dir == "up"){
		x = 0;
		y = -1;
	} else if(dir == "down"){
		x = 0;
		y = 1;
	} else if(dir == "left"){
		x = -1;
		y = 0;
	} else {
		x = 1;
		y = 0;
	}
	lastCell = arr.pop();
	//console.log (arr);
	lastCell.x = arr[0].x + x;
	lastCell.y = arr[0].y + y;
	if(lastCell.x > 44 || lastCell.x < 0 || lastCell.y > 44 || lastCell.y < 0){
		reset();
	}
	arr.unshift(lastCell);
	for(var i = 1; i < arr.length; i++){
		if(arr[0].x === arr[i].x && arr[0].y === arr[i].y){
			reset()
		}
	}
	if (lastCell.x === arrFood[0].x && lastCell.y === arrFood[0].y){
		arr.push(arrFood.pop());
		score++;
		if(score > highScore){
			highScore = score;
		}
		$("#score").text(score + " ");
		$("#highScore").text(highScore);
		makeFood(arrFood, cellWidth, "green", arr);

		if(levelUp){
			nextLevel();
			previousScheme = changeColorScheme(previousScheme);
			levelUp = false;
		} else{
			levelUp = true;
		}
	}
	clearBoard();
	paint(snake, cellWidth, pixelColor);
	paint(food, cellWidth, pixelColor);
}

function reset(){
	snake = [];
	food = [];
	clearBoard();
	makeSnake(snake);
	makeFood(food, cellWidth, "green", snake);
	direction = "right";
	speed = 100;
	level = 1;
	levelUp = false;
	backgroundColor = "#7ED891";
	letterColor = "#A05625";
	pixelColor = "#D35546";
	strokeColor = backgroundColor; //"#6D5B50";
	$(".frame").css({"background": backgroundColor, "color": pixelColor});
	score = 0;
	$("#score").text(score + " ");
	if(typeof gameIntervalID != "undefined"){
		window.clearInterval(gameIntervalID);
	}
	
	gameIntervalID = window.setInterval(function(){
	  moveSnake(direction, snake, food);
	}, speed);

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function changeColorScheme(previousScheme){
	max = 11;
	min = 1;
	scheme = Math.floor(Math.random() * (max - min)) + min;
	if(scheme == previousScheme){
		return changeColorScheme(previousScheme);
	}
	if(scheme === 1){
		backgroundColor = "#ECDFBD";
		pixelColor = "#5E3448";
		letterColor = "#FB6648";
		strokeColor = backgroundColor;//"#3B3A35";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} else if(scheme === 2){
		backgroundColor = "#F2EEB3";
		pixelColor = "#59323C";
		letterColor = "#E45F56";
		strokeColor = backgroundColor;//"#35404F";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} else if(scheme === 3){
		backgroundColor = "#3D3D3D";
		pixelColor = "#83AA30";
		letterColor = "#BFAF80";
		strokeColor = backgroundColor;//"#E74700";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} else if(scheme === 4){
		backgroundColor = "#C4D4AF";
		pixelColor = "#F17D80";
		letterColor = "#68A8AD";
		strokeColor = backgroundColor;//"#6C8672";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} else if(scheme === 5){
		backgroundColor = "#9AADBD";
		pixelColor = "#753A48";
		letterColor = "#954F47";
		strokeColor = backgroundColor;//"#C05949";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} else if(scheme === 6){
		backgroundColor = "#F0F1EE";
		pixelColor = "#FFD464";
		letterColor = "#FB6964";
		strokeColor = backgroundColor;//"#333332";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} else if(scheme === 7){
		backgroundColor = "#F2D8A7";
		pixelColor = "#D94E67";
		letterColor = "#A68572";
		strokeColor = backgroundColor;//"#591E23";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} else if(scheme === 8){
		backgroundColor = "#1FDA9A";
		pixelColor = "#DB3340";
		letterColor = "#28ABE3";
		strokeColor = backgroundColor;//"#F7EAC8";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} else if(scheme === 9){
		backgroundColor = "#8C4646";
		pixelColor = "#D96459";
		letterColor = "#588C73";
		strokeColor = backgroundColor;//"#F2E394";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} else if(scheme === 10){
		backgroundColor = "#F38630";
		pixelColor = "#E0E4CC";
		letterColor = "#A7DBDB";
		strokeColor = backgroundColor;//"#008BBA";
		$(".frame").css({"background": backgroundColor, "color": pixelColor});
	} 
	console.log("scheme ",scheme);
	return scheme;
}

function nextLevel(){
	if(speed > 41){
		speed -= 2;
	}
	console.log("speed ", speed);
	
	if(typeof gameIntervalID != "undefined"){
		window.clearInterval(gameIntervalID);
	}
	gameIntervalID = setInterval(function(){
	  moveSnake(direction, snake, food);
	}, speed);
	level++;
}

});