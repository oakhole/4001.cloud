function cancelLayer(s) {
    $(".pw-wrap").hide(), clearTimeout(domObj.timeInter), setTimeout(function() {
        $(domObj.tips).appendTo($("body")), $(".pw-wrap").show()
    }, 6e4)
}
var domObj = {
    down: '<svg class="m-dowm"  aria-hidden="true"><use xlink:href="#icon-down"></use></svg>',
    up: '<svg class="m-dowm"  aria-hidden="true"><use xlink:href="#icon-up"></use></svg>',
    zhankai: '<svg class="i-mc-icon1 i-mc-icon"  aria-hidden="true"><use xlink:href="#icon-zhankai"></use></svg>',
    shouqi: '<svg class="i-mc-icon1 i-mc-icon"  aria-hidden="true"><use xlink:href="#icon-shouqi"></use></svg>',
    hanbao: '<svg class="m-menu-in"  aria-hidden="true"><use xlink:href="#icon-hanbaocaidan"></use></svg>',
    hbclose: '<svg class="m-menu-in"  aria-hidden="true"><use xlink:href="#icon-hanbaocaidan-guanbi"></use></svg>',
    reg: /^(00861[3|4|5|7|8|9][0-9]{9}$)|(0088609[0-9]{8}$)|(00852[6|9][0-9]{7}$)|(008536[0-9]{7}$)/,
    pwd: function(s) {
        var o = 0;
        if (!s) return o;
        for (var i = new Object, a = 0; a < s.length; a++) i[s[a]] = (i[s[a]] || 0) + 1, o += 5 / i[s[a]];
        var e = {
            digits: /\d/.test(s),
            lower: /[a-z]/.test(s),
            upper: /[A-Z]/.test(s),
            nonWords: /\W/.test(s)
        };
        variationCount = 0;
        for (var n in e) variationCount += 1 == e[n] ? 1 : 0;
        return o += 10 * (variationCount - 1), (s.length < 6 || s.length > 16) && (o = 24), parseInt(o) >= 25
    },
    time: 60,
    myvedio: null,
    timeInter: null,
    tips: '<div class="pw-wrap  js-popup"><img class="pw-server f-pa" src="' + serverImg + '/img/server.png" /><p class="pw-cont col2 k-fs30 g-tac">您好，智能CRM销氪欢迎您！</p><p class="pw-btn-wrap g-tac"><a class="pw-consult g-mr10 k-fs30 js-bd-ocpc js-udesk js-udesk-aux" data-wmdot="tap" data-wmdot-id="consult_now" href="javascript:;" onclick="cancelLayer(this) ">现在咨询</a><a class="pw-later g-ml10 k-fs30"  data-wmdot="tap" data-wmdot-id="consult_later" href="javascript:;" onclick="cancelLayer(this)">稍后再说</a></p></div>'
};
! function() {
    var val = "";
    "undefined" != typeof Storage ? (val = $("#tchuang").attr("value"), eval(val) && (domObj.timeInter = setTimeout(function() {
        $(domObj.tips).appendTo($("body"))
    }, 15e3))) : console.log("无Storage对象"), $(".nav .navIcon").on("click", function() {
        if ($(this).hasClass("iconburger")) {
            $(this).siblings().removeClass("open"), $(this).removeClass("iconburger").addClass("iconclose"), $(".header .list").show(), $(".header").css("background-color", "#fff");
            var s = $("body").scrollTop();
            $("body").css({
                overflow: "hidden",
                position: "fixed",
                top: -1 * s,
                left: 0,
                right: 0
            })
        } else $(this).siblings().addClass("open"), $(this).removeClass("iconclose").addClass("iconburger"), $(".header .list").hide(), $(".header .list").find(".nav-second").show(), $(".header .list").find("i.iconoackup").removeClass("iconoackup").addClass(" iconopen"), $(".header").css("background-color", "transparent"), $("body").css("overflow", "auto"), $("body").css({
            overflow: "auto",
            position: "relative",
            top: "auto",
            left: 0,
            right: 0
        })
    }), $(".list").find("a").on("click", function() {
        $(this).find("i").hasClass("iconopen") ? ($(this).siblings(".nav-second").hide(), $(this).find("i").removeClass("iconopen").addClass("iconoackup")) : ($(this).siblings(".nav-second").show(), $(this).find("i").removeClass("iconoackup").addClass(" iconopen"))
    })
}();
var bodyMask = function() {
        var s = this;
        s.bodyCls = "m-body-model", s.layer = 0, s.open = function() {
            var o = $("body");
            s.layer++, o.hasClass(s.bodyCls) || (s.scrollTop = $(window).scrollTop(), o.addClass(s.bodyCls), o.css("top", -s.scrollTop + "px"))
        }, s.close = function() {
            var o = $("body");
            s.layer--, 0 === s.layer && o.hasClass(s.bodyCls) && (document.body.classList.remove(s.bodyCls), $(window).scrollTop(s.scrollTop), o.css("top", "0"))
        }
    },
    bodyModel = new bodyMask;
$(document).on("click", function() {
    $("body").hasClass("m-body-model") && $(".js-tip").hide(), $(".price-click").find("li").on("click", function() {
        var s = $(this).index(),
            o = $(this).parent("ul").siblings("div").eq(s);
        $(this).addClass("active"), $(this).siblings("li").removeClass("active"), o.show(), o.siblings("div").hide()
    })
});