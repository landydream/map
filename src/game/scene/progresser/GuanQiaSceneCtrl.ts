class GuanQiaSceneCtrl {
	public constructor() {
	}

	protected static _ins: GuanQiaSceneCtrl;
	public static get instance(): GuanQiaSceneCtrl {
		if (!GuanQiaSceneCtrl._ins) {
			GuanQiaSceneCtrl._ins = new GuanQiaSceneCtrl();
		}
		return GuanQiaSceneCtrl._ins;
	}


	public scene: MapScene;
	public time6000 = 0;
	public timeInv = 6000; //打怪间隔时间
	public update(ctx) {
		var self = this;
		self.aiUpdate(ctx);

		if (self.scene) {
			self.scene.watchMainRole();
		}

		self.time6000 += ctx.dt;
		if (self.time6000 >= self.timeInv) {
			self.time6000 = 0;
		}
	}

	public plus = [];
	public hero: SceneCharRole;
	public onEnter(scene: MapScene) {
		this.scene = scene;
		this.time6000 = 0;

		// var hero = this.hero = Model_player.voMine.sceneChars[0];
		// var autoM: AutoMovePlug = new AutoMovePlug();
		// autoM.tar = hero;
		// hero.addPlugOnly(autoM);

		// var input: UserInputPlug = new UserInputPlug();
		// input.tar = hero;
		// hero.addPlugOnly(input);

		// var pathAccording: GameObjectPathAccording = new GameObjectPathAccording();
		// pathAccording.tar = hero;
		// hero.addPlugOnly(pathAccording);

		// GameGlobal.modelPlayer.CG_Hero_askSceneHeros_131();

		GameGlobal.layerMgr.open(UIConst.GUANQIA_ENTRY);

		GameGlobal.layerMgr.setVis(UIConst.YUGAO, true);
		// GameGlobal.layerMgr.open(UIConst.LEFT_UI);
		GameGlobal.layerMgr.setVis(UIConst.LEFT_UI, true);
		GameGlobal.layerMgr.setVis(UIConst.RIGHT_UI, true);

		GameGlobal.control.listen(MapScene.MSG_MAPCFG_COMPLECT, this.onMapComplete, this);
		GameGlobal.control.listen(Enum_MsgType.MSG_PLAYER_LIST, this.onPList, this);
		GameGlobal.control.listen(Enum_MsgType.ON_BATTLE_ENTER, this.onBattleEnter, this);
	}


	public onMapComplete(): void {
		// this.hero.onEvent(SceneCharRole.UEVENT_REACH, 0);
	}

	protected monsterList = [];
	public onMList(list): void {
		if (GameGlobal.mapscene.mapMgr.isLoading) return;
		var self = this;
		var len = list.length;
		if (len > 4) {
			len = 4;
		}
	}

	public createNPC(data): any {
		var mapScene: MapScene = GameGlobal.mapscene;
		var npc: SceneCharRole = SceneCharRole.create();
		npc.scene = mapScene;
		npc.charType = UnitConst.MONSTER;

		npc.id = data.id;
		var sid = data.sid;
		npc.setBody(data.body);

		var touchPlug: NPCTouchPlug = new NPCTouchPlug();
		touchPlug.role = npc;
		npc.addPlug(touchPlug);
		return npc;
	}

	public onExit(scene: MapScene) {
		this.scene.ctx = {};
		var hero: SceneCharRole = Model_player.voMine.sceneChars[0];
		hero.setAciton(0);

		hero.removPlugByTag("AutoMovePlug");
		hero.removPlugByTag("UserInputPlug");
		hero.removPlugByTag("GameObjectPathAccording");

		GameGlobal.mapscene.removes(MapScene.ISNOTHEROMEMBER, 1);
		this.monsterList = [];

		GameGlobal.layerMgr.close(UIConst.GUANQIA_ENTRY);
		// GameGlobal.layerMgr.close(UIConst.LEFT_UI);
		GameGlobal.layerMgr.setVis(UIConst.LEFT_UI, false);
		GameGlobal.layerMgr.setVis(UIConst.RIGHT_UI, false);
		GameGlobal.layerMgr.setVis(UIConst.YUGAO, false);
		GameGlobal.control.remove(MapScene.MSG_MAPCFG_COMPLECT, this.onMapComplete, this);
		GameGlobal.control.remove(Enum_MsgType.MSG_PLAYER_LIST, this.onPList, this);
		GameGlobal.control.remove(Enum_MsgType.ON_BATTLE_ENTER, this.onBattleEnter, this);
	}

	protected onBattleEnter(): void {
		this.time6000 = 0;
	}

	protected onBattleExit(): void {
	}



	public playerCharList = [];
	protected onPList(list: any[]) {
		var len = list.length;
		if (len > 4) {
			len = 4;
		}

		this.playerCharList = [];
		for (var i = 0; i < len; i++) {
			var vo: Vo_Player = list[i];
			if (this.scene.getUnit(vo.id)) {
				this.playerCharList.push(this.scene.getUnit(vo.id));
				continue;
			}

			var p: SceneCharRole = SceneCharRole.create();
			p.charType = UnitConst.PLAYER;
			p.vo = vo;
			GameGlobal.modelPlayer.updateRoleInfoByVo(p, vo);

			var plug: AIMovePlug = new AIMovePlug();
			plug.tar = p;
			p.addPlug(plug);
			var plug2: GameObjectPathAccording = new GameObjectPathAccording();
			plug2.tar = p;
			p.addPlug(plug2);

			GameGlobal.mapscene.addUnit(p);
			this.playerCharList.push(p);
		}

		this.setOterPlayerVis(true);
	}

	public setOterPlayerVis(v): void {
		var len = this.playerCharList.length;
		for (var i: number = 0; i < len; i++) {
			var p: SceneCharRole = this.playerCharList[i];
			if (p.vo) {
				for (var k: number = 0; k < 3; k++) {
					if (p.vo.sceneChars[k]) {
						var fol: SceneCharRole = p.vo.sceneChars[k];
						fol.setCharVis(v);
					}
				}
			}
			p.setCharVis(v);
		}
	}



	public aiUpdate(ctx) {
	}
}