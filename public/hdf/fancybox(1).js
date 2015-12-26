document.writeln('<script type="text/javascript" src="http://i1.hdfimg.com/js/fancybox/jquery.fancybox-1.3.4.pack.js"></script>');
var arr = {'overlayOpacity' : '0.5', 'overlayColor' : 'black', 'speedIn' : '120', 'speedOut' : '120', 'changeFade' : 'fast', 'centerOnScroll' : true, 'padding' : 0};
if (typeof(fancybox_systemcode) == 'string' && fancybox_systemcode == 'doctorzone')
{
    document.writeln('<link rel="stylesheet" href="http://i1.hdfimg.com/doctorzone/css/jquery.fancybox-1.3.4.css?2013" type="text/css" media="screen" />');
    arr = {'overlayOpacity' : '0.5', 'overlayColor' : 'black', 'speedIn' : '120', 'speedOut' : '120', 'changeFade' : 'fast', 'padding' : 0};
}
else
{
    document.writeln('<link rel="stylesheet" href="http://i1.hdfimg.com/js/fancybox/jquery.fancybox-1.3.4.css?2012" type="text/css" media="screen" />');
}

function initFancyBox(id)
{//{{{
    $(id).fancybox(arr);
}//}}}

function initFancyBoxIframe(id, width, height)
{//{{{
    $(id).fancybox({
        'overlayOpacity' : '0.7',
        'overlayColor' : 'black',
        'speedIn' : '120',
        'speedOut' : '120',
        'changeFade' : 'fast',
        'padding' : 0,
        'type' : 'iframe',
        'width' : width,
        'height' : height
    });
}//}}}

function ajaxFancyBox(data)
{//{{{
    $.fancybox(data, {
            'overlayOpacity' : '0.7',
            'overlayColor' : 'black',
            'speedIn' : '120',
            'speedOut' : '120',
            'changeFade' : 'fast',
            'padding' : 0
            });
}//}}}

function ajaxFancyBoxWithCloseButton(data)
{//{{{
    $.fancybox(data, {
            'overlayOpacity' : '0.7',
            'overlayColor' : 'black',
            'speedIn' : '120',
            'speedOut' : '120',
            'changeFade' : 'fast',
            'padding' : 0,
            'hideOnOverlayClick' : false,
            'showCloseButton' : true
            });
}//}}}

function initFancyBoxhWithCloseButton(id)
{//{{{
    $(id).fancybox({
            'enableEscapeButton' : false,
            'overlayOpacity' : '0.7',
            'overlayColor' : '#666',
            'speedIn' : '120',
            'speedOut' : '120',
            'changeFade' : 'fast',
            'padding' : 0,
            'hideOnOverlayClick' : false,
            'centerOnScroll' : true,
            'showCloseButton' : true
            });
}//}}}

function initFancyBoxHideClick(id)
{//{{{
    $(id).fancybox({
            'enableEscapeButton' : false,
            'overlayOpacity' : '0.7',
            'overlayColor' : 'black',
            'speedIn' : '120',
            'speedOut' : '120',
            'changeFade' : 'fast',
            'padding' : 0,
            'hideOnOverlayClick' : false,
            'showCloseButton' : false
            });
}//}}}

function initFancyBoxWithTitle(id, position, content)
{//{{{
    $(id).fancybox({
        'overlayOpacity' : '0.7',
        'overlayColor' : 'black',
        'speedIn' : '120',
        'speedOut' : '120',
        'changeFade' : 'fast',
        'titlePosition' : 'over',
        'titleFormat' : function(title, currentArray, currentIndex, currentOpts) {
                    return '<span id="fancybox-title-over" class="fc f14">◊ ¡œ’’∆¨ ' + (currentIndex + 1) + ' / ' 
                    + currentArray.length + (title.length ? ' &nbsp; ' + title : '') 
                    + '<span class="red fb fr f14">'+content+'</span></span>';
                },
        'onComplete':function(){
                fixImgBoxAfterComplete(540,150);
                }
    });
    function fixImgBoxAfterComplete(newWidth, newHeight){
                if($("#fancybox-content").width()<newWidth)
                {
                        $("#fancybox-title").css({
                                "width" : (newWidth-20)+"px"
                        });
                       var content =  $("#fancybox-content");
                        $("#fancybox-wrap").css({
                                 "width" : newWidth+"px"
                        });
                        content.css({margin:"0 auto"});
                }
                if($("#fancybox-content").height()<newHeight)
                {
                        $("#fancybox-wrap").css({
                                 "height": newHeight+"px"
                        });
                }

        }

}//}}}

function bindHref4Ajax(id)
{//{{{
    $('#'+id+" a").click(function(){
        if ('_blank' == this.target) {
        return true;
        }
        if (this.rel) {
        return false;
        }
        gourl = this.href;
        $.ajax({
            type: "POST",
            url: gourl,
            success: function(data){
            $.fancybox(data, {
                    'overlayOpacity' : '0.7',
                    'overlayColor' : 'black',
                    'speedIn' : '120',
                    'speedOut' : '120',
                    'changeFade' : 'fast',
                    'padding' : 0
                });
            },
            error: function(){
            alert(404);
            }
        });
        return false;      
    });
}//}}}

function closeFancyBoxWindow()
{//{{{
    $('#fancybox-tmp').remove();
    $('#fancybox-loading').remove();
    $('#fancybox-overlay').remove();
    $('#fancybox-wrap').remove();
}//}}}

function fancyBoxOpenWindow(href)
{//{{{
    var tmpid = 'hiddenA_' + Date.parse(new Date());
    $("body").after('<a style="none" id="'+tmpid+'" href="'+href+'"> </a>');
    initFancyBox("a#" + tmpid);
    $("a#" + tmpid).click();
}//}}}

