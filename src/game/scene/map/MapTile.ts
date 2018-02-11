class MapTile {
	public constructor() {
		this.imgTile = new egret.Bitmap();
	}

	public static POOL = [];
	public static CREATEFUNC(mapMgr: MapManager, k, r, c) {
		var ret: MapTile = MapTile.POOL.length ? MapTile.POOL.pop() : new MapTile();
		ret.mapMgr = mapMgr;
		ret.k = k;
		ret.r = r;
		ret.c = c;
		return ret;
	}

	public k: string;
	public r: number;
	public c: number;

	public imgTile: egret.Bitmap;

	public head: string;
	public imgUrl: string = null;
	public mapMgr: MapManager;
	public onAdd() {
		var self = this;

		self.imgTile.visible = true;
		if (self.imgUrl == null) {
			self.head = self.mapMgr.head;
			self.imgUrl = GameGlobal.resMgr.getVersionUrl("/resource/map/" + self.head + "/clipmap/" + self.r + "_" + self.c + ".jpg");
			RES.getResByUrl(self.imgUrl, self.onImgLoaded, self,RES.ResourceItem.TYPE_IMAGE);
			self.mapMgr.tileLayer.addChild(self.imgTile);
		}
	}

	private onImgLoaded(bmd) {
		var self = this;
		self.imgTile.x = self.c * MapManager.TILE_WIDTH;
		self.imgTile.y = self.r * MapManager.TILE_HEIGHT;
		self.imgTile.texture = bmd;

		if (bmd == null) {
			GameGlobal.resMgr.onLoaded();
		}
	}

	public onRemove() {
		this.imgTile.visible = false;
	}

	public dispose() {
		this.onRemove();
		this.mapMgr.tileLayer.removeChild(this.imgTile);
		if (this.imgTile.texture) {
			this.imgTile.texture.dispose();
			this.imgTile.texture = null;
		}
		RES.destroyRes(this.imgUrl);
		MapTile.POOL.push(this);
		this.imgUrl = null;
	}

	public onEvent(evt, arg) {
	}
}
