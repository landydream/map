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
var MyComboBox = (function (_super) {
    __extends(MyComboBox, _super);
    function MyComboBox() {
        return _super.call(this) || this;
        //this.skinName = "resource/gameSkin/component/MyComboBox.exml";
    }
    /**回调函数的参数是source的元素 */
    MyComboBox.prototype.initData = function (callBack, thisObj, isSelect, clickCall) {
        this.callBack = callBack;
        this.thisObj = thisObj;
        this.clickCall = clickCall;
        this.isSelect(isSelect);
    };
    MyComboBox.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.dataAc = new eui.ArrayCollection();
        this.list.dataProvider = this.dataAc;
        this.list.itemRenderer = comboBoxItem;
        this.list.width = this.width - 12;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    MyComboBox.prototype.onTouch = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.openOrClose(true);
        if (this.clickCall) {
            this.clickCall.call(this.thisObj);
        }
        // if (this.isOpen) {
        // }
    };
    MyComboBox.prototype.onSelect = function () {
        var info = this.list.selectedItem;
        if (!info) {
            return;
        }
        this.lb.text = info[0];
        if (this.callBack) {
            this.callBack.call(this.thisObj, info);
        }
    };
    MyComboBox.prototype.openOrClose = function (bo) {
        if (this.isOpen == bo) {
            return;
        }
        if (bo) {
            if (this.dataAc.source.length <= 0) {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                return;
            }
            this.currentState = "down";
            var self = this;
            egret.callLater(function () {
                App.stage.once(egret.TouchEvent.TOUCH_TAP, function () {
                    self.openOrClose(false);
                }, self);
            }, this);
            // setTimeout(function () {
            // 	App.stage.once(egret.TouchEvent.TOUCH_TAP, function () {
            // 		self.openOrClose(false);
            // 	}, self)
            // }, 100);
        }
        else {
            this.currentState = "up";
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }
        this.isOpen = bo;
    };
    Object.defineProperty(MyComboBox.prototype, "source", {
        /**[[显示text, 保存的数据, 颜色]] */
        set: function (arg) {
            if (!this.lb) {
                return;
            }
            UITools.replaceAll(this.canvas, this.dataAc, arg);
            // this.dataAc.source = arg;
            // this.dataAc.refresh();
            var len = arg.length;
            if (len > 0) {
                this.list.selectedIndex = 0;
                this.lb.text = arg[0][0];
                var h = Math.min(200, len * 44 + 12);
                this.gp.height = h;
            }
            else {
                this.lb.text = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    MyComboBox.prototype.getSource = function () {
        return this.dataAc.source;
    };
    Object.defineProperty(MyComboBox.prototype, "selectedItem", {
        get: function () {
            if (this.list) {
                return this.list.selectedItem;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyComboBox.prototype, "selectedIndex", {
        set: function (v) {
            if (this.list) {
                this.list.selectedIndex = v;
            }
            if (v < 0) {
                this.setText("");
            }
            else {
                this.onSelect();
            }
        },
        enumerable: true,
        configurable: true
    });
    MyComboBox.prototype.setText = function (text, color) {
        if (color === void 0) { color = null; }
        this.lb.text = text;
        if (color != null) {
            this.lb.textColor = color;
        }
    };
    MyComboBox.prototype.isSelect = function (bo) {
        if (this._isSelect == bo) {
            return;
        }
        this._isSelect = bo;
        if (!this.list) {
            return;
        }
        if (bo) {
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelect, this);
        }
        else {
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelect, this);
        }
    };
    return MyComboBox;
}(eui.Component));
__reflect(MyComboBox.prototype, "MyComboBox", ["eui.UIComponent", "egret.DisplayObject"]);
var comboBoxItem = (function (_super) {
    __extends(comboBoxItem, _super);
    function comboBoxItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/gameSkin/component/SkinComboBoxItem.exml";
        return _this;
    }
    comboBoxItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.width = this.parent["layoutBoundsWidth"];
    };
    comboBoxItem.prototype.dataChanged = function () {
        var info = this.data;
        if (!info) {
            return;
        }
        this.lb.text = info[0];
        if (info[2] != null) {
            this.lb.textColor = info[2];
        }
        // var w = this.$parent.width;
        // if(w) {
        // 	this.width = w;
        // }
    };
    return comboBoxItem;
}(eui.ItemRenderer));
__reflect(comboBoxItem.prototype, "comboBoxItem");
//# sourceMappingURL=MyComboBox.js.map