class BaseEUIView extends eui.Component implements IUIView {
	public constructor() {
		super();
	}

	public uiparent: egret.DisplayObjectContainer;
	public pid;
	/**1:可以在主界面打开的、2:二级打开例如在主城打开的界面、以此类推。不赋值时不管理,嵌套在总界面中的不赋值。
	 * 打开界面会关闭等于或大于此值的界面，例如：=1时打开后会关闭1,2...界面*/
	public ptype:number;
	public isInit: boolean = false;

	public bgSprite: egret.Sprite;

	protected childrenCreated(): void {
		this.isInit = true;
	}

	public onOpen(arg) {
	}

	public onClose() {
	}

	public initUI() {

	}

	public destoryView() {

	}

	public destory() {

	}

	public openCheck(): boolean {
		return false;
	}

	public addCloseListen(obj: egret.DisplayObject) {
		obj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
	}

	public removeCloseListen(obj: egret.DisplayObject) {
		obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
	}

	protected closeHandler() {
		GameGlobal.layerMgr.close(this.pid);
	}

	public drawBG(w = -1, h = -1, x = 0, y = 0, a = 1) {
		if (w == -1) {
			w = App.stage.stageWidth;
			h = App.stage.stageHeight;
		}
		if (this.bgSprite == null) {
			this.bgSprite = new egret.Sprite();
			this.addChildAt(this.bgSprite, 0);
		}
		this.bgSprite.graphics.beginFill(0, a);
		this.bgSprite.graphics.drawRect(x, y, w, h);
		this.bgSprite.graphics.endFill();
		this.addCloseListen(this.bgSprite);
	}

	public setTouched(v: boolean) {
		this.touchEnabled = this.touchChildren = v;
	}
}