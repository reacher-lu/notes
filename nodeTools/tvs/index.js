var express = require('express');
var fs = require("fs");
var path = require('path');
var request = require('request');
var timeout = require('connect-timeout');
var app = express();
app.use(timeout('10000'));

// console.log(timeout);
var rdir = {
  src: 'source.txt',
  dest: 'out.txt'
};
var adir = {
  src: path.resolve(__dirname, rdir.src),
  dest: path.resolve(__dirname, rdir.dest)
};
var forEachs = function(data, func) {
  data.forEach(function(e, i) {
    if (e.code === 'CategoryModule') {
      e.item.forEach(function(f, j) {
        f.modules.forEach(function(g, k) {
          func(g, k);
        });
      });
    } else {
      func(e, i);
    }
  });
};
fs.readFile(adir.src, function(err, data) {
  if (err) throw err;
  var bufferStr = data.toString();
  var idList = bufferStr.split(/\n/);
  var outputString = '';
  var completeState = 0;
  var idListLength = idList.length;
  var successCb = function(output,body,pageId){
    completeState++;
    // console.log(body);
    var matchStr = body.match(/\-\->\{.*\}<\/body>/);
    if (!matchStr) {
      output = completeState+'|'+pageId+'|数据读取失败';
      console.log(pageId+'数据读取失败');
      outputString += (output + '\n');
      return;
    }
    var data = matchStr[0].replace(/\-\->/, '').replace(/<\/body>/, '');
    var source = JSON.parse(data);
    // console.log('pageDiag data', source);
    var content = source.content;
    var data = {
      completeState:completeState,
      pageId:pageId,
      total: 0,
      timeRange: 0
    };
    var modulesArr = ['RecommendModule', 'ImgtextModule', 'ProductsModule'];
    forEachs(content, function(e, i) {
      if (/RecommendModule|ImgtextModule|ProductsModule/.test(e.code)) {
        data.total += e.products.length;
        e.products.forEach(function(f, j) {
          f.timeRange && data.timeRange++;
        });
      }
    });
    for (items in data){
      output += (data[items] + '|');
    }
    console.log('output',output);
    outputString += (output + '\n');
    completeCb();
  }
  var completeCb = function(){
    if(completeState === idListLength){
      console.log('outputString',outputString);
      fs.writeFile(adir.dest, outputString, function (err) {
        if (err) throw err;
      });
    }
  };
  console.log('total',idListLength);
  for (var i = 0; i < idListLength; i++) {
    (function(i){
      var pageId = idList[i];
      // console.log(pageId);
      var args = 'https://meidian-1.play.m.jaeapp.com/?iid=' + idList[i] + '&cpp=0&json=true';

      request(args, {timeout: 60000}, function(error, response, body) {
        var output = '';

        if(error){
          if(/ETIMEDOUT|ESOCKETTIMEDOUT/.test(error.code)){
            console.log(pageId + ' timeout');
            request(args, {timeout: 60000}, function(err, response, body) {
              if(err){
                completeState++;
                output = completeState+'|'+pageId+'|'+JSON.stringify(err);
                console.log('error',output);
                completeCb();
              };
              if (!err && response.statusCode == 200) {
                successCb(output,body,pageId);
              }
            });
            return;
          }
          completeState++;
          output = completeState+'|'+pageId+'|'+JSON.stringify(error);
          console.log('error',output);
          completeCb();
        }

        if (!error && response.statusCode == 200) {
          successCb(output,body,pageId);
        }
      });
    })(i);
  }
});