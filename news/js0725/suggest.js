/*
* by 主厨 20180712
* */
//判断是什么浏览器
window.AESKey = '';
// 判断浏览器是否支持placeholder属性
function isSupportPlaceholder() {
    var input = document.createElement('input');
    return 'placeholder' in input;
}
//判断是否是IE浏览器，包括Edge浏览器
function IEVersion() {
    //取得浏览器的userAgent字符串
    var userAgent = navigator.userAgent;
    //判断是否IE浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion < 10 || !isSupportPlaceholder()) {
            //alert("<10");
            $('#bigImg').remove();
        }
    }
}
    $(function () {
        IEVersion();
    });
//jquery 自定义扩展
(function ($) {
//    导航栏效果
    $.fn.extend({
        'crossNav': function (options) {
            var opts = $.extend( {},defaluts, options);
            return this.each(function () { //这里的this 指jquery 对象
                var $this = $(this);
                $this.on('mouseenter',function () {
                    $(this).children('.bg-block').stop().animate({
                        'top': 0
                    },'fast');
                });
                $this.on('mouseleave',function () {
                    $(this).children('.bg-block').stop().animate({
                        'top': 65 + 'px'
                    },'fast');
                })
            })
        }
    });
    //默认参数
    var defaluts = {};
})(jQuery);
$(function () {
//    导航栏效果
    $('.nav a').crossNav();
//图片上传
    var classificationType,// 反馈类型
         ComplaintType = "1", //投诉类型
         content = "", //详细问题描述
         pic1 = "", //图片参数
         pic2 = "", //图片参数
         pic3 = "", //图片参数
         number, //400号码
         name, //用户姓名
         mobilePhone, //用户手机号码
         picName1 = "",//文件名1
         picName2 = "",//文件名2
         picName3 = "",//文件名3
         fileName = [];
    $('select').on('change',function () {
         ComplaintType = $('select option:selected').attr('data-type');
    });
    function upToMaile(id) {
        var $this = $(id);
        var imgs = $('.pic img');
        var imgLength =  imgs.length;
        classificationType = $('.classification .active').attr('data-type');
        content = $this.siblings('._textarea').children('textarea').val();
        number = $this.siblings('.jubaoren').children("input[name='number']").val();
        name = $this.siblings('.jubaoren').children("input[name='name']").val();
        mobilePhone = $this.siblings('.jubaoren').children("input[name='mobilePhone']").val();
        if ( imgLength !== 0){
            var picS = [];
            for(var i = 0; i < imgLength; i++){
                picS[i] =  encodeURIComponent(imgs[i].src);
            }
            pic1 =  picS[0] || "";
            pic2 =  picS[1] || "";
            pic3 =  picS[2] || "";
            //console.log(picS);
        }
        var commonUrl = '//server.400.com/feedBack/feedBack';
        //normal url 'http://server.400.com/codeApi/commonapply400';
        // test url 'http://192.168.1.117:8012/codeApi/commonapply400'
        if ( content == "" || number == "" || name == "" || mobilePhone == ""){
            alert("请填写详细信息");
            return false;
        }else if(!(/^400[167890]\d{6}$/.test(number))){
            alert("输入正确的400号码");
            return false;
        }else if(!(/^1[345678]\d{9}$/.test(mobilePhone))){
            alert("输入正确的手机号码");
            return false;
        }else {
            //alert("验证正确");
            // location.replace(location.href);
            $.ajax({
                url: commonUrl,
                type: 'POST',
                dataType: "json",
                data: {
                    'type': classificationType,
                    'complaintType': ComplaintType,
                    'content': content,
                    'number':number,
                    'name': name,
                    'mobilePhone': mobilePhone,
                    'pic1': pic1 || '',
                    'pic2': pic2 || '',
                    'pic3': pic3 || '',
                    'picName1': picName1 || '',
                    'picName2': picName2 || '',
                    'picName3': picName3 || ''
                },
                jsonp: "callback",
                jsonpCallback: "handler",
                beforeSend:function () {
                    $('.load').show();
                    $('input').attr({ disabled: "disabled" });
                },
                success: function(data) {
                    console.log(data.result);
                    if( data.result == "true"){
                        $('.load').hide();
                        alert("感谢您的反馈！");
                        location.replace(location.href);
                    }else{
                        $('.load').hide();
                        alert("提交失败，请重新提交！");
                        location.replace(location.href);
                    }

                }
            })
        }
    };
    $('.classification .item').click(function () {
        var $index =  $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.Form').children('form').eq($index).show().siblings().hide();
    });
    var totals = 0;
    var getFileName = function (o){
        var pos=o.lastIndexOf( "\\" );
        return o.substring( pos+1 );
    };
    var files;
    var length;
    var openInput = function (inputId) {
        //为外面的盒子绑定一个点击事件
            /*1、先获取input标签 2、给input标签绑定change事件 3、把图片回显*/
//            1、先获取input标签
            var $input = $(inputId);
            var max_size = 2048000;
//            2、给input标签绑定change事件
            $input.on("change" , function(){
                files = this.files;
                console.log(files);
                files = Array.prototype.slice.call(files);
                //fileLists = fileLists.concat(files);
                if (files.length !== 0) {
                    for (var i = 0; i < files.length; i++) {
                        fileName[i] = files[i].name.split('.')[0];
                    }
                    picName1 =  fileName[0] || "";
                    picName2 =  fileName[1] || "";
                    picName3 =  fileName[2] || "";
                }
                length = files.length;
                totals += length;
                if( totals > 3 ){
                    totals -= length;
                    alert("最多上传3张图片");
                    return false;
                }
                //因为给input标签设置multiple属性，因此一次可以上传多个文件
                //获取选择图片的个数
                //3、回显
            $.each(files,function(key,value){
                if (this.size > max_size){
                    alert("文件大小不能超过2M!");
                    totals -= length;
                    return false;
                }
                //每次都只会遍历一个图片数据
                    var $div = $("<div class='pic'></div>"),
                        $img = $("<img>");
                    var fr = new FileReader();
                    fr.onload = function(){
                        $img.attr("src",this.result);
                        $div.append($img);
                        $('#bigImg').append($div);
                    };
                    fr.readAsDataURL(value);
                });
            });
            //4、我们把当前input标签的id属性remove
            $input.removeAttr("id");
            //我们做个标记，再class中再添加一个类名就叫test
            var newInput = '<input class="uploadImg test" type="file" readonlyunselectable="on" onfocus="this.blur()" name="file" multiple id="file" accept="image/png,image/gif,image/jpeg">';
            $('#uploadImgBtn').append($(newInput));
    };
    $('.bigImg').on('click','.pic', function() {
        var indx;
            indx = $(this).index() - 1;
        $('.pic').eq(indx).remove();
        //图片名字当前项删除,并且重新遍历赋值
        fileName.splice(indx,1);
        for (var i = 0; i < fileName.length; i++) {
            fileName[i] = files[i].name.split('.')[0];
        }
        picName1 =  fileName[0] || "";
        picName2 =  fileName[1] || "";
        picName3 =  fileName[2] || "";
        totals -= 1;
        files.splice(indx, 1);//修改fileLists
        console.log(files);
    });
    $("#uploadImgBtn").on('click',function(){
        openInput('#file');
    });
    $('#gojubao1').click(function () {
        upToMaile('#gojubao1');
    });
    $('#gojubao2').click(function () {
        upToMaile('#gojubao2');
    });
    $('#gojubao3').click(function () {
        upToMaile('#gojubao3');
    });
});

