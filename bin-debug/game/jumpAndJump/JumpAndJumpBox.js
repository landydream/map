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
var JumpAndJumpBox = (function (_super) {
    __extends(JumpAndJumpBox, _super);
    function JumpAndJumpBox() {
        var _this = _super.call(this) || this;
        _this.sumY = 0;
        _this.vy = 5;
        _this.vwidth = 2;
        _this.addEventListener(Enum_MsgType.BEGIN_TOUCH_SCREEN, _this.touchScreenHandler, _this);
        _this.addEventListener(Enum_MsgType.END_TOUCH_SCREEN, _this.touchUpHandler, _this);
        return _this;
    }
    JumpAndJumpBox.prototype.craete = function (type, width) {
        if (width === void 0) { width = 400; }
        this.type = type;
        if (type == 1 || type == 2) {
            this.bmTop = new eui.Image();
            this.bmDown = new eui.Image();
            this.addChild(this.bmDown);
            this.addChild(this.bmTop);
            ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_1'), this.bmTop);
            ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_2'), this.bmDown);
        }
        else {
            this.bmTop = new eui.Image();
            this.bmLeft = new eui.Image();
            this.bmRight = new eui.Image();
            this.addChild(this.bmTop);
            this.addChild(this.bmLeft);
            this.addChild(this.bmRight);
            ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_1'), this.bmTop);
            ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_2'), this.bmLeft);
            ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_3'), this.bmRight);
        }
        this.bmTop.width = width;
        this.bmTop.height = this.bmTop.width * 0.568;
        this.tw = this.bmTop.width / 2;
        this.th = this.bmTop.height / 2;
        this.resetBox();
    };
    JumpAndJumpBox.prototype.resetBox = function () {
        if (this.type == 1 || this.type == 2) {
            this.bmDown.width = this.tw;
            this.bmDown.x = this.tw / 2;
            this.bmDown.y = this.th;
        }
        else {
            this.bmLeft.height = this.th;
            this.bmLeft.y = this.th - 3;
            this.bmLeft.skewY = 30;
            this.bmLeft.width = this.tw / 0.865;
            this.bmRight.height = this.th;
            this.bmRight.x = this.tw;
            this.bmRight.y = this.bmTop.height - 3;
            this.bmRight.skewY = -30;
            this.bmRight.width = this.tw / 0.865;
        }
    };
    JumpAndJumpBox.prototype.touchScreenHandler = function () {
        Timer.instance.listen(this.scaleBoxFunc, this, 100);
    };
    JumpAndJumpBox.prototype.touchUpHandler = function () {
        Timer.instance.remove(this.scaleBoxFunc, this);
        this.endScaleBoxFunc();
    };
    JumpAndJumpBox.prototype.scaleBoxFunc = function () {
        var self = this;
        if (self.sumY < 50) {
            self.sumY += self.vy;
            self.bmTop.y += self.vy;
            if (self.type == 1 || self.type == 2) {
                self.bmDown.width += self.vwidth;
                self.bmDown.x = self.tw / 2;
                self.bmDown.y += self.vy;
            }
            else {
                self.bmLeft.height -= self.vy;
                self.bmLeft.y += self.vy;
                self.bmRight.height -= self.vy;
                self.bmRight.y += self.vy;
            }
        }
    };
    JumpAndJumpBox.prototype.endScaleBoxFunc = function () {
        this.bmTop.y = 0;
        this.sumY = 0;
        this.resetBox();
    };
    return JumpAndJumpBox;
}(egret.Sprite));
__reflect(JumpAndJumpBox.prototype, "JumpAndJumpBox");
//# sourceMappingURL=JumpAndJumpBox.js.map