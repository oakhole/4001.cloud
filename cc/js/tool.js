var link = document.location.href
var refer = document.referrer
var tool = {
  setCookie: function (cname, cvalue, cday) {
    var d = new Date()
    d.setTime(d.getTime() + cday * 24 * 60 * 60 * 1000)
    var expires = "expires=" + d.toGMTString()
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/"
  },
  getCookie: function (cname) {
    var name = cname + "="
    var ca = document.cookie.split(";")
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim()
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
    }
    return ""
  },
  checkCookie: function () {
    var qd = this.getCookie("qd")
    if (qd != "") {
      console.log(qd)
    } else {
      console.log(link)
    }
  }
}
// 判断当前面并设置当前页对应导航栏的样式
$(document).ready(function () {
  if (
    link.indexOf("/callcenter") != -1 ||
    link.indexOf("/salesplat") != -1 ||
    link.indexOf("/salesplat") != -1 ||
    link.indexOf("/webchat") != -1 ||
    link.indexOf("/order") != -1 ||
    link.indexOf("/scrm") != -1 ||
    link.indexOf("/AIplatform") != -1 ||
    link.indexOf("/project") != -1 ||
    link.indexOf("/solution/customer") != -1 ||
    link.indexOf("/solution/progress") != -1 ||
    link.indexOf("/remote") != -1
  ) {
    $(".first-wrap .first:nth-child(2) a:first").addClass("hover")
  }
  if (
    link.indexOf("/solution/finance") != -1 ||
    link.indexOf("/solution/automobile") != -1 ||
    link.indexOf("/solution/education") != -1 ||
    link.indexOf("/solution/newretail") != -1 ||
    link.indexOf("/solution/lifeservice") != -1 ||
    link.indexOf("/solution/enterpriseservice") != -1 ||
    link.indexOf("/solution/nationalized") != -1 ||
    link.indexOf("/telecom") != -1 ||
    link.indexOf("/gover") != -1 ||
    link.indexOf("/express") != -1 ||
    link.indexOf("/finance") != -1 ||
    link.indexOf("/auto") != -1
  ) {
    $(".first-wrap .first:nth-child(3) a:first").addClass("hover")
  }
  if (link.indexOf("/wincase") != -1) {
    $(".first-wrap .first:nth-child(4) a:first").addClass("hover")
  }
  if (link.indexOf("/news") != -1 || link.indexOf("/C5Support") != -1) {
    $(".first-wrap .first:nth-child(5) a:first").addClass("hover")
  }
  if (link.indexOf("/aboutus") != -1) {
    $(".first-wrap .first:nth-child(6) a:first").addClass("hover")
  }
})
// 按钮追踪
var btn = "顶部按钮"
function toApply (data) {
  if (data == 0) {
    btn = "顶部导航栏按钮"
  } else if (data == 1) {
    btn = "banner按钮"
  } else if (data == 2) {
    btn = "侧边栏按钮"
  } else if (data == 3) {
    btn = "中间按钮"
  } else if (data == 31) {
    btn = "在线版试用按钮"
  } else if (data == 32) {
    btn = "标准版试用按钮"
  } else if (data == 33) {
    btn = "企业版试用按钮"
  } else if (data == 9) {
    btn = "底部按钮"
  } else {
    btn = data
  }
  sessionStorage.setItem("btn", btn)
  tool.setCookie("btn", btn, 1)
}
sessionStorage.setItem("currentLink", link)
tool.setCookie("currentLink", link, 1)
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
  link.indexOf("google.com") > 0
) {
  sessionStorage.setItem("qd", link)
} else {
  if (sessionStorage.getItem("qd") == null || sessionStorage.getItem("qd") == "") {
    sessionStorage.setItem("qd", refer + "||" + link)
  } else {
    var sessionQd = sessionStorage.getItem("qd")
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
      sessionQd.indexOf("a6.7x24cc.com") < 0
    ) {
      sessionStorage.setItem("qd", refer + "||" + link)
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
  link.indexOf("google.com") > 0
) {
  tool.setCookie("qd", link, 1)
} else {
  if (tool.getCookie("qd") == "" || tool.getCookie("qd") == null) {
    tool.setCookie("qd", refer + "||" + link, 1)
  } else {
    var cookieQd = tool.getCookie("qd")
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
      cookieQd.indexOf("a6.7x24cc.com") < 0
    ) {
      tool.setCookie("qd", refer + "||" + link, 1)
    }
  }
}
// 下面是传到在线咨询的链接....................下面是传到在线咨询的链接
var sourceUrl = sessionStorage.getItem("qd")
if (sessionStorage.getItem("qd") != "" && sessionStorage.getItem("qd") != null && sessionStorage.getItem("qd").indexOf("message") < 0) {
  sourceUrl = sessionStorage.getItem("qd")
} else {
  sourceUrl = tool.getCookie("qd")
}
var hollycrm = hollycrm || {};
hollycrm.originateUrl = sourceUrl;
console.log("hollycrm.originateUrl---", sourceUrl);
// 外部判断来源的js............................外部判断来源的js
(hollycrm.originate = {
  env: hollycrm.env || "product",
  interfaceUrl: "im.7x24cc.com/open_platform",
  param: {},
  originateInfo: {},
  tokenID: "",
  getOriginateUrl: function () {
    var e = hollycrm.originate,
      o = hollycrm.originateUrl || document.referrer,
      n = {}
    if (o) {
      console.log("originateUrl", o)
      var t = o.indexOf("?"),
        r = ""
      if ((~t && (r = o.substr(t + 1)), r)) {
        r = decodeURIComponent(decodeURIComponent(r))
        for (var i = window.decodeURI(r).split("&"), a = 0, c = i.length; a < c; a++) {
          var l = i[a].indexOf("=")
          if (~l && i[a].length > l + 1) {
            var g = i[a].substr(0, l),
              f = i[a].substr(l + 1, i[a].length)
            n[g] = f
          }
        }
      }
    }
    if (
      ("test" === e.env &&
        (o =
          "http://www.sogou.com/bill_cpc?v=1&p=WJ80$xzz8G0eeUDkqua$6DO4MxUzuFFfpZc1GPrGLsTux$5VeuOs4ElfaaE1At20hE6sUy4b88EoYtrYwCKZFfA3YdWgsSWmgbPZIwuSHFk@5bM1Ad9kofv6o2P3gEMDsV855Rt@s1ksnFdg586eJhti2zD6HU0qL31csEyonNUQvlpCFplDsg055dHB0nhpIkzunI6VjeAKKOrik9W3XYmevw0J1Vv30c7eyc0F128G820jLGxyAoLa7Uhw9UZXj84fvpOZ7SvUBzYw3SAzuvQBQJ$uIxu6QJIbJPozklxy1x0wG8yCGZYzhBSWw7SolRvv$FxbjniD3ScmekoPNAGR9ZG0lhGyreaxGMVAv67g1671H6o9ZOyZuYS9ZAjtBZL9UretajgV$YqjrlYfyj0V8tqvgJeIwGS7BpoIet@V6I$tgja9buJozQJ7Bj8VjSbwxa6GZ6ZpGbuculm86cVzRjhlMHOv31rAD@2l9sJl2zXVzUaAB$BuBAYfe7zuIAYuIoBpyJH1NwZGR9RM8jkpxP9lMuf4uy==&q=WJ8a3j6I3abvChDsadtr86@5adqa87@qBZllB@ow3l==&query=呼叫中心&ml=201&mc=158&ma=59,116,361,118,361,118,1349,625&block=511,143,-1,-1"),
        o)
    ) {
      g = null
      var m = o.match("(\\w+\\.){2}\\w+")
      if ("www.baidu.com" === m[0]) g = e.getBaiduKey(o)
      else if ("www.so.com" === m[0]) g = e.getSoKey(o)
      else if ("www.sogou.com" === m[0]) g = e.getSogouKey(o)
      else if ("www.zhihu.com" === m[0] || "link.zhihu.com" === m[0]) g = e.getZhihuKey(o)
      else if ("www.toutiao.com" === m[0]) g = e.getToutiaoKey(o)
      else if ("www.chinaso.com" === m[0]) g = e.getChinaSoKey(o)
      else if ("cn.bing.com" === m[0]) g = e.getBingKey(o)
      else if ("so.m.sm" === m[0]) g = e.getSMKey(o)
      else if (n.utm_source || n.hmsr || n.media) {
        var u = n.utm_source || n.hmsr || n.media
          ; (g = n.utm_term || n.utm_keyword || n.hmkw),
            (g = decodeURIComponent(decodeURIComponent(g))),
            ~u.toLowerCase().indexOf("baidu") || ~u.indexOf("百度")
              ? (hollycrm.originate.originateInfo.originateType = encodeURIComponent("BAIDU_SEM"))
              : ~u.toLowerCase().indexOf("360sem") || ~u.indexOf("360")
                ? (hollycrm.originate.originateInfo.originateType = encodeURIComponent("SO_SEM"))
                : ~u.toLowerCase().indexOf("sougou")
                  ? (hollycrm.originate.originateInfo.originateType = encodeURIComponent("SOGOU"))
                  : ~u.toLowerCase().indexOf("知乎")
                    ? (hollycrm.originate.originateInfo.originateType = encodeURIComponent("ZHIHU"))
                    : (g = "")
      }
      null != g &&
        ((e.originateInfo.originateId = e.getUuid()),
          (e.originateInfo.originateKey = encodeURIComponent(g)),
          (e.originateInfo.originateUrl = o),
          e.setOriginateInfoToCookie(e.originateInfo))
    }
  },
  getBaiduKey: function (e) {
    var o = e.toLowerCase(),
      n = ""
    if (/word=/.test(o) || /aladdin\.php/.test(o)) {
      var t = o.match(/word=([^&]*)/) || o.match(/wd=([^&]*)/)
        ; (n = t && t[1] ? t[1] : ""), (n = decodeURIComponent(n)), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("BAIDU_SEM"))
    } else (n = ""), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("BAIDU_SEO"))
    return n
  },
  getSoKey: function (e) {
    var o = ""
    if (e.match(/q=([^&]*)/)) {
      var n = e.match(/q=([^&]*)/)
      n && n[1] && (o = decodeURIComponent(n[1])), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("SO_SEM"))
    } else (o = ""), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("SO_SEO"))
    return o
  },
  getSogouKey: function (e) {
    var o = "",
      n = e.match(/query=([^&]*)/)
    return n && n[1] && (o = decodeURIComponent(n[1])), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("SOGOU")), o
  },
  getZhihuKey: function (e) {
    var o = decodeURIComponent(decodeURIComponent(e)),
      n = "",
      t = o.match(/q=([^&]*)/) || o.match(/hmkw=([^&]*)/)
    return t && t[1] && (n = decodeURIComponent(t[1])), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("ZHIHU")), n
  },
  getToutiaoKey: function (e) {
    var o = "",
      n = e.match(/keyword=([^&]*)/)
    return n && n[1] && (o = decodeURIComponent(n[1])), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("TOUTIAO")), o
  },
  getChinaSoKey: function (e) {
    var o = "",
      n = e.match(/wd=([^&]*)/) || e.match(/q=([^&]*)/)
    return n && n[1] && (o = decodeURIComponent(n[1])), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("CHINASO")), o
  },
  getBingKey: function (e) {
    var o = "",
      n = e.match(/q=([^&]*)/)
    return n && n[1] && (o = decodeURIComponent(n[1])), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("BING")), o
  },
  getSMKey: function (e) {
    var o = "",
      n = e.match(/q=([^&]*)/)
    return n && n[1] && (o = decodeURIComponent(n[1])), (hollycrm.originate.originateInfo.originateType = encodeURIComponent("SHENMA")), o
  },
  getChatUrl: function (param, callback) {
    var self = hollycrm.originate
    if (param)
      if (param.accountID)
        if (param.channelID) {
          self.param = param
          var originateInfo = null,
            originateInfoToken = self.getCookie("HollyOriginate")
          originateInfoToken &&
            ((originateInfoToken = unescape(originateInfoToken)), (originateInfo = eval("(" + originateInfoToken + ")")), self.removeCookie("HollyOriginate")),
            self.getServiceConf(function () {
              self.getToken(function () {
                originateInfo
                  ? self.saveOriginateInfo(originateInfo, function () {
                    self.generateChatUrl(function (e) {
                      callback &&
                        "function" == typeof callback &&
                        callback({
                          chatUrl: e + "&originateId=" + originateInfo.originateId
                        })
                    })
                  })
                  : self.generateChatUrl(function (e) {
                    callback && "function" == typeof callback && callback({ chatUrl: e })
                  })
              })
            })
        } else self.errorLog("参数param里必须要有属性[channelID]!")
      else self.errorLog("参数param里必须要有属性[accountID]!")
    else self.errorLog("参数[param]不能为空!")
  },
  generateChatUrl: function (e) {
    var o = hollycrm.originate,
      n = o.getInterfaceUrl(),
      t = {
        Modual: "ChatConfig",
        Action: "GetChatUrl",
        account: o.param.accountID,
        token: o.tokenID,
        channelId: o.param.channelID
      }
    o.sendAjax(n, t, function (n) {
      if (n && n.Succeed)
        if (n.chatUrl) {
          var t = n.chatUrl
          if (o.param.urlParam) for (var r in o.param.urlParam) t += "&" + r + "=" + o.param.urlParam[r]
          e(t)
        } else o.errorLog("获取不到聊天入口的链接地址！")
      else o.errorLog("请求获取聊天入口的链接地址错误，请检查网络连接！")
    })
  },
  getInterfaceUrl: function () {
    var e = "https:" == document.location.protocol,
      o = hollycrm.originate.interfaceUrl
    return "test" === hollycrm.originate.env ? (o = "/open_platform") : e ? "https://" + o : "http://" + o
  },
  getToken: function (e) {
    var o = hollycrm.originate.getInterfaceUrl(),
      n = { Action: "getNewMediaToken" }
    hollycrm.originate.sendAjax(o, n, function (o) {
      o && (o.token ? ((hollycrm.originate.tokenID = o.token), e()) : hollycrm.originate.errorLog("获取合力来源Token失败!"))
    })
  },
  saveOriginateInfo: function (e, o) {
    var n = hollycrm.originate,
      t = n.getInterfaceUrl(),
      r = {
        accountID: n.param.accountID,
        token: n.tokenID,
        Action: "saveOriginateInfo",
        originateId: e.originateId,
        originateUrl: e.originateUrl,
        originateKey: e.originateKey,
        originateType: e.originateType
      }
    n.sendAjax(t, r, function (e) {
      e && (e.Succeed || n.errorLog("保存来源信息失败！"), o())
    })
  },
  setOriginateInfoToCookie: function (e) {
    var o = new Date()
    o.setTime(o.getTime() + 864e5), hollycrm.originate.setCookie("HollyOriginate", JSON.stringify(e), o)
  },
  sendAjax: function (url, data, successFunc) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
    xhr.open("POST", url, !0),
      (xhr.onreadystatechange = function () {
        if (4 == xhr.readyState)
          if (200 == xhr.status) {
            var data = eval("(" + xhr.responseText + ")")
            successFunc(data)
          } else alert("服务器返回错误！")
      }),
      xhr.send(JSON.stringify(data))
  },
  errorLog: function (e) {
    console && console.error && console.error(e)
  },
  stringIsEmpty: function (e) {
    return null == e || "" == e || "undefined" == e
  },
  getUuid: function () {
    for (var e = [], o = "0123456789abcdef", n = 0; n < 36; n++) e[n] = o.substr(Math.floor(16 * Math.random()), 1)
    return (e[14] = "4"), (e[19] = o.substr((3 & e[19]) | 8, 1)), (e[8] = e[13] = e[18] = e[23] = "-"), e.join("")
  },
  removeCookie: function (e) {
    hollycrm.originate.setCookie(e, "", -1)
  },
  setCookie: function (e, o, n) {
    document.cookie = e + "=" + escape(o) + ";expires=" + (-1 == n ? "-1" : n.toGMTString()) + ";path=/;"
  },
  getCookie: function (e) {
    for (var o = document.cookie.split("; "), n = "", t = 0; t < o.length; t++) if (o[t].indexOf(e) >= 0) return (n = o[t]), n.substring(e.length + 1, n.length)
    return n
  },
  removeCookie: function (e) {
    hollycrm.originate.setCookie(e, "", -1)
  },
  getServiceConf: function (e) {
    var o = hollycrm.originate,
      n = o.getInterfaceUrl(),
      t = { Account: o.param.accountID, Action: "locationServiceConf" }
    o.sendAjax(n, t, function (o) {
      if (o.Succeed) return (hollycrm.originate.interfaceUrl = hollycrm.originate.interfaceUrl + o.serviceID), void e()
      hollycrm.originate.errorLog("获取服务配置失败失败!")
    })
  }
}),
  hollycrm.supportJQuery
    ? $(function () {
      hollycrm.originate.getOriginateUrl()
    })
    : window.attachEvent
      ? window.attachEvent("onload", function () {
        hollycrm.originate.getOriginateUrl()
      })
      : window.addEventListener(
        "load",
        function () {
          hollycrm.originate.getOriginateUrl()
        },
        !0
      )
