//全局js
var cbase_url = "https://400cha.cn";
var base_url = "https://4001.cn";
//jquery 自定义扩展
(function ($) {
  //    导航栏效果
  $.fn.extend({
    oBJClass: function () {
      return this.each(function () {
        //这里的this 指jquery 对象
        var $this = $(this);
        $this.mouseenter(function () {
          $(this).addClass("active").siblings().removeClass("active");
        });
        $this.mouseleave(function () {
          $(this).removeClass("active").siblings();
        });
      });
    },
    divShow: function () {
      return this.each(function () {
        var $this = $(this),
          $index = $this.index();
        $this.mouseenter(function () {
          $(this).addClass("active").siblings().removeClass("active");
          $(this).parent().siblings(".num-list").children().eq($index).show().siblings().hide();
        });
      });
    },
    getNavIndex: function (ele) {
      var NavIndex = "";
      NavIndex = this.attr("data-index");
      $(".nav a").eq(NavIndex).children(".bg-block").stop().animate(
        {
          top: 0,
        },
        "fast"
      );
    },
    crossNav: function (options) {
      var opts = $.extend({}, defaluts, options);
      return this.each(function () {
        //这里的this 指jquery 对象
        var $this = $(this),
          $this_index = $this.index();
        NavIndex = $("body").attr("data-index");
        $this.on("mouseenter", function () {
          if (NavIndex == $this_index) {
            return false;
          }
          $(this).children(".bg-block").stop().animate(
            {
              top: 0,
            },
            "fast"
          );
          $(".nav a")
            .eq(NavIndex)
            .children(".bg-block")
            .stop()
            .animate(
              {
                top: 64 + "px",
              },
              "fast"
            );
        });
        $this.on("mouseleave", function () {
          $(this)
            .children(".bg-block")
            .stop()
            .animate(
              {
                top: 64 + "px",
              },
              "fast"
            );
          $(".nav a").eq(NavIndex).children(".bg-block").stop().animate(
            {
              top: 0,
            },
            "fast"
          );
        });
      });
    },
  });
  //默认参数
  var defaluts = {};
  $(".downSelect_item").on("click", function () {
    window.document.location = $(this).data("select-link");
  });

  $(".downSelect-item").on("click", function () {
    window.document.location = $(this).data("select-link");
  });

  $(".left-item").on("mouseover", function () {
    $(this).siblings().removeClass("left-item-hover");

    $(this).addClass("left-item-hover");
    $(this)
      .siblings()
      .find("img")
      .each(function (index, item) {
        $(item).attr("src", $(item).data("orig-src"));
      });
    $(this).find("img").attr("src", $(this).find("img").data("hover-src"));
    $(".product-img img").attr("src", $(this).data("product-img"));
    $(".product-img").data("product-link", $(this).data("product-link"));
  });

  $(".product-img").on("click", function () {
    window.location.href = $(this).data("product-link");
  });
})(jQuery);

// 更多产品滑动切换图片
// $(function() {
// 	var item = document.getElementsByClassName("left-item");
// 	var productImg = document.getElementsByClassName("productImg");
// 	var itemImg = document.getElementsByClassName("product-img");
// 	var newImgSrc = '';
// 	for (var i = 0; i < item.length; i++) {
// 		item[i].index = i;
// 		item[i].onmouseover = function() {
// 			for (var i = 0; i < item.length; i++) {
// 				itemImg[i].style.display = 'none';
// 				item[i].style.background = '#FC442F';
// 				item[i].style.color = 'white';
// 				console.log(i);
// 			}
// 			itemImg[this.index].style.display = 'block';
// 			item[this.index].style.background = 'white';
// 			item[this.index].style.color = '#FC442F';
// 			item[this.index].style.border = '1px solid #FD614F';
// 		}
// 	}
// });

// function forItem() {
// 	var imgSrc = productImg[this.index].getAttribute("src");
// 	var srcIndex = imgSrc.indexOf(".");
// 	var preFix = imgSrc.slice(0, srcIndex);
// 	var sufFix = imgSrc.slice(srcIndex);
// 	newImgSrc = preFix.concat("2", sufFix);
// 	productImg[this.index].src = newImgSrc;
// 	console.log(newImgSrc);
// }

$(function () {
  //    导航栏效果
  $(".nav a").crossNav();
  $(".how-tems .tem").oBJClass("active");
  $(".Promotion .tag").divShow();
  $("body").getNavIndex();
  //    常见问题切换
  $(".question-list .list-item p.a").click(function (event) {
    /* Act on the event */
    $value = $(this).hasClass("active");
    if ($value) {
      $(this).removeClass("active");
      $(".arrow-tips .a-w").show();
      $(".arrow-tips .a-r").hide();
      $(this).siblings(".content").slideUp();
    } else {
      $(this).addClass("active");
      $(".arrow-tips .a-w").hide();
      $(".arrow-tips .a-r").show();
      $(this).siblings(".content").slideDown();
    }
  });
  //    返回顶部
  $(window).scroll(function () {
    /* 判断滚动条 距离页面顶部的距离 100可以自定义*/
    var $wHight = $(window).height();
    if ($(window).scrollTop() > $wHight) {
      $(".goTo").fadeIn(100); /* 这里用.show()也可以 只是效果太丑 */
    } else {
      $(".goTo").fadeOut(100);
    }
  });
});

