/**
 * @Desc 工具/公共方法文件
 * @Date 2018-09-17 00:53:21
 * @Author qitian
 */

/**************************************************************工具方法*************************************************************/

/**
 * @Desc 时间戳格式转换(fmt:时间格式化)
 * new Date(value).Format("yyyy-MM-dd")
 */
Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * @Desc XSS攻击
 */
let HtmlEncode = function (str) {
    if (!str) {
        return str;
    }
    let hex = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
    let preescape = str;
    let escaped = "";
    for (let i = 0; i < preescape.length; i++) {
        let p = preescape.charAt(i);
        escaped = escaped + escapeCharx(p);
    }

    return escaped;

    function escapeCharx(original) {
        let found = true;
        let thechar = original.charCodeAt(0);
        switch (thechar) {
            case 10:
                return "<br/>";
                break; //newline
            case 32:
                return "&nbsp;";
                break; //space
            case 34:
                return "&quot;";
                break; //"
            case 38:
                return "&amp;";
                break; //&
            case 39:
                return "&#x27;";
                break; //'
            case 47:
                return "&#x2F;";
                break; // /
            case 60:
                return "&lt;";
                break; //<
            case 62:
                return "&gt;";
                break; //>
            case 198:
                return "&AElig;";
                break;
            case 193:
                return "&Aacute;";
                break;
            case 194:
                return "&Acirc;";
                break;
            case 192:
                return "&Agrave;";
                break;
            case 197:
                return "&Aring;";
                break;
            case 195:
                return "&Atilde;";
                break;
            case 196:
                return "&Auml;";
                break;
            case 199:
                return "&Ccedil;";
                break;
            case 208:
                return "&ETH;";
                break;
            case 201:
                return "&Eacute;";
                break;
            case 202:
                return "&Ecirc;";
                break;
            case 200:
                return "&Egrave;";
                break;
            case 203:
                return "&Euml;";
                break;
            case 205:
                return "&Iacute;";
                break;
            case 206:
                return "&Icirc;";
                break;
            case 204:
                return "&Igrave;";
                break;
            case 207:
                return "&Iuml;";
                break;
            case 209:
                return "&Ntilde;";
                break;
            case 211:
                return "&Oacute;";
                break;
            case 212:
                return "&Ocirc;";
                break;
            case 210:
                return "&Ograve;";
                break;
            case 216:
                return "&Oslash;";
                break;
            case 213:
                return "&Otilde;";
                break;
            case 214:
                return "&Ouml;";
                break;
            case 222:
                return "&THORN;";
                break;
            case 218:
                return "&Uacute;";
                break;
            case 219:
                return "&Ucirc;";
                break;
            case 217:
                return "&Ugrave;";
                break;
            case 220:
                return "&Uuml;";
                break;
            case 221:
                return "&Yacute;";
                break;
            case 225:
                return "&aacute;";
                break;
            case 226:
                return "&acirc;";
                break;
            case 230:
                return "&aelig;";
                break;
            case 224:
                return "&agrave;";
                break;
            case 229:
                return "&aring;";
                break;
            case 227:
                return "&atilde;";
                break;
            case 228:
                return "&auml;";
                break;
            case 231:
                return "&ccedil;";
                break;
            case 233:
                return "&eacute;";
                break;
            case 234:
                return "&ecirc;";
                break;
            case 232:
                return "&egrave;";
                break;
            case 240:
                return "&eth;";
                break;
            case 235:
                return "&euml;";
                break;
            case 237:
                return "&iacute;";
                break;
            case 238:
                return "&icirc;";
                break;
            case 236:
                return "&igrave;";
                break;
            case 239:
                return "&iuml;";
                break;
            case 241:
                return "&ntilde;";
                break;
            case 243:
                return "&oacute;";
                break;
            case 244:
                return "&ocirc;";
                break;
            case 242:
                return "&ograve;";
                break;
            case 248:
                return "&oslash;";
                break;
            case 245:
                return "&otilde;";
                break;
            case 246:
                return "&ouml;";
                break;
            case 223:
                return "&szlig;";
                break;
            case 254:
                return "&thorn;";
                break;
            case 250:
                return "&uacute;";
                break;
            case 251:
                return "&ucirc;";
                break;
            case 249:
                return "&ugrave;";
                break;
            case 252:
                return "&uuml;";
                break;
            case 253:
                return "&yacute;";
                break;
            case 255:
                return "&yuml;";
                break;
            case 162:
                return "&cent;";
                break;
            case '\r':
                break;
            default:
                found = false;
                break;
        }
        if (!found) {
            if (thechar > 127) {
                let c = thechar;
                let a4 = c % 16;
                c = Math.floor(c / 16);
                let a3 = c % 16;
                c = Math.floor(c / 16);
                let a2 = c % 16;
                c = Math.floor(c / 16);
                let a1 = c % 16;
                return "&#x" + hex[a1] + hex[a2] + hex[a3] + hex[a4] + ";";
            }
            else {
                return original;
            }
        }
    }
}
let JavaScriptEncode = function (str) {

    let hex = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');

    function changeTo16Hex(charCode) {
        return "\\x" + charCode.charCodeAt(0).toString(16);
    }

    function encodeCharx(original) {

        let found = true;
        let thecharchar = original.charAt(0);
        let thechar = original.charCodeAt(0);
        switch (thecharchar) {
            case '\n':
                return "\\n";
                break; //newline
            case '\r':
                return "\\r";
                break; //Carriage return
            case '\'':
                return "\\'";
                break;
            case '"':
                return "\\\"";
                break;
            case '\&':
                return "\\&";
                break;
            case '\\':
                return "\\\\";
                break;
            case '\t':
                return "\\t";
                break;
            case '\b':
                return "\\b";
                break;
            case '\f':
                return "\\f";
                break;
            case '/':
                return "\\x2F";
                break;
            case '<':
                return "\\x3C";
                break;
            case '>':
                return "\\x3E";
                break;
            default:
                found = false;
                break;
        }
        if (!found) {
            if (thechar > 47 && thechar < 58) { //数字
                return original;
            }

            if (thechar > 64 && thechar < 91) { //大写字母
                return original;
            }

            if (thechar > 96 && thechar < 123) { //小写字母
                return original;
            }

            if (thechar > 127) { //大于127用unicode
                let c = thechar;
                let a4 = c % 16;
                c = Math.floor(c / 16);
                let a3 = c % 16;
                c = Math.floor(c / 16);
                let a2 = c % 16;
                c = Math.floor(c / 16);
                let a1 = c % 16;
                return "\\u" + hex[a1] + hex[a2] + hex[a3] + hex[a4] + "";
            }
            else {
                return changeTo16Hex(original);
            }

        }
    }

    let preescape = str;
    let escaped = "";
    let i = 0;
    for (i = 0; i < preescape.length; i++) {
        escaped = escaped + encodeCharx(preescape.charAt(i));
    }
    return escaped;
}

