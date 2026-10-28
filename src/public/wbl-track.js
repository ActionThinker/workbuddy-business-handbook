/* WorkBuddyLink CTA 转化埋点（v1.8.0 统计协议）
   机制：按钮/链接加 data-track="事件名"，点击时 sendBeacon 上报 stats.<域名>/api/evt（Cloudflare Worker → Analytics Engine）
   主域页面流量直连 GitHub Pages（绕开 CF 边缘），统计走独立子域——两条路分离互不影响
   事件名只含字母数字下划线；上报内容：事件名 + 页面路径（referrer 由 Worker 端读取） */
(function () {
  if (typeof navigator === 'undefined' || !navigator.sendBeacon) return;
  var EVT = 'https://stats.workbuddylink.com/api/evt';
  function send(name) {
    try {
      navigator.sendBeacon(EVT + '?n=' + encodeURIComponent(name) + '&p=' + encodeURIComponent(location.pathname));
    } catch (e) { /* 埋点失败静默，不影响用户操作 */ }
  }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var el = t.closest('[data-track]');
    if (el) send(el.getAttribute('data-track'));
  }, true);
})();
