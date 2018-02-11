class PlayerStopPlug {
	public tag: string = "PlayerStopPlug";
	public tar: SceneCharRole;

	public onAdd() {
	}

	public onRemove() {
	}

	public update(ctx) {
	}

	public onEvent(evt: number, arg: any) {
		if (evt == SceneCharRole.UEVENT_REACH) {
		}
	}
}