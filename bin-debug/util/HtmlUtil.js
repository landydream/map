var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HtmlUtil = (function () {
    function HtmlUtil() {
    }
    /**检测字符串是否含有Html标签 */
    HtmlUtil.isHtml = function (str) {
        var reg = /<[^>]+>/g;
        if (reg.test(str)) {
            return true;
        }
        else {
            return false;
        }
    };
    HtmlUtil.createLink = function (text, color, size, bUnderline, url) {
        if (color === void 0) { color = "#FFFFFF"; }
        if (size === void 0) { size = 12; }
        if (bUnderline === void 0) { bUnderline = true; }
        if (url === void 0) { url = 'My'; }
        var link = "";
        if (bUnderline) {
            link += "<u>";
            link += "<a href='event:" + url + "' color='" + color + "'>" + text + "</a>";
            link += "</u>";
            //<u><a href=event:'' color='#FFFFF'></a></u>
        }
        else {
            link += "<a href='event:" + url + "'>" + text + "</a>";
        }
        return link;
    };
    //<font color='#ffe400'> </font>
    HtmlUtil.font = function (content, color, size) {
        if (size === void 0) { size = 12; }
        return "<font color='" + color + "' size='" + size + "'>" + content + "</font>";
    };
    HtmlUtil.fontColorList = function (contents, colors) {
        var text = "";
        for (var i = 0; i < contents.length; i++) {
            text += HtmlUtil.fontNoSize(contents[i], colors[i]);
        }
        return HtmlUtil.HTMLPARSER.parser(text);
    };
    HtmlUtil.link = function (content, event) {
        return "<a href='event:" + event + "'>" + content + "</a>";
    };
    HtmlUtil.underLine = function (content) {
        return "<u>" + content + "</u>";
    };
    HtmlUtil.fontNoSize = function (content, color) {
        return "<font color='" + color + "'>" + content + "</font>";
    };
    HtmlUtil.br = function (content) {
        return "<br>" + content + "</br>";
    };
    HtmlUtil.bold = function (content) {
        return "<b>" + content + "</b>";
    };
    HtmlUtil.getRequest = function (url) {
        var theRequest = {};
        var index = url.indexOf("?");
        if (theRequest && index != -1) {
            var str = url.substr(index + 1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                var kv = strs[i].split("=");
                theRequest[kv[0]] = kv[1];
            }
        }
        return theRequest;
    };
    HtmlUtil.HTMLPARSER = new egret.HtmlTextParser();
    return HtmlUtil;
}());
__reflect(HtmlUtil.prototype, "HtmlUtil");
//# sourceMappingURL=HtmlUtil.js.map