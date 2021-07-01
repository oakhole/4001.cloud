var BASE_URL = "https://logocloud.cn";
var CORAL_URL = "http://192.168.3.161/api";

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
	versions: (function() {
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
	console.log(pattern);
	$("#number-list li").remove();
	$(".spinner").show();

	var month_fee = $('[data-key="month_fee"] .curr').data("val");
	if (!pattern) {
		pattern = $('[data-key="epstype"] .curr').data("val");
		$('[data-key="epstype"] .curr').each(function() {
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
		.done(function(data) {
			var newData = new Array();
			for (var i = 0; i < data.length; i++) {
				var str = data[i].callee_number;
				var month_fee = data[i].month_fee;
				newData.push({
					'number': str,
					'month_fee': month_fee
				});
			}
			console.log(newData);
			$(".spinner").hide();
			$("#number-list").append(numberListTemplate(newData));
		})
		.fail(function() {})
		.always(function() {});
};



function searchNumber() {
	var t = $("#n_3"),
		tv = t.val(),
		ov, s = true,
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
	const number = '400' + tv;
	console.log(number);
	showCaleeNumberList(number);
}

$(function() {
	wap_judge();
	showCaleeNumberList();
	$(".valueList").on("click", "li", function() {
		$(".m8 input").val("");
		showCaleeNumberList();
	});

	$("#search-bufenhaoma").on("click", function() {
		showCaleeNumberList();
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
	paying = 0;
	dashangToggle();
	number = e;
	console.log(number);
	$(this).addClass('checked').siblings('.pay_item').removeClass('checked');
	$.get(CORAL_URL + "/oauth/wx/qrCode?args=" + number,
		function(data) {
			var ticket = data.data.ticket;
			// 二维码图片地址
			var src = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket;
			$(".shang_payimg img").attr("src", src);
		});
	timeId = setInterval(() => {
		if (paying == 1) {
			clearInterval(timeId);
		} else if (paying == 0) {
			checkPaymentDone(number);
		};
	}, 3000)
}

function checkPaymentDone(number) {
	$.get(CORAL_URL + '/oauth/wx/isLogin/' + number).then(response => {
		if (response.code == 0) {
			paying = 1;
			openId = response.data.openId;
			$.get(CORAL_URL + '/tenant/bookRepo/occupy?calleeNumber=' + number + '&companyName=' + openId)
				.then(res => {
					logout();
					if (res.code == 0) {
						document.getElementById("caption").innerHTML = "扫码成功,请点击开通!";
						document.getElementById("caption").style.color = "red";
						var url = 'https://kt.4001.cn/?openId=' + openId + "&number=" + number;
						var a = document.getElementById("openA");
						a.href = url;
						var div = document.getElementById("disPlay");
						div.style.display = "block";
						// //打开新的页面
						// newWin(url,"openURL")
						// window.history.back(-1);
					} else {
						alert(res.msg);
						document.getElementById("caption").innerHTML = "扫描微信二维码";
						dashangToggle();
					}
				});
		};
	})
}

function clickOpen() {
	document.getElementById("caption").innerHTML = "扫描微信二维码";
	var div = document.getElementById("disPlay");
	div.style.display = "none";
	dashangToggle();
}
// //打开表单
// function newWin(url, id) {
// 	var a = document.createElement('a');
// 	a.setAttribute('href', url);
// 	a.setAttribute('target', '_blank');
// 	a.setAttribute('id', id);
// 	// 防止反复添加
// 	if (!document.getElementById(id)) document.body.appendChild(a);
// 	a.click();
// }

function dashangToggle() {
	clearInterval(this.timeId);
	paying = 0;
	$(".hide_box").fadeToggle();
	$(".shang_box").fadeToggle();
}

function logout() {
	$.get(CORAL_URL + '/oauth/wx/logout/' + number).then(response => {
		console.log(response);
	});
}
