//The Snake Object
var Snake = function (length, cellWidth,ctx) {
  this.defaultLength  = length;
  this.length = length;
  this.cellWidth = cellWidth;
  this.ctx = ctx;
  this.key;
  this.CreateSnake();
}

Snake.prototype.CreateSnake = function(){
  this.cells = [];
  this.direction = "right";
  this.length = this.defaultLength;
  //created so the head is in position [0]
  for(var i = this.length-1; i>= 0;i--){
    this.cells.push({x: i, y:0});
  }
}

Snake.prototype.Paint = function(){
  for(var i = 0; i < this.length; i++)
  {
    var cell = this.cells[i];
    //Lets paint 10px wide cells
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(cell.x*this.cellWidth, cell.y*this.cellWidth, this.cellWidth, this.cellWidth);
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(cell.x*this.cellWidth, cell.y*this.cellWidth, this.cellWidth, this.cellWidth);
  }
}

Snake.prototype.ManageLogic = function(){
  if(this.direction == "right") this.Move(1,0);
  else if (this.direction == "left") this.Move(-1,0);
  else if (this.direction == "up") this.Move(0,-1);
  else if (this.direction == "down") this.Move(0,1);
}
Snake.prototype.ManageMovement = function(){
  var dir = this.direction;
  //Prevent heading back onitself
  if(this.key == "37" && dir != "right") this.direction = "left";
  else if(this.key == "38" && dir != "down") this.direction  = "up";
  else if(this.key == "39" && dir != "left") this.direction = "right";
  else if(this.key == "40" && dir != "up") this.direction = "down";
}
//Move by x units in the X dir and Y units in the Y
Snake.prototype.Move = function(x,y){
    var tail = this.cells.pop();
    tail.x = this.cells[0].x + x; tail.y = this.cells[0].y +y;
    this.cells.unshift(tail);
}
Snake.prototype.Update = function(key){
  this.key = key;

  this.Paint();
  this.ManageLogic();
  this.ManageMovement();
}
$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
  var key;
  var snake = new Snake(5,10,ctx);

  function PaintCanvas(){
  	ctx.fillStyle = "white";
  	ctx.fillRect(0, 0, w, h);
  	ctx.strokeStyle = "black";
  	ctx.strokeRect(0, 0, w, h);
  }
  function RenderFrame(){
    PaintCanvas();
    snake.Update(key);
  }
  $(document).keydown(function(e){
    key = e.which;
  })

  //every 60ms render the frame
  game_loop =setInterval(RenderFrame, 60);
})
