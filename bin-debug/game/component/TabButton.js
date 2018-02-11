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
var TabButton = (function (_super) {
    __extends(TabButton, _super);
    function TabButton() {
        var _this = _super.call(this) || this;
        _this._text = "";
        return _this;
    }
    TabButton.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lb.text = this._text;
    };
    TabButton.prototype.dataChanged = function () {
        var info = this.data;
        if (typeof info == "string") {
            this.text = info;
        }
        else {
            this.text = info.text;
            if (info.notice != null) {
                this.setNotice(info.notice);
            }
        }
    };
    Object.defineProperty(TabButton.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (v) {
            this._text = v;
            if (this.lb) {
                this.lb.text = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    TabButton.prototype.setNotice = function (b) {
        if (b) {
            if (!this.imgNotice) {
                this.imgNotice = new eui.Image();
                this.imgNotice.top = -6;
                this.imgNotice.right = -6;
                this.imgNotice.source = "MAINUI_json.BM_RedDot";
                this.addChild(this.imgNotice);
            }
        }
        if (this.imgNotice) {
            this.imgNotice.visible = b;
        }
    };
    return TabButton;
}(eui.ItemRenderer));
__reflect(TabButton.prototype, "TabButton");
//# sourceMappingURL=TabButton.js.map