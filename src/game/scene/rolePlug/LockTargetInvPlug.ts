class LockTargetInvPlug {
	public tag: string = "LockTargetInvPlug";

	public constructor() {
	}

	public role: SceneCharRole;
	public tar: SceneCharRole;
	public takeCare: boolean = false;
	public onAdd() {
		this.takeCare = true;

		let sceneType = GameGlobal.mapscene.scenetype;
		let path;
		if (sceneType == SceneCtrl.TOURNAMENT || sceneType == SceneCtrl.KFBOSS) {
			path = [this.tar.y, this.tar.x];
		} else {
			var map: MapManager = this.tar.scene.mapMgr;
			var suc: boolean = map.searchPath(this.role.x, this.role.y, this.tar.x, this.tar.y);
			if (suc == false) return;

			path = map.getLastPath();
		}
		if (path && path.length > 0) {
			this.role.onEvent(SceneCharRole.UEVENT_ACCPATH, path);
		}
	}

	public onRemove() {
	}

	public update(ctx) {
		var self = this;

		if (self.tar == null) return;

		//已到达交互范围
		if (self.tar.checkIntRange(self.role.x, self.role.y)) {
			ctx.d = 1;
			self.tar.onEvent(SceneCharRole.UEVENT_ON_TOUCH, 0);
			self.role.onEvent(SceneCharRole.UEVENT_STOPMOVE, 0);
		}

		if (self.takeCare == false) {
			ctx.d = 1;
			return;
		}
	}

	public onEvent(evt: number, arg: any) {
		if (evt == SceneCharRole.UEVENT_USERCLICKMAP) {
			this.takeCare = false; //被中断
		}
	}
}