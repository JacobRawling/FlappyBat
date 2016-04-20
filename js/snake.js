//The Snake Object
var Snake = function (length) {
  this.defaultLength  = length;
  this.length = length;
  this.cells;
  this.cellWidth = cellWidth;
}

Snake.prototype.CreateSnake = function(){
  this.length = this.defaultLength;
  for(var i = this.length-1; i>= 0;i--){
    this.cells.push({x: i, y:0});
  }
}

Snake.prototype.Paint = function(){
  for(var i = 0; i < snake_array.length; i++)
  {
    var cell = this.cells[i];
    //Lets paint 10px wide cells
    ctx.fillStyle = "blue";
    ctx.fillRect(cell.x*cw, cell.y*cw, cw, cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(cell.x*cw, cell.y*cw, cw, cw);
  }
}

Snake.prototype.Update = function(){
  this.Paint();
}
$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

  function PaintCanvas(){
  	ctx.fillStyle = "white";
  	ctx.fillRect(0, 0, w, h);
  	ctx.strokeStyle = "black";
  	ctx.strokeRect(0, 0, w, h);
  }
  function RenderFrame(){
    PaintCanvas();

  }

  //every 60ms render the frame
  game_loop =setInterval(RenderFrame, 60);
})
