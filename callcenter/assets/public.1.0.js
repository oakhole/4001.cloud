
(function (b, e, p, k) {
  var h = b(e),
    m = 0;
  b.fn.lazyload = function (a) {
    function c() {
      if (0 == m) {
        var b = p.documentElement.clientWidth;
        -1 == location.href.indexOf("resources.") &&
          parent != e &&
          (b = parent.$("#" + e.name).width());
        m = 767 < b ? 1 : 2;
      }
      return m;
    }
    function t() {
      var b = c();
      m = 0;
      b != c() &&
        l.each(function () {
          q(this, !1);
        });
    }
    function r(b) {
      var a = c();
      if (b.device == a && b.src != d.placeholder) return !0;
      b.device = a;
      return 1 == a
        ? "undefined" == typeof b.lgLoaded
          ? !1
          : b.lgLoaded
        : 2 == a
        ? "undefined" == typeof b.smLoaded
          ? !1
          : b.smLoaded
        : !1;
    }
    function q(b, a) {
      var d = c();
      if (1 == d) b.lgLoaded = a ? !0 : !1;
      else if (2 == d) b.smLoaded = a ? !0 : !1;
      else return !1;
    }
    function n() {
      var a = 0;
      l.each(function () {
        var c = b(this);
        if (
          !(
            (d.skip_invisible && !c.is(":visible")) ||
            b.abovethetop(this, d) ||
            b.leftofbegin(this, d)
          )
        )
          if (!b.belowthefold(this, d) && !b.rightoffold(this, d))
            c.trigger("appear"), (a = 0);
          else if (++a > d.failure_limit) return !1;
      });
    }
    var l = this,
      d = {
        threshold: 0,
        failure_limit: 0,
        event: "scroll",
        effect: "show",
        container: e,
        data_attribute: "src",
        skip_invisible: !1,
        appear: null,
        load: null,
        placeholder: "",
        anClass: "lazyload",
        lfie9: /msie\s+[6789]/i.test(e.navigator.userAgent.toLowerCase()),
      },
      u = util.inDesign();
    a &&
      (k !== a.failurelimit &&
        ((a.failure_limit = a.failurelimit), delete a.failurelimit),
      k !== a.effectspeed &&
        ((a.effect_speed = a.effectspeed), delete a.effectspeed),
      b.extend(d, a));
    a = d.container === k || d.container === e ? h : b(d.container);
    0 === d.event.indexOf("scroll") &&
      a.bind(d.event, function () {
        return n();
      });
    l.each(function () {
      var a = this,
        f = b(a),
        e = f.attr("src");
      !d.placeholder ||
        (e !== k && !1 !== e) ||
        (f.is("img") && f.attr("src", d.placeholder));
      f.on("appear", function () {
        if (!r(a)) {
          d.appear && d.appear.call(a, l.length, d);
          var g = "",
            e = c();
          2 == e && (g = f.attr("data-" + d.data_attribute + "-sm"));
          !g && (g = f.attr("data-" + d.data_attribute));
          "undefined" != typeof g &&
            g &&
            0 < g.indexOf(",") &&
            (g = g.split(",")[e - 1]);
          b("\x3cimg /\x3e")
            .bind("load", function () {
              if (a.src != g) {
                f.is("img")
                  ? u && 0 <= g.indexOf("logo.png") && 0 != g.indexOf("http")
                    ? (g.indexOf("?"), f.attr("src", g + 1e4 * Math.random()))
                    : f.attr("src", g)
                  : f.css("background-image", "url('" + g + "')");
                d.lfie9
                  ? (f.hide(), f[d.effect](d.effect_speed))
                  : (f.addClass(d.anClass),
                    f.one(
                      "animationend webkitAnimationEnd oAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                      function () {
                        f.removeClass(d.anClass);
                      }
                    ));
                q(a, !0);
                var e = b.grep(l, function (b) {
                    return !b.loaded;
                  }),
                  e = b(e);
                d.load && d.load.call(a, e.length, d, c());
              }
            })
            .attr("src", g);
        }
      });
      0 !== d.event.indexOf("scroll") &&
        f.bind(d.event, function () {
          r(a) || f.trigger("appear");
        });
    });
    h.bind("resize", function () {
      t();
      n();
    });
    /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) &&
      h.bind("pageshow", function (a) {
        a.originalEvent &&
          a.originalEvent.persisted &&
          l.each(function () {
            b(this).trigger("appear");
          });
      });
    b(p).ready(function () {
      n();
    });
    return this;
  };
  b.belowthefold = function (a, c) {
    return (
      (c.container === k || c.container === e
        ? (e.innerHeight ? e.innerHeight : h.height()) + h.scrollTop()
        : b(c.container).offset().top + b(c.container).height()) <=
      b(a).offset().top - c.threshold
    );
  };
  b.rightoffold = function (a, c) {
    return (
      (c.container === k || c.container === e
        ? h.width() + h.scrollLeft()
        : b(c.container).offset().left + b(c.container).width()) <=
      b(a).offset().left - c.threshold
    );
  };
  b.abovethetop = function (a, c) {
    return (
      (c.container === k || c.container === e
        ? h.scrollTop()
        : b(c.container).offset().top) >=
      b(a).offset().top + c.threshold + b(a).height()
    );
  };
  b.leftofbegin = function (a, c) {
    return (
      (c.container === k || c.container === e
        ? h.scrollLeft()
        : b(c.container).offset().left) >=
      b(a).offset().left + c.threshold + b(a).width()
    );
  };
  b.inviewport = function (a, c) {
    return (
      !b.rightoffold(a, c) &&
      !b.leftofbegin(a, c) &&
      !b.belowthefold(a, c) &&
      !b.abovethetop(a, c)
    );
  };
  b.extend(b.expr[":"], {
    "below-the-fold": function (a) {
      return b.belowthefold(a, { threshold: 0 });
    },
    "above-the-top": function (a) {
      return !b.belowthefold(a, { threshold: 0 });
    },
    "right-of-screen": function (a) {
      return b.rightoffold(a, { threshold: 0 });
    },
    "left-of-screen": function (a) {
      return !b.rightoffold(a, { threshold: 0 });
    },
    "in-viewport": function (a) {
      return b.inviewport(a, { threshold: 0 });
    },
    "above-the-fold": function (a) {
      return !b.belowthefold(a, { threshold: 0 });
    },
    "right-of-fold": function (a) {
      return b.rightoffold(a, { threshold: 0 });
    },
    "left-of-fold": function (a) {
      return !b.rightoffold(a, { threshold: 0 });
    },
  });
})(jQuery, window, document);
var emptyImage =
  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg\x3d\x3d";
$(function () {
  setTimeout(function () {
    $("img[data-src]").lazyload({
      effect: "fadeIn",
      effect_speed: 500,
      failurelimit: 80,
      placeholder: emptyImage,
      skip_invisible: !1,
    });
  }, 0);
});
function loadImages(container) {
  $(container)
    .find("img")
    .each(function (item) {
      var o = $(this);
      if (
        (!o.attr("src") || o.attr("src").indexOf("base64") >= 0) &&
        o.data("src")
      ) {
        var dataSrc = o.data("src");
        if (dataSrc.indexOf(",")) {
          dataSrc = dataSrc.split(",")[0];
        }
        o.attr("src", dataSrc);
      }
    });
}

