var snake_move, paused;

$(document).ready(function() {

  var direction, stop, game_started;
  var default_pos = 180;
  var body_count = 2;
  var game_box_obj = $('#game-box')[0].getBoundingClientRect();
  var play = false;

  function reset_pos() {
      movement = { top: default_pos, left: default_pos };
      $.each($('.snake').get().reverse(), function(index, el){
        $(el).css(movement);
      });
  }

  function start_game() {
    if (!play) {
      var rand_color = ["#c5e1a5", "#ffe082", "#4fc3f7", "#f48fb1", "#ef9a9a", "#ce93d8", "#c5cae9", "#80cbc4", "#ffab91", "#fff59d"][Math.floor(Math.random() * 10)];
      $(".snake").css("background-color", rand_color);
      reset_pos();
      start_snake_move();
      play = true;
    }
  }

  function stop_game() {
    clearInterval(snake_move);
    play = false;
  }

  function pause_game() {
    clearInterval(snake_move);
  }

  function start_snake_move() {
    snake_move = setInterval(move_snake, 100);
  }

  // add position
  // if position exceed limit, dont apply and stop
  // else apply all css
  function move_snake() {
    var headCurrentLeft, headCurrentTop, bodyTop, bodyLeft;
    var headLastLeft = $("#snake-head").position().left;
    var headLastTop = $("#snake-head").position().top;

    if (direction === "left") {
      headCurrentLeft = headLastLeft - 15;
    }
    else if (direction === "up") {
      headCurrentTop = headLastTop - 15;
    }
    else if (direction === "right") {
      headCurrentLeft = headLastLeft + 15;
    }
    else if (direction === "down") {
      headCurrentTop = headLastTop + 15;
    }

    if(headCurrentTop >= 375 || headCurrentTop <= -15 || headCurrentLeft <= -15 || headCurrentLeft >= 375){
      stop_game();
      alert('Game Over');
      reset_pos();
    }
    else{
      $("#snake-head").css({top: headCurrentTop, left: headCurrentLeft});
      $.each($('.snake-body'), function(index, el){
        bodyTop = $(el).position().top;
        bodyLeft = $(el).position().left;
        $(el).css({top: headLastTop, left: headLastLeft});
        headLastTop = bodyTop;
        headLastLeft = bodyLeft;
      });
    }
  }

  $(document).keydown(function(key) {
    switch(parseInt(key.which, 10)) {
      case 37:
        if(direction != 'right'){ direction = "left" };
        break;
      case 38:
        if(direction != 'down'){ direction = "up"; }
        break;
      case 39:
        if(direction != 'left'){ direction = "right"; }
        break;
      case 40:
        if(direction != 'up'){ direction = "down"; }
        break;
    }
  });

  $('#start-game').click(function() {
    start_game();
  });

  $('#pause-game').click(function() {
    if($(this).attr('clicked')){
      paused = false;
      start_snake_move();
    }
    else {
      paused = true;
      pause_game();
    }
  });
});