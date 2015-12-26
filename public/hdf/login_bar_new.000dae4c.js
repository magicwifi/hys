var B_VERSION = 2;
if (typeof hdf == "undefined") {
    hdf = {
        version: "1.0.1.2",
        cookie_default_domain: {
            domain: "haodf.com",
            path: "/"
        },
        set_cookie: function(e, o, t, i, a, s) {
            var r = e + "=" + encodeURI(o);
            if (t) {
                now = new Date;
                now.setTime(now.getTime() + t * 1e3);
                r += "; expires=" + now.toGMTString()
            }
            if (!i || !a) {
                i = this.cookie_default_domain.path;
                a = this.cookie_default_domain.domain
            }
            r += "; path=" + encodeURI(i) + "; domain=" + escape(a);
            if (s) r += "; secure";
            document.cookie = r;
            return true
        },
        get_cookie: function(e) {
            if (typeof e != "string") return null;
            e = e.replace("[", "\\[").replace("]", "\\]");
            var o = document.cookie.match("(^|; )" + e + "=([^;]*)(;|$)");
            return o ? o[2] : null
        },
        del_cookie: function(e) {
            if (this.get_cookie(e) != null) this.set_cookie(e, null, -86400);
            return true
        }
    }
}
$.extend({
    getUrlDomain: function(e) {
        if (e.match(/^[a-zA-Z\.\-]+$/)) return e;
        match = e.match(/^https?:\/\/([a-zA-Z\.]+)/);
        return match && match.length > 1 ? match[1] : ""
    },
    isCrossDomain: function(e, o) {
        if (!o) o = document.domain;
        domain = this.getUrlDomain(e);
        return true;
        return domain != o
    },
    cross_domain_ajax: function(e) {
        if (this.isCrossDomain(this.getUrlDomain(e.url))) {
            e.dataType = "jsonp"
        }
        this.ajax(e)
    }
});
$.fn.extend({
    bubble: function(e, o) {
        if (typeof e == "object") {
            if (typeof e.config != "undefined") {
                hdf_bubble_msg.config(e.config)
            }
            if (typeof e.call != "undefined" && typeof hdf_bubble_msg[e.call] == "function") {
                hdf_bubble_msg[e.call]()
            }
            return this
        }
        if (typeof o != "object") o = {};
        o.anchor_id = this;
        hdf_bubble_msg.pop(e, o);
        return this
    },
    bubble_content: function(e) {
        $(".site_letter").html(e);
        return this
    },
    bubble_close: function(e, o) {
        $(".bubble_msg").remove();
        return this
    },
    bubble_update: function(e) {
        $(this).bubble_close(true);
        $("#login_bar_user_msg").append(e)
    }
});
if (null != hdf.get_cookie("userprovince")) {
    var tmp_u = hdf.get_cookie("userprovince");
    hdf.set_cookie("b[mprov]", tmp_u, 31536e3);
    hdf.set_cookie("userprovince", "", -1)
}
if (null != hdf.get_cookie("triagecitypy")) {
    var tmp_t = hdf.get_cookie("triagecitypy");
    hdf.set_cookie("b[tprov]", tmp_t, 31536e3);
    hdf.set_cookie("triagecitypy", "", -1)
}
if (null != hdf.get_cookie("echo")) {
    var tmp_e = hdf.get_cookie("echo");
    hdf.set_cookie("b[switch]", tmp_e, 31536e3);
    hdf.set_cookie("echo", "", -1)
}
if (null != hdf.get_cookie("version")) {
    var tmp_v = hdf.get_cookie("version");
    hdf.set_cookie("b[ver]", tmp_v, 31536e3);
    hdf.set_cookie("version", "", -1)
}
if (typeof urlprefix == "undefined") {
    var urlprefix = ""
}
if (typeof usercity == "undefined") {
    if (hdf.get_cookie("b[mcity]") != null) {
        var usercity = getMcity()
    } else {
        var usercity = "全国"
    }
}
if (typeof AreaName == "undefined") {
    var AreaName = "全国"
}
if (typeof ChangeCount == "undefined") {
    var ChangeCount = 0
}
if (typeof show_loginbar_logo == "undefined") {
    var show_loginbar_logo = false
}
hdf_login_bar = {
    check_client_time: function(e) {
        if (Math.random() < .1) {
            var o = new Date;
            var t = o.getFullYear();
            var i = o.getMonth() + 1;
            var a = o.getDate();
            if (Math.abs(t * 1e4 + i * 100 + a - e) > 30) {
                alert("您的计算机时间可能有错误，这可能导致好大夫在线无法正常访问。建议您检查并正确设置您的计算机时间。\n(今天是" + e + ", 您的计算机日期是" + t + "年" + i + "月" + a + "日)")
            }
        }
    },
    search_keyword_tip: "疾病、医院、科室、大夫",
    visible: false,
    server_data: false,
    bubble_popped: false,
    auto_recommend_data: 0,
    get_auto_recommend_thread: function(e) {
        if (hdf.get_cookie("userinfo[id]")) {
            var o = hdf.get_cookie("userinfo[name]");
            $.cross_domain_ajax({
                cache: false,
                url: "http://" + urlprefix + o + ".haodf.com/api/thread/ajaxgetnextrecommendthread",
                success: function(o) {
                    hdf_login_bar.auto_recommend_data = o;
                    e(o)
                }
            })
        }
    },
    get_server_data: function(e) {
        if (hdf.get_cookie("userinfo[id]")) {
            $.cross_domain_ajax({
                cache: false,
                url: "http://" + urlprefix + "passport.haodf.com/ajax_msg_count.php",
                success: function(o) {
                    hdf_login_bar.server_data = o;
                    e(o)
                }
            })
        }
    },
    display_server_data: function() {
        if (!this.server_data) return;
        $("#login_bar_user_name").html(this.server_data.user_name);
        $("#login_bar_user_msg").html(this.generate_msg_html(this.server_data.msg_count));
        if (this.server_data.msg_count > 0 && this.server_data.msg_id > 0 && !this.bubble_popped) {
            html = this.generate_msg_bubble(this.server_data);
            $("#login_bar_user_msg").append(html);
            this.bubble_popped = true
        }
        if (typeof fancybox_systemcode == "string" && fancybox_systemcode == "doctorzone") {
            if (this.server_data.popup_div) {
                var e = this.server_data.popup_div;
                setTimeout(function() {
                    $.fancybox(e, {
                        overlayOpacity: "0.7",
                        overlayColor: "black",
                        scrolling: false,
                        speedIn: "120",
                        speedOut: "120",
                        changeFade: "fast",
                        padding: 0,
                        showCloseButton: false
                    })
                },
                200)
            }
        }
    },
    display_sendappurl: function() {
        if (this.server_data.popup_sendurl_div) {
            $.fancybox(this.server_data.popup_sendurl_div, {
                overlayOpacity: "0.7",
                overlayColor: "black",
                scrolling: false,
                speedIn: "120",
                speedOut: "120",
                changeFade: "fast",
                padding: 0,
                showCloseButton: false
            })
        }
    },
    set_cookie_for_data: function() {
        hdf.set_cookie("userinfo[unreadcasecount]", this.auto_recommend_data, 0);
        return 0
    },
    generate_msg_bubble: function(e) {
        html = "";
        if (e.msg_count > 0 && e.msg_id > 0) {
            var o = false;
            if (e.msg_title.indexOf("大夫回复") > 0) {
                o = true
            }
            html += '<div class="bubble_msg_w">';
            html += '<div class="bubble_msg fs wb"><p class="pb5 clearfix">';
            html += '<span class="orange1 fl">您有新的站内消息:</span>';
            html += '<a class="bubble_close2" href="javascript:;" onclick="msg_set_read();$(\'#login_bar_user_msg\').bubble_close();"></a>';
            html += '</p><ul class="gray2 lh180 pb5 site_letter f12" style="font-size:12px;">';
            html += '<li><span class="fb">发信人：';
            if (o) {
                html += '<a href="http://www.haodf.com/info/mobile/hdf_mobile.php" style="font-weight:normal;float: right; color: #f40;"><img src="http://i1.hdfimg.com/login_bar/images/app_red_phone.png" style="margin-right: 4px; position: relative; top: 3px;">下载手机客户端医生回复立即通知</a>'
            }
            html += "</span>admin</li>";
            html += '<li><span class="fb">标题：</span>' + e.msg_title + "</li>";
            html += '<li><span class="fb">内容：</span>' + e.msg_content + "</li>";
            html += '</ul><p class="tr pt10" style="text-align:right;">';
            if (e.msg_next) html += '<a class="bubble_next mr10"  style="margin-right:10px;" href="javascript:;" onclick="msg_set_read(msg_next);">下一条</a>';
            html += '<a href="javascript:;" onclick="msg_set_read(); $(\'#login_bar_user_msg\').bubble_close();" class="bubble_close">关闭</a>';
            html += '</p><span class="arrow"></span></div></div></div>';
            html += "<script>";
            html += "function msg_set_read(callback){hdf_login_bar.set_msg_read(" + e.msg_id + "," + e.msg_count + ", callback);}";
            html += 'function msg_next() {$("#login_bar_user_msg").bubble_content("<div style=\'overflow:hidden; border:1px solid #eeeeee; text-align:center; color:#999;\'><br/>正在获取下一条站内消息...<br/><br/></div>"); msg_set_read(msg_set_next);}';
            html += 'function msg_set_next(){hdf_login_bar.get_server_data(function(data){html=hdf_login_bar.generate_msg_bubble(data); if (html) {$("#login_bar_user_msg").bubble_update(html);} else {alert(\'没有未读站内消息.\'); $("#login_bar_user_msg").bubble_close();}});}';
            html += '$(".site_letter a").click(function() {msg_set_read(); $(this).attr("target","_blank"); if (!$(this).attr("bubble_hold")) $("#login_bar_user_msg").bubble_close();});';
            html += "</script>"
        }
        return html
    },
    generate_msg_html: function(e) {
        if (hdf.get_cookie("userinfo[id]") && parseInt(hdf.get_cookie("userinfo[hostid]")) > 0 && hdf.get_cookie("userinfo[hosttype]") == "Doctor") {
            return '<a href="http://' + urlprefix + 'passport.haodf.com/internalmessage/inbox" target="_blank" class="pr" style="position: relative;"><img alt=""  style="margin-right: 24px;" class="b_n" width="16px" height="12px" src="http://i1.hdfimg.com/login_bar/images/letter2.png">' + (e > 0 ? '<span id="msg_count" class="unread_msg_cnt" style="top: -2px; left: 24px;">' + e + "</span>": "") + "</a>"
        } else {
            if (e > 0) {
                return '<a href="http://' + urlprefix + 'passport.haodf.com/internalmessage/inbox" style="color:red;" target="_blank" class="message on"><i></i>(' + e + ")</a>&nbsp;"
            } else {
                return '<a href="http://' + urlprefix + 'passport.haodf.com/internalmessage/inbox" target="_blank" class="message"><i></i>(' + e + ")</a>&nbsp;"
            }
        }
    },
    set_msg_read: function(e, o, t) {
        var i = {
            url: "http://" + urlprefix + "passport.haodf.com/internalmessage/ajaxsetread",
            data: {
                msgid: e
            },
            success: function(e) {
                t(e)
            }
        };
        if (typeof t != "function") i.success = null;
        $.cross_domain_ajax(i);
        $("#login_bar_user_msg").html(hdf_login_bar.generate_msg_html(o - 1))
    },
    get_bar_content: function() {
        if (hdf.get_cookie("userinfo[id]") && parseInt(hdf.get_cookie("userinfo[hostid]")) > 0 && hdf.get_cookie("userinfo[hosttype]") == "Doctor") {
            code = '<div class="login_main_box">';
            code += '<div class="login_main" style="width:1002px;">';
            code += '<p class="logo fl pr25">';
            code += '<a href="http://www.' + urlprefix + 'haodf.com"><img src="http://i1.hdfimg.com/login_bar/images/logo_s.png?20131101" alt="好大夫在线"></a>'
        } else {
            code = '<link type="text/css" rel="stylesheet" href="http://i1.hdfimg.com/passport/css/top_change.82239b76.css" /><div class="topbar_box3">';
            code += '<div class="topbar clearfix">'
        }
        if (hdf.get_cookie("userinfo[id]")) {
            var e = ["晚上", "早上", "上午", "中午", "下午"];
            var o = [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0];
            var t = new Date;
            var i = e[o[t.getHours()]];
            var a = hdf.get_cookie("userinfo[name]");
            if (parseInt(hdf.get_cookie("userinfo[hostid]")) > 0) {
                switch (hdf.get_cookie("userinfo[hosttype]")) {
                case "Doctor":
                    code += '</p><div class="login_p fl pt10">' + i + '好，<font id="login_bar_user_name"></font><div class="dil pr" style="position: relative;" id="login_bar_user_msg"></div></div>';
                    code += '<p class="login_p fl pt10"><span>｜</span><a href="http://' + urlprefix + hdf.get_cookie("userinfo[name]") + '.haodf.com">我的网站</a>';
                    if (hdf.get_cookie("userinfo[unreadcasecount]") && hdf.get_cookie("userinfo[unreadcasecount]") > 0) {
                        code += '<a href="http://' + urlprefix + hdf.get_cookie("userinfo[name]") + '.haodf.com/thread/index?p_type=unread" style="color:red;">(您有新咨询)</a>'
                    }
                    code += '<span>｜</span><a href="http://' + urlprefix + hdf.get_cookie("userinfo[name]") + '.haodf.com/adminsetup/module">网站设置</a>';
                    break
                }
                code += '<span>｜</span><a href="http://' + urlprefix + 'passport.haodf.com/user/logout" >退出</a></p>';
                code += '<div class="login_r fr"><form name="form1" method="get" action="http://so.haodf.com/all.php?from=loginbar"><div class="fl login_s"><p class="fl"><input type="text" name="q" id="textfield" class="search_input pl5 pr5"></p><p class="fl"><input type="submit" name="button" id="button" value="" class="btn_input"></p></div><div class="fl login_link pl20 pt10"><a href="http://www.' + urlprefix + 'haodf.com/iphone/index.htm">手机版</a><span>｜</span><a href="http://www.' + urlprefix + 'haodf.com/sitemap/index.htm">网站地图</a></div></form></div></div></div>'
            } else {
                code += '<div class="topbar_left">';
                code += '<a class="logo" href="http://www.haodf.com"></a><span  class="welcome">' + i + '好!</span><a href="http://' + urlprefix + 'passport.haodf.com/index/mycenter"><span class="username" id="login_bar_user_name"></span></a><div class="message" id="login_bar_user_msg" style="position: relative; display: inline;"></div><span class="grey logingrey">|</span><a class="logout" href="http://' + urlprefix + 'passport.haodf.com/user/logout">退出</a>';
                code += "</div>";
                code += '<div class="topbar_search">';
                code += '<form name="form1" method="get" action="http://so.haodf.com/all.php?from=loginbar"><div class="leftinput">';
                code += '<input type="text" name="q" id="textfield"  value="">';
                code += "</div>";
                code += '<div class="right_sub">';
                code += '<input type="submit" name="button" id="button"  value="">';
                code += "</div>";
                code += "</form></div>";
                code += '<div class="topbar_right clearfix">';
                code += "<ul>";
                code += '<li class="item">';
                code += '<div class="show_box"><a href="http://' + urlprefix + 'passport.haodf.com/index/mycenter"><i class="ico_myspace"></i><span>我的中心</span></a>';
                code += "</div>";
                code += "</li>";
                code += '<li class="line1 item"></li>';
                code += '<li class="item">';
                code += '<div class="show_box"><a href="http://' + urlprefix + 'passport.haodf.com/myhealthcare/myservicelist"><i class="ico_service"></i><span>我的服务</span></a>';
                code += "</div>";
                code += "</li>";
                code += '<li class="line2 item"></li>';
                code += '<li class="item">';
                code += '<div class="show_box"><a href="http://' + urlprefix + 'passport.haodf.com/userdoctor/showmydoctor"><i class="ico_mydoc"></i><span>我的医生</span></a>';
                code += "</div>";
                code += "</li>";
                code += '<li class="line3 item"></li>';
                code += '<li class="item">';
                code += '<div class="show_box"><a href="http://www.' + urlprefix + 'haodf.com/info/mobile/hdf_mobile.php"><i class="ico_downloadapp"></i><span>手机版</span></a>';
                code += "</div>";
                code += "</li>";
                code += "</ul>";
                code += "</div>"
            }
        } else {
            code += '<div class="topbar_left">';
            code += '<a class="logo" href="http://www.haodf.com"></a><a class="red" href="http://' + urlprefix + 'passport.haodf.com/user/login">登录</a><span class="red">|</span><a class="red" href="http://' + urlprefix + 'passport.haodf.com/user/register">注册</a><span class="grey nologininfo">好大夫在线，帮你找到好大夫</span>';
            code += "</div>";
            code += '<div class="topbar_search">';
            code += '<form name="form1" method="get" action="http://so.haodf.com/all.php?from=loginbar"><div class="leftinput">';
            code += '<input type="text" name="q" id="textfield"  value="">';
            code += "</div>";
            code += '<div class="right_sub">';
            code += '<input type="submit" name="button" id="button"  value="">';
            code += "</div>";
            code += "</form></div>";
            code += '<div class="topbar_right clearfix">';
            code += "<ul>";
            code += '<li class="item">';
            code += '<div class="show_box"><a href="http://' + urlprefix + 'passport.haodf.com/user/login"><i class="ico_myspace"></i><span>我的中心</span></a>';
            code += "</div>";
            code += "</li>";
            code += '<li class="line1 item"></li>';
            code += '<li class="item">';
            code += '<div class="show_box"><a href="http://' + urlprefix + 'passport.haodf.com/user/login"><i class="ico_service"></i><span>我的服务</span></a>';
            code += "</div>";
            code += "</li>";
            code += '<li class="line2 item"></li>';
            code += '<li class="item">';
            code += '<div class="show_box"><a href="http://' + urlprefix + 'passport.haodf.com/user/login"><i class="ico_mydoc"></i><span>我的医生</span></a>';
            code += "</div>";
            code += "</li>";
            code += '<li class="line3 item"></li>';
            code += '<li class="item">';
            code += '<div class="show_box"><a href="http://www.' + urlprefix + 'haodf.com/info/mobile/hdf_mobile.php"><i class="ico_downloadapp"></i><span>手机版</span></a>';
            code += "</div>";
            code += "</li>";
            code += "</ul>";
            code += "</div>"
        }
        return code
    },
    check_search: function() {
        if ($("#login_bar_search_keyword").val() == hdf_login_bar.search_keyword_tip || !$("#login_bar_search_keyword").val()) {
            $("#login_bar_search_keyword").bubble("请输入搜索关键词", {
                close_timeout: 3e3,
                style: "orange",
                arrow_offset_x: 6,
                show_close: false,
                width: 150
            });
            return false
        }
        return true
    },
    show: function(e) {
        if (this.visible) return;
        if ($("#login_bar").size() == 0 && e) {
            $(document.body).prepend('<div id="login_bar" ></div>')
        }
        if ($("#login_bar").size() == 0) return;
        bar_width = $("#login_bar").width();
        $("#login_bar").html(this.get_bar_content());
        $("#login_bar_search_keyword").val(this.search_keyword_tip);
        $("#login_bar_search_form").submit(this.check_search)
    }
};
//hdf_login_bar.show();
if (hdf.get_cookie("userinfo[hosttype]") && "Doctor" == hdf.get_cookie("userinfo[hosttype]")) {
    hdf_login_bar.get_auto_recommend_thread(function() {
        hdf_login_bar.set_cookie_for_data()
    })
}
hdf_login_bar.get_server_data(function() {
    hdf_login_bar.display_server_data()
});
$(function() {
    //hdf_login_bar.show(true);
    //hdf_login_bar.display_server_data()
});
$.fn.myWin = function(e) {
    var o;
    var t;
    var i;
    var a;
    var s;
    var r;
    var n;
    var c;
    var l = this;
    function d() {
        _();
        if (e && typeof e == "object") {
            f()
        }
    }
    function f() {
        var a = e.endPosition.left;
        var d = e.endPosition.top;
        if (a == "left") {
            n = s
        } else if (a == "center") {
            n = s + (o - 649) / 2
        } else if (a == "right") {
            n = s + o - i
        }
        if (d == "top") {
            c = r
        } else if (d == "center") {
            c = r + (t - 479) / 2
        } else if (d == "bottom") {
            c = r + t - 479
        }
        l.css({
            left: n,
            top: c
        })
    }
    function _() {
        o = $(window).width();
        t = $(window).height();
        i = l.outerWidth(true);
        a = l.outerHeight(true);
        s = $(window).scrollLeft();
        r = $(window).scrollTop()
    }
    d();
    l.children("h3").children("img").click(function() {
        l.hide();
        $(".fzwrap").hide();
        $("#abc").hide()
    });
    $(window).scroll(function() {
        d()
    }).unbind("animate");
    $(window).resize(function() {
        d()
    }).unbind("animate");
    return l
};
function needTriage(e) {
    var o = hdf.get_cookie("b[tprov]");
    if (typeof e == "undefined") {
        return o
    } else {
        e(o)
    }
}
function setMcity(e, o) {
    hdf.set_cookie("b[mcity]", "全国", o)
}
function getMcity() {
    return "全国";
    var e = "";
    try {
        e = hdf.get_cookie("b[mcity]");
        e = decodeURI(e)
    } catch(o) {
        hdf.set_cookie("modifiedTriageCity", "", -1);
        hdf.set_cookie("b[mcity]", "", -1);
        hdf.set_cookie("b[switch]", 0, 31536e3)
    }
    return e
}
$(document).ready(function() {
    if (1 != hdf.get_cookie("sdmsg") && hdf.get_cookie("userinfo[id]") > 0) {
        $.getJSON("http://www." + urlprefix + "haodf.com/index/ajaxsentnotice?callback=?",
        function(e) {})
    }
});