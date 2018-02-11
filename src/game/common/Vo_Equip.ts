class Vo_Equip implements IGridImpl {
	public constructor() {
	}

	cfg: any;
	sid: number = 0;
	id: number;
	quality: number;
	count: number = 1;
	name: string;
	gType: number;
	size: number;
	/**极品属性类型 [[属性类型, 洗练千分比]]*/
	superAttrType: any[];

	private _voExp: Vo_EquipEx;
	set voEx(v: Vo_EquipEx) {
		this._voExp = v;
	}
	get voEx(): Vo_EquipEx {
		return this._voExp;

		// if (this._voExp) {
		// 	return this._voExp;
		// }
		// if (this.sid <= 0) {
		// 	if (Config.EQUIP_EXT[this.id] && Config.EQUIP_EXT[this.id].zd > 0) {//有指定的个数
		// 		this._voExp = Vo_EquipEx.create();
		// 		this._voExp.exRatio = Config.EQUIP_EXT[this.id].zd;
		// 		return this._voExp;
		// 	}
		// 	return null;
		// }
		// return GameGlobal.modelEquip.getEquipEx(this.sid);
	}

	get qColor(): number {
		return Color.QUALITYCOLOR[this.quality];
	}

	/**装备穿戴等级 或者进阶等级进阶表id*/
	get level(): number {
		return this.cfg.lv;
	}

	/**装备部件类型 */
	get type(): number {
		var p: number = this.cfg.part;
		return p;
	}

	/**装备职业 */
	get job(): number {
		var _job = this.cfg.job;
		return _job;
	}

	public initLib(id: number): void {
		this.gType = Enum_Attr.EQUIP;
		this.id = id;
		this.cfg = Config.EQUIP[id];
		if (DEBUG) {
			if (this.cfg == null) {
				throw ("扫码！扫码！奖励有错了！没有装备" + id);
			}
		}
		this.name = this.cfg.n;
		this.quality = this.cfg.q;
	}

	// public getName():string {
	// 	var vo = this.voEx;
	// 	if(vo && vo.exRatio > 0){
	// 		return this.name + "<font color='#FFFF00'>+" + vo.exRatio + "</font>";
	// 	}
	// 	return this.name;
	// }

	public _score: number = 0;
	public _godScore:number;
	/**装备评分*/
	public getScore(): number {
		if (this._score <= 0) {
			var vo = Vo_FightAttr.voFight.clear();
			vo.addAttrInfo(ConfigHelp.splitIntArr(this.cfg.attr));
			var list = this.getExAttr();
			if (list) {
				vo.addAttrInfo(list);
			}
			this._score = vo.getStrength();
		}
		if(!this._godScore) {
			this._godScore = this.getGodAttrPower(false);
		}
		// var score = this._score;
		return this._score + this._godScore;
	}

	/**战斗力 只包过基础属性和额外属性 isGodEquipAdd是否包括神装槽位属性*/
	public getPower(): number {
		this.getScore();
		var power = this._score;
		power += this.getGodAttrPower(true);
		return power;
	}

	/**获取极品属性  isGodEquipAdd是否包括神装槽位属性 */
	public getGodAttrPower(isGodEquipAdd: boolean = true): number {
		var power = 0;
		var self = this;
		// if (GameGlobal.modelGodEquip.judgeGodEquip(this)) {
		// 	if(self.superAttrType) {
		// 		var list = GameGlobal.modelGodEquip.getGodAttrByLev(self.level, self.superAttrType, isGodEquipAdd);
		// 	}else{
		// 		list = GameGlobal.modelGodEquip.getGodEquipAttr(this, null, false, isGodEquipAdd);
		// 	}
		// 	if (list) {
		// 		var vo = Vo_FightAttr.voFight.clear();
		// 		vo.addAttrInfo(list);
		// 		power = vo.getStrength();
		// 	}
		// }
		return power;
	}

	/**获取装备基础属性 */
	public getBaseAttr() {
		// var info = ConfigHelp.splitIntArr(this.cfg.attr);
		var info = '';
		return info;
	}

	public getExAttr(): number[][] {
		var voe = this.voEx;
		if (voe && voe.exRatio > 0) {
			var info = ConfigHelp.splitIntArr(this.cfg.attr);
			var list = [];
			for (var i = 0, len = voe.exRatio; i < len; i++) {
				for (var j = 0, len1 = info.length; j < len1; j++) {
					list.push([info[j][0], Math.ceil(info[j][1] * 0.2)]);
				}
			}
			return list;
		}
		return null;
	}


	/**id装备表id sid装备唯一id */
	public static create(id: number, sid: number = 0): Vo_Equip {
		var vo: Vo_Equip = new Vo_Equip();
		vo.initLib(id);
		vo.sid = sid;
		return vo;
	}
}