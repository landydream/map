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
var StaticPart = (function (_super) {
    __extends(StaticPart, _super);
    function StaticPart() {
        return _super.call(this) || this;
    }
    StaticPart.prototype.setAct = function (v) {
        if (this.act != v) {
            this.act = v;
            this.buildmc();
        }
    };
    StaticPart.prototype.buildmc = function () {
        _super.prototype.buildmc.call(this);
        if (this.res && this.res.factory) {
            this.setPec(0);
        }
    };
    return StaticPart;
}(Part));
__reflect(StaticPart.prototype, "StaticPart");
//# sourceMappingURL=StaticPart.js.map