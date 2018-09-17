/**
 * @Desc 工具方法文件
 * @Date 2018-09-17 00:53:21
 * @Author qitian
 */

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
 * @Desc
 * @Param num 最大输入字符数
 * @Date 2018-08-28 16:24:53
 * @Author qitian
 */
function checkTypeNum(num, t_this) {
    let value = t_this.value;
    if (value.length > num) t_this.value = value.slice(0, num);
}

/**
 * @Desc 限制文本框只能输入数字
 */
function keyUpTypeNum(t_this) {
    let value = t_this.value;
    let reg = /^[1-9]\d*$/;
    if (!reg.test(value)) {
        t_this.value = value.substr(0, t_this.value.length - 1);
    }
}

/**
 * @Desc 文件控件清空
 * @Param id 控件id
 * @Date 2018-09-12 16:41:22
 * @Author qitian
 */
function cleanFileInput (id) {
    let $input = document.getElementById(id).outerHTML;
    $('#'+id).replaceWith($input);
}

/**
 * @Desc 表单输入框提示验证
 * @Param
 * @Date 2018-09-16 23:12:19
 * @Author qitian
 */
function checkThisItem(_this){
    let regex = $(_this).attr('regex');
    let notNull = $(_this).hasClass('not-null');
    let value = _this.value;
    let warn;
    switch (_this.type){
        case 'text':default:
            warn = $(_this).next('.alert-warn');
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
            warn = $(_this).parent().parent().next('.alert-warn');
            if(notNull){
                let radios = $(_this).parent().parent().find('input[name="'+_this.name+'"]');
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
 * @Date 2018-09-16 23:53:54
 * @Author qitian
 */
function checkFormItems(modalId){
    let checkItems = $('#'+modalId).find('.need-check');
    let passCount = checkItems.length;
    checkItems.each(function(index,item){
        if(checkThisItem(item)){
            passCount --;
        }
    });
    if(passCount === 0){
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


