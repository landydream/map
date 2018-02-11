var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UnitConst = (function () {
    function UnitConst() {
    }
    UnitConst.PLAYER = 1; //玩家
    UnitConst.XIANNV = 2; //仙侣
    UnitConst.MONSTER = 3; //怪物
    UnitConst.PET = 4; //宠物
    UnitConst.TIANNV = 5; //天女
    UnitConst.COLLOCTNPC = 20; //采集NPC
    UnitConst.MONSTER_GUI = 21; //钟馗伏魔
    UnitConst.MONSTER_GANG = 22; //帮会小妖
    UnitConst.ORE_NPC = 23; //跨服战中的矿NPC;
    UnitConst.TOUR_PLAYER = 24; //比武中的玩家;
    UnitConst.TOUR_NPC = 25; //比武中的NPC;	
    UnitConst.KFBOSS_BOSS = 26; //跨服boss中的NPC;			
    UnitConst.KFBOSS_PLAYER = 27; //跨服boss中的玩家;	
    UnitConst.KFBOSS_NPC = 28; //采集NPC;												
    UnitConst.MAGIC = 100;
    //场景更新的顺序
    UnitConst.POS_PALYER = 0;
    UnitConst.POS_PET = 1;
    UnitConst.POS_XIANNV = 2;
    //单位属性KEY 暂时用于发送附近玩家数据
    UnitConst.KEY_JOB = 1;
    UnitConst.KEY_SEX = 2;
    /**模型 */
    UnitConst.KEY_BODY = 10;
    /**武器 */
    UnitConst.KEY_WEAPON = 11;
    /**坐骑 */
    UnitConst.KEY_HORSE = 12;
    /**翅膀 */
    UnitConst.KEY_WING = 13;
    UnitConst.KEY_GUANGHUAN = 14; //光环ID
    UnitConst.KEY_TITLE = 15; //称呼
    UnitConst.KEY_PET_ID = 20; //宠物id
    UnitConst.KEY_PETFLY = 32; //宠物飞升标记 0 1 2 
    UnitConst.KEY_XIANLV_ID = 21; //仙侣id
    UnitConst.KEY_TIANXIAN_ID = 22; //天仙id
    /**法阵 */
    UnitConst.KEY_FAZHEN = 23;
    /**仙位 */
    UnitConst.KEY_XIANWEI = 24;
    /**通灵 */
    UnitConst.KEY_TONGLING = 25;
    /**兽魂 */
    UnitConst.KEY_SOUL = 26;
    /**天女id */
    UnitConst.KEY_TIANNV_ID = 27;
    /**天女仙器 */
    UnitConst.KEY_XIANQI = 28;
    /**天女花辇 */
    UnitConst.KEY_HUANIAN = 29;
    /**天女灵气 */
    UnitConst.KEY_LINGQI = 30;
    /**战斗中 */
    UnitConst.KEY_ATTACK = 31;
    /**性别:男 */
    UnitConst.SEX_BOY = 1;
    /**性别:女 */
    UnitConst.SEX_GIRL = 2;
    /**
     * 1 剑（人族）
     * 2 枪（仙族)
     * 3 刀（妖族）
    */
    UnitConst.JOB_REN = 1;
    UnitConst.JOB_XIAN = 2;
    UnitConst.JOB_YAO = 3;
    return UnitConst;
}());
__reflect(UnitConst.prototype, "UnitConst");
//# sourceMappingURL=UnitConst.js.map