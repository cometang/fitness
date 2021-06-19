/**
 * 对 ajax 请求的封装
 */

const BASE_URL = 'http://139.9.177.51:8099'; // 接口请求的 URL

/**
 * 参数处理函数
 */
function stringifyParams(params) {
  let str = ''
  for (let key in params) {
    str += `&${key}=${params[key]}`
  }
  return str.substr(1)
}

/**
 * ajax请求对象
 */
const $http = {
  ajax: function (options) {
    // 默认参数
    const defaultOpts = {
      url: '',
      method: 'get',
      data: {},
    }

    // 合并参数 
    const params = Object.assign({}, defaultOpts, options)

    let method = params.method.toLowerCase()
    let url = BASE_URL + params.url
    let data = params.data
    let success = params.success

    let paramsStr = stringifyParams(data)

    // ajax部分
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText) // 数据直接处理成对象 方便渲染
        success(response)  // 传入回调
      }
    }

    if (method === 'get') {
      xhr.open(method, paramsStr ? url + '?' + paramsStr : url)
      xhr.send()
    } else if (method === 'post') {
      xhr.open(method, url)
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
      xhr.send(JSON.stringify(data))
    }
  },
  // 简洁版的 get 封装
  get: function (url, callback) {
    this.ajax({
      url: url,
      method: 'get',
      success: callback,
    })
  },
  // 简洁版的 post 封装
  post: function (url, params, callback) {
    this.ajax({
      url: url,
      method: 'post',
      data: params,
      success: callback,
    })
  }
}

// 文件上传
function $updateFile(url, fdKey, fdValue, success) {
  const xhr = new XMLHttpRequest();
  /*模仿form 传值 */
  const fd = new FormData();
  fd.append(fdKey, fdValue);

  xhr.open('POST', BASE_URL + url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const resData = JSON.parse(xhr.responseText)
      success(resData)
    }
  }
  xhr.send(fd);
}

window.$http = $http;
window.$updateFile = $updateFile
