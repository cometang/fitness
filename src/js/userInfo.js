require('../css/userInfo.less')


document.ready(function () {
    console.log(weui);

    //获取dom
    let genderDom = document.querySelector('#gender');
    let dengerText = document.querySelector('#dengerText');
    let birthdayDom = document.querySelector('#birthday');
    let birthdayText = document.querySelector('#birthdayText');
    let proDom = document.querySelector('#pro');
    let proText = document.querySelector('#proText');
    let cityDom = document.querySelector('#city');
    let cityText = document.querySelector('#cityText');

    //全局默认数据
    //地区
    let data = {
        nickname: '',
        gender: '',
        birthday: '',
        pro: '',
        city: '',
        sign: ''
    }



    //选择性别
    genderDom.addEventListener('click', function (ev) {
        //生成下拉列表

        weui.picker([{
            label: '男',
            value: 0
        }, {
            label: '女',
            value: 1
        }], {
            onConfirm: function (result) {
                console.log(result);
                dengerText.textContent = result[0].label
                data.gender = result[0].label;
            },
            title: '选择性别'
        });



    });


    //选择生日
    birthdayDom.addEventListener('click', function (ev) {
        weui.datePicker({
            start: 1920,
            end: new Date().getFullYear(),
            onConfirm: function (result) {
                console.log(result);
                birthdayText.textContent = `${result[0].value}-${result[1].value}-${result[2].value}`;
                data.birthday = birthdayText.textContent;
            },
            title: '选择生日'
        });
    })



    //选择省份
    proDom.addEventListener('click', function (ev) {
        //请求省级列表的 数据
        $http.get('/address/province', function (res) {
            console.log(res);

            let arr = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            weui.picker(arr, {
                onConfirm: function (result) {

                    // 清空已经选中的城市数据
                    data.city = '';
                    //清空页面显示的城市信息
                    cityText.textContent = '请选择';

                    //渲染页面
                    proText.textContent = result[0].label;
                    //保存数据
                    data.pro = result[0];
                    console.log(data);
                },
                title: '选择省份'
            });
        })

    })


    //选择城市
    cityDom.addEventListener('click', function (ev) {

        //判断是否选择了 省份
        if (data.pro == '') {
            utils.toast(0, '请先选择省份');
            return;
        }

        //获取城市列表
        $http.get('/address/city/' + data.pro.value, function (res) {
            console.log(res);
            //组装 城市下拉列表 数据
            let arr = res.data.map(function (item) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            weui.picker(arr, {
                onConfirm: function (result) {
                    // console.log(result);
                    //渲染页面
                    cityText.textContent = result[0].label;
                    //保存数据
                    data.city = result[0];
                    console.log(data);
                },
                title: '选择省份'
            });
        })


    })




















})