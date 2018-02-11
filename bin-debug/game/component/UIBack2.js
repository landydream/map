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
var UIBack2 = (function (_super) {
    __extends(UIBack2, _super);
    function UIBack2() {
        var _this = _super.call(this) || this;
        _this._text = "";
        return _this;
    }
    UIBack2.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    UIBack2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lbTitle.text = this._text;
    };
    Object.defineProperty(UIBack2.prototype, "text", {
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
    return UIBack2;
}(eui.Component));
__reflect(UIBack2.prototype, "UIBack2", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=UIBack2.js.map