//判断是否是简单密码
function isSimplePWD(pwd,username)
{/*{{{*/
	var flag1 = flag2 = 1;
    if(pwd.length < 6 || pwd.length>20) return 0;
	if(pwd == '121212' || pwd == '123456' || pwd == '1122' || pwd == '666888' || pwd == '888666' || pwd == username) return 1;
	var tmp = pwd.charAt(0);
	//判断是否是:1111111
	for(i = 1; i < pwd.length; i++){
		if(pwd.charAt(i) != tmp) {
			flag1 = 0;
			break;
			}
	}
	if(flag1 == 1) return 1;
	//判断是否是：1234567890 ,0987654321
	intercount = 0;
	for(i = 1; i < pwd.length; i++){
		inter = tmp - pwd.charAt(i);
		if(inter != -1 && inter != 1 && inter != 9 && inter != -9){
			break;
		}
		intercount += inter;
		tmp = pwd.charAt(i);
	}
	if(intercount == -1 * (pwd.length-1) || intercount == (pwd.length-1) )return 1;
	return 0;
}/*}}}*/

function checkemail(email)
{//{{{
    //var emailReg = /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
    //var emailReg = /^[A-Za-z\d]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
    var emailReg = /^[0-9a-z]+([-_.][a-z0-9]+)*@(([0-9a-z]+)[.]){1,2}[a-z]{2,5}$/i;
    if (!emailReg.test(email))
    {
        return false;
    }
    else
    {
        return true;
    }
}//}}}

function isMobile(mobile)
{/*{{{*/
    var myreg = /^(1[34578][0-9]{9})$/;
    if(!myreg.test(mobile))
    {
        return false;
    } else {
        return true;
    }
}/*}}}*/

function showCard()
{/*{{{*/
	var selOldPatientObj = document.getElementById('oldpatient');
	var oldPatientTrObj = document.getElementById('oldpatienttr');
	if(selOldPatientObj.checked)
	{
		oldPatientTrObj.style.display = "";
	}
	else
	{
		oldPatientTrObj.style.display = "none";
		document.memberform_reg.patientCardNO.value = "";
	}
}/*}}}*/

function showPasswordTip()
{/*{{{*/
    $('#showHarmContent').show();
    $('#harmContentclsoebtn').click(function(e){
            $(this).parent().hide();
            e.stopPropagation();
            })
}/*}}}*/

//左侧用户登录
function doLogin()
{/*{{{*/
    var formObj = document.getElementById('memberform_login');
    formObj.submit();
}/*}}}*/

function checkresult(msg, obj)
{/*{{{*/
    var o = $("#"+obj);
    if (o.length > 0)
    {
        o = o[0];
        if ('' == msg)
        {
            o.style.background='#EEEEEE';
            o.onblur=function(){this.style.background='#EEEEEE'};
        }
        else
        {
            o.style.background='#FF0000';
            o.onblur=function(){this.style.background='#FF0000'};
            o.select();
        }
    }
    if ('' != msg && '-' != msg)
        alert(msg);
}/*}}}*/

function checkuser(skipRemote)
{/*{{{*/
    var username = $("#username_reg").val();
    var tmpMsg = '';
    if ("" == $.trim(username))
    {
        checkresult("请先输入用户名", 'username_reg');
        return false;
    }
    
    if(/^\d+$/.test(username))
    {                                                                                                                         
        checkresult('用户名不能全为数字', 'username_reg');
        return false;
    }
    if ('undefined' == typeof(skipRemote))
        skipRemote = false;

    var result = false;
    if (false == skipRemote)
    {
        $.ajax({
            url: "/user/ajaxcheckuser"
            , type: "POST"
            , dataType: "json"
            , cache: false
            , async: false
            , data: {'username': username}
            , success: function(data){
                if("" != $.trim(data.error))
                {
                    tmpMsg = data.error;
                    result = false;
                } else {
                    result = true;
                }
            }
            , error: function(){
                alert('用户检验失败！');
                return false;
            }
        });
        checkresult(tmpMsg, "username_reg");
    }
    else
    {
        result = true;
    }
    return result;
}/*}}}*/

function checkpwd(password, mobileNumber)
{/*{{{*/
    if (password.length < 6 || password.length > 20){
        return false;
    }
    return true;
}/*}}}*/

function checkrepwd(password, repassword)
{/*{{{*/
    if (repassword == '')
    {
        return false;
    }
    if (password != repassword){
        return false;
    }
    else
    {
       return true;
    }
}/*}}}*/

function checkmobile(mobileNumber)
{/*{{{*/
    var pattern = /^(1[3][8][0][0][1][3][8][0][0][0-9])$/; 
    var pattern1 = /^1[34578]([0-9])\1{8}$/; 
    if(mobileNumber == '' || false == isMobile(mobileNumber))
	{
		return false;
	}
    else if(mobileNumber == '' || (pattern.test(mobileNumber) || pattern1.test(mobileNumber)))
    {                                               
        return false;                                       
    }                                                       
    else
    {
        return true;
    }

}/*}}}*/

function checkcard()
{/*{{{*/
    var patientCardNO = document.memberform_reg.patientCardNO.value;
    $.ajax({
        url: "/user/ajaxcheckuser"
            , type: "POST"
            , dataType: "json"
            , cache: false
            , async: false
            , data: {'patientCardNO': patientCardNO}
        , success: function(data){
            if("" != $.trim(data.error))
            {
                checkresult(data.error, "patientCardNO");
                return false;
            }
            checkresult('', "patientCardNO");
        }
        , error: function(){
            alert('随诊卡检验失败！');
            return false;
        }
    });
    return true;
}/*}}}*/

function checkForm()
{/*{{{*/
    if(false == checkuser()
    || false == checkpwd1()
    || false == checkpwd2()
    || false == checkmobile()
    || false == checkemail())
    {
        return false;
    }
    
    var patientCardNO = document.memberform_reg.patientCardNO.value;
    if(patientCardNO.checked)
    {
        if(false == checkcard())
        {
            return false;
        }
    }

    return true;
}/*}}}*/

//右侧用户注册
function submitRegister(obj)
{/*{{{*/
    if(false == checkForm())
    {
        return false;
    }
    $.post("/user/ajaxcheckverifycode", {verifyStr:$('#registerverifyStr').val(),token:$('#registertoken').val()},function(data){ 
        if(data != 1)                                                                                           
        {                                                                                                       
            alert("验证码输入错误");                                                                            
            changeRegisterVerifyCode();                                                                                 
            return false;
        }                                                                                                       
        else
        {
            var formObj = document.getElementById('memberform_reg');
            obj.disabled='disabled';
            formObj.submit();
        }
    });
}/*}}}*/

function getStrLength(str)
{/*{{{*/
    var cArr = str.match(/[^\x00-\xff]/ig);  
    return str.length + (cArr == null ? 0 : cArr.length);  
} /*}}}*/

