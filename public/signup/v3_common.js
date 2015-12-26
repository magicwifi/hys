$(function(){
	//浮动窗
$(".Kefu-fiexd li").hover(function(){
		$(this).addClass("cur");}
		,function(){
		$(this).removeClass("cur");
		
	});

	$(window).on("scroll",
		function() {
   		 	$(this).scrollTop() >= 500 && $("#gotop").fadeIn(600),
    		$(this).scrollTop() < 490 && $("#gotop").fadeOut(1000)
		});

	$(window).on("scroll",
		function() {
   		 	$(this).scrollTop() >= 66 && $(".hd_nav").addClass('hd_nav_fix'),
    		$(this).scrollTop() < 60 && $(".hd_nav").removeClass('hd_nav_fix')
		});

  		$("#gotop").click(function() {
            $("html,body").animate({
                scrollTop: 0
            },500)
       	 })
//选城市

		$(".change_city").click(function() {
		 		$(this).find('.city_list_top').show();
				$(this).addClass('dowm_car');
		 	});	
		$(".city_list_top").hover(function() {
			$(this).show();
			//$(".change_city").removeClass('dowm_car');
			},function(){
			$(this).hide();
			$(".change_city").removeClass('dowm_car');
		});

		$(".con_dl dd a").click(function(){
			$(".city_list_top").hide();
			$(".change_city").removeClass('dowm_car');
		});

	

//



	
	//搜索
	$("#btn_search").on('click', function() {
		var search_key = $('#search_key').val();
		if(search_key=='') return false;
		location.href = 'http://www.91160.com/main/search/search_key-'+search_key+'/serch_type-'+serch_type+'.html';		
	});

	$('input[placeholder], textarea[placeholder]').on('focus',function(){
		$(this).attr('placeholder','');
	});

	$('._login_div_tips_').on('click', '._login_tips_', function(e) {
		var _login_call_href = $(this).hasClass('_nolink_')?'':$(this).attr('href');
		//验证码开始隐藏，输错3次显示
		if($('.errnum').val()<3){
			$('#showCode').hide();
		}else{
			$('#showCode').show();
		}
		if(!$("#_jy_show_usrname_").text()){
			$('#_login_tipsid_').length && _alert($('#_login_tipsid_').html(),{id:'_login_tips_id_',time:777,title:'登录'},function(){
				var _ny_login_state = 1;
				var _nyusername = $('#_nyusername');
				var _nypassword = $('#_nypassword');
				var _nycheckcode = $('#_nycheckcode');
				var _sub_login = $('#_nysub_login');
				var _c_nyname = $.cookieHelper('login_username');

				if(_c_nyname!=null)_nyusername.val(_c_nyname);

				_nyusername.on('click',function(){
					$(this).select();
				});

				_nyusername.on('blur', function(){
					_validateCom(_nyusername);
				});

//				_nypassword.on('blur', function(){
//					_validateCom(_nypassword);
//				});

				_nycheckcode.on('blur', function(){
					_validateCom(_nycheckcode);
				});

				_nycheckcode.on('keydown', function(event){
					var evt = window.event || event;
					if (evt.keyCode == 13){
						_sub_login.click();return false;
					}
				});

				$('._change_code').on('click',function(){
					$('img._change_code').attr('src',JYUrl('Images','code',{'h':25,'w':70,'i':'dologin'})+'?'+Math.random());
					return false;
				});

				_sub_login.on('click',function(){
					if(_validateCom(_nyusername)
					&& _ny_login_state
					&& _validateCom(_nypassword)
					&& ($('#showCode').is(':visible') == false ? true : _validateCom(_nycheckcode))){
						var t = $(this);
						if(t.css('cursor')== 'wait'){
							return false;
						}else{
							t.css('cursor','wait');
						}

						var realLength = 0, str = _nypassword.val(), len = str.length, charCode = -1;
					    for (var i = 0; i < len; i++) {
					        charCode = str.charCodeAt(i);
					        if (charCode >= 0 && charCode <= 128) realLength += 1;
					        else realLength += 2;
					    }

					    if(realLength < 32){
					    	var mw = encMe('JY91160',_nypassword.val());
					    	_nypassword.val(mw);
					    }

						$.ajax({
							url : JYUrl('user', 'alogin'),
							type:'post',
							dataType : 'json',
							data: {
								username:_nyusername.val(),
								password:_nypassword.val(),
								checkcode:_nycheckcode.val()
							},
							success : function(json){
								if(json.code == 1){
									if(_login_call_href){
										location.href = _login_call_href;
									}else{
										setLogin('_status_login_div','_status_logout_div',json.data);
										$('._change_code').click();
										location.href = JYUrl('account','order');
									}
									art.dialog({id:'_login_tips_id_'}).close();
								}else{
									if(json.error_num >=3){
										$('#showCode').show();
										$('.errnum').val(json.error_num);
									}
									if(json.code==-7)$('._change_code').click();
									dialogMsg(json.msg,1);
								}
								t.css('cursor','pointer');
							}
						});
					}
					return false;
				});
			});
		}else{
			if(_login_call_href){
				location.href = _login_call_href;
			}else{
				_alert('已经登录，请尝试刷新页面');
			}
		}
		return false;
	});
	//新版头部js
    $("#city_choose #city_now").click(function(){
		$(this).parent().addClass("city_choose_on");
	});

	$("#closeCity").click(function(){
		$("#city_choose").removeClass("city_choose_on");
	});
	$("#city_choose").mouseleave(function(){
		$("#city_choose").removeClass("city_choose_on");
	});
    $("#userTop").hover(function(){
		var w=$(this).width();
		$(this).addClass("user_div_on");
		//$(this).width(w);
	},function(){
		$(this).removeClass("user_div_on");
	});

	$("#close_n").click(function(){
		$("#notice").remove();
		// hd_nav是否是fixed (header是否有hd_nav_fixed)
		if($("header").hasClass("hd_nav_fixed")){
			$("#headerWrap").addClass("header_no");
		}
	});

});

