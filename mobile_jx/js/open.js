//浏览器刷新或关闭
function stepTwoFlush() {
	localStorage.removeItem("legalIdCardFront");
	localStorage.removeItem("legalIdCardBack");
	localStorage.removeItem("unifiedSocialCreditCodeFile");
	localStorage.removeItem("unifiedSocialCreditCode");
	localStorage.removeItem("businessScope");
	localStorage.removeItem("bizLicenseStatus");
}

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

$(function() {
	// 预占表单通过 url初始化值
	var calleeNumber = getQueryVariable("calleeNumber");
	var guidePrice = getQueryVariable("guidePrice");
	var chargeCost = getQueryVariable("chargeCost");

	localStorage.setItem("calleeNumber", calleeNumber);
	localStorage.setItem("guidePrice", guidePrice);
	localStorage.setItem("chargeCost", chargeCost);

	weui.uploader('#uploaderOne', {
		url: 'https://4001.cn/api/common/upload', //你要上传的url地址
		auto: true,
		type: 'file',
		fileVal: 'file', //文件上传域的name，后台通过该name拿到传输的文件
		compress: {
			width: 1600,
			height: 1600,
			quality: .8
		},
		onBeforeQueued: function onBeforeQueued(files) {
			console.log(files);
			//上传前，对上传的情况做以下多个判断，保证合法性，可自行删改
			if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
				weui.alert('请上传图片');
				return false;
			}
			if (this.size > 5 * 1024 * 1024) {
				weui.alert('请上传不超过5M的图片');
				return false;
			}
			if (files.length > 1) {
				//防止一下子选中过多文件
				weui.alert('最多只能上传1张图片，请重新选择');
				return false;
			}
			if ($("#unifiedSocialCreditCodeFile li").length >= 1) {
				weui.alert('最多只能上传1张图片');
				return false;
			}
		},
		onQueued: function onQueued() {
			// uploadList.push(this);
			//手动上传，如果不想选择完图片自动上传可以通过此方法改为手动不过上面的auto要改为false
			/*var self = this;
			$('#preview_confirm').on('click',function(){
			    self.upload();
			});*/
		},
		onBeforeSend: function onBeforeSend(data, headers) {
			$("#submit_order").addClass("weui-btn_disabled");
			//return false; //阻止文件上传
		},
		onProgress: function onProgress(procent) {
			//console.log(this, procent);
		},
		onSuccess: function onSuccess(ret) {
			if (ret.code == 0) {
				const newUrl = replaceImgUrl(ret.url);
				localStorage.setItem("unifiedSocialCreditCodeFile", newUrl);
				$.get('http://localhost/api/ocr/businessLicense?image=' + newUrl).then(res => {
					if (res.code == '500') {
						localStorage.setItem("bizLicenseStatus", 0);
						weui.dialog({
							title: '营业执照系统审核失败提醒：',
							content: '您上传的材料可能存在模糊、信息不匹配等情况导致系统自动审核失败。请选择继续填写表单等待人工审核，或者重新上传照片。',
							className: 'custom-classname',
							buttons: [{
								label: '继续提交',
								type: 'default',
								onClick: function() {}
							}, {
								label: '重新上传',
								type: 'primary',
								onClick: function() {}
							}]
						});

					} else {
						console.log(res);
						var data = JSON.parse(res.msg);
						console.log(data);
						console.log(data.name)
						$("input[name='companyName']").val(data.name);
						$("input[name='companyAddress']").val(data.address);
						localStorage.setItem("unifiedSocialCreditCode", data.reg_num);
						localStorage.setItem("businessScope", data.business)
						//判断是否已经上传法人身份证
						var legalIdCardFront = localStorage.getItem("legalIdCardFront");
						var unifiedSocialCreditCode = localStorage.getItem(
							"unifiedSocialCreditCode");
						console.log(legalIdCardFront);
						if (legalIdCardFront) {
							// todo 查询是否三证合一
							$.get('http://localhost/api/tenant/certification/verifyCompany?companyName=' +
									$("input[name='companyName']").val() +
									'&creditCode=' +
									unifiedSocialCreditCode +
									'&legalPersonName=' +
									$("input[name='legalPersonName']").val()
								)
								.then(res => {
									console.log(res);
									if (res.code == 0) {
										localStorage.setItem("bizLicenseStatus", 1);
									} else {
										localStorage.setItem("bizLicenseStatus", 0);
										weui.dialog({
											title: '营业执照系统审核失败提醒：',
											content: '您上传的材料可能存在模糊、信息不匹配等情况导致系统自动审核失败。请选择继续填写表单等待人工审核，或者重新上传照片。',
											className: 'custom-classname',
											buttons: [{
												label: '继续提交',
												type: 'default',
												onClick: function() {}
											}, {
												label: '重新上传',
												type: 'primary',
												onClick: function() {}
											}]
										});
									}
								});
						}
					}
				});
			}
			var uploadID = this.id;
			$("#unifiedSocialCreditCodeFile li").each(function() {
				if ($(this).attr("data-id") == uploadID) {
					$(this).attr("DB-id", ret.DBId); //图片后台对应的唯一编号
					$(this).attr("url", ret.url); //图片存放地址
				}
			});
			//console.log(this, ret);
		},
		onError: function onError(err) {
			console.log(this, err);
		}
	});

	weui.uploader('#uploaderTwo', {
		url: 'https://4001.cn/api/common/upload', //你要上传的url地址
		auto: true,
		type: 'file',
		fileVal: 'file', //文件上传域的name，后台通过该name拿到传输的文件
		compress: {
			width: 1600,
			height: 1600,
			quality: .8
		},
		onBeforeQueued: function onBeforeQueued(files) {
			console.log(files);
			//上传前，对上传的情况做以下多个判断，保证合法性，可自行删改
			if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
				weui.alert('请上传图片');
				return false;
			}
			if (this.size > 5 * 1024 * 1024) {
				weui.alert('请上传不超过5M的图片');
				return false;
			}
			if (files.length > 1) {
				//防止一下子选中过多文件
				weui.alert('最多只能上传1张图片，请重新选择');
				return false;
			}
			if ($("#legalIdCardFront li").length >= 1) {
				weui.alert('最多只能上传1张图片');
				return false;
			}
		},
		onQueued: function onQueued() {
			// uploadList.push(this);
			//手动上传，如果不想选择完图片自动上传可以通过此方法改为手动不过上面的auto要改为false
			/*var self = this;
			$('#preview_confirm').on('click',function(){
			    self.upload();
			});*/
		},
		onBeforeSend: function onBeforeSend(data, headers) {
			$("#submit_order").addClass("weui-btn_disabled");
			//return false; //阻止文件上传
		},
		onProgress: function onProgress(procent) {
			//console.log(this, procent);
		},
		onSuccess: function onSuccess(ret) {
			if (ret.code == 0) {
				const newUrl = replaceImgUrl(ret.url);
				localStorage.setItem("legalIdCardFront", newUrl);
				$.get('http://localhost/api/ocr/idCard?image=' + newUrl).then(res => {
					const data = JSON.parse(res);
					$("input[name='legalPersonName']").val(data.name);
					$("input[name='legalIdCardNo']").val(data.num);
					console.log(data);
					var unifiedSocialCreditCodeFile = localStorage.getItem(
						"unifiedSocialCreditCodeFile");
					var unifiedSocialCreditCode = localStorage.getItem(
						"unifiedSocialCreditCode");
					//检测是否已经上传营业执照
					if (unifiedSocialCreditCodeFile) {
						//查询是否三证合一
						$.get('http://localhost/api/tenant/certification/verifyCompany?companyName=' +
								$("input[name='companyName']").val() +
								'&creditCode=' +
								unifiedSocialCreditCode +
								'&legalPersonName=' +
								$("input[name='legalPersonName']").val()
							)
							.then(res => {
								if (res.code == 0) {
									localStorage.setItem("bizLicenseStatus", 1);
								} else {
									localStorage.setItem("bizLicenseStatus", 0);
									weui.dialog({
										title: '营业执照系统审核失败提醒：',
										content: '您上传的材料可能存在模糊、信息不匹配等情况导致系统自动审核失败。请选择继续填写表单等待人工审核，或者重新上传照片。',
										className: 'custom-classname',
										buttons: [{
											label: '继续提交',
											type: 'default',
											onClick: function() {}
										}, {
											label: '重新上传',
											type: 'primary',
											onClick: function() {}
										}]
									});
								}
							});
					}
				});
			}
			var uploadID = this.id;
			$("#legalIdCardFront li").each(function() {
				if ($(this).attr("data-id") == uploadID) {
					$(this).attr("DB-id", ret.DBId); //图片后台对应的唯一编号
					$(this).attr("url", ret.url); //图片存放地址
				}
			});
			//console.log(this, ret);
		},
		onError: function onError(err) {
			console.log(this, err);
		},

	});

	weui.uploader('#uploaderThree', {
		url: 'https://4001.cn/api/common/upload', //你要上传的url地址
		auto: true,
		type: 'file',
		fileVal: 'file', //文件上传域的name，后台通过该name拿到传输的文件
		compress: {
			width: 1600,
			height: 1600,
			quality: .8
		},
		onBeforeQueued: function onBeforeQueued(files) {
			console.log(files);
			//上传前，对上传的情况做以下多个判断，保证合法性，可自行删改
			if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
				weui.alert('请上传图片');
				return false;
			}
			if (this.size > 5 * 1024 * 1024) {
				weui.alert('请上传不超过5M的图片');
				return false;
			}
			if (files.length > 1) {
				//防止一下子选中过多文件
				weui.alert('最多只能上传1张图片，请重新选择');
				return false;
			}
			if ($("#legalIdCardBack li").length >= 1) {
				weui.alert('最多只能上传1张图片');
				return false;
			}
		},
		onQueued: function onQueued() {
			// uploadList.push(this);
			//手动上传，如果不想选择完图片自动上传可以通过此方法改为手动不过上面的auto要改为false
			/*var self = this;
			$('#preview_confirm').on('click',function(){
			    self.upload();
			});*/
		},
		onBeforeSend: function onBeforeSend(data, headers) {
			$("#submit_order").addClass("weui-btn_disabled");
			//return false; //阻止文件上传
		},
		onProgress: function onProgress(procent) {
			//console.log(this, procent);
		},
		onSuccess: function onSuccess(ret) {
			console.log(ret);
			if (ret.code == 0) {
				const newUrl = replaceImgUrl(ret.url);
				localStorage.setItem("legalIdCardBack", newUrl);
			}
			var uploadID = this.id;
			$("#legalIdCardBack li").each(function() {
				if ($(this).attr("data-id") == uploadID) {
					$(this).attr("DB-id", ret.DBId); //图片后台对应的唯一编号
					$(this).attr("url", ret.url); //图片存放地址
				}
			});
			//console.log(this, ret);
		},
		onError: function onError(err) {
			console.log(this, err);
		}
	});

	$(document).on("click", "#oneNext", function() {
		var companyName = $("input[name='companyName']").val();
		var legalPersonName = $("input[name='legalPersonName']").val();
		var legalIdCardNo = $("input[name='legalIdCardNo']").val();
		var legalPersonMobile = $("input[name='legalPersonMobile']").val();
		var legalPersonMail = $("input[name='legalPersonMail']").val();
		var numberUsage = $("input[name='numberUsage']").val();
		var companyAddress = $("input[name='companyAddress']").val();

		localStorage.setItem("companyName", companyName);
		localStorage.setItem("legalPersonName", legalPersonName);
		localStorage.setItem("legalIdCardNo", legalIdCardNo);
		localStorage.setItem("legalPersonMobile", legalPersonMobile);
		localStorage.setItem("legalPersonMail", legalPersonMail);
		localStorage.setItem("numberUsage", numberUsage);
		localStorage.setItem("companyAddress", companyAddress);

		if (!companyName || companyName === "") {
			weui.topTips("请填写有效的公司名称", 5000);
			return;
		}

		if (!legalPersonName || legalPersonName === "") {
			weui.topTips("请填写有效的法人名称", 5000);
			return;
		}

		if (!legalIdCardNo || legalIdCardNo === "") {
			weui.topTips("请填写有效的证件号码", 5000);
			return;
		}

		if (!legalPersonMobile || legalPersonMobile === "") {
			weui.topTips("请填写有效的法人手机号", 5000);
			return;
		}

		if (!legalPersonMail || legalPersonMail === "") {
			weui.topTips("请填写有效的邮箱", 5000);
			return;
		}

		if (!numberUsage || numberUsage === "") {
			weui.topTips("请填写有效的号码用途", 5000);
			return;
		}

		if (!companyAddress || companyAddress === "") {
			weui.topTips("请填写有效的联系地址", 5000);
			return;
		}

		document.getElementById("s0").style.display="none";
		document.getElementById("s1").style.display="block";
	});
});

