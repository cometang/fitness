
require('../css/login.less');
console.log('我是login.js');

document.ready(function () {
    // 获取dom

    let tell = document.querySelector('#tell');
    let pwd = document.querySelector('#pwd');
    let btn = document.querySelector('.btn');
    let jumpBtn = document.querySelector('.jump');


    //跳转到注册页面
    jumpBtn.addEventListener('click', function (ev) {
        location.href = './register.html'
    })



    btn.addEventListener('click', function (ev) {
        let data = {
            account: tell.value,
            password: pwd.value
        }
        $http.post('/users/login', data, function (res) {
            console.log(res);
            if (res.status === 0) {
                // alert('登录成功');
                utils.toast(1, '登录成功')
                //数据存到本地存储
                localStorage.setItem('user', JSON.stringify(res.data.user))
                //跳转页面
                setTimeout(function () {
                    location.href = './home.html'
                }, 1000)
            } else {

                utils.toast(0, '用户密码错误，请重新登录')
            }
        })
    })

})