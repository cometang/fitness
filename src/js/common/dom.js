/**
 * 对 DOM 操作的封装
 */

// 原生实现 JQuery 的 $(function() {})
document.ready = function(callback) {
  // 兼容 Chrome、FireFox 等
  if (document.addEventListener) {
    // DOMContentLoaded | MDN：https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded
    // 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
    document.addEventListener('DOMContentLoaded', function() {
      callback();
    });
  }
  // 兼容 IE - 了解
  else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        callback();
      }
    })
  }
  else if (document.lastChild === document.body) {
    callback()
  }
}
