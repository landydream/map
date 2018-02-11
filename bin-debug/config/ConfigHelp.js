var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ConfigHelp = (function () {
    function ConfigHelp() {
    }
    /**获取字符串的字节长度 汉字是两个字节 */
    ConfigHelp.getStrByteLen = function (str) {
        var len = str.replace(/[^x00-xFF]/g, '**').length;
        return len;
    };
    /**获取道具装备名次 */
    ConfigHelp.getItemName = function (id, isColor, format) {
        if (isColor === void 0) { isColor = true; }
        if (format === void 0) { format = ""; }
        var name = "";
        var q;
        if (Config.ITEM[id]) {
            name = Config.ITEM[id].name;
            q = Config.ITEM[id].quality;
        }
        else if (Config.EQUIP[id]) {
            name = Config.EQUIP[id].n;
            q = Config.EQUIP[id].q;
        }
        else if (Config.FABAO[id]) {
            name = Config.FABAO[id].mz;
            q = Config.FABAO[id].pz;
        }
        else {
            return id;
        }
        name += format;
        if (isColor) {
            // name = "<font color='" + Color.QUALITYCOLOR[q] + "'>" + name + "</font>";
            name = ConfigHelp.getTextByQuality(name, q);
        }
        return name;
    };
    /**根据品质给文本添加颜色 */
    ConfigHelp.getTextByQuality = function (text, quality) {
        var str = "";
        if (quality >= Color.QC) {
            var q = Color.RED;
            for (var i = 0, len = text.length; i < len; i++) {
                if (q < Color.BLUE) {
                    q = Color.RED;
                }
                str += "<font color='" + Color.QUALITYCOLOR[q] + "'>" + text.charAt(i) + "</font>";
                q -= 1;
            }
        }
        else {
            str = "<font color='" + Color.QUALITYCOLOR[quality] + "'>" + text + "</font>";
        }
        return str;
    };
    ConfigHelp.getItemQuality = function (id) {
        var q = 0;
        if (Config.ITEM[id]) {
            q = Config.ITEM[id].quality;
        }
        else if (Config.EQUIP[id]) {
            q = Config.EQUIP[id].q;
        }
        else if (Config.FABAO[id]) {
            q = Config.FABAO[id].pz;
        }
        return q;
    };
    /**保留两位小数点 */
    ConfigHelp.getYiWanText = function (v) {
        if (v > 100000000) {
            if ((v % 100000000) >= 1000000) {
                return (v / 100000000).toFixed(2) + "亿";
            }
            return (v / 100000000).toFixed(0) + "亿";
        }
        else if (v > 100000) {
            if ((v % 10000) >= 100) {
                return (v / 10000).toFixed(2) + "万";
            }
            return (v / 10000).toFixed() + "万";
        }
        return String(v);
    };
    /**保留1位小数点 */
    ConfigHelp.getYiWanText1 = function (v) {
        if (v > 100000000) {
            if ((v % 100000000) >= 10000000) {
                return (v / 100000000).toFixed(1) + "亿";
            }
            return (v / 100000000).toFixed(0) + "亿";
        }
        else if (v > 100000) {
            if ((v % 10000) >= 1000) {
                return (v / 10000).toFixed(1) + "万";
            }
            return (v / 10000).toFixed() + "万";
        }
        return String(v);
    };
    /**
   * 匹配
   * @param src
   * @param param
   * @return
   */
    ConfigHelp.reTxt = function (src) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var len = param.length;
        if (len == 0)
            return src;
        for (var i = 0; i < len; i++) {
            var d = param[i];
            src = src.replace(ConfigHelp.getPattern(i), d);
        }
        return src;
    };
    ConfigHelp.getPattern = function (index) {
        var ret = ConfigHelp._patternBuffer[index];
        if (ret == null) {
            var rg = "[{{]" + index.toString() + "[}}]";
            ret = ConfigHelp._patternBuffer[index] = new RegExp(rg, "g");
        }
        return ret;
    };
    /**解析属性 */
    ConfigHelp.makeAttrText = function (content, gap, attrformat, xishu, color) {
        if (gap === void 0) { gap = "\n"; }
        if (attrformat === void 0) { attrformat = "   +"; }
        if (xishu === void 0) { xishu = 1; }
        return ConfigHelp.makeAttrTextHelp(1, content, gap, attrformat, xishu, color);
    };
    ConfigHelp.makeAttrText_2 = function (content, gap, attrformat, xishu, color) {
        if (gap === void 0) { gap = "\n"; }
        if (attrformat === void 0) { attrformat = "   +"; }
        if (xishu === void 0) { xishu = 1; }
        return ConfigHelp.makeAttrTextHelp(2, content, gap, attrformat, xishu, color);
    };
    /**
     * @param t 1---- 气血  +100
     * @param t 2---- +100  气血
     */
    ConfigHelp.makeAttrTextHelp = function (t, content, gap, attrformat, xishu, color) {
        if (gap === void 0) { gap = "\n"; }
        if (attrformat === void 0) { attrformat = "   +"; }
        var info = content.split(";");
        var attr;
        var ret = "";
        for (var i = 0; i < info.length; i++) {
            if (i != 0) {
                ret += gap;
            }
            attr = info[i].split(",");
            var attName = ConfigHelp.getAttrName(attr[0]);
            var type = ConfigHelp.getAttLeiXing(attr[0]);
            var num = Math.floor(Number(attr[1]) * xishu);
            if (type == 2) {
                if (color) {
                    ret += HtmlUtil.fontNoSize(attrformat + num / 100 + "%", color) + attName;
                }
                else {
                    ret += attrformat + num / 100 + "%" + attName;
                }
                // if (t == 1)
                // else
                // 	ret += attrformat + num / 100 + "%" + attName;
            }
            else {
                if (color) {
                    var str = HtmlUtil.fontNoSize(num + "", color);
                }
                else {
                    str = num + "";
                }
                if (t == 1)
                    ret += attName + attrformat + str;
                else
                    ret += attrformat + str + attName;
            }
        }
        return ret;
    };
    /**数组奖励解析[[1,4001,2],[2,90010,1]]*/
    ConfigHelp.makeServerItemList = function (info) {
        var list = [];
        var vo;
        for (var i = 0; i < info.length; i++) {
            vo = ConfigHelp.makeServerItem(info[i]);
            if (vo) {
                list.push(vo);
            }
        }
        return list;
    };
    /**解析一个奖励 [1,4001,2]*/
    ConfigHelp.makeServerItem = function (info) {
        var vo;
        var type = parseInt(info[0]);
        var id = parseInt(info[1]);
        var count = parseInt(info[2]);
        if (type == Enum_Attr.ITEM) {
            vo = Vo_Item.create(id);
        }
        else if (type == Enum_Attr.EQUIP) {
            vo = Vo_Equip.create(id);
        }
        else {
            // vo = Vo_Currency.create(type);
        }
        if (vo) {
            vo.count = count;
        }
        return vo;
    };
    /**表奖励解析 1,4001,2;2,90010,1， size显示格子的高宽大*/
    ConfigHelp.makeItemList = function (content, size) {
        var list = [];
        var info = content.split(";");
        var vo;
        for (var i = 0; i < info.length; i++) {
            vo = ConfigHelp.makeItem(info[i], size);
            if (vo) {
                list.push(vo);
            }
        }
        return list;
    };
    /**解析一个奖励 1,4001,2*/
    ConfigHelp.makeItem = function (content, size) {
        var vo;
        var info = content.split(",");
        var type = parseInt(info[0]);
        var id = parseInt(info[1]);
        var count = parseInt(info[2]);
        if (type == Enum_Attr.ITEM) {
            vo = Vo_Item.create(id);
        }
        else if (type == Enum_Attr.EQUIP) {
            vo = Vo_Equip.create(id);
        }
        else {
            // vo = Vo_Currency.create(type);
        }
        if (vo) {
            vo.count = count;
            vo.size = size;
        }
        return vo;
    };
    /**将表奖励解析成字符串 */
    ConfigHelp.makeItemListStr = function (content, gap, attrformat, space) {
        if (gap === void 0) { gap = "\n"; }
        if (attrformat === void 0) { attrformat = "+"; }
        if (space === void 0) { space = " "; }
        var vos = ConfigHelp.makeItemList(content);
        var str = "";
        for (var i = 0; i < vos.length; i++) {
            if (i > 0) {
                str += gap;
            }
            str += attrformat + vos[i].count + space + vos[i].name;
        }
        return str;
    };
    /**解析奖励字符串 例如：道具*99 */
    ConfigHelp.makeItemListStr1 = function (content, color, gap, attrformat) {
        if (color === void 0) { color = true; }
        if (gap === void 0) { gap = "\n"; }
        if (attrformat === void 0) { attrformat = "*"; }
        var list = this.makeItemList(content);
        var str = "";
        for (var i = 0, len = list.length; i < len; i++) {
            if (i != 0) {
                str += gap;
            }
            if (color) {
                str += "<font color='" + list[i].qColor + "'>" + list[i].name + attrformat + list[i].count + "</font>";
            }
            else {
                str += list[i].name + attrformat + list[i].count;
            }
        }
        return str;
    };
    /**获取属性名称 */
    ConfigHelp.getAttrName = function (type) {
        var name = "";
        if (Config.Atrr_LIB[type]) {
            name = Config.Atrr_LIB[type].mc;
        }
        return name;
    };
    /**获取属性类型 */
    ConfigHelp.getAttLeiXing = function (type) {
        var leixing = 0;
        if (Config.Atrr_LIB[type]) {
            leixing = Config.Atrr_LIB[type].leixing;
        }
        return leixing;
    };
    /**将 1,2;1,3 这类字符串转化成整形二维数组*/
    ConfigHelp.splitIntArr = function (str) {
        if (!str) {
            return;
        }
        var ret = str.split(";");
        for (var i = 0, len = ret.length; i < len; i++) {
            var termArr = ret[i].split(",");
            for (var j = 0; j < termArr.length; j++) {
                termArr[j] = parseInt(termArr[j]);
            }
            ret[i] = termArr;
        }
        return ret;
    };
    /**获得提示*/
    ConfigHelp.addSerGainText = function (type, id, withColor, count) {
        if (withColor === void 0) { withColor = true; }
        if (count === void 0) { count = 0; }
        if (type == Enum_Attr.ITEM) {
            var name = Config.ITEM[id].name;
            if (withColor) {
                var color = Color.QUALITYCOLOR[Config.ITEM[id].quality];
            }
        }
        else if (type == Enum_Attr.EQUIP) {
            var name = Config.EQUIP[id].n;
            if (withColor) {
                var color = Color.QUALITYCOLOR[Config.EQUIP[id].q];
            }
        }
        else {
            var name = Config.Atrr_LIB[type].mc;
            if (withColor) {
                var color = Color.QUALITYCOLOR[Config.Atrr_LIB[type].color];
            }
        }
    };
    /**检查需求（道具，货币）是否足够 多个消耗*/
    ConfigHelp.checkConditonEnough = function (content, isMsg) {
        if (isMsg === void 0) { isMsg = false; }
        var info = content.split(";");
        for (var i = 0, len = info.length; i < len; i++) {
            if (ConfigHelp.checkEnough(info[i], isMsg) == false)
                return false;
        }
        return true;
    };
    /**检测需求，一个消耗 */
    ConfigHelp.checkEnough = function (content, isMsg) {
        var info = content.split(",");
        var type = parseInt(info[0]);
        var id = parseInt(info[1]);
        var count = parseInt(info[2]);
        // if (type == Enum_Attr.ITEM) {
        // 	if (GameGlobal.modelBag.getItemCount(id) >= count) {
        // 		return true;
        // 	}
        // 	if (isMsg == true) {
        // 		ViewCommonWarn.text("【" + ConfigHelp.getItemName(id, true) + "】" + "不足");
        // 	}
        // } else if (type == Enum_Attr.EQUIP) {
        // 	ViewCommonWarn.text("装备？？？？");
        // } else {//货币
        // 	if (Model_player.voMine.getMoney(type) >= count) {
        // 		return true;
        // 	}
        // 	if (isMsg == true) {
        // 		ViewCommonWarn.text(ConfigHelp.getAttrName(type) + "不足");
        // 	}
        // }
        return false;
    };
    /**用表中数据填充UI中的viewGrid列表 */
    ConfigHelp.fillGridVo = function (glist, content) {
        var vos = ConfigHelp.makeItemList(content);
        var len = glist.length;
        for (var i = 0; i < len; i++) {
            var grid = glist[i];
            if (vos[i]) {
                grid.vo = vos[i];
                grid.visible = true;
            }
            else {
                grid.visible = false;
            }
        }
    };
    /**检测奖励对应背包格子是否足够，只检查装备 */
    ConfigHelp.checkBagEnough = function (content, isMsg) {
        var list = this.splitIntArr(content);
        var need = 0;
        for (var i = 0, len = list.length; i < len; i++) {
            if (list[i][0] == Enum_Attr.EQUIP) {
                need += list[i][2];
            }
        }
        // if (isMsg) {
        // 	return Model_Bag.checkBagEnough(need);
        // } else {
        // 	var num = GameGlobal.modelBag.getResNum();
        // 	return need <= num;
        // }
        return false;
    };
    ConfigHelp._patternBuffer = [];
    /**计算战力系数 */
    ConfigHelp.StrCaculateDic = {
        "102": 0.5,
        "103": 4,
        "104": 4,
        "105": 100,
        "106": 5,
        "108": 0,
        "107": 5,
        "110": 0,
        "111": 0,
        "112": 0,
        "113": 0,
        "115": 10,
        "116": 10,
        "119": 5,
        "120": 5 //命中
    };
    return ConfigHelp;
}());
__reflect(ConfigHelp.prototype, "ConfigHelp");
//# sourceMappingURL=ConfigHelp.js.map