//@jyurl
function JYUrl(cName,aName,args, domain){	
    var hostName = domain || location.hostname;
    var sUrl = "http://"+hostName+":"+location.port+"/"+cName+"/"+aName;
    if(args!=undefined){
            for(k in args){
                    sUrl += "/"+k+"-"+args[k];
            }
    }	
    return (sUrl+".html").toLowerCase();
}

/*互动样式 文字提示*/
function showMsg(id, msg, num){
	$('#'+id+'_msg').html(msg);
	switch(num){
		case 1:
			$('#'+id+'_msg').removeClass();
			$('#'+id+'_msg').addClass('wrong');
			break;
		case 2:
			$('#'+id+'_msg').removeClass();
			$('#'+id+'_msg').addClass('warning');
			break;
		case 3:
			$('#'+id+'_msg').removeClass();
			$('#'+id+'_msg').addClass('fine');
			break;
		case 7:
			if(msg!='&nbsp;' && msg!='')$('#'+id+'_msg').css('display','');
			break;
		default:
			$('#'+id+'_msg').removeClass();
			$('#'+id+'_msg').addClass('import');
	}
}

function dialogMsg(msg, style)
{
	var showId = $('#_dialogMsg');
	switch(style){
		case 1:
			showId.removeClass().addClass('wrong').show().html(msg);
			break;
		case 2:
			showId.removeClass().addClass('warning').show().html(msg);
			break;
		case 3:
			showId.hide();
			break;
	}
}

//@loadding
function _loadding(content){
	content = content || '正在加载中，请稍后...';
	_alert('<i class="icon-loading_small"></i>' +content, {id:'777',time:777});
}
//@alert
function _alert(content, o, fun){
	var o = o || {};
	var type = typeof(fun)=='function'?true:'';
	var content = content || '<i class="icon-loading_small"></i>';

	if(type){
		o.time  = 777;
		o.title = o.title?o.title:'提示';
		content+= '<p class="mt16 tc">';
		if(o.verify)
			content+= '<a class="btn btn_large btn_primary _tips_btn_green">'+(isNaN(o.verify)?o.verify:'确  定')+'</a> ';

		if(o.cancel)
			content+= '<a class="_tips_btn_cancel">取  消</a>';
		content+= '</p>';
	}

	var loadding_html = '<div id="open-dlg-tip" class="'+(o.css?o.css:'tip')+'">' +content+ '</div>';
	art.dialog({
		title:(o.title || ''),
		time:(o.time || 3),
		width:(o.width || 400),
		content:loadding_html,
		lock:true,
		drag:false,
		id:(o.id || '_tips_id_v2_'),
		opacity:0.4,
		padding:(o.padding || '0 20px 20px'),
		init: function(){
			if(art.dialog({id: '777'}))art.dialog({id: '777'}).close();
		 	if(!o.title)$('.aui_titleBar').find('a.aui_close').hide();

			if(type){
				if(o.verify){
					$('._tips_btn_green').on('click',function(){
						if($(this).css('cursor') == 'wait'){
							return false;
						}else{
							$(this).css('cursor','wait');
						}
						fun();
					});
				}else{
					fun();
				}

				o.cancel && $('._tips_btn_cancel').on('click',function(){
					art.dialog({id: (o.id || '_tips_id_v2_')}).close();
				});
			}
		}
	});
}
//@callTime
function callTime(){
	var _thistime = new Date();
	var vtime = _thistime.getHours();
	if(vtime > 6 && vtime <= 10){
		return '早上好';
	}else if(vtime > 18 && vtime <= 23){
		return '晚上好';
	}else if((vtime > 0 && vtime <= 6) || vtime > 23){
		return '好梦';
	}else{
		return '您好';
	}
}

