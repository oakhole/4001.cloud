var BASE_URL = "https://logocloud.cn";
var CORAL_URL = "https://4001.cn/api";
// var CORAL_URL = "http://192.168.3.161/api";

function obj2url() {
  var get = "";
  for (var i in pro_selector) {
    get += i + "=" + pro_selector[i] + "&";
  }
  return get;
}

function copyToClipboard2(txt) {
  var Url2 = document.getElementById("copy-url");
  Url2.innerHTML = txt;
  Url2.select();
}

/**
 * 判断浏览器类型
 */
var browser = {
  versions: (function () {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf("Trident") > -1,
      presto: u.indexOf("Presto") > -1,
      webKit: u.indexOf("AppleWebKit") > -1,
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
      iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1,
      iPad: u.indexOf("iPad") > -1,
      webApp: u.indexOf("Safari") == -1,
    };
  })(),
};

/**
 * 判断是否 wap 网站
 *
 */
function wap_judge() {
  if (browser.versions.android || browser.versions.ios) {
    window.location.href = "./m";
  }
}

var numberListTemplate = Handlebars.compile($("#entry-template").html());

/**
 * 展现号码列表
 * @param  {map} data  数据集合
 */
function showCaleeNumberList(pattern) {
  $("#number-list li").remove();
  $(".spinner").show();

  var month_fee = $('[data-key="month_fee"] .curr').data("val");
  if (!pattern) {
    pattern = $('[data-key="epstype"] .curr').data("val");
    $('[data-key="epstype"] .curr').each(function () {
      if ($(this).data("val")) {
        pattern = $(this).data("val");
      }
    });

    if ($(".m8 input").val()) {
      pattern = $(".m8 input").val();
    }
  }
  var isEnd = 1;

  $.ajax({
    url: BASE_URL + "/api/xuanhao",
    type: "POST",
    dataType: "json",
    data: {
      monthFee: month_fee,
      pattern: pattern,
      isEnd: isEnd,
    },
  })
    .done(function (data) {
      var newData = new Array();
      for (var i = 0; i < data.length; i++) {
        var str = data[i].callee_number;
        var newStr = str.substring(0, 3) + "*" + str.substr(4, 10);
        var month_fee = data[i].month_fee;
        newData.push({
          calleeNumber: str,
          number: newStr,
          month_fee: month_fee,
        });
      }
      console.log(newData);
      if (newData.length == 0) {
        $(".spinner").hide();
        $(".spinner2").show();
      } else {
        $(".spinner").hide();
        $(".spinner2").hide();
        $("#number-list").append(numberListTemplate(newData));
      }
    })
    .fail(function () {})
    .always(function () {});
}

/**
 * 查询已预占号码列表
 */
function showOccupiedNumberList() {
  dashangToggle();
}

function searchNumber() {
  var t = $("#n_3"),
    tv = t.val(),
    ov,
    s = true,
    i;
  // if (tv != "1" && tv != "7") {
  //     alert("第四位请输入1或7!");
  //     t.focus();
  //     return false;
  // }
  if (tv == "") {
    tv += "*";
  }
  for (i = 4; i < 10; i++) {
    ov = $("#n_" + i).val();
    if (i == 3 && ov == "") {
      tv += "*";
    } else if (ov != "") {
      tv += ov;
    } else {
      tv += "*";
    }
  }
  const number = "400" + tv;
  console.log(number);
  showCaleeNumberList(number);
}

// 已预占号码操作
var numberOperateFormatter = function (value, row, index) {
  var openId = row.companyName.replace("4001.cn 预占: ", "");
  return '<a target="_blank" href="https://4001.cn/kt?uid=' + row.certification.certifyId + "&number=" + row.calleeNumber + "&openId=" + openId + '">重新提交</a>';
};

$(function () {
  // wap_judge();
  showCaleeNumberList();
  $(".valueList").on("click", "li", function () {
    $(".m8 input").val("");
    showCaleeNumberList();
  });

  $("#search-bufenhaoma").on("click", function () {
    showCaleeNumberList();
  });

  tippy.setDefaultProps({
    delay: 50,
    placement: "top",
  });
});
// 开通号码
var paying = 0;
var timeId = "";
var openId = "";
var number = "";
//设置轮询次数
var s = 0;

function openNumber(e) {
  $.get("https://400cha.cn/tenant/book/isBooked?calleeNumber=" + e, function (res) {
    if (res.code === 0) {
      $("#calleeNumber").val(e);
      $.get("https://400cha.cn/tenant/certification/price/" + e, function (res) {
        const priceInfo = res.guidePrice + "元/年";
        const chargeCost = res.chargeCost + "元/分";
        $("#numberInfo").html(e);
        $("#priceInfo").html(priceInfo);
        $("#chargeCost").html(chargeCost);
      });
      $("#myModal").modal("toggle");
    } else {
      swal("该号码已被预占，请选择其他号码", "", "error", { button: "确认" });
    }
  });
}

function dashangToggle() {
  $(".hide_box").fadeToggle();
  $(".shang_box").fadeToggle();
}

function searchNumberBy() {
  var phone = $("#searchValue").val();
  if (phone.length != 11) {
    alert("请填写正确的手机号码");
  } else {
    // 刷新已预占号码数据
    $.get("https://400cha.cn/tenant/bookRepo/occupied?tableKind=4001网站&companyName=" + phone, function (res) {
      dashangToggle();
      $("#tableOccupied").bootstrapTable("load", res.data);
      $("#occupiedNumberModal").modal();
    });
  }
}

function submitNumber() {
  const calleeNumber = $("#calleeNumber").val();
  const compamyName = $("#companyName").val();
  const contact = $("#contact").val();
  const contactPhone = $("#contactPhone").val();
  if (compamyName == "" || contactPhone == "" || contact == "") {
    alert("请填写表单内容");
  } else if (contactPhone.length != 11) {
    alert("请填写正确的手机号");
  } else {
    const openId = compamyName + "," + contact + "," + contactPhone;
    $.get(CORAL_URL + "/tenant/bookRepo/occupy?calleeNumber=" + calleeNumber + "&companyName=" + openId).then((res) => {
      var url = "https://4001.cn/kt?openId=" + openId + "&number=" + calleeNumber;
      if (res.code == 0) {
        $("#companyName").val("");
        $("#contact").val("");
        $("#contactPhone").val("");
        $("#myModal").modal("toggle");
        swal("预占成功", "", "success", { button: false });
        setTimeout(() => {
          swal.close();
          window.open(url, "_blank");
        }, 2000);
      } else {
        $("#myModal").modal("toggle");
        swal("该号码已被预占，请选择其他号码", "", "error", { button: "确认" });
      }
    });
  }
}
