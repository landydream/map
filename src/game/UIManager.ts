class UIManager {

	public constructor() {
	}

	/**注册界面 */
	public registerUI() {
		var layermgr: LayerManager = GameGlobal.layerMgr;

		layermgr.register(UIConst.ALERT, View_Alert, null, layermgr.UI_Popup);
	}

	public initMenuUI(): void {
		var layermgr: LayerManager = GameGlobal.layerMgr;

	}
}