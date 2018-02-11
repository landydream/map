class UserInputNoPathPlug {
	public tag: string = "UserInputNoPathPlug";
	public tar: SceneCharRole;

	public onAdd() {
		this.tar.scene.mapMgr.tileLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onToucBegin, this);
	}

	public onRemove() {
		this.tar.scene.mapMgr.tileLayer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onToucBegin, this);
	}

	public update(ctx) {
	}

	protected onToucBegin(e: egret.TouchEvent) {
		var tar = this.tar;
		var mapscene = tar.scene;
		if (mapscene.mapMgr.isLoading == true || GameGlobal.isInBattle == true) {
			return;
		}
		var distx = e.localX;
		var disty = e.localY;

		let arr = [distx, disty];

		this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, [arr[1], arr[0]]);
		this.tar.onEvent(SceneCharRole.UEVENT_USERCLICKMAP, null);
	}

	public onEvent(evt: number, arg: any) {
	}
}