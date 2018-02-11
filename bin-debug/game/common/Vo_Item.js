var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Vo_Item = (function () {
    function Vo_Item() {
        this.count = 1;
    }
    Vo_Item.prototype.initLib = function (id) {
        this.gType = Enum_Attr.ITEM;
        this.cfg = Config.ITEM[id];
        if (true) {
            if (this.cfg == null) {
                throw ("发财了！有可扫码了！没有道具" + id);
            }
        }
        this.id = this.cfg.id;
        this.quality = this.cfg.quality;
        this.name = this.cfg.name;
        this.type = this.cfg.leixing;
        this.useType = this.cfg.fangshi;
        this.level = this.cfg.level;
    };
    Object.defineProperty(Vo_Item.prototype, "canUse", {
        get: function () {
            if (this.useType != 0) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vo_Item.prototype, "qColor", {
        get: function () {
            return Color.QUALITYCOLOR[this.quality];
        },
        enumerable: true,
        configurable: true
    });
    Vo_Item.create = function (id) {
        var vo = new Vo_Item();
        vo.initLib(id);
        return vo;
    };
    return Vo_Item;
}());
__reflect(Vo_Item.prototype, "Vo_Item", ["IGridImpl"]);
//# sourceMappingURL=Vo_Item.js.map