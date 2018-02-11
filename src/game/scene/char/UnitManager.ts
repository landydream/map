class UnitManager {
	private static _instacne: UnitManager;
	public static get instance(): UnitManager {
		if (!UnitManager._instacne) {
			UnitManager._instacne = new UnitManager();
		}
		return UnitManager._instacne;
	}

	/**天仙方向的对应位置 */
	public static TianXianPos = { 1: [-50, -100], 2: [-90, -130], 3: [90, -130], 4: [50, -100] };
	public static SoulPos = {1:[-60, -130], 2:[-60, -140], 3:[0, -140], 4:[0,-130]};
	
	public static getTXPos() {
		
	}
	

	/**
	 * data: { id: "gangColloct", sid: 10001 }
	 */
	public createNPC(data): any {
		var mapScene: MapScene = GameGlobal.mapscene;
		var npc: SceneCharRole = SceneCharRole.create();
		npc.scene = mapScene;
		npc.charType = UnitConst.MONSTER;
		npc.forceType = 3;

		npc.id = data.id;
		var sid = data.sid;
		// var info = Config.NPC[sid];
		var info
		npc.setBody(info.mx);
		npc.setDir(2);

		var touchPlug: NPCTouchPlug = new NPCTouchPlug();
		touchPlug.role = npc;
		npc.addPlug(touchPlug);
		return npc;
	}

	public createPlayer(): void {

	}

	public createCharRole(type: number) {
		var role = SceneCharRole.create();
		role.charType = type;
		return role;
	}

	public createPet(body, isAdd = true) {
	}

	public createXiaLv(): void {

	}


	public delUnit(id: number): void {
		var mapScene: MapScene = GameGlobal.mapscene;
		var id = 1000;
		var npc: SceneCharRole = mapScene.getUnit(id);
		mapScene.removeUnit(npc);
	}
}