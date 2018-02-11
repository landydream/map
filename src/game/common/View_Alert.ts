class View_Alert extends BaseEUIView {

	public static OK = 1;
	public static CANCEL = 2;
	public static OKANDCANCEL = 3;

	public constructor() {
		super();
		this.skinName = "resource/gameSkin/common/SkinAlert.exml";
	}

	public rect: eui.Rect;
	public uiBack: UIAlert;
	public lb: eui.Label;
	public btnSure: BMButton;
	public btnCancel: BMButton;
	public checkBox: eui.CheckBox;
	public gpCheckBox: eui.Group;

	public onOK: Function;
	public onCancel: Function;
	public onCloseFun: Function;
	public thisObj: any;
	public arg: any;

	protected childrenCreated(): void {
		super.childrenCreated();

		this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKT, this);
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelT, this);
		this.gpCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCheckBoxHandler, this);
	}


	protected onCheckBoxHandler(e: egret.TouchEvent): void {
		this.checkBox.selected = !this.checkBox.selected;
		View_Alert.dicCheckBox[this.arg.checkBoxKey] = this.checkBox.selected == true ? 1 : 0;
	}

	public onOKT(e: egret.TouchEvent) {
		var continueOpen;
		if (this.onOK) {
			continueOpen = this.onOK.call(this.thisObj, e);
		}
		if (!continueOpen) {
			this.closeHandler();
		}
	}

	public onCancelT(e: egret.TouchEvent) {
		var continueOpen;
		if (this.onCancel) {
			continueOpen = this.onCancel.call(this.thisObj, e);
		}
		if (!continueOpen) {
			this.closeHandler();
		}
	}

	public show(arg) {
		this.arg = arg;
		if(arg.option == View_Alert.OK){
			this.currentState = "sure";
		}else if(arg.option == View_Alert.CANCEL){
			this.currentState = "cancel";
		}else if(arg.option == View_Alert.OKANDCANCEL){
			this.currentState = "all";
		}	
		this.thisObj = arg.thisObj;
		this.onOK = arg.onOK;
		this.onCancel = arg.onCancel;
		this.onCloseFun = arg.onClose;
		if (arg.title) {
			this.uiBack.text = arg.title;
		} else {
			this.uiBack.text = "提  示";
		}
		if (arg.oktext) {
			this.btnSure.text = arg.oktext;
		} else {
			this.btnSure.text = "确认";
		}
		if (arg.canceltext) {
			this.btnCancel.text = arg.canceltext;
		} else {
			this.btnCancel.text = "取消";
		}

		if (HtmlUtil.isHtml(arg.text)) {
			this.lb.textFlow = HtmlUtil.HTMLPARSER.parser(arg.text);
		} else {
			this.lb.text = arg.text;
		}
		this.gpCheckBox.visible = arg.onCheckBox;
		if (arg.onCheckBox == true) {
			this.checkBox.selected = false;
			View_Alert.dicCheckBox[arg.checkBoxKey] = 0;
		}


	}

	public timeChange() {
		if (this.arg.time > 0) {
			let time = this.arg.time - Model_GlobalMsg.getServerTime();
			time = Math.ceil(time / 1000);
			if (time <= 0) {
				this.closeHandler();
				return;
			}
			if (this.arg.timeType == 1) {
				this.btnSure.text = this.arg.oktext + "(" + time + ")";
			} else {
				this.btnCancel.text = this.arg.canceltext + "(" + time + ")";
			}
		}
	}

	public onOpen(arg): void {
		super.onOpen(arg);

		this.addCloseListen(this.rect);
		this.addCloseListen(this.uiBack.btnClose);

		this.show(arg);
		if (arg && arg.time) {
			this.timeChange();
			Timer.instance.listen(this.timeChange, this, 1000, egret.getTimer())
		}
	}

	public onClose() {
		super.onClose();

		this.removeCloseListen(this.rect);
		this.removeCloseListen(this.uiBack.btnClose);

		if (this.onCloseFun) {
			this.onCloseFun.call(this.thisObj);
		}

		Timer.instance.listen(this.timeChange, this)
	}

	public static dicCheckBox: any = {};

	/**
	 * 显示弹框
	 * @param text:提示内容
	 * @param onOK:确认按钮回调方法
	 * @param option:显示按钮的类型
	 * @param thisObj:回调的对象
	 * @param title:弹框标题
	 * @param oktext:确认按钮文本
	 * @param canceltext:取消按钮文本
	 * @param cancel:取消按钮回调
	 * @param close:关闭弹框的回调
	 * @param onCheckBox:是否显示checkbox
	 * @param checkBoxKey:用作记录checkbox状态的key
	 */
	public static show(text: string, onOK: Function = null, option = 1 | 2, thisObj = null, title = null, oktext = null, canceltext = null,
		cancel: Function = null, close: Function = null, onCheckBox = false, checkBoxKey: string = "", time: number = -1, timeType: number = 1) {
		if (onCheckBox == true && View_Alert.dicCheckBox[checkBoxKey] != null && View_Alert.dicCheckBox[checkBoxKey] == 1) {
			onOK.call(thisObj);
		} else {
			var arg = {
				text: text, title: title, onOK: onOK, option: option, thisObj: thisObj, onCancel: cancel, oktext: oktext, canceltext: canceltext,
				onClose: close, onCheckBox: onCheckBox, checkBoxKey: checkBoxKey, time: time, timeType: timeType
			};
			GameGlobal.layerMgr.open(UIConst.ALERT, arg);
		}
	}
}