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
var BitmapLoader = (function (_super) {
    __extends(BitmapLoader, _super);
    function BitmapLoader() {
        return _super.call(this) || this;
    }
    BitmapLoader.prototype.load = function (url) {
        this.imgUrl = url;
        RES.getResByUrl(url, this.onImgLoaded, this, RES.ResourceItem.TYPE_IMAGE);
    };
    BitmapLoader.prototype.dispose = function () {
        this.texture = null;
        RES.destroyRes(this.imgUrl);
    };
    BitmapLoader.prototype.onImgLoaded = function (bmd) {
        this.texture = bmd;
        if (bmd == null) {
            GameGlobal.resMgr.onLoaded();
        }
    };
    return BitmapLoader;
}(egret.Bitmap));
__reflect(BitmapLoader.prototype, "BitmapLoader");
//# sourceMappingURL=BitmapLoader.js.map