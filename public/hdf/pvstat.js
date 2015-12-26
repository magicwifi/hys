function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}
function addCookie(name, value)
{
    var str = name + "=" + escape(value);
    var date = new Date();
    var ms = 3650*86400*1000;
    date.setTime(date.getTime() + ms);
    str += ";expires=" + date.toGMTString()+";path=/";
   document.cookie = str;
}
if (_CO == null || _CO == undefined)
{
    var _LC = this.parent == this && escape(top.location) || 'in_iframe';
    var _T  = escape(document.title);
    var _RF = escape(document.referrer);
    var _R = Math.round(Math.random()*10000);
    var _U = getCookie('userinfo[id]');
    var _G = getCookie('g');

    if (_G == "")
    {
        _G = Math.round(Math.random()*100000) + "_" + new Date().getTime()
            addCookie('g', _G);
    }

    var _UA = escape(navigator.userAgent.toLowerCase());
    if(location.host != 'hdfimg.com') {
        var protocol = document.location.protocol;
        var _CO ='<img style="display:none;" src="http://pvstat.haodf.com/pvstat.gif?lc='+_LC+'&t='+_T+'&rf='+_RF+'&u='+_U+'&g='+_G+'&_r='+_R+'&ua='+_UA+'" width=1 height=1>';
        if(protocol == 'https:')
        {
            _CO ='<img style="display:none;" src="https://passport.haodf.com/pvstat.gif?lc='+_LC+'&t='+_T+'&rf='+_RF+'&u='+_U+'&g='+_G+'&_r='+_R+'&ua='+_UA+'" width=1 height=1>';
        }
        document.write(_CO);
    }
}
