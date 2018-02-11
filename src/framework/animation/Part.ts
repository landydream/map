class Part {

	public parts: Parts;
	public view: egret.Bitmap;
	public mcdata: egret.MovieClipData;
	public totalFrames: number = 0;

	public type: number;
	public dep: number = 0;
	public val: any;

	public res: RESObj;

	public parent: Parts;

	public act: any = 0;

	//[--- 作为特效时的数据
	public startTime: number;
	public aniInterv: number;
	public endTime: number;
	public repeat: boolean;
	public visible: boolean = true;

	public static POOL = [];

	public static create(): Part {
		var ret: Part = Part.POOL.length ? Part.POOL.pop() : new Part();
		if (DEBUG) {
			ret.isDispose = null;
		}
		return ret;
	}

	public constructor() {
		this.view = new egret.Bitmap();
		this.view.touchEnabled = false;
	}

	public setVal(v: any) {
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
			} else {
				self.res = null;
				self.view.visible = false;
			}
		}
	}

	public setAct(v: any) {
		if (this.act != v) {
			this.act = v;
			this.buildmc();
		}
	}

	public _curFrm: number = 0;
	public _perc: number = 0;
	public setPec(v: number): void {
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
				} else {
					self.view.$setAnchorOffsetX(0);
					self.view.$setAnchorOffsetY(0);
					self.view.texture = null;
				}
			}
		}
	}

	public framData: egret.MovieClipData;
	public buildmc() {
		if (this.res && this.res.factory) {
			this.mcdata = this.res.factory.generateMovieClipData(this.act);
			this._curFrm = -1;
			this.setPec(this._perc);
			this.view.visible = true && this.visible;
		} else {
			this.view.visible = false;
		}
	}

	public setVisible(v: boolean): void {
		this.view.visible = v;
		this.visible = v;
	}

	public isDispose;
	public dispose() {
		var self = this;
		if (DEBUG) {
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
	}
}