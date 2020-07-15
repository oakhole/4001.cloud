(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth)
				return;
			docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
			//关闭页面载入
			//doc.documentElement.style.webkitTouchCallout = "none"; //禁止弹出菜单
			//doc.documentElement.style.webkitUserSelect = "none"; //禁止选中

		};
	if(!doc.addEventListener)
		return;
	recalc(); 		
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


/* javascript */

// !(function(win, doc){
//     function setFontSize() {
//         // 获取window 宽度
//         // zepto实现 $(window).width()就是这么干的
//         var winWidth =  window.innerWidth;
//         // doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px' ;
//
//         // 2016-01-13 订正
//         // 640宽度以上进行限制 需要css进行配合
//         var size = (winWidth / 640) * 100;
//         doc.documentElement.style.fontSize = (size < 100 ? size : 100) + 'px' ;
//     }
//
//     var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
//
//     var timer = null;
//
//     win.addEventListener(evt, function () {
//         clearTimeout(timer);
//
//         timer = setTimeout(setFontSize, 300);
//     }, false);
//
//     win.addEventListener("pageshow", function(e) {
//         if (e.persisted) {
//             clearTimeout(timer);
//
//             timer = setTimeout(setFontSize, 300);
//         }
//     }, false);
//
//     // 初始化
//     setFontSize();
//
// }(window, document));



// !function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),l=o.match(/U3\/((\d+|\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector('meta[name="viewport"]');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);
// flex(100, 1);





