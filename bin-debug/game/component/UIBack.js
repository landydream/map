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
var UIBack = (function (_super) {
    __extends(UIBack, _super);
    function UIBack() {
        var _this = _super.call(this) || this;
        _this._text = "";
        return _this;
    }
    UIBack.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    UIBack.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lbTitle.text = this._text;
    };
    Object.defineProperty(UIBack.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (s) {
            this._text = s;
            if (this.lbTitle) {
                this.lbTitle.text = s;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**显示背景图片 texture：可以是图片的资源路径，或者default.res.json的资源 */
    UIBack.prototype.setBg = function (texture, y) {
        if (y === void 0) { y = 20; }
        if (!texture) {
            if (this.bmBg && this.bmBg.parent) {
                this.bmBg.parent.removeChild(this.bmBg);
            }
            return;
        }
        if (!this.bmBg) {
            this.bmBg = new eui.Image();
            this.bmBg.horizontalCenter = 0;
        }
        if (!this.bmBg.parent) {
            this.addChildAt(this.bmBg, 3);
        }
        this.bmBg.y = y;
        ImageLoader.instance.reduceImgRes(this.bmBg);
        if (typeof (texture) == "string" && texture.indexOf("/") >= 0) {
            ImageLoader.instance.loader(texture, this.bmBg);
        }
        else {
            this.bmBg.source = texture;
        }
    };
    return UIBack;
}(eui.Component));
__reflect(UIBack.prototype, "UIBack", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=UIBack.js.map