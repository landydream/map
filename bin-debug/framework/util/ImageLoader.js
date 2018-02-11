var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ImageLoader = (function () {
    function ImageLoader() {
        this.itmeRefMap = {};
        this.imgRefUrl = {};
        this.ref0List = [];
    }
    Object.defineProperty(ImageLoader, "instance", {
        get: function () {
            if (!this._ins) {
                this._ins = new ImageLoader();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**url是不加head的，统一在这里加上 */
    ImageLoader.prototype.loader = function (url, img) {
        if (img == null)
            return;
        var self = this;
        self.reduceImgRes(img);
        if (url == null)
            return;
        var _url = LoaderManager.getUrl(url);
        var refItem = self.itmeRefMap[_url];
        if (!refItem) {
            refItem = self.itmeRefMap[_url] = ImgResItem.create();
            refItem.url = _url;
        }
        else {
            if (refItem.inDList) {
                var index = this.ref0List.indexOf(refItem);
                refItem.inDList = false;
                this.ref0List.splice(index, 1);
            }
        }
        refItem.addRefRes(img);
        self.imgRefUrl[img.hashCode] = _url;
        if (!refItem.isLoading) {
            refItem.isLoading = true;
            RES.getResByUrl(refItem.url, this.onTextureCompFunc, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    ImageLoader.prototype.reduceImgRes = function (img) {
        var self = this;
        if (self.imgRefUrl[img.hashCode]) {
            var _url = self.imgRefUrl[img.hashCode];
            var refItem = self.itmeRefMap[_url];
            if (refItem) {
                var havRef = refItem.reduceRes(img);
                if (havRef == false) {
                    if (self.ref0List.indexOf(refItem) == -1) {
                        refItem.inDList = true;
                        self.ref0List.push(refItem);
                    }
                }
            }
            delete self.imgRefUrl[img.hashCode];
        }
        img.source = null;
    };
    ImageLoader.prototype.onTextureCompFunc = function (texture, url) {
        var item = this.itmeRefMap[url];
        if (item) {
            item.texture = texture;
            item.compFunC();
        }
        if (texture == null) {
            GameGlobal.resMgr.onLoaded();
        }
    };
    ImageLoader.prototype.checkDestoryT = function () {
        var len = this.ref0List.length;
        if (len > 0) {
            var num = Math.ceil(len / 4);
            if (num > 25)
                num = 25;
            var isNull = false;
            for (var i = 0; i < num; i++) {
                var res = this.ref0List[i];
                var pt = egret.getTimer() - res.ref0Time;
                if (pt > 60000) {
                    if (res.refCount <= 0) {
                        this.destoryRes(res);
                        this.ref0List[i] = null;
                        isNull = true;
                    }
                }
            }
            if (isNull)
                ArrayUitl.cleannull(this.ref0List);
        }
    };
    ImageLoader.prototype.destoryRes = function (res) {
        delete this.itmeRefMap[res.url];
        res.dispose();
    };
    return ImageLoader;
}());
__reflect(ImageLoader.prototype, "ImageLoader");
var ImgResItem = (function () {
    function ImgResItem() {
        this.loadingImgs = [];
        this.refCount = 0;
    }
    ImgResItem.create = function () {
        var ret = ImgResItem.POOL.length ? ImgResItem.POOL.pop() : new ImgResItem();
        return ret;
    };
    ImgResItem.prototype.compFunC = function () {
        var uses = this.loadingImgs;
        for (var i = 0, len = uses.length; i < len; i++) {
            var img = uses[i];
            if (img)
                img.source = this.texture;
        }
        uses.length = 0;
        this.isLoading = false;
    };
    ImgResItem.prototype.addRefRes = function (img) {
        if (this.texture) {
            img.source = this.texture;
        }
        else {
            this.loadingImgs.push(img);
        }
        this.refCount++;
    };
    ImgResItem.prototype.reduceRes = function (img) {
        if (this.isLoading == true) {
            var index = this.loadingImgs.indexOf(img);
            this.loadingImgs.splice(index, 1);
        }
        if (this.refCount > 0)
            this.refCount--;
        if (this.refCount <= 0) {
            this.ref0Time = egret.getTimer();
            return false;
        }
        return true;
    };
    ImgResItem.prototype.dispose = function () {
        if (this.texture) {
            RES.destroyRes(this.url);
            this.texture.dispose();
            this.texture = null;
        }
        this.isLoading = false;
        this.url = null;
        this.loadingImgs = [];
        this.refCount = 0;
        this.inDList = false;
        ImgResItem.POOL.push(this);
    };
    ImgResItem.POOL = [];
    return ImgResItem;
}());
__reflect(ImgResItem.prototype, "ImgResItem");
//# sourceMappingURL=ImageLoader.js.map