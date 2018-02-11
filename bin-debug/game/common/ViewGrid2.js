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
var ViewGrid2 = (function (_super) {
    __extends(ViewGrid2, _super);
    function ViewGrid2() {
        return _super.call(this) || this;
        // this.skinName = "resource/gameSkin/grid/ViewGrid2.exml";
    }
    ViewGrid2.create = function () {
        return new ViewGrid2();
    };
    ViewGrid2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lbName.textColor = Color.TEXTINT;
    };
    ViewGrid2.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var v = this.data;
        this.grid.data = v;
        // if (v) {
        // 	if (v.gType == Enum_Attr.EQUIP) {
        // 		if (Model_Equip.isEquip((v as Vo_Equip).type)) {
        // 			this.lbName.text = "Lv." + (v as Vo_Equip).level;
        // 		}else{
        // 			this.lbName.text = Math.floor((v as Vo_Equip).level/1000) + "阶";
        // 		}
        // 	} else {
        // 		this.lbName.textFlow = HtmlUtil.HTMLPARSER.parse(ConfigHelp.getTextByQuality(v.name, v.quality));
        // 		// this.lbName.textColor = v.qColor;
        // 	}
        // } else {
        // 	this.lbName.text = "";
        // }
    };
    Object.defineProperty(ViewGrid2.prototype, "vo", {
        get: function () {
            if (this.grid) {
                return this.grid.vo;
            }
            return this.data;
        },
        set: function (v) {
            this.data = v;
        },
        enumerable: true,
        configurable: true
    });
    return ViewGrid2;
}(eui.ItemRenderer));
__reflect(ViewGrid2.prototype, "ViewGrid2");
//# sourceMappingURL=ViewGrid2.js.map