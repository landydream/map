class MathUtil {
	public constructor() {
	}

	public static rndNum(min: number, max: number): number {
		return min + Math.random() * (max - min);
	}

	public static rndLength(dir: number, length: number, min: number, max: number): number {
		if (dir == 1) {
			var left = length - min;
			return left + min + Math.random() * (max - min);
		} else {
			var left = min - length;
			return left - min + Math.random() * (min - max);
		}
	}

	public static getPosValue(start: number, end: number, rate: number) {
		var value: number = start + rate * (end - start);
		value = end > start ? (value > end ? end : value) : (value < end ? end : value);
		return value;
	}

	//注意 这个距离没有开平方根
	public static distance(px1, py1, px2, py2): number {
		var gx = px1 - px2;
		var gy = py1 - py2;
		var dis: number = gx * gx + gy * gy;
		return dis;
	}

	public static NUM_CN = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	public static UNITS = ["十", "百", "千", "万"];
	/**阿拉伯数字转换中文数字　只能转换到999 */
	public static toCNUpper(num: number) {
		var str = "";
		if (num < 10) {
			str = this.NUM_CN[num];
		} else {
			if (num < 100) {
				var two = (num / 10) >> 0;
				var one = num % 10;
				if (two > 1) {
					str = this.NUM_CN[two]
				}
				str += this.UNITS[0] + (one > 0 ? this.NUM_CN[one] : "");
			} else if (num < 1000) {
				var three = (num / 100) >> 0;
				var two = ((num % 100) / 10) >> 0;
				str = this.NUM_CN[three] + this.UNITS[1];
				var s = num % 100;
				if (s > 0) {
					str += (two < 2 ? this.NUM_CN[two] : "") + this.toCNUpper(s);
				}
			} else {
				str = num + "";
			}
		}
		return str;
	}
}