class LayerManager {

	public GameMain: egret.Sprite;

	public Battle_Layer: egret.DisplayObjectContainer;
	/**最低层ui面板 */
	public UI_floorUI: egret.DisplayObjectContainer;
	/**低于主UI面板的场景UI层 */
	public UI_MainBottom: egret.DisplayObjectContainer;
	public UI_Main: egret.DisplayObjectContainer;
	public UI_Popup: egret.DisplayObjectContainer;

	public UI_Tips: egret.DisplayObjectContainer;
	public UI_Message: egret.DisplayObjectContainer;

	public _registerMap: any = {};
	public _views: any = {};
	public _opens = [];//保存没有类型的界面
	public _openType = [];//保存有类型的界面

	public constructor() {
	}

	public init(p: egret.Sprite) {
		var self = this;
		self.GameMain = p;

		self.Battle_Layer = new egret.DisplayObjectContainer();
		self.UI_floorUI = new egret.DisplayObjectContainer();
		self.UI_MainBottom = new egret.DisplayObjectContainer();
		self.UI_Main = new egret.DisplayObjectContainer();
		self.UI_Popup = new egret.DisplayObjectContainer();
		self.UI_Tips = new egret.DisplayObjectContainer();
		self.UI_Message = new egret.DisplayObjectContainer();

		p.addChild(self.Battle_Layer);
		self.Battle_Layer.touchEnabled = false;
		self.Battle_Layer.touchChildren = false;

		p.addChild(self.UI_floorUI);
		p.addChild(self.UI_MainBottom);
		p.addChild(self.UI_Main);
		p.addChild(self.UI_Popup);
		p.addChild(self.UI_Tips);

		p.addChild(self.UI_Message);
		self.UI_Message.touchEnabled = false;
		self.UI_Message.touchChildren = false;
	}
	/**注册界面 */
	public register(id: number, uiclz, arg = null, layer: egret.DisplayObjectContainer = null) {
		if (!layer) {
			layer = this.UI_Main;
		}
		if (this._registerMap[id]) {
			console.log("UI" + id + "重复注册");
			return;
		}
		this._registerMap[id] = [uiclz, arg, layer];
	}
	/**是否已注册了该界面 */
	public isRegiser(id: number) {
		var self = this;
		if (self._registerMap[id]) {
			return true;
		}
		return false;
	}

	/**打开界面*/
	public open(id, arg: any = null) {
		var ui: IUIView = this._views[id];
		if (!ui) {
			var r = this._registerMap[id];
			if (!r) {
				//ViewCommonWarn.text("error open id:" + id);
				return;
			}
			ui = new r[0]();
			ui.uiparent = r[2];
			ui.pid = id;
			this._views[id] = ui;
		}

		// this.closeType(ui.ptype, ui.pid);
		var bo = this.isOpenView(ui.pid);
		if (!bo) {
			if (ui.ptype) {
				this._openType.push(ui);
			} else {
				this._opens.push(ui);
			}
			ui.uiparent.addChild(ui as any);
		} else {
			ui.uiparent.setChildIndex(ui as any, ui.uiparent.numChildren - 1);
		}
		ui.onOpen(arg);
		if (this._openType.length > 2) {//有类型的只能打开两个
			ui = this._openType[0];
			this.close(ui.pid);
		}
	}

	// /**先判断系统是否开启 */
	// public open2(id, arg: any = null) {
	// 	let bo = SystemHelp.isOpen(id, true, arg);
	// 	if (!bo) {
	// 		return bo;
	// 	} else {
	// 		this.open(id, arg);
	// 	}
	// 	return true;
	// }


	public close(id) {
		var ui: IUIView = this._views[id];
		if (ui) {
			if (ui.ptype) {
				var index = this._openType.indexOf(ui)
				if (index != -1) {
					this._openType.splice(index, 1);
				}
			} else {
				var index = this._opens.indexOf(ui)
				if (index != -1) {
					this._opens.splice(index, 1);
				}
			}
			if (ui.parent) {
				ui.parent.removeChild((ui as any));
				ui.onClose();
			}
		}
	}

	/**界面是否打开中 */
	public isOpenView(id): boolean {
		var bo: boolean = false;
		var ui: IUIView = this.getView(id);
		if (ui) {
			if (ui.ptype) {
				return this._openType.indexOf(ui) >= 0;
			} else {
				if (this._opens.indexOf(ui) >= 0) {
					bo = true;
				}
			}
		}
		return bo;
	}

	public getView(id) {
		return this._views[id];
	}

	/**关闭所有UI */
	public closeAll() {
		for (var i = this._openType.length - 1; i >= 0; i--) {
			var ui: IUIView = this._openType[i];
			this.close(ui.pid);
		}
		for (i = this._opens.length - 1; i >= 0; i--) {
			var ui: IUIView = this._opens[i];
			this.close(ui.pid);
		}
	}

	/**关闭某个类型以上的界面 debarId排除此界面不关闭 */
	public closeType(type: number, debarId?: any) {
		if (type) {
			for (var i = this._openType.length - 1; i >= 0; i--) {
				var ui: IUIView = this._openType[i];
				if (ui.ptype >= type && ui.pid != debarId) {
					this.close(ui.pid);
				}
			}
		}
	}

	/**是否显示了某类型界面 */
	public isOpenType(type: number) {
		if (type) {
			for (var i = 0, len = this._openType.length; i < len; i++) {
				var ui: IUIView = this._openType[i];
				if (ui.ptype == type) {
					return true;
				}
			}
		} else if (this._opens.length > 0) {
			return true;
		}
		return false;
	}

	/**设置界面visible */
	public setVis(id: number, bo: boolean) {
		var ui = this.getView(id);
		if (ui) {
			ui.visible = bo;
		}
	}

	public getVis(id) {
		var ui = this.getView(id);
		if (ui) {
			return ui.visible;
		}
		return false;
	}

	public unregister(id) {
		if (this._registerMap[id]) {
			delete this._registerMap[id];
		}
	}

}