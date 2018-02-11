var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Enum_MsgType = (function () {
    function Enum_MsgType() {
    }
    Enum_MsgType.BATTLE_MAP_SHAKE = "BATTLE_MAP_SHAKE";
    Enum_MsgType.ON_BATTLE_ENTER = "ON_BATTLE_ENTER";
    Enum_MsgType.ON_BATTLE_EXIT = "ON_BATTLE_EXIT";
    Enum_MsgType.MSG_RENAME = "MSG_RENAME";
    Enum_MsgType.MSG_PLAYER_LIST = "MSG_PLAYER_LIST";
    Enum_MsgType.MSG_GANGMEMBER_LIST = "MSG_GANGMEMBER_LIST";
    /**UIPanel界面打开事件 */
    Enum_MsgType.MSG_OPEN_UIPANEL = "MSG_OPEN_UIPANEL";
    /**UIPanel界面关闭事件 */
    Enum_MsgType.MSG_CLOSE_UIPANEL = "MSG_CLOSE_UIPANEL";
    /**进阶系统等阶更新 */
    Enum_MsgType.MSG_CULTURE_LEVEL_UDPATE = "MSG_CULTURE_LEVEL_UDPATE";
    /**主城上方组队提示更新 */
    Enum_MsgType.MSG_TEAMALET_UPDATE = "MSG_TEAMALET_UPDATE";
    /**跨服移动 */
    Enum_MsgType.MSG_KF_PLAYER_POS = "MSG_KF_PLAYER_POS";
    return Enum_MsgType;
}());
__reflect(Enum_MsgType.prototype, "Enum_MsgType");
//# sourceMappingURL=Enum_MsgType.js.map