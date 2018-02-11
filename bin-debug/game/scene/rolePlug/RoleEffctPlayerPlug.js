var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleEffctPlayerPlug = (function () {
    function RoleEffctPlayerPlug() {
        this.tag = "RoleEffctPlayerPlug";
        this.list = [];
    }
    RoleEffctPlayerPlug.create = function () {
        var pool = this.POOL;
        return pool.length ? pool.shift() : new RoleEffctPlayerPlug();
    };
    RoleEffctPlayerPlug.prototype.onAdd = function () {
    };
    RoleEffctPlayerPlug.prototype.onRemove = function () {
        this.role = null;
        var list = this.list;
        var len = list.length;
        if (len > 0) {
            for (var i = list.length - 1; i >= 0; i--) {
                var part = list[i];
                if (part.view.parent) {
                    part.view.parent.removeChild(part.view);
                }
                part.dispose();
            }
            list.length = 0;
        }
    };
    RoleEffctPlayerPlug.prototype.update = function (ctx) {
        var list = this.list;
        var len = list.length;
        var del = 0;
        for (var i = 0, len = list.length; i < len; i++) {
            var part = list[i];
            part.startTime += ctx.dt;
            var perc = part.startTime / part.aniInterv;
            if (part.repeat) {
                perc = perc - (perc >> 0);
            }
            part.setPec(perc);
            if (part.endTime <= part.startTime) {
                list[i] = null;
                if (part.view.parent) {
                    part.view.parent.removeChild(part.view);
                }
                part.dispose();
                del++;
            }
        }
        if (del) {
            ArrayUitl.cleannull(list);
            if (list.length == 0) {
                ctx.d = 1;
            }
        }
    };
    RoleEffctPlayerPlug.prototype.addEff = function (key, x, y, interval, time, repeat, act) {
        if (time === void 0) { time = -1; }
        if (repeat === void 0) { repeat = false; }
        if (act === void 0) { act = 1; }
        var part = Part.create();
        part.act = act;
        part.setVal(key);
        part.aniInterv = interval;
        part.startTime = 0;
        part.repeat = repeat;
        if (time < 0) {
            time = 9999999999;
        }
        part.endTime = time;
        part.view.x = x;
        part.view.y = y;
        this.role.view.addChild(part.view);
        part.setAct(act);
        part.setVal(key);
        this.list.push(part);
        return part;
    };
    RoleEffctPlayerPlug.POOL = [];
    return RoleEffctPlayerPlug;
}());
__reflect(RoleEffctPlayerPlug.prototype, "RoleEffctPlayerPlug");
//# sourceMappingURL=RoleEffctPlayerPlug.js.map