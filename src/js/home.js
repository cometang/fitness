
// const jquery = require('jquery')

/*导入home页面的css */
require('../css/home.less');


document.ready(function () {
    //domo节点获取
    let rankDom = document.querySelector('#rank');
    let punchInDom = document.querySelector('#punchIn');
    let insigniaNumDom = document.querySelector('#insigniaNum');
    let cardBtn = document.querySelector('.card-btn');


    let user = JSON.parse(localStorage.getItem('user'));
    /**调用生成 底部导航 */
    utils.addFooter('home');
    var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        // autoplay: true,
        autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

    })



    //请求ajax--首页默认数据

    function getInfo() {
        $http.get('/headPageInfo?userId=' + user.userId, function (res) {
            // 判断是否成功拿到数据
            if (res.status == 0) {
                rankDom.textContent = res.data.rank;
                punchInDom.textContent = res.data.punchIn;
                insigniaNumDom.textContent = res.data.insigniaNum;

                //判断是否显示/隐藏 打卡按钮
                // 已经打卡
                if (res.data.isPunch === 'true') {
                    cardBtn.style.display = 'none';
                } else {
                    cardBtn.style.display = 'block';
                }

            }
        })
    }
    getInfo();


    //点击立即打卡按钮
    cardBtn.addEventListener('click', function (ev) {
        //请求后端的打卡接口
        $http.get('/clockIn?userId=' + user.userId, function (res) {
            if (res.status === 0) {
                utils.toast(1, '打卡成功');
                //打卡成功之后 重新拉取首页数据 重新渲染首页的所有数据
                getInfo();
            } else {
                utils.toast(0, res.msg);
            }
        })
    })

})