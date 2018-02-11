var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneCtrl = (function () {
    function SceneCtrl() {
    }
    SceneCtrl.getCtrl = function (scenetype) {
        var sceneCtrl = SceneCtrl;
        if (scenetype == sceneCtrl.GUANQIA) {
            return GuanQiaSceneCtrl.instance;
        }
    };
    SceneCtrl.GUANQIA = 1; /**关卡小怪 */
    SceneCtrl.GANG = 2; /**帮会 */
    SceneCtrl.KUAFU_BATTLE = 3; //跨服战
    SceneCtrl.TOURNAMENT = 4; //比武大会	
    SceneCtrl.KFBOSS = 5; //跨服boss		
    return SceneCtrl;
}());
__reflect(SceneCtrl.prototype, "SceneCtrl");
//# sourceMappingURL=IsceneCtrl.js.map