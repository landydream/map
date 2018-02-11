var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Player = (function () {
    function Vo_Player() {
        /**当前经验 */
        this.exp = 0;
        /** vip等级 */
        this.viplv = 0;
        /**月卡 */
        this.monthCard = 0;
        /**周卡 */
        this.weekCard = 0;
        /**位置的数据角色Vo_Pos(包过装备、强化、宝石等等) */
        this.posData = {};
        /**保存另外系统额外的装备 */
        this.extraEquip = {};
        /**培养系统的数据Vo_Culture key=系统id */
        this.cultureData = {};
        /**保存部件外观 key=part类型*/
        this.partsData = {};
        /** 用来保存玩家所操作的场景单位 */
        this.sceneChars = {};
        /**法宝数据 */
        this.fabaoPosData = {};
    }
    Vo_Player.prototype.parseDetail = function (bytes) {
        // var self = this;
        // self.id = bytes.readLong();
        // self.name = bytes.readUTF();
        // self.level = bytes.readShort();
        // self.exp = bytes.readLong();
        // self.job = bytes.readByte();
        // self.viplv = bytes.readByte();
        // self.str = bytes.readLong();
    };
    Vo_Player.prototype.parseAttr = function (bytes) {
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
    };
    Vo_Player.prototype.parseOtherUnit = function (bytes) {
    };
    Vo_Player.prototype.updateChars = function () {
    };
    Vo_Player.prototype.getParts = function (type) {
        if (this.partsData[type]) {
            return this.partsData[type];
        }
        return 0;
    };
    Vo_Player.prototype.setParts = function (type, val) {
        if (this.partsData[type] == val) {
            return;
        }
        this.partsData[type] = val;
        if (type <= UnitConst.KEY_TIANXIAN_ID) {
            this.updateParts();
        }
    };
    /**获取部件 */
    Vo_Player.prototype.getPart = function (type) {
        var val = 0;
        if (this.partsData[type]) {
            val = this.partsData[type];
        }
        return val;
    };
    Vo_Player.prototype.updateParts = function () {
        var role = this.getCharRole(0);
        if (!role) {
            return;
        }
        var rideing = this.getParts(UnitConst.KEY_HORSE) > 0;
        // role.setBody(GameGlobal.modelFashion.getFashionModel(this.getParts(UnitConst.KEY_BODY), this.sex, this.job, rideing));
        role.setBody(1000);
        role.setHorse(CultureHelp.getModel(UIConst.RIDE, this.getParts(UnitConst.KEY_HORSE)));
        role.setWing(CultureHelp.getModel(UIConst.WING, this.getParts(UnitConst.KEY_WING)));
        if (rideing)
            role.setWeapon(CultureHelp.getModel(UIConst.SHENBING, this.getParts(UnitConst.KEY_WEAPON), this.job, -1, this.sex));
        role.setTianXian(CultureHelp.getModel(UIConst.TIANXIAN, this.getParts(UnitConst.KEY_TIANXIAN_ID), this.job));
        role.setTitle(CultureHelp.getTitleSource(this.getParts(UnitConst.KEY_TITLE)));
        //this.getParts(UnitConst.KEY_TITLE)
        // role.setBody(1301);
        // role.setHorse(6001);
        // role.setWing(6401);
        // role.setWeapon(6501);
    };
    /**获取位置的数据 pos位置重0开始 */
    Vo_Player.prototype.getPosData = function (pos) {
        var vo = this.posData[pos];
        if (!vo) {
            this.posData[pos] = vo = Vo_Pos.create(pos);
        }
        return vo;
    };
    /**更加装备类型获取装备数据,每种装备只能装备一个 */
    Vo_Player.prototype.getEquipByType = function (type) {
        var vo;
        // if (Model_Equip.isEquip(type)) {
        // 	vo = this.getPosData(type - 1).equip;
        // } else {
        // 	vo = this.extraEquip[type];
        // }
        return vo;
    };
    /**获取对于培养系统的数据 */
    // public getCulture(funId: number): Vo_Culture {
    // if (!this.cultureData[funId]) {
    // 	this.cultureData[funId] = new Vo_Culture();
    // }
    // return this.cultureData[funId];
    // }
    /**获取仙侣数据 id=0是获取全部数据*/
    Vo_Player.prototype.getXianLvVo = function (id) {
        if (id === void 0) { id = 0; }
        if (!this.voXianLv) {
            this.voXianLv = new Vo_XianLv();
        }
        if (id == 0) {
            return this.voXianLv;
        }
        return this.voXianLv.getVo(id);
    };
    Vo_Player.prototype.getPet = function (id) {
        if (id === void 0) { id = 0; }
        if (!this.voPet) {
            this.voPet = new Vo_Pet();
        }
        if (!id) {
            return this.voPet;
        }
        return this.voPet.getVo(id);
    };
    Vo_Player.prototype.getJingMai = function () {
        if (!this.voJingMai) {
            this.voJingMai = new Vo_JingMai();
        }
        return this.voJingMai;
    };
    /**获取sceneCharRole 0主角 1宠物 2仙侣 */
    Vo_Player.prototype.getCharRole = function (type) {
        return this.sceneChars[type];
    };
    Vo_Player.prototype.clean = function () {
    };
    return Vo_Player;
}());
__reflect(Vo_Player.prototype, "Vo_Player");
//# sourceMappingURL=Vo_Player.js.map