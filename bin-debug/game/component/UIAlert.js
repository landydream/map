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
var UIAlert = (function (_super) {
    __extends(UIAlert, _super);
    function UIAlert() {
        var _this = _super.call(this) || this;
        _this._text = "";
        return _this;
    }
    UIAlert.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lbTitle.text = this._text;
    };
    Object.defineProperty(UIAlert.prototype, "text", {
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
    return UIAlert;
}(eui.Component));
__reflect(UIAlert.prototype, "UIAlert", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=UIAlert.js.map