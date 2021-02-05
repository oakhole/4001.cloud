function isChinese(e) {
    var t = /^[\u4e00-\u9fa5]$/;
    return t.test(e) ? e : encodeURI(e)
}

function getPageName(e) {
    var t = "",
        o = e ? e : window.location.pathname,
        n = o.substring(o.lastIndexOf("/") + 1);
    n.indexOf(".") > -1 && (n = n.substr(0, n.indexOf("."))), n = "/" == n || "" == n ? "xk" : n;
    for (var a in WMDOT_PAGE_NAME) a == n && (t = "wm_" + WMDOT_PAGE_NAME[a]);
    return t
}
var WmDot = function() {};
WmDot.prototype.init = function() {
    this.setPageName()
}, WmDot.prototype.setPageName = function(e) {
    this.pagename = e ? e : getPageName()
}, WmDot.prototype.getPageName = function() {
    return this.pagename
}, WmDot.prototype.sendView = function(pname) {
    if (pname = this.getPageName(), "" != pname) {
        var viewObj = {
                pagename: pname,
                elementid: "pv",
                eventtype: "view"
            },
            $wmdot = $("#wmdot"),
            pvother = $wmdot.data("pvother");
        pvother && $.extend(viewObj, eval("(" + pvother + ")")), this.sendDot(viewObj)
    }
}, WmDot.prototype.sendViewOut = function(e) {
    if (e = this.getPageName(), "" != e) {
        var t = {
            pagename: e,
            elementid: "pv_out",
            eventtype: "view"
        };
        this.sendDot(t)
    }
}, WmDot.prototype.sendDot = function(e) {
    var t = $("#wmdot"),
        o = t.data("wid");
    o && (e.wid = o), e.elementid && e.pagename ? rprm && rprm.rec(e) : console && console.log("wmDot is error")
};
var wmDot = new WmDot,
    WMDOT_PAGE_NAME = {
        xk: "xk",
        search: "xk_search",
        card: "xk_card",
        callcenter: "xk_callcenter",
        crm: "xk_crm",
        cpa: "xk_cpa",
        price: "xk_price",
        merchant: "xk_merchant",
        register: "xk_register",
        cpaRegister: "xk_register2",
        phone: "xk_phone"
    },
    WMDOT_EVENT_NAME = {
        click: "tap",
        mouseover: "hold"
    };
$(function() {
    function GetQueryString(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
            o = window.location.search.substr(1).match(t),
            n = "";
        return null != o && (n = o[2]), t = null, o = null, null == n || "" == n || "undefined" == n ? "" : n
    }

    function pushHistory() {
        var e = {
            title: "title",
            url: ""
        };
        window.history.pushState(e, "title", "")
    }
    var $dom = $(document);
    if (wmDot.init(), wmDot.getPageName()) {
        var $wmdot = $("#wmdot"),
            wmEnv = $wmdot.data("env");
        rprm && rprm.init({
            appName: "saas-path",
            statType: "saaspath",
            env: wmEnv || "development"
        });
        var isAndroid = window.navigator.appVersion.match(/android/gi),
            isIPhone = window.navigator.appVersion.match(/iphone/gi),
            plat;
        isAndroid ? plat = isAndroid[0] : isIPhone && (plat = isIPhone[0]);
        var obj = {
            business: "public",
            platform: plat,
            terminal: "mobile"
        };
        GetQueryString("") ? sessionStorage.setItem("channelSource", GetQueryString("")) : sessionStorage.getItem("channelSource") || sessionStorage.removeItem("channelSource"), sessionStorage.getItem("channelSource") ? obj.channelSource = sessionStorage.getItem("channelSource") : delete obj.channelSource, rprm && rprm["public"](obj), wmDot.sendView(), pushHistory(), window.addEventListener("popstate", function(e) {
            wmDot.sendViewOut()
        }, !1), window.onbeforeunload = function() {
            wmDot.sendViewOut()
        };
        var domData = {
            wmdot: "wmdot",
            dotID: "wmdot-id",
            dotOther: "wmdot-other"
        };
        for (var key in WMDOT_EVENT_NAME) {
            var _type = WMDOT_EVENT_NAME[key];
            $dom.on(key, "[data-" + domData.wmdot + "=" + _type + "]", function(event) {
                var $target = $(event.currentTarget),
                    wmDotID = $target.data(domData.dotID) || "",
                    wmDotOther = eval("(" + $target.data(domData.dotOther) + ")") || {},
                    viewObj = {
                        pagename: wmDot.getPageName(),
                        elementid: wmDotID,
                        eventtype: $target.data(domData.wmdot)
                    };
                $.extend(viewObj, wmDotOther), wmDot.sendDot(viewObj)
            })
        }
    }
});