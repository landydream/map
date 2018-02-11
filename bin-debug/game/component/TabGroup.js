var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TabGroup = (function () {
    function TabGroup() {
        this._select = -1;
    }
    TabGroup.prototype.init = function (thisObj, callBack, args, text) {
        if (thisObj === void 0) { thisObj = null; }
        if (callBack === void 0) { callBack = null; }
        if (args === void 0) { args = []; }
        if (text === void 0) { text = []; }
        this.thisObj = thisObj;
        this.callBack = callBack;
        this.args = args;
        for (var i = 0, len = this.tabs.length; i < len; i++) {
            this.tabs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.tabs[i].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.ontouchOutside, this);
            if (text && text[i]) {
                this.tabs[i].text = text[i];
            }
        }
    };
    TabGroup.prototype.ontouchOutside = function (e) {
        var tab = e.currentTarget;
        if (tab != this.curTab) {
            tab.selected = false;
        }
    };
    TabGroup.prototype.onTouch = function (e) {
        // console.log("touchTap");
        var tab = e.currentTarget;
        if (this.curTab == tab) {
            if (!this.curTab.selected) {
                this.curTab.selected = true;
            }
            return;
        }
        var index = this.tabs.indexOf(tab);
        this.selectedIndex = index;
    };
    Object.defineProperty(TabGroup.prototype, "selectedIndex", {
        get: function () {
            return this._select;
        },
        set: function (v) {
            if (this._select == v) {
                return;
            }
            var bo = true;
            if (this.ids && this.ids[v] != null) {
                bo = SystemHelp.isOpen(this.ids[v], true); //GameGlobal.layerMgr.open2(this.ids[v]);
            }
            if (bo) {
                if (this.curTab) {
                    this.curTab.selected = false;
                    this.curTab = null;
                }
                var old = this._select;
                if (old >= 0) {
                    if (this.ids && this.ids[old] != null && (!this.ids || !this.ids[v] || (this.ids && this.ids[v] != this.ids[old]))) {
                        GameGlobal.layerMgr.close(this.ids[old]);
                    }
                }
                this._select = v;
                if (v >= 0 && v < this.tabs.length) {
                    this.curTab = this.tabs[v];
                    this.curTab.selected = true;
                }
                if (this.ids && this.ids[v] != null) {
                    if (this.args && this.args[v])
                        GameGlobal.layerMgr.open(this.ids[v], this.args[v]);
                    else
                        GameGlobal.layerMgr.open(this.ids[v]);
                }
                if (this.callBack) {
                    this.callBack.call(this.thisObj, v);
                }
            }
            else {
                this.tabs[v].selected = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    TabGroup.prototype.updateNotice = function () {
        var list = this.notice;
        if (!list) {
            return;
        }
        // if (typeof list == "string") {
        // }
        for (var i = 0, len = this.tabs.length; i < len; i++) {
            if (!list[i]) {
                continue;
            }
            var info = list[i];
            if (typeof info == "number") {
                this.tabs[i].setNoticVis(Model_GlobalMsg.getNotice(info));
            }
            else {
                var bo = false;
                for (var j = 0, len1 = info.length; j < len1; j++) {
                    if (Model_GlobalMsg.getNotice(info[j])) {
                        bo = true;
                        break;
                    }
                }
                this.tabs[i].setNoticVis(bo);
            }
        }
    };
    return TabGroup;
}());
__reflect(TabGroup.prototype, "TabGroup");
//# sourceMappingURL=TabGroup.js.map