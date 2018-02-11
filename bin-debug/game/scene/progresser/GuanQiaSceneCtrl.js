var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuanQiaSceneCtrl = (function () {
    function GuanQiaSceneCtrl() {
        this.time6000 = 0;
        this.timeInv = 6000; //打怪间隔时间
        this.plus = [];
        this.monsterList = [];
        this.playerCharList = [];
    }
    Object.defineProperty(GuanQiaSceneCtrl, "instance", {
        get: function () {
            if (!GuanQiaSceneCtrl._ins) {
                GuanQiaSceneCtrl._ins = new GuanQiaSceneCtrl();
            }
            return GuanQiaSceneCtrl._ins;
        },
        enumerable: true,
        configurable: true
    });
    GuanQiaSceneCtrl.prototype.update = function (ctx) {
        var self = this;
        self.aiUpdate(ctx);
        if (self.scene) {
            self.scene.watchMainRole();
        }
        self.time6000 += ctx.dt;
        if (self.time6000 >= self.timeInv) {
            self.time6000 = 0;
        }
    };
    GuanQiaSceneCtrl.prototype.onEnter = function (scene) {
        this.scene = scene;
        this.time6000 = 0;
        // var hero = this.hero = Model_player.voMine.sceneChars[0];
        // var autoM: AutoMovePlug = new AutoMovePlug();
        // autoM.tar = hero;
        // hero.addPlugOnly(autoM);
        // var input: UserInputPlug = new UserInputPlug();
        // input.tar = hero;
        // hero.addPlugOnly(input);
        // var pathAccording: GameObjectPathAccording = new GameObjectPathAccording();
        // pathAccording.tar = hero;
        // hero.addPlugOnly(pathAccording);
        // GameGlobal.modelPlayer.CG_Hero_askSceneHeros_131();
        GameGlobal.layerMgr.open(UIConst.GUANQIA_ENTRY);
        GameGlobal.layerMgr.setVis(UIConst.YUGAO, true);
        // GameGlobal.layerMgr.open(UIConst.LEFT_UI);
        GameGlobal.layerMgr.setVis(UIConst.LEFT_UI, true);
        GameGlobal.layerMgr.setVis(UIConst.RIGHT_UI, true);
        GameGlobal.control.listen(MapScene.MSG_MAPCFG_COMPLECT, this.onMapComplete, this);
        GameGlobal.control.listen(Enum_MsgType.MSG_PLAYER_LIST, this.onPList, this);
        GameGlobal.control.listen(Enum_MsgType.ON_BATTLE_ENTER, this.onBattleEnter, this);
    };
    GuanQiaSceneCtrl.prototype.onMapComplete = function () {
        // this.hero.onEvent(SceneCharRole.UEVENT_REACH, 0);
    };
    GuanQiaSceneCtrl.prototype.onMList = function (list) {
        if (GameGlobal.mapscene.mapMgr.isLoading)
            return;
        var self = this;
        var len = list.length;
        if (len > 4) {
            len = 4;
        }
    };
    GuanQiaSceneCtrl.prototype.createNPC = function (data) {
        var mapScene = GameGlobal.mapscene;
        var npc = SceneCharRole.create();
        npc.scene = mapScene;
        npc.charType = UnitConst.MONSTER;
        npc.id = data.id;
        var sid = data.sid;
        npc.setBody(data.body);
        var touchPlug = new NPCTouchPlug();
        touchPlug.role = npc;
        npc.addPlug(touchPlug);
        return npc;
    };
    GuanQiaSceneCtrl.prototype.onExit = function (scene) {
        this.scene.ctx = {};
        var hero = Model_player.voMine.sceneChars[0];
        hero.setAciton(0);
        hero.removPlugByTag("AutoMovePlug");
        hero.removPlugByTag("UserInputPlug");
        hero.removPlugByTag("GameObjectPathAccording");
        GameGlobal.mapscene.removes(MapScene.ISNOTHEROMEMBER, 1);
        this.monsterList = [];
        GameGlobal.layerMgr.close(UIConst.GUANQIA_ENTRY);
        // GameGlobal.layerMgr.close(UIConst.LEFT_UI);
        GameGlobal.layerMgr.setVis(UIConst.LEFT_UI, false);
        GameGlobal.layerMgr.setVis(UIConst.RIGHT_UI, false);
        GameGlobal.layerMgr.setVis(UIConst.YUGAO, false);
        GameGlobal.control.remove(MapScene.MSG_MAPCFG_COMPLECT, this.onMapComplete, this);
        GameGlobal.control.remove(Enum_MsgType.MSG_PLAYER_LIST, this.onPList, this);
        GameGlobal.control.remove(Enum_MsgType.ON_BATTLE_ENTER, this.onBattleEnter, this);
    };
    GuanQiaSceneCtrl.prototype.onBattleEnter = function () {
        this.time6000 = 0;
    };
    GuanQiaSceneCtrl.prototype.onBattleExit = function () {
    };
    GuanQiaSceneCtrl.prototype.onPList = function (list) {
        var len = list.length;
        if (len > 4) {
            len = 4;
        }
        this.playerCharList = [];
        for (var i = 0; i < len; i++) {
            var vo = list[i];
            if (this.scene.getUnit(vo.id)) {
                this.playerCharList.push(this.scene.getUnit(vo.id));
                continue;
            }
            var p = SceneCharRole.create();
            p.charType = UnitConst.PLAYER;
            p.vo = vo;
            GameGlobal.modelPlayer.updateRoleInfoByVo(p, vo);
            var plug = new AIMovePlug();
            plug.tar = p;
            p.addPlug(plug);
            var plug2 = new GameObjectPathAccording();
            plug2.tar = p;
            p.addPlug(plug2);
            GameGlobal.mapscene.addUnit(p);
            this.playerCharList.push(p);
        }
        this.setOterPlayerVis(true);
    };
    GuanQiaSceneCtrl.prototype.setOterPlayerVis = function (v) {
        var len = this.playerCharList.length;
        for (var i = 0; i < len; i++) {
            var p = this.playerCharList[i];
            if (p.vo) {
                for (var k = 0; k < 3; k++) {
                    if (p.vo.sceneChars[k]) {
                        var fol = p.vo.sceneChars[k];
                        fol.setCharVis(v);
                    }
                }
            }
            p.setCharVis(v);
        }
    };
    GuanQiaSceneCtrl.prototype.aiUpdate = function (ctx) {
    };
    return GuanQiaSceneCtrl;
}());
__reflect(GuanQiaSceneCtrl.prototype, "GuanQiaSceneCtrl");
//# sourceMappingURL=GuanQiaSceneCtrl.js.map