## 正则表达式

#### 常用正则表达式

- 空格 /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

``` bash
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
```
