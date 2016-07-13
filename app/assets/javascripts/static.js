$(document).ready(function() {

  $(document).keydown(function(key) {
    switch(parseInt(key.which,10)) {
			case 37:
				direction = "left";
				break;
			case 38:
				direction = "up";
				break;
			case 39:
				direction = "right";
				break;
			case 40:
				direction = "down";
				break;
		}
	});


  function move() {
  	var lastLeft = $("#snake-head").position().left
  	var lastTop = $("#snake-head").position().top

  	if (direction === "left") {
  		$('#snake-head').css("left", "-=2vh");
  	}
  	else if (direction === "up") {
  		$('#snake-head').css("top", "-=2vh");
  	}
  	else if (direction === "right") {
  		$('#snake-head').css("left", "+=2vh");
  	}
  	else if (direction === "down") {
  		$('#snake-head').css("top", "+=2vh");
  	}
  	$('#snake-tail').css("left", lastLeft);
  	$('#snake-tail').css("top", lastTop);

  	document.getElementById("snake-tail").id = 'snake-body-1'
  	document.getElementById("snake-body-1").id = 'snake-tail'
  }


  var play = false;

  $('#start-game').click(function() {
  	if (play === false) {
	  	var rand_color = ["#c5e1a5", "#ffe082", "#4fc3f7", "#f48fb1", "#ef9a9a", "#ce93d8", "#c5cae9", "#80cbc4", "#ffab91", "#fff59d"][Math.floor(Math.random() * 10)];
	  	$(".snake").css("background-color", rand_color)
		  gameStart = setInterval(move, 200);
		}
		play = true;
  })

  $('#pause-game').click(function() {
  	clearInterval(gameStart);
  	play = false;
  })



});

