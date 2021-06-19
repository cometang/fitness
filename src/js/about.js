require('../css/about.less');

document.ready(function () {
    let baseUrl = 'http://139.9.177.51:8099'
    /**调用生成 底部导航 */
    utils.addFooter('about');
    let user = JSON.parse(localStorage.getItem('user'));

    let imgDom = document.querySelector('.img-box img');
    let userNameDom = document.querySelector('.user-name');
    let userMsgDom = document.querySelector('.user-msg');
    let sportsTimeDom = document.querySelector('.sports-time');
    let sportsCalorieDom = document.querySelector('.sports-calorie');

    let fileBtn = document.querySelector('.file-btn');
    let userNameBox = document.querySelector('.user-name-box');


    //请求用户基本信息
    function getUserInfo() {
        $http.get('/users/accountinfo?userId=' + user.userId, function (res) {

            //页面渲染
            if (res.status == 0) {
                if (res.data.imgurl) {
                    imgDom.src = res.data.imgurl;
                }
                if (res.data.nickname) {
                    userNameDom.textContent = res.data.nickname;
                }
                if (res.data.sign) {
                    userMsgDom.textContent = res.data.sign;
                }
            }
        })
    }
    getUserInfo();

    //请求运动数据
    function getSports() {
        $http.get('/users/mysportsBadge?userId=' + user.userId, function (res) {

            if (res.status == 0) {


                if (res.data.sports.times) {
                    sportsTimeDom.textContent = res.data.sports.times + '分钟'
                }
                if (res.data.sports.calorie) {
                    sportsCalorieDom.textContent = res.data.sports.calorie + '千卡'
                }


            }
        })
    }
    getSports();


    // 监听input file  change事件
    fileBtn.addEventListener('change', function (ev) {
        //获取二进制 文件流
        // console.log(this.files[0]);
        $updateFile('/users/upload', 'imgurl', this.files[0], function (res) {
            if (res.status == 0) {
                //再次请求接口--修改用户的头像
                let data = {
                    userId: user.userId,
                    imgurl: baseUrl + res.data
                }
                editUserImg(data)

            }
        })
    });
    //点击图片触发input file 的点击事件
    imgDom.addEventListener('click', function (ev) {
        fileBtn.click();
        ev.stopPropagation();
    });

    //监听点击跳转--个人详情
    userNameBox.addEventListener('click', function (ev) {
        location.href = './userInfo.html'
    })

    //修改用户头像
    function editUserImg(data) {
        $http.post('/users/userEdit', data, function (res) {
            // console.log(data.imgurl);
            imgDom.src = data.imgurl;
            //用户提示
            utils.toast(1, '上传成功')
            //修改本地数据
            //
        })
    }

})