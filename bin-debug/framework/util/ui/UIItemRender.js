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
var UIItemRender = (function (_super) {
    __extends(UIItemRender, _super);
    function UIItemRender() {
        return _super.call(this) || this;
    }
    UIItemRender.prototype.clean = function () {
    };
    return UIItemRender;
}(eui.ItemRenderer));
__reflect(UIItemRender.prototype, "UIItemRender");
//# sourceMappingURL=UIItemRender.js.map