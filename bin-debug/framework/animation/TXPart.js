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
var TXPart = (function (_super) {
    __extends(TXPart, _super);
    function TXPart(master) {
        var _this = _super.call(this) || this;
        _this.mv = 1;
        _this.master = master;
        return _this;
    }
    TXPart.createPart = function (master) {
        var ret = TXPart.pool.length ? TXPart.pool.pop() : new TXPart(master);
        if (true) {
            ret.isDispose = null;
        }
        ret.master = master;
        return ret;
    };
    TXPart.prototype.update = function (v) {
        if (v >= 1) {
            v = v - (v >> 0);
        }
        var self = this;
        self.setPec(v);
        if (self.dir != self.master.dir) {
            self.dir = self.master.dir;
            if (self.dir == 1 || self.dir == 4) {
                // if (self.master.view) {
                // 	self.master.view.setChildIndex(self.view, self.master.view.numChildren - 1);
                // } else {
                // 	self.master.setChildIndex(self.view, self.master.numChildren - 1);
                // }
                self.setAct("_1");
            }
            else {
                // if (self.master.view) {
                // 	self.master.view.setChildIndex(self.view, 0);
                // } else {
                // 	self.master.setChildIndex(self.view, 0);
                // }
                self.setAct("_2");
            }
            var scale = 1;
            if (self.master.scale) {
                scale = self.master.scale;
            }
            if (self.dir == 3 || self.dir == 4) {
                self.view.scaleX = scale;
            }
            else {
                self.view.scaleX = -1 * scale;
            }
            var pos = UnitManager.TianXianPos[self.master.dir];
            self.endX = pos[0];
            self.endY = pos[1];
            self.startX = self.view.x;
            self.startY = self.view.y;
            var s = MathUtil.distance(self.startX, self.startY, self.endX, self.endY);
            self.needTime = Math.ceil(Math.sqrt(s) * 8 / 33);
            self.time = 0;
        }
        else {
            if (self.time < self.needTime) {
                self.time += 1;
                var invRatio = self.time / self.needTime - 1.0;
                var rate = invRatio * invRatio * invRatio + 1;
                self.view.$setX(MathUtil.getPosValue(self.startX, self.endX, rate));
                self.view.$setY(MathUtil.getPosValue(self.startY, self.endY, rate));
            }
            else {
                var inter = 10;
                if (self.master.action != Action.IDLE) {
                    inter = 5;
                }
                if (self.mv & 1) {
                    self.view.y -= 0.5;
                }
                else if (self.mv & 2) {
                    self.view.y += 0.5;
                }
                if (self.view.y <= self.endY - inter) {
                    self.mv = 2;
                }
                else if (self.view.y >= self.endY + inter) {
                    self.mv = 1;
                }
            }
        }
    };
    TXPart.prototype.dispose = function () {
        var self = this;
        if (true) {
            if (self.isDispose) {
                console.error("错误的释放PART:" + self.val);
            }
            self.isDispose = true;
        }
        self.parts = null;
        self.view.visible = false;
        self.view.scaleX = self.view.scaleY = 1;
        self.view.x = this.view.y = 0;
        self.setVal(null);
        self.dep = 0;
        self.master = null;
        self.dir = null;
        self.mv = 0;
        TXPart.pool.push(this);
    };
    TXPart.pool = [];
    return TXPart;
}(Part));
__reflect(TXPart.prototype, "TXPart");
//# sourceMappingURL=TXPart.js.map