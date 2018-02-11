/**此界面是1级界面，并打开关闭会发事件 */
class EUIPanel extends BaseEUIView {
	public constructor() {
		super();
		this.ptype = 1;
	}
	onOpen(arg) {
		var mgr = GameGlobal.layerMgr;
		mgr.closeType(1, this.pid);
		mgr.UI_MainBottom.visible = false;
		mgr.Battle_Layer.visible = false;
		GameGlobal.mapscene.view.visible = false;
		super.onOpen(arg);
		// if (this.pid) {
		// 	GameGlobal.control.notify(Enum_MsgType.MSG_OPEN_UIPANEL, this.pid);
		// }
	}

	onClose() {
		var mgr = GameGlobal.layerMgr;
		mgr.UI_MainBottom.visible = true;
		mgr.Battle_Layer.visible = true;
		GameGlobal.mapscene.view.visible = true;
		super.onClose();
		// if (this.pid) {
		// 	GameGlobal.control.notify(Enum_MsgType.MSG_CLOSE_UIPANEL, this.pid);
		// }
	}
}