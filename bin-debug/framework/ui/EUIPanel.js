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
/**此界面是1级界面，并打开关闭会发事件 */
var EUIPanel = (function (_super) {
    __extends(EUIPanel, _super);
    function EUIPanel() {
        var _this = _super.call(this) || this;
        _this.ptype = 1;
        return _this;
    }
    EUIPanel.prototype.onOpen = function (arg) {
        var mgr = GameGlobal.layerMgr;
        mgr.closeType(1, this.pid);
        mgr.UI_MainBottom.visible = false;
        mgr.Battle_Layer.visible = false;
        GameGlobal.mapscene.view.visible = false;
        _super.prototype.onOpen.call(this, arg);
        // if (this.pid) {
        // 	GameGlobal.control.notify(Enum_MsgType.MSG_OPEN_UIPANEL, this.pid);
        // }
    };
    EUIPanel.prototype.onClose = function () {
        var mgr = GameGlobal.layerMgr;
        mgr.UI_MainBottom.visible = true;
        mgr.Battle_Layer.visible = true;
        GameGlobal.mapscene.view.visible = true;
        _super.prototype.onClose.call(this);
        // if (this.pid) {
        // 	GameGlobal.control.notify(Enum_MsgType.MSG_CLOSE_UIPANEL, this.pid);
        // }
    };
    return EUIPanel;
}(BaseEUIView));
__reflect(EUIPanel.prototype, "EUIPanel");
//# sourceMappingURL=EUIPanel.js.map