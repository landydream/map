class MapScene extends MsgCenter {

	public static MSG_CHANGE = "m_c";
	public static MSG_MAPCFG_COMPLECT = "MSG_MAP_COMPLECT";

	public view: egret.Sprite;
	public unitLayer: DepSprite;

	public mapMgr: MapManager;

	//场景处理器，每种场景都应该有一个
	public sceneCtrl: ISceneCtrl;
	public nextCtrl: ISceneCtrl;

	public pauseCounter = 0;
	public rewardCounter = 0;
	public stopRenderFlags = [];

	public dt: number = 33;

	public scenetype = 0;

	public hero: SceneCharRole;

	public enterScene(mapid: number, scenetype: number = 1) {
		//场景适配器
		this.scenetype = scenetype;
		var ctrl = SceneCtrl.getCtrl(scenetype);
		this.enterSceneCtrl(ctrl);
		GameGlobal.control.notify(MapScene.MSG_CHANGE, scenetype);

		//地图场景
		this.mapMgr.initConfig(mapid);
	}

	public enterSceneCtrl(ctrl: ISceneCtrl) {
		if (this.sceneCtrl) {
			this.sceneCtrl.onExit(this);
		}
		this.sceneCtrl = ctrl;
		if (ctrl) {
			ctrl.onEnter(this);
		}
	}

	public constructor() {
		super();
		this.view = new egret.Sprite();
		this.unitLayer = new DepSprite();

		this.mapMgr = new MapManager(this.view);
		this.mapMgr.initCustom(0, -50, 720, 1100);

		this.view.addChild(this.unitLayer);
		GameGlobal.control.listen(Enum_MsgType.ON_BATTLE_ENTER, this.onBattleEnter, this);
		GameGlobal.control.listen(Enum_MsgType.ON_BATTLE_EXIT, this.onBattleExit, this);
	}

	public onBattleEnter(): void {
		this.addUnitLayerVis("onBattle");
		// this.unitLayer.visible = false;
		this.addStopRenderFlag("onBattle");
		this.scaleOut();
	}

	public onBattleExit(): void {
		this.removeUnitLayerVis("onBattle");
		// this.unitLayer.visible = true;
		this.removStopRenderFlag("onBattle");
		if (this.isShake_ == 2) {
			egret.Tween.removeTweens(this.view);
			this.onShakeEnd();
		}

		GameGlobal.control.callDelayMsgs();
	}

	protected unitSt = [];
	public addUnitLayerVis(st: string): void {
		var index = this.unitSt.indexOf(st);
		if (index == -1) {
			this.unitSt.push(st);
			if (this.unitSt.length == 1) {
				this.unitLayer.visible = false;
			}
		}
	}

	public removeUnitLayerVis(st: string): void {
		var index = this.unitSt.indexOf(st);
		if (index != -1) {
			this.unitSt.splice(index, 1)
			if (this.unitSt.length <= 0) {
				this.unitLayer.visible = true;
			}
		}
	}

	public addStopRenderFlag(sign: string): void {
		var index = this.stopRenderFlags.indexOf(sign);
		if (index == -1) {
			this.stopRenderFlags.push(sign);
			this.pauseCounter = 1;
		}
	}

	public removStopRenderFlag(sign: string): void {
		var index = this.stopRenderFlags.indexOf(sign);
		if (index != -1) {
			this.stopRenderFlags.splice(index, 1);
			if (this.stopRenderFlags.length == 0) {
				this.pauseCounter = 0;
			}
		}
	}

	public watch(x, y): void {
		this.mapMgr.watch(x, y);
	}

	public isShake_: number = 1;
	public shake() {
		if (this.isShake_ == 1) {
			this.isShake_ = 2;

			egret.Tween.get(this.view).to({ x: this.view.x + 4, y: this.view.y + 4 }, 300, MapScene.SHAKEEASE).call(this.onShakeEnd);
		}
	}

	public onShakeEnd() {
		var self = GameGlobal.mapscene;
		self.isShake_ = 1;
		self.view.x -= 4;
		self.view.y -= 4;
	}

	public static SHAKEEASE(value: number): number {
		var ret;
		var a = value * 2 % 1.0;
		ret = Math.sin(a * Math.PI * 2);
		return ret;
	}

	public scaleOut(): void {
		var self = GameGlobal.mapscene;
		var p = self.view;
	}

	public units = {};
	public list = [];
	public addUnit(u: ISceneObject) {
		if (!this.units[u.id]) {
			this.units[u.id] = u;
			this.list.push(u);
			u.scene = this;
			u.onAdd();
		}
	}

	public removes(filter: Function, arg) {
		for (var i = 0, len = this.list.length; i < len; i++) {
			var u: ISceneObject = this.list[i] as ISceneObject;
			if (u && filter(u, arg)) {
				this.removeUnit(u);
			}
		}
	}

	public removeUnit(u: ISceneObject) {
		if (u) {
			delete this.units[u.id];
			this.list[this.list.indexOf(u)] = null;
			u.onRemove();
		}
	}

	public getUnit(id): any {
		var ret = this.units[id];
		return ret;
	}

	public ctx: any = {};
	public timeinv = 0;

	public frameInterv = 0;//顿帧时间 0-33都相当于默认帧频 越大越卡
	public intervTime = 0;
	public update(dt): void {
		var self = this;

		self.intervTime += dt;
		if (self.intervTime < self.frameInterv) {
			return;
		}

		self.intervTime = 0;

		self.dt = dt;
		var ctx = self.ctx;
		ctx.dt = dt;

		if (self.pauseCounter) {
			return;
		}

		var len = self.list.length;
		var cleanflag;
		for (var i = 0; i < len;) {
			var term: ISceneObject = self.list[i];
			if (!term) {
				i++;
				cleanflag = 1;
				continue;
			}
			ctx.d = null;
			term.update(ctx);
			if (ctx.d) {
				delete self.units[term.id];
				self.list[i] = null;
				term.onRemove();
				len--;
			} else {
				i++;
			}
		}

		if (cleanflag) {
			ArrayUitl.cleannull(self.list);
		}

		if (self.sceneCtrl) {
			self.sceneCtrl.update(ctx);
		}

		self.timeinv += dt;
		if (self.timeinv >= 300) {
			self.unitLayer.sortChild();
			self.timeinv = 0;
		}
	}

	public removeAll() {
		var units = this.units;
		for (var k in units) {
			var u: ISceneObject = units[k];
			u.onRemove();
			delete units[k];
		}
		this.list.length = 0;
		this.mapMgr.clean();
	}

	public watchMainRole(offx: number = 0) {
		var mgr = this.mapMgr;
		if (mgr.isLoading == true) return;
		
		var hero: SceneCharRole = GameGlobal.mapscene.hero;
		if (hero == null) return;

		mgr.watch(hero.x, hero.y);
	}

	protected rec: eui.Rect;
	/**场景是否灰化 */
	public isGrey(bo: boolean): void {
		if (bo) {
			if (!this.rec) {
				this.rec = new eui.Rect(480, 800, 0x000000);
				this.rec.alpha = .5;
			}
			if (!this.rec.parent) {
				GameGlobal.layerMgr.UI_MainBottom.addChildAt(this.rec, 0);
			}
		} else {
			if (this.rec && this.rec.parent) {
				this.rec.parent.removeChild(this.rec);
				this.rec.graphics.clear();
			}
			this.rec = null;
		}
	}

	public scale: number = 1;
	public scaleScene(x: number = 0.8, y: number = 0.8): void {
		this.scale = x;
		this.view.scaleX = x;
		this.view.scaleY = y;
	}

	/**是否是玩家单位 */
	public static ISNOTHEROMEMBER(u: ISceneObject, arg): boolean {
		if (u.forceType == 1) {
			return false;
		} else {
			return true;
		}
	}
}