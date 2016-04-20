//The Snake Object
var Snake = function (length, cellWidth,ctx) {
  this.defaultLength  = length;
  this.length = length;
  this.cellWidth = cellWidth;
  this.ctx = ctx;
  this.prevKey;
  this.CreateSnake();
}

Snake.prototype.CreateSnake = function(){
  delete cells;
  this.cells = [];
  this.direction = "right";
  var length  = 5;
  //created so the head is in position [0]
  for(var i = length-1; i>= 0;i--){
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
Snake.prototype.ManageMovement = function(key){
  var dir = this.direction;
  //Prevent heading back onitself
  if(key == "37" && dir != "right") this.direction = "left";
  else if(key == "38" && dir != "down") this.direction  = "up";
  else if(key == "39" && dir != "left") this.direction = "right";
  else if(key == "40" && dir != "up") this.direction = "down";
}
Snake.prototype.isCollides = function(x,y){
  for(var i = 0; i < this.cells.length; i++){
    if(this.cells[i].x == x && this.cells[i].y == y)
      return true;
  }
  return false;
}
Snake.prototype.BoundaryCheck = function(x,y){
    head = this.cells[0];
    if(x == -1 || y == -1 || x == 45 || y == 45)
      return true;
    return false;
}
//Move by x units in the X dir and Y units in the Y
Snake.prototype.Move = function(x,y){
    newX = this.cells[0].x + x;
    newY = this.cells[0].y + y;
    if(this.BoundaryCheck(newX,newY)){// || this.isCollides(newX,newY)){
      this.CreateSnake();
      return;
    }

    var tail = this.cells.pop();
    tail.x = newX; tail.y = newY;
    this.cells.unshift(tail);
}
Snake.prototype.Update = function(){
  this.Paint();
  this.ManageLogic();

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
    snake.Update();
  }
  $(document).keydown(function(e){
    key = e.which;
    snake.ManageMovement(key);
  })

  //every 60ms render the frame
  game_loop =setInterval(RenderFrame, 60);
})