(function (d) {
  "function" === typeof define && define.amd
    ? define(["jquery"], d)
    : "object" === typeof exports
    ? (module.exports = d(require("jquery")))
    : d(jQuery);
})(function (d) {
  function p(b) {
    b = e.json ? JSON.stringify(b) : String(b);
    return e.raw ? b : encodeURIComponent(b);
  }
  function n(b, g) {
    var a;
    if (e.raw) a = b;
    else
      a: {
        var c = b;
        0 === c.indexOf('"') &&
          (c = c.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
          c = decodeURIComponent(c.replace(l, " "));
          a = e.json ? JSON.parse(c) : c;
          break a;
        } catch (h) {}
        a = void 0;
      }
    return d.isFunction(g) ? g(a) : a;
  }
  var l = /\+/g,
    e = (d.cookie = function (b, g, a) {
      if (1 < arguments.length && !d.isFunction(g)) {
        a = d.extend({}, e.defaults, a);
        if ("number" === typeof a.expires) {
          var c = a.expires,
            h = (a.expires = new Date());
          h.setMilliseconds(h.getMilliseconds() + 864e5 * c);
        }
        return (document.cookie = [
          e.raw ? b : encodeURIComponent(b),
          "\x3d",
          p(g),
          a.expires ? "; expires\x3d" + a.expires.toUTCString() : "",
          a.path ? "; path\x3d" + a.path : "",
          a.domain ? "; domain\x3d" + a.domain : "",
          a.secure ? "; secure" : "",
        ].join(""));
      }
      for (
        var c = b ? void 0 : {},
          h = document.cookie ? document.cookie.split("; ") : [],
          m = 0,
          l = h.length;
        m < l;
        m++
      ) {
        var f = h[m].split("\x3d"),
          k;
        k = f.shift();
        k = e.raw ? k : decodeURIComponent(k);
        f = f.join("\x3d");
        if (b === k) {
          c = n(f, g);
          break;
        }
        b || void 0 === (f = n(f)) || (c[k] = f);
      }
      return c;
    });
  e.defaults = {};
  d.removeCookie = function (b, e) {
    d.cookie(b, "", d.extend({}, e, { expires: -1 }));
    return !d.cookie(b);
  };
});

