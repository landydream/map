var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameGlobal = (function () {
    function GameGlobal() {
    }
    GameGlobal.initData = function () {
        //角色激活检测
    };
    GameGlobal.init = function (mainSp) {
        EffectMgr.instance = new EffectMgr();
        GameGlobal.layerMgr.init(mainSp);
        GameGlobal.uiMgr.registerUI();
        GameGlobal.initModel();
    };
    GameGlobal.initModel = function () {
        var gameGlobal = GameGlobal;
        var socketMgr = gameGlobal.socketMgr;
        gameGlobal.modelPlayer = new Model_player();
        gameGlobal.modelPlayer.listenServ(socketMgr);
    };
    /**是否进入了游戏 */
    GameGlobal.isEnterGame = false;
    GameGlobal.msgCenter = new MsgCenter(); //系统流程专用
    GameGlobal.control = new MsgCenter(); //
    GameGlobal.imgLoaderMgr = new LoaderManager();
    GameGlobal.resMgr = new RESManager();
    GameGlobal.layerMgr = new LayerManager();
    GameGlobal.uiMgr = new UIManager();
    GameGlobal.isInBattle = false; //战斗状态
    GameGlobal.isInCollect = false; //采集状态
    GameGlobal.socketMgr = new WebSocketMgr();
    return GameGlobal;
}());
__reflect(GameGlobal.prototype, "GameGlobal");
//# sourceMappingURL=GameGlobal.js.map