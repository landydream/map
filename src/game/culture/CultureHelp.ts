class CultureHelp {
	/**技能更新 参数系统ID */
	public static MSG_CULTURE_SKILL_UPDATE: string = "MSG_CULTURE_SKILL_UPDATE";
	/**皮肤更新 */
	public static MSG_CULTURE_SKIN_UPDATE: string = "MSG_CULTURE_SKIN_UPDATE";
	/**属性丹个数更新 */
	public static MSG_CULTURE_ATTRDRUT_UPATE: string = "MSG_CULTURE_ATTRDRUT_UPATE";

	/**最多使用属性丹个数 */
	public static MAX_ATTRDRUG = 500;

	//*****************************检测**************************** */
	/**检测皮肤是否有提示 */
	public static chekcSkinNotice(funId: number): boolean {
		if (!SystemHelp.isOpenByLev(funId, false)) {//系统等级未开启
			return null;
		}
		// var vo = Model_player.voMine.getCulture(funId);
		// var cfg = this.getSkinLIB(funId);
		// for (var k in cfg) {
		// 	var info = cfg[k];
		// 	if (vo.skin && vo.skin.indexOf(info.id) >= 0) {
		// 		continue;
		// 	}
		// 	var list = ConfigHelp.splitIntArr(info.dj);
		// 	var bag = GameGlobal.modelBag.getItemCount(list[0][1]);
		// 	if (bag >= list[0][2]) {
		// 		return true;
		// 	}
		// }
		return false;
	}


	//*****************************检测**************************** */


	public static getPutOnId(funId: number) {
		var id = this.getPartId(funId);
		return Model_player.voMine.partsData[id];
	}

	//**********************获取表数据*********************** */
	/**获取技能升级表数据 */
	public static getSkillLIB(funId: number) {
		if (funId == UIConst.RIDE) {//坐骑
			return Config.RIDE_SKILL;
		} else if (funId == UIConst.WING) {//翅膀
			return Config.WING_SKILL;
		} else if (funId == UIConst.SHENBING) {//神兵
			return Config.SHENBING_SKILL;
		} else if (funId == UIConst.TIANXIAN) {//天仙
			return Config.TIANXIAN_SKILL;
		} else if (funId == UIConst.FAZHEN) {//法阵
			return Config.FAZHEN_SKILL;
		} else if (funId == UIConst.XIANWEI) {//仙位
			return Config.XIANWEI_SKILL;
		} else if (funId == UIConst.PET_TONGLING) {//通灵
			return Config.TONGLING_SKILL;
		} else if (funId == UIConst.PET_SOUL) {//兽魂
			return Config.SOUL_SKILL;
		} else if (funId == UIConst.TIANNV) {//天女
			return Config.TIANNV_SKILL;
		} else if (funId == UIConst.XIANQI) {//仙器
			return Config.TIANNV_SKILL;
		} else if (funId == UIConst.HUANIAN) {//花辇
			return Config.TIANNV_SKILL;
		} else if (funId == UIConst.LINGQI) {//灵气
			return Config.TIANNV_SKILL;
		}
	}
	/**获取技能激活表 */
	public static getSkillActiveLIB(funId: number) {
		if (funId == UIConst.RIDE) {//坐骑
			return Config.RIDE_SKILL_ACTIVE;
		} else if (funId == UIConst.WING) {//翅膀
			return Config.WING_SKILL_ACTIVE;
		} else if (funId == UIConst.SHENBING) {//神兵
			return Config.SHENBING_SKILL_ACTIVE;
		} else if (funId == UIConst.TIANXIAN) {//天仙
			return Config.TIANXIAN_SKILL_ACTIVE;
		} else if (funId == UIConst.FAZHEN) {//法阵
			return Config.FAZHEN_SKILL_ACTIVE;
		} else if (funId == UIConst.XIANWEI) {//仙位
			return Config.XIANWEI_SKILL_ACTIVE;
		} else if (funId == UIConst.PET_TONGLING) {//通灵
			return Config.TONGLING_SKILL_ACTIVE;
		} else if (funId == UIConst.PET_SOUL) {//兽魂
			return Config.SOUL_SKILL_ACTIVE;
		} else if (funId == UIConst.TIANNV) {//天女
			return Config.TIANNV_SKILL_ACTIVE;
		} else if (funId == UIConst.XIANQI) {//仙器
			return Config.TIANNV_SKILL_ACTIVE;
		} else if (funId == UIConst.HUANIAN) {//花辇
			return Config.TIANNV_SKILL_ACTIVE;
		} else if (funId == UIConst.LINGQI) {//灵气
			return Config.TIANNV_SKILL_ACTIVE;
		}
	}

	/**获取进阶表 */
	public static getCultureLIB(funId) {
		if (funId == UIConst.RIDE) {//坐骑
			return Config.RIDE_CULTURE;
		} else if (funId == UIConst.WING) {//翅膀
			return Config.WING_CULTURE;
		} else if (funId == UIConst.SHENBING) {//神兵
			return Config.SHENBING_CULTURE;
		} else if (funId == UIConst.TIANXIAN) {//天仙
			return Config.TIANXIAN_CULTURE;
		} else if (funId == UIConst.FAZHEN) {//法阵
			return Config.FAZHEN_CULTURE;
		} else if (funId == UIConst.XIANWEI) {//仙位
			return Config.XIANWEI_CULTURE;
		} else if (funId == UIConst.PET_TONGLING) {//通灵
			return Config.TONGLING_CULTURE;
		} else if (funId == UIConst.PET_SOUL) {//兽魂
			return Config.SOUL_CULTURE;
		} else if (funId == UIConst.TIANNV) {//天女
			return Config.TIANNV_CULTURE;
		} else if (funId == UIConst.XIANQI) {//仙器
			return Config.TIANNV_XIANQI;
		} else if (funId == UIConst.HUANIAN) {//花辇
			return Config.TIANNV_HUANIAN;
		} else if (funId == UIConst.LINGQI) {//灵气
			return Config.TIANNV_LINGQI;
		}
	}
	/**获取皮肤表 */
	public static getSkinLIB(funId) {
		if (funId == UIConst.RIDE) {//坐骑
			return Config.RIDE_SKIN;
		} else if (funId == UIConst.WING) {//翅膀
			return Config.WING_SKIN;
		} else if (funId == UIConst.SHENBING) {//神兵
			return Config.SHENBING_SKIN;
		} else if (funId == UIConst.TIANXIAN) {//天仙
			return Config.TIANXIAN_SKIN;
		} else if (funId == UIConst.FASHION) {//时装
			return Config.FASHION
		} else if (funId == UIConst.TIANNV) {//天女
			return Config.TIANNV_SKIN
		}
	}
	//***************************************************** */


	//*****************************获取道具ID */
	/**获取直升一阶丹的id */
	public static getZSDrugId(funId: number): number {
		if (funId == UIConst.RIDE) {//坐骑
			return 4414;
		} else if (funId == UIConst.WING) {//翅膀
			return 4444;
		} else if (funId == UIConst.SHENBING) {//神兵
			return 4434;
		} else if (funId == UIConst.TIANXIAN) {//天仙
			return 4424;
		} else if (funId == UIConst.FAZHEN) {//法阵
			return 4454;
		} else if (funId == UIConst.XIANWEI) {//仙位
			return 4464;
		} else if (funId == UIConst.PET_TONGLING) {//通灵
			return 4474;
		} else if (funId == UIConst.PET_SOUL) {//兽魂
			return 4484;
		} else if (funId == UIConst.TIANNV) {//天女
			return 4494;
		} else if (funId == UIConst.XIANQI) {//仙器
			return 4504;
		} else if (funId == UIConst.HUANIAN) {//花辇
			return 4514;
		} else if (funId == UIConst.LINGQI) {//灵气
			return 4524;
		}
	}

	/**获取属性丹ID */
	public static getAttrDrugId(funId: number): number {
		if (funId == UIConst.RIDE) {//坐骑
			return 4415;
		} else if (funId == UIConst.WING) {//翅膀
			return 4445;
		} else if (funId == UIConst.SHENBING) {//神兵
			return 4435;
		} else if (funId == UIConst.TIANXIAN) {//天仙
			return 4425;
		} else if (funId == UIConst.FAZHEN) {//法阵
			return 4455;
		} else if (funId == UIConst.XIANWEI) {//仙位
			return 4465;
		} else if (funId == UIConst.PET_TONGLING) {//通灵
			return 4475;
		} else if (funId == UIConst.PET_SOUL) {//兽魂
			return 4485;
		} else if (funId == UIConst.TIANNV) {//天女
			return 4495;
		} else if (funId == UIConst.XIANQI) {//仙器
			return 4505;
		} else if (funId == UIConst.HUANIAN) {//花辇
			return 4515;
		} else if (funId == UIConst.LINGQI) {//灵气
			return 4525;
		}
	}

	/**获取对于系统的技能书 */
	public static getSkillBookId(funId: number): number {
		if (funId == UIConst.RIDE) {//坐骑
			return 4416;
		} else if (funId == UIConst.WING) {//翅膀
			return 4446;
		} else if (funId == UIConst.SHENBING) {//神兵
			return 4436;
		} else if (funId == UIConst.TIANXIAN) {//天仙
			return 4426;
		} else if (funId == UIConst.FAZHEN) {//法阵
			return 4456;
		} else if (funId == UIConst.XIANWEI) {//仙位
			return 4466;
		} else if (funId == UIConst.PET_TONGLING) {//通灵
			return 4476;
		} else if (funId == UIConst.PET_SOUL) {//兽魂
			return 4486;
		} else if (funId == UIConst.TIANNV) {//天女
			return 4496;
		} else if (funId == UIConst.XIANQI) {//仙器
			return 4506;
		} else if (funId == UIConst.HUANIAN) {//花辇
			return 4516;
		} else if (funId == UIConst.LINGQI) {//灵气
			return 4526;
		}
		return 0;
	}

	/**获取百分比进阶丹id */
	public static getExpDrugId(funId): number[] {
		if (funId == UIConst.RIDE) {//坐骑
			return [4413, 5410, 5411, 5412, 5413, 5414, 5415, 5416, 5417, 5418, 5419];
		} else if (funId == UIConst.WING) {//翅膀
			return [4443, 5440, 5441, 5442, 5443, 5444, 5445, 5446, 5447, 5448, 5449];
		} else if (funId == UIConst.SHENBING) {//神兵
			return [4433, 5430, 5431, 5432, 5433, 5434, 5435, 5436, 5437, 5438, 5439];
		} else if (funId == UIConst.TIANXIAN) {//天仙
			return [4423, 5420, 5421, 5422, 5423, 5424, 5425, 5426, 5427, 5428, 5429];
		} else if (funId == UIConst.FAZHEN) {//法阵
			return [4453, 5450, 5451, 5452, 5453, 5454, 5455, 5456, 5457, 5458, 5459];
		} else if (funId == UIConst.XIANWEI) {//仙位
			return [4463, 5460, 5461, 5462, 5463, 5464, 5465, 5466, 5467, 5468, 5469];
		} else if (funId == UIConst.PET_TONGLING) {//通灵
			return [4473, 5470, 5471, 5472, 5473, 5474, 5475, 5476, 5477, 5478, 5479];
		} else if (funId == UIConst.PET_SOUL) {//兽魂
			return [4483, 5480, 5481, 5482, 5483, 5484, 5485, 5486, 5487, 5488, 5489];
		} else if (funId == UIConst.TIANNV) {//天女
			return [4493, 5490, 5491, 5492, 5493, 5494, 5495, 5496, 5497, 5498, 5499];
		} else if (funId == UIConst.XIANQI) {//仙器
			return [4503, 5500, 5501, 5502, 5503, 5504, 5505, 5506, 5507, 5508, 5509];
		} else if (funId == UIConst.HUANIAN) {//花辇
			return [4513, 5510, 5511, 5512, 5513, 5514, 5515, 5516, 5517, 5518, 5519];
		} else if (funId == UIConst.LINGQI) {//灵气
			return [4523, 5520, 5521, 5522, 5523, 5524, 5525, 5526, 5527, 5528, 5529];
		}
		return [];
	}
	//************************************* */
	public static exchangeFunId(funId: number) {
		if (funId == UIConst.XIANQI || funId == UIConst.HUANIAN || funId == UIConst.LINGQI) {
			funId = UIConst.TIANNV;
		}
		return funId;
	}


	public static getPartId(funId: number): number {
		if (funId == UIConst.RIDE) {
			return UnitConst.KEY_HORSE;
		} else if (funId == UIConst.WING) {
			return UnitConst.KEY_WING;
		} else if (funId == UIConst.SHENBING) {
			return UnitConst.KEY_WEAPON;
		} else if (funId == UIConst.TIANXIAN) {
			return UnitConst.KEY_TIANXIAN_ID;
		} else if (funId == UIConst.XIANLV) {
			return UnitConst.KEY_XIANLV_ID;
		} else if (funId == UIConst.FAZHEN) {
			return UnitConst.KEY_FAZHEN;
		} else if (funId == UIConst.XIANWEI) {
			return UnitConst.KEY_XIANWEI;
		} else if (funId == UIConst.PET_TONGLING) {//通灵
			return UnitConst.KEY_TONGLING;
		} else if (funId == UIConst.PET_SOUL) {//兽魂
			return UnitConst.KEY_SOUL;
		} else if (funId == UIConst.TIANNV) {//天女
			return UnitConst.KEY_TIANNV_ID;
		} else if (funId == UIConst.XIANQI) {
			return UnitConst.KEY_XIANQI;
		} else if (funId == UIConst.HUANIAN) {
			return UnitConst.KEY_HUANIAN;
		} else if (funId == UIConst.LINGQI) {
			return UnitConst.KEY_LINGQI;
		} else if (funId == UIConst.TITLE) {
			return UnitConst.KEY_TITLE;
		} else if (funId == UIConst.PET) {
			return UnitConst.KEY_PET_ID;
		}
		return 0;
	}

	public static getPartFunId(id) {
		if (id == UnitConst.KEY_HORSE) {
			return UIConst.RIDE;
		} else if (id == UnitConst.KEY_WING) {
			return UIConst.WING;
		} else if (id == UnitConst.KEY_WEAPON) {
			return UIConst.SHENBING;
		} else if (id == UnitConst.KEY_TIANXIAN_ID) {
			return UIConst.TIANXIAN;
		} else if (id == UnitConst.KEY_XIANLV_ID) {
			return UIConst.XIANLV;
		} else if (id == UnitConst.KEY_FAZHEN) {
			return UIConst.FAZHEN;
		} else if (id == UnitConst.KEY_XIANWEI) {
			return UIConst.XIANWEI;
		} else if (id == UnitConst.KEY_PET_ID) {
			return UIConst.PET;
		} else if (id == UnitConst.KEY_TONGLING) {//通灵
			return UIConst.PET_TONGLING;
		} else if (id == UnitConst.KEY_SOUL) {//兽魂
			return UIConst.PET_SOUL;
		} else if (id == UnitConst.KEY_TIANNV_ID) {
			return UIConst.TIANNV
		} else if (id == UnitConst.KEY_XIANQI) {
			return UIConst.XIANQI;
		} else if (id == UnitConst.KEY_HUANIAN) {
			return UIConst.HUANIAN;
		} else if (id == UnitConst.KEY_LINGQI) {
			return UIConst.LINGQI;
		} else if (id == UnitConst.KEY_TITLE) {
			return UIConst.TITLE;
		} else if (id == UnitConst.KEY_BODY) {
			return UIConst.FASHION;
		}
		return 0;
	}

	/**获取战力 type&1进阶属性 &2装备 &4皮肤 &8属性丹 &16技能 */
	public static getPower(funId: number, showType: number = 0): number {
		// var vo = Model_player.voMine.getCulture(funId);
		// var voFight = Vo_FightAttr.voFight.clear();
		// //进阶属性
		// if (!showType || showType & 1) {
		// 	var cfg = this.getCultureLIB(funId);
		// 	var id = vo.level;
		// 	if (cfg[id]) {
		// 		if (cfg[id].shx) {//等阶属性
		// 			voFight.addAttrInfo(ConfigHelp.splitIntArr(cfg[id].shx));
		// 		}
		// 		//经验属性
		// 		var num = Math.floor(vo.getExp() / 10);
		// 		voFight.addAttrInfo(ConfigHelp.splitIntArr(cfg[id].dc), num);
		// 	}
		// }

		//装备
		// if (!showType || showType & 2) {
		// 	var types = Model_Equip.getTypeByFunId(funId);
		// 	if (types) {
		// 		for (var type of types) {
		// 			var voEquip = Model_player.voMine.getEquipByType(type);
		// 			if (voEquip) {
		// 				voFight.addAttrInfo(voEquip.getBaseAttr());
		// 				voFight.addAttrInfo(voEquip.getExAttr());
		// 				// power += voEquip.getPower();
		// 			}
		// 		}
		// 	}
		// }

		// //已皮肤属性
		// if (!showType || showType & 4) {
		// 	if (vo.skin) {
		// 		cfg = this.getSkinLIB(funId);
		// 		for (var val of vo.skin) {
		// 			voFight.addAttrInfo(ConfigHelp.splitIntArr(cfg[val].shx));
		// 		}
		// 	}
		// }

		// //属性丹
		// if (!showType || showType & 8) {
		// 	if (vo.drug > 0) {
		// 		id = this.getAttrDrugId(funId);
		// 		cfg = Config.ITEM[id];
		// 		voFight.addAttrInfo(ConfigHelp.splitIntArr(cfg.canshu.shuxing), vo.drug);
		// 	}
		// }

		// //技能属性
		// if (!showType || showType & 16) {
		// 	if (vo.skill) {
		// 		cfg = this.getSkillLIB(funId);
		// 		for (var k in vo.skill) {
		// 			id = parseInt(k) * 100 + vo.skill[k];
		// 			if (cfg[id] && cfg[id].shx && cfg[id].shx != "0") {
		// 				voFight.addAttrInfo(ConfigHelp.splitIntArr(cfg[id].shx));
		// 			}
		// 		}
		// 	}
		// }

		// var power = voFight.getStrength();
		// return power;
		return 0;
	}

	/**设置模型 */
	public static setUIRole(uiRole: UIRole, funId: number, mx) {
		if (funId == UIConst.RIDE) {
			uiRole.setHorse(mx);
		} else if (funId == UIConst.WING) {
			uiRole.setWing(mx);
		} else if (funId == UIConst.SHENBING || funId == UIConst.XIANQI) {
			uiRole.setWeapon(mx);
		} else if (funId == UIConst.XIANLV || funId == UIConst.PET
			|| funId == UIConst.FASHION || funId == UIConst.TIANNV) {
			uiRole.setBody(mx);
		} else if (funId == UIConst.TIANXIAN) {
			uiRole.setTianXian(mx);
		} else if (funId == UIConst.FAZHEN || funId == UIConst.PET_TONGLING || funId == UIConst.HUANIAN) {
			uiRole.setGuangHuan(mx);
		} else if (funId == UIConst.XIANWEI || funId == UIConst.TITLE) {
			uiRole.setTitle(mx);
		} else if (funId == UIConst.PET_SOUL) {
			uiRole.setSoul(mx);
		}
	}

	public static getTitleSource(id: number) {
		if (id <= 0) return id;

		if (Config.TITLE[id]) {
			return Config.TITLE[id].zy;
		}
	}

	/**获取宠物系统的模型资源id 
	 * id 宠物   petFly幻化等级0未幻化 1幻化
	*/
	public static getPetModel(id: number = 0,petFly:number = 0){
		if (Config.PET_ACTIVE[id]) {
				if(petFly>0){
					if(Config.PET_FLYUP_PIFU[id]){
						return Config.PET_FLYUP_PIFU[id].MX;
					}
				}
				return Config.PET_ACTIVE[id].mx;
		}
		return id;
	} 

		


	/**获取进阶系统的模型资源id 
	 * 当funId=0时使用partType部件类型来判断
	*/
	public static getModel(funId: number, id: number, job: number = 0, partType: number = -1, sex: number = 0) {
		if (!funId) {
			funId = this.getPartFunId(partType);
		}
		if (funId == UIConst.XIANLV) {//仙侣
			if (Config.XIANLV_ACTIVE[id]) {
				return Config.XIANLV_ACTIVE[id].mx;
			}
		} else if (funId == UIConst.SHENBING) {//神兵模型跟职业有关
			if (id < 1000) {//皮肤模型
				if (Config.SHENBING_SKIN[id]) {
					return Config.SHENBING_SKIN[id].mx;
				}
			} else {//进阶模型
				var lev = Math.floor(id / 1000);
				var index = job * 100 + lev;
				if (Config.SHENBING_MODEL[index]) {
					return Config.SHENBING_MODEL[index].mx;
				}
			}
			//没有武器默认一个/*** 1 剑（人族） 2 枪（仙族) * 3 刀（妖族）*/
			if (job == 1) {
				return sex == 1 ? 6501 : 6502;
			} else if (job == 2) {
				return sex == 1 ? 6521 : 6522;
			} else {
				return sex == 1 ? 6541 : 6542;
			}
		} else if (funId == UIConst.FASHION) {
			return id;
		} else if (funId == UIConst.PET) {//宠物
			if (Config.PET_ACTIVE[id]) {
				return Config.PET_ACTIVE[id].mx;
			}
		} else {
			var cfg = this.getCultureLIB(funId);
			if (cfg && cfg[id]) {
				return cfg[id].mx;
			}
			cfg = this.getSkinLIB(funId);
			if (cfg && cfg[id]) {
				return cfg[id].mx;
			}
			if (funId == UIConst.XIANQI) {//天女武器默认一个
				return 6502;
			}
		}
		return id;
	}
}