var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CultureHelp = (function () {
    function CultureHelp() {
    }
    //*****************************检测**************************** */
    /**检测皮肤是否有提示 */
    CultureHelp.chekcSkinNotice = function (funId) {
        if (!SystemHelp.isOpenByLev(funId, false)) {
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
    };
    //*****************************检测**************************** */
    CultureHelp.getPutOnId = function (funId) {
        var id = this.getPartId(funId);
        return Model_player.voMine.partsData[id];
    };
    //**********************获取表数据*********************** */
    /**获取技能升级表数据 */
    CultureHelp.getSkillLIB = function (funId) {
        if (funId == UIConst.RIDE) {
            return Config.RIDE_SKILL;
        }
        else if (funId == UIConst.WING) {
            return Config.WING_SKILL;
        }
        else if (funId == UIConst.SHENBING) {
            return Config.SHENBING_SKILL;
        }
        else if (funId == UIConst.TIANXIAN) {
            return Config.TIANXIAN_SKILL;
        }
        else if (funId == UIConst.FAZHEN) {
            return Config.FAZHEN_SKILL;
        }
        else if (funId == UIConst.XIANWEI) {
            return Config.XIANWEI_SKILL;
        }
        else if (funId == UIConst.PET_TONGLING) {
            return Config.TONGLING_SKILL;
        }
        else if (funId == UIConst.PET_SOUL) {
            return Config.SOUL_SKILL;
        }
        else if (funId == UIConst.TIANNV) {
            return Config.TIANNV_SKILL;
        }
        else if (funId == UIConst.XIANQI) {
            return Config.TIANNV_SKILL;
        }
        else if (funId == UIConst.HUANIAN) {
            return Config.TIANNV_SKILL;
        }
        else if (funId == UIConst.LINGQI) {
            return Config.TIANNV_SKILL;
        }
    };
    /**获取技能激活表 */
    CultureHelp.getSkillActiveLIB = function (funId) {
        if (funId == UIConst.RIDE) {
            return Config.RIDE_SKILL_ACTIVE;
        }
        else if (funId == UIConst.WING) {
            return Config.WING_SKILL_ACTIVE;
        }
        else if (funId == UIConst.SHENBING) {
            return Config.SHENBING_SKILL_ACTIVE;
        }
        else if (funId == UIConst.TIANXIAN) {
            return Config.TIANXIAN_SKILL_ACTIVE;
        }
        else if (funId == UIConst.FAZHEN) {
            return Config.FAZHEN_SKILL_ACTIVE;
        }
        else if (funId == UIConst.XIANWEI) {
            return Config.XIANWEI_SKILL_ACTIVE;
        }
        else if (funId == UIConst.PET_TONGLING) {
            return Config.TONGLING_SKILL_ACTIVE;
        }
        else if (funId == UIConst.PET_SOUL) {
            return Config.SOUL_SKILL_ACTIVE;
        }
        else if (funId == UIConst.TIANNV) {
            return Config.TIANNV_SKILL_ACTIVE;
        }
        else if (funId == UIConst.XIANQI) {
            return Config.TIANNV_SKILL_ACTIVE;
        }
        else if (funId == UIConst.HUANIAN) {
            return Config.TIANNV_SKILL_ACTIVE;
        }
        else if (funId == UIConst.LINGQI) {
            return Config.TIANNV_SKILL_ACTIVE;
        }
    };
    /**获取进阶表 */
    CultureHelp.getCultureLIB = function (funId) {
        if (funId == UIConst.RIDE) {
            return Config.RIDE_CULTURE;
        }
        else if (funId == UIConst.WING) {
            return Config.WING_CULTURE;
        }
        else if (funId == UIConst.SHENBING) {
            return Config.SHENBING_CULTURE;
        }
        else if (funId == UIConst.TIANXIAN) {
            return Config.TIANXIAN_CULTURE;
        }
        else if (funId == UIConst.FAZHEN) {
            return Config.FAZHEN_CULTURE;
        }
        else if (funId == UIConst.XIANWEI) {
            return Config.XIANWEI_CULTURE;
        }
        else if (funId == UIConst.PET_TONGLING) {
            return Config.TONGLING_CULTURE;
        }
        else if (funId == UIConst.PET_SOUL) {
            return Config.SOUL_CULTURE;
        }
        else if (funId == UIConst.TIANNV) {
            return Config.TIANNV_CULTURE;
        }
        else if (funId == UIConst.XIANQI) {
            return Config.TIANNV_XIANQI;
        }
        else if (funId == UIConst.HUANIAN) {
            return Config.TIANNV_HUANIAN;
        }
        else if (funId == UIConst.LINGQI) {
            return Config.TIANNV_LINGQI;
        }
    };
    /**获取皮肤表 */
    CultureHelp.getSkinLIB = function (funId) {
        if (funId == UIConst.RIDE) {
            return Config.RIDE_SKIN;
        }
        else if (funId == UIConst.WING) {
            return Config.WING_SKIN;
        }
        else if (funId == UIConst.SHENBING) {
            return Config.SHENBING_SKIN;
        }
        else if (funId == UIConst.TIANXIAN) {
            return Config.TIANXIAN_SKIN;
        }
        else if (funId == UIConst.FASHION) {
            return Config.FASHION;
        }
        else if (funId == UIConst.TIANNV) {
            return Config.TIANNV_SKIN;
        }
    };
    //***************************************************** */
    //*****************************获取道具ID */
    /**获取直升一阶丹的id */
    CultureHelp.getZSDrugId = function (funId) {
        if (funId == UIConst.RIDE) {
            return 4414;
        }
        else if (funId == UIConst.WING) {
            return 4444;
        }
        else if (funId == UIConst.SHENBING) {
            return 4434;
        }
        else if (funId == UIConst.TIANXIAN) {
            return 4424;
        }
        else if (funId == UIConst.FAZHEN) {
            return 4454;
        }
        else if (funId == UIConst.XIANWEI) {
            return 4464;
        }
        else if (funId == UIConst.PET_TONGLING) {
            return 4474;
        }
        else if (funId == UIConst.PET_SOUL) {
            return 4484;
        }
        else if (funId == UIConst.TIANNV) {
            return 4494;
        }
        else if (funId == UIConst.XIANQI) {
            return 4504;
        }
        else if (funId == UIConst.HUANIAN) {
            return 4514;
        }
        else if (funId == UIConst.LINGQI) {
            return 4524;
        }
    };
    /**获取属性丹ID */
    CultureHelp.getAttrDrugId = function (funId) {
        if (funId == UIConst.RIDE) {
            return 4415;
        }
        else if (funId == UIConst.WING) {
            return 4445;
        }
        else if (funId == UIConst.SHENBING) {
            return 4435;
        }
        else if (funId == UIConst.TIANXIAN) {
            return 4425;
        }
        else if (funId == UIConst.FAZHEN) {
            return 4455;
        }
        else if (funId == UIConst.XIANWEI) {
            return 4465;
        }
        else if (funId == UIConst.PET_TONGLING) {
            return 4475;
        }
        else if (funId == UIConst.PET_SOUL) {
            return 4485;
        }
        else if (funId == UIConst.TIANNV) {
            return 4495;
        }
        else if (funId == UIConst.XIANQI) {
            return 4505;
        }
        else if (funId == UIConst.HUANIAN) {
            return 4515;
        }
        else if (funId == UIConst.LINGQI) {
            return 4525;
        }
    };
    /**获取对于系统的技能书 */
    CultureHelp.getSkillBookId = function (funId) {
        if (funId == UIConst.RIDE) {
            return 4416;
        }
        else if (funId == UIConst.WING) {
            return 4446;
        }
        else if (funId == UIConst.SHENBING) {
            return 4436;
        }
        else if (funId == UIConst.TIANXIAN) {
            return 4426;
        }
        else if (funId == UIConst.FAZHEN) {
            return 4456;
        }
        else if (funId == UIConst.XIANWEI) {
            return 4466;
        }
        else if (funId == UIConst.PET_TONGLING) {
            return 4476;
        }
        else if (funId == UIConst.PET_SOUL) {
            return 4486;
        }
        else if (funId == UIConst.TIANNV) {
            return 4496;
        }
        else if (funId == UIConst.XIANQI) {
            return 4506;
        }
        else if (funId == UIConst.HUANIAN) {
            return 4516;
        }
        else if (funId == UIConst.LINGQI) {
            return 4526;
        }
        return 0;
    };
    /**获取百分比进阶丹id */
    CultureHelp.getExpDrugId = function (funId) {
        if (funId == UIConst.RIDE) {
            return [4413, 5410, 5411, 5412, 5413, 5414, 5415, 5416, 5417, 5418, 5419];
        }
        else if (funId == UIConst.WING) {
            return [4443, 5440, 5441, 5442, 5443, 5444, 5445, 5446, 5447, 5448, 5449];
        }
        else if (funId == UIConst.SHENBING) {
            return [4433, 5430, 5431, 5432, 5433, 5434, 5435, 5436, 5437, 5438, 5439];
        }
        else if (funId == UIConst.TIANXIAN) {
            return [4423, 5420, 5421, 5422, 5423, 5424, 5425, 5426, 5427, 5428, 5429];
        }
        else if (funId == UIConst.FAZHEN) {
            return [4453, 5450, 5451, 5452, 5453, 5454, 5455, 5456, 5457, 5458, 5459];
        }
        else if (funId == UIConst.XIANWEI) {
            return [4463, 5460, 5461, 5462, 5463, 5464, 5465, 5466, 5467, 5468, 5469];
        }
        else if (funId == UIConst.PET_TONGLING) {
            return [4473, 5470, 5471, 5472, 5473, 5474, 5475, 5476, 5477, 5478, 5479];
        }
        else if (funId == UIConst.PET_SOUL) {
            return [4483, 5480, 5481, 5482, 5483, 5484, 5485, 5486, 5487, 5488, 5489];
        }
        else if (funId == UIConst.TIANNV) {
            return [4493, 5490, 5491, 5492, 5493, 5494, 5495, 5496, 5497, 5498, 5499];
        }
        else if (funId == UIConst.XIANQI) {
            return [4503, 5500, 5501, 5502, 5503, 5504, 5505, 5506, 5507, 5508, 5509];
        }
        else if (funId == UIConst.HUANIAN) {
            return [4513, 5510, 5511, 5512, 5513, 5514, 5515, 5516, 5517, 5518, 5519];
        }
        else if (funId == UIConst.LINGQI) {
            return [4523, 5520, 5521, 5522, 5523, 5524, 5525, 5526, 5527, 5528, 5529];
        }
        return [];
    };
    //************************************* */
    CultureHelp.exchangeFunId = function (funId) {
        if (funId == UIConst.XIANQI || funId == UIConst.HUANIAN || funId == UIConst.LINGQI) {
            funId = UIConst.TIANNV;
        }
        return funId;
    };
    CultureHelp.getPartId = function (funId) {
        if (funId == UIConst.RIDE) {
            return UnitConst.KEY_HORSE;
        }
        else if (funId == UIConst.WING) {
            return UnitConst.KEY_WING;
        }
        else if (funId == UIConst.SHENBING) {
            return UnitConst.KEY_WEAPON;
        }
        else if (funId == UIConst.TIANXIAN) {
            return UnitConst.KEY_TIANXIAN_ID;
        }
        else if (funId == UIConst.XIANLV) {
            return UnitConst.KEY_XIANLV_ID;
        }
        else if (funId == UIConst.FAZHEN) {
            return UnitConst.KEY_FAZHEN;
        }
        else if (funId == UIConst.XIANWEI) {
            return UnitConst.KEY_XIANWEI;
        }
        else if (funId == UIConst.PET_TONGLING) {
            return UnitConst.KEY_TONGLING;
        }
        else if (funId == UIConst.PET_SOUL) {
            return UnitConst.KEY_SOUL;
        }
        else if (funId == UIConst.TIANNV) {
            return UnitConst.KEY_TIANNV_ID;
        }
        else if (funId == UIConst.XIANQI) {
            return UnitConst.KEY_XIANQI;
        }
        else if (funId == UIConst.HUANIAN) {
            return UnitConst.KEY_HUANIAN;
        }
        else if (funId == UIConst.LINGQI) {
            return UnitConst.KEY_LINGQI;
        }
        else if (funId == UIConst.TITLE) {
            return UnitConst.KEY_TITLE;
        }
        else if (funId == UIConst.PET) {
            return UnitConst.KEY_PET_ID;
        }
        return 0;
    };
    CultureHelp.getPartFunId = function (id) {
        if (id == UnitConst.KEY_HORSE) {
            return UIConst.RIDE;
        }
        else if (id == UnitConst.KEY_WING) {
            return UIConst.WING;
        }
        else if (id == UnitConst.KEY_WEAPON) {
            return UIConst.SHENBING;
        }
        else if (id == UnitConst.KEY_TIANXIAN_ID) {
            return UIConst.TIANXIAN;
        }
        else if (id == UnitConst.KEY_XIANLV_ID) {
            return UIConst.XIANLV;
        }
        else if (id == UnitConst.KEY_FAZHEN) {
            return UIConst.FAZHEN;
        }
        else if (id == UnitConst.KEY_XIANWEI) {
            return UIConst.XIANWEI;
        }
        else if (id == UnitConst.KEY_PET_ID) {
            return UIConst.PET;
        }
        else if (id == UnitConst.KEY_TONGLING) {
            return UIConst.PET_TONGLING;
        }
        else if (id == UnitConst.KEY_SOUL) {
            return UIConst.PET_SOUL;
        }
        else if (id == UnitConst.KEY_TIANNV_ID) {
            return UIConst.TIANNV;
        }
        else if (id == UnitConst.KEY_XIANQI) {
            return UIConst.XIANQI;
        }
        else if (id == UnitConst.KEY_HUANIAN) {
            return UIConst.HUANIAN;
        }
        else if (id == UnitConst.KEY_LINGQI) {
            return UIConst.LINGQI;
        }
        else if (id == UnitConst.KEY_TITLE) {
            return UIConst.TITLE;
        }
        else if (id == UnitConst.KEY_BODY) {
            return UIConst.FASHION;
        }
        return 0;
    };
    /**获取战力 type&1进阶属性 &2装备 &4皮肤 &8属性丹 &16技能 */
    CultureHelp.getPower = function (funId, showType) {
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
        if (showType === void 0) { showType = 0; }
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
    };
    /**设置模型 */
    CultureHelp.setUIRole = function (uiRole, funId, mx) {
        if (funId == UIConst.RIDE) {
            uiRole.setHorse(mx);
        }
        else if (funId == UIConst.WING) {
            uiRole.setWing(mx);
        }
        else if (funId == UIConst.SHENBING || funId == UIConst.XIANQI) {
            uiRole.setWeapon(mx);
        }
        else if (funId == UIConst.XIANLV || funId == UIConst.PET
            || funId == UIConst.FASHION || funId == UIConst.TIANNV) {
            uiRole.setBody(mx);
        }
        else if (funId == UIConst.TIANXIAN) {
            uiRole.setTianXian(mx);
        }
        else if (funId == UIConst.FAZHEN || funId == UIConst.PET_TONGLING || funId == UIConst.HUANIAN) {
            uiRole.setGuangHuan(mx);
        }
        else if (funId == UIConst.XIANWEI || funId == UIConst.TITLE) {
            uiRole.setTitle(mx);
        }
        else if (funId == UIConst.PET_SOUL) {
            uiRole.setSoul(mx);
        }
    };
    CultureHelp.getTitleSource = function (id) {
        if (id <= 0)
            return id;
        if (Config.TITLE[id]) {
            return Config.TITLE[id].zy;
        }
    };
    /**获取宠物系统的模型资源id
     * id 宠物   petFly幻化等级0未幻化 1幻化
    */
    CultureHelp.getPetModel = function (id, petFly) {
        if (id === void 0) { id = 0; }
        if (petFly === void 0) { petFly = 0; }
        if (Config.PET_ACTIVE[id]) {
            if (petFly > 0) {
                if (Config.PET_FLYUP_PIFU[id]) {
                    return Config.PET_FLYUP_PIFU[id].MX;
                }
            }
            return Config.PET_ACTIVE[id].mx;
        }
        return id;
    };
    /**获取进阶系统的模型资源id
     * 当funId=0时使用partType部件类型来判断
    */
    CultureHelp.getModel = function (funId, id, job, partType, sex) {
        if (job === void 0) { job = 0; }
        if (partType === void 0) { partType = -1; }
        if (sex === void 0) { sex = 0; }
        if (!funId) {
            funId = this.getPartFunId(partType);
        }
        if (funId == UIConst.XIANLV) {
            if (Config.XIANLV_ACTIVE[id]) {
                return Config.XIANLV_ACTIVE[id].mx;
            }
        }
        else if (funId == UIConst.SHENBING) {
            if (id < 1000) {
                if (Config.SHENBING_SKIN[id]) {
                    return Config.SHENBING_SKIN[id].mx;
                }
            }
            else {
                var lev = Math.floor(id / 1000);
                var index = job * 100 + lev;
                if (Config.SHENBING_MODEL[index]) {
                    return Config.SHENBING_MODEL[index].mx;
                }
            }
            //没有武器默认一个/*** 1 剑（人族） 2 枪（仙族) * 3 刀（妖族）*/
            if (job == 1) {
                return sex == 1 ? 6501 : 6502;
            }
            else if (job == 2) {
                return sex == 1 ? 6521 : 6522;
            }
            else {
                return sex == 1 ? 6541 : 6542;
            }
        }
        else if (funId == UIConst.FASHION) {
            return id;
        }
        else if (funId == UIConst.PET) {
            if (Config.PET_ACTIVE[id]) {
                return Config.PET_ACTIVE[id].mx;
            }
        }
        else {
            var cfg = this.getCultureLIB(funId);
            if (cfg && cfg[id]) {
                return cfg[id].mx;
            }
            cfg = this.getSkinLIB(funId);
            if (cfg && cfg[id]) {
                return cfg[id].mx;
            }
            if (funId == UIConst.XIANQI) {
                return 6502;
            }
        }
        return id;
    };
    /**技能更新 参数系统ID */
    CultureHelp.MSG_CULTURE_SKILL_UPDATE = "MSG_CULTURE_SKILL_UPDATE";
    /**皮肤更新 */
    CultureHelp.MSG_CULTURE_SKIN_UPDATE = "MSG_CULTURE_SKIN_UPDATE";
    /**属性丹个数更新 */
    CultureHelp.MSG_CULTURE_ATTRDRUT_UPATE = "MSG_CULTURE_ATTRDRUT_UPATE";
    /**最多使用属性丹个数 */
    CultureHelp.MAX_ATTRDRUG = 500;
    return CultureHelp;
}());
__reflect(CultureHelp.prototype, "CultureHelp");
//# sourceMappingURL=CultureHelp.js.map