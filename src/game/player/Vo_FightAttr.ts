/**保存属性 */
class Vo_FightAttr {

	public static voFight: Vo_FightAttr = new Vo_FightAttr();

	/**战斗属性保存 */
	public fightMap: any = {};
	public constructor() {
	}

	/**设置属性 */
	public setAttr(type: number, value: number): void {
		this.fightMap[type] = value;
	}
	/**获取一个属性 */
	public getAttr(type: number): number {
		var value = 0;
		if (this.fightMap[type]) {
			value = this.fightMap[type];
		}
		return value;
	}

	/**累加属性 */
	public addFightValue(type: number, value: number): Vo_FightAttr {
		this.fightMap[type] = this.getAttr(type) + value;
		return this;
	}
	/**根据表配置累加属性 */
	public addFightValueByStr(str: string, percent: number = 1): Vo_FightAttr {
		// let arr = ConfigHelp.splitIntArr(str);
		let arr = [];
		this.addAttrInfo(arr, percent);
		return this;
	}
	/**减去属性 */
	public minusFightValue(type: number, value: number): Vo_FightAttr {
		this.fightMap[type] = this.getAttr(type) - value;
		return this;
	}
	/**根据属性数据增加属性 */
	public addAttrInfo(info: Array<any>, percent: number = 1): Vo_FightAttr {
		if (!info) {
			return this;
		}
		for (var i: number = 0; i < info.length; i++) {
			if (info[i].lenght <= 1) {
				continue;
			}
			var type = parseInt(info[i][0]);
			var value = Math.ceil(parseInt(info[i][1]) * percent);
			this.addFightValue(type, value);
		}
		return this;
	}

	public addFightByMap(map, percent = 1) {
		for(var k in map) {
			this.addFightValue(parseInt(k), map[k]);
		}
	}

	/**获取战斗力值*/
	public getStrength(): number {
		var rs = 0;
		var caculateDic = ConfigHelp.StrCaculateDic;
		var type = 0, value = 0, mul = 0;
		for (var key in this.fightMap) {
			type = parseInt(key);
			value = this.fightMap[key];
			mul = caculateDic[type];
			if (!mul) {
				continue;
			}
			rs += value * mul;
		}
		rs = Math.ceil(rs);
		return rs;
	}

	/**清除属性 */
	public clear(): Vo_FightAttr {
		this.fightMap = {};
		return this;
	}

	public static create(): Vo_FightAttr {
		var vo = new Vo_FightAttr();
		return vo;
	}
}