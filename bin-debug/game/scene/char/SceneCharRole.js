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
var SceneCharRole = (function (_super) {
    __extends(SceneCharRole, _super);
    function SceneCharRole() {
        var _this = _super.call(this) || this;
        _this.plugs = [];
        _this.plugCtx = {};
        _this.aniTime = 0;
        _this.aniInterv = 1000;
        _this.charType = 0;
        _this.forceType = 0; //1 主角  2 其他玩家 3 场景怪物
        _this.dir = 1;
        _this.invalid = 0; // |1：皮肤有更新
        _this.body = 1; //皮肤
        _this.weapon = 0;
        _this.wing = 0;
        _this.horse = 0;
        _this.guanghuan = 0;
        _this.tianxian = 0;
        _this.title = 0;
        _this.action = 0;
        _this.pauseRender = false;
        _this.isAttack = 0; //头顶刀剑
        _this.move_state = 0;
        _this.moveSpeed = 120;
        _this.canMove = true;
        _this.ex = 0;
        _this.ey = 0;
        _this.name = "";
        _this.timeAc = 0;
        var self = _this;
        self.view = new DepSprite();
        self.createParts();
        return _this;
    }
    SceneCharRole.create = function () {
        var pool = SceneCharRole.P;
        var ret = pool.length ? pool.pop() : new SceneCharRole();
        ret.id = SceneObject.COUNTER++;
        return ret;
    };
    SceneCharRole.prototype.setName = function (n) {
        var self = this;
        if (n == "" || n == null) {
            if (self.lbName) {
                if (self.lbName.parent) {
                    self.lbName.parent.removeChild(self.lbName);
                    self.grpName.parent.removeChild(self.grpName);
                }
            }
            return;
        }
        if (!self.lbName) {
            self.lbName = new eui.Label();
            self.lbName.y = 17;
            self.lbName.size = 18;
            self.lbName.textColor = Color.GREENINT;
            self.lbName.bold = true;
            self.lbName.textAlign = "center";
            self.lbName.cacheAsBitmap = true;
            self.grpName = new egret.Shape();
            self.grpName.y = self.lbName.y;
            self.grpName.cacheAsBitmap = true;
            self.lbName.touchEnabled = self.grpName.touchEnabled = false;
        }
        self.view.addChild(self.grpName);
        self.view.addChild(self.lbName);
        self.lbName.text = n;
        self.lbName.x = -self.lbName.width / 2;
        self.grpName.graphics.clear();
        self.grpName.graphics.beginFill(0x000000, 0.4);
        self.grpName.graphics.drawRect(self.lbName.x - 6, 0, self.lbName.width + 12, self.lbName.height + 3);
        self.grpName.graphics.endFill();
    };
    SceneCharRole.prototype.createParts = function () {
        var shadow = this.shadow = new eui.Image();
        shadow.x = -62 / 2;
        shadow.y = -33 / 2;
        ImageLoader.instance.loader("resource/model/s/1.png", shadow);
        this.view.addChild(shadow);
        this.shadow.touchEnabled = false;
        this.parts = new Parts();
        this.view.addChild(this.parts);
        var body = Part.create();
        body.type = Parts.P_BODY;
        body.dep = 5;
        this.parts.addPart(body);
    };
    SceneCharRole.prototype.update = function (ctx) {
        var self = this;
        if (self.pauseRender) {
            return;
        }
        var view = self.view;
        var len = self.plugs.length;
        var plugArg = self.plugCtx;
        var plugs = self.plugs;
        var plugDirty = 0;
        for (var i = 0; i < len; i++) {
            var plug = plugs[i];
            if (!plug) {
                plugDirty++;
                continue;
            }
            plugArg.d = 0;
            plugArg.dt = ctx.dt;
            plug.update(plugArg);
            if (plugArg.d) {
                plugs[i] = null;
                plug.onRemove();
                plugDirty++;
            }
            else {
            }
        }
        ctx.d = self.dead;
        if (plugDirty) {
            ArrayUitl.cleannull(plugs);
        }
        view.$setX(self.x);
        view.$setY(self.y);
        self.updateState();
        self.aniTime += ctx.dt;
        var perc = self.aniTime / self.aniInterv;
        self.parts.perc = perc;
        view.dep = self.y;
        self.timeAc += ctx.dt;
        if (self.timeAc > 100) {
            self.timeAc = 0;
            if (self.scene.mapMgr.alphaMap == true) {
                if (self.scene.mapMgr.isAlpha(self.x, self.y)) {
                    view.alpha = 0.5;
                }
                else {
                    view.alpha = 1;
                }
            }
        }
        if (perc >= 1) {
            perc = perc - (perc >> 0);
        }
        if (self.txPart) {
            self.txPart.update(perc);
        }
        if (self.titlePart) {
            self.titlePart.setPec(perc);
        }
        if (self.ghPart) {
            self.ghPart.setPec(perc);
        }
        if (self.soulPart) {
            self.soulPart.update(perc);
        }
        if (self.attPart) {
            self.attPart.setPec(perc);
        }
    };
    SceneCharRole.prototype.setPart = function (type, v) {
        var self = this;
        if (type == UnitConst.KEY_BODY) {
            self.setBody(v);
        }
        else if (type == UnitConst.KEY_WING) {
            self.setWing(v);
        }
        else if (type == UnitConst.KEY_HORSE) {
            self.setHorse(v);
        }
        else if (type == UnitConst.KEY_WEAPON) {
            self.setWeapon(v);
        }
        else if (type == UnitConst.KEY_TITLE || type == UnitConst.KEY_XIANWEI) {
            self.setTitle(v);
        }
        else if (type == UnitConst.KEY_FAZHEN || type == UnitConst.KEY_TONGLING) {
            self.setGuangHuan(v);
        }
        else if (type == UnitConst.KEY_TIANXIAN_ID) {
            self.setTianXian(v);
        }
        else if (type == UnitConst.KEY_SOUL) {
            self.setSoul(v);
        }
        else if (type == UnitConst.KEY_ATTACK) {
            self.setAttack(v);
        }
    };
    SceneCharRole.prototype.getBody = function () {
        return this.body;
    };
    SceneCharRole.prototype.setBody = function (v) {
        if (this.body != v) {
            this.body = v;
            this.invalid |= 1;
            this.invalid |= 2;
        }
    };
    SceneCharRole.prototype.setHorse = function (v) {
        if (v != this.horse) {
            this.horse = v;
            this.invalid |= 1;
            this.invalid |= 2;
        }
    };
    SceneCharRole.prototype.setWing = function (v) {
        if (v != this.wing) {
            this.wing = v;
            this.invalid |= 1;
            this.invalid |= 2;
        }
    };
    SceneCharRole.prototype.setWeapon = function (v) {
        if (this.weapon != v) {
            this.weapon = v;
            this.invalid |= 1;
            this.invalid |= 2;
        }
    };
    SceneCharRole.prototype.setGuangHuan = function (v) {
        var self = this;
        if (v > 0) {
            if (this.guanghuan != v) {
                var key = "eff/guanghuan/" + v;
                if (!self.ghPart) {
                    self.ghPart = Part.create();
                    self.ghPart.act = "_1";
                    // self.ghPart = EffectMgr.addEff(key, self.view, 0, -0);
                    self.ghPart.setVal(key);
                    self.view.addChildAt(self.ghPart.view, 1);
                }
                else {
                    self.ghPart.setVal(key);
                }
            }
        }
        else {
            this.title = v;
            if (self.ghPart) {
                // EffectMgr.removeEff(self.ghPart);
                self.view.removeChild(self.ghPart.view);
                self.ghPart.dispose();
                self.ghPart = null;
            }
        }
        this.guanghuan = v;
    };
    SceneCharRole.prototype.setTianXian = function (v) {
        if (this.tianxian != v) {
            this.tianxian = v;
            this.invalid |= 8;
        }
    };
    SceneCharRole.prototype.setDir = function (v) {
        if (this.dir != v) {
            this.dir = v;
            this.invalid |= 1;
            this.invalid |= 2;
        }
    };
    SceneCharRole.prototype.setAciton = function (v) {
        if (this.action != v) {
            this.action = v;
            this.invalid |= 1;
        }
    };
    SceneCharRole.prototype.updateState = function () {
        var invalid = this.invalid;
        if (invalid) {
            if (invalid & 1) {
                this.updateAction();
            }
            if (invalid & 8) {
                this.updateTX();
            }
            if (invalid & 2) {
                this.updateWay();
            }
            if (invalid & 4) {
            }
            this.invalid = 0;
        }
    };
    SceneCharRole.prototype.updateAction = function () {
        var self = this;
        var dirKey;
        var actKey;
        var parts = self.parts;
        if (self.dir == 2 || self.dir == 3) {
            dirKey = "d";
        }
        else {
            dirKey = "u";
        }
        var bodyP = self.parts.dic[Parts.P_BODY];
        if (self.action == Action.IDLE) {
            actKey = "stand";
            self.aniInterv = 1000;
        }
        else if (self.action == Action.RUN) {
            actKey = "run";
            self.aniInterv = 800;
        }
        else {
            actKey = "stand";
        }
        if (self.body > 0) {
            var bkey = "body/" + self.body + "/" + dirKey + "/" + "ani";
            bodyP.setAct(actKey);
            bodyP.setVal(bkey);
        }
        var weaponkey;
        var horsekey;
        var horseHeadKey;
        var wingkey;
        var tianxiankey;
        if (self.weapon != 0) {
            weaponkey = "weapon/" + self.weapon + "/" + dirKey + "/" + "ani";
        }
        if (self.horse != 0) {
            horsekey = "horse/" + self.horse + "/" + dirKey + "/" + "ani";
            horseHeadKey = "horse/" + self.horse + "/" + "head" + "/" + "ani";
        }
        if (self.wing != 0) {
            wingkey = "wing/" + self.wing + "/" + dirKey + "/" + "ani";
        }
        var weapon = parts.dic[Parts.P_WEAPON];
        if (weaponkey) {
            if (!weapon) {
                weapon = Part.create();
                weapon.type = Parts.P_WEAPON;
                parts.addPart(weapon);
            }
            weapon.setAct(actKey);
            weapon.setVal(weaponkey);
        }
        else {
            if (weapon)
                parts.removePart(weapon);
        }
        var horsePart = parts.dic[Parts.P_HORSE];
        var horseHeadPart = parts.dic[Parts.P_HORSE_HEAD];
        if (horsekey) {
            if (!horsePart) {
                horsePart = Part.create();
                horsePart.type = Parts.P_HORSE;
                parts.addPart(horsePart);
                horseHeadPart = Part.create();
                horseHeadPart.type = Parts.P_HORSE_HEAD;
                parts.addPart(horseHeadPart);
            }
            horsePart.setAct(actKey);
            horsePart.setVal(horsekey);
            horseHeadPart.setAct(actKey);
            horseHeadPart.setVal(horseHeadKey);
            //这2个方向不显示头
            if (self.dir == 1 || self.dir == 4) {
                horseHeadPart.view.visible = horseHeadPart.visible = false;
            }
            else {
                horseHeadPart.view.visible = horseHeadPart.visible = true;
            }
        }
        else {
            if (horsePart) {
                parts.removePart(horsePart);
                parts.removePart(horseHeadPart);
            }
        }
        var wingPart = parts.dic[Parts.P_WING];
        if (wingkey) {
            if (!wingPart) {
                wingPart = Part.create();
                wingPart.type = Parts.P_WING;
                parts.addPart(wingPart);
            }
            wingPart.setAct(actKey);
            wingPart.setVal(wingkey);
        }
        else {
            if (wingPart) {
                parts.removePart(wingPart);
            }
        }
        self.updatePos();
    };
    /**
     * 4  1
     * 3  2
     */
    SceneCharRole.prototype.updateWay = function () {
        var self = this;
        var parts = self.parts;
        parts.scaleY = self.scale;
        if (self.dir == 3 || self.dir == 4) {
            parts.scaleX = self.scale;
        }
        else {
            parts.scaleX = -1 * self.scale;
        }
        var lis = parts.list;
        if (lis.length == 1)
            return;
        for (var i = 0; i < lis.length; i++) {
            var p = lis[i];
            if (p)
                p.dep = self.getDep(p.type);
            if (p.type == Parts.P_HORSE_HEAD) {
                if (self.dir == 2 || self.dir == 3) {
                    p.view.visible = p.visible = true;
                }
                else {
                    p.view.visible = p.visible = false;
                }
            }
        }
        parts.sort();
    };
    SceneCharRole.prototype.setTitle = function (v) {
        var self = this;
        if (v > 0) {
            if (this.title != v) {
                this.title = v;
                var key = "eff/title/" + v;
                if (!self.titlePart) {
                    self.titlePart = Part.create();
                    self.titlePart.act = "_1";
                    // self.titlePart = EffectMgr.addEff(key, self.view, 0, -120);
                    self.titlePart.setVal(key);
                    self.view.addChild(self.titlePart.view);
                    this.updatePos();
                }
                else {
                    self.titlePart.setVal(key);
                }
            }
        }
        else {
            if (self.titlePart) {
                // EffectMgr.removeEff(self.titlePart);
                self.view.removeChild(self.titlePart.view);
                self.titlePart.dispose();
                self.titlePart = null;
            }
        }
        this.title = v;
    };
    SceneCharRole.prototype.updateTX = function () {
        var self = this;
        var tx = self.tianxian;
        if (tx > 0) {
            var key = "eff/tianxian/" + tx;
            if (!self.txPart) {
                self.txPart = TXPart.createPart(self);
                self.txPart.act = "_1";
                self.txPart.setVal(key);
                self.view.addChild(self.txPart.view);
            }
            else {
                self.txPart.setVal(key);
            }
        }
        else {
            if (self.txPart) {
                self.view.removeChild(self.txPart.view);
                self.txPart.dispose();
                self.txPart = null;
            }
        }
    };
    SceneCharRole.prototype.setSoul = function (v) {
        var self = this;
        if (v) {
            var key = "resource/ui/pet/soul/" + v + ".png";
            if (!self.soulPart) {
                self.soulPart = SoulPart.createPart(self);
                self.view.addChild(self.soulPart.view);
            }
            self.soulPart.setVal(key);
        }
        else {
            if (self.soulPart) {
                self.view.removeChild(self.soulPart.view);
                self.soulPart = null;
            }
        }
    };
    SceneCharRole.prototype.setAttack = function (v) {
        var self = this;
        if (v == 1) {
            if (this.isAttack != 1) {
                var key = "eff/attack/ani";
                if (!self.attPart) {
                    self.attPart = Part.create();
                    self.attPart.act = "_1";
                    self.attPart.setVal(key);
                    self.view.addChild(self.attPart.view);
                    self.updatePos();
                }
            }
        }
        else {
            if (self.attPart) {
                self.view.removeChild(self.attPart.view);
                self.attPart.dispose();
                self.attPart = null;
            }
        }
        this.isAttack = v;
    };
    SceneCharRole.prototype.updatePos = function () {
        // var py = Model_Ride.getPartOffY(this.horse);
        var py = 0;
        this.parts.y = py;
        if (this.titlePart) {
            if (this.charType == UnitConst.TIANNV) {
                var high = Config.QXGD[this.body] ? Config.QXGD[this.body].gd : 110;
                this.titlePart.view.y = -1 * high;
            }
            else {
                this.titlePart.view.y = -120 + py;
            }
        }
        if (this.attPart) {
            this.attPart.view.y = -120 + py;
        }
    };
    SceneCharRole.prototype.getDep = function (type) {
        if (this.dir == 4 || this.dir == 1) {
            return Parts.U_PART_LIST.indexOf(type);
        }
        else {
            return Parts.D_PART_LIST.indexOf(type);
        }
    };
    SceneCharRole.prototype.onAdd = function () {
        this.invalid |= 1;
        this.scene.unitLayer.depAddChild(this.view);
        this.view.visible = true;
    };
    SceneCharRole.prototype.onRemove = function () {
        for (var i = this.plugs.length - 1; i >= 0; i--) {
            var plug = this.plugs[i];
            if (plug) {
                this.removePlug(plug);
            }
        }
        this.scene.unitLayer.depRemoveChild(this.view);
        this.view.alpha = 1;
        this.view.dep = -1;
        this.view.scaleX = this.view.scaleY = 1;
        this.view.visible = true;
        this.dead = 0;
        this.move_state = 0;
        this.invalid |= 255;
        this.forceType = 0;
        this.charType = 0;
        if (this.lbName) {
            this.lbName.textColor = Color.GREENINT;
        }
        this.setWeapon(0);
        this.setBody(0);
        this.setWing(0);
        this.setHorse(0);
        this.setGuangHuan(0);
        this.setTianXian(0);
        this.setTitle(0);
        this.setSoul(0);
        this.setName(null);
        this.setAciton(Action.IDLE);
        this.updateState();
        this.setAttack(0);
        this.setCharVis(true);
        this.vo = null;
        SceneCharRole.P.push(this);
    };
    SceneCharRole.prototype.setCharVis = function (v) {
        this.view.visible = v;
        this.pauseRender = !v;
    };
    SceneCharRole.prototype.addPlug = function (plug) {
        this.plugs.push(plug);
        plug.onAdd();
    };
    SceneCharRole.prototype.addPlugOnly = function (plug) {
        if (this.getPlugByTag(plug.tag) == null) {
            this.addPlug(plug);
        }
    };
    SceneCharRole.prototype.getPlugByTag = function (tag) {
        var plugs = this.plugs;
        var len = plugs.length;
        for (var i = 0; i < len; i++) {
            var plug = plugs[i];
            if (plug && plug.tag == tag) {
                return plug;
            }
        }
        return null;
    };
    SceneCharRole.prototype.removPlugByTag = function (tag) {
        var plug = this.getPlugByTag(tag);
        if (plug)
            this.removePlug(plug);
    };
    SceneCharRole.prototype.removePlug = function (plug) {
        var index = this.plugs.indexOf(plug);
        if (true) {
            if (index == -1) {
                throw new Error("plugIndexError");
            }
        }
        this.plugs[index] = null;
        plug.onRemove();
    };
    //检查目标点是否进入可交互范围
    //rect 100 * 100
    SceneCharRole.prototype.checkIntRange = function (tx, ty) {
        var xx = this.x;
        var yy = this.y;
        if (tx < xx - 50)
            return false;
        if (tx > xx + 50)
            return false;
        if (ty < yy - 50)
            return false;
        if (ty > yy + 50)
            return false;
        return true;
    };
    //锁定移动到目标 并触发交互
    SceneCharRole.prototype.lockTargetInt = function (tar) {
        if (tar == null)
            return;
        var plug = this.getPlugByTag("LockTargetInvPlug");
        var newTar = false;
        if (plug == null) {
            newTar = true;
        }
        else {
            if (plug.tar != tar) {
                this.removPlugByTag("LockTargetInvPlug");
                newTar = true;
            }
        }
        if (newTar) {
            var nPlug = new LockTargetInvPlug();
            nPlug.tar = tar;
            nPlug.role = this;
            this.addPlugOnly(nPlug);
        }
        else {
            plug.onAdd();
        }
    };
    SceneCharRole.prototype.setBattleState = function (v) {
    };
    SceneCharRole.prototype.onEvent = function (evt, arg) {
        var plugs = this.plugs;
        var len = plugs.length;
        for (var i = 0; i < len; i++) {
            var plug = plugs[i];
            if (plug) {
                plug.onEvent(evt, arg);
            }
        }
    };
    SceneCharRole.UEVENT_ACCPATH = 1; //获得寻路路径
    SceneCharRole.UEVENT_TALK = 2;
    SceneCharRole.UEVENT_REACH = 3; //到达目的地
    SceneCharRole.UEVENT_ON_TOUCH = 4; //被点击
    SceneCharRole.UEVENT_USERCLICKMAP = 5; //玩家点击地图
    SceneCharRole.UEVENT_STOPMOVE = 6; //停止移动
    SceneCharRole.P = [];
    return SceneCharRole;
}(SceneObject));
__reflect(SceneCharRole.prototype, "SceneCharRole");
//# sourceMappingURL=SceneCharRole.js.map