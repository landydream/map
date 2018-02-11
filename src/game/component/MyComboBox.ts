class MyComboBox extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		//this.skinName = "resource/gameSkin/component/MyComboBox.exml";
	}

	protected callBack: Function;
	protected thisObj;
	protected clickCall: Function;
	/**回调函数的参数是source的元素 */
	public initData(callBack: Function, thisObj: any, isSelect: boolean, clickCall?:Function) {
		this.callBack = callBack;
		this.thisObj = thisObj;
		this.clickCall = clickCall;
		this.isSelect(isSelect);
	}

	public btn: BMButton;
	public lb: eui.Label;
	public gp: eui.Group;
	public canvas: eui.Scroller;
	public list: eui.List;
	public dataAc: eui.ArrayCollection;

	protected childrenCreated(): void {
		super.childrenCreated();

		this.dataAc = new eui.ArrayCollection();
		this.list.dataProvider = this.dataAc;
		this.list.itemRenderer = comboBoxItem;
		this.list.width = this.width - 12;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	protected onTouch(e: egret.TouchEvent) {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.openOrClose(true);
		if(this.clickCall) {
			this.clickCall.call(this.thisObj);
		}
		// if (this.isOpen) {
		// }
	}

	protected onSelect() {
		var info = this.list.selectedItem;
		if (!info) {
			return;
		}
		this.lb.text = info[0];
		if (this.callBack) {
			this.callBack.call(this.thisObj, info);
		}
	}

	public isOpen: boolean;
	public openOrClose(bo: boolean) {
		if (this.isOpen == bo) {
			return;
		}
		if (bo) {
			if (this.dataAc.source.length <= 0) {
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
				return;
			}
			this.currentState = "down";
			var self = this;
			egret.callLater(function(){
				App.stage.once(egret.TouchEvent.TOUCH_TAP, function () {
					self.openOrClose(false);
				}, self);
			}, this);
			// setTimeout(function () {
			// 	App.stage.once(egret.TouchEvent.TOUCH_TAP, function () {
			// 		self.openOrClose(false);
			// 	}, self)
			// }, 100);
		} else {
			this.currentState = "up";
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		}
		this.isOpen = bo;
	}

	/**[[显示text, 保存的数据, 颜色]] */
	public set source(arg: any[]) {
		if(!this.lb) {
			return;
		}
		UITools.replaceAll(this.canvas, this.dataAc, arg);
		// this.dataAc.source = arg;
		// this.dataAc.refresh();
		var len = arg.length;
		if (len > 0) {
			this.list.selectedIndex = 0;
			this.lb.text = arg[0][0];
			var h = Math.min(200, len * 44 + 12);
			this.gp.height = h;
		} else {
			this.lb.text = "";
		}
	}

	public getSource() {
		return this.dataAc.source;
	}

	public get selectedItem() {
		if(this.list) {
			return this.list.selectedItem;
		}
	}

	public set selectedIndex(v: number) {
		if(this.list) {
			this.list.selectedIndex = v;
		}
		if (v < 0) {
			this.setText("");
		}else{
			this.onSelect();
		}
	}

	public setText(text: string, color = null) {
		this.lb.text = text;
		if (color != null) {
			this.lb.textColor = color;
		}
	}

	protected _isSelect: boolean
	public isSelect(bo: boolean) {
		if (this._isSelect == bo) {
			return;
		}
		this._isSelect = bo;
		if(!this.list) {
			return;
		}
		if (bo) {
			this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelect, this);
		} else {
			this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSelect, this);
		}
	}

}

class comboBoxItem extends eui.ItemRenderer {
	public constructor() {
		super();
		this.skinName = "resource/gameSkin/component/SkinComboBoxItem.exml";
	}

	protected childrenCreated() {
		super.childrenCreated();
		this.width = this.parent["layoutBoundsWidth"];
	}
	public lb: eui.Label;
	protected dataChanged() {
		var info = this.data;
		if (!info) {
			return;
		}
		this.lb.text = info[0];
		if (info[2] != null) {
			this.lb.textColor = info[2];
		}
		// var w = this.$parent.width;
		// if(w) {
		// 	this.width = w;
		// }
	}
}