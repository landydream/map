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
var LinkBtn = (function (_super) {
    __extends(LinkBtn, _super);
    function LinkBtn() {
        var _this = _super.call(this) || this;
        _this._textColor = 0xFFFFFF;
        _this._strokeInt = 0;
        _this._strokeColor = 0x000000;
        _this._islink = true;
        return _this;
        //this.skinName = "resource/gameSkin/component/LinkBtnSkin.exml";
    }
    LinkBtn.prototype.childrenCreated = function () {
    };
    Object.defineProperty(LinkBtn.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (str) {
            this._text = str;
            // this.lb.text = str;
            this.updateLb();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkBtn.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (size) {
            this._size = size;
            // this.lb.size = size;
            this.updateLb();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkBtn.prototype, "textColor", {
        get: function () {
            return this._textColor;
        },
        set: function (value) {
            this._textColor = value;
            this.updateLb();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkBtn.prototype, "strokeInt", {
        get: function () {
            return this._strokeInt;
        },
        set: function (value) {
            this._strokeInt = value;
            this.updateLb();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkBtn.prototype, "strokeColor", {
        get: function () {
            return this._strokeColor;
        },
        set: function (value) {
            this._strokeColor = value;
            this.updateLb();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LinkBtn.prototype, "isLink", {
        set: function (bo) {
            this._islink = bo;
        },
        enumerable: true,
        configurable: true
    });
    LinkBtn.prototype.setNotice = function (flag) {
        if (flag) {
            if (!this.image_notice) {
                this.image_notice = new eui.Image();
                this.addChild(this.image_notice);
                this.image_notice.source = "MAINUI_json.BM_RedDot";
            }
            this.image_notice.visible = true;
            this.image_notice.y = -14;
            this.image_notice.right = -14;
        }
        else {
            if (this.image_notice) {
                this.image_notice.visible = false;
            }
        }
    };
    LinkBtn.prototype.updateLb = function () {
        if (!this.lb) {
            return;
        }
        this.lb.text = this._text;
        this.lb.size = this._size;
        this.lb.textColor = this._textColor;
        this.lb.stroke = this._strokeInt;
        this.lb.strokeColor = this._strokeColor;
        if (this._islink) {
            // this.lb.textFlow = <Array<egret.ITextElement>>[
            // 	{ text: this.text, style: { "textColor": this._textColor, "size": this.size, stroke: this._strokeInt, strokeColor: this._strokeColor } }
            // ];
            this.line.visible = true;
            this.line.width = this.lb.width;
            this.line.y = this.lb.height + 5;
        }
        else {
            this.line.visible = false;
        }
    };
    LinkBtn.prototype.setDouble = function (flag) {
        if (flag) {
            if (!this.image_double) {
                this.image_double = new eui.Image();
                this.addChild(this.image_double);
                this.image_double.source = "COMMON1_json.Ico_Double";
            }
            this.image_double.visible = true;
            this.image_double.y = this.lb.y - 10;
            this.image_double.x = this.lb.x - 10;
        }
        else {
            if (this.image_double) {
                this.image_double.visible = false;
            }
        }
    };
    return LinkBtn;
}(eui.Component));
__reflect(LinkBtn.prototype, "LinkBtn");
//# sourceMappingURL=LinkBtn.js.map