var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtil = (function () {
    function MathUtil() {
    }
    MathUtil.rndNum = function (min, max) {
        return min + Math.random() * (max - min);
    };
    MathUtil.rndLength = function (dir, length, min, max) {
        if (dir == 1) {
            var left = length - min;
            return left + min + Math.random() * (max - min);
        }
        else {
            var left = min - length;
            return left - min + Math.random() * (min - max);
        }
    };
    MathUtil.getPosValue = function (start, end, rate) {
        var value = start + rate * (end - start);
        value = end > start ? (value > end ? end : value) : (value < end ? end : value);
        return value;
    };
    //注意 这个距离没有开平方根
    MathUtil.distance = function (px1, py1, px2, py2) {
        var gx = px1 - px2;
        var gy = py1 - py2;
        var dis = gx * gx + gy * gy;
        return dis;
    };
    /**阿拉伯数字转换中文数字　只能转换到999 */
    MathUtil.toCNUpper = function (num) {
        var str = "";
        if (num < 10) {
            str = this.NUM_CN[num];
        }
        else {
            if (num < 100) {
                var two = (num / 10) >> 0;
                var one = num % 10;
                if (two > 1) {
                    str = this.NUM_CN[two];
                }
                str += this.UNITS[0] + (one > 0 ? this.NUM_CN[one] : "");
            }
            else if (num < 1000) {
                var three = (num / 100) >> 0;
                var two = ((num % 100) / 10) >> 0;
                str = this.NUM_CN[three] + this.UNITS[1];
                var s = num % 100;
                if (s > 0) {
                    str += (two < 2 ? this.NUM_CN[two] : "") + this.toCNUpper(s);
                }
            }
            else {
                str = num + "";
            }
        }
        return str;
    };
    MathUtil.NUM_CN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    MathUtil.UNITS = ["十", "百", "千", "万"];
    return MathUtil;
}());
__reflect(MathUtil.prototype, "MathUtil");
//# sourceMappingURL=MathUtil.js.map