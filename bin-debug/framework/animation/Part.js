var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Part = (function () {
    function Part() {
        this.totalFrames = 0;
        this.dep = 0;
        this.act = 0;
        this.visible = true;
        this._curFrm = 0;
        this._perc = 0;
        this.view = new egret.Bitmap();
        this.view.touchEnabled = false;
    }
    Part.create = function () {
        var ret = Part.POOL.length ? Part.POOL.pop() : new Part();
        if (true) {
            ret.isDispose = null;
        }
        return ret;
    };
    Part.prototype.setVal = function (v) {
        var self = this;
        if (v != self.val) {
            this.mcdata = null;
            if (self.res) {
                var useindex = self.res.useParts.indexOf(self);
                self.res.useParts.splice(useindex, 1);
                GameGlobal.resMgr.reduceRes(self.val);
            }
            self.val = v;
            if (v) {
                self.res = GameGlobal.resMgr.refRes(v);
                self.res.useParts.push(self);
                self.buildmc();
            }
            else {
                self.res = null;
                self.view.visible = false;
            }
        }
    };
    Part.prototype.setAct = function (v) {
        if (this.act != v) {
            this.act = v;
            this.buildmc();
        }
    };
    Part.prototype.setPec = function (v) {
        var self = this;
        self._perc = v;
        if (self.mcdata) {
            var mcdata = self.mcdata;
            var numFrames = mcdata.numFrames;
            var curFrame = (v * numFrames) >> 0;
            if (curFrame >= numFrames) {
                curFrame = curFrame - 1;
            }
            //this.mc.currentFrame = curFrame;
            if (self._curFrm != curFrame) {
                var framedata = mcdata.frames[curFrame];
                self._curFrm = curFrame;
                if (framedata) {
                    if (mcdata.spriteSheet) {
                        var texture = mcdata.spriteSheet._textureMap[framedata.res];
                        if (!texture) {
                            var textureData = mcdata.textureData[framedata.res];
                            texture = mcdata.spriteSheet.createTexture(framedata.res, textureData.x, textureData.y, textureData.w, textureData.h);
                        }
                        self.view.$setBitmapData(texture);
                    }
                    self.view.$setAnchorOffsetX(-framedata.x);
                    self.view.$setAnchorOffsetY(-framedata.y);
                }
                else {
                    self.view.$setAnchorOffsetX(0);
                    self.view.$setAnchorOffsetY(0);
                    self.view.texture = null;
                }
            }
        }
    };
    Part.prototype.buildmc = function () {
        if (this.res && this.res.factory) {
            this.mcdata = this.res.factory.generateMovieClipData(this.act);
            this._curFrm = -1;
            this.setPec(this._perc);
            this.view.visible = true && this.visible;
        }
        else {
            this.view.visible = false;
        }
    };
    Part.prototype.setVisible = function (v) {
        this.view.visible = v;
        this.visible = v;
    };
    Part.prototype.dispose = function () {
        var self = this;
        if (true) {
            if (self.isDispose) {
                console.error("错误的释放PART:" + self.val);
            }
            self.isDispose = true;
        }
        self.parts = null;
        self.view.alpha = 1;
        self.view.scaleX = self.view.scaleY = 1;
        self.view.x = this.view.y = 0;
        self.view.rotation = 0;
        self.view.touchEnabled = false;
        // self.view.$bitmapData = null;
        // self.view.$reset();
        // self.view.$nextFrameNum = 0;
        self.totalFrames = 1;
        self.visible = true;
        self.mcdata = null;
        self.setVal(null);
        self.view.texture = null;
        self._curFrm = -1;
        self._perc = 0;
        self.dep = 0;
        Part.POOL.push(self);
    };
    Part.POOL = [];
    return Part;
}());
__reflect(Part.prototype, "Part");
//# sourceMappingURL=Part.js.map