/**
 * @Desc 简易反转义方法
 */
function EncodetoHtml(str) {
    return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
        return {
            '&lt;': '<',
            '&amp;': '&',
            '&quot;': '"',
            '&gt;': '>',
            '&#39;': "'",
            '&nbsp;': ' '
        }[m]
    }) : '';
}
let formsth;let poptip;
(function(){
    /**
     * @Desc 表单工具类
     * @Date 2018-09-18 15:21:43
     * @Author qitian
     */
    let Formsth = function (){};
    /**
     * @Desc 最大输入字符
     * @Param num 最大输入字符数
     */
    Formsth.prototype.limitLength = function (num, t_this) {
        let value = t_this.value;
        if (value.length > num) t_this.value = value.slice(0, num);
    }
    /**
     * @Desc 限制文本框只能输入数字
     */
    Formsth.prototype.onlyNum = function (t_this) {
        let value = t_this.value;
        let reg = /^[1-9]\d*$/;
        if (!reg.test(value)) {
            t_this.value = value.substr(0, t_this.value.length - 1);
        }
    }
    /**
     * @Desc 文件控件清空
     */
    Formsth.prototype.clearFile = function (t_this) {
        let $input = t_this.outerHTML;
        $('#'+t_this.id).replaceWith($input);
    }
    /**
     * @Desc 表单输入框提示验证
     */
    Formsth.prototype.checkItem = function (t_this){
        let regex = $(t_this).attr('regex');
        let notNull = $(t_this).hasClass('not-null');
        let value = t_this.value;
        let warn;
        switch (t_this.type){
            case 'text':default:
            warn = $(t_this).next('.alert-warn');
            if(value){
                if(regex && !REGEX[regex].test(value)){
                    warn.html(INPUT_ALERT.account);
                    warn.show();
                    return false;
                }else{
                    warn.html('');
                    warn.hide();
                    return true;
                }
            }else if(notNull){
                warn.html(INPUT_ALERT.notNull);
                warn.show();
                return false;
            }else{
                warn.html('');
                warn.hide();
                return true;
            }
            break;
            case 'radio':
                warn = $(t_this).parent().parent().next('.alert-warn');
                if(notNull){
                    let radios = $(t_this).parent().parent().find('input[name="'+t_this.name+'"]');
                    let unpassCount = 0;
                    radios.each(function (index,item) {
                        if(!item.checked){
                            unpassCount++;
                        }
                    })
                    if(unpassCount === radios.length){
                        warn.html(INPUT_ALERT.notNull);
                        warn.show();
                        return false;
                    }else{
                        warn.html('');
                        warn.hide();
                        return true;
                    }
                }else{
                    warn.html('');
                    warn.hide();
                    return true;
                }
                break;
        }

        $(_this).on('input',function(){
            warn.html('');
            warn.hide();
        })
    }
    /**
     * @Desc 表单输入，保存按钮验证
     * @Param formId 主要用于遍历need-check项，可以是模态框最外层id，也可以是form标签的id等
     */
    Formsth.prototype.checkItems = function (formId){
        let checkItems = $('#'+formId).find('.need-check');
        let passCount = checkItems.length;
        checkItems.each(function(index,item){
            if(!formsth.checkItem(item)){
                passCount --;
            }
        });
        if(passCount !== checkItems.length){
            return false;
        }else{
            return true;
        }
    }
    /**
     * @Desc 弹出框
     * @Param
     * @Date 2018-09-13 13:41:25
     * @Author qitian
     */
    let Poptip = function(){
        this.yes;
        this.calcel;
        this.state;//0：提示，1：确认
    };
    Poptip.prototype.getEl = function(){
        let $el;
        let id = this.state === 0 ? '#alert-modal' : '#confirm-modal';
        if($(id).length === 0){
            $el = $(id, parent.document);
        }else{
            $el = $(id);
        }
        return $el;
    }
    Poptip.prototype.close = function(){
        let $el = this.getEl();
        $el.modal('hide');
    }
    Poptip.prototype.alert = function (content){
        this.state = 0;
        if(!this.getEl().hasClass('fade')){
            poptip.close();
        }
        let $el = this.getEl();
        let _this = this;
       // $el.find('h4').html('提示');
        $el.find('.form-horizontal').html('<h4>'+content+'</h4>');
        //$el.find('.alert-yes').bind('click',function(){poptip.close()});
        //$el.find('.alert-cancel').hide();
        //$el.find('.close').show();
        $el.modal('show');
    }
    Poptip.prototype.confirm = function(obj){
        this.state = 1;
        if(!this.getEl().hasClass('fade')){
            poptip.close();
        }
        let $el = this.getEl(1);
        //$el.find('h4').html('<i class="fa fa-question-circle" aria-hidden="true"></i>');
        $el.find('.form-horizontal').html('<h4>'+obj.content+'</h4>');
        //$el.find('.alert-cancel').show();
        //$el.find('.close').hide();
        $el.find('.alert-yes').bind('click',obj.yes);
        $el.find('.alert-cancel').bind('click',obj.cancel);
        $el.modal('show');
    }
    formsth = new Formsth();
    poptip = new Poptip();
    $('.need-check').each(function(index,item){
        if(item.type === 'text'){
            $(item).bind('blur',function(){formsth.checkItem(item)})
        }else{
            $(item).bind('change',function(){formsth.checkItem(item)})
        }
    });
    $('.only-num').each(function(index,item){
        $(item).bind('input',function(){formsth.onlyNum(item)})
    });
    $('.save-check').each(function(index,item){
        let $onclick = item.onclick;
        $(item).removeAttr('onclick');
        let formId = $(item).attr('check-area');
        $(item).bind('click',function(){
            if(formsth.checkItems(formId) && $onclick){
                $onclick();
            }
        })
    });
    /*可拖动模态框*/
   /* $(function(){
        let _move=false;//移动标记
        let _x,_y;//鼠标离控件左上角的相对位置
        let _dragZone = $(".drag-modal .modal-header");
        let _dragBody = _dragZone.parent().parent().parent();
        _dragZone.mousedown(function(e){
            $(this).attr("onselectstart", "return false"); //禁双击选中
            $("body").css({"-webkit-user-select":"none", "-moz-user-select":"none", "-ms-user-select":"none", "-khtml-user-select":"none", "user-select":"none"}); //禁止选中文字
            _move=true;
            _x=e.pageX-parseInt(_dragBody.css("left"));
            _y=e.pageY-parseInt(_dragBody.css("top"));
            _dragBody.fadeTo(150, 0.5);
        });
        $(document).mousemove(function(e){
            if(_move){
                let x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
                let y=e.pageY-_y;
                if(e.pageX <= 0 || e.pageY <= 0){
                    _move=false;
                }else {
                    let pageW = $(window).width();
                    let pageH = $(window).height();
                    let dialogW = _dragBody.width();
                    let dialogH = _dragBody.height() / 2;
                    let maxX = pageW - dialogW;       //X轴可拖动最大值
                    let maxY = pageH - dialogH;       //Y轴可拖动最大值
                    let minX = dialogW - pageW;
                    let minY = dialogH - pageH;
                    x = Math.min(Math.max(minX,x),maxX);     //X轴可拖动范围
                    y = Math.min(Math.max(minY,y),maxY);     //Y轴可拖动范围
                    _dragBody.css({left:x, top:y});//控件新位置
                }
            }
        }).mouseup(function(){
            _move=false;
            _dragBody.fadeTo("fast", 1);
            $("body").removeAttr("style"); //移除不能选文字
        });
        $('.drag-modal').on('show.bs.modal', function () {
            setTimeout(function(){
                $('.modal-backdrop').each(function(index,item){
                    $(item).remove();
                })
                $('.modal-backdrop',parent.document).each(function(index,item){
                    $(item).remove();
                })
            },500)
        });
    });*/
})()
/**************************************************************工具方法结束*************************************************************/
/**************************************************************公共方法*************************************************************/
/**
 * @Desc 嵌套页面高度自适应
 * @Date 2018-09-18 10:30:46
 * @Author qitian
 */
