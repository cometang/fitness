
require('../css/register.less');

document.ready(function () {

    //获取dom
    let btn = document.querySelector('.btn');
    let tell = document.querySelector('#tell');
    let yzm = document.querySelector('#yzm');
    let pwd = document.querySelector('#pwd');
    let pwd1 = document.querySelector('#pwd1');
    let msgDom = document.querySelector('#msg');
    let jump = document.querySelector('.jump');
    let yzmText = '';
    //生成验证码
    let captcha = new CaptchaMini();
    captcha.draw(document.querySelector('#captcha'), function (res) {
        yzmText = res;
        console.log(res);
    });





    //监听点击注册按钮
    btn.addEventListener('click', function (ev) {
        if (tell.value == '') {
            utils.toast(0, '手机号格式错误');
            return;
        }
        if (pwd.value == '') {
            utils.toast(0, '密码格式错误');
            return;
        }
        if (pwd.value != pwd1.value) {
            utils.toast(0, '两次密码不一致');
            return;
        }
        if (yzm.value.toLowerCase() != yzmText.toLowerCase()) {

            utils.toast(0, '验证码错误');
            return;
        }

        let data = { account: tell.value, password: pwd.value };
        //请求注册接口
        $http.post('/users/add', data, function (res) {

            //判断请求是否成功
            if (res.status === 0) {
                //提醒用户  

                //实现自动登录功能
                login(data);
            } else {
                utils.toast(0, res.msg);
            }
        })
    })


    //登录功能
    function login(data) {
        $http.post('/users/login', data, function (res) {
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
    }



    //跳转登录
    jump.addEventListener('click', function (ev) {
        location.href = './login.html'
    })


})