class Color {
	public constructor() {
	}
	public static disabled = [new egret.ColorMatrixFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0])];
	// public static BLACKBORDER: Array<egret.Filter> = [new egret.GlowFilter(0, 1, 1, 1)];

	public static QUALITYCOLOR = [0x858585, 0x858585, 0x12d11f, 0x33aaff, 0xeb5fe4, 0xff902a, 0xff4040, 0xff4040, 0xff4040];
	public static QUALITYCOLORH = ["#858585", "#858585", "#12d11f", "#33aaff", "#eb5fe4", "#ff902a", "#ff4040", "#ff4040", "#ff4040"];
	public static QUALITYTEXT = ["", "白", "绿", "蓝", "紫", "金", "红", "七彩", "七彩", "七彩"];

	public static YELLOWINT = 0xffea00;
	public static GREYINT = 0x928F8A;
	public static GREENINT = 0x00B300;
	public static REDINT = 0xCC0000;
	public static BLURINT = 0x37c9ff;
	public static TEXTINT = 0x806346;
	public static ORANGEINT = 0xffa500;

	public static PURE_YELLOWSTR = "#ffff00";
	public static YELLOWSTR = "#ffea00";
	public static GREENSTR = "#00B300";
	public static BLUESTR = "#37C9FF";
	public static ORANGESTR = "#ffa500";
	public static REDSTR = "#CC0000";
	public static TEXTSTR = "#806346"; //字体
	public static TEXT_WHITE = "#858585"; //字体 白色

	/**白色 */
	public static WHITE = 1;
	/**绿色 */
	public static GREEN = 2;
	/**蓝色 */
	public static BLUE = 3;
	/**紫色 */
	public static PURPLE = 4;
	/**橙色 */
	public static ORANGE = 5;
	/**红色 */
	public static RED = 6;
	/**七彩 */
	public static QC = 7;

	public static getColorInt(color: number): number {
		var cl = 0xFFFFFF;
		if (Color.QUALITYCOLOR.length > color) {
			cl = Color.QUALITYCOLOR[color];
		}
		return cl;
	}

	public static getColorStr(color: number): string {
		var str = "#FFFFFF";
		if (Color.QUALITYCOLORH.length > color) {
			str = Color.QUALITYCOLORH[color];
		}
		return str;
	}

	/**获取颜色深度 0-2  0是没有颜色  1是原来的颜色*/
	public static getColorDep(N): any {
		return [new egret.ColorMatrixFilter(
			[0.3086 * (1 - N) + N, 0.6094 * (1 - N), 0.082 * (1 - N), 0,
				0, 0.3086 * (1 - N), 0.6094 * (1 - N) + N, 0.082 * (1 - N),
				0, 0, 0.3086 * (1 - N), 0.6094 * (1 - N), 0.082 * (1 - N) + N,
				0, 0, 0, 0, 0, 1, 0])];
	}
	//前三颜色不同
	public static colorArr = [0xFF902A, 0xEB5FE4, 0x33AAFF];
	public static getRankColorInt(rank: number) {
		let color = 0x5B472E;
		if (rank <= 3)
			color = Color.colorArr[rank - 1];
		return color;
	}
	//金 木 水 火 土
	public static wxColorArr = [0xfff700, 0x00ff00, 0x00a8ff, 0xff4040, 0xff00ff];
	public static getWxColorInt(type: number) {
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
	}
}