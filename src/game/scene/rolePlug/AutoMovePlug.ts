class AutoMovePlug {
	public tag:string = "AutoMovePlug";

	public constructor() {
	}

	public tar: SceneCharRole;
	public index: number = 0;
	
	public onAdd() {
	}

	public onRemove() {
	}

	public update(ctx) {
		console.log(ctx);
	}

	public onEvent(evt: number, arg: any) {
		if (evt == SceneCharRole.UEVENT_REACH) {
			var mapMgr = GameGlobal.mapscene.mapMgr;
			var paths = mapMgr.paths;
			if(paths.length == 0) return;
			
			this.index++;
			if (this.index >= paths.length) this.index = 0;
			var p: egret.Point = paths[this.index];

			var suc: boolean = mapMgr.searchPath(this.tar.x, this.tar.y, p.x, p.y);
			var path = mapMgr.getLastPath();
			this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, path);
		}
	}
}