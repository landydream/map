class AIMoveNoPathPlug {
	public constructor() {
	}
	public tag: string = "AIMoveNoPathPlug";
	public tar: SceneCharRole;
	public onAdd() {
	}

	public onRemove() {
	}

	public update(ctx) {
	}
	public move(x, y) {
		this.tar.onEvent(SceneCharRole.UEVENT_ACCPATH, [y, x]);
	}

	public onEvent(evt: number, arg: any) {
	}
}