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
var TBTN = (function (_super) {
    __extends(TBTN, _super);
    function TBTN() {
        var _this = _super.call(this) || this;
        _this._text = "";
        return _this;
        // this.skinName = "resource/gameSkin/component/TBTN.exml";
    }
    TBTN.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TBTN.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.imgNotice.visible = false;
        this.lb.text = this._text;
        this.touchChildren = false;
    };
    TBTN.prototype.setText = function (str) {
        this.text = str;
        this.invalidateDisplayList();
    };
    TBTN.prototype.setNoticVis = function (v) {
        this.imgNotice.visible = v;
    };
    TBTN.prototype.setDoubleVis = function (v) {
        if (v) {
            if (!this.imgDouble) {
                this.imgDouble = new eui.Image();
                this.imgDouble.left = -6;
                this.imgDouble.top = -6;
                this.addChild(this.imgDouble);
                this.imgDouble.source = "COMMON1_json.Ico_Double";
            }
            this.imgDouble.visible = v;
        }
        else {
            if (this.imgDouble) {
                this.imgDouble.visible = v;
            }
        }
    };
    Object.defineProperty(TBTN.prototype, "label", {
        get: function () {
            return "";
        },
        set: function (char) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TBTN.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (char) {
            if (this._text == char) {
                return;
            }
            this._text = char;
            if (this.lb) {
                this.lb.text = this._text;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TBTN.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (boo) {
            this._selected = boo;
            this.currentState = boo == true ? "down" : "up";
        },
        enumerable: true,
        configurable: true
    });
    return TBTN;
}(eui.Component));
__reflect(TBTN.prototype, "TBTN", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TBTN.js.map