class SoulPart {

	public static createPart(master): SoulPart {
		var ret = new SoulPart(master);
		return ret;
	}

	public master;
	public dir;
	public mv: number = 1;
	public view: eui.Image;
	public constructor(master) {
		this.view = new eui.Image();
		this.master = master;
	}

	public setVal(val) {
		ImageLoader.instance.loader(val, this.view);
	}

	public mbody;
	public startX: number;
	public startY: number;
	public endX: number;
	public endY: number;
	public needTime;
	public time;
	public update(v: number) {
		if (v >= 1) {
			v = v - (v >> 0);
		}

		var self = this;
		if (self.dir != self.master.dir || self.mbody != self.master.body) {
			self.dir = self.master.dir;
			self.mbody = self.master.body;
			var pos = UnitManager.SoulPos[self.master.dir];
			self.endX = pos[0];
			var gd = Config.QXGD[self.mbody];
			if (gd) {
				self.endY = -40 - gd.gd;
			} else {
				self.endY = pos[1];
			}
			self.startX = self.view.x;
			self.startY = self.view.y;
			var s = MathUtil.distance(self.startX, self.startY, self.endX, self.endY);
			self.needTime = Math.ceil(Math.sqrt(s) * 8 / 33);
			self.time = 0;
		} else {
			if (self.time < self.needTime) {
				self.time += 1;
				var invRatio: number = self.time / self.needTime - 1.0;
				var rate = invRatio * invRatio * invRatio + 1;
				self.view.x = MathUtil.getPosValue(self.startX, self.endX, rate);
				self.view.y = MathUtil.getPosValue(self.startY, self.endY, rate);
			} else {
				var inter = 8;
				if (self.mv & 1) {
					self.view.y -= 0.5;
				} else if (self.mv & 2) {
					self.view.y += 0.5;
				}
				if (self.view.y <= self.endY - inter) {
					self.mv = 2;
				} else if (self.view.y >= self.endY + inter) {
					self.mv = 1;
				}
			}
		}
	}
}