class TabGroup {
	public constructor() {
	}

	public tabs: any[];
	/**对应的子界面id */
	public ids: number[];
	/**红点id数组，可以是2维 */
	public notice;
	public thisObj;
	/**打开调用 */
	public callBack: Function;
	public args: any[];

	public init(thisObj: any = null, callBack: Function = null, args = [], text = []): void {
		this.thisObj = thisObj;
		this.callBack = callBack;
		this.args = args;
		for (var i = 0, len = this.tabs.length; i < len; i++) {
			this.tabs[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.tabs[i].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.ontouchOutside, this);
			if (text && text[i]) {
				this.tabs[i].text = text[i];
			}
		}
	}


	protected ontouchOutside(e: egret.TouchEvent): void {
		var tab = e.currentTarget as TBTN;
		if (tab != this.curTab) {
			tab.selected = false;
		}
	}

	public curTab;
	public onTouch(e: egret.TouchEvent): void {
		// console.log("touchTap");
		var tab = e.currentTarget;
		if (this.curTab == tab) {
			if (!this.curTab.selected) {
				this.curTab.selected = true;
			}
			return;
		}

		var index = this.tabs.indexOf(tab);
		this.selectedIndex = index;
	}

	protected _select: number = -1;
	public set selectedIndex(v: number) {
		if (this._select == v) {
			return;
		}
		var bo = true;
		if (this.ids && this.ids[v] != null) {
			bo = SystemHelp.isOpen(this.ids[v], true)//GameGlobal.layerMgr.open2(this.ids[v]);
		}
		if (bo) {
			if (this.curTab) {
				this.curTab.selected = false;
				this.curTab = null;
			}
			var old = this._select;
			if (old >= 0) {
				if (this.ids && this.ids[old] != null && (!this.ids || !this.ids[v] || (this.ids && this.ids[v] != this.ids[old]))) {
					GameGlobal.layerMgr.close(this.ids[old]);
				}
			}
			this._select = v;
			if (v >= 0 && v < this.tabs.length) {
				this.curTab = this.tabs[v];
				this.curTab.selected = true;
			}
			if (this.ids && this.ids[v] != null) {
				if (this.args && this.args[v])
					GameGlobal.layerMgr.open(this.ids[v], this.args[v]);
				else
					GameGlobal.layerMgr.open(this.ids[v]);
			}
			if (this.callBack) {
				this.callBack.call(this.thisObj, v);
			}
		} else {
			this.tabs[v].selected = false;
		}
	}

	public get selectedIndex(): number {
		return this._select;
	}

	public updateNotice() {
		var list = this.notice;
		if (!list) {
			return;
		}
		// if (typeof list == "string") {
		// }
		for (var i = 0, len = this.tabs.length; i < len; i++) {
			if (!list[i]) {
				continue;
			}
			var info = list[i];
			if (typeof info == "number") {
				this.tabs[i].setNoticVis(Model_GlobalMsg.getNotice(info));
			} else {
				var bo = false;
				for (var j = 0, len1 = info.length; j < len1; j++) {
					if (Model_GlobalMsg.getNotice(info[j])) {
						bo = true;
						break;
					}
				}
				this.tabs[i].setNoticVis(bo);
			}
		}
	}
}