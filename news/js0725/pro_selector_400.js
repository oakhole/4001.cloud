GET=urlGet()
// 产品查询条件 效果

// 查询条件
var pro_selector= {
	pagesize:48,
	pageid:1,
	type : GET['lx'],
	eps400 : GET['haoma'],	// :搜索号码 不确定 _
	epstype : GET['tp'],	// :号码类型
	fl : GET['fl'],			// :最低消费
	occupytype : GET['kt'],	// :开通时间 1=>1到2天开通，2=>15天
	initial : 1
}


// 选项更改
function pro_attr_edit(_key, _val){

	pro_selector[_key] = _val;
	pro_selector['page_no'] = 1;
}



// 按位查询
function pro_attr_edit_wei(_val){	
	pro_selector['eps400'] = _val;
	pro_selector['pageid'] = 1;
	pro_selector['epstype'] = "",
	pro_selector['fl'] = "",
	pro_selector['occupytype'] = "",
	pro_selector['initial'] = 1
}


// 删除属性
function pro_attr_del(_key){	
	// 删除选项的赋值
	delete pro_selector[_key];
	pro_selector['page_no'] = 1;
	$(".sl-wrap").find('div[data-key="'+ _key +'"]').find('li[data-val=""]').addClass('curr').siblings().removeClass('curr').find('i').remove();
}


// 更新数据
function set_data(_data, _dom)
{
	var _html='';
	for(var key in _data){
		if(_data[key].n4){
			_html += sprintf(js_dom['number'],
					{number_fg:number_fg(_data[key].eps400),
					 number:_data[key].eps400,
					 price:parseInt(_data[key].fl),
					 id:_data[key].type,
					 dg:""
					}
				);
		}
	}
	$("#number-list").empty().html(_html);
}

// ajax page
function ajax_pagination(num_entries)
{
	pageBlock("#page-block .page-wrap", pro_selector['pageid'], num_entries);
	pageBar("#page-bar .page-wrap", pro_selector['pageid'], num_entries);
	$(".page-wrap").removeClass('close-click');
}



/*--附加事件-----------------------------------------------------------------------------*/ 

$(function(){

	//初始参数 
	var i_add = 0;	// (判断是否 是点击选中，还是选择成功后 再次移动上去)

	// 添加修改选项值
	$(".valueList").on('click', 'li:not(.curr)', function(){

		var _key = $(this).closest('.valueList').data('key');
		var _val = $(this).data("val");
		var _txt = $(this).text();

		// tp
		if(_key == "epstype"){
			$(this).closest('.sl-wrap').siblings().each(function(){
				_this = $(this).find(".sl-value");
				if(_this.data("key") == "epstype"){

					$(".sl-wrap").find('div[data-key="'+ _key +'"]').find('li[data-val=""]').addClass('curr').siblings().removeClass('curr').find('i').remove();
				}
			});
		}
		

		if(_val+"" == ""){
			// clone区 联动 删除
			pro_attr_del(_key);
		}
		else{
			// 样式选中
			$(this).addClass('curr').siblings().removeClass('curr').find('i').remove();
			// 标记第一次 为移出是 添加删除按钮
			i_add = 1;
			// clone区 联动 添加或编辑
			pro_attr_edit(_key, _val);
		}

	});


	// 第一次 移出 添加删除按钮
	$(".valueList").on('mouseout', 'li.curr', function(){
		if(i_add){
			i_add = 0;
			$(this).append('<i class="del"></i>');
		}
	});
	// 删除选项值
	$(".valueList,.s-result").on('click', '.del', function(){

		var _key = $(this).closest('.valueList').data('key');
		pro_attr_del(_key);
	})


	// 按位搜索
	$("#search-wei").on("click", function(){
		var _val = "";
		$(this).closest(".number-txtbox-box").find('input[type="text"]').each(function(){
			var _num = $(this).val();
			_val += (_num == "") ? "_" : _num;
		});
		pro_attr_edit_wei(_val);
	});

	// 尾部查询
	$("#search-bufenhaoma").on("click", function(){
		var _val = "";
		var wb = $(this).closest(".number-txtbox-box").find('.m8 input[type="text"]').val();
		for(i=wb.length;i<6;i++){_val = _val + "_";}

		pro_attr_edit_wei(pro_selector['type']+_val+wb);
	});


	// 初始化
	$(".valueList li.curr").each(function(){

		var _val = $(this).data("val");
		if(_val+"" != ""){
			var _key = $(this).closest('.valueList').data('key');
			pro_selector[_key] = _val;
		}
	});
});


