class GameGlobal {
	/**是否进入了游戏 */
	public static isEnterGame: boolean = false;

	public static modelPlayer:Model_player
	public constructor() {
	}

	public static initData(): void {
		//角色激活检测

	}

	public static init(mainSp) {
		EffectMgr.instance = new EffectMgr();

		GameGlobal.layerMgr.init(mainSp);

		GameGlobal.uiMgr.registerUI();

		GameGlobal.initModel();
	}


	public static initModel() {
		var gameGlobal = GameGlobal;
		var socketMgr = gameGlobal.socketMgr;

		gameGlobal.modelPlayer = new Model_player();
		gameGlobal.modelPlayer.listenServ(socketMgr);
		

	}

	public static loginArg: any;
	public static msgCenter: MsgCenter = new MsgCenter(); //系统流程专用
	public static control: MsgCenter = new MsgCenter(); //
	public static imgLoaderMgr = new LoaderManager();
	public static resMgr = new RESManager();
	public static mapscene: MapScene;
	public static layerMgr: LayerManager = new LayerManager();
	public static uiMgr: UIManager = new UIManager();
	public static main;
	public static isInBattle: boolean = false; //战斗状态
	public static isInCollect: boolean = false; //采集状态

	public static socketMgr: WebSocketMgr = new WebSocketMgr();
}