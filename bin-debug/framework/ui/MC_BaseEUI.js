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
/**在主城中打开的界面，打开界面会关闭主城，手动点击关闭界面自动打开主城 */
var MC_BaseEUI = (function (_super) {
    __extends(MC_BaseEUI, _super);
    function MC_BaseEUI() {
        var _this = _super.call(this) || this;
        _this.ptype = 2;
        return _this;
    }
    MC_BaseEUI.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        var mgr = GameGlobal.layerMgr;
        mgr.close(UIConst.MAIN_CITY);
        mgr.UI_MainBottom.visible = false;
        mgr.Battle_Layer.visible = false;
        GameGlobal.mapscene.view.visible = false;
    };
    MC_BaseEUI.prototype.closeHandler = function () {
        _super.prototype.closeHandler.call(this);
        GameGlobal.layerMgr.open(UIConst.MAIN_CITY);
    };
    MC_BaseEUI.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        var mgr = GameGlobal.layerMgr;
        mgr.UI_MainBottom.visible = true;
        mgr.Battle_Layer.visible = true;
        GameGlobal.mapscene.view.visible = true;
    };
    return MC_BaseEUI;
}(BaseEUIView));
__reflect(MC_BaseEUI.prototype, "MC_BaseEUI");
//# sourceMappingURL=MC_BaseEUI.js.map