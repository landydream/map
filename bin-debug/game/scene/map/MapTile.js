var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapTile = (function () {
    function MapTile() {
        this.imgUrl = null;
        this.imgTile = new egret.Bitmap();
    }
    MapTile.CREATEFUNC = function (mapMgr, k, r, c) {
        var ret = MapTile.POOL.length ? MapTile.POOL.pop() : new MapTile();
        ret.mapMgr = mapMgr;
        ret.k = k;
        ret.r = r;
        ret.c = c;
        return ret;
    };
    MapTile.prototype.onAdd = function () {
        var self = this;
        self.imgTile.visible = true;
        if (self.imgUrl == null) {
            self.head = self.mapMgr.head;
            self.imgUrl = GameGlobal.resMgr.getVersionUrl("/resource/map/" + self.head + "/clipmap/" + self.r + "_" + self.c + ".jpg");
            RES.getResByUrl(self.imgUrl, self.onImgLoaded, self, RES.ResourceItem.TYPE_IMAGE);
            self.mapMgr.tileLayer.addChild(self.imgTile);
        }
    };
    MapTile.prototype.onImgLoaded = function (bmd) {
        var self = this;
        self.imgTile.x = self.c * MapManager.TILE_WIDTH;
        self.imgTile.y = self.r * MapManager.TILE_HEIGHT;
        self.imgTile.texture = bmd;
        if (bmd == null) {
            GameGlobal.resMgr.onLoaded();
        }
    };
    MapTile.prototype.onRemove = function () {
        this.imgTile.visible = false;
    };
    MapTile.prototype.dispose = function () {
        this.onRemove();
        this.mapMgr.tileLayer.removeChild(this.imgTile);
        if (this.imgTile.texture) {
            this.imgTile.texture.dispose();
            this.imgTile.texture = null;
        }
        RES.destroyRes(this.imgUrl);
        MapTile.POOL.push(this);
        this.imgUrl = null;
    };
    MapTile.prototype.onEvent = function (evt, arg) {
    };
    MapTile.POOL = [];
    return MapTile;
}());
__reflect(MapTile.prototype, "MapTile");
//# sourceMappingURL=MapTile.js.map