class ImageLoader {
	protected static _ins: ImageLoader;
	public static get instance() {
		if (!this._ins) {
			this._ins = new ImageLoader();
		}
		return this._ins;
	}

	public itmeRefMap = {};
	public imgRefUrl = {};
	public ref0List = [];

	/**url是不加head的，统一在这里加上 */
	public loader(url: string, img: eui.Image) {
		if (img == null) return;
		var self = this;
		self.reduceImgRes(img);
		if (url == null) return;

		var _url = LoaderManager.getUrl(url);
		var refItem: ImgResItem = self.itmeRefMap[_url];
		if (!refItem) {
			refItem = self.itmeRefMap[_url] = ImgResItem.create();
			refItem.url = _url;
		} else {
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
	}

	public reduceImgRes(img: eui.Image): void {
		var self = this;
		if (self.imgRefUrl[img.hashCode]) {
			var _url = self.imgRefUrl[img.hashCode];
			var refItem: ImgResItem = self.itmeRefMap[_url];
			if (refItem) {
				var havRef: boolean = refItem.reduceRes(img);
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
	}

	protected onTextureCompFunc(texture, url) {
		var item: ImgResItem = this.itmeRefMap[url];
		if (item) {
			item.texture = texture;
			item.compFunC();
		}

		if (texture == null) {
			GameGlobal.resMgr.onLoaded();
		}
	}

	public checkDestoryT() {
		var len = this.ref0List.length;
		if (len > 0) {
			var num = Math.ceil(len / 4);
			if (num > 25) num = 25;

			var isNull: boolean = false;
			for (var i: number = 0; i < num; i++) {
				var res: ImgResItem = this.ref0List[i];
				var pt = egret.getTimer() - res.ref0Time;
				if (pt > 60000) {
					if (res.refCount <= 0) {
						this.destoryRes(res);
						this.ref0List[i] = null;
						isNull = true;
					}
				}
			}

			if (isNull) ArrayUitl.cleannull(this.ref0List);
		}
	}

	public destoryRes(res: ImgResItem) {
		delete this.itmeRefMap[res.url];
		res.dispose();
	}
}

class ImgResItem {
	public url: string;
	public loadingImgs: eui.Image[] = [];
	public isLoading: boolean;
	public ref0Time: number;
	public refCount: number = 0;
	public inDList: boolean;
	public texture: egret.Texture;

	public static POOL = [];
	public static create(): ImgResItem {
		var ret: ImgResItem = ImgResItem.POOL.length ? ImgResItem.POOL.pop() : new ImgResItem();
		return ret;
	}

	public compFunC(): void {
		var uses = this.loadingImgs;
		for (var i = 0, len = uses.length; i < len; i++) {
			var img = uses[i];
			if (img) img.source = this.texture;
		}
		uses.length = 0;
		this.isLoading = false;
	}

	public addRefRes(img: eui.Image): void {
		if (this.texture) {
			img.source = this.texture;
		} else {
			this.loadingImgs.push(img);
		}
		this.refCount++;
	}

	public reduceRes(img: eui.Image): boolean {
		if (this.isLoading == true) {
			var index = this.loadingImgs.indexOf(img);
			this.loadingImgs.splice(index, 1);
		}

		if (this.refCount > 0) this.refCount--;

		if (this.refCount <= 0) {
			this.ref0Time = egret.getTimer();
			return false;
		}
		return true;
	}

	public dispose(): void {
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
	}
}