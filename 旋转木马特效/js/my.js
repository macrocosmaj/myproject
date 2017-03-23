/**
 * Created by jf on 2016/7/28.
 * 大纲
 * 先完成当鼠标移入盒子中 渐渐地显示箭头 就是利用animate函数修改箭头的层级
 * 然后让每一个图片都渐渐地回到自己的位置 其实就上将配置单的属性通过animate函数加到标签上
 * 完成鼠标点击事件
 * 1.点击左箭头
 * 1.1方法是将配置单的最后一项删除加到最前面
 * 1.2arr.unshift(arr.pop())
 * 2.点击右箭头
 * 2.1方法是将配置单的第一项删除加到最后面
 * 2.2arr.push(arr.shift())
 * 当一直快速的点击箭头时 旋转的速度回很快 影响用户体验
 * 解决方法：利用开关
 * 1先设置一个开关 开关的值为true
 * 2当点击事件发生时先判断开关的状态 为开就能够运行下面的代码 为关就不能运行下面的代码
 * 当进入时将开关的值改为false
 * 再点击是就不会运行点击事件中的代码
 * 当animate函数运行完时 结束
 * animate的回调函数是写在清除定时器之后运行的 所以可以利用回调函数来判断函数是否执行完成 并将开关打开
 *
 */
window.onload = function () {
    //找人
    var flag = true;
    var config = [
        {
            "width": 400,
            "top": 20,
            "left": 50,
            "opacity": 0.2,
            "zIndex": 2
        },//0
        {
            "width": 600,
            "top": 70,
            "left": 0,
            "opacity": 0.8,
            "zIndex": 3
        },//1
        {
            "width": 800,
            "top": 100,
            "left": 200,
            "opacity": 1,
            "zIndex": 4
        },//2
        {
            width: 600,
            top: 70,
            left: 600,
            opacity: 0.8,
            zIndex: 3
        },//3
        {
            "width": 400,
            "top": 20,
            "left": 750,
            "opacity": 0.2,
            "zIndex": 2
        }//4
    ];//其实就是一个配置单 规定了每张图片的大小位置层级透明度

    var wrap = document.getElementById("wrap");
    var slide = document.getElementById("slide");
    var ul = slide.children[0];
    var lis = ul.children;
    var arrow = document.getElementById("arrow");
    var arrLeft = document.getElementById("arrLeft");
    var arrRight = document.getElementById("arrRight");
//  当鼠标移入盒子 箭头渐渐地显示
    wrap.onmouseover = function () {
        animate(arrow, {"opacity": 1});
    };
    //当鼠标移出盒子 箭头渐渐地消失
    wrap.onmouseout = function () {
        animate(arrow, {"opacity": 0});
    };
    //根据配置单各就各位
    //for (var i = 0; i < lis.length; i++) {
    //    animate(lis[i], config[i]);//lis与config是一一对应的
    //}
    //需要经常使用 进行封装
    //function assign() {
    //    for (var i = 0; i < lis.length; i++) {
    //        animate(lis[i], config[i]);//lis与config是一一对应的
    //    }
    //}
    assign();
    //当清除定时器表示函数执行完成 利用回调函数将开关打开

        function assign() {
            for (var i = 0; i < lis.length; i++) {
                animate(lis[i], config[i],function(){
                    flag = true;//函数执行完成 将开关打开
                });//lis与config是一一对应的
            }
        }
    //页面加载完成后要执行一遍

//    点击箭头 图片旋转
//    点击右箭头 arr.push(arr.shift())
    arrRight.onclick = function () {
        if(flag){//如果为真 才能进来
            flag = false;
            //进来后会将开关关闭 在结束前不能进来
            config.push(config.shift());
            assign();
        }

    };
    arrLeft.onclick = function () {
        if(flag){//如果为真 才能进来
            flag = false;
            //进来后会将开关关闭 在结束前不能进来
            config.unshift(config.pop());
            assign();
        }
    };
};