/* *
 * 缩略图预览
 * */
document.querySelector('#unifiedSocialCreditCodeFile').addEventListener('click', function(e) {
	console.log(e);
	var target = e.target;

	while (!target.classList.contains('weui-uploader__file') && target) {
		target = target.parentNode;
	}
	if (!target) return;

	//从图片对应的li标签中获得所需属性
	var oldUrl = target.getAttribute('url');
	var url = replaceImgUrl(oldUrl); //图片存放地址
	var DBId = target.getAttribute('db-id'); //图片唯一编号
	var id = target.getAttribute('data-id'); //点击图片对应的id

	var gallery = weui.gallery(url, {
		className: 'custom-name',
		onDelete: function() {
			//删除图片的回调
			var isDelete = confirm('确定删除该图片？');
			console.log(isDelete);
			if (isDelete) {
				target.remove();
				gallery.hide();
			}
		}
	});
});

document.querySelector('#legalIdCardFront').addEventListener('click', function(e) {
	console.log(e);
	var target = e.target;

	while (!target.classList.contains('weui-uploader__file') && target) {
		target = target.parentNode;
	}
	if (!target) return;

	//从图片对应的li标签中获得所需属性
	var oldUrl = target.getAttribute('url');
	var url = oldUrl.replace('http://4001.cn', 'https://4001.cn/api'); //图片存放地址
	var DBId = target.getAttribute('db-id'); //图片唯一编号
	var id = target.getAttribute('data-id'); //点击图片对应的id

	var gallery = weui.gallery(url, {
		className: 'custom-name',
		onDelete: function() {
			//删除图片的回调
			var isDelete = confirm('确定删除该图片？');
			console.log(isDelete);
			if (isDelete) {
				target.remove();
				gallery.hide();
			}
		}
	});
});

document.querySelector('#legalIdCardBack').addEventListener('click', function(e) {
	var target = e.target;

	while (!target.classList.contains('weui-uploader__file') && target) {
		target = target.parentNode;
	}
	if (!target) return;

	//从图片对应的li标签中获得所需属性
	var oldUrl = target.getAttribute('url');
	var url = oldUrl.replace('http://4001.cn', 'https://4001.cn/api'); //图片存放地址
	var DBId = target.getAttribute('db-id'); //图片唯一编号
	var id = target.getAttribute('data-id'); //点击图片对应的id

	var gallery = weui.gallery(url, {
		className: 'custom-name',
		onDelete: function() {
			//删除图片的回调
			var isDelete = confirm('确定删除该图片？');
			console.log(isDelete);
			if (isDelete) {
				target.remove();
				gallery.hide();
			}
		}
	});
});

function replaceImgUrl(url) {
	return url.replace('http://4001.cn', 'https://4001.cn/api');
}
