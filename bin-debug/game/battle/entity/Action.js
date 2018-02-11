var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Action = (function () {
    function Action() {
    }
    Action.IDLE = 0;
    Action.RUN = 1;
    Action.DEAD = 10;
    Action.HIT = 50;
    Action.ATTACK = 101;
    return Action;
}());
__reflect(Action.prototype, "Action");
//# sourceMappingURL=Action.js.map