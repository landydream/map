var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NPCTouchPlug = (function () {
    function NPCTouchPlug() {
        this.tag = "NPCTouchPlug";
        /**自动移除 */ this.autoRemove = 1;
    }
    NPCTouchPlug.prototype.update = function (ctx) {
    };
    NPCTouchPlug.prototype.onAdd = function () {
        this.role.view.touchEnabled = true;
        this.role.view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.roleTouch, this);
    };
    NPCTouchPlug.prototype.onRemove = function () {
        this.role.view.touchEnabled = false;
        this.role.view.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.roleTouch, this);
    };
    NPCTouchPlug.prototype.onEvent = function (evt, arg) {
        var type = this.role.charType;
        // if (type == UnitConst.TOUR_PLAYER || type == UnitConst.TOUR_NPC || type == UnitConst.KFBOSS_BOSS
        // 	|| type == UnitConst.KFBOSS_PLAYER || type == UnitConst.KFBOSS_NPC) {
        // 	return;
        // }
        if (evt == SceneCharRole.UEVENT_ON_TOUCH) {
            this.onRoleTouch();
        }
    };
    NPCTouchPlug.prototype.onRoleTouch = function () {
        var type = this.role.charType;
        if (type == UnitConst.MONSTER) {
            //GameGlobal.modelBattle.askForNextWave();
        }
        else if (type == UnitConst.COLLOCTNPC) {
            GameGlobal.layerMgr.open(UIConst.GANG_COLLECT);
        }
    };
    NPCTouchPlug.prototype.roleTouch = function (e) {
        e.stopPropagation();
        var hero = Model_player.voMine.sceneChars[0];
        var type = this.role.charType;
        if (hero) {
            if (type == UnitConst.MONSTER_GUI) {
                var id = this.role.id;
                var mid = id.split("_")[1];
                GameGlobal.layerMgr.open(UIConst.DAILY_ZHONGKUI_BOSS, mid);
                return;
            }
            if (this.role.checkIntRange(hero.x, hero.y)) {
                this.onRoleTouch();
            }
            else {
                hero.lockTargetInt(this.role);
            }
        }
    };
    return NPCTouchPlug;
}());
__reflect(NPCTouchPlug.prototype, "NPCTouchPlug");
//# sourceMappingURL=NPCTouchPlug.js.map