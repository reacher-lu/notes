## canvas

#### FPS
60FPS = 1000/16

100FPS跟400FPS，视觉上没有什么差异

#### drawImage
可绘制图像，canvas，某视频的一帧到画布中
context.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);

#### getImageData
var imgData=context.getImageData(x,y,w,h);
var data=imgData.data;
r,g,b,a (a为最后一个)

#### putImageData
context.putImageData(imageData,0,0);
context.putImageData(imageData,x,y,dx,dy,dw,dh);//后4个默认
#### createImageData

#### toDataURL
canvas.toDataURL()

#### canvas save restore

#### 离屏Canvas（off-screen canvas）

#### 像素操作

创建离屏canvas一般经过四个步骤
1.创建用作离屏的canvas元素（不一定添加到页面才叫离屏哈）。
2.设置离屏canvas宽度高度（不设置的话默认300*150）。
3.在离屏canvas中进行绘制。
4.将离屏canvas全部或者一部分复制到当前canvas中


#### web worker

#### 多层画布


#### requestanimationframe


#### canvas 暂停