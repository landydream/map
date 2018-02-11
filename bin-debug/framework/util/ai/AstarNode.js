var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AstarNode = (function () {
    function AstarNode() {
        this.state = 0;
        this.nears = [];
    }
    AstarNode.create = function () {
        var ret;
        if (Astar.length > 0) {
            ret = AstarNode.pool.pop();
        }
        else {
            ret = new AstarNode();
        }
        return ret;
    };
    AstarNode.prototype.destory = function () {
        if (this.state != 0) {
            AstarNode.pool.push(this);
            this.state = 0;
        }
        this.nears.length = 0;
    };
    AstarNode.pool = new Array();
    return AstarNode;
}());
__reflect(AstarNode.prototype, "AstarNode");
//# sourceMappingURL=AstarNode.js.map