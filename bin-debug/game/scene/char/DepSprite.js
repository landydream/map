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
var DepSprite = (function (_super) {
    __extends(DepSprite, _super);
    function DepSprite() {
        var _this = _super.call(this) || this;
        _this.dep = 0;
        _this.childIndex = -1;
        return _this;
    }
    DepSprite.prototype.depAddChild = function (child) {
        var list = this.$children;
        var rightindex = list.length - 1;
        var leftindex = 0;
        var minIndex = (leftindex + rightindex) / 2 >> 0;
        while (leftindex < rightindex) {
            var minChild = list[minIndex];
            if (child.dep > minChild.dep) {
                leftindex = minIndex + 1;
            }
            else if (child.dep < minChild.dep) {
                rightindex = minIndex - 1;
            }
            else {
                break;
            }
            minIndex = (leftindex + rightindex) / 2 >> 0;
        }
        if (!child.$parent) {
            _super.prototype.$doAddChild.call(this, child, minIndex);
        }
        child.childIndex = minIndex;
    };
    DepSprite.prototype.depRemoveChild = function (sp) {
        var list = this.$children;
        var index = list.indexOf(sp);
        if (index >= 0) {
            this.$doRemoveChild(index, false);
        }
    };
    DepSprite.prototype.sortChild = function () {
        var list = this.$children;
        list.sort(this.sortFunc);
    };
    DepSprite.prototype.sortFunc = function (a, b) {
        if (!a) {
            return 1;
        }
        if (!b) {
            return -1;
        }
        return a.dep - b.dep;
    };
    return DepSprite;
}(egret.DisplayObjectContainer));
__reflect(DepSprite.prototype, "DepSprite", ["IDepObject"]);
//# sourceMappingURL=DepSprite.js.map