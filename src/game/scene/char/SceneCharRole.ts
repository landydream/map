class SceneCharRole extends SceneObject {

	public static UEVENT_ACCPATH: number = 1; //获得寻路路径
	public static UEVENT_TALK: number = 2;
	public static UEVENT_REACH: number = 3; //到达目的地
	public static UEVENT_ON_TOUCH: number = 4; //被点击
	public static UEVENT_USERCLICKMAP: number = 5;  //玩家点击地图
	public static UEVENT_STOPMOVE: number = 6; //停止移动

	private static P: Array<SceneCharRole> = [];
	public static create(): SceneCharRole {
		var pool = SceneCharRole.P;
		var ret = pool.length ? pool.pop() : new SceneCharRole();
		ret.id = SceneObject.COUNTER++;
		return ret;
	}

	public plugs = [];
	public plugCtx: any = {};

	public aniTime = 0;
	public aniInterv = 1000;

	public view: DepSprite;
	public charType = 0;
	public forceType = 0;  //1 主角  2 其他玩家 3 场景怪物

	public dir = 1;
	public invalid = 0;// |1：皮肤有更新

	public body = 1;//皮肤
	public weapon = 0;
	public wing = 0;
	public horse = 0;
	public guanghuan = 0;
	public tianxian = 0;
	public title = 0;
	public showHorse: boolean;
	public action: number = 0;
	public pauseRender: boolean = false;
	public isAttack = 0;//头顶刀剑

	public shadow: eui.Image;
	public parts: Parts;
	/**天仙 */
	public txPart: TXPart;
	public titlePart: Part;
	/**光环 */
	public ghPart: Part;
	public soulPart: SoulPart;
	/**被攻击时 */
	public attPart: Part;

	public dead;
	public move_state = 0;
	public moveSpeed = 120;
	public canMove: boolean = true;
	public ex: number = 0;
	public ey: number = 0;

	public name = "";
	public lbName: eui.Label;
	public grpName: egret.Shape;

	public headGroup: egret.Sprite;
	public vo: Vo_Player;

	public data;

	public constructor() {
		super();
		var self = this;
		self.view = new DepSprite();
		self.createParts();
	}

	public setName(n: string): void {
		var self = this;

		if (n == "" || n == null) {
			if (self.lbName) {
				if (self.lbName.parent) {
					self.lbName.parent.removeChild(self.lbName);
					self.grpName.parent.removeChild(self.grpName);
				}
			}
			return;
		}

		if (!self.lbName) {
			self.lbName = new eui.Label();
			self.lbName.y = 17;
			self.lbName.size = 18;
			self.lbName.textColor = Color.GREENINT;
			self.lbName.bold = true;
			self.lbName.textAlign = "center";
			self.lbName.cacheAsBitmap = true;

			self.grpName = new egret.Shape();
			self.grpName.y = self.lbName.y;
			self.grpName.cacheAsBitmap = true;

			self.lbName.touchEnabled = self.grpName.touchEnabled = false;
		}

		self.view.addChild(self.grpName);
		self.view.addChild(self.lbName);
		self.lbName.text = n;
		self.lbName.x = -self.lbName.width / 2;

		self.grpName.graphics.clear();
		self.grpName.graphics.beginFill(0x000000, 0.4);
		self.grpName.graphics.drawRect(self.lbName.x - 6,
			0, self.lbName.width + 12, self.lbName.height + 3);
		self.grpName.graphics.endFill();
	}

	public createParts() {
		var shadow: eui.Image = this.shadow = new eui.Image();
		shadow.x = -62 / 2;
		shadow.y = -33 / 2;
		ImageLoader.instance.loader("resource/model/s/1.png", shadow);
		this.view.addChild(shadow);

		this.shadow.touchEnabled = false;

		this.parts = new Parts();
		this.view.addChild(this.parts);

		var body: Part = Part.create();
		body.type = Parts.P_BODY;
		body.dep = 5;
		this.parts.addPart(body);
	}

	public timeAc: number = 0;
	public update(ctx) {
		var self = this;
		if (self.pauseRender) {
			return;
		}

		var view = self.view;

		var len = self.plugs.length;
		var plugArg = self.plugCtx;
		var plugs = self.plugs;

		var plugDirty = 0;
		for (var i = 0; i < len; i++) {
			var plug = plugs[i];
			if (!plug) {
				plugDirty++;
				continue;
			}
			plugArg.d = 0;
			plugArg.dt = ctx.dt;
			plug.update(plugArg);
			if (plugArg.d) {//dead
				plugs[i] = null;
				plug.onRemove();
				plugDirty++;
			} else {
			}
		}

		ctx.d = self.dead;
		if (plugDirty) {
			ArrayUitl.cleannull(plugs);
		}

		view.$setX(self.x);
		view.$setY(self.y);

		self.updateState();

		self.aniTime += ctx.dt;
		var perc = self.aniTime / self.aniInterv;
		self.parts.perc = perc;

		view.dep = self.y;

		self.timeAc += ctx.dt;
		if (self.timeAc > 100) {
			self.timeAc = 0;
			if (self.scene.mapMgr.alphaMap == true) {
				if (self.scene.mapMgr.isAlpha(self.x, self.y)) {
					view.alpha = 0.5;
				} else {
					view.alpha = 1;
				}
			}
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
		if (self.attPart) {
			self.attPart.setPec(perc);
		}
	}

	public setPart(type: number, v) {
		var self = this;
		if (type == UnitConst.KEY_BODY) {
			self.setBody(v);
		} else if (type == UnitConst.KEY_WING) {
			self.setWing(v);
		} else if (type == UnitConst.KEY_HORSE) {
			self.setHorse(v);
		} else if (type == UnitConst.KEY_WEAPON) {
			self.setWeapon(v);
		} else if (type == UnitConst.KEY_TITLE || type == UnitConst.KEY_XIANWEI) {
			self.setTitle(v);
		} else if (type == UnitConst.KEY_FAZHEN || type == UnitConst.KEY_TONGLING) {
			self.setGuangHuan(v);
		} else if (type == UnitConst.KEY_TIANXIAN_ID) {
			self.setTianXian(v);
		} else if (type == UnitConst.KEY_SOUL) {
			self.setSoul(v);
		} else if (type == UnitConst.KEY_ATTACK) {
			self.setAttack(v);
		}
	}

	public getBody(): number {
		return this.body;
	}

	public setBody(v) {
		if (this.body != v) {
			this.body = v;
			this.invalid |= 1;
			this.invalid |= 2;
		}
	}

	public setHorse(v) {
		if (v != this.horse) {
			this.horse = v;
			this.invalid |= 1;
			this.invalid |= 2;
		}
	}

	public setWing(v) {
		if (v != this.wing) {
			this.wing = v;
			this.invalid |= 1;
			this.invalid |= 2;
		}
	}

	public setWeapon(v) {
		if (this.weapon != v) {
			this.weapon = v;
			this.invalid |= 1;
			this.invalid |= 2;
		}
	}

	public setGuangHuan(v) {
		var self = this;
		if (v > 0) {
			if (this.guanghuan != v) {
				var key = "eff/guanghuan/" + v;
				if (!self.ghPart) {
					self.ghPart = Part.create();
					self.ghPart.act = "_1";
					// self.ghPart = EffectMgr.addEff(key, self.view, 0, -0);
					self.ghPart.setVal(key);
					self.view.addChildAt(self.ghPart.view, 1);
				} else {
					self.ghPart.setVal(key);
				}
			}
		} else {
			this.title = v;
			if (self.ghPart) {
				// EffectMgr.removeEff(self.ghPart);
				self.view.removeChild(self.ghPart.view)
				self.ghPart.dispose();
				self.ghPart = null;
			}
		}
		this.guanghuan = v;
	}

	public setTianXian(v) {
		if (this.tianxian != v) {
			this.tianxian = v;
			this.invalid |= 8;
		}
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
			if (invalid & 8) {
				this.updateTX();
			}
			if (invalid & 2) {//way
				this.updateWay();
			}
			if (invalid & 4) {
			}
			this.invalid = 0;
		}
	}

	public updateAction() {
		var self = this;
		var dirKey: string;
		var actKey: string;
		var parts = self.parts;

		if (self.dir == 2 || self.dir == 3) {
			dirKey = "d";
		} else {
			dirKey = "u";
		}

		var bodyP: Part = self.parts.dic[Parts.P_BODY];

		if (self.action == Action.IDLE) {
			actKey = "stand";
			self.aniInterv = 1000;
		} else if (self.action == Action.RUN) {
			actKey = "run";
			self.aniInterv = 800;
		} else {
			actKey = "stand";
		}

		if (self.body > 0) {
			var bkey = "body/" + self.body + "/" + dirKey + "/" + "ani";
			bodyP.setAct(actKey);
			bodyP.setVal(bkey);
		}

		var weaponkey;
		var horsekey;
		var horseHeadKey;
		var wingkey;
		var tianxiankey;

		if (self.weapon != 0) {
			weaponkey = "weapon/" + self.weapon + "/" + dirKey + "/" + "ani";
		}

		if (self.horse != 0) {
			horsekey = "horse/" + self.horse + "/" + dirKey + "/" + "ani";
			horseHeadKey = "horse/" + self.horse + "/" + "head" + "/" + "ani";
		}

		if (self.wing != 0) {
			wingkey = "wing/" + self.wing + "/" + dirKey + "/" + "ani";
		}

		var weapon: Part = parts.dic[Parts.P_WEAPON];
		if (weaponkey) {
			if (!weapon) {
				weapon = Part.create();
				weapon.type = Parts.P_WEAPON;
				parts.addPart(weapon);
			}
			weapon.setAct(actKey);
			weapon.setVal(weaponkey);
		} else {
			if (weapon) parts.removePart(weapon);
		}

		var horsePart: Part = parts.dic[Parts.P_HORSE];
		var horseHeadPart: Part = parts.dic[Parts.P_HORSE_HEAD];
		if (horsekey) {
			if (!horsePart) {
				horsePart = Part.create();
				horsePart.type = Parts.P_HORSE;
				parts.addPart(horsePart);
				horseHeadPart = Part.create();
				horseHeadPart.type = Parts.P_HORSE_HEAD;
				parts.addPart(horseHeadPart);
			}
			horsePart.setAct(actKey);
			horsePart.setVal(horsekey);
			horseHeadPart.setAct(actKey);
			horseHeadPart.setVal(horseHeadKey);
			//这2个方向不显示头
			if (self.dir == 1 || self.dir == 4) {
				horseHeadPart.view.visible = horseHeadPart.visible = false;
			} else {
				horseHeadPart.view.visible = horseHeadPart.visible = true;
			}
		} else {
			if (horsePart) {
				parts.removePart(horsePart);
				parts.removePart(horseHeadPart);
			}
		}

		var wingPart: Part = parts.dic[Parts.P_WING];
		if (wingkey) {
			if (!wingPart) {
				wingPart = Part.create();
				wingPart.type = Parts.P_WING;
				parts.addPart(wingPart);
			}
			wingPart.setAct(actKey);
			wingPart.setVal(wingkey);
		} else {
			if (wingPart) {
				parts.removePart(wingPart);
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
		var parts = self.parts;

		parts.scaleY = self.scale;
		if (self.dir == 3 || self.dir == 4) {
			parts.scaleX = self.scale;
		} else {
			parts.scaleX = -1 * self.scale;
		}

		var lis = parts.list;
		if (lis.length == 1) return;

		for (var i: number = 0; i < lis.length; i++) {
			var p: Part = lis[i];
			if (p) p.dep = self.getDep(p.type);

			if (p.type == Parts.P_HORSE_HEAD) {
				if (self.dir == 2 || self.dir == 3) {
					p.view.visible = p.visible = true;
				} else {
					p.view.visible = p.visible = false;
				}
			}
		}

		parts.sort();
	}

	public setTitle(v) {
		var self = this;
		if (v > 0) {
			if (this.title != v) {
				this.title = v;
				var key = "eff/title/" + v;
				if (!self.titlePart) {
					self.titlePart = Part.create();
					self.titlePart.act = "_1";
					// self.titlePart = EffectMgr.addEff(key, self.view, 0, -120);
					self.titlePart.setVal(key);
					self.view.addChild(self.titlePart.view);
					this.updatePos();
				} else {
					self.titlePart.setVal(key);
				}
			}
		} else {
			if (self.titlePart) {
				// EffectMgr.removeEff(self.titlePart);
				self.view.removeChild(self.titlePart.view)
				self.titlePart.dispose();
				self.titlePart = null;
			}
		}
		this.title = v;
	}

	public updateTX(): void {
		var self = this;
		var tx = self.tianxian;
		if (tx > 0) {
			var key = "eff/tianxian/" + tx;
			if (!self.txPart) {
				self.txPart = TXPart.createPart(self);
				self.txPart.act = "_1";
				self.txPart.setVal(key);
				self.view.addChild(self.txPart.view);
			} else {
				self.txPart.setVal(key);
			}
		} else {
			if (self.txPart) {
				self.view.removeChild(self.txPart.view)
				self.txPart.dispose();
				self.txPart = null;
			}
		}
	}

	public setSoul(v) {
		var self = this;
		if (v) {
			var key = "resource/ui/pet/soul/" + v + ".png";
			if (!self.soulPart) {
				self.soulPart = SoulPart.createPart(self);
				self.view.addChild(self.soulPart.view);
			}
			self.soulPart.setVal(key);
		} else {
			if (self.soulPart) {
				self.view.removeChild(self.soulPart.view);
				self.soulPart = null;
			}
		}
	}
	public setAttack(v) {
		var self = this;
		if (v == 1) {
			if (this.isAttack != 1) {
				var key = "eff/attack/ani";
				if (!self.attPart) {
					self.attPart = Part.create();
					self.attPart.act = "_1";
					self.attPart.setVal(key);
					self.view.addChild(self.attPart.view);
					self.updatePos();
				}
			}
		} else {
			if (self.attPart) {
				self.view.removeChild(self.attPart.view)
				self.attPart.dispose();
				self.attPart = null;
			}
		}
		this.isAttack = v;
	}

	public updatePos() {
		// var py = Model_Ride.getPartOffY(this.horse);
		var py = 0;
		this.parts.y = py;
		if (this.titlePart) {
			if (this.charType == UnitConst.TIANNV) {
				var high = Config.QXGD[this.body] ? Config.QXGD[this.body].gd : 110;
				this.titlePart.view.y = -1 * high;
			} else {
				this.titlePart.view.y = -120 + py;
			}
		}
		if (this.attPart) {
			this.attPart.view.y = -120 + py;
		}
	}

	public getDep(type: number): number {
		if (this.dir == 4 || this.dir == 1) {
			return Parts.U_PART_LIST.indexOf(type);
		} else {
			return Parts.D_PART_LIST.indexOf(type);
		}
	}


	public onAdd() {
		this.invalid |= 1;
		this.scene.unitLayer.depAddChild(this.view);
		this.view.visible = true;
	}

	public onRemove() {
		for (var i = this.plugs.length - 1; i >= 0; i--) {//移除插件
			var plug = this.plugs[i];
			if (plug) {
				this.removePlug(plug);
			}
		}

		this.scene.unitLayer.depRemoveChild(this.view);
		this.view.alpha = 1;
		this.view.dep = -1;
		this.view.scaleX = this.view.scaleY = 1;
		this.view.visible = true;
		this.dead = 0;
		this.move_state = 0;
		this.invalid |= 255;
		this.forceType = 0;
		this.charType = 0;
		if (this.lbName) {
			this.lbName.textColor = Color.GREENINT;
		}

		this.setWeapon(0);
		this.setBody(0);
		this.setWing(0);
		this.setHorse(0);
		this.setGuangHuan(0);
		this.setTianXian(0);
		this.setTitle(0);
		this.setSoul(0);
		this.setName(null);
		this.setAciton(Action.IDLE);
		this.updateState();
		this.setAttack(0);
		this.setCharVis(true);

		this.vo = null;

		SceneCharRole.P.push(this);
	}

	public setCharVis(v): void {
		this.view.visible = v;
		this.pauseRender = !v;
	}

	public addPlug(plug) {
		this.plugs.push(plug);
		plug.onAdd();
	}

	public addPlugOnly(plug) {
		if (this.getPlugByTag(plug.tag) == null) {
			this.addPlug(plug);
		}
	}

	public getPlugByTag(tag: string) {
		var plugs = this.plugs;
		var len = plugs.length;
		for (var i = 0; i < len; i++) {
			var plug = plugs[i];
			if (plug && plug.tag == tag) {
				return plug;
			}
		}
		return null;
	}

	public removPlugByTag(tag: string) {
		var plug = this.getPlugByTag(tag);
		if (plug) this.removePlug(plug);
	}

	public removePlug(plug) {
		var index = this.plugs.indexOf(plug);
		if (DEBUG) {
			if (index == -1) {
				throw new Error("plugIndexError");
			}
		}
		this.plugs[index] = null;

		plug.onRemove();
	}


	//检查目标点是否进入可交互范围
	//rect 100 * 100
	public checkIntRange(tx, ty): boolean {
		var xx = this.x;
		var yy = this.y;
		if (tx < xx - 50) return false;
		if (tx > xx + 50) return false;
		if (ty < yy - 50) return false;
		if (ty > yy + 50) return false;

		return true;
	}

	//锁定移动到目标 并触发交互
	public lockTargetInt(tar: SceneCharRole): void {
		if (tar == null) return;

		var plug: LockTargetInvPlug = this.getPlugByTag("LockTargetInvPlug");
		var newTar: boolean = false;
		if (plug == null) {
			newTar = true;
		} else {
			if (plug.tar != tar) {
				this.removPlugByTag("LockTargetInvPlug");
				newTar = true;
			}
		}

		if (newTar) {
			var nPlug: LockTargetInvPlug = new LockTargetInvPlug();
			nPlug.tar = tar;
			nPlug.role = this;
			this.addPlugOnly(nPlug);
		} else {
			plug.onAdd();
		}
	}

	public setBattleState(v): void {
	}

	public onEvent(evt, arg) {
		var plugs = this.plugs;
		var len = plugs.length;
		for (var i = 0; i < len; i++) {
			var plug = plugs[i];
			if (plug) {
				plug.onEvent(evt, arg);
			}
		}
	}
}