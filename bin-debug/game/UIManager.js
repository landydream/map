var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIManager = (function () {
    function UIManager() {
    }
    /**注册界面 */
    UIManager.prototype.registerUI = function () {
        var layermgr = GameGlobal.layerMgr;
        layermgr.register(UIConst.ALERT, View_Alert, null, layermgr.UI_Popup);
    };
    UIManager.prototype.initMenuUI = function () {
        var layermgr = GameGlobal.layerMgr;
    };
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map