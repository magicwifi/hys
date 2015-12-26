/* 判断密码强度  弱 0~1 中2~3 强4*/
function getPwdStrong(passwd) {
    try{
        if(passwd.length<10)
            return 1;
        //是否同时存在数字，大小写字符，特殊字母，并且第一个字符为数字或字母
        var ls = 0; 
        //匹配数字
        if(passwd.match(/([0-9])+/)){   
            ls++;     
        }
        //匹配小写
        if(passwd.match(/([a-z])+/)){   
            ls++; 
        }   
        //匹配大写
        if(passwd.match(/([A-Z])+/)){   
            ls++;   
        }   
        //存在特殊字符
        if (passwd.match(/[^a-zA-Z0-9]/g)){ 
        	ls++; 
        }
        return ls;
    }catch(err){
        return 1;
    }
    return 0;
}
/*解绑手机号码调用*/
function close_arg(){
	var list = art.dialog.list;
	for (var i in list) {
		list[i].close();
	};
};