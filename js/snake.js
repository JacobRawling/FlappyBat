//The Snake Object
var Snake = function (length, cellWidth,ctx) {
  this.defaultLength  = length;
  this.length = length;
  this.cellWidth = cellWidth;
  this.ctx = ctx;
  this.CreateSnake();
}

Snake.prototype.CreateSnake = function(){
  this.cells = [];
  this.length = this.defaultLength;
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

}
Snake.prototype.ManageMovement = function(){

}
Snake.prototype.Update = function(){
  this.Paint();
  this.ManageLogic();
  this.ManageMovement();
}
$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
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

  //every 60ms render the frame
  game_loop =setInterval(RenderFrame, 60);
})
