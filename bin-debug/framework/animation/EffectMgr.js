var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EffectMgr = (function () {
    function EffectMgr() {
        this.list = [];
        this.invalid = 0;
        this.last = 0;
    }
    /** 添加一个特效
     * @KEY 例如：eff/zy_3
     * @parent 容器
     * @x @y 位置
     * @interval 特效单次播放时间（毫秒）
     * @time 特效生命时长(毫秒),如果为-1则认为无限时(需要手动移除！)
     * @repeat 是否重复播放
     * @act 资源中的动作名字，一般用1，具体可以到 resource/model/eff/文件夹下面的JSON文件查看动作名
     */
    EffectMgr.addEff = function (key, parent, x, y, interval, time, repeat, act) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (interval === void 0) { interval = 1000; }
        if (time === void 0) { time = -1; }
        if (repeat === void 0) { repeat = true; }
        if (act === void 0) { act = "_1"; }
        var ret = this.instance.addEff1(key, parent, x, y, interval, time, repeat, act);
        return ret;
    };
    EffectMgr.removeEff = function (eff) {
        if (eff) {
            this.instance.removeEff(eff);
        }
    };
    EffectMgr.prototype.addEff1 = function (key, parent, x, y, interval, time, repeat, act) {
        var ret = Part.create();
        ret.act = act;
        ret.setVal(key);
        ret.aniInterv = interval;
        ret.startTime = egret.getTimer();
        ret.repeat = repeat;
        if (time != -1) {
            ret.endTime = ret.startTime + time;
        }
        else {
            ret.endTime = Number.MAX_VALUE;
        }
        if (this.list.length == 0) {
            Timer.instance.listen(this.update, this, 100);
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = 0;
            }
        }
        ret.view.x = x;
        ret.view.y = y;
        parent.addChild(ret.view);
        this.list.push(ret);
        return ret;
    };
    EffectMgr.prototype.removeEff = function (eff) {
        var self = this;
        var index = self.list.indexOf(eff);
        if (index != -1) {
            self.list[index] = null;
            if (!(self.invalid & 1)) {
                self.invalid |= 1;
                self.timeout = setTimeout(self.clearList, 1000, self);
            }
        }
        if (eff.view.parent) {
            eff.view.parent.removeChild(eff.view);
        }
        eff.dispose();
    };
    EffectMgr.prototype.clearList = function (self) {
        ArrayUitl.cleannull(self.list);
        self.invalid = 0;
        if (self.list.length == 0) {
            Timer.instance.remove(self.update, self);
        }
        clearTimeout(self.timeout);
        self.timeout = 0;
    };
    EffectMgr.prototype.update = function (e) {
        var self = this;
        var now = egret.getTimer();
        if (now - self.last >= 70) {
            self.last = now;
        }
        var list = self.list;
        for (var i = 0, len = list.length; i < len; i++) {
            var part = list[i];
            if (!part) {
                continue;
            }
            if (now > part.endTime) {
                self.removeEff(part);
                continue;
            }
            var perc = (now - part.startTime) / part.aniInterv;
            if (perc > 1) {
                if (part.repeat) {
                    perc = perc - (perc >> 0);
                }
                else {
                    perc = 1;
                }
            }
            part.setPec(perc);
        }
    };
    return EffectMgr;
}());
__reflect(EffectMgr.prototype, "EffectMgr");
//# sourceMappingURL=EffectMgr.js.map