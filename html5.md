## HTML 5 相关

### 全屏   

#### 脚本

- js

``` javascript
// Launch fullscreen
function launchIntoFullscreen(elem){
  if (elem.requestFullscreen) {
    elem.requestFullScreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
}


// Whack fullscreen
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// the whole page
launchIntoFullscreen(document.documentElement); 
// any individual element
launchIntoFullscreen(document.getElementById("videoElement")); 
// Cancel fullscreen for browsers that support it!
exitFullscreen();

``` 

TIPS : 需要以用户的事件触发，不能直接执行全屏代码


#### 差异

- 前缀

- 表现

  + Gecko 会为元素自动添加 CSS 使其铺满屏幕： "width: 100%; height: 100%"
  + WebKit 则会让全屏的元素以原始尺寸居中到屏幕中央，其余部分变为黑色。需要手动添加css样式

  ``` css
  
  :-webkit-full-screen {  
    background: pink;  
  }  
  :-moz-full-screen {  
    background: pink;  
  }  
  :-webkit-full-screen video {  
    width: 100%;  
    height: 100%;  
  }  

  ```

  mozfullscreenchange
  mozfullscreenchange






#### 相关资料

[w3源文档](http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#api)

[详细说明](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)
