var BASE_URL = "https://logocloud.cn";

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
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1,
			presto: u.indexOf('Presto') > -1,
			webKit: u.indexOf('AppleWebKit') > -1,
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
			mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
			iPad: u.indexOf('iPad') > -1,
			webApp: u.indexOf('Safari') == -1
		};
	}()
}

/**
 * 判断是否 wap 网站
 * 
 */
function wap_judge() {
	if (browser.versions.android || browser.versions.ios) {
		window.location.href = "./m";
	}
}

var numberListTemplate = Handlebars.compile($('#entry-template').html());

/**
 * 展现号码列表
 * @param  {map} data  数据集合
 */
var showCaleeNumberList = function() {
	$('#number-list li').remove();
	$('.spinner').show();

	var month_fee = $('[data-key="month_fee"] .curr').data('val');
	var pattern = $('[data-key="epstype"] .curr').data('val');
	$('[data-key="epstype"] .curr').each(function() {
		if ($(this).data('val')) {
			pattern = $(this).data('val');
		}
	});

	if ($('.m8 input').val()) {
		pattern = $('.m8 input').val();
	}

	var isEnd = 1;

	$.ajax({
			url: BASE_URL + '/api/xuanhao',
			type: 'POST',
			dataType: 'json',
			data: {
				monthFee: month_fee,
				pattern: pattern,
				isEnd: isEnd
			},
		})
		.done(function(data) {
			var newData = new Array();
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				var str = data[i].callee_number;
				newData.push(str.substring(0,3)+"*"+str.substring(4,10));
			}
			console.log(newData);
			$('.spinner').hide();
			$('#number-list').append(numberListTemplate(newData));
		})
		.fail(function() {})
		.always(function() {});
}

$(function() {
	wap_judge();
	showCaleeNumberList();
	$(".valueList").on('click', 'li', function() {
		$('.m8 input').val('');
		showCaleeNumberList();
	});

	$("#search-bufenhaoma").on('click', function() {
		showCaleeNumberList();
	});
});
