/**
 * @file 日历控件
 */

(function (root) {

    /**
     * uuid
     * @type {number}
     */
    var UUID = 0x0907;


    /**
     * 判断是否为数组
     *
     * @param  {[type]}  v [description]
     * @return {Boolean}   [description]
     */
    function isArray(v) {
        return toString.apply(v) === '[object Array]';
    }


    /**
     * 数组去重
     *
     * @param  {Array} arr  原始数组
     * @return {Array}     去重后的数组
     */
    function uniqArray(arr) {
        var obj = {};
        var newArr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            var item = arr[i];
            if (item && !obj[item]) {
                newArr.push(item);
                obj[item] = true;
            }
        }

        return newArr;
    }


    /**
     * Parse Date value from String
     *
     * @param {string} format the pattern of date
     */
    String.prototype.toDate = function (format) {
        if (null == format) format = "yyyy-MM-dd";
        var pattern = format.replace("yyyy", "(\\~1{4})").replace("yy", "(\\~1{2})")
            .replace("MM", "(\\~1{2})").replace("M", "(\\~1{1,2})")
            .replace("dd", "(\\~1{2})").replace("d", "(\\~1{1,2})").replace(/~1/g, "d");

        var returnDate;
        if (new RegExp(pattern).test(this)) {
            var yPos = format.indexOf("yyyy");
            var mPos = format.indexOf("MM");
            var dPos = format.indexOf("dd");
            if (mPos == -1) mPos = format.indexOf("M");
            if (yPos == -1) yPos = format.indexOf("yy");
            if (dPos == -1) dPos = format.indexOf("d");
            var pos = new Array(yPos + "y", mPos + "m", dPos + "d");
            var data = {
                y: 0,
                m: 0,
                d: 1
            };
            var m = this.match(pattern);
            for (var i = 1; i < m.length; i++) {
                if (i == 0) return;
                var flag = pos[i - 1].split('')[1];
                data[flag] = m[i];
            };

            if (data.y.toString().length == 2) {
                data.y = parseInt("20" + data.y);
            }
            data.m = data.m - 1;
            returnDate = new Date(data.y, data.m, data.d);
        }
        if (returnDate == null || isNaN(returnDate)) {
            returnDate = new Date(1900, 0, 1);
        }
        return returnDate;
    };


    /**
     * Date Format
     *
     * @param {string} style date format like 'yyyyMMdd'
     */
    Date.prototype.format = function (style) {
        var o = {
            "M+": this.getMonth() + 1, //month   
            "d+": this.getDate(), //day   
            "h+": this.getHours(), //hour   
            "m+": this.getMinutes(), //minute   
            "s+": this.getSeconds(), //second   
            "w+": "日一二三四五六".charAt(this.getDay()), //week   
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter   
            "S": this.getMilliseconds() //millisecond   
        }
        if (/(y+)/.test(style)) {
            style = style.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(style)) {
                style = style.replace(RegExp.$1, RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return style;
    };


    /**
     * 判断时间是否被选中
     *
     * @param  {number}  timeSta  时间戳
     * @return {Boolean}          是否被选中的结果
     */
    function isSelected(timeSta) {
        var me = this;
        var values = me.data;
        var time = new Date(timeSta);
        if (me.isMultiSelect === true) {
            for (var j = 0, len = values.length; j < len; j++) {
                var item = values[j];
                var itemTime = item.toDate(me.dateFormat).getTime();
                if (Math.abs(time.getTime() - itemTime) < 1000 * 3600 * 24) {
                    return true;
                }
            }
        }
        else {
            me.data = values[0] ? [values[0]] : [];
            var itemTime = values[0] ? values[0].toDate(me.dateFormat).getTime() : 0;
            if (Math.abs(time.getTime() - itemTime) < 1000 * 3600 * 24) {
                return true;
            }
        }
        return false;
    }


    /**
     * 画日期方块
     *
     * @param  {number} year  指定的年份
     * @param  {number} month 指定的月份
     * @return {string}       日期方块的html字符串
     */
    function draw(year, month) {

        var me = this;
        var ddHtml = [];

        var effectiveBegin = me.effectiveRange.begin || new Date().format(me.dateFormat);
        var effectiveEnd = me.effectiveRange.end || me.totalRange.end;

        // 获取本月天数
        var days = new Date(year, month, 0).getDate();

        // 获取本月第一天是周几
        var weekStart = new Date(year, month - 1, 1).getDay();

        // 开头显示空白段
        for (i = 0; i < weekStart; i++) {
            ddHtml.push('<a class="disabled">&nbsp;</a>');
        }

        // 循环显示日期
        for (i = 1; i <= days; i++) {

            var itemTime = (month - 1 < 0)
                ? new Date(year - 1, 11, i).getTime()
                : new Date(year, month - 1, i).getTime();

            var beginTime = effectiveBegin.toDate(me.dateFormat).getTime();
            var endTime = effectiveEnd.toDate(me.dateFormat).getTime();
            var values = me.value;


            if (itemTime < beginTime || itemTime > endTime) {
                ddHtml.push('<a class="ui-calendar-unit disabled" data-time=' + itemTime + '>' + i + '</a>');
            }
            else {
                ddHtml.push(''
                    + '<a class="ui-calendar-unit' + (isSelected.call(me, itemTime) ? ' selected' : '') + '" '
                    + 'data-time=' + itemTime + '>' + i + '</a>'
                );
            }
        }

        return ddHtml.join('');
    }


    /**
     * 初始化整个日历控件的结构
     *
     * @return {String} html string
     */
    function initStructure() {
        var me = this;
        return ''
            + '<div '
            +     'class="ui-calendar-wapper ' + (!me.isDoubleMonth ? 'ui-calendar-wapper-single' : '')  + '" '
            +     'id="' + me.id + '" '
            + '></div>';
    }


    /**
     * 日历控件的构造函数
     */
    function Carlendar() {
        this.init.apply(this, arguments);
    }


    /**
     * 初始化控件
     *
     * @param  {Object} opts 初始化的参数
     */
    Carlendar.prototype.init = function (opts) {

        var me = this;
        var now = new Date();

        me.id = 'ui_calendar_' + (UUID++);

        // 临时展现数据
        me.data = [];

        me.options = {

            // 控件的外层容器， 初始化必填项
            container: null,

            // 是否是双月展现
            isDoubleMonth: false,

            // 是否支持多选
            isMultiSelect: false,

            // 是否带有展示选中结果的面板
            hasPannel: false,

            // 是否含有切换月份功能
            hasSlide: true,

            // 基准年份
            year: now.getFullYear(),

            // 基准月份
            month: now.getMonth() + 1,

            // 国际化
            languages: {
                'years': {
                    'en': ["&nbsp;&nbsp;"],
                    'zh': ["年",]
                },
                'weeks': {
                    'en': ["S", "M", "T", "W", "T", "F", "S"],
                    'zh': ["日", "一", "二", "三", "四", "五", "六"]
                },
                'weekdays': {
                    'en': ["Today", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    'zh': ["今天", '周日', '周一', '周二', '周三', '周四', '周五', '周六']
                },
                'months': {
                    'en': ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    'zh': ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                },
                'btns': {
                    'en': ["Cancel", 'Sure'],
                    'zh': ["取消", '确定']
                }
            },

            // 选择语言，目前只支持中文(zh)和英文(en)
            language: 'zh',

            // 时间的format
            dateFormat: 'yyyy-MM-dd',

            // 有效时间范围
            effectiveRange: {},

            // 选择完日期的回调函数
            onSelected: function () {},

            // 确认生效的日期数据
            value: []

        };

        var options = $.extend({}, me.options, opts);

        for (var p in options) {
            if (options.hasOwnProperty(p) && me.options.hasOwnProperty(p)) {
                me[p] = options[p];
            }
        }

        if (me.language != 'en' && me.language != 'zh') {
            me.language = 'zh';
        }

        for (var i = 0, len = me.value.length; i < len; i++) {
            me.data[i] = me.value[i];
        }

        delete me.options;

        // 总体时间范围
        me.totalRange = {
            begin: new Date(1900, 0, 1).format(me.dateFormat),
            end: new Date(2100, 0, 1).format(me.dateFormat)
        };

        //$(me.container).append(initStructure.call(me));
        $('body').append(initStructure.call(me));
        $(me.container).append(''
            + '<input type="text" readonly="readonly" placeHolder="请选择日期"/>'
            + '<span class="ui-calendar-icon"><i class="ui-calendar-iconfont">&#xe603;</i></span>'
            + '<span class="ui-calendar-label"></span>'
        );
        me.wapper = $('#' + me.id)[0];
        $(me.wapper).on('selectstart', function () {
            return false;
        });

        if (!me.isMultiSelect) {
            me.value = [me.value[0]];
        }

        me.showFlag = false;
        me.render(me.year, me.month);
        me.renderLable();
        me.isMultiSelect && me.renderPannel();
        bindEvent.call(me);
    };


    /**
     * 渲染label
     */
    Carlendar.prototype.renderLable = function () {
        var me = this;
        var label = $(me.container).find('.ui-calendar-label');
        var con = '';

        if (!me.isMultiSelect && me.value[0]) {
            con = (me.value[0] == new Date().format(me.dateFormat))
                ? me.languages['weekdays'][me.language][0]
                : me.languages['weekdays'][me.language][me.value[0].toDate(me.dateFormat).getDay() + 1]
        }

        if (me.isMultiSelect && me.value.length > 0) {
            if (me.value.length == 1) {
                con = (me.value[0] == new Date().format(me.dateFormat))
                    ? me.languages['weekdays'][me.language][0]
                    : me.languages['weekdays'][me.language][me.value[0].toDate(me.dateFormat).getDay() + 1]
            }
            else {
                con = '…';
            }
        }
        label.html(con);
    };



    /**
     * 渲染浮层
     *
     * @param  {number} year  指定的年份
     * @param  {number} month 指定的月份
     */
    Carlendar.prototype.render = function (year, month) {

        var me = this;
        var nextMonth;
        var weeks = me.languages.weeks[me.language];
        var months = me.languages.months[me.language];
        var years = me.languages.years[me.language];
        var btns = me.languages.btns[me.language];
        var html;

        var limitBeginYear = me.totalRange.begin.toDate(me.dateFormat).getFullYear();
        var limitEndYear = me.totalRange.end.toDate(me.dateFormat).getFullYear();

        year = (year < limitBeginYear) ? limitBeginYear : year;
        year = (year > limitEndYear - 1) ? limitEndYear - 1 : year;
        month = month < 1 ? 1 : month;
        month = month > 12 ? 12 : month;
        nextMonth = month + 1

        var navHtml = ''
            + '<div class="ui-calendar-nav clearfix">'
            +     '<span><strong>' + weeks[0] + '</strong></span>'
            +     '<span>' + weeks[1] + '</span>'
            +     '<span>' + weeks[2] + '</span>'
            +     '<span>' + weeks[3] + '</span>'
            +     '<span>' + weeks[4] +'</span>'
            +     '<span>' + weeks[5]+ '</span>'
            +     '<span><strong>' + weeks[6] + '</strong></span>'
            + '</div>';

        var pannelHtml
            = '<div class="ui-calendar-pannel ' + (me.isDoubleMonth ? '' : 'ui-calendar-pannel-single') + '"></div>';

        var btnsHtml = ''
            + '<div class="ui-calendar-btns">'
            +     '<span class="ui-calendar-cancel">' + btns[0] + '</span>'
            +     '<span class="ui-calendar-sure">' + btns[1] + '</span>'
            + '</div>';

        var slideBtnHtml = ''
            + '<div class="slide-btn slide-btn-left ui-left-logo"><i class="ui-calendar-iconfont"></i></div>'
            + '<div class="slide-btn slide-btn-right ui-right-logo"><i class="ui-calendar-iconfont"></i></div>';

        var html = '<div class="ui-calendar-con clearfix">' + (me.hasSlide ? slideBtnHtml : '');

        if (me.isDoubleMonth) {
            html += ''
            + '<div class="ui-calendar-item ui-calendar-item-left">'
            +     '<div class="ui-calendar-header">'
            +         '<span class="ui-calendar-item-year">' + (month > 12 ? year + 1 : year) + years[0] + '</span>'
            +         '<em> '
            +              months[(month > 12 ? month % 12 : month) - 1]
            +         '</em>'
            +     '</div>'
            +     navHtml
            +     '<div class="ui-calendar-main clearfix">'
            +         draw.call(me, year, month)
            +     '</div>'
            + '</div>'
            + '<div class="ui-calendar-item ui-calendar-item-right">'
            +     '<div class="ui-calendar-header">'
            +         (nextMonth > 12 ? ('<span class="ui-calendar-item-year">' + (year + 1) + years[0] + '</span>') : '')
            +         '<em> '
            +              months[(nextMonth > 12 ? nextMonth % 12 : nextMonth) - 1]
            +         '</em>'
            +         (me.isMultiSelect ? '<span class="ui-calendar-item-label">*可多选</span>' : '')
            +     '</div>'
            +      navHtml
            +     '<div class="ui-calendar-main">'
            +         (nextMonth > 12
                ? draw.call(me, year + (nextMonth / 12), nextMonth % 12)
                : draw.call(me, year, nextMonth))
            +     '</div>'
            + '</div>';
        }
        else {
            html += ''
            + '<div class="ui-calendar-item ui-calendar-item-single">'
            +     '<div class="ui-calendar-header">'
            +         year + years[0]
            +         '<em> ' + months[month - 1] + '</em>'
            +         (me.isMultiSelect ? '<span class="ui-calendar-item-label">*可多选</span>' : '')
            +     '</div>'
            +      navHtml
            +     '<div class="ui-calendar-main clearfix">'
            +         draw.call(me, year, month)
            +     '</div>'
            + '</div>';
        }

        html += '</div>' + (me.hasPannel && me.isMultiSelect ? pannelHtml : '') + (me.isMultiSelect ? btnsHtml : '');
        $(me.wapper).html(html);
        me.value = me.value.sort(sortNumber);
        $(me.container).find('input').val((me.value.length > 1 ? (me.value[0] + ' …') : me.value));
    };

    function sortNumber(a, b) {
        if (typeof a === 'string' && typeof b === 'string') {
            a = new Date(a).getTime();
            b = new Date(b).getTime();
        }
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        return 0;
    }

    /**
     * 设置浮层与控件之间的position关系
     */
    function setPosition() {
        var me = this;
        var $container = $(me.container);
        var position = $container.offset();
        var height = $container.height();

        me.wapper.style.top = (position.top + height + 1) + 'px';
        me.wapper.style.left = position.left + 'px';
    }


    /**
     * 判断祖先元素是不是包含某个类
     *
     * @param  {Object}  tar dom对象
     * @param  {string}  cln 类名
     * @return {boolean}     判断结果
     */
    function hasClass(tar, cln) {

        var me = this;

        while (tar !== me.wapper) {
            if ($(tar).hasClass(cln)) {
                return true;
            }
            else {
                if (tar) {
                    tar = tar.parentNode;
                }
                else {
                    return false;
                }
            }
        }
        return false;
    }

    function isParent(a, b) {
        var temp = $(b).parents();
        if (a === b) {
            return true;
        }
        for (var i = 0, l = temp.length; i < l; i++) {
            if (temp[i] === a) {
                return true
            }
        }
        return false;
    }


    function deleteItem(arr, item) {
        var newarr = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] != item) {
                newarr.push(arr[i]);
            }
        }
        return newarr;
    }


    /**
     * 绑定事件
     */
    function bindEvent() {

        var me = this;

        // 给整个控件浮层的事件代理
        $(me.wapper).on('click', function (e) {

            var tar = e.target

            // 如果点击左导航按钮
            if (hasClass.call(me, tar, 'slide-btn-left')) {
                if (--me.month === 0) {
                    --me.year;
                    me.month = 12;
                }
                me.render(me.year, me.month);
                me.isMultiSelect && me.renderPannel();
            }

            // 如果点击右导航按钮
            else if (hasClass.call(me, tar, 'slide-btn-right')) {
                if (++me.month > 12) {
                    ++me.year;
                    me.month = 1;
                }
                me.render(me.year, me.month);
                me.isMultiSelect && me.renderPannel();
            }

            // 如果点击的是日期块区域
            else if (hasClass.call(me, tar, 'ui-calendar-unit')) {

                $tar = $(tar);
                var time = new Date($tar.data('time')).format(me.dateFormat);

                if (me.isMultiSelect) {
                    if ($tar.hasClass('selected')) {
                        $tar.removeClass('selected');
                        me.data = deleteItem(me.data, time);
                    }
                    else if (!$tar.hasClass('disabled')) {
                        $tar.addClass('selected');
                        me.data.push(time);
                    }
                    me.renderPannel();
                }
                else {
                    if (!$tar.hasClass('disabled')) {
                        $(me.wapper).find('.ui-calendar-unit').removeClass('selected');
                        $tar.addClass('selected');
                        me.data = [time];
                        me.onSelected();
                    }
                    else {
                        return false;
                    }
                }

                var label = $(me.container).find('.ui-calendar-label');
                var con = '';
                if (me.isMultiSelect && me.data.length > 0) {
                    if (me.data.length == 1) {
                        con = (me.data[0] == new Date().format(me.dateFormat))
                            ? me.languages['weekdays'][me.language][0]
                            : me.languages['weekdays'][me.language][me.data[0].toDate(me.dateFormat).getDay() + 1]
                    }
                    else {
                        con = '…';
                    }
                }
                label.html(con);
                !me.isMultiSelect && me.hide();
            }

            // 如果点击的是确认按钮
            else if (hasClass.call(me, tar, 'ui-calendar-sure')) {
                me.value = [];

                for (var i = 0, len = me.data.length; i < len; i++) {
                    me.value[i] = me.data[i];
                }
                me.onSelected();
                me.hide();
            }

            // 如果点击的是取消按钮
            else if (hasClass.call(me, tar, 'ui-calendar-cancel')) {
                me.data = [];

                for (var i = 0, len = me.value.length; i < len; i++) {
                    me.data[i] = me.value[i];
                }
                me.hide();
            }

            // 各种交互之后，同步一下展现框中的内容
            var tmp = me.data.sort(sortNumber);
            $(me.container).find('input').val((tmp.length > 1 ? (tmp[0] + ' …') : tmp));
        });


        // 给整个空件的事件代理
        $(me.container).on('click', function (e) {
            var tar = e.target

            if (me.container === tar) {
                return false;
            }

            if (tar.tagName.toLowerCase() === 'input'
                || hasClass.call(me, tar, 'ui-calendar-icon')
                || hasClass.call(me, tar, 'ui-calendar-label')
            ) {
                setTimeout(function () {
                    setPosition.call(me);
                }, 20);
                if (!me.showFlag) {
                    me.show()
                }
                else {
                    for (var i = 0, len = me.data.length; i < len; i++) {
                        me.value[i] = me.data[i];
                    }
                    me.onSelected();
                    me.hide();
                }
            }
        });

        // 失去焦点的时候
        $(document).on('click', function (e) {
            var tar = e.target

            if (!hasClass.call(me, tar, 'slide-btn') && !hasClass.call(me, tar, 'ui-calendar-iconfont')) {
                if (!(isParent(me.container, tar)
                    || isParent(me.wapper, tar)
                    )) {
                    // for (var i = 0, len = me.data.length; i < len; i++) {
                    //     me.value[i] = me.data[i];
                    // }
                    me.hide();
                }
            }
        });
    }


    /**
     * 适配pannel的展现数据
     *
     * @param  {Array} dates  日期列表
     * @return {Object}       pannel所需的格式化数据
     */
    function adaptPannelData(dates) {
        var me = this;
        var obj = {};

        for (var i = 0, len = dates.length; i < len; i++) {
            var date = dates[i];
            var date = dates[i].toDate(me.dateFormat);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            if (!obj[year]) {
                obj[year] = {};
            }
            if (!obj[year][month]) {
                obj[year][month] = [];
            }
            obj[year][month].push(+day);
        }
        return obj;
    }


    /**
     * 渲染预览pannel区域
     */
    Carlendar.prototype.renderPannel = function () {

        var me = this;
        var dates = me.data;
        var pannelWapper = $(me.wapper).find('.ui-calendar-pannel');
        var html = '';
        var obj = adaptPannelData.call(me, dates);

        var monthText = me.languages['months'][me.language];
        var yearText = me.languages['years'][me.language]

        for (var year in obj) {
            html += '<div class="ui-calendar-pannel-item clearfix">';
            html += '<div class="ui-calendar-pannel-year"><span>' + year + yearText[0] + '</span></div>';
            html += '<div class="ui-calendar-pannel-month ' + (me.isDoubleMonth ? '' : 'ui-calendar-pannel-month-single') + '">';
            for (var month in obj[year]) {
                html += ['<div class="ui-calendar-pannel-month-item clearfix">',
                    '<div class="ui-calendar-pannel-month-name"><span>' + monthText[month - 1] + '</span></div>',
                    '<div class="ui-calendar-pannel-dates ' + (me.isDoubleMonth ? '' : 'ui-calendar-pannel-dates-single') + '">'
                ].join('');
                var days = obj[year][month];
                days = days.sort(sortNumber);
                for (var i = 0, len = days.length; i < len; i++) {
                    html += '<span>' + days[i] + '</span>';
                }
                html += '</div></div>';
            }
            html += '</div></div>';
        }
        pannelWapper.html(html);
        if (pannelWapper.height() > 120) {
            pannelWapper.css({
                height: '120px',
                overflowY: 'scroll'
            });
        }
    }


    /**
     * 展现日历控件浮层
     */
    Carlendar.prototype.show = function () {
        var me = this;
        $(me.wapper).fadeIn('fast');
        me.showFlag = true;
    };


    /**
     * 隐藏日历控件浮层
     */
    Carlendar.prototype.hide = function () {

        var me = this;
        $(me.wapper).fadeOut('fast');

        if (me.isMultiSelect) {
            me.render(me.year, me.month);
            me.renderPannel();
        }
        else {
            me.value[0] = me.data[0];
        }
        me.renderLable();

        me.showFlag = false;
    };


    /**
     * 得到日历控件当前的值
     *
     * @return {Array}  本日历控件返回的值都是以日期字符串数组的形式返回，不管是单选还是多选。如果需要其他格式数据，自行适配
     */
    Carlendar.prototype.getValue = function () {
        return this.isMultiSelect ? this.value: this.value[0];
    };


    /**
     * 设置值(可以setValue的参数是Date对象， format之后的字符串， format之后的字符串数组)
     *
     * @param {string<Date.format()>|Object<Date>|array<string>} value  要设置的值
     */
    Carlendar.prototype.setValue = function (value) {

        var me = this;
        var now = new Date();
        var efbt = me.effectiveRange.begin
            ? me.effectiveRange.begin.toDate(me.dateFormat).getTime()
            : now.getTime() - (3600000 * 24);
        var efet = me.effectiveRange.end
            ? me.effectiveRange.end.toDate(me.dateFormat).getTime()
            : new Date(2099, 11, 31).getTime();

        if (value) {
            if (isArray(value)) {
                me.value = uniqArray($.merge(me.value, value));
                me.value = me.isMultiSelect ? me.value : [me.value[me.value.length - 1]];
            }
            else if (typeof value == 'object' && value instanceof Date) {
                if (value.getTime() > efbt && value.getTime() < efet) {
                    value = value.format(me.dateFormat);
                    me.value = me.isMultiSelect ? uniqArray($.merge(me.value, [value])) : [value];
                }
            }
            else if (typeof value === 'string') {
                if (value.toDate(me.dateFormat).getTime() > efbt && value.toDate(me.dateFormat).getTime() < efet) {
                    me.value = me.isMultiSelect ? uniqArray($.merge(me.value, [value])) : [value];
                }
            }

            me.data = [];
            for (var i = 0, len = me.value.length; i < len; i++) {
                me.data[i] = me.value[i];
            }

            me.render(me.year, me.month);
            me.isMultiSelect && me.renderPannel();
            $(me.container).find('input').val((me.value.length > 1 ? (me.value[0] + ' …') : me.value));
        }
    };

    if (typeof exports === 'object' && typeof module === 'object') { // cmd
        exports = module.exports = Carlendar;
    }
    else if (typeof define === 'function' && define.amd) {// amd
        define(Carlendar);
    }
    else {
        root.Carlendar = Carlendar; // script tag
    }

    return Carlendar;

})(this);
