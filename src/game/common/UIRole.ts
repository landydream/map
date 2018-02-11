class UIRole extends egret.DisplayObjectContainer {
	public parts: Parts;
	public txPart: TXPart;
	public titlePart: Part;
	public ghPart: Part;
	public soulPart: SoulPart;
	public aniTime = 0;
	public aniInterv = 1000;

	public dir = 1;
	public invalid = 0;// |1：皮肤有更新
	public isRepeat: boolean = true;

	public scale: number = 1;
	public action: number = 0;

	public body;//皮肤
	public weapon;
	public wing;
	public horse;
	public tx;
	public title;
	public guangHuan;

	public playList;

	public constructor() {
		super();
		var self = this;
		this.touchEnabled = this.touchChildren = false;
		self.createParts();

		this.setDir(2);
	}

	public createParts() {
		this.parts = new Parts();
		this.addChild(this.parts);

		// var body: Part = new Part();
		// body.type = Parts.P_BODY;
		// body.dep = 5;
		// this.parts.addPart(body);
	}

	public _last;
	public update(): void {
		var nowTime = egret.getTimer();
		var dt = nowTime - this._last;
		dt = 33;

		var self = this;
		self.aniTime += dt;
		var perc = self.aniTime / self.aniInterv;
		if (self.isRepeat == false) {
			if (self.aniTime > self.aniInterv) {
				self.parts.perc = 0;
				if (self.playList) {
					self.playNext();
				} else {
					self.playIdle();
				}
			} else {
				self.parts.perc = perc;
			}
		} else {
			self.parts.perc = perc;
		}

		if (self.invalid) {
			self.updateState();
		}

		if (perc >= 1) {
			perc = perc - (perc >> 0);
		}

		if (self.txPart) {
			self.txPart.update(perc);
		}
		if (self.titlePart) {
			self.titlePart.setPec(perc);
		}
		if (self.ghPart) {
			self.ghPart.setPec(perc);
		}
		if (self.soulPart) {
			self.soulPart.update(perc);
		}
	}

	public setPart(type: number, v) {
		if (type == UnitConst.KEY_BODY || type == UnitConst.KEY_XIANLV_ID || type == UnitConst.KEY_TIANNV_ID || type == UnitConst.KEY_PET_ID) {
			this.setBody(v);
		} else if (type == UnitConst.KEY_WEAPON) {
			this.setWeapon(v);
		} else if (type == UnitConst.KEY_HORSE) {
			this.setHorse(v);
		} else if (type == UnitConst.KEY_WING) {
			this.setWing(v);
		} else if (type == UnitConst.KEY_TIANXIAN_ID) {
			this.setTianXian(v);
		} else if (type == UnitConst.KEY_TITLE || type == UnitConst.KEY_XIANWEI) {
			this.setTitle(v);
		} else if (type == UnitConst.KEY_FAZHEN || type == UnitConst.KEY_TONGLING) {
			this.setGuangHuan(v);
		} else if (type == UnitConst.KEY_SOUL) {
			this.setSoul(v);
		}
	}

	public getBody(): number {
		return this.body;
	}

	public setBody(v) {
		if (this.body != v) {
			this.body = v;
			this.invalid |= 3;
		}
	}

	public setHorse(v) {
		if (v != this.horse) {
			this.horse = v;
			this.invalid |= 3;
		}
	}

	public setWing(v) {
		if (v != this.wing) {
			this.wing = v;
			this.invalid |= 3;
		}
	}

	public setWeapon(v) {
		if (this.weapon != v) {
			this.weapon = v;
			this.invalid |= 3;
		}
	}

	public setTianXian(v) {
		if (this.tx != v) {
			this.tx = v;
			this.invalid |= 8;
		}
	}

	clear(): void {
		if (this.body) {
			this.setBody(0);
		}
		if (this.horse) {
			this.setHorse(0);
		}
		if (this.wing) {
			this.setWing(0);
		}
		if (this.weapon) {
			this.setWeapon(0);
		}
		if (this.tx) {
			this.setTianXian(0);
		}
		if (this.title) {
			this.setTitle(0);
		}
		if (this.guangHuan) {
			this.setGuangHuan(0);
		}
		this.setSoul(0);
	}

	public setDir(v) {
		if (this.dir != v) {
			this.dir = v;
			this.invalid |= 1;
			this.invalid |= 2;
		}
	}

	public setAciton(v) {
		if (this.action != v) {
			this.action = v;
			this.invalid |= 1;
		}
	}

	public updateState() {
		var invalid = this.invalid;
		if (invalid) {
			if (invalid & 1) {//action
				this.updateAction();
			}
			if (invalid & 2) {//way
				this.updateWay();
			}
			if (invalid & 4) {
			}
			if (invalid & 8) {
				this.updateTX();
			}
			this.invalid = 0;
		}
	}

	public playAtt(): void {
		this.playList = [Action.IDLE, Action.ATTACK];
		this.isRepeat = false;
		this.playNext();
	}

	protected playNext() {
		if (this.playList && this.playList.length > 0) {
			var act = this.playList.shift();
			if (this.playList.length <= 0) {
				this.playList = null;
			}
			this.action = act;
			this.aniTime = 0;
			this.invalid |= 1;
		}
	}

	public playIdle(): void {
		this.isRepeat = true;
		this.action = Action.IDLE;
		this.aniTime = 0;
		this.invalid |= 1;
	}

	public updateAction() {
		var self = this;
		var dirKey: string;
		var actKey: string;

		if (self.dir == 2 || self.dir == 3) {
			dirKey = "d";
		} else {
			dirKey = "u";
		}
		if (self.action == Action.IDLE) {
			actKey = "stand";
			self.aniInterv = 1000;
		} else if (self.action == Action.RUN) {
			actKey = "run";
			self.aniInterv = 800;
		} else if (self.action == Action.ATTACK) {
			actKey = "attack";
			self.aniInterv = 800;
		}

		var bodyP: Part = self.parts.dic[Parts.P_BODY];

		if (self.body) {
			if (!bodyP) {
				bodyP = Part.create();
				bodyP.type = Parts.P_BODY;
				bodyP.dep = 5;
			}
			if (!self.parts.isPartByType(Parts.P_BODY)) {
				self.parts.addPart(bodyP);
			}
			var bkey = "body/" + self.body + "/" + dirKey + "/" + "ani";
			bodyP.setAct(actKey);
			bodyP.setVal(bkey);
		} else {
			if (bodyP) {
				self.parts.removePart(bodyP);
			}
		}

		var weaponkey;
		var horsekey;
		var horseHeadKey;
		var wingkey;

		if (self.weapon) {
			weaponkey = "weapon/" + self.weapon + "/" + dirKey + "/" + "ani";
		}

		if (self.horse) {
			horsekey = "horse/" + self.horse + "/" + dirKey + "/" + "ani";
			horseHeadKey = "horse/" + self.horse + "/" + "head" + "/" + "ani";
		}

		if (self.wing) {
			wingkey = "wing/" + self.wing + "/" + dirKey + "/" + "ani";
		}

		var weapon: Part = self.parts.dic[Parts.P_WEAPON];
		if (weaponkey) {
			if (!weapon) {
				weapon = Part.create();
				weapon.type = Parts.P_WEAPON;
			}
			if (!self.parts.isPartByType(Parts.P_WEAPON)) {
				self.parts.addPart(weapon);
			}
			weapon.setAct(actKey);
			weapon.setVal(weaponkey);
		} else {
			if (weapon) {
				self.parts.removePart(weapon);
			}
		}

		var horsePart: Part = self.parts.dic[Parts.P_HORSE];
		var horseHeadPart: Part = self.parts.dic[Parts.P_HORSE_HEAD];
		if (horsekey) {
			if (!horsePart) {
				horsePart = Part.create();
				horsePart.type = Parts.P_HORSE;
				var horseHeadPart: Part = Part.create();
				horseHeadPart.type = Parts.P_HORSE_HEAD;
			}
			if (!self.parts.isPartByType(Parts.P_HORSE)) {
				self.parts.addPart(horsePart);
			}
			if (!self.parts.isPartByType(Parts.P_HORSE_HEAD)) {
				self.parts.addPart(horseHeadPart);
			}
			horsePart.setAct(actKey);
			horsePart.setVal(horsekey);
			horseHeadPart.setAct(actKey);
			horseHeadPart.setVal(horseHeadKey);
		} else {
			if (horsePart) {
				self.parts.removePart(horsePart);
				self.parts.removePart(horseHeadPart);
			}
		}

		var wingPart: Part = self.parts.dic[Parts.P_WING];
		if (wingkey) {
			if (!wingPart) {
				wingPart = Part.create();
				wingPart.type = Parts.P_WING;
			}
			if (!self.parts.isPartByType(Parts.P_WING)) {
				self.parts.addPart(wingPart);
			}
			wingPart.setAct(actKey);
			self.parts.setPart(Parts.P_WING, wingkey);
		} else {
			if (wingPart) {
				self.parts.removePart(wingPart);
			}
		}
		self.updatePos();
	}

	/**
	 * 4  1
	 * 3  2
	 */
	public updateWay() {
		var self = this;

		self.parts.scaleY = self.scale;
		if (self.dir == 3 || self.dir == 4) {
			self.parts.scaleX = self.scale;
		} else {
			self.parts.scaleX = -1 * self.scale;
		}

		var lis = self.parts.list;
		if (lis.length == 1) return;

		for (var i: number = 0; i < lis.length; i++) {
			var p: Part = lis[i];
			if (p) p.dep = self.getDep(p.type);

			if (p.type == Parts.P_HORSE_HEAD) {
				if (self.dir == 2 || self.dir == 3) {
					p.view.visible = true;
				} else {
					p.view.visible = false;
				}
			}
		}

		self.parts.sort();
	}

	public updateTX(): void {
		var self = this;
		var tx = self.tx;
		if (tx > 0) {
			var key = "eff/tianxian/" + tx;
			if (!self.txPart) {
				self.txPart = TXPart.createPart(self);
				self.txPart.act = "_2";
				self.txPart.setVal(key);
				self.addChild(self.txPart.view);
			}
			self.txPart.setVal(key);
		} else {
			if (self.txPart) {
				self.removeChild(self.txPart.view)
				self.txPart.dispose();
				self.txPart = null;
			}
		}
	}

	public setTitle(v) {
		var self = this;
		if (v > 0) {
			if (this.title != v) {
				var key = "eff/title/" + v;
				if (!self.titlePart) {
					self.titlePart = Part.create();
					self.titlePart.act = "_1";
					self.titlePart.setVal(key);
					self.titlePart.view.y = -120;
					self.addChild(self.titlePart.view);
					this.updatePos();
				} else {
					self.titlePart.setVal(key);
				}
			}
		} else {
			if (self.titlePart) {
				self.removeChild(self.titlePart.view)
				self.titlePart.dispose();
				self.titlePart = null;
			}
		}
		this.title = v;
	}

	public setGuangHuan(v) {
		var self = this;
		if (v > 0) {
			if (this.guangHuan != v) {
				var key = "eff/guanghuan/" + v;
				if (!self.ghPart) {
					self.ghPart = Part.create();
					self.ghPart.act = "_1";
					self.ghPart.setVal(key);
					self.addChildAt(self.ghPart.view, 0);
					this.updatePos();
				} else {
					self.ghPart.setVal(key);
				}
			}
		} else {
			if (self.ghPart) {
				self.removeChild(self.ghPart.view)
				self.ghPart.dispose();
				self.ghPart = null;
			}
		}
		this.guangHuan = v;
	}

	public setSoul(v) {
		var self = this;
		if (v) {
			var key = "resource/ui/pet/soul/" + v + ".png";
			if (!self.soulPart) {
				self.soulPart = SoulPart.createPart(self);
				self.addChild(self.soulPart.view);
			}
			self.soulPart.setVal(key);
		} else {
			if (self.soulPart) {
				self.removeChild(self.soulPart.view);
				self.soulPart = null;
			}
		}
	}

	public updatePos() {
		// var py = Model_Ride.getPartOffY(this.horse);
		// this.parts.y = py;
		// if (this.titlePart) {
		// 	var offy = -120;
		// 	if (this.body > 0 && Config.QXGD[this.body]) {
		// 		offy = -Config.QXGD[this.body].gd;
		// 	}
		// 	this.titlePart.view.y = offy + py;
		// }
	}

	public getDep(type: number): number {
		if (this.dir == 4 || this.dir == 1) {
			return Parts.U_PART_LIST.indexOf(type);
		} else {
			return Parts.D_PART_LIST.indexOf(type);
		}
	}

	public dispose() {
		var self = this;
		self.clear();
		self.setDir(2);
		if (self.parent) {
			self.parent.removeChild(self);
		}
		self.x = self.y = 0;
		self.scaleX = self.scaleY = 1;
		UIRole.pool.push(self);
		if(self.visible == false) {
			self.visible = true;
		}
	}

	protected static pool: UIRole[] = [];
	public static create() {
		var r = UIRole.pool.length ? UIRole.pool.pop() : new UIRole();
		return r;
	}

}