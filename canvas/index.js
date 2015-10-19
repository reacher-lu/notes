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