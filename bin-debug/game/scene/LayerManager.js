var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerManager = (function () {
    function LayerManager() {
        this._registerMap = {};
        this._views = {};
        this._opens = []; //保存没有类型的界面
        this._openType = []; //保存有类型的界面
    }
    LayerManager.prototype.init = function (p) {
        var self = this;
        self.GameMain = p;
        self.Battle_Layer = new egret.DisplayObjectContainer();
        self.UI_floorUI = new egret.DisplayObjectContainer();
        self.UI_MainBottom = new egret.DisplayObjectContainer();
        self.UI_Main = new egret.DisplayObjectContainer();
        self.UI_Popup = new egret.DisplayObjectContainer();
        self.UI_Tips = new egret.DisplayObjectContainer();
        self.UI_Message = new egret.DisplayObjectContainer();
        p.addChild(self.Battle_Layer);
        self.Battle_Layer.touchEnabled = false;
        self.Battle_Layer.touchChildren = false;
        p.addChild(self.UI_floorUI);
        p.addChild(self.UI_MainBottom);
        p.addChild(self.UI_Main);
        p.addChild(self.UI_Popup);
        p.addChild(self.UI_Tips);
        p.addChild(self.UI_Message);
        self.UI_Message.touchEnabled = false;
        self.UI_Message.touchChildren = false;
    };
    /**注册界面 */
    LayerManager.prototype.register = function (id, uiclz, arg, layer) {
        if (arg === void 0) { arg = null; }
        if (layer === void 0) { layer = null; }
        if (!layer) {
            layer = this.UI_Main;
        }
        if (this._registerMap[id]) {
            console.log("UI" + id + "重复注册");
            return;
        }
        this._registerMap[id] = [uiclz, arg, layer];
    };
    /**是否已注册了该界面 */
    LayerManager.prototype.isRegiser = function (id) {
        var self = this;
        if (self._registerMap[id]) {
            return true;
        }
        return false;
    };
    /**打开界面*/
    LayerManager.prototype.open = function (id, arg) {
        if (arg === void 0) { arg = null; }
        var ui = this._views[id];
        if (!ui) {
            var r = this._registerMap[id];
            if (!r) {
                //ViewCommonWarn.text("error open id:" + id);
                return;
            }
            ui = new r[0]();
            ui.uiparent = r[2];
            ui.pid = id;
            this._views[id] = ui;
        }
        // this.closeType(ui.ptype, ui.pid);
        var bo = this.isOpenView(ui.pid);
        if (!bo) {
            if (ui.ptype) {
                this._openType.push(ui);
            }
            else {
                this._opens.push(ui);
            }
            ui.uiparent.addChild(ui);
        }
        else {
            ui.uiparent.setChildIndex(ui, ui.uiparent.numChildren - 1);
        }
        ui.onOpen(arg);
        if (this._openType.length > 2) {
            ui = this._openType[0];
            this.close(ui.pid);
        }
    };
    // /**先判断系统是否开启 */
    // public open2(id, arg: any = null) {
    // 	let bo = SystemHelp.isOpen(id, true, arg);
    // 	if (!bo) {
    // 		return bo;
    // 	} else {
    // 		this.open(id, arg);
    // 	}
    // 	return true;
    // }
    LayerManager.prototype.close = function (id) {
        var ui = this._views[id];
        if (ui) {
            if (ui.ptype) {
                var index = this._openType.indexOf(ui);
                if (index != -1) {
                    this._openType.splice(index, 1);
                }
            }
            else {
                var index = this._opens.indexOf(ui);
                if (index != -1) {
                    this._opens.splice(index, 1);
                }
            }
            if (ui.parent) {
                ui.parent.removeChild(ui);
                ui.onClose();
            }
        }
    };
    /**界面是否打开中 */
    LayerManager.prototype.isOpenView = function (id) {
        var bo = false;
        var ui = this.getView(id);
        if (ui) {
            if (ui.ptype) {
                return this._openType.indexOf(ui) >= 0;
            }
            else {
                if (this._opens.indexOf(ui) >= 0) {
                    bo = true;
                }
            }
        }
        return bo;
    };
    LayerManager.prototype.getView = function (id) {
        return this._views[id];
    };
    /**关闭所有UI */
    LayerManager.prototype.closeAll = function () {
        for (var i = this._openType.length - 1; i >= 0; i--) {
            var ui = this._openType[i];
            this.close(ui.pid);
        }
        for (i = this._opens.length - 1; i >= 0; i--) {
            var ui = this._opens[i];
            this.close(ui.pid);
        }
    };
    /**关闭某个类型以上的界面 debarId排除此界面不关闭 */
    LayerManager.prototype.closeType = function (type, debarId) {
        if (type) {
            for (var i = this._openType.length - 1; i >= 0; i--) {
                var ui = this._openType[i];
                if (ui.ptype >= type && ui.pid != debarId) {
                    this.close(ui.pid);
                }
            }
        }
    };
    /**是否显示了某类型界面 */
    LayerManager.prototype.isOpenType = function (type) {
        if (type) {
            for (var i = 0, len = this._openType.length; i < len; i++) {
                var ui = this._openType[i];
                if (ui.ptype == type) {
                    return true;
                }
            }
        }
        else if (this._opens.length > 0) {
            return true;
        }
        return false;
    };
    /**设置界面visible */
    LayerManager.prototype.setVis = function (id, bo) {
        var ui = this.getView(id);
        if (ui) {
            ui.visible = bo;
        }
    };
    LayerManager.prototype.getVis = function (id) {
        var ui = this.getView(id);
        if (ui) {
            return ui.visible;
        }
        return false;
    };
    LayerManager.prototype.unregister = function (id) {
        if (this._registerMap[id]) {
            delete this._registerMap[id];
        }
    };
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map