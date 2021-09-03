$(function() {
	var calleeNumber = localStorage.getItem("calleeNumber");
	var guidePrice = localStorage.getItem("guidePrice");
	var chargeCost = localStorage.getItem("chargeCost");

	$("input[name='calleeNumber']").val(calleeNumber);
	$("input[name='guidePrice']").val(guidePrice);
	$("input[name='chargeCost']").val(chargeCost);

})

$("#contractMonth").bind('input porpertychange', function() {
	var contractMonth = new Number($("#contractMonth").val());
	localStorage.setItem("contractMonth", contractMonth);
	var now = new Date();
	var nowAfter = new Date();
	nowAfter.setFullYear(new Number(nowAfter.getFullYear()) + contractMonth);
	var contractStartTime = now.format('yyyy年MM月dd日');
	var contractExpireTime = nowAfter.format('yyyy年MM月dd日');
	var beginEnd = contractStartTime + '-' + contractExpireTime;
	$("input[name='contractDate']").val(beginEnd);
});

function changeDo() {
	var ids = new Array();
	$.each($('input:checkbox'), function() {
		if (this.checked) {
			ids.push($(this).val());
		}
	});
	console.log(ids)
}

Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

$(document).on("click", "#submitStep2", function() {
	var formData = new FormData();
	var openId = localStorage.getItem("openId");
	console.log(openId);
	formData.append("openId", openId);
	var calleeNumber = localStorage.getItem("calleeNumber");
	formData.append("calleeNumber", calleeNumber);
	var guidePrice = localStorage.getItem("guidePrice");
	formData.append("guidePrice", guidePrice);
	var chargeCost = localStorage.getItem("chargeCost");
	formData.append("chargeCost", chargeCost);
	var companyName = localStorage.getItem("companyName");
	formData.append("companyName", companyName);
	var legalPersonMail = localStorage.getItem("legalPersonMail");
	formData.append("legalPersonMail", legalPersonMail);
	var legalPersonName = localStorage.getItem("legalPersonName");
	formData.append("legalPersonName", legalPersonName);
	var companyAddress = localStorage.getItem("companyAddress");
	formData.append("companyAddress", companyAddress);
	var legalPersonMobile = localStorage.getItem("legalPersonMobile");
	formData.append("legalPersonMobile", legalPersonMobile);
	var legalIdCardNo = localStorage.getItem("legalIdCardNo");
	formData.append("legalIdCardNo", legalIdCardNo);
	var numberUsage = localStorage.getItem("numberUsage");
	formData.append("numberUsage", numberUsage);
	var legalIdCardFront = localStorage.getItem("legalIdCardFront");
	formData.append("legalIdCardFront", legalIdCardFront);
	var legalIdCardBack = localStorage.getItem("legalIdCardBack");
	formData.append("legalIdCardBack", legalIdCardBack);
	var unifiedSocialCreditCodeFile = localStorage.getItem("unifiedSocialCreditCodeFile");
	formData.append("unifiedSocialCreditCodeFile", unifiedSocialCreditCodeFile);
	var unifiedSocialCreditCode = localStorage.getItem("unifiedSocialCreditCode");
	formData.append("unifiedSocialCreditCode", unifiedSocialCreditCode);
	var businessScope = localStorage.getItem("businessScope");
	formData.append("businessScope", businessScope);
	var contractMonth = $("#contractMonth").val();
	formData.append("contractMonth", contractMonth);
	var bizLicenseStatus = localStorage.getItem("bizLicenseStatus");
	formData.append("bizLicenseStatus", bizLicenseStatus);
	var ids = new Array();
	$.each($('input:checkbox'), function() {
		if (this.checked) {
			ids.push($(this).val());
		}
	});
	formData.append("funtionss[]", ids);
	if (!contractMonth || contractMonth < 1) {
		weui.topTips("开通年限必须大于1年", 5000);
		return;
	}

	var jsonData = convert_FormData_to_json(formData);
	$.ajax({
		url: 'http://localhost/api/tenant/certification/add',
		type: 'post',
		contentType: 'application/json',
		//contentType:"application/x-www-form-urlencoded; charset=UTF-8",
		data: jsonData,
		dataType: 'JSON',
		success: function(data) {
			if (data.code == 0) {
				weui.dialog({
					title: '提交成功',
					className: 'custom-classname',
					buttons: [{
						label: '确定',
						type: 'primary',
						onClick: function() {
							location.href = "./openIndex.html";
						}
					}]
				});
			} else {
				weui.topTips("提交失败", 5000);
			}
		}
	})
})

// 版本二（箭头语法）
var convert_FormData_to_json = function(formData) {
	var objData = {};

	formData.forEach((value, key) => objData[key] = value);

	return JSON.stringify(objData);
};
