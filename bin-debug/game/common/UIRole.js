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
var UIRole = (function (_super) {
    __extends(UIRole, _super);
    function UIRole() {
        var _this = _super.call(this) || this;
        _this.aniTime = 0;
        _this.aniInterv = 1000;
        _this.dir = 1;
        _this.invalid = 0; // |1：皮肤有更新
        _this.isRepeat = true;
        _this.scale = 1;
        _this.action = 0;
        var self = _this;
        _this.touchEnabled = _this.touchChildren = false;
        self.createParts();
        _this.setDir(2);
        return _this;
    }
    UIRole.prototype.createParts = function () {
        this.parts = new Parts();
        this.addChild(this.parts);
        // var body: Part = new Part();
        // body.type = Parts.P_BODY;
        // body.dep = 5;
        // this.parts.addPart(body);
    };
    UIRole.prototype.update = function () {
        var nowTime = egret.getTimer();
        var dt = nowTime - this._last;
        dt = 33;
        var self = this;
        self.aniTime += dt;
        var perc = self.aniTime / self.aniInterv;
        if (self.isRepeat == false) {
            if (self.aniTime > self.aniInterv) {
                self.parts.perc = 0;
                if (self.playList) {
                    self.playNext();
                }
                else {
                    self.playIdle();
                }
            }
            else {
                self.parts.perc = perc;
            }
        }
        else {
            self.parts.perc = perc;
        }
        if (self.invalid) {
            self.updateState();
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
    };
    UIRole.prototype.setPart = function (type, v) {
        if (type == UnitConst.KEY_BODY || type == UnitConst.KEY_XIANLV_ID || type == UnitConst.KEY_TIANNV_ID || type == UnitConst.KEY_PET_ID) {
            this.setBody(v);
        }
        else if (type == UnitConst.KEY_WEAPON) {
            this.setWeapon(v);
        }
        else if (type == UnitConst.KEY_HORSE) {
            this.setHorse(v);
        }
        else if (type == UnitConst.KEY_WING) {
            this.setWing(v);
        }
        else if (type == UnitConst.KEY_TIANXIAN_ID) {
            this.setTianXian(v);
        }
        else if (type == UnitConst.KEY_TITLE || type == UnitConst.KEY_XIANWEI) {
            this.setTitle(v);
        }
        else if (type == UnitConst.KEY_FAZHEN || type == UnitConst.KEY_TONGLING) {
            this.setGuangHuan(v);
        }
        else if (type == UnitConst.KEY_SOUL) {
            this.setSoul(v);
        }
    };
    UIRole.prototype.getBody = function () {
        return this.body;
    };
    UIRole.prototype.setBody = function (v) {
        if (this.body != v) {
            this.body = v;
            this.invalid |= 3;
        }
    };
    UIRole.prototype.setHorse = function (v) {
        if (v != this.horse) {
            this.horse = v;
            this.invalid |= 3;
        }
    };
    UIRole.prototype.setWing = function (v) {
        if (v != this.wing) {
            this.wing = v;
            this.invalid |= 3;
        }
    };
    UIRole.prototype.setWeapon = function (v) {
        if (this.weapon != v) {
            this.weapon = v;
            this.invalid |= 3;
        }
    };
    UIRole.prototype.setTianXian = function (v) {
        if (this.tx != v) {
            this.tx = v;
            this.invalid |= 8;
        }
    };
    UIRole.prototype.clear = function () {
        if (this.body) {
            this.setBody(0);
        }
        if (this.horse) {
            this.setHorse(0);
        }
        if (this.wing) {
            this.setWing(0);
        }
        if (this.weapon) {
            this.setWeapon(0);
        }
        if (this.tx) {
            this.setTianXian(0);
        }
        if (this.title) {
            this.setTitle(0);
        }
        if (this.guangHuan) {
            this.setGuangHuan(0);
        }
        this.setSoul(0);
    };
    UIRole.prototype.setDir = function (v) {
        if (this.dir != v) {
            this.dir = v;
            this.invalid |= 1;
            this.invalid |= 2;
        }
    };
    UIRole.prototype.setAciton = function (v) {
        if (this.action != v) {
            this.action = v;
            this.invalid |= 1;
        }
    };
    UIRole.prototype.updateState = function () {
        var invalid = this.invalid;
        if (invalid) {
            if (invalid & 1) {
                this.updateAction();
            }
            if (invalid & 2) {
                this.updateWay();
            }
            if (invalid & 4) {
            }
            if (invalid & 8) {
                this.updateTX();
            }
            this.invalid = 0;
        }
    };
    UIRole.prototype.playAtt = function () {
        this.playList = [Action.IDLE, Action.ATTACK];
        this.isRepeat = false;
        this.playNext();
    };
    UIRole.prototype.playNext = function () {
        if (this.playList && this.playList.length > 0) {
            var act = this.playList.shift();
            if (this.playList.length <= 0) {
                this.playList = null;
            }
            this.action = act;
            this.aniTime = 0;
            this.invalid |= 1;
        }
    };
    UIRole.prototype.playIdle = function () {
        this.isRepeat = true;
        this.action = Action.IDLE;
        this.aniTime = 0;
        this.invalid |= 1;
    };
    UIRole.prototype.updateAction = function () {
        var self = this;
        var dirKey;
        var actKey;
        if (self.dir == 2 || self.dir == 3) {
            dirKey = "d";
        }
        else {
            dirKey = "u";
        }
        if (self.action == Action.IDLE) {
            actKey = "stand";
            self.aniInterv = 1000;
        }
        else if (self.action == Action.RUN) {
            actKey = "run";
            self.aniInterv = 800;
        }
        else if (self.action == Action.ATTACK) {
            actKey = "attack";
            self.aniInterv = 800;
        }
        var bodyP = self.parts.dic[Parts.P_BODY];
        if (self.body) {
            if (!bodyP) {
                bodyP = Part.create();
                bodyP.type = Parts.P_BODY;
                bodyP.dep = 5;
            }
            if (!self.parts.isPartByType(Parts.P_BODY)) {
                self.parts.addPart(bodyP);
            }
            var bkey = "body/" + self.body + "/" + dirKey + "/" + "ani";
            bodyP.setAct(actKey);
            bodyP.setVal(bkey);
        }
        else {
            if (bodyP) {
                self.parts.removePart(bodyP);
            }
        }
        var weaponkey;
        var horsekey;
        var horseHeadKey;
        var wingkey;
        if (self.weapon) {
            weaponkey = "weapon/" + self.weapon + "/" + dirKey + "/" + "ani";
        }
        if (self.horse) {
            horsekey = "horse/" + self.horse + "/" + dirKey + "/" + "ani";
            horseHeadKey = "horse/" + self.horse + "/" + "head" + "/" + "ani";
        }
        if (self.wing) {
            wingkey = "wing/" + self.wing + "/" + dirKey + "/" + "ani";
        }
        var weapon = self.parts.dic[Parts.P_WEAPON];
        if (weaponkey) {
            if (!weapon) {
                weapon = Part.create();
                weapon.type = Parts.P_WEAPON;
            }
            if (!self.parts.isPartByType(Parts.P_WEAPON)) {
                self.parts.addPart(weapon);
            }
            weapon.setAct(actKey);
            weapon.setVal(weaponkey);
        }
        else {
            if (weapon) {
                self.parts.removePart(weapon);
            }
        }
        var horsePart = self.parts.dic[Parts.P_HORSE];
        var horseHeadPart = self.parts.dic[Parts.P_HORSE_HEAD];
        if (horsekey) {
            if (!horsePart) {
                horsePart = Part.create();
                horsePart.type = Parts.P_HORSE;
                var horseHeadPart = Part.create();
                horseHeadPart.type = Parts.P_HORSE_HEAD;
            }
            if (!self.parts.isPartByType(Parts.P_HORSE)) {
                self.parts.addPart(horsePart);
            }
            if (!self.parts.isPartByType(Parts.P_HORSE_HEAD)) {
                self.parts.addPart(horseHeadPart);
            }
            horsePart.setAct(actKey);
            horsePart.setVal(horsekey);
            horseHeadPart.setAct(actKey);
            horseHeadPart.setVal(horseHeadKey);
        }
        else {
            if (horsePart) {
                self.parts.removePart(horsePart);
                self.parts.removePart(horseHeadPart);
            }
        }
        var wingPart = self.parts.dic[Parts.P_WING];
        if (wingkey) {
            if (!wingPart) {
                wingPart = Part.create();
                wingPart.type = Parts.P_WING;
            }
            if (!self.parts.isPartByType(Parts.P_WING)) {
                self.parts.addPart(wingPart);
            }
            wingPart.setAct(actKey);
            self.parts.setPart(Parts.P_WING, wingkey);
        }
        else {
            if (wingPart) {
                self.parts.removePart(wingPart);
            }
        }
        self.updatePos();
    };
    /**
     * 4  1
     * 3  2
     */
    UIRole.prototype.updateWay = function () {
        var self = this;
        self.parts.scaleY = self.scale;
        if (self.dir == 3 || self.dir == 4) {
            self.parts.scaleX = self.scale;
        }
        else {
            self.parts.scaleX = -1 * self.scale;
        }
        var lis = self.parts.list;
        if (lis.length == 1)
            return;
        for (var i = 0; i < lis.length; i++) {
            var p = lis[i];
            if (p)
                p.dep = self.getDep(p.type);
            if (p.type == Parts.P_HORSE_HEAD) {
                if (self.dir == 2 || self.dir == 3) {
                    p.view.visible = true;
                }
                else {
                    p.view.visible = false;
                }
            }
        }
        self.parts.sort();
    };
    UIRole.prototype.updateTX = function () {
        var self = this;
        var tx = self.tx;
        if (tx > 0) {
            var key = "eff/tianxian/" + tx;
            if (!self.txPart) {
                self.txPart = TXPart.createPart(self);
                self.txPart.act = "_2";
                self.txPart.setVal(key);
                self.addChild(self.txPart.view);
            }
            self.txPart.setVal(key);
        }
        else {
            if (self.txPart) {
                self.removeChild(self.txPart.view);
                self.txPart.dispose();
                self.txPart = null;
            }
        }
    };
    UIRole.prototype.setTitle = function (v) {
        var self = this;
        if (v > 0) {
            if (this.title != v) {
                var key = "eff/title/" + v;
                if (!self.titlePart) {
                    self.titlePart = Part.create();
                    self.titlePart.act = "_1";
                    self.titlePart.setVal(key);
                    self.titlePart.view.y = -120;
                    self.addChild(self.titlePart.view);
                    this.updatePos();
                }
                else {
                    self.titlePart.setVal(key);
                }
            }
        }
        else {
            if (self.titlePart) {
                self.removeChild(self.titlePart.view);
                self.titlePart.dispose();
                self.titlePart = null;
            }
        }
        this.title = v;
    };
    UIRole.prototype.setGuangHuan = function (v) {
        var self = this;
        if (v > 0) {
            if (this.guangHuan != v) {
                var key = "eff/guanghuan/" + v;
                if (!self.ghPart) {
                    self.ghPart = Part.create();
                    self.ghPart.act = "_1";
                    self.ghPart.setVal(key);
                    self.addChildAt(self.ghPart.view, 0);
                    this.updatePos();
                }
                else {
                    self.ghPart.setVal(key);
                }
            }
        }
        else {
            if (self.ghPart) {
                self.removeChild(self.ghPart.view);
                self.ghPart.dispose();
                self.ghPart = null;
            }
        }
        this.guangHuan = v;
    };
    UIRole.prototype.setSoul = function (v) {
        var self = this;
        if (v) {
            var key = "resource/ui/pet/soul/" + v + ".png";
            if (!self.soulPart) {
                self.soulPart = SoulPart.createPart(self);
                self.addChild(self.soulPart.view);
            }
            self.soulPart.setVal(key);
        }
        else {
            if (self.soulPart) {
                self.removeChild(self.soulPart.view);
                self.soulPart = null;
            }
        }
    };
    UIRole.prototype.updatePos = function () {
        // var py = Model_Ride.getPartOffY(this.horse);
        // this.parts.y = py;
        // if (this.titlePart) {
        // 	var offy = -120;
        // 	if (this.body > 0 && Config.QXGD[this.body]) {
        // 		offy = -Config.QXGD[this.body].gd;
        // 	}
        // 	this.titlePart.view.y = offy + py;
        // }
    };
    UIRole.prototype.getDep = function (type) {
        if (this.dir == 4 || this.dir == 1) {
            return Parts.U_PART_LIST.indexOf(type);
        }
        else {
            return Parts.D_PART_LIST.indexOf(type);
        }
    };
    UIRole.prototype.dispose = function () {
        var self = this;
        self.clear();
        self.setDir(2);
        if (self.parent) {
            self.parent.removeChild(self);
        }
        self.x = self.y = 0;
        self.scaleX = self.scaleY = 1;
        UIRole.pool.push(self);
        if (self.visible == false) {
            self.visible = true;
        }
    };
    UIRole.create = function () {
        var r = UIRole.pool.length ? UIRole.pool.pop() : new UIRole();
        return r;
    };
    UIRole.pool = [];
    return UIRole;
}(egret.DisplayObjectContainer));
__reflect(UIRole.prototype, "UIRole");
//# sourceMappingURL=UIRole.js.map