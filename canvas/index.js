if (typeof CVS !== 'undefined') {
  console.log('CVS is occupied');
  return;
}

var
// 上一次执行的时间
  lastTime = 0,
  CVS = function(selector) {
    return CVS.fn.init(selector);
  };

CVS.fn = CVS.prototype = {
  init: function() {

  },

  calculateFPS: function() {
    var now = +new Date(),
      fps = 1000 / (now - lastTime);
    lastTime = now;
    return fps;
  }
}

function loadImage(imageURL, ImageLoadComplete) {
  var img = new Image();
  img.src = imageURL;
  img.onload = function() {
    if (img.complete === true) {
      ImageLoadComplete && ImageLoadComplete();
    }
  };
}

// 这个for循环从i=3开始 也就是第一个像素的透明度字段，每个四个循环一次（四个值组成完整一个像素），在循环过程中将透明度减半，其他三个红蓝绿复制给新的imageData对象。
function putImageDatas() {
  var newImageData = context.createImageData(canvas.width, canvas.height); 
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height); 
  for (var i = 3; i < imageData.data.length - 4; i += 4) {   
    newImageData.data[i] = imageData.data[i] / 2;   
    newImageData.data[i + 1] = imageData.data[i + 1];   
    newImageData.data[i + 2] = imageData.data[i + 2];   
    newImageData.data[i + 3] = imageData.data[i + 3]; 
  } 
  context.putImageData(newImageData, 0, 0, rect.left, rect.top, rect.width, rect.height);
}



var Draw = function(name, painter, behaviors) {
  if (name !== undefined) this.name = name;
  if (painter !== undefined) this.painter = painter;
  this.top = 0;
  this.left = 0;
  this.width = 0;
  this.height = 0;
  this.velocityX = 0;
  this.velocityY = 0;
  this.visible = true;
  this.animating = false;
  this.behaviors = behaviors || [];
}
Draw.prototype = {
  paint: function(context) {
    if (this.painter !== undefined && this.visible) {
      this.painter.paint(this, context);
    }
  },
  update:function(context,time){
    for(var i=0; i<this.behaviors.length;++i)
    {
      this.behaviors[i].execute(this,context,time);
    }
  }
}


















