$(document).ready(function() {

	scoreCount = 0;
	direction = "down";
	$("#pause-noti").hide();
	$("#super-food-timer").hide();
	foodCount = 1;
	superfood = false;
	superFoodTimer = 0;
	difficulty = 75;
	sameGame = false;
  play = false;
  paused = false;
  dead = false;
  prevPosition = "down";
  foodValue = 4;
  superFoodValue = 50;


  $(document).keydown(function(key) {
    switch(parseInt(key.which,10)) {
			case 37:
				if (direction !== "right") {
					direction = "left";
				}
				break;
			case 38:
				if (direction !== "down") {
					direction = "up";
				}
				break;
			case 39:
				if (direction !== "left") {
					direction = "right";
				}
				break;
			case 40:
				if (direction !== "up") {
					direction = "down";
				}
				break;
			case 32:
				if (paused === false ) {
					clearInterval(gameStart);
					paused = true;
					play = false;
	    		$("#pause-noti").toggle();
					break;
				}
				else {
					paused = false;
					gameStart = setInterval(move, difficulty);
					$("#pause-noti").toggle();
				}
		}
	});


  function move() {

  	if (superfood) {
  		superFoodTimer -= 1;
  		$("#super-food-timer").html(superFoodTimer);
  	}

  	lastLeft = $("#snake-head").position().left;
  	lastTop = $("#snake-head").position().top;
  	
  	if (direction === "left") {
  		if ($("#snake-head").position().left <= max_left) {
  			clearInterval(gameStart);
  			$("#food").remove();
  			dead = true;
  			prevPosition = "down";
  			// $('#food').css("background-color", "black");
  		}
  		else if (prevPosition !== "right") {
  			$('#snake-head').css("left", "-=15px");
  			prevPosition = "left";
  		}
  		else {
  			$('#snake-head').css("left", "+=15px");
  		}
  	}
  	else if (direction === "up") {
  		if ($("#snake-head").position().top <= max_top) {
  			clearInterval(gameStart);
  			$("#food").remove();
  			dead = true;
  			prevPosition = "down";
  			// $('#food').css("background-color", "black");
  		}
  		else if (prevPosition !== "down") {
  			$('#snake-head').css("top", "-=15px");
  			prevPosition = "up";
  		}
  		else {
  			$('#snake-head').css("top", "+=15px");
  		}
  	}
  	else if (direction === "right") {
  		if ($("#snake-head").position().left >= max_right) {
  			clearInterval(gameStart);
  			$("#food").remove();
  			dead = true;
  			prevPosition = "down";
  			// $('#food').css("background-color", "black");
  		}
  		else if (prevPosition !== "left") {
  			$('#snake-head').css("left", "+=15px");
  			prevPosition = "right";
  		}
  		else {
  			$('#snake-head').css("left", "-=15px");
  		}
  	}
  	else if (direction === "down") {
  		if ($("#snake-head").position().top >= max_bottom) {
  			clearInterval(gameStart);
  			$("#food").remove();
  			dead = true;
  			prevPosition = "down";
  			// $('#food').css("background-color", "black");
  		}
  		else if (prevPosition !== "up") {
  		$('#snake-head').css("top", "+=15px");
  		prevPosition = "down";
  		}
  		else {
  			$('#snake-head').css("top", "-=15px");
  		}
  	}
  	
  	wholeSnake = document.getElementById("game-box").childNodes;

  	snakeArr = [];

  	if (dead === false) {

	  	wholeSnake.forEach( function(body, index) {

	  		if (index != 0 && index != 1) {

	  			snakeArr.push(body.style);

	  			var target = "#snake-body-" + (index - 1);
		  		thisLeft = $(target).position().left;
		  		thisTop = $(target).position().top;
		  		$(target).css("left", lastLeft);
		  		$(target).css("top", lastTop);
		  		lastLeft = thisLeft;
		  		lastTop = thisTop;
		  	}

		  });

	  }

	  snakeArr.forEach( function(body) {
	  	if ((body.top === $("#snake-head").position().top + "px") && (body.left === $("#snake-head").position().left + "px") ) {
	  		clearInterval(gameStart);
	  		$("#food").remove();
	  	}
	  });


	  if (($("#snake-head").position().left === $("#food").position().left) && ($("#snake-head").position().top === $("#food").position().top)) {
	  	if (superfood) {
	  		scoreCount += superFoodTimer;
	  		foodCount += 1;
	  		superfood = false;
	  		$('#food').toggleClass("superfood");
	  		$('#super-food-timer').hide();
	  	}
	  	else {
	  	scoreCount += foodValue;
	  	foodCount += 1;
	  	// clearInterval(gameStart);
	  	// difficulty -= 20;
	  	// gameStart = setInterval(move, difficulty);
	  	}

	  	newTail = "snake-body-" + (document.getElementById("game-box").childNodes.length - 1);
  		diffSynNewTail = "#" + newTail;

	  	$("#score-count").html(scoreCount);
	  	$("#game-box").append("<div class=" + "snake " + "id=" + newTail + ">" + "</div>");
	  	$(diffSynNewTail).css("left", lastLeft);
	  	$(diffSynNewTail).css("top", lastTop);
	  	$(".snake").css("background-color", rand_color)

	  	allValidFoodLocation = gameBoxArr;

	  	snakeArr.forEach ( function(body) {
	  		allValidFoodLocation = allValidFoodLocation.filter( function(value) {
	  			return !(((value.up + "px") === body.top) && ((value.left + "px") === body.left));
	  		});
	  	});

	  	// ---------------------------- Causes lag ----------------------------------
	  	// allValidFoodLocation = allValidFoodLocation.filter( function(value) {
	  	// 		return !(((value.up) === $("#food").position().top) && ((value.left) === $("#food").position().left));
	  	// });

	  	var randPos = allValidFoodLocation[Math.floor((Math.random()*allValidFoodLocation.length))]

	  		$('#food').css("top", randPos.up );
	  		$('#food').css("left", randPos.left );


	  	if (foodCount%10 === 0) {
	  		superfood = true;
	  		superFoodTimer = superFoodValue;
	  		$('#food').toggleClass("superfood");
	  		$('#super-food-timer').show();
	  	}

	  }

  	
  }

  function randPosition () {
  	return String((Math.floor(Math.random()*25)*15))+"px";
  }

  // var d9ff =$(old_arr).not(new_array).get();

  $('#restart-game').click(function() {
  	clearInterval(gameStart);
  	play = false;
  	scoreCount = 0;
  	$("#score-count").html(scoreCount);
  	$("#game-box").remove();
  	$("#test").append("<div id=" + "game-box" + ">" + "</div>");
  	$("#game-box").append("<div id=" + "food" + ">" + "</div>");
  	$("#game-box").append("<div class=" + "snake " + "id=" + "snake-head" + ">" + "</div>");
  	$("#game-box").append("<div class=" + "snake " + "id=" + "snake-body-1" + ">" + "</div>");
  	$("#game-box").append("<div class=" + "snake " + "id=" + "snake-body-2" + ">" + "</div>");
  	direction = "down";
  	$("#tutorial").show();
  	$('#super-food-timer').hide();
  	$("#difficulty-controls").show();
  	sameGame = false;
	  foodCount = 1;
	  dead = false;
  })


  $('#easy-difficulty').click(function() {
  	difficulty = 100;
  	foodValue = 3;
  });

  $('#normal-difficulty').click(function() {
  	difficulty = 75;
  	foodValue = 4;
  });

  $('#hard-difficulty').click(function() {
  	difficulty = 50;
  	foodValue = 5;
  });





  $('#start-game').click(function() {
  	$("#tutorial").hide();
  	$("#difficulty-controls").hide();

  	if (play === false && paused === false) {
			play = true;

  		max_left = 0;
  		max_top = 0;
  		max_right = 435;
  		max_bottom = 435;

  		gameBoxArr = [];
	  	left = 0;
	  	up = 0;

  		while (left < 450 && up < 450) {
				var gridPosition = new GridPosition(left, up);
				gameBoxArr.push(gridPosition);
				if (left === 435) {
					left = 0;
					up += 15;
				}
				else {
					left += 15;
				}
			}

			function GridPosition(left, up) {
				  this.left = left;
				  this.up = up;
			}


	  	rand_color = ["#c5e1a5", "#ffe082", "#4fc3f7", "#f48fb1", "#ef9a9a", "#ce93d8", "#c5cae9", "#80cbc4", "#ffab91", "#fff59d"][Math.floor(Math.random() * 10)];
	  	$(".snake").css("background-color", rand_color)

	  	if (sameGame === false) {
		  	$('#food').css("top", randPosition());
		  	$('#food').css("left", randPosition());
		  }

  	sameGame = true;


		  gameStart = setInterval(move, difficulty);
		}
  })

  



});