$(function(){
    $('.content-left .nav-tabs a').on('click',function(e){
        setTimeout(function(){
            initHeight($('body').attr('id'),$(e.currentTarget).attr('href'));
        },100)
    })
    /*$('.sidebar-nav .nav-tabs li').on('click',function(e){
        if($(e.currentTarget).attr('go') && $(e.currentTarget).attr('name')){
            setTimeout(function(){
                initHeightF($('#'+$(e.currentTarget).attr('name')).contents().find('body').attr('id'),$('#'+$(e.currentTarget).attr('name')).contents()[0]);
            },1000)
        }
    })*/
});
/*function initHeightF (childBodyId, childDoc) {
    let contentHeight =  $('.content-center').css('height').split('px');
    let htmlHeight = childDoc.body.clientHeight;
    if(contentHeight && htmlHeight){
        if(parseFloat(contentHeight[0]) > htmlHeight){
            $('#'+childBodyId).css('height', parseFloat(contentHeight[0]) + 'px');
        }else{
            $('#'+childBodyId).css('height', htmlHeight + 'px');
        }
    }
}*/
function initHeight(bodyId,thisId) {
    if(thisId && thisId !== '#'){
        let contentHeight =  $(''+ thisId + '').css('height').split('px');
        let htmlHeight = $('html').css('height').split('px');
        if(contentHeight && htmlHeight){
            if(parseFloat(contentHeight[0]) > parseFloat(htmlHeight[0])){
                let height = calcPageHeight(document);
                $('#'+bodyId).css('height', height + 'px');
            }else{
                $('#'+bodyId).css('height', $('html').css('height'));
            }
        }
    }else{
        let height = calcPageHeight(document);
        $('#'+bodyId).css('height', height + 'px');
    }



}

function calcPageHeight(doc) {
    let cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
    let sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight)
    let height  = Math.max(cHeight, sHeight)
    return height
}
/**************************************************************公共方法结束*************************************************************/


