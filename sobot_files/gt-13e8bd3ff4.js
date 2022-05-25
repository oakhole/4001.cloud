"v0.4.6 Geetest Inc.";!function(e){"use strict";function t(e){this._obj=e}function n(e){var n=this;new t(e)._each(function(e,t){n[e]=t})}if(void 0===e)throw new Error("Geetest requires browser environment");var o=e.document,r=e.Math,a=o.getElementsByTagName("head")[0];t.prototype={_each:function(e){var t=this._obj;for(var n in t)t.hasOwnProperty(n)&&e(n,t[n]);return this}},n.prototype={api_server:"api.geetest.com",protocol:"http://",typePath:"/gettype.php",fallback_config:{slide:{static_servers:["static.geetest.com","dn-staticdown.qbox.me"],type:"slide",slide:"/static/js/geetest.0.0.0.js"},fullpage:{static_servers:["static.geetest.com","dn-staticdown.qbox.me"],type:"fullpage",fullpage:"/static/js/fullpage.0.0.0.js"}},_get_fallback_config:function(){var e=this;return c(e.type)?e.fallback_config[e.type]:e.new_captcha?e.fallback_config.fullpage:e.fallback_config.slide},_extend:function(e){var n=this;new t(e)._each(function(e,t){n[e]=t})}};var i=function(e){return"number"==typeof e},c=function(e){return"string"==typeof e},f=function(e){return"boolean"==typeof e},s=function(e){return"object"==typeof e&&null!==e},l=function(e){return"function"==typeof e},u={},p={},d=function(){return parseInt(1e4*r.random())+(new Date).valueOf()},g=function(e,t){var n=o.createElement("script");n.charset="UTF-8",n.async=!0,n.onerror=function(){t(!0)};var r=!1;n.onload=n.onreadystatechange=function(){r||n.readyState&&"loaded"!==n.readyState&&"complete"!==n.readyState||(r=!0,setTimeout(function(){t(!1)},0))},n.src=e,a.appendChild(n)},_=function(e){return e.replace(/^https?:\/\/|\/$/g,"")},h=function(e){return 0!==(e=e.replace(/\/+/g,"/")).indexOf("/")&&(e="/"+e),e},v=function(e){if(!e)return"";var n="?";return new t(e)._each(function(e,t){(c(t)||i(t)||f(t))&&(n=n+encodeURIComponent(e)+"="+encodeURIComponent(t)+"&")}),"?"===n&&(n=""),n.replace(/&$/,"")},y=function(e,t,n,o){t=_(t);var r=h(n)+v(o);return t&&(r=e+t+r),r},b=function(e,t,n,o,r){var a=function(i){var c=y(e,t[i],n,o);g(c,function(e){e?i>=t.length-1?r(!0):a(i+1):r(!1)})};a(0)},m=function(t,n,o,r){if(s(o.getLib))return o._extend(o.getLib),void r(o);if(o.offline)r(o._get_fallback_config());else{var a="geetest_"+d();e[a]=function(t){r("success"==t.status?t.data:t.status?o._get_fallback_config():t),e[a]=void 0;try{delete e[a]}catch(e){}},b(o.protocol,t,n,{gt:o.gt,callback:a},function(e){e&&r(o._get_fallback_config())})}},w=function(e,t){var n={networkError:"网络错误",gtTypeError:"gt字段不是字符串类型"};if("function"!=typeof t.onError)throw new Error(n[e]);t.onError(n[e])};(e.Geetest||o.getElementById("gt_lib"))&&(p.slide="loaded"),e.initGeetest=function(t,o){var r=new n(t);t.https?r.protocol="https://":t.protocol||(r.protocol=e.location.protocol+"//"),"050cffef4ae57b5d5e529fea9540b0d1"!==t.gt&&"3bd38408ae4af923ed36e13819b14d42"!==t.gt||(r.apiserver="yumchina.geetest.com/",r.api_server="yumchina.geetest.com"),s(t.getType)&&r._extend(t.getType),m([r.api_server||r.apiserver],r.typePath,r,function(t){var n=t.type,a=function(){r._extend(t),o(new e.Geetest(r))};u[n]=u[n]||[];var i=p[n]||"init";"init"===i?(p[n]="loading",u[n].push(a),b(r.protocol,t.static_servers||t.domains,t[n]||t.path,null,function(e){if(e)p[n]="fail",w("networkError",r);else{p[n]="loaded";for(var t=u[n],o=0,a=t.length;o<a;o+=1){var i=t[o];l(i)&&i()}u[n]=[]}})):"loaded"===i?a():"fail"===i?w("networkError",r):"loading"===i&&u[n].push(a)})}}(window);