$(window).ready(function () {
  //文档和图片全部加载完 执行
  if ($(window).scrollTop() < $(window).height()) {
    $(".side-bar").removeClass("active");
  } else {
    $(".side-bar").addClass("active");
  }
});

$(".banner-kf,.kf,.choose .item .num-l div, .choose .item .num-r div,.touch-kf").on("click", function () {
  openZoosUrl("chatwin");
  return false;
});

/*号码轮播*/
if ($(".zjia").length > 0) {
  $(".zjia").slide({
    mainCell: ".table-wrap",
    easing: "swing",
    delayTime: 1000,
    // effect:"leftLoop"
  });
}

// 侧边栏左侧随机今日办理号码
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomCity() {
  var city = "";
  $.ajax({
    url: "/js0725/city.js",
    type: "get",
    dataType: "Json",
    async: false,
    success: function (result) {
      city = result;
    },
  });
  return city;
}

function setNumberCount() {
  $.ajax({
    url: cbase_url + "/tenant/experience/getRandomInfo",
    type: "get",
    dataType: "Json",
    success: function (e) {
      $("#numberCount").html(e);
    },
  });
}

function RenderList() {
  setNumberCount();
  var city = randomCity();
  var str = "";
  var date = new Date();
  var maxhour = date.getHours();
  var maxMinute = date.getMinutes();
  for (var i = 0; i < 20; i++) {
    var num = rand(0, 370);
    randCity = city[num].name;
    var number = "400***" + rand(1000, 10000);
    var hour = rand(8, maxhour);
    var minute = rand(0, maxMinute);
    var newMinute = minute >= 10 ? minute : "0" + minute;
    str += "<tr>";
    str += '<td class="ellipsis">';
    str += '<img src="' + base_url + '/img0725/portrait_default.png"/>';
    str += '<span class="center" title="' + randCity + '" style="margin-left: 10px;">' + randCity + "</span>";
    str += "</td>";
    str += '<td class="ellipsis" title="' + number + '">' + number + "</td>";
    str += '<td class="ellipsis" title="' + hour + "点" + newMinute + '分">' + hour + "点" + newMinute + "分</td>";
    str += " </tr>";
  }
  return str;
}

(function ($) {
  var box = document.getElementById("bm_content");
  var l1 = document.getElementById("tb1");
  var l2 = document.getElementById("tb2");
  autoScroll();

  function autoScroll() {
    var product = RenderList();
    l1.innerHTML = product;
    if (l1.offsetHeight > box.offsetHeight) {
      l2.innerHTML = l1.innerHTML; //克隆list1的数据，使得list2和list1的数据一样
      scrollMove = setInterval(scrollup, 30); //数值越大，滚动速度越慢
      box.onmouseover = function () {
        clearInterval(scrollMove);
      };
    }
  }

  function scrollup() {
    //滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
    if (box.scrollTop >= l1.offsetHeight) {
      box.scrollTop = 0;
    } else {
      box.scrollTop++;
    }
  }
  //鼠标离开时，滚动继续
  box.onmouseout = function () {
    scrollMove = setInterval(scrollup, 30);
  };
})(jQuery);

// 获取验证码
var uuid = "";
$(function () {
  uuid = uu() + uu() + uu() + uu() + uu() + uu();
  var src = cbase_url + "/tenant/experience/getRandomCode?uuid=" + uuid;

  $("#uuid").attr("src", src);
});

function uu() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 提交体验表单
 */
function submit() {
  var name = $("input[name='name']").val();
  var phone = $("input[name='youPhoneNumber']").val();
  var code = $("input[name='code']").val();
  if (name == "") {
    alert("请填写姓名。");
  } else if (phone == "") {
    alert("请填写手机号。");
  } else if (phone.length != 11) {
    alert("请填写正确的手机号。");
  } else if (code == "") {
    alert("请填写验证码。");
  } else {
    $("#contactUs").html("提交中，请稍后..");
    $.ajax({
      url: cbase_url + "/tenant/experience/addExperience",
      data: {
        name: name,
        phone: phone,
        code: code,
        uuid: uuid,
      },
      dataType: "Json",
      type: "get",
      success: function (e) {
        swal(e.msg, "", "success");
        $("input[name='name']").val("");
        $("input[name='number']").val("");
        $("input[name='code']").val("");
        $("#contactUs").html("立即提交");
      },
    });
  }
}
