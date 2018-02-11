var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MsgCenter = (function () {
    function MsgCenter() {
        this.msgMap = {};
        this.invalidMap = {};
        this.invalid = 0;
        this.msgDelayCalls = [];
        this.havDelay = false;
    }
    /**延迟调用消息*/
    MsgCenter.prototype.addDelayCalls = function (msg, arg) {
        if (arg === void 0) { arg = null; }
        if (this.msgDelayCalls.indexOf(msg) == -1) {
            this.msgDelayCalls.push([msg, arg]);
            this.havDelay = true;
        }
    };
    /**调用延迟的消息*/
    MsgCenter.prototype.callDelayMsgs = function () {
        if (!this.havDelay)
            return;
        var list = this.msgDelayCalls;
        for (var i = 0, len = list.length; i < len; i++) {
            var msgV = list[i];
            this.notify(msgV[0], msgV[1]);
            msgV = null;
        }
        this.msgDelayCalls = [];
        this.havDelay = false;
    };
    /**
     * @msg 派发的消息
     * @arg 派发的参数
    */
    MsgCenter.prototype.notify = function (msg, arg) {
        if (arg === void 0) { arg = null; }
        var list = this.msgMap[msg];
        if (list) {
            for (var i = 0, len = list.length; i < len; i++) {
                var listenerInfo = list[i];
                if (listenerInfo) {
                    listenerInfo[0] = arg;
                    listenerInfo[1].apply(listenerInfo[2], listenerInfo);
                }
            }
        }
    };
    /** 移除监听
     * @msg 消息
     * @listener 回调
    */
    MsgCenter.prototype.remove = function (msg, listener, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
        var list = this.msgMap[msg];
        if (list) {
            var index = this.getIndex(listener, list, thisObj);
            if (index != -1) {
                list[index] = null;
                this.invalidMap[msg] = true;
                if (!this.invalid) {
                    egret.callLater(MsgCenter.cleannull, this);
                }
                this.invalid++;
            }
        }
    };
    /** 添加
     * @msg 消息
     * @listener 回调
     * @thisObj this
    */
    MsgCenter.prototype.listen = function (msg, listener, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
        var list = this.msgMap[msg];
        if (!list) {
            list = this.msgMap[msg] = [];
        }
        var index = this.getIndex(listener, list, thisObj);
        if (index >= 0) {
            return;
        }
        if (true) {
            list.unshift([null, listener, thisObj]);
        }
    };
    MsgCenter.cleannull = function () {
        var self = this;
        var arrayutil = ArrayUitl;
        if (self.invalid) {
            self.invalid = 0;
            for (var k in self.invalidMap) {
                var invalidList = self.msgMap[k];
                arrayutil.cleannull(invalidList);
                //invalidList.length = len - emptylen;
                delete self.invalidMap[k];
            }
        }
    };
    /** 添加
     * @msg 消息
     * @listener 回调
     * @thisObj this
    */
    MsgCenter.prototype.listenonce = function (msg, listener, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
        var msgCenter = this;
        this.listen(msg, function func(arg) {
            msgCenter.remove(msg, func, this);
            listener.apply(thisObj, arg);
        }, this);
    };
    MsgCenter.prototype.getIndex = function (listener, list, thisObj) {
        for (var i = list.length - 1; i >= 0; i--) {
            var term = list[i];
            if (term && listener == term[1] && (!thisObj || (term[2] == thisObj))) {
                return i;
            }
        }
        return -1;
    };
    return MsgCenter;
}());
__reflect(MsgCenter.prototype, "MsgCenter");
//# sourceMappingURL=MsgCenter.js.map