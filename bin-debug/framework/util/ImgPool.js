var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ImgPool = (function () {
    function ImgPool() {
        this.POOL = [];
    }
    Object.defineProperty(ImgPool, "instance", {
        get: function () {
            if (!this._ins) {
                this._ins = new ImgPool();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    ImgPool.prototype.getFreeImg = function () {
        var img = ImgPool.instance.POOL.length ? ImgPool.instance.POOL.pop() : new eui.Image();
        img.touchEnabled = false;
        return img;
    };
    /**这里img会从父类中移除 */
    ImgPool.prototype.recycleImg = function (img) {
        if (img.parent)
            img.parent.removeChild(img);
        ImgPool.instance.POOL.push(img);
    };
    return ImgPool;
}());
__reflect(ImgPool.prototype, "ImgPool");
//# sourceMappingURL=ImgPool.js.map