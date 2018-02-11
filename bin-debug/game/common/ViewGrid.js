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
var ViewGrid = (function (_super) {
    __extends(ViewGrid, _super);
    function ViewGrid() {
        return _super.call(this) || this;
        //this.skinName = "resource/gameSkin/grid/ViewGrid.exml";
    }
    ViewGrid.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchChildren = false;
        this.isTip = true;
    };
    ViewGrid.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var v = this.data;
        if (v) {
            this.icon.source = null;
            ImageUtil.setItemImg(this.icon, v.gType, v.id);
            // var url = "resource/ui/image/icon/" + v.icon + ".png";
            // ImageLoader.instance.loader(url, this.icon);
            // RES.getResByUrl(LoaderManager.getUrl(url), this.loadComplete, this, RES.ResourceItem.TYPE_IMAGE);
            if (v.quality > 0) {
                this.bg.source = "COMMON1_json.Bm_ICON00" + v.quality;
            }
            else {
                this.bg.source = null;
            }
            this.lbNum.text = v.count + "";
            if (v.gType == Enum_Attr.ITEM && v.cfg.leixing == 11) {
                this.setLimitTime(true);
            }
            else {
                this.setLimitTime(false);
            }
            if (v.size) {
                this.width = this.height = v.size;
            }
        }
        else {
            ImageLoader.instance.reduceImgRes(this.icon);
            this.icon.source = null;
            this.bg.source = null;
            this.lbNum.text = "";
            this.setLimitTime(false);
        }
        this.updatePart();
        this.updateExt();
    };
    Object.defineProperty(ViewGrid.prototype, "vo", {
        get: function () {
            return this.data;
        },
        set: function (v) {
            this.data = v;
        },
        enumerable: true,
        configurable: true
    });
    ViewGrid.prototype.setLimitTime = function (bo) {
        if (bo) {
            if (!this.lbTime) {
                this.lbTime = new eui.Label();
                this.lbTime.size = 18;
                this.lbTime.bold = true;
                this.lbTime.bottom = this.lbTime.left = 5;
                this.lbTime.textColor = 0xFF0000;
                this.lbTime.fontFamily = "Microsoft YaHei";
                this.lbTime.text = "限时";
            }
            if (!this.lbTime.parent) {
                this.addChild(this.lbTime);
            }
        }
        else {
            if (this.lbTime && this.lbTime.parent) {
                this.lbTime.parent.removeChild(this.lbTime);
            }
        }
    };
    ViewGrid.prototype.updatePart = function () {
        // var v: IGridImpl = this.data;
        // if (v && v.gType == Enum_Attr.EQUIP) {
        // 	if (Model_Equip.isCultureEquip((v as Vo_Equip).type)) {
        // 		if (!this.lbPart) {
        // 			this.lbPart = new eui.Label();
        // 			this.lbPart.size = 18;
        // 			this.lbPart.bold = true;
        // 			this.lbPart.bottom = this.lbPart.left = 5;
        // 			this.lbPart.textColor = 0xFFFFFF;
        // 			this.lbPart.fontFamily = "Microsoft YaHei";
        // 			//this.lbPart.stroke = 2;
        // 			//this.lbPart.strokeColor = 0x000000;
        // 		}
        // 		if (!this.lbPart.parent) {
        // 			this.addChild(this.lbPart);
        // 		}
        // 		this.lbPart.text = Model_Equip.getPartName((v as Vo_Equip).type);
        // 	} else {
        // 		if (this.lbPart && this.lbPart.parent) {
        // 			this.lbPart.parent.removeChild(this.lbPart);
        // 		}
        // 	}
        // } else {
        // 	if (this.lbPart && this.lbPart.parent) {
        // 		this.lbPart.parent.removeChild(this.lbPart);
        // 	}
        // }
    };
    ViewGrid.prototype.updateExt = function () {
        // var v: IGridImpl = this.data;
        // if (v && v.gType == Enum_Attr.EQUIP) {
        // 	var vv: Vo_Equip = this.data;
        // 	if (Model_Equip.isCultureEquip(vv.type)) {
        // 		if (!this.lbExt) {
        // 			this.lbExt = new eui.Label();
        // 			this.lbExt.size = 18;
        // 			this.lbExt.bold = true;
        // 			this.lbExt.top = this.lbExt.left = 5;
        // 			this.lbExt.textColor = 0xFFFF00;
        // 			this.lbExt.fontFamily = "Microsoft YaHei";
        // 		}
        // 		if (!this.lbExt.parent) {
        // 			this.addChild(this.lbExt);
        // 		}
        // 		var str = Math.floor(vv.level / 1000) + "阶";//阶数要除以1000
        // 		this.lbExt.text = str;
        // 		if (vv.voEx && vv.voEx.exRatio > 0) {
        // 			str += "<font color='#FF9900'>+" + vv.voEx.exRatio + "</font>";
        // 			this.lbExt.textFlow = HtmlUtil.HTMLPARSER.parser(str);
        // 		}
        // 	} else {
        // 		if (this.lbExt && this.lbExt.parent) {
        // 			this.lbExt.parent.removeChild(this.lbExt);
        // 		}
        // 	}
        // } else {
        // 	if (this.lbExt && this.lbExt.parent) {
        // 		this.lbExt.parent.removeChild(this.lbExt);
        // 	}
        // }
    };
    Object.defineProperty(ViewGrid.prototype, "isTip", {
        set: function (bo) {
            if (bo == this._tip) {
                return;
            }
            this._tip = bo;
            if (bo) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    ViewGrid.prototype.touchHandler = function (e) {
        var vo = this.data;
        if (vo) {
            if (vo.gType == Enum_Attr.EQUIP) {
                GameGlobal.layerMgr.open(UIConst.EQUIP_TIPS, vo);
            }
            else {
                GameGlobal.layerMgr.open(UIConst.ITEM_TIPS, vo);
            }
        }
    };
    return ViewGrid;
}(eui.ItemRenderer));
__reflect(ViewGrid.prototype, "ViewGrid");
//# sourceMappingURL=ViewGrid.js.map