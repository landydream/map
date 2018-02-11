class TXPart extends Part {

	public static pool = [];
	public static createPart(master): TXPart {
		var ret: TXPart = TXPart.pool.length ? TXPart.pool.pop() : new TXPart(master);
		if (DEBUG) {
			ret.isDispose = null;
		}
		ret.master = master;
		return ret;
	}

	public master;
	public dir;
	public mv: number = 1;

	public constructor(master) {
		super();
		this.master = master;
	}

	public startX:number;
	public startY:number;
	public endX:number;
	public endY:number;
	public needTime;
	public time;

	public update(v: number) {
		if (v >= 1) {
			v = v - (v >> 0);
		}

		var self = this;
		self.setPec(v);

		if (self.dir != self.master.dir) {
			self.dir = self.master.dir;
			if (self.dir == 1 || self.dir == 4) {
				// if (self.master.view) {
				// 	self.master.view.setChildIndex(self.view, self.master.view.numChildren - 1);
				// } else {
				// 	self.master.setChildIndex(self.view, self.master.numChildren - 1);
				// }
				self.setAct("_1");
			} else {
				// if (self.master.view) {
				// 	self.master.view.setChildIndex(self.view, 0);
				// } else {
				// 	self.master.setChildIndex(self.view, 0);
				// }
				self.setAct("_2");
			}
			var scale = 1;
			if (self.master.scale) {
				scale = self.master.scale;
			}
			if (self.dir == 3 || self.dir == 4) {
				self.view.scaleX = scale;
			} else {
				self.view.scaleX = -1 * scale;
			}
			var pos = UnitManager.TianXianPos[self.master.dir];
			self.endX = pos[0];
			self.endY = pos[1];
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
				self.view.$setX(MathUtil.getPosValue(self.startX, self.endX, rate));
				self.view.$setY(MathUtil.getPosValue(self.startY, self.endY, rate));
			} else {
				var inter = 10;
				if (self.master.action != Action.IDLE) {//主角移动是浮动小点
					inter = 5;
				}
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

	public dispose() {
		var self = this;
		if (DEBUG) {
			if (self.isDispose) {
				console.error("错误的释放PART:" + self.val);
			}
			self.isDispose = true;
		}

		self.parts = null;
		self.view.visible = false;
		self.view.scaleX = self.view.scaleY = 1;

		self.view.x = this.view.y = 0;

		self.setVal(null);
		self.dep = 0;
		self.master = null;
		self.dir = null;
		self.mv = 0;

		TXPart.pool.push(this);
	}
}