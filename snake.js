// alert("JS connected!")

$(document).ready(function(){
	//Setting up Canvas
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	//Set up greets System
	var gridNum = 20;
	var gridSize = canvas.width/gridNum;

	//Setting up player and candy objects
	var candy = {
		x:0,
		y:0,
		alive:false
	}

	var player ={
		x:7,
		y:7,
		//Not moving-5 ,Right-0, Left-1, Up-2, Down-3
		direction:5,
		alive:true,
		//Length of the snake
		tail:1
	}

	//Storing the coordinates of all body oparts in pairs of x y for each unit
	var snakeBody = [[7,7]];

	//Setting up keys
	var keyPressed = null;
	var leftKey = 37;
	var upKey = 38;
	var rightKey = 39;
	var downKey = 40;

	//Make a custom. insert function/method for our snakeBody array
	Array.prototype.insert=function(index,item){
		//.slpice(index_to_insert,no_of_intems_to_delete, new_items)
		this.splice(index,0,item);
	}

	//define our update (function)
	function update(){
		//1. Changing the direction of the snake based on users input
		if(keyPressed){
			if (keyPressed==rightKey &&player.direction!=1){
				player.direction=0;
			
			}
		
			if (keyPressed==leftKey &&player.direction!=0){
				player.direction=1;

			}
			if (keyPressed==upKey &&player.direction!=3){
				player.direction=2;

			}

			if (keyPressed==downKey &&player.direction!=1){
				player.direction=3;

			}

		}

		//2. Spawn the candy
		if(!candy.alive){
			//Generate random number from 0-19(for 20x20 grid system)
			candy.x= Math.floor(Math.random()*20);
			candy.y=Math.floor(Math.random()*20);

				var collided;

		//checking to see if the canfy spawns on top of the snake. If yes, spawn the candy and another random location

			do{
				collided=false;
				for (var i=0; i<player.tail;i++){
					if (candy.x==snakeBody[i][0] && candy.y==snakeBody[i][1]){
						collided=true;
						candy.x= Math.floor(Math.random()*20);
						candy.y=Math.floor(Math.random()*20);
						break;
					}
				}
					

			}while(collided);

			//candy is back to life

			candy.alive=true;
		}

		//3.check if the snake is eating the candy
		if(candy.x==player.x && candy.y==player.y){
			candy.alive=false;
			player.tail++;
		}

		//4. Check if the snake is eating itself
		if(player.tail>1){
			for(var i=0; i>player.tail;i++){
				if(player.x==snakeBody[i][0] && player.y==snakeBody[i][1]){
					player.alive=false;
					clearInterval(updates);
				}
			}
		}
		//5. Check to see if the snake is colliding with the border
		if(player.x<0 || player.x>19 || player.y<0 ||player.y>19){
			player.alive=false;
			clearInterval(updates);
		}

		snakeBody.insert(0,[player.x,player.y]);
		while(snakeBody.length>player.tail+1){
			snakeBody.pop();
		}


		switch(player.direction){
			//right
			case 0:player.x+=1;
			break;
			//Left
			case 1: player.x-=1;
			break;
			//up
			case 2: player.y-=1;
			break;
			//down
			case 3: player.y+=1;
		}

		if(player.alive){
			draw();
		}

	}
	//draw the game out
	function draw(){
		context.clearRect(0,0,canvas.width,canvas.height);
		//Drawing candy
		context.fillStyle="red";
		context.fillRect(candy.x*gridSize,candy.y*gridSize,gridSize,gridSize);
		//Drawing the snake
		for(var i=0; i<player.tail;i++){
			context.fillStyle="black";
			context.fillRect(snakeBody[i][0]*gridSize,snakeBody[i][1]*gridSize,gridSize,gridSize);
		}
	}


	//Keydown events
	$(window).on("keydown", function(event){
		keyPressed = event.which;
	});

	//Calling the functions
	update();
	var updates = setInterval(update, 100);
})