// 外部判断来源的js............................外部判断来源的js--end
/* ................. 分渠道修改网站电话 ................ */
if (sourceUrl && sourceUrl.indexOf("baidu.com") > 0 && sourceUrl.indexOf("medium=cpc") < 0) {
  $(".telNum").each(function () {
    $(this).text("4000-628-505") //百度SEO
  })
}
if (sourceUrl && sourceUrl.indexOf("medium=cpc") > 0 && sourceUrl.indexOf("baidu") > 0) {
  $(".telNum").each(function () {
    $(this).text("4006-456-595") //百度SEM
  })
}
if (sourceUrl && (sourceUrl.indexOf("aladdin") > 0 || location.href.indexOf("aladdin") > 0)) {
  $(".telNum").each(function () {
    $(this).text("4008-198-638") //阿拉丁
  })
}
if (sourceUrl.indexOf("medium=cpc") < 0 && (sourceUrl.indexOf("media=360") > 0 || sourceUrl.indexOf("so.com") > 0 || sourceUrl.indexOf("source=360") > 0)) {
  $(".telNum").each(function () {
    $(this).text("4000-628-505") //360SEO
  })
}
if (sourceUrl.indexOf("medium=cpc") > 0 && (sourceUrl.indexOf("media=360") > 0 || sourceUrl.indexOf("so.com") > 0 || sourceUrl.indexOf("source=360") > 0)) {
  $(".telNum").each(function () {
    $(this).text("4006-345-595") //360SEM
  })
}
if (sourceUrl.indexOf("medium=cpc") > 0 && (sourceUrl.indexOf("media=sogou") > 0 || sourceUrl.indexOf("sogou.com") > 0)) {
  $(".telNum").each(function () {
    $(this).text("4006-345-595") //搜狗SEM
  })
}
if (sourceUrl && (sourceUrl.indexOf("zhihu") > 0 || sourceUrl.indexOf("知乎") > 0 || sourceUrl.indexOf("%E7%9F%A5%E4%B9%8E") > 0)) {
  $(".telNum").each(function () {
    $(this).text("4006-240-256") //知乎
  })
}
if (sourceUrl.indexOf("medium=cpc") > 0 && sourceUrl.indexOf("project") > 0) {
  $(".telNum").each(function () {
    $(this).text("4006-345-690") //项目管理页面SEM相关
  })
}
if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i)) {
  $(".telNum").each(function () {
    $(this).text("4000-628-505") //移动端的
  })
}
if (returnCitySN["cname"].indexOf("上海") > 0) {
  $(".telNum").each(function () {
    $(this).text("021-61897000") //上海区域的
  })
}
/* ................. 分渠道修改网站电话end ................ */
// gui.visit  访客记录的php
var gui = {
  S4: function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  },
  guid: function () {
    return this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()
  },
  visit: function () {
    if (sessionStorage.getItem("uid") == "" || sessionStorage.getItem("uid") == null) {
      sessionStorage.setItem("uid", this.guid())
      $.ajax({
        url: "/apply/visit.php",
        type: "POST",
        data: {
          id: sessionStorage.getItem("uid"),
          ip: returnCitySN["cip"],
          city: returnCitySN["cname"],
          link: sessionStorage.getItem("qd")
        },
        dataType: "json",
        success: function (res) { }
      })
    } else {
    }
  }
}
gui.visit()
