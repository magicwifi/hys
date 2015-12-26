/**********************
 * 就医160网用户注册
 * @author seven fanfan liwj
 * @version 3.1
 * @updated 2015-9-1
 *********************/
$(function() {
	// 验证中 by fanfan start
	//同意协议
    $(".agreement_btn_inp").click(function(){
    	$(".dialog").hide();
    	$(".all_li div").find(".checkbox").attr("checked","true");
    	$(".all_li div").find(".icon").addClass("icon_blu");
    });
    
    // 复选框勾选状态
    $(".all_li div").click(function(){
        if( $(this).find(".checkbox").attr("checked") ){ 
        	// 不选中时，显示默认灰色样式
        	$(this).find(".icon").removeClass("icon_blu");
        	$(this).find(".checkbox").removeAttr("checked");
        }
        else{  
        	// 选中时，添加绿色打钩样式
        	$(this).find(".icon").addClass("icon_blu");
        	$(this).find(".checkbox").attr("checked","true");
        }
    });
    
    //收不到短信弹窗
	$(".remark_r").click(function(){
		$(".dialoghelp").show();
	});
	
	//就医160网用户许可协议弹窗
	$(".all_a").click(function(){
		$(".dialogaree").show();
	});
	//关闭弹窗
	$(".cancel,.help_btn_inp").click(function(){
   		$(".dialog").hide();
    });

	// 单选框勾选状态
	$(".pd_radio_li").click(function(){
		$(this).siblings().find(".icon").removeClass("pd_radio_blu");
		$(this).find(".icon").addClass("pd_radio_blu");
		$("input[name='sex']").removeAttr("checked");
		$(this).find("input:radio").attr("checked",true);	
	});
	// 验证中 by fanfan end


	/*表单验证*/
	var _login_state = 1;
	var _phone = $('#_phone');
	var user_phonenum = $('#user_phonenum');
	var _authCode = $('#_authCode');
	var _password = $('#_password');
	var user_password = $('#user_password');
	var _truename = $('#_truename');
	var _myname = $('#_myname');
	var user_name = $('#user_name');
	var user_email = $('#user_email');
	var _sex = $('#_sex');
	var _surname = $('#_surname');
	var _card     = $('#_card');
	var _card_type = $('#_card_type');
	var _birthDay = $('#_birthDay');
	var _reg_user = $('input[name="regis-btn"]');
	var _perfect_info = $('input[name="perfect-btn"]');
	var _foreign_btn = $('input[name="foreign-btn"]');
	
	var _phone_bind = $('#_phone_bind');
	var _password_bind = $('#_password_bind');
	var _bind_btn = $('input[name="bind-btn"]');
	
	var _username = $('#_username');
	var _loginPass = $('#_loginPass');
	var _loginUser = $('input[name="loginUser"]');
	var _checkCode = $('#_checkimgcode_');
	var _error_num = $('input[name="error_num"]');
	//验证码
	$('._change_logincode').on('click',function(){
		$('img._change_logincode').attr('src',  '/Captcha.png?'+Math.random())
	});
	//出生日期
	$birthDate();
	$('select').change(function(){
		var sel_id = $(this).attr('id');
		var sel_text = $("#"+sel_id+" option:selected").text();
		if(sel_id=='_birthYear'){sel_text += "年"; }
		if(sel_id=='_birthMonth'){sel_text += "月"; }
		if(sel_id=='_birthDay'){sel_text += "日"; }
		$('#'+sel_id+'_select_value').html(sel_text);
	});
	
	var _c_nyname = null;//$.cookieHelper('login_username');

	if(_c_nyname!=null)_username.val(_c_nyname);

	_username.on('click',function(){
		$(this).select();
	});
	_phone.on('blur',function(){
		_validate(_phone);
	});
	user_phonenum.on('blur',function(){
		_validate(user_phonenum);
	});
	_authCode.on('blur',function(){
		_validate(_authCode);
	});
	_password.on('blur',function(){
		_validate(_password);
	});
	user_password.on('blur',function(){
		_validate(user_password);
	});
	_truename.on('blur',function(){
		_validate(_truename);
	});
	_myname.on('blur',function(){
		_validate(_myname);
	});
	user_name.on('blur',function(){
		_validate(user_name);
	});
	user_email.on('blur',function(){
		_validate(user_email);
	});
	_surname.on('blur',function(){
		_validate(_myname);
	});
	_card_type.change(function(){
		_card.val('');
		var $this = $(this);
	    var $option = $this.children('[value="' + $this.val() + '"]');
	    var selected = $option.val();
	    if('1' == selected){
	        $('.birthday').css('display','none');
		    $('.sex').css('display','none');
	    }else{
		      $('.birthday').css('display','block');
		      $('.sex').css('display','block');
	    }
	});
	/*if($.cookieHelper('autoLoginInfo')){
			$.ajax({
				url : JYUrl('autoLogin'),
				type:'get',
				dataType : 'json',
				success : function(res){					
					if(res.code==1){
						window.location= JYUrl('order');
					}
				}
			});
		
	}*/
	
	_card.on('blur',function(){
		_validate(_card);
	});
	_birthDay.on('blur',function(){
		_validate(_birthDay);
	});
	_card.on('keydown', function(event){
		var evt = window.event || event;
		if (evt.keyCode == 13){
			_reg_user.click();return false;
		}
	});
	_reg_user.on('click',function(){
		if(_validate(user_phonenum) 
	//	&& _validate(_authCode) 
		&& _validate(user_name) 
	//      && _validate(user_email) 
		&& _validate(user_password) 
//		&& _validate(_truename)
//		&& _validate(_card)
//		&& _validate(_birthDay)
		&& $('#agree').attr("checked")
//		&& $('.warning').length==0
		){
			$('#regform').submit();
		}else{
			//this.location = JYUrl("user","reg")+"#regform";
		}
		return false;
	});
	
	//完善资料，提交表单
	_perfect_info.on('click',function(){
		if(_validate(_truename) && _validate(_card)){
			$('#infoFrom').submit();
		}
		return false;
	});
	//外籍 完善资料，提交表单
	_foreign_btn.on('click',function(){
		if(_validate(_myname) 
		&& _validate(_card) 
		&& _validate(_birthDay) 
		&& _validate(_sex)
		){
			$('#foreignFrom').submit();
		}
		return false;
	});
	
	///*发送验证码*/
	var _get_authCode = $('#get_authCode');
	_get_authCode.length && _get_authCode.on('click',function(){
		if(!_validate(_phone)) return false;
		_get_authCode.attr('id','').val('59秒后可重发').addClass('is-disabled');
		$('.pi_remark').show();
		showMsg(_authCode.attr('id'), '', 4);
		$.ajax({
			//<i class="icon_new pi_tip_ok"></i>
			//校验码已发送至您的手机，请查收 
			url:JYUrl("user","registerSms"),
			type:'post',
			data:"phone="+_phone.val() + "&" + _hash_input_name+"="+_hash_input_value,
			async:false, 
			dataType:'json',
			success:(function(de){
				if(de.code==1){
					var first = setInterval(function(){
						var start = parseInt(_get_authCode.val().replace(/[^0-9]/ig,""));
						if(start<2){
							window.clearInterval(first);
							_get_authCode.attr('id','get_authCode').val('获取验证码').removeClass('is-disabled').removeAttr('disabled');
						}else{
							_get_authCode.attr({id:'',disabled:'disabled'}).val((start-1)+'秒后可重发').addClass('is-disabled');
						}
					},1000);
				}else{
					if(de.code==0){ 
						showMsg(_authCode.attr('id'), '<i class="icon jup"></i>'+de.msg, 2);
						$('.pi_remark').hide();
						//alert(de.msg);
					}
					if(de.code==-4){ alert(de.msg);}
					_get_authCode.attr('id','get_authCode').val('获取验证码').removeClass('is-disabled').removeAttr('disabled');
				}
			})
		});
		
	});
	
	
	//绑定验证
	_phone_bind.on('blur',function(){
		_validate(_phone_bind);
	});
	_password_bind.on('blur',function(){
		_validate(_password_bind);
	});
	_bind_btn.on('click',function(){
		if(_validate(_phone_bind) 
		&& _validate(_password_bind)){
			$('#bind_form').submit();
		}
	});
	
	//登录验证
	_username.on('blur',function(){
		_validate(_username);
	});
	_loginPass.on('blur',function(){
		_validate(_loginPass);
	});

	if(parseInt(_error_num.val())>=3)
	{
		_checkCode.on('blur',function(){
			_validate(_checkCode);
		});
		
		_checkCode.on('keydown', function(event){
			var evt = window.event || event;
			if (evt.keyCode == 13){
				_loginUser.click();return false;
			}
		});
		_loginUser.on('click',function(){
			if(_validate(_username)
					&& _login_state		
					&& _validate(_loginPass)
					&& _validate(_checkCode)){
				var realLength = 0, str = _loginPass.val(), len = str.length, charCode = -1;
				for (var i = 0; i < len; i++) {
					charCode = str.charCodeAt(i);
					if (charCode >= 0 && charCode <= 128) realLength += 1;
					else realLength += 2;
				}
				if(realLength < 32){
					var mw = encMe('JY91160',_loginPass.val());
					_loginPass.val(mw);
				}
				$('#loginFrom').submit();
			}
		});
	}else{
		_loginPass.on('keydown', function(event){
			var evt = window.event || event;
			if (evt.keyCode == 13){
				_loginUser.click();return false;
			}
		});
		_loginUser.on('click',function(){
			if(_validate(_username)
					&& _login_state		
					&& _validate(_loginPass)){
				var realLength = 0, str = _loginPass.val(), len = str.length, charCode = -1;
				for (var i = 0; i < len; i++) {
					charCode = str.charCodeAt(i);
					if (charCode >= 0 && charCode <= 128) realLength += 1;
					else realLength += 2;
				}
				if(realLength < 32){
					var mw = encMe('JY91160',_loginPass.val());
					_loginPass.val(mw);
				}
				$('#loginFrom').submit();
			}
		});		
	}
	
	
});

	
//表单验证
function _validate(o, arge){
	var arge = arge || {};
	var objid = o.attr('id');
        var accountreg = /^[a-zA-z][a-zA-Z0-9_]{2,18}$/;
	var truenameregch = /^[\u4E00-\u9FA5]{1,6}$/;
	var truenamereg = /^[\u4E00-\u9FA5]{2,6}$|^[A-Za-z]{2,18}$/;
	//var passwdreg = /^[0-9a-z~!@#$%^&*()_+:"|<>?;]{6,20}$/i; (([a-z]+[0-9]+)|([0-9]+[a-z]+))
	var passwdreg = /^[0-9a-z~!@#$%^&*()_+:"|<>?;]{6,20}$/i;
	var pwdreg	= /^[0-9a-z~!@#$%^&*()_+:"|<>?;]*(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*[0-9a-z~!@#$%^&*()_+:"|<>?;]*$/i;
	var authCodereg = /^\d{4,6}$/;//短信校验码
	var birthreg = /^\d{4}-\d{1,2}-\d{1,2}$/;
	var phonereg = /^0?(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/;
	var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9_]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	var contactreg = /(^(\d{3,4}-)?\d{7,8})$|((\(\d{3}\))|(\d{3}\-))?1[3-8][0-9]\d{8}?$|15[89]\d{8}$/; //联系方式，包括手机、 固话
	var numreg = /^[0-9]*[1-9][0-9]*$/;　　//正整数
	var IDCardreg = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/; //身份证
	var HMCardreg = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/; //港澳居民来往内地通行证号码验证正则
	var HZCardreg = /^(P\d{7}|G\d{7,8}|TH\d{7,8}|S\d{7,8}|A\d{7,8}|L\d{7,8}|\d{9}|D\d+|1[4,5]\d{7})|([A-Z]\d{6,10}(\(\w{1}\))?)$/; //护照验证正则
	//出错样式 打叉
	var msg_err = '<i class="icon jup"></i>';
	//提示样式 叹号
	var msg_tip = '<i class="icon_new pi_tip"></i>';
	//正确样式 打勾
	var msg_ok = '<i class="icon_new pi_tip_ok"></i>';
	var msg = '<span class="tips_in_word"><i class="add_icon"></i> 验证中</span>';
	//显示，加载验证中；
	showMsg(objid, msg, 2);
	switch(o.attr('id')){
		case '_username' :
			if(!$.trim(o.val())){
				showMsg(objid, msg_err+'请输入您的手机号码',1);
			}else if(!phonereg.test(o.val())){
				//$("#_phone").nextAll('.war_tip').show();
				//$(".tips_in_word").hide();
				showMsg(objid, msg_err+" 手机号码格式有误，请输入正确的手机号码",1);
			}else{
				
				var type = 'm';
				var userBool = true;
				var phonereg = /^((\(\d{3}\))|(\d{3}\-))?1[3-8][0-9]\d{8}?$|15[89]\d{8}$/;
				if(phonereg.test($(o).val())){
					$.ajax({
						url:JYUrl('check' ),
						data:{type:type,username:$(o).val() },
						type:'post',
						dataType:'json',
						async:false, 
						success:(function(de){
							_login_state = 1;
							//if(de.code==1){
							//	userBool = false;
							//	_login_state = 0;
							//	showMsg(objid, de.msg,1);
							//}else if(de.code < 0){
							if(de.code < 0){
								userBool = false;
								_login_state = 0;
								showMsg(objid, de.msg,1);
							}else{
								showMsg(objid, '&nbsp;',3);
							}
						})
					});
				}
				//用于对之前错误信息屏蔽
				showMsg(objid, "&nbsp", 3);
				return userBool;
			}
			break;
		case '_loginPass':
			if(!o.val()){
				showMsg(objid,msg_err+'请输入登录密码',1);
			}else{
				showMsg(objid, '');
				return true;
			}
			break;
		case '_checkimgcode_':
			if(o.val()==''){
				showMsg(objid, msg_err+"验证码不能为空",1);
			}else if(o.val().length !=4){
				showMsg(objid, msg_err+"请输入有效的校验码，填入右边图片中的文字",1);
			}else{
				showMsg(objid,'',3);
				return true;
			}
			break;
		case 'user_phonenum':
			if(!o.val()){
				showMsg(objid, msg_err+"手机号码不能为空",1);
			}else if(!phonereg.test(o.val())){
				//$("#_phone").nextAll('.war_tip').show();
				//$(".tips_in_word").hide();
				showMsg(objid, msg_err+" 手机号码格式有误，请输入正确的手机号码",1);
			}else{
					$.ajax({
						url:JYUrl('check','name'),
						data:{type:2,phonenum:$(o).val() },
						type:'post',
						dataType:'json',
						async:false, 
						success:(function(de){
							_login_state = 1;
							//if(de.code==1){
							//	userBool = false;
							//	_login_state = 0;
							//	showMsg(objid, de.msg,1);
							//}else if(de.code < 0){
							if(de.code < 0){
								userBool = false;
								_login_state = 0;
								showMsg(objid, de.msg,1);
                                                                return false;
							}else{
								showMsg(objid, '&nbsp;',3);
							}
						})
					});
				return true;
			}
			break;
		case '_phone':
			if(!o.val()){
				showMsg(objid, msg_err+"手机号码不能为空",1);
			}else if(!phonereg.test(o.val())){
				//$("#_phone").nextAll('.war_tip').show();
				//$(".tips_in_word").hide();
				showMsg(objid, msg_err+" 手机号码格式有误，请输入正确的手机号码",1);
			}else{
				var pCon = true;
				$.ajax({
					url: JYUrl('check'),
					type:'post',
					data:{username:$(o).val(), type:'m'},
					dataType:'json',
					async:false, 
					success:(function(de){
						if(de.code==1){
							//$("#_phone").nextAll('.war_tip').hide();
							//$("#_phone").nextAll('.war_tip').").addClass("selected");
							showMsg(objid, msg_ok, 3);
						}else if(de.code==-2){
							pCon = false;
							showMsg(objid, de.msg, 1);
						}else if(de.code==-1){
							pCon = false;
							showMsg(objid, msg_tip+"<span class='three'>您的账号尚未激活<br />如果您已通过电话或医院现场成功预约过，<br/>请<a href='"+JYUrl("user","activate")+"'>账号激活</a>完成相应步骤，即可登录。</span>", 1);
						}else if(de.code==0){
							pCon = false;
							//showMsg(objid, msg_err+"<span class='three'>您的账号尚未激活<br />如果您已通过电话或医院现场成功预约过，<br/>请<a href='"+JYUrl("user","activate")+"'>账号激活</a>完成相应步骤，即可登录。</span>", 1);
							showMsg(objid, msg_err+"<span class='three'>您的手机已被注册<br />如果您已注册，请<a href='"+JYUrl("login")+"'>登录</a>或<a href='"+JYUrl("find","forget")+"'>找回密码</a><br />如果您未注册，请<a href=\"javascript:void(0)\" id=\"unbindid\">解绑此手机</a></span>",1);
							//解绑手机号
							var _unbindid = $('#unbindid');
							_unbindid.click(function(){
								art.dialog({
									title:'手机解绑',
									content:$('#open-dlg-register').html(),
									drag: false,
									resize: false,
									esc:false,
									lock:true
								});
								var _unphone = $('#unphone');_unphone.val(o.val());
								var _getcode = $('#getcheckcode');
								var _unaction = $('#unaction');
								var _checkcode = $('#checkcode');
								_getcode.click(function(){
									var t = this;
									if(_validate(_unphone)){
										if(t.style.cursor == 'wait' || $(t).attr('id')==''){
											return false;
										}else{
											t.style.cursor = 'wait';
											$(t).removeClass('btn_get');
											$(t).addClass('btn_ms orange');
											$(t).val('发送中...');
											$('#unphone_msg').css('display','none');
										}
										$.ajax({
											url:JYUrl("user","unbindSms"),
											type:'post',
											data:{mobile:o.val()},
											dataType:'json',
											success:(function(de){
												if(de.code==1){
													$(t).attr('id','');
													$(t).val('(90秒后)可重发验证短信');
													var int = setInterval(function(){
														var start = parseInt($(t).val().replace(/[^0-9]/ig,""));
														if(start<1){
															window.clearInterval(int);
															$(t).attr('id','getcheckcode');
															$(t).removeClass('btn_ms orange');
															$(t).addClass('btn_get');
															$(t).val('获取验证码');
														}else{
															$(t).val('('+(start-1)+'秒后)可重发验证短信');
														}
													},1000);
												}else{
													alert(de.msg);
													$(t).attr('id','getcheckcode');
													$(t).removeClass('btn_ms orange');
													$(t).addClass('btn_get');
													$(t).val('获取验证码');
												}
												t.style.cursor = 'pointer';
											})
										});
									}
								});

								_unaction.click(function(){
									if(_validate(_unphone) && _validate(_checkcode)){
										var t = this;
										if(t.style.cursor == 'wait'){
											return false;
										}else{
											t.style.cursor = 'wait';
										}

										$.ajax({
											url:JYUrl("user","unbindMobile"),
											type:'post',
											data:{code:_checkcode.val(),mobile:_unphone.val()},
											dataType:'json',
											success:(function(de){
												if(de.code ==1){
													$('#unphone_msg').css('display','block').text(_unphone.val()+"解绑成功");
													close_arg();
													o.blur();
													return true;
												}else{
													$('#unphone_msg').css('display','block').text(de.msg);
													return false;
												}
											})
										});

										setTimeout(function(){
											t.style.cursor = 'pointer';
										},4000);
									}
								});
							});
							
						}
					})
				});
				return pCon;
			}
			break;
		//手机验证码	
		case '_authCode':
			if($(o).val()==''){
				showMsg(objid, msg_err+"验证码不能为空", 1);

			}else if(!authCodereg.exec($(o).val())){
				showMsg(objid, msg_err+"请输入正确的验证码", 1);
				$('.pi_remark').hide();
			}else{
				/*
				$.ajax({
					url:JYUrl("user","authCode"),
					type:'post',
					data:"phone="+$('#_phone').val() + "&authCode=" +$('#_authCode').val()+ "&" + _hash_input_name+"="+_hash_input_value,
					async:false, 
					dataType:'json',
					success:(function(de){
						if(de.code==1){
							showMsg(objid, msg_ok, 4);
							$('.pi_remark').hide();
							return true;
						}else{
							showMsg(objid, msg_err+"请输入正确的验证码", 1);
							return false;
						}
					})
				});
				*/
				showMsg(objid, '', 4);
				$('.pi_remark').show();
				return true;
			}
			break;
		
		//密码登陆
		case 'user_password':
			if(!$(o).val()){
				showMsg(objid, msg_err + "密码不能为空", 1);
			//}else if(!passwdreg.exec($(o).val()) && !pwdreg.exec($(o).val())){
			}else if(!passwdreg.exec($(o).val()) || !pwdreg.exec($(o).val())){
				showMsg(objid, msg_err + "请输入包含数字和字母的6-20位密码", 1);//密码长度只能在6-20位字符之间  请设置6-20位数字或者字母的密码    请输入6-20位数字或字母的密码||请输入包含数字和字母的6-20位密码
			}else{
				var strong = getPwdStrong($(o).val());
				var strongImg;
				if(strong <= 1) {
					strongImg = '<span class="passtreng weak"></span>';
				}else if(strong >=4) {
					strongImg = '<span class="passtreng strong"></span>';
				}else{
					strongImg = '<span class="passtreng mid"></span>';
				}
				//强>=4,2< 中 >3,弱<=1 
				showMsg(objid, msg_ok+strongImg, 3);
				return true;
			}
			
//			密码，基本 展示强弱
//			<span class="grade_sp">
//			安全级别：<i class="grade_icon weak_icon "></i>
//			        <i class="grade_icon weak_icon medium_icon no_blo"></i>
//			        <i class="grade_icon strong_icon no_blo"></i>&nbsp;&nbsp;<span class="strong_font">强</span>
//			        </span>
			break;
		case '_password':
			if(!$(o).val()){
				showMsg(objid, msg_err + "密码不能为空", 1);
			//}else if(!passwdreg.exec($(o).val()) && !pwdreg.exec($(o).val())){
			}else if(!passwdreg.exec($(o).val()) || !pwdreg.exec($(o).val())){
				showMsg(objid, msg_err + "请输入包含数字和字母的6-20位密码", 1);//密码长度只能在6-20位字符之间  请设置6-20位数字或者字母的密码    请输入6-20位数字或字母的密码||请输入包含数字和字母的6-20位密码
			}else{
				var strong = getPwdStrong($(o).val());
				var strongImg;
				if(strong <= 1) {
					strongImg = '<span class="passtreng weak"></span>';
				}else if(strong >=4) {
					strongImg = '<span class="passtreng strong"></span>';
				}else{
					strongImg = '<span class="passtreng mid"></span>';
				}
				//强>=4,2< 中 >3,弱<=1 
				showMsg(objid, msg_ok+strongImg, 3);
				return true;
			}
			
//			密码，基本 展示强弱
//			<span class="grade_sp">
//			安全级别：<i class="grade_icon weak_icon "></i>
//			        <i class="grade_icon weak_icon medium_icon no_blo"></i>
//			        <i class="grade_icon strong_icon no_blo"></i>&nbsp;&nbsp;<span class="strong_font">强</span>
//			        </span>
			break;
		case '_truename':
			if(!$(o).val()){
				showMsg(objid, msg_err+"真实姓名不能为空", 1);
			}else if(!truenameregch.exec($(o).val())){
				showMsg(objid, msg_err+"实名才能预约，请输入真实姓名", 1);
			}else{
				showMsg(objid, msg_ok, 3);
				return true;
			}
			break;
		case '_myname':
			if(!$(o).val() || !$('#_surname').val()){
				showMsg(objid, msg_err+"真实姓,名不能为空", 1);
			}else if(!truenamereg.exec($('#_surname').val()+$(o).val())){
				showMsg(objid, msg_err+"实名才能预约，请输入真实姓名", 1);
			}else{
				showMsg(objid, "&nbsp;", 3);
				return true;
			}
			break;
		case 'user_email':
			if(!$(o).val() ){
				showMsg(objid, msg_err+"邮箱不能为空", 1);
			//}else if(!emailreg.exec($(o).val()){
			//	showMsg(objid, msg_err+"邮箱格式不对", 1);
			}else if(!emailreg.exec($(o).val())){
				showMsg(objid, msg_err+"邮箱格式不对", 1);
			}else{
				showMsg(objid, "&nbsp;", 3);
				return true;
			}
			break;
		case 'user_name':
			if(!$(o).val() ){
				showMsg(objid, msg_err+"用户名,名不能为空", 1);
			}else if(!accountreg.exec($(o).val())){
				showMsg(objid, msg_err+"用户名首字符不能为数字，长度不能大于18个字符，字母和数字", 1);
			}else{
					$.ajax({
						url:JYUrl('check','name'),
						data:{type:1,username:$(o).val() },
						type:'post',
						dataType:'json',
						async:false, 
						success:(function(de){
							_login_state = 1;
							//if(de.code==1){
							//	userBool = false;
							//	_login_state = 0;
							//	showMsg(objid, de.msg,1);
							//}else if(de.code < 0){
							if(de.code < 0){
								userBool = false;
								_login_state = 0;
								showMsg(objid, de.msg,1);
                                                                return false;
							}else{
								showMsg(objid, '&nbsp;',3);
							}
						})
					});
				//showMsg(objid, "&nbsp;", 3);
				return true;
			}
			break;
		case '_sex':
			if($("input[name=sex]:checked").size() > 0){
				showMsg(objid, "&nbsp;", 3);
				return true;
			}
			showMsg(objid, msg_err+"请选择性别", 1);
			break;
			 
		case '_card':	
			if(!$(o).val()){
				if($('#_card_type').val()=='3') {
					showMsg(objid, msg_err+"证件号码不能为空", 1);
				}else{
					showMsg(objid, msg_err+"证件号码不能为空", 1);
				}
				
			}else if($('#_card_type').val()=='1' && !IdCardValidate(o.val())){
				showMsg(objid, msg_err+"请输入正确的身份证号码", 1);
				return false;
			}else if($('#_card_type').val()=='2' && !HMCardreg.test(o.val())){
				showMsg(objid, msg_err+"请输入正确的港澳居民身份证号码", 1);
				return false;
			}else if($('#_card_type').val()=='3' && !HZCardreg.test(o.val())){
				showMsg(objid, msg_err+"请输入正确的护照号码", 1);
				return false;
			}else{
				var booler = true;
				$.ajax({
					url: JYUrl('check'),
					type:'post',
					data:{username:$(o).val(),type:'i'},
					dataType:'json',
					async:false, 
					success:(function(de){
						if(de.code == -1){
							booler = false;
							//showMsg(objid, msg_err+"<span class='two'>您的证件已被注册<br />如果您在本站曾经注册过或已通过电话、医院现场成功预约过，请<a href='"+JYUrl("user","activate")+"'>账号激活</a>完成相应步骤即可登录。<br/><font color='#999999'>如非您本人注册，请和我们联系。</font></span>", 1);
							showMsg(objid, msg_err+'您的证件已被注册', 1);
							//showMsg("_truenameCard",'<i class="vi_shouj_o icon vi_war_img"></i><div class="vi_shouj_inp ">'
							//		+'<p class="vi_war_titl">尊敬的<span class="vi_green" id="">'+$('#_truename').val()+'</span>您好，您的证件已被注册，请核实您的个人信息</p>'
							//		+'<p class="vi_war_sid">您可能曾通过其它渠道使用过我们的服务</p>'
							//		+'<p class="vi_war_sid">请<a href="'+JYUrl("user","activate")+'">账号激活</a>完成相应步骤即可登录。<br/></p>'
							//		+'<p class="vi_war_sid"><font color="#999999">如非您本人注册，请和我们联系。</font></p></div>',7);
						}else if(de.code== 0){
                            //showMsg(objid, msg_err+"<span class='two'>您的证件已被注册<br />如果您已注册，请<a href='"+JYUrl("login")+"'>登陆</a>或<a href='"+JYUrl("find")+"'>找回密码</a><br /><font color='#999999'>如非您本人注册，请和我们联系。</font></span>", 1);
							//showMsg("_truenameCard",'<i class="vi_shouj_o icon vi_war_img"></i><div class="vi_shouj_inp ">'
							//		+'<p class="vi_war_titl">尊敬的<span class="vi_green" id="">'+$('#_truename').val()+'</span>您好，您的身份证账号已存在，请核实您的个人信息</p>'
							//		+'<p class="vi_war_sid">您可能曾通过其它渠道使用过我们的服务</p>'
							//		+'<p class="vi_war_sid">如果您的资料与您以前填写的信息一致，我们将激活您以前的账号，找回您以前的预约信息；</p>'
							//		+'<p class="vi_war_sid">如果填写不一致，我们将为您生成新账号。</p></div>',7);
							showMsg(objid, msg_err+'您的证件已被注册', 1);
							booler = false;
						}else if(de.code==-2){
							booler = false;
							showMsg(objid, de.msg, 1);
						}else if(de.code==1){
							//showMsg(objid, '&nbsp;', 3);<i class="icon pd_add_ok"></i>
							showMsg(objid, '<i class="icon pd_add_ok"></i>', 7);
						}
						
						
					})
				});
				
				//自动获取，设置 生日，性别 perfect-info 页面使用到
				if($('#_card_type').val()=='1') {
					var cardSex,cardBirday;
					//获取性别,并筛选中性别
					cardInfo = getIdCardInfo($(o).val(),2);
					$("input[name='sex']").removeAttr("checked");
					$(".pd_radio_li").find(".icon").removeClass("pd_radio_blu");
					$("input[name='sex'][value='"+cardInfo+"']").parent().find("input + i").addClass("pd_radio_blu");
					$("input[name='sex'][value='"+cardInfo+"']").attr("checked",true);
					
					cardBirthday = getIdCardInfo($(o).val(),1);
					$('#_birthDay').val(cardBirthday);
					
				}
				return booler;
			}
			break;
		case '_birthDay':	
			if( ($(o).val()=='0' || $('#_birthYear').val()=='0' || $('#_birthMonth').val()=='0') && $('#_card_type').val()=='3'){
				showMsg(objid, msg_err+"请选择正确的出生日期", 1);
			}else{
				showMsg(objid, "&nbsp;", 3);
				return true;
			}
			break;
		case '_phone_bind':	
			if(!o.val()){
				showMsg(objid, "手机号码不能为空",1);
			}else if(!phonereg.test(o.val())){
				showMsg(objid, "手机号码格式错误",1);
			}else{
				var type = 'phone';
				var userBool = true;
				var phonereg = /^((\(\d{3}\))|(\d{3}\-))?1[3-8][0-9]\d{8}?$|15[89]\d{8}$/;
				if(phonereg.test($(o).val())){
					$.ajax({
						url: JYUrl('check'),
						type:'post',
						data:{username:$(o).val(), type:'m'},
						dataType:'json',
						async:false, 
						success:(function(de){
							if(de.code==-1){
								userBool = false;
								showMsg(objid,"该手机号码已存在，尚未激活，<a href='"+JYUrl("user","activate")+"'>请点此激活</a>",2);
							}
						})
					});
				}
				return userBool;
			}
			break;
		case '_password_bind':
			if(!$(o).val()){
				showMsg(objid, "密码不能为空", 1);
			}else{
				showMsg(objid, "&nbsp;", 3);
				return true;
			}
			break;
		case 'unphone':
			if(!$(o).val() || !phonereg.test($(o).val())){
				showMsg(objid, msg_err+"手机号码错误", 7);
			}else{
				showMsg(objid, "&nbsp;", 7);
				return true;
			}
			break;
		case 'checkcode':
			if($(o).val()==''){
				showMsg('unphone', msg_tip+"验证码不能为空", 7);
			}else if($(o).val().length !=6){
				showMsg('unphone', msg_err+"请输入正确的验证码", 7);
			}else{
				showMsg('unphone', msg_ok, 7);
				return true;
			}
			break;
	}

	return false;
}

//日期联动
var $birthDate = function(y, m, d){
	var str="";
	var $dDate = new Date();
	var $birthDay = $("#_birthDay");
	var $birthMonth = $("#_birthMonth");
	var $birthYear = $("#_birthYear");
	var $dCurYear = $dDate.getFullYear();

	$birthYear.bind("change", function(){
		monCal($birthYear.val(),$birthMonth.val(), 0);
		dayCal($birthYear.val(),$birthMonth.val(), 0);
	});

	$birthMonth.bind("change", function(){
		dayCal($birthYear.val(),$birthMonth.val(), 0);
	});

	for(var i=$dCurYear;i>$dCurYear-121;i--){
		str="<option value="+i+">"+i+"</option>";
		$birthYear.append(str);
	}

	var monCal = function (iYear, iMonth, iDay){
		$birthMonth.empty();
		var str = iDay==0?"<option value=\"0\" selected=true>选择月</option>":'';
		for(var m=1;m<=12;m++){
			if(m==($dDate.getMonth()+2) && $birthYear.val()==$dCurYear)break;
			if(m < 10)m = '0'+m;
			str+="<option value="+m+" "+ ((iDay!=0 && iMonth==m)?"selected=true":"") +">"+m+"</option>";
		}
		$birthMonth.append(str);
	}

	var dayCal = function(iYear, iMonth, iDay){
		$birthDay.empty();
		var str = iDay==0?"<option value=\"0\" selected=true>选择日</option>":'';
		var daysInMonth = (new Date(iYear, iMonth, 0)).getDate();
		for (d = 1; d <= parseInt(daysInMonth); d++) {
			if(d==$dDate.getDate() && $birthYear.val()==$dCurYear && $birthMonth.val()==($dDate.getMonth()+1))break;
			if(d < 10)d = '0'+d;
			str+="<option value="+d+" "+ (iDay==d?"selected=true":"") +">"+d+"</option>";
		}
		$birthDay.append(str);
	};
	if(y && m && d){
		setTimeout(function(){
			$('#birthYear').val(y);
		});
		monCal(y, m, d);dayCal(y, m, d);
	}
};

/*互动样式 文字提示,登录专用*/
function showUserMsg(id, msg, num){
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
		case 4:
			$('#'+id+'_msg').removeClass();
			break;
		case 7:
			if(msg!='&nbsp;' && msg!='')$('#'+id+'_msg').css('display','');
			break;
		default:
			$('#'+id+'_msg').removeClass();
			$('#'+id+'_msg').addClass('import');
	}
}

function getIdCardInfo(card,type){
	var result;
	switch(type){
		//获取出生年月日
		case 1:
			result = card.substr(6, 4) + "-" + card.substr(10, 2) + "-" + card.substr(12, 2);
			break;
		case 2:
			//result = card.substr(14, 3)%2 ? '男':'女';
			result = card.substr(14, 3)%2 ? 0:1;
			break;
		default:
			//获取年龄
	        var myDate = new Date();
	        var month = myDate.getMonth() + 1;
	        var day = myDate.getDate();
	        var result = myDate.getFullYear() - card.substr(6, 4) - 1;
	        if (card.substr(10, 2) < month || card.substr(10, 2) == month && card.substr(12, 2) <= day) {
	        	result++;
	        }
			break;
	}
	return result;
}
/*
var t = ['验证通过!'];
t.push(n.substr(6, 4)+'年'+n.substr(10, 2)+'月'+n.substr(12, 2)+'日');
t.push(n.substr(14,3)%2?'男':'女');
show(ans, t.join(' | '));
改为
document.getElementById('bd1').value=n.substr(6, 4);
document.getElementById('bd2').value=n.substr(10, 2);
document.getElementById('bd3').value=n.substr(12, 2);
document.getElementById('sex').value=n.substr(14,3)%2?'男':'女';
*/
