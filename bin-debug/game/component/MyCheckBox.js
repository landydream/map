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
var MyCheckBox = (function (_super) {
    __extends(MyCheckBox, _super);
    function MyCheckBox() {
        var _this = _super.call(this) || this;
        _this._res = "COMMON1_json.Bt_CheckBox2";
        _this._resS = "COMMON1_json.Bt_CheckBox1";
        _this._text = "";
        _this._size = 20;
        _this._color = 0xFFFFFF;
        _this._bold = false;
        return _this;
    }
    MyCheckBox.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MyCheckBox.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchChildren = false;
        if (this._text) {
            this.text = this._text;
        }
        if (this._size) {
            this.size = this._size;
        }
        if (this._color) {
            this.textColor = this._color;
        }
        if (this._bold) {
            this.bold = this._bold;
        }
        this.updateStyle();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    MyCheckBox.prototype.onTouchHandler = function () {
        this.selected = !this.selected;
        if (this.callBack) {
            this.callBack.call(this.thisObj, this);
        }
    };
    /**回调函数的参数是当前MyCheckBox */
    MyCheckBox.prototype.addCallBack = function (callBack, thisObj) {
        this.callBack = callBack;
        this.thisObj = thisObj;
    };
    Object.defineProperty(MyCheckBox.prototype, "source", {
        set: function (v) {
            this._res = v;
            this.updateStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyCheckBox.prototype, "sourceSelect", {
        set: function (v) {
            this._resS = v;
            this.updateStyle();
        },
        enumerable: true,
        configurable: true
    });
    MyCheckBox.prototype.updateStyle = function () {
        if (this.iconDisplay) {
            var soure = this._res;
            if (this.selected) {
                this.iconDisplay.source = this._resS;
            }
            else {
                this.iconDisplay.source = this._res;
            }
        }
    };
    Object.defineProperty(MyCheckBox.prototype, "selected", {
        get: function () {
            var state = this.currentState;
            return state == "selected";
        },
        set: function (bo) {
            if (this.selected == bo) {
                return;
            }
            if (bo) {
                this.currentState = "selected";
            }
            else {
                this.currentState = "up";
            }
            this.updateStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyCheckBox.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (s) {
            this._text = s;
            if (this.labelDisplay) {
                this.labelDisplay.text = s;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyCheckBox.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (v) {
            this._size = v;
            if (this.labelDisplay) {
                this.labelDisplay.size = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyCheckBox.prototype, "textColor", {
        set: function (color) {
            this._color = color;
            if (this.labelDisplay) {
                this.labelDisplay.textColor = color;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyCheckBox.prototype, "bold", {
        get: function () {
            return this._bold;
        },
        set: function (bo) {
            this._bold = bo;
            if (this.labelDisplay) {
                this.labelDisplay.bold = bo;
            }
        },
        enumerable: true,
        configurable: true
    });
    return MyCheckBox;
}(eui.Component));
__reflect(MyCheckBox.prototype, "MyCheckBox", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MyCheckBox.js.map