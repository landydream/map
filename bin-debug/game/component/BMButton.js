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
var BMButton = (function (_super) {
    __extends(BMButton, _super);
    function BMButton() {
        var _this = _super.call(this) || this;
        _this._text = "";
        _this._size = 27;
        _this._bold = false;
        _this._offX = 0;
        _this._offY = 0;
        _this._disabled = false;
        return _this;
        // this.skinName = "resource/eui_skins/BMButton.exml";
    }
    BMButton.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BMButton.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchChildren = false;
        this.img.source = this._icon;
        this.lb.text = this._text;
        this.lb.size = this._size;
        this.lb.bold = this._bold;
        if (this._disabled) {
            this._disabled = false;
            this.disabled = true;
        }
        this.offX = this._offX;
        this.offY = this._offY;
        if (this._textColor) {
            this.lb.textColor = this._textColor;
        }
        if (this._icon == "COMMON1_json.Bt_001_up" || this._icon == "COMMON1_json.Bt_002_up") {
            this.setScale9Grid(27, 16, 1, 1);
        }
        this.addStyleEvent();
    };
    BMButton.prototype.addStyleEvent = function () {
        UITools.addPopBtnStyle(this);
    };
    BMButton.prototype.removeStyleEvent = function () {
        UITools.removeBtnStyle(this);
    };
    Object.defineProperty(BMButton.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (char) {
            this._text = char;
            if (this.lb) {
                this.lb.text = char;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BMButton.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (v) {
            this._size = v;
            if (this.lb) {
                this.lb.size = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BMButton.prototype, "bold", {
        get: function () {
            return this._bold;
        },
        set: function (b) {
            if (this._bold == b) {
                return;
            }
            this._bold = b;
            if (this.lb) {
                this.lb.bold = b;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BMButton.prototype, "icon", {
        /**图标*/
        get: function () {
            return this._icon;
        },
        set: function (value) {
            if (value == this._icon) {
                return;
            }
            this._icon = value;
            if (this.img) {
                if (value == "COMMON1_json.Bt_001_up" || value == "COMMON1_json.Bt_002_up" || value == "BtnGrey_json.Bt_001_disabled") {
                    this.setScale9Grid(27, 16, 1, 1);
                }
                this.img.source = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BMButton.prototype, "textColor", {
        get: function () {
            return this._textColor;
        },
        set: function (value) {
            if (value == this._textColor) {
                return;
            }
            this._textColor = value;
            if (this.lb) {
                this.lb.textColor = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BMButton.prototype, "offX", {
        get: function () {
            return this._offX;
        },
        set: function (v) {
            this._offX = v;
            if (this.lb) {
                this.lb.horizontalCenter = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BMButton.prototype, "offY", {
        get: function () {
            return this._offY;
        },
        set: function (v) {
            this._offY = v;
            if (this.lb) {
                this.lb.verticalCenter = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BMButton.prototype, "disabled", {
        /**设置按钮灰化* */
        set: function (value) {
            var bo = value == "true" || value == true;
            if (this._disabled == bo) {
                return;
            }
            this._disabled = bo;
            if (!this.img) {
                return;
            }
            if (bo) {
                if (BMButton.disableDci[this._icon]) {
                    this.img.source = BMButton.disableDci[this._icon];
                    this.lb.textColor = Color.GREYINT;
                }
                else {
                    this.alpha = 0.5;
                }
                // this.filters = Color.disabled;
                this.touchEnabled = false;
            }
            else {
                if (BMButton.disableDci[this._icon]) {
                    this.img.source = this._icon;
                }
                else {
                    this.alpha = 1;
                }
                this.touchEnabled = true;
                if (this._textColor) {
                    this.lb.textColor = this._textColor;
                }
                else {
                    this.lb.textColor = 0x2e8c46;
                }
                // this.filters = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    BMButton.prototype.setScale9Grid = function (x, y, w, h) {
        this.img.scale9Grid = new egret.Rectangle(x, y, w, h);
    };
    BMButton.prototype.setNotice = function (flag, top, right) {
        if (top === void 0) { top = -7; }
        if (right === void 0) { right = -9; }
        if (flag) {
            if (!this.image_notice) {
                this.image_notice = new eui.Image();
                this.addChild(this.image_notice);
                this.image_notice.top = top;
                this.image_notice.right = right;
                this.image_notice.source = "MAINUI_json.BM_RedDot";
            }
            this.image_notice.visible = true;
        }
        else {
            if (this.image_notice) {
                this.image_notice.visible = false;
            }
        }
    };
    BMButton.prototype.setDouble = function (flag) {
        if (flag) {
            if (!this.image_double) {
                this.image_double = new eui.Image();
                this.addChild(this.image_double);
                this.image_double.top = -10;
                this.image_double.left = -10;
                this.image_double.source = "COMMON1_json.Ico_Double";
            }
            this.image_double.visible = true;
        }
        else {
            if (this.image_double) {
                this.image_double.visible = false;
            }
        }
    };
    /**灰色按钮*/
    BMButton.disableDci = {
        "COMMON1_json.Bt_001_up": "BtnGrey_json.Bt_001_disabled",
        "COMMON1_json.Bt_002_up": "BtnGrey_json.Bt_001_disabled",
        "COMMON1_json.Bt_005_up": "BtnGrey_json.Bt_006_disabled",
        "COMMON1_json.Bt_006_up": "BtnGrey_json.Bt_006_disabled",
        "COMMON1_json.BT_Icom_JiaHao": "BtnGrey_json.BT_Icom_JiaHao_disabled",
        "COMMON1_json.BT_Icom_Jian": "BtnGrey_json.BT_Icom_Jian_disabled",
        "COMMON1_json.Bt_Tabbutton01_down": "BtnGrey_json.Bt_Tabbutton01_disabled",
        "COMMON1_json.Bt_Tabbutton01_up": "BtnGrey_json.Bt_Tabbutton01_disabled",
        "COMMON1_json.Btn_LQJL": "BtnGrey_json.Btn_LQJL_disabled",
        "COMMON1_json.Btn_numzoon": "BtnGrey_json.Btn_numzoon_disabled",
        "COMMON1_json.Btn_pageleft_up": "BtnGrey_json.Btn_pageleft_disabled",
        "COMMON1_json.Btn_pageview": "BtnGrey_json.Btn_pageview_disabled",
        "COMMON1_json.Btn_QWCZ_disabled": "BtnGrey_json.Btn_QWCZ",
        "COMMON1_json.Btn_Tabselect": "BtnGrey_json.Btn_Tabup_disabled",
        "COMMON1_json.Btn_Tabup": "BtnGrey_json.Btn_Tabup_disabled",
        "COMMON1_json.Btn_Tips": "BtnGrey_json.Btn_Tips_disabled",
        "COMMON1_json.Btn_Yellow": "BtnGrey_json.Btn_Yellow_disabled",
    };
    return BMButton;
}(eui.Component));
__reflect(BMButton.prototype, "BMButton", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BMButton.js.map