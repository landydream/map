var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 时间管理 */
var Timer = (function () {
    /** 时间管理 */
    function Timer() {
        this.tasks = [];
    }
    Object.defineProperty(Timer, "instance", {
        get: function () {
            if (!Timer._instance) {
                Timer._instance = new Timer();
            }
            return Timer._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**增加时间监听
     * fun 回调函数
     * thisObj 回调函数的this
     * time 间隔时间 毫秒
     * startTime 开始回调时间
    */
    Timer.prototype.listen = function (fun, thisObj, time, startTime) {
        if (time === void 0) { time = 1000; }
        if (startTime === void 0) { startTime = 0; }
        this.remove(fun, thisObj);
        this.tasks.push([fun, thisObj, startTime, time]);
    };
    /**删除监听 */
    Timer.prototype.remove = function (fun, thisObj) {
        var len = this.tasks.length;
        for (var i = len - 1; i >= 0; i--) {
            var task = this.tasks[i];
            if (task[0] == fun && task[1] == thisObj) {
                this.tasks.splice(i, 1);
                break;
            }
        }
    };
    /**是否有监听 */
    Timer.prototype.has = function (fun, thisObj) {
        for (var i = 0; i < this.tasks.length; i++) {
            var task = this.tasks[i];
            if (task[0] == fun && task[1] == thisObj) {
                return true;
            }
        }
        return false;
    };
    Timer.prototype.run = function () {
        var nowTime = egret.getTimer();
        var self = this;
        var len = self.tasks.length;
        for (var i = len - 1; i >= 0; i--) {
            var task = self.tasks[i];
            if (!task) {
                continue;
            }
            if (nowTime - task[2] < task[3]) {
                continue;
            }
            var fun = task[0];
            if (fun.length >= 1) {
                fun.call(task[1], nowTime);
            }
            else {
                fun.call(task[1]);
            }
            task[2] = nowTime;
        }
    };
    return Timer;
}());
__reflect(Timer.prototype, "Timer");
//# sourceMappingURL=Timer.js.map