var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Color = (function () {
    function Color() {
    }
    Color.getColorInt = function (color) {
        var cl = 0xFFFFFF;
        if (Color.QUALITYCOLOR.length > color) {
            cl = Color.QUALITYCOLOR[color];
        }
        return cl;
    };
    Color.getColorStr = function (color) {
        var str = "#FFFFFF";
        if (Color.QUALITYCOLORH.length > color) {
            str = Color.QUALITYCOLORH[color];
        }
        return str;
    };
    /**获取颜色深度 0-2  0是没有颜色  1是原来的颜色*/
    Color.getColorDep = function (N) {
        return [new egret.ColorMatrixFilter([0.3086 * (1 - N) + N, 0.6094 * (1 - N), 0.082 * (1 - N), 0,
                0, 0.3086 * (1 - N), 0.6094 * (1 - N) + N, 0.082 * (1 - N),
                0, 0, 0.3086 * (1 - N), 0.6094 * (1 - N), 0.082 * (1 - N) + N,
                0, 0, 0, 0, 0, 1, 0])];
    };
    Color.getRankColorInt = function (rank) {
        var color = 0x5B472E;
        if (rank <= 3)
            color = Color.colorArr[rank - 1];
        return color;
    };
    Color.getWxColorInt = function (type) {
        var color = Color.wxColorArr[0];
        switch (type) {
            case Enum_Attr.WXJIN://金
                color = Color.wxColorArr[0];
                break;
            case Enum_Attr.WXMU://木
                color = Color.wxColorArr[1];
                break;
            case Enum_Attr.WXSHUI://水
                color = Color.wxColorArr[2];
                break;
            case Enum_Attr.WXHUO://火
                color = Color.wxColorArr[3];
                break;
            case Enum_Attr.WXTU://土
                color = Color.wxColorArr[4];
                break;
        }
        return color;
    };
    Color.disabled = [new egret.ColorMatrixFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0])];
    // public static BLACKBORDER: Array<egret.Filter> = [new egret.GlowFilter(0, 1, 1, 1)];
    Color.QUALITYCOLOR = [0x858585, 0x858585, 0x12d11f, 0x33aaff, 0xeb5fe4, 0xff902a, 0xff4040, 0xff4040, 0xff4040];
    Color.QUALITYCOLORH = ["#858585", "#858585", "#12d11f", "#33aaff", "#eb5fe4", "#ff902a", "#ff4040", "#ff4040", "#ff4040"];
    Color.QUALITYTEXT = ["", "白", "绿", "蓝", "紫", "金", "红", "七彩", "七彩", "七彩"];
    Color.YELLOWINT = 0xffea00;
    Color.GREYINT = 0x928F8A;
    Color.GREENINT = 0x00B300;
    Color.REDINT = 0xCC0000;
    Color.BLURINT = 0x37c9ff;
    Color.TEXTINT = 0x806346;
    Color.ORANGEINT = 0xffa500;
    Color.PURE_YELLOWSTR = "#ffff00";
    Color.YELLOWSTR = "#ffea00";
    Color.GREENSTR = "#00B300";
    Color.BLUESTR = "#37C9FF";
    Color.ORANGESTR = "#ffa500";
    Color.REDSTR = "#CC0000";
    Color.TEXTSTR = "#806346"; //字体
    Color.TEXT_WHITE = "#858585"; //字体 白色
    /**白色 */
    Color.WHITE = 1;
    /**绿色 */
    Color.GREEN = 2;
    /**蓝色 */
    Color.BLUE = 3;
    /**紫色 */
    Color.PURPLE = 4;
    /**橙色 */
    Color.ORANGE = 5;
    /**红色 */
    Color.RED = 6;
    /**七彩 */
    Color.QC = 7;
    //前三颜色不同
    Color.colorArr = [0xFF902A, 0xEB5FE4, 0x33AAFF];
    //金 木 水 火 土
    Color.wxColorArr = [0xfff700, 0x00ff00, 0x00a8ff, 0xff4040, 0xff00ff];
    return Color;
}());
__reflect(Color.prototype, "Color");
//# sourceMappingURL=Color.js.map