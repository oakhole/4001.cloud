//ȡ��Get����
// ���� get=urlGet()��
// Ȼ��ֱ��ʹ�� get['name']
function urlGet()
{
	var aQuery = window.location.href.split("?");
	var aGET = new Array();
	if(aQuery.length > 1)
	{
		var aBuf = aQuery[1].split("&");
		for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
		{
			var aTmp = aBuf[i].split("=");
			aGET[aTmp[0]] = aTmp[1];
		}
	}
	return aGET;
}

//sprintf
//sprintf("����:{name},���Ǹ�{sex}",{name:'�⾰��',sex:'ֱ��'});
var sprintf = function() {
	var str = arguments[0];
	var obj = arguments[1];
	for (var p in obj){
		str = str.replace(new RegExp("\\{" + p + "\\}", "g"), obj[p]);
	}
	return str;
}


var js_dom = {}
$(function()
{
	$(".js_dom").each(function(){
		var _key = $(this).attr("id");
		$(this).find(".js_dom_son").each(function(){
			var _key_son = $(this).attr("id");
			js_dom[_key + "_" + _key_son] = $(this).html();
			$(this).remove();
		});
		js_dom[_key] = $(this).html();
		$(this).remove();
	});
})

// ��(M)����(d)��Сʱ(h)����(m)����(s)������(q) ������ 1-2 ��ռλ���� 
// ��(y)������ 1-4 ��ռλ��������(S)ֻ���� 1 ��ռλ��(�� 1-3 λ������) 
// ���ӣ� 
// date_format(Mon Sep 19 09:48:40 CST 2016, "yyyy-MM-dd HH:mm:ss") ==> 2006-07-02 08:09:04.423 
// date_format(Mon Sep 19 09:48:40 CST 2016, "yyyy-M-d h:m:s.S")	==> 2006-7-2 8:9:4.18 
var date_format = function () {
	var str = new Date(arguments[0]);
	var fmt = arguments[1] ? arguments[1] : "yyyy-MM-dd HH:mm:ss";
	var o = {
		"M+": str.getMonth() + 1,
		"d+": str.getDate(),
		"H+": str.getHours(),
		"m+": str.getMinutes(),
		"s+": str.getSeconds(),
		"q+": Math.floor((str.getMonth() + 3) / 3),
		"S": str.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)) );
	return fmt;
}