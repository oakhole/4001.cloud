var link = document.location.href;
var refer = document.referrer;
var tool = {
  setCookie: function (cname, cvalue, cday) {
    var d = new Date();
    d.setTime(d.getTime() + cday * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
  },
  getCookie: function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  },
  checkCookie: function () {
    var qd = this.getCookie("qd");
    if (qd != "") {
      console.log(qd);
    } else {
      console.log(link);
    }
  }
};
/* .................. 移动端导航栏 .................. */
$(function () {
  $("nav#menu").mmenu({
    extensions: ["border-full", "effect-menu-slide", "pageshadow", "pagedim-black", "theme-dark"],
    offCanvas: {
      position: "right"
    },
    navbar: {
      title: "导航栏"
    },
    navbars: [
      {
        position: "top"
      }
    ]
  });
});
// 渠道判断相关.........................渠道判断相关
// 来源链接判断----设置session qd--------------重要
if (
  refer == "" ||
  refer == null ||
  (link.indexOf("baidu.com") > 0 && link.indexOf("baidu.php") < 0) ||
  (refer.indexOf("baidu.php") > 0 && (link.indexOf("medium=CPC") > 0 || link.indexOf("medium=cpc") > 0)) ||
  link.indexOf("baidu.php") > 0 ||
  link.indexOf("medium=CPC") > 0 ||
  link.indexOf("medium=cpc") > 0 ||
  link.indexOf("hmsr") > 0 ||
  link.indexOf("so.com") > 0 ||
  link.indexOf("sogou.com") > 0 ||
  link.indexOf("media=sogou") > 0 ||
  link.indexOf("zhihu") > 0 ||
  link.indexOf("知乎") > 0 ||
  link.indexOf("%E7%9F%A5%E4%B9%8E") > 0 ||
  link.indexOf("sm.cn") > 0 ||
  link.indexOf("toutiao") > 0 ||
  link.indexOf("bing.com") > 0 ||
  link.indexOf("google.com") > 0 ||
  link.indexOf("m.hollycrm.com/?source=yunkefu") > 0 ||
  link.indexOf("webchat/?source=yunkefu") > 0
) {
  sessionStorage.setItem("qd", link);
} else {
  if (sessionStorage.getItem("qd") == null || sessionStorage.getItem("qd") == "") {
    sessionStorage.setItem("qd", refer + "||" + link);
  } else {
    var sessionQd = sessionStorage.getItem("qd");
    if (
      sessionQd.indexOf("baidu.php") < 0 &&
      sessionQd.indexOf("baidu.com") < 0 &&
      sessionQd.indexOf("medium=CPC") < 0 &&
      sessionQd.indexOf("medium=cpc") < 0 &&
      sessionQd.indexOf("hmsr") < 0 &&
      sessionQd.indexOf("so.com") < 0 &&
      sessionQd.indexOf("sogou.com") < 0 &&
      sessionQd.indexOf("media=sogou") < 0 &&
      sessionQd.indexOf("zhihu") < 0 &&
      sessionQd.indexOf("知乎") < 0 &&
      sessionQd.indexOf("%E7%9F%A5%E4%B9%8E") < 0 &&
      sessionQd.indexOf("sm.cn") < 0 &&
      sessionQd.indexOf("bing.com") < 0 &&
      sessionQd.indexOf("google.com") < 0 &&
      sessionQd.indexOf("a6.7x24cc.com") < 0 &&
      sessionQd.indexOf("m.hollycrm.com/?source=yunkefu") < 0 &&
      sessionQd.indexOf("webchat/?source=yunkefu") < 0
    ) {
      sessionStorage.setItem("qd", refer + "||" + link);
    }
  }
}
// 来源链接判断----设置cookie qd---------------重要
if (
  refer == "" ||
  refer == null ||
  (link.indexOf("baidu.com") > 0 && link.indexOf("baidu.php") < 0) ||
  (refer.indexOf("baidu.php") > 0 && (link.indexOf("medium=CPC") > 0 || link.indexOf("medium=cpc") > 0)) ||
  link.indexOf("baidu.php") > 0 ||
  link.indexOf("medium=CPC") > 0 ||
  link.indexOf("medium=cpc") > 0 ||
  link.indexOf("hmsr") > 0 ||
  link.indexOf("so.com") > 0 ||
  link.indexOf("sogou.com") > 0 ||
  link.indexOf("media=sogou") > 0 ||
  link.indexOf("zhihu") > 0 ||
  link.indexOf("知乎") > 0 ||
  link.indexOf("%E7%9F%A5%E4%B9%8E") > 0 ||
  link.indexOf("sm.cn") > 0 ||
  link.indexOf("toutiao") > 0 ||
  link.indexOf("bing.com") > 0 ||
  link.indexOf("google.com") > 0 ||
  link.indexOf("m.hollycrm.com/?source=yunkefu") > 0 ||
  link.indexOf("webchat/?source=yunkefu") > 0
) {
  tool.setCookie("qd", link, 1);
} else {
  if (tool.getCookie("qd") == "" || tool.getCookie("qd") == null) {
    tool.setCookie("qd", refer + "||" + link, 1);
  } else {
    var cookieQd = tool.getCookie("qd");
    if (
      cookieQd.indexOf("baidu.php") < 0 &&
      cookieQd.indexOf("baidu.com") < 0 &&
      cookieQd.indexOf("medium=CPC") < 0 &&
      cookieQd.indexOf("medium=cpc") < 0 &&
      cookieQd.indexOf("hmsr") < 0 &&
      cookieQd.indexOf("so.com") < 0 &&
      cookieQd.indexOf("sogou.com") < 0 &&
      cookieQd.indexOf("media=sogou") < 0 &&
      cookieQd.indexOf("zhihu") < 0 &&
      cookieQd.indexOf("知乎") < 0 &&
      cookieQd.indexOf("%E7%9F%A5%E4%B9%8E") < 0 &&
      cookieQd.indexOf("sm.cn") < 0 &&
      cookieQd.indexOf("bing.com") < 0 &&
      cookieQd.indexOf("google.com") < 0 &&
      cookieQd.indexOf("a6.7x24cc.com") < 0 &&
      cookieQd.indexOf("m.hollycrm.com/?source=yunkefu") < 0 &&
      cookieQd.indexOf("webchat/?source=yunkefu") < 0
    ) {
      tool.setCookie("qd", refer + "||" + link, 1);
    }
  }
}
// 来源链接判断----设置localStorage qd--------------重要
if (
  refer == "" ||
  refer == null ||
  (link.indexOf("baidu.com") > 0 && link.indexOf("baidu.php") < 0) ||
  (refer.indexOf("baidu.php") > 0 && (link.indexOf("medium=CPC") > 0 || link.indexOf("medium=cpc") > 0)) ||
  link.indexOf("baidu.php") > 0 ||
  link.indexOf("medium=CPC") > 0 ||
  link.indexOf("medium=cpc") > 0 ||
  link.indexOf("hmsr") > 0 ||
  link.indexOf("so.com") > 0 ||
  link.indexOf("sogou.com") > 0 ||
  link.indexOf("media=sogou") > 0 ||
  link.indexOf("zhihu") > 0 ||
  link.indexOf("知乎") > 0 ||
  link.indexOf("%E7%9F%A5%E4%B9%8E") > 0 ||
  link.indexOf("sm.cn") > 0 ||
  link.indexOf("toutiao") > 0 ||
  link.indexOf("bing.com") > 0 ||
  link.indexOf("google.com") > 0 ||
  link.indexOf("m.hollycrm.com/?source=yunkefu") > 0 ||
  link.indexOf("webchat/?source=yunkefu") > 0
) {
  localStorage.setItem("qd", link);
} else {
  if (localStorage.getItem("qd") == null || localStorage.getItem("qd") == "") {
    localStorage.setItem("qd", refer + "||" + link);
  } else {
    var localQd = localStorage.getItem("qd");
    if (
      localQd.indexOf("baidu.php") < 0 &&
      localQd.indexOf("baidu.com") < 0 &&
      localQd.indexOf("medium=CPC") < 0 &&
      localQd.indexOf("medium=cpc") < 0 &&
      localQd.indexOf("hmsr") < 0 &&
      localQd.indexOf("so.com") < 0 &&
      localQd.indexOf("sogou.com") < 0 &&
      localQd.indexOf("media=sogou") < 0 &&
      localQd.indexOf("zhihu") < 0 &&
      localQd.indexOf("知乎") < 0 &&
      localQd.indexOf("%E7%9F%A5%E4%B9%8E") < 0 &&
      localQd.indexOf("sm.cn") < 0 &&
      localQd.indexOf("bing.com") < 0 &&
      localQd.indexOf("google.com") < 0 &&
      localQd.indexOf("a6.7x24cc.com") < 0 &&
      localQd.indexOf("m.hollycrm.com/?source=yunkefu") < 0 &&
      localQd.indexOf("webchat/?source=yunkefu") < 0
    ) {
      localStorage.setItem("qd", refer + "||" + link);
    }
  }
}
// 下面是设置sourceUrl
var sourceUrl = sessionStorage.getItem("qd");
if (sessionStorage.getItem("qd") != "" && sessionStorage.getItem("qd") != null) {
  sourceUrl = sessionStorage.getItem("qd");
} else if (tool.getCookie("qd") != "" && tool.getCookie("qd") != null) {
  sourceUrl = tool.getCookie("qd");
} else {
  sourceUrl = tool.getCookie("qd");
}
console.log("🚀   sourceUrl", sourceUrl);
/* .................. 分渠道修改电话 ................. */
if (sourceUrl && sourceUrl.indexOf("medium=cpc") > 0 && sourceUrl.indexOf("baidu") > 0) {
  $(".telNum").each(function () {
    $(this).text("4006-726-496"); //百度SEM
    $(this).attr("href", "tel:4006-726-496");
  });
  $(".telNumber").attr("href", "/register.html?type=sem");
  $(".telNumber").html('<img src="/assets/images/contact_apply2.png" alt="免费试用">免费试用');
  // $(".telNumber").hide();
  // $("#get_chat").css("borderRadius", "0.5rem")
}
// 渠道默认为seo的微信小程序链接
var ua = navigator.userAgent.toLowerCase();
function IsMobile () {
  let info = navigator.userAgent;
  let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
  for (let i = 0; i < agents.length; i++) {
    if (info.indexOf(agents[i]) >= 0) return true;
  }
  return false;
}
var source = "hollyseo";
if (sourceUrl.indexOf("medium=cpc") != -1 || sourceUrl.indexOf("baidu.php") != -1 || sourceUrl.indexOf("media=360") != -1) {
  source = "hollysem"
}
let param = new URLSearchParams();
param.append('source', source);
function toweixin () {
  axios.post('/assets/api/to_weixin.php', param).then(res => {
    console.log(res.data)
    if (IsMobile()) {
      window.location.href = res.data;
    } else {
      alert('请在手机端打开')
    }
  }).catch(error => {
    console.log(error)
  })
}
/* .................. 点击跳转小程序 ................. */
$(function () {
  $("#get_chat").click(function () {
    toweixin()
  });
  $("#weixin-chat").click(function () {
    toweixin()
  });
});
