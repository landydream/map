class Vo_Player {
	public constructor() {
	}
	/** 玩家唯一ID */
	public id: number;
	/** 玩家名字 */
	public name: string;
	/** 主角色等级 */
	public level: number;
	/** 主角色职业 */
	public job: number;
	/**性别 */
	public sex: number;
	/** 总战力 */
	public str: number;
	/**当前经验 */
	public exp: number = 0;
	/** vip等级 */
	public viplv = 0;
	/**月卡 */
	public monthCard = 0;
	/**周卡 */
	public weekCard = 0;
	/**帮会id */
	public gangId: number;
	/**帮会名称 */
	public gangName: string;
	/**结婚类型 0为未结婚 */
	public isMarry: number;
	/**伴侣名称 */
	public fereName: string;
	/**自己是否妻子 1是夫君 2妻子*/
	public isWife: number;

	/**战斗属性 */
	public voAttr: Vo_FightAttr;
	public voPet: Vo_Pet;
	/**仙侣 */
	public voXianLv: Vo_XianLv;
	/**经脉 */
	public voJingMai: Vo_JingMai;

	/**位置的数据角色Vo_Pos(包过装备、强化、宝石等等) */
	public posData = {};
	/**保存另外系统额外的装备 */
	public extraEquip = {};
	/**培养系统的数据Vo_Culture key=系统id */
	public cultureData = {};
	/**保存部件外观 key=part类型*/
	public partsData = {};

	/** 用来保存玩家所操作的场景单位 */
	public sceneChars = {};
	/**法宝数据 */
	public fabaoPosData = {};

	public parseDetail(bytes: BaseBytes) {
		// var self = this;
		// self.id = bytes.readLong();
		// self.name = bytes.readUTF();
		// self.level = bytes.readShort();
		// self.exp = bytes.readLong();
		// self.job = bytes.readByte();
		// self.viplv = bytes.readByte();
		// self.str = bytes.readLong();
	}

	public parseAttr(bytes: BaseBytes) {
		var self = this;
		if (!this.voAttr) {
			this.voAttr = Vo_FightAttr.create();
		}
		//I:生命I:攻击I:防御I:攻速I:暴击率I:抵抗暴击率I:暴伤增加I:暴伤减免I:伤害增加I:伤害减免I:PVP伤害加成I:PVP伤害减免I:伤害增加万分比I:伤害减免万分比I:闪避I:命中I:PVE伤害加成I:PVE伤害减免
		this.voAttr.setAttr(Enum_Attr.HP_MAX, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.ATTACK, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.DEFENSE, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.ATTACK_SPEED, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.CRIT, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.RESCRIT, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.CRIT_ADD, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.CRIT_REDUCE, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.DMG_ADD_VALUE, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.DMG_REDUCE_VALUE, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.PVP_DMG_ADD, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.PVP_DMG_REDUCE, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.DMG_ADD, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.DMG_REDUCE, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.ADV, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.HIT, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.PVE_DMG_ADD, bytes.readInt());
		this.voAttr.setAttr(Enum_Attr.PVE_DMG_REDUCE, bytes.readInt());
	}

	public parseOtherUnit(bytes: BaseBytes) {
	}

	public updateChars() {
	}

	public getParts(type: number) {
		if (this.partsData[type]) {
			return this.partsData[type];
		}
		return 0;
	}

	public setParts(type: number, val) {
		if (this.partsData[type] == val) {
			return;
		}
		this.partsData[type] = val;
		if (type <= UnitConst.KEY_TIANXIAN_ID) {
			this.updateParts();
		}
	}

	/**获取部件 */
	public getPart(type: number) {
		var val = 0;
		if (this.partsData[type]) {
			val = this.partsData[type];
		}
		return val;
	}

	public updateParts(): void {
		var role: SceneCharRole = this.getCharRole(0);
		if (!role) {
			return;
		}
		var rideing = this.getParts(UnitConst.KEY_HORSE) > 0;
		// role.setBody(GameGlobal.modelFashion.getFashionModel(this.getParts(UnitConst.KEY_BODY), this.sex, this.job, rideing));
		role.setBody(1000);
		role.setHorse(CultureHelp.getModel(UIConst.RIDE, this.getParts(UnitConst.KEY_HORSE)));
		role.setWing(CultureHelp.getModel(UIConst.WING, this.getParts(UnitConst.KEY_WING)));
		if (rideing) role.setWeapon(CultureHelp.getModel(UIConst.SHENBING, this.getParts(UnitConst.KEY_WEAPON), this.job, -1, this.sex));
		role.setTianXian(CultureHelp.getModel(UIConst.TIANXIAN, this.getParts(UnitConst.KEY_TIANXIAN_ID), this.job));
		role.setTitle(CultureHelp.getTitleSource(this.getParts(UnitConst.KEY_TITLE)));
		//this.getParts(UnitConst.KEY_TITLE)

		// role.setBody(1301);
		// role.setHorse(6001);
		// role.setWing(6401);
		// role.setWeapon(6501);
	}

	/**获取位置的数据 pos位置重0开始 */
	public getPosData(pos: number): Vo_Pos {
		var vo: Vo_Pos = this.posData[pos];
		if (!vo) {
			this.posData[pos] = vo = Vo_Pos.create(pos);
		}
		return vo;
	}

	/**更加装备类型获取装备数据,每种装备只能装备一个 */
	public getEquipByType(type: number): Vo_Equip {
		var vo: Vo_Equip;
		// if (Model_Equip.isEquip(type)) {
		// 	vo = this.getPosData(type - 1).equip;
		// } else {
		// 	vo = this.extraEquip[type];
		// }
		return vo;
	}

	/**获取对于培养系统的数据 */
	// public getCulture(funId: number): Vo_Culture {
		// if (!this.cultureData[funId]) {
		// 	this.cultureData[funId] = new Vo_Culture();
		// }
		// return this.cultureData[funId];
	// }

	/**获取仙侣数据 id=0是获取全部数据*/
	public getXianLvVo(id = 0) {
		if (!this.voXianLv) {
			this.voXianLv = new Vo_XianLv();
		}
		if (id == 0) {
			return this.voXianLv;
		}
		return this.voXianLv.getVo(id);
	}

	public getPet(id = 0) {
		if (!this.voPet) {
			this.voPet = new Vo_Pet();
		}
		if (!id) {
			return this.voPet;
		}
		return this.voPet.getVo(id);
	}

	public getJingMai() {
		if (!this.voJingMai) {
			this.voJingMai = new Vo_JingMai();
		}
		return this.voJingMai;
	}

	/**获取sceneCharRole 0主角 1宠物 2仙侣 */
	public getCharRole(type: number) {
		return this.sceneChars[type];
	}

	public clean() {
	}


}