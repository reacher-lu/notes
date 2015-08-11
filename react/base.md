#### ReactDOM.findDOMNode()


#### 问题

- defaultValue  为了控制用户不能输入我们可以指定value属性的值。当然你也有可能遇到一个输入框需要指定初始值的问题。但是当render渲染到页面之后，你会发现这个输入框变得不可编辑了，改用defaultValue



#### 坑

- 组件里面如果有多个元素，一定要用一个div包起来

``` js

var MessageBox = React.createClass({
    alertMessage:function (){
        alert('click!');
    },
    render:function (){
        return (
            <div>
                <h1 onClick={this.alertMessage}>hello world!</h1>
                <ClickBox/>
            </div>
        );
    }
});

```

- 定义的组件，组件名首字母一定要大写

- 部分dom属性不能用原生的写法绑定
    + class 用className
    + input等表单元素的value用defaultValue

- 一些事件是重新注册过的，需要注意
    + onClick
    + onKeyDown







