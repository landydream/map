class ConfigHelp {
	public constructor() {
	}

	/**获取字符串的字节长度 汉字是两个字节 */
	public static getStrByteLen(str: string): number {
		var len = str.replace(/[^x00-xFF]/g, '**').length;
		return len
	}

	/**获取道具装备名次 */
	public static getItemName(id: any, isColor: boolean = true, format = ""): string {
		var name = "";
		var q;
		if (Config.ITEM[id]) {
			name = Config.ITEM[id].name;
			q = Config.ITEM[id].quality;
		} else if (Config.EQUIP[id]) {
			name = Config.EQUIP[id].n;
			q = Config.EQUIP[id].q;
		} else if (Config.FABAO[id]) {
			name = Config.FABAO[id].mz;
			q = Config.FABAO[id].pz;
		} else {
			return id;
		}
		name += format;
		if (isColor) {
			// name = "<font color='" + Color.QUALITYCOLOR[q] + "'>" + name + "</font>";
			name = ConfigHelp.getTextByQuality(name, q);
		}
		return name;
	}

	/**根据品质给文本添加颜色 */
	public static getTextByQuality(text: string, quality) {
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
		} else {
			str = "<font color='" + Color.QUALITYCOLOR[quality] + "'>" + text + "</font>";
		}
		return str;
	}

	public static getItemQuality(id) {
		var q = 0;
		if (Config.ITEM[id]) {
			q = Config.ITEM[id].quality;
		} else if (Config.EQUIP[id]) {
			q = Config.EQUIP[id].q;
		} else if (Config.FABAO[id]) {
			q = Config.FABAO[id].pz;
		}
		return q;
	}

	/**保留两位小数点 */
	public static getYiWanText(v: number): string {
		if (v > 100000000) {
			if ((v % 100000000) >= 1000000) {//大于百万
				return (v / 100000000).toFixed(2) + "亿"
			}
			return (v / 100000000).toFixed(0) + "亿"
		} else if (v > 100000) {
			if ((v % 10000) >= 100) {
				return (v / 10000).toFixed(2) + "万";
			}
			return (v / 10000).toFixed() + "万";
		}
		return String(v);
	}

	/**保留1位小数点 */
	public static getYiWanText1(v: number) {
		if (v > 100000000) {
			if ((v % 100000000) >= 10000000) {//大于千万
				return (v / 100000000).toFixed(1) + "亿"
			}
			return (v / 100000000).toFixed(0) + "亿"
		} else if (v > 100000) {
			if ((v % 10000) >= 1000) {
				return (v / 10000).toFixed(1) + "万";
			}
			return (v / 10000).toFixed() + "万";
		}
		return String(v);
	}

	/**
   * 匹配
   * @param src
   * @param param
   * @return 
   */
	public static reTxt(src: string, ...param): string {
		var len: number = param.length;
		if (len == 0) return src;
		for (var i: number = 0; i < len; i++) {
			var d: string = param[i];
			src = src.replace(ConfigHelp.getPattern(i), d);
		}
		return src;
	}
	private static _patternBuffer: RegExp[] = [];
	public static getPattern(index: number): RegExp {
		var ret: RegExp = ConfigHelp._patternBuffer[index];
		if (ret == null) {
			var rg: string = "[{{]" + index.toString() + "[}}]";
			ret = ConfigHelp._patternBuffer[index] = new RegExp(rg, "g");
		}
		return ret;
	}
	/**解析属性 */
	public static makeAttrText(content: string, gap: string = "\n", attrformat = "   +", xishu: number = 1, color?: string): string {
		return ConfigHelp.makeAttrTextHelp(1, content, gap, attrformat, xishu, color);
	}
	public static makeAttrText_2(content: string, gap: string = "\n", attrformat = "   +", xishu: number = 1, color?: string): string {
		return ConfigHelp.makeAttrTextHelp(2, content, gap, attrformat, xishu, color);
	}
	/**
	 * @param t 1---- 气血  +100  
	 * @param t 2---- +100  气血
	 */
	public static makeAttrTextHelp(t: number, content: string, gap: string = "\n", attrformat = "   +", xishu: number, color?: string): string {
		var info = content.split(";");
		var attr: string[];
		var ret: string = "";
		for (var i = 0; i < info.length; i++) {
			if (i != 0) {
				ret += gap;
			}
			attr = info[i].split(",");
			var attName: string = ConfigHelp.getAttrName(attr[0]);
			var type: number = ConfigHelp.getAttLeiXing(attr[0]);

			let num = Math.floor(Number(attr[1]) * xishu);
			if (type == 2) {
				if (color) {
					ret += HtmlUtil.fontNoSize(attrformat + num / 100 + "%", color) + attName;
				} else {
					ret += attrformat + num / 100 + "%" + attName;
				}
				// if (t == 1)
				// else
				// 	ret += attrformat + num / 100 + "%" + attName;
			} else {
				if (color) {
					var str = HtmlUtil.fontNoSize(num + "", color);
				} else {
					str = num + "";
				}
				if (t == 1)
					ret += attName + attrformat + str;
				else
					ret += attrformat + str + attName;
			}
		}
		return ret;
	}

	/**数组奖励解析[[1,4001,2],[2,90010,1]]*/
	public static makeServerItemList(info): IGridImpl[] {
		var list: IGridImpl[] = [];
		var vo: IGridImpl;
		for (var i = 0; i < info.length; i++) {
			vo = ConfigHelp.makeServerItem(info[i]);
			if (vo) {
				list.push(vo);
			}
		}
		return list;
	}
	/**解析一个奖励 [1,4001,2]*/
	public static makeServerItem(info): IGridImpl {
		var vo: IGridImpl;
		var type = parseInt(info[0]);
		var id = parseInt(info[1]);
		var count = parseInt(info[2]);
		if (type == Enum_Attr.ITEM) {
			vo = Vo_Item.create(id);
		} else if (type == Enum_Attr.EQUIP) {
			vo = Vo_Equip.create(id);
		} else {//货币
			// vo = Vo_Currency.create(type);
		}
		if (vo) {
			vo.count = count;
		}
		return vo;
	}

	/**表奖励解析 1,4001,2;2,90010,1， size显示格子的高宽大*/
	public static makeItemList(content: string, size?: number): IGridImpl[] {
		var list: IGridImpl[] = [];
		var info = content.split(";");
		var vo: IGridImpl;
		for (var i = 0; i < info.length; i++) {
			vo = ConfigHelp.makeItem(info[i], size);
			if (vo) {
				list.push(vo);
			}
		}
		return list;
	}
	/**解析一个奖励 1,4001,2*/
	public static makeItem(content: string, size?: number): IGridImpl {
		var vo: IGridImpl;
		var info = content.split(",");
		var type = parseInt(info[0]);
		var id = parseInt(info[1]);
		var count = parseInt(info[2]);
		if (type == Enum_Attr.ITEM) {
			vo = Vo_Item.create(id);
		} else if (type == Enum_Attr.EQUIP) {
			vo = Vo_Equip.create(id);
		} else {//货币
			// vo = Vo_Currency.create(type);
		}
		if (vo) {
			vo.count = count;
			vo.size = size;
		}
		return vo;
	}
	/**将表奖励解析成字符串 */
	public static makeItemListStr(content: string, gap: string = "\n", attrformat = "+", space: string = " "): string {
		let vos = ConfigHelp.makeItemList(content);
		let str = "";
		for (let i = 0; i < vos.length; i++) {
			if(i > 0) {
				str += gap;
			}
			str += attrformat + vos[i].count + space + vos[i].name;
		}
		return str;
	}
	/**解析奖励字符串 例如：道具*99 */
	public static makeItemListStr1(content: string, color = true, gap = "\n", attrformat = "*") {
		var list = this.makeItemList(content);
		var str = "";
		for (var i = 0, len = list.length; i < len; i++) {
			if(i != 0) {
				str += gap;
			}
			if (color) {
				str += "<font color='" + list[i].qColor + "'>" + list[i].name + attrformat + list[i].count + "</font>";
			} else {
				str += list[i].name + attrformat + list[i].count;
			}
		}
		return str;
	}
	/**获取属性名称 */
	public static getAttrName(type): string {
		var name = "";
		if (Config.Atrr_LIB[type]) {
			name = Config.Atrr_LIB[type].mc;
		}
		return name;
	}

	/**获取属性类型 */
	public static getAttLeiXing(type): number {
		var leixing = 0;
		if (Config.Atrr_LIB[type]) {
			leixing = Config.Atrr_LIB[type].leixing
		}
		return leixing;
	}

	/**将 1,2;1,3 这类字符串转化成整形二维数组*/
	public static splitIntArr(str: string): number[][] {
		if(!str){
			return;
		}
		var ret: any[] = str.split(";");
		for (var i = 0, len = ret.length; i < len; i++) {
			var termArr = ret[i].split(",");
			for (var j = 0; j < termArr.length; j++) {
				termArr[j] = parseInt(termArr[j]);
			}
			ret[i] = termArr;
		}
		return ret;
	}

	/**获得提示*/
	public static addSerGainText(type: number, id: number, withColor: boolean = true, count = 0) {
		if (type == Enum_Attr.ITEM) {//消耗物品
			var name: string = Config.ITEM[id].name;
			if (withColor) {
				var color = Color.QUALITYCOLOR[Config.ITEM[id].quality];
			}
		} else if (type == Enum_Attr.EQUIP) {//装备
			var name: string = Config.EQUIP[id].n;
			if (withColor) {
				var color = Color.QUALITYCOLOR[Config.EQUIP[id].q];
			}
		} else {//货币
			var name: string = Config.Atrr_LIB[type].mc;
			if (withColor) {
				var color = Color.QUALITYCOLOR[Config.Atrr_LIB[type].color];
			}
		}
	}

	/**计算战力系数 */
	public static StrCaculateDic = {
		"102": 0.5,//生命上限
		"103": 4,//攻击力
		"104": 4,//防御
		"105": 100, //攻速
		"106": 5,//暴击
		"108": 0,//暴击伤害
		"107": 5,//抵抗暴击
		"110": 0,//伤害减免
		"111": 0,//伤害加成
		"112": 0,//PVP伤害减免
		"113": 0,//PVP伤害加成
		"115": 10,//无视防御
		"116": 10,//减免无视
		"119": 5,//闪避
		"120": 5 //命中
	};


	/**检查需求（道具，货币）是否足够 多个消耗*/
	public static checkConditonEnough(content: string, isMsg: boolean = false): boolean {
		var info = content.split(";");
		for (var i = 0,len = info.length; i < len; i++) {
			if (ConfigHelp.checkEnough(info[i], isMsg) == false)
				return false;
		}
		return true;
	}

	/**检测需求，一个消耗 */
	public static checkEnough(content: string, isMsg): boolean {
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
	}


	/**用表中数据填充UI中的viewGrid列表 */
	public static fillGridVo(glist, content): void {
		var vos = ConfigHelp.makeItemList(content);
		var len = glist.length
		for (var i: number = 0; i < len; i++) {
			var grid = glist[i];
			if (vos[i]) {
				grid.vo = vos[i];
				grid.visible = true;
			} else {
				grid.visible = false;
			}
		}
	}

	/**检测奖励对应背包格子是否足够，只检查装备 */
	public static checkBagEnough(content: string, isMsg): boolean {
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
		return false
	}
}