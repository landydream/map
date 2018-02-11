class NPCTouchPlug {
	public tag = "NPCTouchPlug";

	/**自动移除 */public autoRemove = 1;

	public role: SceneCharRole;
	public lt: number;

	public arg;

	public update(ctx) {
	}

	public onAdd() {
		this.role.view.touchEnabled = true;
		this.role.view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.roleTouch, this);
	}

	public onRemove() {
		this.role.view.touchEnabled = false;
		this.role.view.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.roleTouch, this);
	}

	public onEvent(evt, arg) {
		var type = this.role.charType;
		// if (type == UnitConst.TOUR_PLAYER || type == UnitConst.TOUR_NPC || type == UnitConst.KFBOSS_BOSS
		// 	|| type == UnitConst.KFBOSS_PLAYER || type == UnitConst.KFBOSS_NPC) {
		// 	return;
		// }
		if (evt == SceneCharRole.UEVENT_ON_TOUCH) {
			this.onRoleTouch();
		}
	}

	public onRoleTouch(): void {
		var type = this.role.charType;
		if (type == UnitConst.MONSTER) {
			//GameGlobal.modelBattle.askForNextWave();
		} else if (type == UnitConst.COLLOCTNPC) {
			GameGlobal.layerMgr.open(UIConst.GANG_COLLECT);
		}
	}

	protected roleTouch(e: egret.TouchEvent) {
		e.stopPropagation();

		var hero = Model_player.voMine.sceneChars[0];
		let type = this.role.charType;
		if (hero) {
			if (type == UnitConst.MONSTER_GUI) {
				var id: string = this.role.id;
				var mid = id.split("_")[1];
				GameGlobal.layerMgr.open(UIConst.DAILY_ZHONGKUI_BOSS, mid);
				return;
			}

			if (this.role.checkIntRange(hero.x, hero.y)) {
				this.onRoleTouch();
			} else {
				hero.lockTargetInt(this.role);
			}
		}
	}
}