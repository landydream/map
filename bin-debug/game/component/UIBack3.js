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
var UIBack3 = (function (_super) {
    __extends(UIBack3, _super);
    function UIBack3() {
        var _this = _super.call(this) || this;
        _this._text = "";
        return _this;
    }
    UIBack3.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    UIBack3.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lbTitle.text = this._text;
    };
    Object.defineProperty(UIBack3.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (s) {
            this._text = s;
            if (this.lbTitle) {
                this.lbTitle.text = s;
            }
        },
        enumerable: true,
        configurable: true
    });
    return UIBack3;
}(eui.Component));
__reflect(UIBack3.prototype, "UIBack3", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=UIBack3.js.map