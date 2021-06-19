/**
 * 工具函数
 */

const utils = {}

/**
 * @toast  页面的提示弹窗
 * @status number  0:失败 1：成功
 * @text   string  提示信息
 * @timer   Number  S
 */
utils.toast = function (status, text, timer = 1) {

    let toast = document.createElement('div');
    toast.className = 'toast';
    let html = `
        <div class=" icon" >
               ${status === 0 ? '!' : '√'}
        </div>
        <div class="toast-text">
           ${text}
        </div>
    `
    toast.innerHTML = html;
    document.querySelector('body').appendChild(toast);

    // 定时删除自己
    setTimeout(function () {
        toast.remove();
    }, timer * 1000)
}


/**
 * @addFooter    底部导航生成
 * @page String  哪个页面
 */

utils.addFooter = function (page) {
    //创建节点
    let footer = document.createElement('div');
    footer.className = 'footer dpflex flexaround alcenter';
    let html = `
        <a href="./home.html">
            <div class="${page === 'home' ? 'nav active' : 'nav'}">
                <div> <i class="iconfont iconhome"></i></div>
                <span>首页</span>
            </div>
        </a>
       
       <a href="./sports.html">
        <div class="${page === 'sports' ? 'nav active' : 'nav'}">
            <div> <i class="iconfont iconsports"></i></div>
            <span>运动</span>
        </div>
       </a>
        <a href="./about.html">
            <div class="${page === 'about' ? 'nav active' : 'nav'}">
                <div> <i class="iconfont iconmine"></i></div>
                <span>我的</span>
            </div>
        </a>
    `;
    footer.innerHTML = html;
    document.querySelector('body').appendChild(footer);



}




window.utils = utils;