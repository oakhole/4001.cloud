var base_url = 'https://4001.cn';
// 绑定点击后展开详情页面
$(function() {
	init_case(10, 1);
	// 请求获取[全国 400 办理]列表信息
	$.post(
		base_url + "/cms/post/list", {
			postType: "post",
			categoryId: 2,
			publishStatus: "1",
			orderByColumn: "publishTime",
			isAsc: "desc",
		},
		function(data) {
			var html = "<table style='width: 100%;font-size: 12px;' border='0'>";
			for (var i = 0; i < data.total; i++) {
				if (i % 8 == 0) {
					html += "<tr>";
					for (var j = 0; j < 8; j++) {
						var index = i + j;
						if (index < data.total) {
							html += "<th><a href='https://4001.cn/cms/post/" + data.rows[index].postId + ".html' target='_blank'>" + data.rows[
									index].title +
								"</a></th>"
						}
					}
					html += "</tr>";
				}
			}
			html += "</table>"
			document.querySelector(".national-400").innerHTML = html;
		}
	);

	// 功能点击事件
	$(document).on("click", ".func-group .item", function() {
		var detail_url = $(this).data("url");
		if (detail_url) {
			window.open(detail_url, "_blank");
		}
	});
	// 优势点击事件
	$(document).on("click", ".aboutUL li", function() {
		var detail_url = $(this).data("url");
		if (detail_url) {
			window.open(detail_url, "_blank");
		}
	});
});
// 初始化客戶案例
function init_case(pageSize, pageNum) {
	$.ajax({
		url: base_url + "/cms/post/list",
		data: {
			"categoryId": 6,
			"postType": "post",
			"publishStatus": "1"
		},
		dataType: "Json",
		type: "POST",
		success: function(e) {
			var total = e.total, //读取到的数据数量
				html = "";
			for (var i = 0; i < total; i++) {
				html += "<li><a target='_blank' href='" + base_url + "/cms/post/" + e.rows[i].postId +
					".html'><div class='item-img'><img src=" + e.rows[i].coverImg +
					"></img></div><div class='case_span'><span>" + JSON.parse(e.rows[i].metaInfo).calleeNumber +
					"</span></div><div class='case_hide'><p>点击查看案例详情</p></div></li></a>"
			}
			document.querySelector(".caselist .cc .ss").innerHTML = html + html;
			var height = document.querySelector(".caselist .ss").offsetWidth;
			addKeyFrames('-' + height + 'px'); // 设置keyframes
			document.querySelector('.caselist .cc').className += ' rowup'; // 添加 rowup
		},
	});
}

// 客户案例设置keyframes属性
function addKeyFrames(y) {
	console.log(y)
	var style = document.createElement("style");
	style.type = 'text/css';
	var keyFrames =
		'\
				    @-webkit-keyframes rowup {\
				        0% {\
				            -webkit-transform: translate3d(0, 0, 0);\
				            transform: translate3d(0, 0, 0);\
				        }\
				        100% {\
				            -webkit-transform: translate3d(A_DYNAMIC_VALUE,0, 0);\
				            transform: translate3d(A_DYNAMIC_VALUE,0 , 0);\
				        }\
				    }\
				    @keyframes rowup {\
				        0% {\
				            -webkit-transform: translate3d(0, 0, 0);\
				            transform: translate3d(0, 0, 0);\
				        }\
				        100% {\
				            -webkit-transform: translate3d(A_DYNAMIC_VALUE,0 , 0);\
				            transform: translate3d(A_DYNAMIC_VALUE,0, 0);\
				        }\
				    }';
	style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, y);
	document.getElementsByTagName('head')[0].appendChild(style);
	//客户案例悬浮效果
	$(".caselist .cc ul li").hover(function() {
		$(this).find('.case_hide').animate({
			top: "-45px"
		}, 500);
	}, function() {
		$(this).find('.case_hide').animate({
			top: "0px"
		}, 500);
	})
}