var __parentIsSelfDomain = !1;
try {
  var l = parent.href,
    __parentIsSelfDomain = !0;
} catch (a) {
  (parent = window),
    "undefined" != typeof console &&
      console.log("\u9875\u9762\u53ef\u80fd\u8de8\u57df", a);
}
$.fn.path = function (a) {
  var c = this,
    b;
  b = 0;
  for (var d = -1, f = 0, e = a + "/", g = 0; g < e.length; g++)
    if ("/" == e[g]) {
      -1 == d && (f = g);
      b = e.substr(b, f - b);
      if (!b)
        throw (
          "\u8def\u5f84'" +
          a +
          "'\u683c\u5f0f\u4e0d\u6b63\u786e,\u6837\u4f8b:div(1)/span"
        );
      c = -1 == d ? c.children(b) : c.children(b + ":eq(" + d + ")");
      b = g + 1;
      d = -1;
    } else if ("(" == e[g]) {
      for (var h = g + 1, f = g; h < e.length && ")" != e[h]; h++);
      if (e.length == h)
        throw "\u8def\u5f84'" + a + "'\u7684\u683c\u5f0f\u4e0d\u6b63\u786e";
      d = parseInt(e.substr(g + 1, h - g - 1));
      if (isNaN(d))
        throw "\u8def\u5f84'" + a + "'\u7684\u683c\u5f0f\u4e0d\u6b63\u786e";
      g = h;
    } else if (" " == e[g])
      throw (
        "\u8def\u5f84'" +
        a +
        "'\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u4e0d\u80fd\u5e26\u7a7a\u683c"
      );
  return c;
};
window.util = {
  condition: function (a, c, b) {
    if ("" == a || null == a || "" == c || null == c) return "";
    a = a.split(",");
    for (var d = "", f = 0; f < a.length; f++) {
      var e;
      if ("select" == b.toLowerCase()) e = "{e}";
      else if ("text" == b.toLowerCase()) e = "{l}";
      else if ("datetime" == b.toLowerCase()) e = "{a}";
      else if ("in" == b.toLowerCase()) e = "{i}";
      else continue;
      d += "" == d ? a[f] + e + c : "|" + a[f] + e + c;
    }
    return d;
  },
  createUrl: function (a, c, b, d, f) {
    "undefined" == typeof c && (c = !1);
    "undefined" == typeof b && (b = []);
    "undefined" == typeof d && (d = []);
    var e = document.forms[0].getAttribute("Page");
    if (util.isNullOrEmpty(e) && 1 < document.forms.length)
      for (
        var g = 1;
        g < document.forms.length &&
        ((e = document.forms[g].getAttribute("Page")), util.isNullOrEmpty(e));
        g++
      );
    util.isNullOrEmpty(e)
      ? (e = window.location.href.toString())
      : ((e = decodeURIComponent(e)),
        0 >= e.indexOf(window.location.hostname) &&
          (e =
            window.location.href
              .toString()
              .substr(0, window.location.href.toString().indexOf("/", 8)) +
            "/" +
            e.replace("/", "")));
    var g = e.indexOf("#"),
      h = "";
    0 < g &&
      ((h = e.substr(g + 1).replace(/[\=\&]/g, "")), (e = e.substr(0, g)));
    if (util.isNullOrEmpty(a)) a = e;
    else if (/^\/+/.test(a) || !/^http[s]{0,1}:/.test(a))
      (e = e.substr(0, e.indexOf("/", 8))),
        0 <= window.location.href.toString().indexOf(e) &&
          (a = e.replace(/\/*$/, "") + "/" + a.replace(/^\//, ""));
    var k = a.indexOf("?"),
      m = "",
      n = "";
    if (0 < k && ((e = a.substr(k + 1)), (a = a.substr(0, k)), !c))
      for (g = 0; g < e.length; g++)
        if ("\x3d" != (e.charAt ? e.charAt(g) : e[g]))
          m += e.charAt ? e.charAt(g) : e[g];
        else {
          k = e.indexOf("\x3d", g + 1);
          if (-1 == k) (c = e.substr(g + 1)), (g = e.length);
          else {
            for (c = g; k > g; k--)
              if ("\x26" == (e.charAt ? e.charAt(k) : e[k])) {
                g = k;
                break;
              }
            c = e.substr(c + 1, g - c - 1);
          }
          for (k = 0; k < b.length; k++)
            if (b[k].toLowerCase() == m.toLowerCase()) {
              b[k] = "";
              if (util.isNullOrEmpty(String(d[k]))) {
                c = "";
                break;
              }
              c = String(d[k]);
            }
          if (!util.isNullOrEmpty(c)) {
            if (0 <= c.indexOf("\x26") || 0 <= c.indexOf("?")) c = escape(c);
            n =
              0 == n.length
                ? n + (m + "\x3d" + c)
                : n + ("\x26" + m + "\x3d" + c);
          }
          m = "";
        }
    for (g = 0; g < b.length; g++)
      if (
        !util.isNullOrEmpty(b[g]) &&
        ((c = String(d[g])), !util.isNullOrEmpty(c))
      ) {
        if (0 <= c.indexOf("\x26") || 0 <= c.indexOf("?")) c = escape(c);
        n =
          0 == n.length
            ? n + (b[g] + "\x3d" + c)
            : n + ("\x26" + b[g] + "\x3d" + c);
      }
    util.isNullOrEmpty(f) || (h = f.replace(/#/, ""));
    h && (h = "#" + h);
    return a + (0 == n.length ? "" : "?" + n) + h;
  },
  queryString: function (a, c) {
    if (null == a || void 0 == a) return null;
    var b = util.isNullOrEmpty(c) ? location.href : c,
      b = b.replace(/\%3D/g, "@3D@").replace(/\%26/g, "@26@"),
      b = decodeURIComponent(b),
      d = b.indexOf("#");
    0 < d && (b = b.substr(0, d));
    if (util.isNullOrEmpty(c) && 0 < document.forms.length)
      for (var f, d = 0; d < document.forms.length; d++)
        if ((f = document.forms[d].getAttribute("Page"))) {
          b = f;
          0 < b.indexOf(".htm") &&
            0 <= location.href.indexOf("resources.") &&
            (b = document.forms[d].getAttribute("action"));
          break;
        }
    if (0 >= b.indexOf("?")) return null;
    b = b.substring(b.indexOf("?") + 1);
    b = b.split("\x3d");
    a = a.toLowerCase();
    for (d = 0; d < b.length; d++)
      if (
        b[d].toLowerCase() == a ||
        b[d].substr(b[d].lastIndexOf("\x26") + 1).toLowerCase() == a
      )
        return d == b.length - 2
          ? unescape(
              b[d + 1].replace(/\@3D\@/g, "\x3d").replace(/\@26\@/g, "\x26")
            )
          : unescape(
              b[d + 1]
                .substr(0, b[d + 1].lastIndexOf("\x26"))
                .replace(/\@3D\@/g, "\x3d")
                .replace(/\@26\@/g, "\x26")
            );
    return null;
  },
  isNullOrEmpty: function (a) {
    return null == a ||
      void 0 == a ||
      "null" == a ||
      "undefined" == a ||
      "" == String(a)
      ? !0
      : !1;
  },
  isChineseStr: function (a) {
    return !/[u00-uFF]/.test(a);
  },
  toBool: function (a) {
    a = String(a);
    return "true" == a || "1" == a || "true" == a.toLowerCase() || "ok" == a
      ? !0
      : !1;
  },
  toInt: function (a) {
    if (util.isNullOrEmpty(a)) return 0;
    a = parseInt(a);
    return isNaN(a) ? 0 : a;
  },
  ajaxMethod: function (a, c, b, d, f, e) {
    !b && (b = {});
    "undefined" == typeof e && (e = !0);
    var g = document.location.href,
      g = g.substr(0, g.indexOf("/", 8)) + "",
      h = { cmd: c, group: a.toLocaleLowerCase() };
    h.dataType = 0 <= location.href.indexOf("/m/") ? 2 : 1;
    $.extend(h, b);
  },
  getMessage: function (a) {
    var c = document.getElementsByTagName("html")[0].getAttribute("lang");
    return (/^en.*/.test(c) ? message_EN : message_CN)[a];
  },
  dyFn: function (a) {
    var c = Function;
    return /^[\{\[]/.test(a) ? new c("return " + a)() : a;
  },
  log: function (a) {
    "undefined" != typeof console && console.log(a);
  },
  openUrl: function (a, c) {
    if (a)
      if ("_self" == c) document.location.href = a;
      else {
        var b = $("#openclicknewwindow");
        0 == b.length &&
          ((b = $(
            '\x3ca id\x3d"openclicknewwindow" style\x3d"display:none"\x3e'
          )),
          $(document.body).append(b));
        b = $("\x3ca\x3e\x3c/a\x3e");
        b.attr("href", a);
        b.attr("target", c);
        if (navigator.appVersion.match(/\bMSIE\b/))
          document.all && window.open(a);
        else {
          var d = document.createEvent("MouseEvents");
          d.initEvent("click", !0, !0);
          b[0].dispatchEvent(d);
        }
      }
  },
  stopEvent: function (a) {
    a = a || event;
    a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
  },
  cutHtml: function (a, c) {
    if (!c.attr) throw "\u53c2\u6570\u4e0d\u6b63\u786e";
    var b = a.length,
      d = "";
    c.label && (d = "\x3c" + c.label + "\\s+.*?");
    var d = d + (c.attr.name + "\\s*\x3d\\s*['\"]" + c.attr.value + "['\"]"),
      f = a.search(d);
    if (!c.label)
      for (var e = f; 0 <= e; e--)
        if ("\x3c" == a[e]) {
          f = e;
          break;
        }
    for (var e = f + 1, g = 1, h, k = "", d = -1; e < b; e++) {
      h = a[e];
      if ("\x3c" == h && !k)
        -1 == d && (d = e),
          e + 1 < b && "/" == a[e + 1]
            ? (g--, e++)
            : "br\x3e" == a.substr(e + 1, 3)
            ? (e += 3)
            : g++;
      else if ("/" == h && e + 1 < b && "\x3e" == a[e + 1])
        e++, g--, -1 == d && (d = e);
      else if ('"' == h || "'" == h || "\u201c" == h || "\u201d" == h)
        k = k ? "" : h;
      if (0 == g) break;
    }
    if (c.outer) {
      for (; e <= b && "\x3e" != a[e]; e++);
      return a.substr(f, e - f);
    }
    if (-1 == d) return "";
    for (b = e; 0 <= b && "/" != a[b]; b--);
    return a.substr(d, b - d - 1);
  },
  browserCore: function () {
    var a = navigator.userAgent;
    if (0 < a.indexOf("Safari") || 0 < a.indexOf("AppleWebKit"))
      return "Webkit";
    if (0 < a.indexOf("Firefox")) return "Gecko";
    if (0 < a.indexOf("MSIE") || 0 < a.indexOf("rv:11"))
      return 1 <= a.indexOf("MSIE 7")
        ? "MSIE 7"
        : 1 <= a.indexOf("MSIE 8")
        ? "MSIE 8"
        : 1 <= a.indexOf("MSIE 9")
        ? "MSIE 9"
        : 1 <= a.indexOf("MSIE 10")
        ? "MSIE 10"
        : 1 <= a.indexOf("rv:11")
        ? "MSIE 11"
        : 1 <= a.indexOf("MSIE 6")
        ? "MSIE 6"
        : "MSIE";
    if (0 < a.indexOf("Opera")) return "Blink";
  },
  inDesign: function () {
    if (!__parentIsSelfDomain) return !1;
    var a =
      0 < window.document.location.href.toLowerCase().indexOf("/design/")
        ? $(".edit_page")
        : parent.$(".edit_page");
    return 0 < a.length && a.hasClass("active") ? !0 : !1;
  },
  inToolBox: function () {
    return (
      0 < window.document.location.href.toLowerCase().indexOf("/ai-design/")
    );
  },
  isMinApp: function () {
    return (
      $.cookie("mpApp") ||
      (window.__wxjs_environment && "miniprogram" === window.__wxjs_environment)
    );
  },
  checkRequest: function () {
    var a = String.fromCharCode(109) + "ent.locat",
      c = String.fromCharCode(105) + "on.hos",
      a = new Function("return docu" + a + c + "t")(),
      b = String.fromCharCode(105) + "den",
      d = String.fromCharCode(111) + "rm1",
      f = String.fromCharCode(120) + "iniu.",
      e = String.fromCharCode(120) + "iniuyun.",
      g = String.fromCharCode(122) + "ihu.",
      c =
        "docu" +
        String.fromCharCode(109) +
        "ent.locat" +
        String.fromCharCode(105) +
        "on.rep" +
        String.fromCharCode(108) +
        "ace(";
    if (
      -1 == a.indexOf(f + "com") &&
      -1 == a.indexOf(e + "com") &&
      -1 == a.indexOf(g + "com") &&
      -1 == a.indexOf("eimsiot") &&
      (b = $("#f" + d).data(b + "tify"))
    ) {
      d = "";
      for (f = 1; f < b.length - 1; )
        0 == b.substr(f, 1)
          ? ((e = parseInt(b.substr(f, 4))), (f += 4))
          : ((e = parseInt(b.substr(f, 3))), (f += 3)),
          (d += String.fromCharCode(e - 99));
      -1 == a.indexOf(d) &&
        ("1" == b[0]
          ? new Function(c + "'http://" + d + "')")()
          : "2" == b[0] && new Function(c + "'https://" + d + "')")());
    }
  },
  miniIE10: function () {
    var a = util.browserCore();
    "MSIE 10" != a &&
      "MSIE 11" != a &&
      (document.location.href = "/Admin/Design/Browser_Hints.php");
  },
  miniIE11: function () {
    "MSIE 11" != util.browserCore() &&
      (document.location.href = "/Admin/Design/Browser_Hints.php");
  },
};
$(function () {
  util.checkRequest();
});


var isApp = util.queryString("mp");
"true" != isApp || $.cookie("mpApp") || $.cookie("mpApp", isApp);
window.isMinApp = util.isMinApp;
var message_EN = {
    E001: "Please enter keywords!",
    E002: "Failed to load response data",
    E003: "Selected option not valid",
    E004: "Please choose query options",
    E005: "Please add form tag in your page",
    E006: "Parameters not valid",
    E007: "Pagination required",
    E008: "Pagination must be a number",
    E009: "Url parameters not valid",
    E010: "OK",
    E011: "Cancel",
    E012: "Message",
    E013: "Alert",
    E014: "Confirm",
    E015: "Prompt",
    E016: "Upload failed",
    E017: "Re-upload",
    E018: "The file format is incorrect,Please re-select the file upload.",
    E019: "Image size exceeds maximum limit",
    E020: "Please re-select image upload",
    E021: "File size exceeds maximum limit",
    E022: "Please re-select file upload",
    E023: "Image size does not meet the minimum limit",
    E024: "File size does not meet the minimum limit",
    E025: "Change",
    E026: "Failed to get the image, please try again",
    E027: "Are you sure you want to delete this picture?",
    E028: "Are you sure you want to delete this file?",
    E029: "Failed to delete",
    E030: "Error message",
    E031: "Change",
    E032: "Failed to get the file, please try again",
    E033: "Setting",
    E034: "Edit",
    E035: "Please upload the file first",
  },
  message_CN = {
    E001: "\u8bf7\u8f93\u5165\u5173\u952e\u5b57!",
    E002: "\u83b7\u53d6\u6570\u636e\u5931\u8d25",
    E003: "\u4e0d\u6b63\u786e\u7684\u4e0b\u62c9\u503c",
    E004: "\u8bf7\u9009\u62e9\u67e5\u8be2\u9009\u9879",
    E005: "\u8bf7\u5728\u9875\u9762\u91cc\u9762\u6dfb\u52a0form\u6807\u7b7e",
    E006: "\u51fa\u9519\u5566!\u4f20\u5165\u7684\u53c2\u6570",
    E007: "\u8bf7\u8f93\u5165\u9875\u7801",
    E008: "\u9875\u7801\u53ea\u80fd\u4e3a\u6570\u5b57",
    E009: "\u65e0\u6548\u7684Url\u53c2\u6570",
    E010: "\u786e\u5b9a",
    E011: "\u53d6\u6d88",
    E012: "\u6d88\u606f",
    E013: "\u8b66\u544a",
    E014: "\u786e\u8ba4",
    E015: "\u63d0\u793a",
    E016: "\u4e0a\u4f20\u5931\u8d25",
    E017: "\u91cd\u65b0\u4e0a\u4f20",
    E018:
      "\u6587\u4ef6\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u6587\u4ef6\u4e0a\u4f20",
    E019: "\u56fe\u7247\u5927\u5c0f\u8d85\u51fa\u6700\u5927\u9650\u5236",
    E020: "\u8bf7\u91cd\u65b0\u9009\u62e9\u56fe\u7247\u4e0a\u4f20",
    E021: "\u6587\u4ef6\u5927\u5c0f\u8d85\u51fa\u6700\u5927\u9650\u5236",
    E022: "\u8bf7\u91cd\u65b0\u9009\u62e9\u6587\u4ef6\u4e0a\u4f20",
    E023: "\u56fe\u7247\u5927\u5c0f\u4e0d\u6ee1\u8db3\u6700\u5c0f\u9650\u5236",
    E024: "\u6587\u4ef6\u5927\u5c0f\u4e0d\u6ee1\u8db3\u6700\u5c0f\u9650\u5236",
    E025: "\u66f4\u6362\u56fe\u7247",
    E026: "\u83b7\u53d6\u56fe\u7247\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5",
    E027: "\u786e\u5b9a\u8981\u5220\u9664\u8be5\u56fe\u7247\u5417\uff1f",
    E028: "\u786e\u5b9a\u8981\u5220\u9664\u8be5\u6587\u4ef6\u5417\uff1f",
    E029: "\u5220\u9664\u5931\u8d25",
    E030: "\u9519\u8bef\u4fe1\u606f",
    E031: "\u66f4\u6362\u6587\u4ef6",
    E032: "\u83b7\u53d6\u6587\u4ef6\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5",
    E033: "\u8bbe\u7f6e",
    E034: "\u4fee\u6539",
    E035: "\u8bf7\u5148\u4e0a\u4f20\u6587\u4ef6",
  };
(function (a) {
  a &&
    ((a.alerts = {
      verticalOffset: -75,
      horizontalOffset: 0,
      repositionOnResize: !0,
      overlayOpacity: 0.01,
      overlayColor: "#FFF",
      okButton: util.getMessage("E010"),
      cancelButton: util.getMessage("E011"),
      dialogClass: null,
      alert: function (c, b, d) {
        b
          ? "message" == b.toLowerCase() && (b = util.getMessage("E012"))
          : (b = util.getMessage("E013"));
        a.alerts._show(b, c, null, "alert", function (a) {
          d && d(a);
        });
      },
      confirm: function (c, b, d) {
        b
          ? "message" == b.toLowerCase() && (b = util.getMessage("E012"))
          : (b = util.getMessage("E014"));
        a.alerts._show(b, c, null, "confirm", function (a) {
          d && d(a);
        });
      },
      prompt: function (c, b, d, f) {
        d || (d = util.getMessage("E015"));
        a.alerts._show(d, c, b, "prompt", function (a) {
          f && f(a);
        });
      },
      _show: function (c, b, d, f, e) {
        a.alerts._hide();
        a.alerts._overlay("show");
        a("BODY").append(
          '\x3cdiv id\x3d"popup_container"\x3e\x3ch1 id\x3d"popup_title"\x3e\x3c/h1\x3e\x3cdiv id\x3d"popup_content"\x3e\x3cdiv id\x3d"popup_message"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'
        );
        a.alerts.dialogClass &&
          a("#popup_container").addClass(a.alerts.dialogClass);
        a("#popup_container").css({
          position: "fixed",
          zIndex: 19991018,
          padding: 0,
          margin: 0,
          width: 360,
        });
        a("#popup_title").text(c);
        a("#popup_content").addClass(f);
        a("#popup_message").text(b);
        a("#popup_message").php(
          a("#popup_message").text().replace(/\n/g, "\x3cbr /\x3e")
        );
        a.alerts._reposition();
        a.alerts._maintainPosition(!0);
        switch (f) {
          case "alert":
            a("#popup_message").after(
              '\x3cdiv id\x3d"popup_panel"\x3e\x3cinput type\x3d"button" value\x3d"' +
                a.alerts.okButton +
                '" id\x3d"popup_ok" /\x3e\x3c/div\x3e'
            );
            a("#popup_ok").click(function () {
              a.alerts._hide();
              e(!0);
            });
            a("#popup_ok")
              .focus()
              .keypress(function (b) {
                (13 != b.keyCode && 27 != b.keyCode) ||
                  a("#popup_ok").trigger("click");
              });
            break;
          case "confirm":
            a("#popup_message").after(
              '\x3cdiv id\x3d"popup_panel"\x3e\x3cinput type\x3d"button" value\x3d"' +
                a.alerts.okButton +
                '" id\x3d"popup_ok" /\x3e \x3cinput type\x3d"button" value\x3d"' +
                a.alerts.cancelButton +
                '" id\x3d"popup_cancel" /\x3e\x3c/div\x3e'
            );
            a("#popup_ok").click(function () {
              a.alerts._hide();
              e && e(!0);
            });
            a("#popup_cancel").click(function () {
              a.alerts._hide();
              e && e(!1);
            });
            a("#popup_ok").focus();
            a("#popup_ok, #popup_cancel").keypress(function (b) {
              13 == b.keyCode && a("#popup_ok").trigger("click");
              27 == b.keyCode && a("#popup_cancel").trigger("click");
            });
            break;
          case "prompt":
            a("#popup_message")
              .append(
                '\x3cbr /\x3e\x3cinput type\x3d"text" size\x3d"30" id\x3d"popup_prompt" /\x3e'
              )
              .after(
                '\x3cdiv id\x3d"popup_panel"\x3e\x3cinput type\x3d"button" value\x3d"' +
                  a.alerts.okButton +
                  '" id\x3d"popup_ok" /\x3e \x3cinput type\x3d"button" value\x3d"' +
                  a.alerts.cancelButton +
                  '" id\x3d"popup_cancel" /\x3e\x3c/div\x3e'
              ),
              a("#popup_prompt").width(a("#popup_message").width()),
              a("#popup_ok").click(function () {
                var b = a("#popup_prompt").val();
                a.alerts._hide();
                e && e(b);
              }),
              a("#popup_cancel").click(function () {
                a.alerts._hide();
                e && e(null);
              }),
              a("#popup_prompt, #popup_ok, #popup_cancel").keypress(function (
                b
              ) {
                13 == b.keyCode && a("#popup_ok").trigger("click");
                27 == b.keyCode && a("#popup_cancel").trigger("click");
              }),
              d && a("#popup_prompt").val(d),
              a("#popup_prompt").focus().select();
        }
        a.alerts._stylish();
      },
      _hide: function () {
        a("#popup_container").remove();
        a.alerts._overlay("hide");
        a.alerts._maintainPosition(!1);
      },
      _overlay: function (c) {
        switch (c) {
          case "show":
            a.alerts._overlay("hide");
            a("BODY").append('\x3cdiv id\x3d"popup_overlay"\x3e\x3c/div\x3e');
            a("#popup_overlay").css({
              position: "absolute",
              zIndex: 99998,
              top: "0px",
              left: "0px",
              width: "100%",
              height: a(document).height(),
              background: a.alerts.overlayColor,
              opacity: a.alerts.overlayOpacity,
            });
            break;
          case "hide":
            a("#popup_overlay").remove();
        }
      },
      _stylish: function () {
        a("#popup_container").css({
          border: "solid 1px #BABABA",
          "background-color": "#FBFBFB",
          "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.2)",
        });
        a("#popup_title").css({ "font-size": "20px", padding: "10px 15px" });
        a("#popup_message").css({ "font-size": "14px", padding: "15px" });
        a("#popup_panel").css({ float: "right", padding: "15px" });
        a("#popup_ok, #popup_cancel").css({
          "margin-left": "10px",
          "min-width": "60px",
          height: "30px",
          "font-weight": "bold",
          border: "solid 1px #BABABA",
          "background-color": "#FBFBFB",
        });
        a("#popup_prompt").css({ margin: ".5em 0em" });
      },
      _reposition: function () {
        var c =
            a(window).height() / 2 -
            a("#popup_container").outerHeight() / 2 +
            a.alerts.verticalOffset,
          b =
            a(window).width() / 2 -
            a("#popup_container").outerWidth() / 2 +
            a.alerts.horizontalOffset;
        0 > c && (c = 0);
        0 > b && (b = 0);
        a("#popup_container").css({ top: c + "px", left: b + "px" });
        a("#popup_overlay").height(a(document).height());
      },
      _maintainPosition: function (c) {
        if (a.alerts.repositionOnResize)
          switch (c) {
            case !0:
              a(window).bind("resize", function () {
                a.alerts._reposition();
              });
              break;
            case !1:
              a(window).unbind("resize");
          }
      },
    }),
    (jAlert = function (c, b, d) {
      a.alerts.alert(c, b, d);
    }),
    (jConfirm = function (c, b, d) {
      a.alerts.confirm(c, b, d);
    }),
    (jPrompt = function (c, b, d, f) {
      a.alerts.prompt(c, b, d, f);
    }));
})("undefined" == typeof jQuery ? null : jQuery);
function showQrCode(a) {
  0 == a.attr("isDualCore")
    ? a.show()
    : 768 < window.screen.width &&
      0 > top.location.pathname.toLowerCase().indexOf("design") &&
      a.show();
}
"undefined" != typeof jQuery &&
  $(function () {
    0 < $("#qrcode").length && showQrCode($("#qrcode"));
    0 < $("#qrWeixin").length && showQrCode($("#qrWeixin"));
  });
var pagination = {
  go: function (a) {
    a = $(a);
    if (c) {
      var c = c || window.event;
      c.returnValue = !1;
      c.preventDefault && c.preventDefault();
    }
    c = a.data("name");
    a = a.parent().find("input[type\x3dtext]").val();
    if (!a) jAlert(util.getMessage("E007"), "Message");
    else if (1 > parseInt(a) || "1" == a) a = "";
    document.location.href = util.createUrl(null, !1, [c], [a]);
  },
};

var page = {
  value: {
    _init_methods: [],
    _load_methods: [],
    _size_methods: [],
    _scroll_methods: [],
    _mousedown_methods: [],
    _mousemove_methods: [],
    _mouseup_methods: [],
    _click_methods: [],
    _keydown_methods: [],
    _keyup_methods: [],
  },
  init: function (a, c, b, d, f) {
    return page.addEvent("init", a, null, null, c, b, d, f);
  },
  load: function (a, c, b, d, f) {
    return page.addEvent("load", a, null, null, c, b, d, f);
  },
  resize: function (a, c, b, d, f) {
    return page.addEvent("size", a, null, null, c, b, d, f);
  },
  scroll: function (a, c, b, d, f) {
    return page.addEvent("scroll", a, null, null, c, b, d, f);
  },
  click: function (a, c, b, d, f) {
    return page.addEvent("click", a, null, null, c, b, d, f);
  },
  mouseDown: function (a, c, b, d, f) {
    return page.addEvent("mousedown", a, null, null, c, b, d, f);
  },
  mouseMove: function (a, c, b, d, f) {
    return page.addEvent("mousemove", a, null, null, c, b, d, f);
  },
  mouseMoveCallBack: function (a, c, b, d, f, e, g) {
    return page.addEvent("mousemove", a, c, b, d, f, e, g);
  },
  mouseUp: function (a, c, b, d, f) {
    return page.addEvent("mouseup", a, null, null, c, b, d, f);
  },
  keyDown: function (a, c, b, d, f) {
    return page.addEvent("keydown", a, null, null, c, b, d, f);
  },
  keyUp: function (a, c, b, d, f) {
    return page.addEvent("keyup", a, null, null, c, b, d, f);
  },
  addEvent: function (a, c, b, d, f, e, g, h) {
    a = "_" + a + "_methods";
    var k = page.value[a];
    if (k) {
      var m = page.uuid();
      k.push({
        key: a + c.toString().length,
        call: c,
        success: b,
        error: d,
        params0: f,
        params1: e,
        params2: g,
        params3: h,
        id: m,
      });
      return m;
    }
    util.log("\u53c2\u6570\u4e0d\u6b63\u786e");
  },
  uuid: function () {
    for (var a = [], c = 0; 36 > c; c++)
      a[c] = "0123456789abcdef".substr(Math.floor(16 * Math.random()), 1);
    a[14] = "4";
    a[19] = "0123456789abcdef".substr((a[19] & 3) | 8, 1);
    a[8] = a[13] = a[18] = a[23] = "-";
    return a.join("");
  },
  removeEvent: function (a, c) {
    var b = page.value["_" + a + "_methods"];
    if (!b) return !1;
    var d = 0;
    if ("string" == typeof c) {
      for (; d < b.length && b[d].id != c; d++);
      b.splice(d, 1);
    } else if ("object" == typeof c)
      for (; d < b.length; d++) c.test(b[d].id) && b.splice(d, 1);
    else return !1;
    return !0;
  },
  splitMobileWidth: 768,
  currentDevice: function () {
    var a = document.documentElement.clientWidth;
    __parentIsSelfDomain &&
      parent != window &&
      (a = parent.$("#" + window.name).width());
    return util.inDesign() && parent.sitePage && parent.sitePage.page
      ? parent.sitePage.page.currentDeviceType
      : a > page.splitMobileWidth
      ? 1
      : 2;
  },
  setWindowToPc: function () {
    $("#WebViewport").attr("content", "width\x3d1500, user-scalable\x3dno");
  },
  registeTabReload: [],
};
function windowLoad() {
  for (var a = 0; a < page.value._load_methods.length; a++) {
    var c = page.value._load_methods[a];
    c.call(c.params0, c.params1, c.params2, c.params3);
  }
}
document.all
  ? window.attachEvent("onload", windowLoad)
  : window.addEventListener("load", windowLoad, !1);
var w = $(window);
w.on("resize", function () {
  for (var a = 0; a < page.value._size_methods.length; a++) {
    var c = page.value._size_methods[a];
    try {
      var b = c.call(c.params0, c.params1, c.params2, c.params3);
      void 0 === b && (b = !0);
      if (!b) break;
    } catch (d) {
      "undefined" != typeof console && console.log(d);
    }
  }
});
w.on("scroll", function () {
  for (
    var a = document.body.scrollTop + document.documentElement.scrollTop,
      c = a - (window._scrollTop | 0),
      b = 0;
    b < page.value._scroll_methods.length;
    b++
  ) {
    var d = page.value._scroll_methods[b];
    try {
      var f = d.call(c, d.params0, d.params1, d.params2, d.params3);
      void 0 === f && (f = !0);
      if (!f) break;
    } catch (e) {
      "undefined" != typeof console && console.log(e);
    }
  }
  window._scrollTop = a;
});
w.on("mousedown", function () {
  for (var a = 0; a < page.value._mousedown_methods.length; a++) {
    var c = page.value._mousedown_methods[a];
    try {
      var b = c.call(c.params0, c.params1, c.params2, c.params3);
      void 0 === b && (b = !0);
      if (!b) break;
    } catch (d) {
      "undefined" != typeof console && console.log(d);
    }
  }
});
w.on("mousemove", function () {
  for (var a = 0; a < page.value._mousemove_methods.length; a++) {
    var c = page.value._mousemove_methods[a];
    try {
      var b = c.call(c.params0, c.params1, c.params2, c.params3);
      if (c.success)
        try {
          c.success(c.params0, c.params1, c.params2, c.params3);
        } catch (d) {}
      void 0 === b && (b = !0);
      if (!b) break;
    } catch (d) {
      if (("undefined" != typeof console && console.log(d), c.error))
        try {
          c.error(c.params0, c.params1, c.params2, c.params3);
        } catch (f) {}
    }
  }
});
w.on("mouseup", function () {
  for (var a = 0; a < page.value._mouseup_methods.length; a++) {
    var c = page.value._mouseup_methods[a];
    try {
      var b = c.call(c.params0, c.params1, c.params2, c.params3);
      void 0 === b && (b = !0);
      if (!b) break;
    } catch (d) {
      if (("undefined" != typeof console && console.log(d), c.error))
        try {
          c.error(c.params0, c.params1, c.params2, c.params3);
        } catch (f) {}
    }
  }
});
w.on("keydown", function () {
  for (var a = 0; a < page.value._keydown_methods.length; a++) {
    var c = page.value._keydown_methods[a];
    try {
      var b = c.call(c.params0, c.params1, c.params2, c.params3);
      void 0 === b && (b = !0);
      if (!b) break;
    } catch (d) {
      "undefined" != typeof console && console.log(d);
    }
  }
});
w.on("keyup", function () {
  for (var a = 0; a < page.value._keyup_methods.length; a++) {
    var c = page.value._keyup_methods[a];
    try {
      var b = c.call(c.params0, c.params1, c.params2, c.params3);
      void 0 === b && (b = !0);
      if (!b) break;
    } catch (d) {
      "undefined" != typeof console && console.log(d);
    }
  }
});
w.on("click", function () {
  for (var a = 0; a < page.value._click_methods.length; a++) {
    var c = page.value._click_methods[a];
    try {
      var b = c.call(c.params0, c.params1, c.params2, c.params3);
      void 0 === b && (b = !0);
      if (!b) break;
    } catch (d) {
      "undefined" != typeof console && console.log(d);
    }
  }
});
window.addEventListener &&
  window.addEventListener("message", function (a) {
    if (
      0 <= a.origin.indexOf(document.location.host) ||
      0 <= a.origin.indexOf("idea.zihu.com") ||
      0 <= a.origin.indexOf("idea.xiniu.com") ||
      0 <= a.origin.indexOf("idea.niuren.com")
    ) {
      var c = {};
      try {
        c = JSON.parse(a.data);
      } catch (d) {
        util.log(d.data);
        return;
      }
      if (c.cmd) {
        var b = null;
        try {
          b = c.params
            ? new Function("return " + c.cmd + "(" + c.param + ")")()
            : /\)$/.test(c.cmd)
            ? new Function("return " + c.cmd)()
            : new Function("return " + c.cmd + "()")();
        } catch (d) {
          util.log(d);
          return;
        }
        b && a.source.postMessage(b, a.origin);
      }
    }
  });
var animation = {
  anEvent:
    "animationend webkitAnimationEnd oAnimationEnd webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
  config: { enabledScrollAn: !0, enabledScrollAutoHide: !0 },
  data: { anEvnts: [], stopInfo: [], scrollHide: [], scrollTimer: -1 },
  anIds: function (a) {
    if (animation.data.animationIds) return animation.data.animationIds[a];
    animation.data.animationIds = [];
    animation.loadAnimations($("[data-anids]"));
    return animation.data.animationIds[a];
  },
  loadAnimations: function (a) {
    var c =
        document.body.scrollTop +
        document.documentElement.scrollTop +
        document.documentElement.clientHeight,
      b = util.browserCore(),
      d = "MSIE 7" == b || "MSIE 8" == b || "MSIE 9" == b,
      f = page.currentDevice();
    a.each(function (a) {
      var b = $(this);
      b.data("anindex", a);
      var e = !1,
        k = !1,
        m = 0,
        n = b.offset().top;
      b.attr("data-anids")
        .split(",")
        .forEach(function (g, f) {
          animation.data.animationIds[g]
            ? animation.data.animationIds[g].push({ anIndex: a, el: b })
            : (animation.data.animationIds[g] = [{ anIndex: a, el: b }]);
          var h = animation.anIdConfigs(g),
            p = animation.anFindEvent(g, h.device);
          p &&
            h.library &&
            ((m = 0 < m && m != h.device ? 3 : h.device), (e = !0));
          !d &&
            p &&
            (("scroll" == p.event && n >= c) || "load" == p.event) &&
            (k = !0);
        });
      e &&
        k &&
        (animation.config.enabledScrollAutoHide &&
          (1 == m
            ? b.addClass("pc_an_hide")
            : 2 == m
            ? b.addClass("mobile_an_hide")
            : 3 == m &&
              (b.addClass("pc_an_hide"), b.addClass("mobile_an_hide"))),
        f == m &&
          b.find("img").each(function () {
            var a = $(this);
            if (
              "false" != a.attr("init-scroll") &&
              ((this.lgLoaded = !0),
              !a.attr("src") || a.attr("src") == emptyImage)
            ) {
              var b = "";
              2 == f && (b = a.data("src-sm"));
              !b && (b = a.data("src"));
              "undefined" != typeof b &&
                b &&
                0 < b.indexOf(",") &&
                (b = b.split(",")[f - 1]);
              a.attr("src", b);
            }
          }));
    });
  },
  anIdConfigs: function (a) {
    var c = animation.config["an" + a];
    return c
      ? c
      : (util.log("\u52a8\u753b\u914d\u7f6e\u4e0d\u5b58\u5728:" + a), {});
  },
  anFindEvent: function (a, c) {
    if (!animation.data.anEvnts) return !1;
    c = "undefined" == typeof c ? page.currentDevice() : c;
    for (var b = 0; b < animation.data.anEvnts.length; b++)
      for (var d = animation.data.anEvnts[b].evts, f = 0; f < d.length; f++)
        if (d[f] && d[f].an && d[f].device == c)
          for (var e = 0; e < d[f].an.length; e++)
            if (d[f].an[e].id == a && d[f].an[e].device == c) return d[f];
  },
  regist: function (a, c) {
    if (!/Trident.*rv:[56789]/.test(navigator.userAgent)) {
      var b = $(a);
      b.each(function (b) {
        $(this).data("trIndex", b);
        $(this).data("trCount", a.length);
      });
      animation.data.anEvnts.push({ trigger: b, evts: c });
      var d = function (a, b) {
          var c = util.toInt($(a).data("doCount" + b.event));
          b.doCount = c;
          (0 != b.count && 0 < b.doCount && b.doCount >= b.count) ||
            (0 != b.device && b.device != page.currentDevice()) ||
            (b.doCount++,
            $(a).data("doCount" + b.event, b.doCount),
            b.an.forEach(function (c, d) {
              if (
                c.id &&
                (0 == c.device || c.device == page.currentDevice()) &&
                !animation.isAnStoped(c.id)
              ) {
                var e = animation.anIds(c.id);
                if (e && 0 != e.length) {
                  var f = animation.anIdConfigs(c.id);
                  f
                    ? 1 == f.type
                      ? animation.kuAnimation(a, e, f, b.event)
                      : 10 == f.type
                      ? animation.customAnimation(a, e, f, b.event)
                      : 0 < f.type &&
                        ("load" == b.event
                          ? setTimeout(function () {
                              animation.transAnimation(a, e, f, b.event);
                            }, 1e3)
                          : animation.transAnimation(a, e, f, b.event))
                    : util.log("msg:not found animation config:" + c.id);
                } else util.log("msg:not found animation:" + c.id);
              }
            }));
        },
        f = function (a, b, c) {
          if (animation.config.enabledScrollAn) {
            var e = "scrollin" + c.id + "-" + page.currentDevice(),
              f = document.documentElement.clientHeight,
              g =
                document.body.scrollTop +
                document.documentElement.scrollTop +
                f,
              h = b.offset().top,
              f = h + b.outerHeight() + f;
            if (g <= h || g >= f) {
              if (0 > a && g <= h - 50 && 2 == b[e]) {
                if (void 0 != b.data("anids")) {
                  a = String(b.data("anids")).split(",");
                  g = !1;
                  for (h = 0; h < c.an.length; h++)
                    if (a.indexOf(c.an[h].id)) {
                      g = !0;
                      break;
                    }
                  g
                    ? ((a = page.currentDevice()),
                      1 != a || b.hasClass("pc_an_hide")
                        ? 2 != a ||
                          b.hasClass("mobile_an_hide") ||
                          b.addClass("mobile_an_hide")
                        : b.addClass("pc_an_hide"))
                    : animation.animationHide(c, !0);
                } else animation.animationHide(c, !0);
                b[e] = 0;
              }
            } else
              0 < b[e] ||
                0 >= a ||
                ((b[e] = 1),
                setTimeout(function () {
                  d(b, c);
                  b[e] = 2;
                }, 250));
          }
        };
      c.forEach(function (a, c) {
        "load" == a.event
          ? b.data("eid", page.load(d, b, a))
          : "scroll" == a.event
          ? b.each(function () {
              var b = $(this);
              "1" != b.attr("event") && b.data("eid", page.scroll(f, b, a));
            })
          : "screenin" == a.event || "screenout" == a.event
          ? b.each(function () {
              var b = $(this);
              if ("1" != b.attr("event"))
                b.on(a.event, function () {
                  d(b, a);
                });
            })
          : b.each(function () {
              var b = $(this);
              if ("1" != b.attr("event"))
                b.on(a.event, function (b) {
                  var c = $(this);
                  b = "do-" + a.id;
                  clearTimeout(c[b]);
                  c[b] = setTimeout(function () {
                    d(c, a);
                  }, 100);
                });
            });
      });
      b.attr("event", "1");
    }
  },
  ajaxContentRegist: function (a, c) {
    var b = [],
      d = "undefined" != typeof c && c;
    a.find("[data-eventid]").each(function () {
      var a = $(this).data("eventid");
      -1 == b.indexOf(a) && b.push(a);
    });
    var f = a.find("[data-anids]");
    f.each(function () {
      $(this)
        .attr("data-anids")
        .split(",")
        .forEach(function (a, b) {
          animation.data.animationIds[a] = [];
        });
    });
    animation.loadAnimations(f);
    for (var f = [], e = [], g = 0; g < animation.data.anEvnts.length; g++) {
      for (var h = !1, k = 0; k < b.length; k++)
        if (0 <= animation.data.anEvnts[g].trigger.selector.indexOf(b[k])) {
          h = !0;
          break;
        }
      if (h) {
        if (
          (f.push({
            trigger: a.find(animation.data.anEvnts[g].trigger.selector),
            evts: animation.data.anEvnts[g].evts,
          }),
          d)
        )
          for (h = 0; h < animation.data.anEvnts[g].evts.length; h++) {
            var m = animation.data.anEvnts[g].evts[h].event;
            animation.data.anEvnts[g].trigger.attr("event", "0");
            "load" == m || "scroll" == m
              ? animation.data.anEvnts[g].trigger.each(function () {
                  page.removeEvent(m, $(this).data("eid"));
                })
              : animation.data.anEvnts[g].trigger.off(m);
          }
      } else e.push(animation.data.anEvnts[g]);
    }
    animation.data.anEvnts = e;
    for (g = 0; g < f.length; g++) animation.regist(f[g].trigger, f[g].evts);
  },
  stopAn: function (a) {
    animation.data.stopInfo.push({ an: anId });
  },
  resumeAn: function (a) {
    for (
      var c = animation.data.stopInfo.length, b = 0;
      b < c && animation.data.stopInfo[b].an != a;
      b++
    );
    -1 < b && animation.data.stopInfo.splice(b, 1);
  },
  isAnStoped: function (a) {
    for (var c = animation.data.stopInfo.length, b = 0; b < c; b++)
      if (animation.data.stopInfo[b].an == a) return !0;
    return !1;
  },
  animationHide: function (a, c) {
    animation.config.enabledScrollAutoHide &&
      ("undefined" == typeof c && (c = !1),
      setTimeout(function () {
        var b = page.currentDevice();
        a.an.forEach(function (a, f) {
          if (0 == a.device || a.device == b) {
            var d = animation.anIds(a.id);
            if (d) {
              var g = animation.anIdConfigs(a.id);
              g &&
                ((c && 1 < d.length) ||
                  d.forEach(function (a, c) {
                    if (
                      "undefined" == g.listIndex ||
                      g.listIndex == a.el.data("trIndex")
                    )
                      1 != b || a.el.hasClass("pc_an_hide")
                        ? 2 != b ||
                          a.el.hasClass("mobile_an_hide") ||
                          a.el.addClass("mobile_an_hide")
                        : a.el.addClass("pc_an_hide");
                  }));
            }
          }
        });
      }, 0));
  },
  kuAnimation: function (a, c, b, d) {
    c &&
      setTimeout(function () {
        $(c).each(function (a, b) {
          var c = page.currentDevice();
          b.el.removeClass(1 == c ? "pc_an_hide" : "mobile_an_hide");
        });
      }, 17);
    animation.anDo(
      a,
      c,
      "animated " + b.library,
      b.loop,
      b.resume,
      b.id,
      b.duration,
      b.delay,
      b.listIndex,
      d
    );
  },
  transAnimation: function (a, c, b, d) {
    animation.anDo(a, c, b.anName, b.loop, b.resume, b.id, b.listIndex, d);
  },
  customAnimation: function (a, c, b, d) {
    var f = !1,
      e = 0;
    c.length == a.data("trCount")
      ? ((a = parseInt(a.data("trIndex"))),
        0 <= a && ((f = !0), (e = c[a].anIndex)))
      : 0 < c.length &&
        util.log(
          "\u65e0\u6cd5\u786e\u5b9a\u52a8\u753b\u7684\u89e6\u53d1\u548c\u52a8\u753b\u5173\u7cfb\uff0c\u539f\u56e0\u6570\u91cf\u4e0d\u4e00\u81f3"
        );
    $(c).each(function (a, c) {
      if (!f || c.anIndex == e) {
        var g = c.el;
        if (
          "undefined" == typeof b.listIndex ||
          b.listIndex == g.data("trIndex")
        )
          (b.hasOwnProperty("clear") && !b.clear) || animation.removeAllAn(g),
            g.one(animation.anEvent, function () {
              0 < b.loop && b.resume
                ? animation.removeAllAn(g)
                : "scroll" == d && animation.addScrollEle(g);
              g.data("aning", !1);
            }),
            setTimeout(function () {
              g.data("aning", !0);
              var a =
                1 == page.currentDevice() ? "pc_an_hide" : "mobile_an_hide";
              g.removeClass(a);
              g.parents("." + a).removeClass(a);
              g.addClass(b.anName);
            }, 0);
      }
    });
  },
  anDo: function (a, c, b, d, f, e, g, h, k, m) {
    var n = !1,
      p = 0;
    c.length == a.data("trCount")
      ? ((a = parseInt(a.data("trIndex"))),
        0 <= a && ((n = !0), (p = c[a].anIndex)))
      : 0 < c.length &&
        util.log(
          "\u65e0\u6cd5\u786e\u5b9a\u52a8\u753b\u7684\u89e6\u53d1\u548c\u52a8\u753b\u5173\u7cfb\uff0c\u5c06\u89e6\u53d1\u5168\u90e8\u52a8\u753b"
        );
    $(c).each(function (a, c) {
      if (!n || c.anIndex == p) {
        var e = c.el;
        if ("undefined" == typeof k || k == e.data("trIndex"))
          animation.removeAllAn(e),
            e.one(animation.anEvent, function () {
              0 < d && f
                ? e.removeClass(b)
                : "scroll" == m && animation.addScrollEle(e);
              e.data("aning", !1);
            }),
            setTimeout(function () {
              util.isNullOrEmpty(g) ||
                e.css({
                  "-webkit-animation-duration": g + "s",
                  "animation-delay": h + "s",
                });
              e.data("aning", !0);
              var a =
                1 == page.currentDevice() ? "pc_an_hide" : "mobile_an_hide";
              e.removeClass(a);
              e.parents("." + a).removeClass(a);
              e.addClass(b);
            }, 0);
      }
    });
  },
  scrollHideEl: function (a) {
    if (!a.data("aning")) {
      var c = 1 == page.currentDevice() ? "pc_an_hide" : "mobile_an_hide";
      if (!a.hasClass(c)) {
        var b =
            document.body.scrollTop +
            document.documentElement.scrollTop +
            document.documentElement.clientHeight,
          d = a.offset().top;
        b < d && a.addClass(c);
      }
    }
  },
  addScrollEle: function (a) {
    var c = !1;
    animation.data.scrollHide.forEach(function (b, d) {
      b.is(a) && (c = !0);
    });
    c || animation.data.scrollHide.push(a);
  },
  removeAllAn: function (a) {
    var c = a.attr("class");
    c &&
      c.split(" ").forEach(function (b, c) {
        /^an_/.test(b) && a.removeClass(b);
      });
  },
};
$(window).on("scroll", function () {
  clearTimeout(animation.data.scrollTimer);
  animation.data.scrollTimer = setTimeout(function () {
    animation.data.scrollHide.forEach(function (a, c) {
      animation.scrollHideEl(a);
    });
  }, 350);
});
var eventManager = {
  events: { login: 1 },
  regist: function (a, c) {},
  invoke: function (a) {},
};
$.fn.copyToWithAnAndEvent = function (a, c, b) {
  1 < this.length && util.log("Be copied object must only one");
  a = null;
  c
    ? (this.append(b), (a = this.children(":last")))
    : (this.php(b), (a = this.children()));
  var d = function (a, b) {
      for (var c = animation.data.anEvnts.length, d = 0; d < c; d++)
        $(animation.data.anEvnts[d].trigger).each(function (c, e) {
          $(e).attr("id") == $(a).attr("id") &&
            animation.regist(b, animation.data.anEvnts[d].evts);
        });
    },
    f = this.find("[event]");
  a.find("[event]").each(function (a, b) {
    d(f[a], b);
  });
  animation.loadAnimations(a.find("[data-anids]"));
  return a;
};
$.fn.removeAnAndEvent = function () {
  var a = function (a) {
      for (var b = [], c = 0; c < animation.data.anEvnts.length; c++)
        $(animation.data.anEvnts[c].trigger).is(a) ||
          b.push(animation.data.anEvnts[c]);
      animation.data.anEvnts = b;
    },
    c = function (a) {
      animation.data.animationIds &&
        a
          .attr("data-anids")
          .split(",")
          .forEach(function (b, c) {
            if (animation.data.animationIds[b]) {
              for (
                var d = animation.data.animationIds[b], f = [], h = 0;
                h < d.length;
                h++
              )
                d[h].el.is(a) && f.push(d[h]);
              animation.data.animationIds[b] = f;
            }
          });
    };
  this.each(function (b, d) {
    var f = $(this);
    a(f);
    c(f);
    f.find("[event]").each(function (b, c) {
      a(c);
    });
    f.find("[data-anids]").each(function (a, b) {
      c(b);
    });
  });
  return this;
};
var qqsid = document.location.href.indexOf("/\x26sh_sid");
0 < qqsid && document.location.replace(document.location.href.substr(0, index));