/*--显示方式转换-----------------------------------------------------------------------------*/ 


$(".block-row").on("click", "div", function(){
	$(this).addClass('selected').siblings().removeClass('selected');
	if($(this).hasClass("row")){
		$("#number-list").removeClass("num-list").addClass("num-list-row");
	}else{
		$("#number-list").removeClass("num-list-row").addClass("num-list");
	}
})





/*--翻页联动-----------------------------------------------------------------------------*/ 

// 附加事件

$(".page-wrap").on("click", "div", function()
{
	// 关闭状态 || 不可用 || 当前 || 点
	if($(this).closest(".page-wrap").hasClass('close-click') ||$(this).hasClass("disabled") || $(this).hasClass("active") || $(this).hasClass("dot") ){
		return false;
	}

	var p = pro_selector['pageid'];
	if($(this).hasClass("prev")){
		pro_selector['pageid'] = pro_selector['pageid']-1;		
	}
	if($(this).hasClass("next")){
		pro_selector['pageid'] = Number(pro_selector['pageid'])+1;		
	}
	if($(this).hasClass("item")){
		pro_selector['pageid'] = Number($(this).text() );
	}
	if(p != pro_selector['pageid'])
	{
		$(".page-wrap").addClass('close-click');
		$("html,body").animate({scrollTop:$(".l").offset().top},100);
	}
});

function pageBlock(obj, pageCurrent, pageCount){
	var _html = "";
	$(obj).empty();

	if(pageCount <=1 || pageCurrent > pageCount){
		return ;
	}

	// 向前
	if (pageCurrent > 1){
		_html += '<div class="prev"></div>';
	} 
	else {
		_html += '<div class="prev disabled"></div>'; 
	}


	_html += '<div class="pageNum"><span class="curr">'+ pageCurrent +'</span>/'+ pageCount +'</div>';


	if (pageCurrent < pageCount) {
		_html += '<div class="next"></div>';
	} else {
		_html += '<div class="next disabled"></div>';
	}

	$(obj).html(_html);
}

function pageBar(obj, pageCurrent, pageCount){
	var _html = "";
	$(obj).empty();

	if(pageCount <=1 || pageCurrent > pageCount){
		return ;
	}
	// 向上
	if (pageCurrent > 1){
		_html += '<div class="prev"></div>';
	}
	else {
		_html += '<div class="prev disabled"></div>'; 
	}

	// 第一页
	if (pageCurrent != 1 && pageCurrent >= 4 && pageCount != 4){
		_html += '<div class="item">1</div>';
	}

	// 点
	if (pageCurrent > 4 && pageCurrent <= pageCount && pageCount > 5) {
		_html += '<div class="dot">...</div>';
	}

	var start = pageCurrent - 2,
		end = Number(pageCurrent) +2;

	if ( (start > 1 && pageCurrent < 4) || pageCurrent == 1) {
		end++;
	}
	if (pageCurrent > pageCount - 4 && pageCurrent >= pageCount) {
		start--;
	}
	for (; start <= end; start++) {
		if (start <= pageCount && start >= 1) {
			if (start != pageCurrent) {
				_html += '<div class="item">' + start + '</div>';
			} else {
				_html += '<div class="active">' + start + '</div>';
			}
		}
	}

	if (pageCurrent + 2 < pageCount - 1 && pageCurrent >= 1 && pageCount > 5) {
		_html += '<div class="dot">...</div>';
	}

	if (pageCurrent != pageCount && pageCurrent < pageCount - 2 && pageCount != 4) {
		_html += '<div class="item">' + pageCount + '</div>';
	}
	if (pageCurrent < pageCount) {
		_html += '<div class="next"></div>';
	} else {
		_html += '<div class="next disabled"></div>';
	}

	$(obj).html(_html);
}



/*--基础函数-----------------------------------------------------------------------------*/ 


// 分割号码
function number_fg(_str)
{
	var tel_numear = _str.replace(/[^\d]/g, "");
	var maxlen = 10;
	if (tel_numear.length < maxlen){
		maxlen = tel_numear.length;
	}
	var temp = "";
	for (var i = 0; i < maxlen; i++){
		temp = temp + tel_numear.substring(i, i + 1);
		if ((i === 2 && maxlen >3) || (i === 5 && maxlen>6) ){
			temp = temp + " ";
		}
	}

	var arr = temp.split(" ");
	temp = "";
	for(var i=0;i<arr.length;i++){
		temp += '<span class="s'+i+'">'+arr[i]+'</span>';
	}
	return temp;
}