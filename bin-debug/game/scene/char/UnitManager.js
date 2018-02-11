var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UnitManager = (function () {
    function UnitManager() {
    }
    Object.defineProperty(UnitManager, "instance", {
        get: function () {
            if (!UnitManager._instacne) {
                UnitManager._instacne = new UnitManager();
            }
            return UnitManager._instacne;
        },
        enumerable: true,
        configurable: true
    });
    UnitManager.getTXPos = function () {
    };
    /**
     * data: { id: "gangColloct", sid: 10001 }
     */
    UnitManager.prototype.createNPC = function (data) {
        var mapScene = GameGlobal.mapscene;
        var npc = SceneCharRole.create();
        npc.scene = mapScene;
        npc.charType = UnitConst.MONSTER;
        npc.forceType = 3;
        npc.id = data.id;
        var sid = data.sid;
        // var info = Config.NPC[sid];
        var info;
        npc.setBody(info.mx);
        npc.setDir(2);
        var touchPlug = new NPCTouchPlug();
        touchPlug.role = npc;
        npc.addPlug(touchPlug);
        return npc;
    };
    UnitManager.prototype.createPlayer = function () {
    };
    UnitManager.prototype.createCharRole = function (type) {
        var role = SceneCharRole.create();
        role.charType = type;
        return role;
    };
    UnitManager.prototype.createPet = function (body, isAdd) {
        if (isAdd === void 0) { isAdd = true; }
    };
    UnitManager.prototype.createXiaLv = function () {
    };
    UnitManager.prototype.delUnit = function (id) {
        var mapScene = GameGlobal.mapscene;
        var id = 1000;
        var npc = mapScene.getUnit(id);
        mapScene.removeUnit(npc);
    };
    /**天仙方向的对应位置 */
    UnitManager.TianXianPos = { 1: [-50, -100], 2: [-90, -130], 3: [90, -130], 4: [50, -100] };
    UnitManager.SoulPos = { 1: [-60, -130], 2: [-60, -140], 3: [0, -140], 4: [0, -130] };
    return UnitManager;
}());
__reflect(UnitManager.prototype, "UnitManager");
//# sourceMappingURL=UnitManager.js.map