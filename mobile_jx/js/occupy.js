/**
 * 获取页面传参
 * @param {string} variable 参数
 * @returns value
 */
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

$(function () {
  // 预占表单通过 url初始化值
  var calleeNumber = getQueryVariable("calleeNumber");
  var guidePrice = getQueryVariable("guidePrice");
  var suiteType = getQueryVariable("suiteType");

  $("#calleeNumber").val(calleeNumber);
  $("#suiteType").val(decodeURI(suiteType));
  $("#guidePrice").val(guidePrice);

  // 提交号码预占
  $(document).on("click", "#submitOccupy", function () {
    var calleeNumber = $("#calleeNumber").val();
    var companyName = $("input[name='companyName']").val();
    var contactor = $("input[name='contactor']").val();
    var mobile = $("input[name='mobile']").val();
    var suiteType = $("#suiteType").val();

    if (!companyName || companyName === "") {
      weui.topTips("请填写有效的公司名称", 5000);
      return;
    }

    if (!contactor || contactor === "") {
      weui.topTips("请填写有效的联系人", 5000);
      return;
    }

    if (!mobile || mobile === "") {
      weui.topTips("请填写有效的联系电话", 5000);
      return;
    }

    $(this).parents(".js_dialog").fadeOut(200);
    $("#occcupyDialog").removeClass("weui-half-screen-dialog_show");

    var occupyName = ["【" + suiteType + " " + guidePrice + "】" + companyName, contactor, mobile].join(",");
    var loading = weui.loading("loading");
    $.get("https://4001.cn/api/tenant/bookRepo/occupy?calleeNumber=" + calleeNumber + "&companyName=" + occupyName, function (res) {
      loading.hide();
      if (res.code === 0) {
        weui.toast("预占成功", 3000);
        setTimeout(() => {
          history.back();
        }, 3000);
      } else {
        weui.topTips(res.msg, 5000);
      }
    });
  });
});