//@validate
function _validateCom(o, arge){
	var arge = arge || {};
	var objid = o.attr('id');
	var truenamereg = /^[\u4E00-\u9FA5]{2,6}$|^[A-Za-z]{2,18}$/;
	var passwdreg = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z\W]{8,20}$/;
	var birthreg = /^\d{4}-\d{1,2}-\d{1,2}$/;
	var phonereg = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57])[0-9]{8}$/;
	var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9_]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	var contactreg = /(^(\d{3,4}-)?\d{7,8})$|((\(\d{3}\))|(\d{3}\-))?1[3-8][0-9]\d{8}?$|15[89]\d{8}$/; //联系方式，包括手机、 固话
	var numreg = /^[0-9]*[1-9][0-9]*$/;　　//正整数
	switch(o.attr('id')){
		//@浮动登录
		case '_nyusername' :
			if(!o.val()){
				dialogMsg('请输入手机号码或电子邮箱',1);
			}else{
				var type = 'phone';
				var userBool = true;
				var phonereg = /^((\(\d{3}\))|(\d{3}\-))?1[3-8][0-9]\d{8}?$|15[89]\d{8}$/;
				if(phonereg.test($(o).val())){
					$.ajax({
						url:JYUrl('user','checkpwd',{type:type,username:$(o).val()}),
						type:'post',
						dataType:'json',
						async:false,
						success:(function(de){
							_login_state = 1;
							if(de.code==1){
								userBool = false;
								_login_state = 0;
								dialogMsg("您的账号尚未激活<br /><span class='clr3'>如果您已通过电话或医院现场成功预约过，<br/>请<a href='"+JYUrl("user","activate")+"'>账号激活</a>完成相应步骤，即可登录。</span>", 1);
								$.cookieHelper('setpwd', [type,$(o).val()], {expires: 3600,path: '/', domain: $_ny_domain_});
							}else if(de.code < 0){
								userBool = false;
								_login_state = 0;
								dialogMsg(de.msg,1);
							}else{
								dialogMsg('&nbsp;',3);
							}
						})
					});
				}
				return userBool;
			}
			break;
		case '_nypassword':
			if(!o.val()){
				dialogMsg('请输入登录密码', 1);
			}else{
				dialogMsg('', 3);
				return true;
			}
			break;
		case '_nycheckcode':
			if(o.val().length!=4){
				dialogMsg('请输入有效的校验码，填入右边图片中的文字', 1);
			}else{
				dialogMsg('', 3);
				return true;
			}
			break;
	}
	return false;
}
//注册、第三方登录绑定、激活页面弹窗显示注册协议
function show_protocal(){
	art.dialog({
		title:'就医160网用户许可协议',
		id: 'open_protocal',
		content:$('#reg_protocal').html(),
		drag:false,
		resize:false,
		esc:false,
		lock:true
	});
}

//注册、第三方登录绑定、激活页面关闭弹出窗口
function close_protocal(){
	art.dialog({id:'open_protocal'}).close();
	$('#agree').attr('checked', true);
}

function showProCity(obj,area_id){
	obj.siblings().removeClass('cur');
	obj.addClass('cur');
	$.ajax({
		url : JYUrl('main', 'ajaxgetcitys'),
		type:'post',
		dataType : 'json',
		data: {
			areaid:area_id
		},
		success : function(json){
			if(json.code == 1){
				var html='';
				html+='<ul>';
				for(var k in json.citys){
					html+='<li><a href="http://'+json.citys[k].area_code+'.91160.com/">'+json.citys[k].area_name+'</a></li>';
				}
				html+='</ul>';
				$('#show_citys').html(html);
			}
		}
	});
}
