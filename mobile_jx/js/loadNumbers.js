//状态标记
var loading = true;
var pageNum = 1; //当前页
var pageSize = 60; //每页条数

var tplSuiteNumberList = Handlebars.compile($("#suiteNumberList").html());

//列表滚动加载数据
$(window).scroll(function () {
  var scrollTop = $(this).scrollTop(); //滚动条距离顶部的高度
  var scrollHeight = $(document).height(); //当前页面的总高度
  var clientHeight = $(this).height(); //当前可视的页面高度
  var totalHeight = parseFloat(clientHeight) + parseFloat(scrollTop);

  if (scrollHeight - totalHeight < 40) {
    if (!loading) {
      loading = true;
      $("#loading").show();
      $("#loading").text("正在加载...");
      pageNum += 1;
      //加载数据
      getSuiteNumberListFromPrice(pageNum, pageSize);
    } else {
      return false;
    }
  }
});

/**
 * 加载数据
 * @param {int} pageNum 页数
 * @param {int} pageSize 每页条数
 * @param {string} price 价签
 */
function getSuiteNumberListFromPrice(pageNum, pageSize) {
  var tplSuiteNumberList = Handlebars.compile($("#suiteNumberList").html());
  $.get("https://400cha.cn/tenant/book/findBookListFromTag?pageNum=" + pageNum + "&pageSize=" + pageSize + "&memo=" + price, function (res) {
    if (res.code === 0) {
      if (res.rows.length < pageSize) {
        res.rows.map((row) => {
          row.privateCalleeNumber = row.calleeNumber.replace(/400\d(\d{6})/, "400*$1");
        });
        $("#loadedNumbers").append(tplSuiteNumberList(res));
      } else {
        $("#loading").text("没有更多数据了");
        return;
      }

      setTimeout(() => {
        //内容获取后，隐藏加载提示
        $("#loading").hide();
        loading = false;
      }, 1000);
    }
  });
}

/**
 * 弹屏预占
 * @param {string} calleeNumber 400 号码
 * @param {int} guidePrice 价格
 */
function openOccupyPage(calleeNumber, guidePrice) {
  var selectedSuitePrice = parseInt(guidePrice.replace(/\d+,(\d+)/, "$1"));
  var selectedSuiteType = "";
  switch (selectedSuitePrice) {
    case 998:
      selectedSuiteType = "经济套餐";
      break;
    case 1700:
      selectedSuiteType = "热销套餐";
      break;
    case 2400:
      selectedSuiteType = "精选套餐";
      break;
    case 4800:
      selectedSuiteType = "集团套餐";
      break;
    default:
      selectedSuiteType = "经济套餐";
      break;
  }

  // 首先判断是否可预占
  $.get("https://400cha.cn/tenant/book/isBooked?calleeNumber=" + calleeNumber, function (res) {
    if (res.code === 0) {
      $("#calleeNumber").val(calleeNumber);
      $("#price").val(selectedSuitePrice);
      $("#suiteType").val(selectedSuiteType);

      $("#occcupyDiv").fadeIn(200);
      $("#occcupyDialog").addClass("weui-half-screen-dialog_show");
    } else {
      $("#errorToast").fadeIn(100);
      setTimeout(function () {
        $("#errorToast").fadeOut(100);
      }, 2000);
    }
  });
}

$(function () {
  $(document).on("click", "#closeDialog", function () {
    $(this).parents(".js_dialog").fadeOut(200);
    $("#occcupyDialog").removeClass("weui-half-screen-dialog_show");
  });
  $(document).on("click", ".weui-mask", function () {
    $(this).parents(".js_dialog").fadeOut(200);
    $("#occcupyDialog").removeClass("weui-half-screen-dialog_show");
  });
  // 提交号码预占
  $(document).on("click", "#submitOccupy", function () {
    var calleeNumber = $("#calleeNumber").val();
    var companyName = $("input[name='companyName']").val();
    var contactor = $("input[name='contactor']").val();
    var mobile = $("input[name='mobile']").val();

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

    var occupyName = [companyName, contactor, mobile].join(",");
    var loading = weui.loading("loading");
    $.get("https://4001.cn/api/tenant/bookRepo/occupy?calleeNumber=" + calleeNumber + "&companyName=" + occupyName, function (res) {
      loading.hide();
      if (res.code === 0) {
        weui.toast("预占成功", 3000);
      } else {
        weui.topTips(res.msg, 5000);
      }
    });
  });
});