$(function () {
//    侧边表单
    (function () {
        var thisTxt,thatTxt;
        $('.form-box input').on('focus',function () {
            thisTxt = $(this).val();
            if(thisTxt === "您的称呼"){
                $(this).val("") ;
            }else if(thisTxt === "手机号"){
                $(this).val("") ;
            }else if(thisTxt === "验证码"){
                $(this).val("") ;
            }
        }).on('blur',function () {
            thatTxt = $(this).val();
            if(thatTxt === ""){
                $(this).val(thisTxt) ;
            }else if(thatTxt === ""){
                $(this).val(thisTxt) ;
            }else if(thisTxt === thatTxt){
                $(this).val(thisTxt) ;
            }
        });
        $("#code-vo-sub").on("click",function () {
            createCode($(this));
        });
        function createCode(id) {
            var code = "";
            var codeLength = 4; //验证码的长度
            var checkCode = $(id);
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
            for (var i = 0; i < codeLength; i++) {
                var charNum = Math.floor(Math.random() * 52);
                code += codeChars[charNum];
            }
            if (checkCode) {
                checkCode.html(code)
            }
        }
        createCode('.code-vo-sub');
        var commonUrl = '//server.400.com/codeApi/commonapply400';
//normal url 'http://server.400.com/codeApi/commonapply400';
// test url 'http://192.168.1.117:8012/codeApi/commonapply400'
        function validateCode(inputCode,code,phone,name,num,title) {
            $(".btn-vo-sub").attr("disabled", "disabled");
            if (name == "") {
                alert('请输入姓名');
                $(".btn-vo-sub").attr("disabled", false);
                return false;
            } else if (phone == "") {
                alert("请输入手机号码");
                $(".btn-vo-sub").attr("disabled", false);
                return false;
            } else if (!(/^1[345678]\d{9}$/.test(phone))) {
                //验证手机号码格式)
                alert("手机号码有误，请重填");
                $(".btn-vo-sub").attr("disabled", false);
                return false;
            } else if (inputCode.length <= 0) {
                alert("请输入验证码！");
                $(".btn-vo-sub").attr("disabled", false);
                return false;
            } else if (inputCode.toUpperCase() != code.toUpperCase()) {
                alert("验证码输入有误！");
                $(".btn-vo-sub").attr("disabled", false);
                createCode('code');
                return false;
            } else {
                $('.btn-vo-sub').attr("disabled","disabled");
                title = encodeURIComponent(title);
                $.ajax({
                    url: commonUrl,
                    type: 'GET',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    jsonpCallback: "handler",
                    data: {"phone": phone, "title": title, "username": name, "code": "1","preOccupationNum":num},
                    beforeSend: function(){
                        $(".btn-vo-sub").val("提交中，请稍后.....")
                    },
                    success: function (data) {
                        alert('提交成功');
                        $('.name-vo-sub').val('您的称呼');
                        $('.phone-vo-sub').val('手机号码');
                        $('.inputcode-vo-sub').val('验证码');
                        $(".btn-vo-sub").val("立即提交");
                        $('btn-vo-sub').attr("disabled", false);
                        // $('.layer').hide();
                        createCode('.code-vo-sub');
                    },
                    error: function () {
                        alert('提交失败');
                        $(".btn-vo-sub").val("立即提交");
                        createCode('.code-vo-sub');
                    }
                })
            }
        }
        $('.btn-vo-sub').click(function () {
            var $thisForm = $(this).parents('.form-box');
            var title = $thisForm.attr("data-title");
            var inputCode =  $thisForm.find('.inputcode-vo-sub').val();  //$('.inputcode-vo-sub').val();
            var code = $thisForm.find('.code-vo-sub').html();//$("#code-vo-sub").html();
            var phone =  $thisForm.find('.phone-vo-sub').val();//$('.phone-vo-sub').val();
            var name = $thisForm.find('.name-vo-sub').val();//$('.name-vo-sub').val();
            var num = "";
            validateCode(inputCode,code,phone,name,num,title);
        });
    })()
});
document.write('<script language="javascript" src="http://awt.zoosnet.net/JS/LsJS.aspx?siteid=AWT64471997&float=1&lng=cn"></script>');
$(".banner-kf,.kf,.choose .item .num-l div, .choose .item .num-r div").on('click',function () {
    openZoosUrl('chatwin'); return false;
});