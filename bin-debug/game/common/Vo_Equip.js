var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Equip = (function () {
    function Vo_Equip() {
        this.sid = 0;
        this.count = 1;
        // public getName():string {
        // 	var vo = this.voEx;
        // 	if(vo && vo.exRatio > 0){
        // 		return this.name + "<font color='#FFFF00'>+" + vo.exRatio + "</font>";
        // 	}
        // 	return this.name;
        // }
        this._score = 0;
    }
    Object.defineProperty(Vo_Equip.prototype, "voEx", {
        get: function () {
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
        },
        set: function (v) {
            this._voExp = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Equip.prototype, "qColor", {
        get: function () {
            return Color.QUALITYCOLOR[this.quality];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Equip.prototype, "level", {
        /**装备穿戴等级 或者进阶等级进阶表id*/
        get: function () {
            return this.cfg.lv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Equip.prototype, "type", {
        /**装备部件类型 */
        get: function () {
            var p = this.cfg.part;
            return p;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Equip.prototype, "job", {
        /**装备职业 */
        get: function () {
            var _job = this.cfg.job;
            return _job;
        },
        enumerable: true,
        configurable: true
    });
    Vo_Equip.prototype.initLib = function (id) {
        this.gType = Enum_Attr.EQUIP;
        this.id = id;
        this.cfg = Config.EQUIP[id];
        if (true) {
            if (this.cfg == null) {
                throw ("扫码！扫码！奖励有错了！没有装备" + id);
            }
        }
        this.name = this.cfg.n;
        this.quality = this.cfg.q;
    };
    /**装备评分*/
    Vo_Equip.prototype.getScore = function () {
        if (this._score <= 0) {
            var vo = Vo_FightAttr.voFight.clear();
            vo.addAttrInfo(ConfigHelp.splitIntArr(this.cfg.attr));
            var list = this.getExAttr();
            if (list) {
                vo.addAttrInfo(list);
            }
            this._score = vo.getStrength();
        }
        if (!this._godScore) {
            this._godScore = this.getGodAttrPower(false);
        }
        // var score = this._score;
        return this._score + this._godScore;
    };
    /**战斗力 只包过基础属性和额外属性 isGodEquipAdd是否包括神装槽位属性*/
    Vo_Equip.prototype.getPower = function () {
        this.getScore();
        var power = this._score;
        power += this.getGodAttrPower(true);
        return power;
    };
    /**获取极品属性  isGodEquipAdd是否包括神装槽位属性 */
    Vo_Equip.prototype.getGodAttrPower = function (isGodEquipAdd) {
        if (isGodEquipAdd === void 0) { isGodEquipAdd = true; }
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
    };
    /**获取装备基础属性 */
    Vo_Equip.prototype.getBaseAttr = function () {
        // var info = ConfigHelp.splitIntArr(this.cfg.attr);
        var info = '';
        return info;
    };
    Vo_Equip.prototype.getExAttr = function () {
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
    };
    /**id装备表id sid装备唯一id */
    Vo_Equip.create = function (id, sid) {
        if (sid === void 0) { sid = 0; }
        var vo = new Vo_Equip();
        vo.initLib(id);
        vo.sid = sid;
        return vo;
    };
    return Vo_Equip;
}());
__reflect(Vo_Equip.prototype, "Vo_Equip", ["IGridImpl"]);
//# sourceMappingURL=Vo_Equip.js.map