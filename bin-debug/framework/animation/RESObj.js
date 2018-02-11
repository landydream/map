var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RESObj = (function () {
    function RESObj() {
        this.state = -1;
        this.proprity = 1;
        this.refCount = 0;
        this.useParts = [];
        this.disposeTimes = 0;
    }
    RESObj.create = function () {
        var ret = RESObj.POOL.length ? RESObj.POOL.pop() : new RESObj();
        return ret;
    };
    RESObj.prototype.startLoad = function () {
        this.state = 0;
        this.jsonUrl = LoaderManager.HEADURL + "/resource/model/" + this.val + ".json";
        RES.getResByUrl(this.jsonUrl, this.josnComplete, this, RES.ResourceItem.TYPE_JSON);
    };
    RESObj.prototype.josnComplete = function (data) {
        if (data == null) {
            GameGlobal.resMgr.onLoaded();
            return;
        }
        this.state = 1;
        //this.mcdata = JSON.parse(data);
        this.mcdata = data;
        this.textureUrl = LoaderManager.HEADURL + "/resource/model/" + this.val + ".png";
        RES.getResByUrl(this.textureUrl, this.textureComplete, this, RES.ResourceItem.TYPE_IMAGE);
    };
    RESObj.prototype.textureComplete = function (texture) {
        if (texture == null) {
            GameGlobal.resMgr.onLoaded();
            return;
        }
        this.state = 2;
        this.mctexture = texture;
        this.complete();
    };
    RESObj.prototype.complete = function () {
        this.factory = new egret.MovieClipDataFactory(this.mcdata, this.mctexture);
        var uses = this.useParts;
        this.ready = true;
        for (var i = uses.length - 1; i >= 0; i--) {
            var p = uses[i];
            p.buildmc();
        }
        uses.length = 0;
        GameGlobal.resMgr.onLoaded();
    };
    RESObj.prototype.dispose = function () {
        if (this.mcdata) {
            RES.destroyRes(this.jsonUrl);
            this.mcdata = null;
        }
        if (this.mctexture) {
            RES.destroyRes(this.textureUrl);
            var sprites = this.factory.spriteSheet;
            sprites.dispose();
            for (var k in sprites._textureMap) {
                sprites._textureMap[k].dispose();
                delete sprites._textureMap[k];
            }
            this.mctexture = null;
        }
        this.jsonUrl = this.textureUrl = null;
        this.state = -1;
        this.ready = false;
        this.disposeTimes++;
    };
    RESObj.POOL = [];
    return RESObj;
}());
__reflect(RESObj.prototype, "RESObj");
//# sourceMappingURL=RESObj.js.map