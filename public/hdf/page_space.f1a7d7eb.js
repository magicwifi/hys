$(function(){$(".article_detail li").each(function(){$(this).css("list-style-type",$(this).parents("ul").css("list-style-type"));$(this).css("list-style-type",$(this).parents("ol").css("list-style-type"))});$(".wel_spread").find("a.spread").click(function(){$(".welcome_word").find("span.dn").show();$(this).hide();$(".wel_dot").hide();$(".wel_spread").find("a.retract").show()});$(".wel_spread").find("a.retract").click(function(){$(".welcome_word").find("span.dn").hide();$(this).hide();$(".wel_dot").show();$(".wel_spread").find("a.spread").show()});var t=function(t,e){t.bind("focus",function(){var a=t.val();if(a===e){t.val("");t.removeClass("gray3")}});t.bind("blur",function(){var a=t.val(),i=/(^\s+|\s+$)/;a=a.replace(i,"");if(a===""){t.val(e);t.addClass("gray3")}})};var e="��������ȷ�ļ�������";t($(".pa_vote_inp"),e);t($(".text_area").find("textarea"),$(".text_area").find("textarea").attr("defvalue"));t($(".free_ask").find("textarea"),$(".free_ask").find("textarea").attr("defvalue"));t($(".upd_zhen_info").find("textarea"),$(".upd_zhen_info").find("textarea").attr("defvalue"));t($("#thread_title"),$("#thread_title").attr("defaulttext"));t($(".edit_content").find("textarea"),$(".edit_content").find("textarea").attr("defvalue"));t($(".free_ask1").find("textarea"),$(".free_ask1").find("textarea").attr("defvalue"));t($(".comment_input"),$(".comment_input").attr("defvalue"));t($(".comment_text"),$(".comment_text").attr("defvalue"));t($(".modify_textarea"),$(".modify_textarea").attr("defvalue"));t($(".art_keys"),$(".art_keys").attr("defvalue"));t($("#zixunshuoming"),$("#zixunshuoming").attr("defvalue"));t($("#thread_title_b"),$("#thread_title_b").attr("defaulttext"));$(".u_handle .upd_w").click(function(){$(this).parent().parent().find("span:eq(1)").show();$(this).parent().parent().find("span:eq(0)").hide();$(this).hide();$(this).next().hide();$(this).parent().find(".save_w").show()});$(".sel_quote_art").change(function(){var t=$(this).find("option:selected").text();if(t==="ȫ������"){$(".quote_art_con li").show()}else{$(".quote_art_con li").hide().find("span").filter(":contains('"+t+"')").parent().show()}});var a=function(t,e){t.toggle(function(){e.slideDown()},function(){e.slideUp()})};a($(".gift_all"),$(".hide_gift"));a($(".supply_attach"),$(".s_attachment"))});$(document).ready(function(){t();function t(){var t=$(".s_rela_tab"),a=t.length,i;for(i=0;i<a-1;i++){e(t[i],"cur")}e(t[a-1],"cur")}function e(t,e){var i=$(t).find(".s_rela_menu").children(),n=$(t).find(".s_rela_tabcon").children();i.mouseenter(function(){a($(this),n,e)})}function a(t,e,a){var i=t.index();e.eq(i).show().siblings().hide();t.addClass(a).siblings().removeClass(a)}});function setTab(t,e,a){for(i=1;i<=5;i++){var n=document.getElementById(t+i);var r=document.getElementById("con_"+t+"_"+i);n.className=i==e?"hover":"";r.style.display=i==e?"block":"none"}}$(document).ready(function(){initFancyBox("a.popupwindow")});function showBingliDetail(t,e,a){if(e.split(",").length>0){var i=Math.round(Math.random()*1e4);$(t).html('<img src="http://i1.hdfimg.com/bingli/loading.gif" />');var n="/bingli/bldetail/"+e+".htm?from=dzone&s="+i;if("undefined"!==typeof a){n+="&spaceId="+a}$.get(n,function(e){$("#"+t).html(e)})}}function showBingliAttachment(t,e,a){if(e.split(",").length>0){var i=Math.round(Math.random()*1e4);$(t).html('<img src="http://i1.hdfimg.com/bingli/loading.gif" />');var n="/bingli/bldetail/"+e+".htm?from=dzone&for=attachment&s="+i;if("undefined"!==typeof a){n+="&spaceId="+a}$.get(n,function(e){$("#"+t).html(e)})}}function ajaxHideAfterBody(t){$.get(t,function(t){$("body").after("<div class='dn'>"+t+"</div>")})}function toAskIndex(t){threadtitle=document.getElementById("thread_title").value;if(threadtitle.search(/�ڴ˼���������/)==0){threadtitle=""}ajaxHideAfterBody("/api/index/ajaxaskflow?uname="+t+"&case_title="+threadtitle)}function toAsk4Browser(t,e){threadtitle=document.getElementById(e).value;if(threadtitle.search("�����Ҳ�м������⣬�ڴ���������������ר������")==0){threadtitle=""}var a=document.getElementById(t);a.action="http://zixun.haodf.com/ask.php?srcflag=16&case_title="+threadtitle;a.target="_blank";a.submit()}var win=window.win||{};win={popLayerOfBody:function(t,e,a){var e=e||false;var a=a||2e3;var i="<div class='suc_pop_layerb'><div class='suc_pop_layer'>"+t+"</div></div>";$("body").append(i);var n=$(".suc_pop_layerb").height();var r=$(".suc_pop_layerb").width();$(".suc_pop_layerb").css({marginTop:-(n/2)+"px",marginLeft:-(r/2)}).fadeIn(1e3).delay(a).animate({marginTop:10,opacity:"hide"},500,function(){$(this).remove();if(e){window.location.href=e}})},popLayerOfBodyFail:function(t,e,a){var e=e||false;var a=a||1500;var i="<div class='suc_pop_layerb'><div class='fail_pop_layer'>"+t+"</div></div>";$("body").append(i);var n=$(".suc_pop_layerb").height();$(".suc_pop_layerb").css({marginTop:-(n/2)+"px"}).fadeIn(1e3).delay(a).animate({marginTop:10,opacity:"hide"},500,function(){$(this).remove();if(e){window.location.href=e}})},popLayerOfId:function(t,e){var a="<div class='suc_pop_layerb'><div class='fail_pop_layer'>"+e+"</div></div>";$("#"+t).append(a);var i=$(".suc_pop_layerb").height();$(".suc_pop_layerb").css({marginTop:-(i/2)+"px"}).fadeIn(1e3).delay(800).animate({marginTop:10,opacity:"hide"},500,function(){$(this).remove()})},showSpread:function(){$(".pa_friend_list li").each(function(){if($(this).index()>5){$(this).hide()}});$(".list_spread").click(function(){$(this).parent().prev(".pa_friend_list").find("li").show();$(this).hide();$(this).next(".list_contract").show()});$(".list_contract").click(function(){var t=$(this).parent().prev(".pa_friend_list").find("li");t.each(function(){if($(this).index()>5){$(this).hide()}});$(this).hide();$(this).prev(".list_spread").show()})},layerFade:function(t,e,a){var i="<div class="+e+">"+"</div>";$("#"+t).append(i);$("."+e).text(a);$("."+e).fadeIn(1e3,function(){}).fadeOut(3e3,function(){$(this).remove()})},clearInput:function(t,e){var a=t.val();if(a===e){t.val("");t.removeClass("gray3")}},fillInput:function(t,e){var a=t.val(),i=/(^\s+|\s+$)/;a=a.replace(i,"");if(a===""){t.val(e);t.addClass("gray3")}},isEmpty:function(t){var e=/(^\s+|\s+$)/,a=t.text(),a=a.replace(e,"");return!a},getStrLen:function(t,e){var a=0;for(i=0;i<t.length;i++){if(t.charCodeAt(i)>0&&t.charCodeAt(i)<128){a++}else{a+=2}}return a},loopBackground:function(t,e){if(t==8){return}else if(t%2==0){$(e).css("background","#fff1dd");t++;loopId=setTimeout(function(){win.loopBackground(t,e)},120)}else{$(e).css("background","#fff");t++;loopId=setTimeout(function(){win.loopBackground(t,e)},120)}},inputArea:function(t,e,a){$(t).focus(function(){if(win.isEmpty($(e))){$(t).parent().find(e).html("����������<span style='color:#4893eb;'>"+a+"</span>��</p>")}win.clearInput($(t),$(t).attr("defaultval"))});$(t).blur(function(){win.fillInput($(t),$(t).attr("defaultval"))});$(t).keyup(function(){var i=$(t).val();var n=win.getStrLen(i,a);var r=Math.floor((a*2-n)/2);if(n>a*2){var o=-r;$(t).parent().find(e).html("�Ѿ�����<span style='color:#d21c23;'>"+o+"</span>��</p>")}else{$(t).parent().find(e).html("����������<span style='color:#4893eb;'>"+r+"</span>��</p>")}})}};$(function(){win.showSpread(".list_spread",".list_contract")});function AutoScroll(t){$(t).find("ul:first").animate({marginTop:"-25px"},500,function(){$(this).css({marginTop:"0px"}).find("li:first").appendTo(this)})}var ajaxSubmit=function(formId,handlerForStatus){var a=this;var HANDLER_UNDEFINED="";var $form=$(formId);var form=$form.get(0);a.CHECK_SHOULD_SUBMITTING="check";a.RES_TYPE_SUBMITTING="submitting",a.RES_TYPE_SUCC="success",a.RES_TYPE_NOTMODIFIED="notmodified",a.RES_TYPE_ERROR="error",a.RES_TYPE_TIMEOUT="timeout",a.RES_TYPE_ABORT="abort",a.RES_TYPE_PARSERERROR="parsererror";var callHandler=function(t,e){if(handlerForStatus&&handlerForStatus[e]&&typeof handlerForStatus[e]==="function"){return handlerForStatus[e](t)}return HANDLER_UNDEFINED};if(form){form.onsubmit=function(form){return function(){var $form=$(form);var datas={};var res={};var submitable=false;$form.find(":input").each(function(){var t=$(this);var e=t.attr("name");if(e){if(t.attr("type")=="radio"){datas[e]=$('input:radio[name="'+e+'"]:checked').val()}else if(t.attr("type")=="checkbox"){var a={};var i=0;$('input:checkbox[name="'+e+'"]:checked').each(function(){a[i]=$(this).val();i++});datas[e]=a}else{datas[e]=t.val()}}});submitable=callHandler(datas,a.CHECK_SHOULD_SUBMITTING);if(submitable===HANDLER_UNDEFINED||submitable){callHandler(datas,a.RES_TYPE_SUBMITTING);$.ajax({url:$form.attr("action"),type:$form.attr("method")||"GET",cache:false,data:datas,success:function(data,type){try{if(typeof JSON=="undefined"){res=eval("("+data+")")}else{res=JSON.parse(data)}callHandler(res,a.RES_TYPE_SUCC)}catch(e){callHandler(res,a.RES_TYPE_PARSERERROR)}},error:function(t,e){callHandler(res,e)}})}return false}}(form)}else{console.error("form is not found by "+formId)}};