/* 引入自己的css */

require('../css/advertisement.less');



//立即执行以下代码  $(function(){})
document.ready(function () {

    //获取DOM
    let timeNumDom = document.querySelector('.time-text span');
    let timeBtn = document.querySelector('.time-btn');

    /*倒计时 自动跳转 */
    //间隔一秒执行一次
    let timer = setInterval(function () {
        //将获取的时间 -1；
        if (parseInt(timeNumDom.textContent) - 1 === 0) {
            // 清除定时器
            clearInterval(timer);
            //跳转页面
            location.href = './login.html'
        } else {
            let num = parseInt(timeNumDom.textContent) - 1;
            //渲染页面 将最新的时间 渲染回去
            timeNumDom.textContent = num;
        }
    }, 1000)


    /* 点击跳转 */
    timeBtn.addEventListener('click', function (ev) {
        //跳转页面
        location.href = './login.html'
    })






















})