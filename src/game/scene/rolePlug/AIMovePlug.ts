class AIMovePlug {
	public tag: string = "AIMovePlug";

	public constructor() {
	}

	public tar: SceneCharRole;
	public index: number = 0;

	public onAdd() {
		this.remain = 6000 * Math.random();
		this.setBron();
		//this.startMove();
		GameGlobal.control.listen(MapScene.MSG_MAPCFG_COMPLECT, this.onMapCfgLoadComp, this);
	}

	public onRemove() {
		GameGlobal.control.remove(MapScene.MSG_MAPCFG_COMPLECT, this.onMapCfgLoadComp, this);
	}

	public onMapCfgLoadComp(): void {
		this.setBron();
		if(Math.random() > 0.5) {
			this.startMove();
		}else {
			this.remain = 6000 * Math.random();
		}
	}

	public setBron(): void {
		var p: egret.Point = this.getNextPoint();
		if (p) {
			this.tar.x = p.x;
			this.tar.y = p.y;
		}
	}

	public remain: number = 0;
	public update(ctx) {
		var self = this;
		self.remain -= ctx.dt;

		if (self.remain < 0 && self.tar.action == Action.IDLE) {
			self.remain = 5000 * Math.random() + 1000;
			this.startMove();
		}
	}

	public tarP:egret.Point = new egret.Point();
	public getNextPoint(): egret.Point {
		var mapMgr = GameGlobal.mapscene.mapMgr;
		var paths = mapMgr.paths;
		if (paths.length == 0) return null;
		this.index = Math.round(Math.random() * paths.length);
		if (this.index >= paths.length) this.index = 0;
		var p: egret.Point = paths[this.index];
		//this.tarP.x = p.x + Math.random() * -80 + Math.random() * 100;
		//this.tarP.y = p.y + Math.random() * -80 + Math.random() * 100;
		this.tarP.x = p.x;
		this.tarP.y = p.y;
		return this.tarP;
	}

	public startMove(): void {
		var mapMgr = GameGlobal.mapscene.mapMgr;
		var p: egret.Point = this.getNextPoint();
		if (p != null) {
			//var suc: boolean = mapMgr.searchPath(this.tar.x, this.tar.y, p.x, p.y);
			//var path = mapMgr.getLastPath();
			var path = [p.y, p.x];
			if(path) this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, path);
		}
	}


	public onEvent(evt: number, arg: any) {
	}
}