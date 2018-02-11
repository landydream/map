var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MapScene = (function (_super) {
    __extends(MapScene, _super);
    function MapScene() {
        var _this = _super.call(this) || this;
        _this.pauseCounter = 0;
        _this.rewardCounter = 0;
        _this.stopRenderFlags = [];
        _this.dt = 33;
        _this.scenetype = 0;
        _this.unitSt = [];
        _this.isShake_ = 1;
        _this.units = {};
        _this.list = [];
        _this.ctx = {};
        _this.timeinv = 0;
        _this.frameInterv = 0; //顿帧时间 0-33都相当于默认帧频 越大越卡
        _this.intervTime = 0;
        _this.scale = 1;
        _this.view = new egret.Sprite();
        _this.unitLayer = new DepSprite();
        _this.mapMgr = new MapManager(_this.view);
        _this.mapMgr.initCustom(0, -50, 720, 1100);
        _this.view.addChild(_this.unitLayer);
        GameGlobal.control.listen(Enum_MsgType.ON_BATTLE_ENTER, _this.onBattleEnter, _this);
        GameGlobal.control.listen(Enum_MsgType.ON_BATTLE_EXIT, _this.onBattleExit, _this);
        return _this;
    }
    MapScene.prototype.enterScene = function (mapid, scenetype) {
        if (scenetype === void 0) { scenetype = 1; }
        //场景适配器
        this.scenetype = scenetype;
        var ctrl = SceneCtrl.getCtrl(scenetype);
        this.enterSceneCtrl(ctrl);
        GameGlobal.control.notify(MapScene.MSG_CHANGE, scenetype);
        //地图场景
        this.mapMgr.initConfig(mapid);
    };
    MapScene.prototype.enterSceneCtrl = function (ctrl) {
        if (this.sceneCtrl) {
            this.sceneCtrl.onExit(this);
        }
        this.sceneCtrl = ctrl;
        if (ctrl) {
            ctrl.onEnter(this);
        }
    };
    MapScene.prototype.onBattleEnter = function () {
        this.addUnitLayerVis("onBattle");
        // this.unitLayer.visible = false;
        this.addStopRenderFlag("onBattle");
        this.scaleOut();
    };
    MapScene.prototype.onBattleExit = function () {
        this.removeUnitLayerVis("onBattle");
        // this.unitLayer.visible = true;
        this.removStopRenderFlag("onBattle");
        if (this.isShake_ == 2) {
            egret.Tween.removeTweens(this.view);
            this.onShakeEnd();
        }
        GameGlobal.control.callDelayMsgs();
    };
    MapScene.prototype.addUnitLayerVis = function (st) {
        var index = this.unitSt.indexOf(st);
        if (index == -1) {
            this.unitSt.push(st);
            if (this.unitSt.length == 1) {
                this.unitLayer.visible = false;
            }
        }
    };
    MapScene.prototype.removeUnitLayerVis = function (st) {
        var index = this.unitSt.indexOf(st);
        if (index != -1) {
            this.unitSt.splice(index, 1);
            if (this.unitSt.length <= 0) {
                this.unitLayer.visible = true;
            }
        }
    };
    MapScene.prototype.addStopRenderFlag = function (sign) {
        var index = this.stopRenderFlags.indexOf(sign);
        if (index == -1) {
            this.stopRenderFlags.push(sign);
            this.pauseCounter = 1;
        }
    };
    MapScene.prototype.removStopRenderFlag = function (sign) {
        var index = this.stopRenderFlags.indexOf(sign);
        if (index != -1) {
            this.stopRenderFlags.splice(index, 1);
            if (this.stopRenderFlags.length == 0) {
                this.pauseCounter = 0;
            }
        }
    };
    MapScene.prototype.watch = function (x, y) {
        this.mapMgr.watch(x, y);
    };
    MapScene.prototype.shake = function () {
        if (this.isShake_ == 1) {
            this.isShake_ = 2;
            egret.Tween.get(this.view).to({ x: this.view.x + 4, y: this.view.y + 4 }, 300, MapScene.SHAKEEASE).call(this.onShakeEnd);
        }
    };
    MapScene.prototype.onShakeEnd = function () {
        var self = GameGlobal.mapscene;
        self.isShake_ = 1;
        self.view.x -= 4;
        self.view.y -= 4;
    };
    MapScene.SHAKEEASE = function (value) {
        var ret;
        var a = value * 2 % 1.0;
        ret = Math.sin(a * Math.PI * 2);
        return ret;
    };
    MapScene.prototype.scaleOut = function () {
        var self = GameGlobal.mapscene;
        var p = self.view;
    };
    MapScene.prototype.addUnit = function (u) {
        if (!this.units[u.id]) {
            this.units[u.id] = u;
            this.list.push(u);
            u.scene = this;
            u.onAdd();
        }
    };
    MapScene.prototype.removes = function (filter, arg) {
        for (var i = 0, len = this.list.length; i < len; i++) {
            var u = this.list[i];
            if (u && filter(u, arg)) {
                this.removeUnit(u);
            }
        }
    };
    MapScene.prototype.removeUnit = function (u) {
        if (u) {
            delete this.units[u.id];
            this.list[this.list.indexOf(u)] = null;
            u.onRemove();
        }
    };
    MapScene.prototype.getUnit = function (id) {
        var ret = this.units[id];
        return ret;
    };
    MapScene.prototype.update = function (dt) {
        var self = this;
        self.intervTime += dt;
        if (self.intervTime < self.frameInterv) {
            return;
        }
        self.intervTime = 0;
        self.dt = dt;
        var ctx = self.ctx;
        ctx.dt = dt;
        if (self.pauseCounter) {
            return;
        }
        var len = self.list.length;
        var cleanflag;
        for (var i = 0; i < len;) {
            var term = self.list[i];
            if (!term) {
                i++;
                cleanflag = 1;
                continue;
            }
            ctx.d = null;
            term.update(ctx);
            if (ctx.d) {
                delete self.units[term.id];
                self.list[i] = null;
                term.onRemove();
                len--;
            }
            else {
                i++;
            }
        }
        if (cleanflag) {
            ArrayUitl.cleannull(self.list);
        }
        if (self.sceneCtrl) {
            self.sceneCtrl.update(ctx);
        }
        self.timeinv += dt;
        if (self.timeinv >= 300) {
            self.unitLayer.sortChild();
            self.timeinv = 0;
        }
    };
    MapScene.prototype.removeAll = function () {
        var units = this.units;
        for (var k in units) {
            var u = units[k];
            u.onRemove();
            delete units[k];
        }
        this.list.length = 0;
        this.mapMgr.clean();
    };
    MapScene.prototype.watchMainRole = function (offx) {
        if (offx === void 0) { offx = 0; }
        var mgr = this.mapMgr;
        if (mgr.isLoading == true)
            return;
        var hero = GameGlobal.mapscene.hero;
        if (hero == null)
            return;
        mgr.watch(hero.x, hero.y);
    };
    /**场景是否灰化 */
    MapScene.prototype.isGrey = function (bo) {
        if (bo) {
            if (!this.rec) {
                this.rec = new eui.Rect(480, 800, 0x000000);
                this.rec.alpha = .5;
            }
            if (!this.rec.parent) {
                GameGlobal.layerMgr.UI_MainBottom.addChildAt(this.rec, 0);
            }
        }
        else {
            if (this.rec && this.rec.parent) {
                this.rec.parent.removeChild(this.rec);
                this.rec.graphics.clear();
            }
            this.rec = null;
        }
    };
    MapScene.prototype.scaleScene = function (x, y) {
        if (x === void 0) { x = 0.8; }
        if (y === void 0) { y = 0.8; }
        this.scale = x;
        this.view.scaleX = x;
        this.view.scaleY = y;
    };
    /**是否是玩家单位 */
    MapScene.ISNOTHEROMEMBER = function (u, arg) {
        if (u.forceType == 1) {
            return false;
        }
        else {
            return true;
        }
    };
    MapScene.MSG_CHANGE = "m_c";
    MapScene.MSG_MAPCFG_COMPLECT = "MSG_MAP_COMPLECT";
    return MapScene;
}(MsgCenter));
__reflect(MapScene.prototype, "MapScene");
//# sourceMappingURL=MapScene.js.map