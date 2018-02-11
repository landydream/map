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
var RESManager = (function (_super) {
    __extends(RESManager, _super);
    function RESManager() {
        var _this = _super.call(this) || this;
        _this.map = {};
        _this.loadQueue = [];
        _this.ref0List = [];
        return _this;
    }
    RESManager.prototype.refRes = function (val) {
        var res = this.map[val];
        if (!res) {
            res = RESObj.create();
            res.val = val;
            this.map[val] = res;
            this.loadQueue.push(res);
            this.loadNext();
        }
        else {
            if (res.inDList) {
                var index = this.ref0List.indexOf(res);
                res.inDList = false;
                this.ref0List.splice(index, 1);
            }
        }
        res.refCount++;
        return res;
    };
    RESManager.prototype.reduceRes = function (val) {
        var res = this.map[val];
        if (res) {
            res.refCount--;
            if (res.refCount <= 0) {
                if (!res.inDList) {
                    res.ref0Time = egret.getTimer();
                    res.inDList = true;
                    this.ref0List.push(res);
                }
            }
        }
        return res;
    };
    RESManager.prototype.onLoaded = function () {
        this.loadingRes = null;
        this.loadNext();
    };
    RESManager.prototype.loadNext = function () {
        if (!this.loadingRes && this.loadQueue.length) {
            while (this.loadQueue.length) {
                var res = this.loadQueue.shift();
                if (res) {
                    this.loadingRes = res;
                    res.startLoad();
                    break;
                }
            }
        }
    };
    RESManager.prototype.checkDestory1 = function () {
        var self = this;
        var len = self.ref0List.length;
        if (len > 0) {
            var num = Math.ceil(len / 4);
            if (num > 25)
                num = 25;
            var isNull = false;
            for (var i = 0; i < num; i++) {
                var res = self.ref0List[i];
                var pt = egret.getTimer() - res.ref0Time;
                if (pt > 60000) {
                    res.inDList = false;
                    if (res.refCount == 0) {
                        self.destoryRes(res);
                        self.ref0List[i] = null;
                        isNull = true;
                    }
                }
            }
            if (isNull)
                ArrayUitl.cleannull(self.ref0List);
        }
    };
    RESManager.prototype.destoryRes = function (resobj) {
        if (resobj === this.loadingRes) {
            return;
        }
        delete this.map[resobj.val];
        if (resobj.state == -1) {
            var loadindex = this.loadQueue.indexOf(resobj);
            if (loadindex >= 0) {
                this.loadQueue.splice(loadindex, 1);
            }
        }
        resobj.dispose();
    };
    RESManager.prototype.getVersionUrl = function (url) {
        url = LoaderManager.HEADURL + url;
        return url;
    };
    return RESManager;
}(egret.EventDispatcher));
__reflect(RESManager.prototype, "RESManager");
//# sourceMappingURL=RESManager.js.map