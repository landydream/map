/**在主城中打开的界面，打开界面会关闭主城，手动点击关闭界面自动打开主城 */
class MC_BaseEUI extends BaseEUIView{
	public constructor() {
		super();
		this.ptype = 2;
	}
	public onOpen(arg) {
		super.onOpen(arg);
		var mgr = GameGlobal.layerMgr;
		mgr.close(UIConst.MAIN_CITY);
		mgr.UI_MainBottom.visible = false;
		mgr.Battle_Layer.visible = false;
		GameGlobal.mapscene.view.visible = false;
	}

	protected closeHandler() {
		super.closeHandler();

		GameGlobal.layerMgr.open(UIConst.MAIN_CITY);
	}

	public onClose() {
		super.onClose();

		var mgr = GameGlobal.layerMgr;
		mgr.UI_MainBottom.visible = true;
		mgr.Battle_Layer.visible = true;
		GameGlobal.mapscene.view.visible = true;
	}

}