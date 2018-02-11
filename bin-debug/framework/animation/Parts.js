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
var Parts = (function (_super) {
    __extends(Parts, _super);
    function Parts() {
        var _this = _super.call(this) || this;
        _this.list = [];
        _this.dic = {};
        _this.len = 0;
        _this._needSort = false;
        _this.ptype = 0;
        _this._perc = 0;
        return _this;
    }
    Object.defineProperty(Parts.prototype, "perc", {
        get: function () {
            return this._perc;
        },
        set: function (v) {
            this._perc = v;
            var list = this.list;
            var len = list.length;
            if (this.ptype == Parts.DIS_REAPEAT) {
                if (v >= 1) {
                    v = v - (v >> 0);
                    if (v >= 1) {
                        v = 0.999;
                    }
                }
            }
            else {
                if (v >= 1) {
                    v = 0.999;
                }
            }
            for (var i = 0; i < len; i++) {
                var p = list[i];
                p.setPec(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    Parts.prototype.addPart = function (p) {
        if (p.parts != this) {
            p.parts = this;
            this.list.push(p);
            this._needSort = true;
            this.len++;
            this.dic[p.type] = p;
            this.addChild(p.view);
        }
    };
    Parts.prototype.removePart = function (p) {
        var index = this.list.indexOf(p);
        if (index != -1) {
            this.list.splice(index, 1);
            delete this.dic[p.type];
            this.removeChild(p.view);
            p.dispose();
        }
    };
    Parts.prototype.removePartByType = function (type) {
        var part = this.dic[type];
        if (part) {
            this.removePart(part);
        }
    };
    Parts.prototype.isPartByType = function (type) {
        if (this.dic[type]) {
            return true;
        }
        return false;
    };
    Parts.prototype.setPart = function (type, arg) {
        var p = this.dic[type];
        if (p) {
            p.setVal(arg);
        }
    };
    Parts.prototype.sort = function () {
        var list = this.list;
        var len = list.length;
        list.sort(this.dSortFunc);
        for (var i = 0; i < len; i++) {
            var p = list[i];
            var oldindex = this.getChildIndex(p.view);
            if (oldindex != -1 && oldindex != i) {
                this.setChildIndex(p.view, i);
            }
        }
    };
    Parts.prototype.dSortFunc = function (a, b) {
        var ret = a.dep - b.dep;
        return ret;
    };
    Parts.prototype.setVal = function (v) {
        var list = this.list;
        for (var i = list.length - 1; i >= 0; i--) {
            var p = list[i];
            p.setAct(v);
        }
    };
    Parts.P_SHADOW = -3;
    Parts.P_GH = -2;
    Parts.P_WEAPON_DOWN = 1;
    Parts.P_BODY = 2;
    Parts.P_WEAPON = 3;
    Parts.P_WING = 4;
    Parts.P_HORSE = 5;
    Parts.P_HORSE_HEAD = 6;
    Parts.P_TX = 9;
    Parts.P_TITLE = 10;
    Parts.P_BUFF = 11;
    Parts.D_PART_LIST = [Parts.P_HORSE, Parts.P_WING, Parts.P_BODY, Parts.P_WEAPON, Parts.P_HORSE_HEAD];
    Parts.U_PART_LIST = [Parts.P_HORSE, Parts.P_WEAPON_DOWN, Parts.P_BODY, Parts.P_WEAPON, Parts.P_WING];
    Parts.DIS_REAPEAT = 0;
    Parts.DIS_ONCE = 1;
    return Parts;
}(egret.Sprite));
__reflect(Parts.prototype, "Parts");
//# sourceMappingURL=Parts.js.map