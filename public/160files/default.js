$(function() {
   $("#group_li li").click(function() {
        $("#group_li li").removeClass("cur");
        $(this).addClass("cur");
        cno = $(this).attr('item');
        forumList(cno);
  
    });
    $('#ec_cs_pannel').hide();
    $("#consult_dep li").click(function() {
		$("#consult_dep li").removeClass("cur");
		$(this).addClass("cur");
		cno = $(this).find('a').attr('data');
		doctorList('consult', cno);
    });
})

function forumList(cno) {
    url = JYUrl('ajax', 'getForumByCategory'),
    $.post(url, {
        cid: cno,
        num: 14
    },
    function(result) {
        html = '';
        $.each(result,
        function(i, doc) {
            var url = JYUrl("forum", "detail", {
                id: doc.forum_id
            });
            html += '<li><i class="dot">◆</i>';
            html += '<p class="word_hid"><a href="' + url + '" class="fs14" title="' + doc.title + '">' + doc.title + '</a></p>';
            html += '<span class="fr gray_2 word_hid " title="' + doc.user_name + '">';
            if (doc.sex) {
                html += '<i class="g_icon female"></i>';
            } else {
                html += '<i class="g_icon male"></i>';
            }
            html += doc.user_name + '</span></li>';
        });
        $("#forum_list").html(html);
    },
    'json');
}

function doctorList(type, cno) {
	url = JYUrl('consult', 'ajaxGetDocList'),
	$.post(url, {
		type: type,
		cno: cno,
		num: 4
	},
	function(result) {
		html = '';
		$.each(result,
		function(i, doc) {
			html += '<li>';
			html += '<div class="layout mt20">';
			html += '<a href="' + doc.doc_url + '" class="fl c_doca">';
			if (doc.image) {
				html += '<img oncontextmenu="return(false);" src= ' + upload_url + doc.image + ' alt="" width="90" height="100"/>';
			} else {
				html += '<img oncontextmenu="return(false);" src="' + v2_files_dir + '/style/global/m_' + doc.sex + '.jpg" alt="" width="90" height="100"/>';
			}
			html += '</a>';
			html += '<div class="fl d_info">';
			html += '<p><a href="' + doc.doc_url + '" class="d_name">' + doc.doctor_name + '</a></p>';
			html += '<p class="fs12 gray_1">' + doc.zcname + '</p>';
			html += '<p class="fs12"><em>' + doc.review_score + '</em>分<span class="fr gray_1">' + doc.review_people + '人点评</span></p>';
			html += '</div>';
			html += '</div>';
			html += '<div class="mt20 d_hos">';
			html += '<p class=""><a href="' + doc.unit_url + '" class="hos_n word_hid">' + doc.unit_name + '</a><a href="' + doc.dep_url + '" class="gray_1 dep_n word_hid">' + doc.dep_name + '</a></p>';
			html += '<p class="fs12 gray_1 mt8 d_det">' + doc.expert + '</p>';
			html += '</div>';
			html += '<div class="doc_bottom"><span class="fl"><em class="fs24">' + doc.cost_price + '</em>元／次</span><a href="' + doc.ask_url + '"><span class="btn btn_con fr"><i class="g_icon msg_c ver_m"></i>咨询</span></a></div></li>';
		});
		$("#consult_list").html(html);
	},
	'json');
}
