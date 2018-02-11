class MyCheckBox extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public iconDisplay: eui.Image;
	public labelDisplay: eui.Label;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.touchChildren = false;

		if (this._text) {
			this.text = this._text;
		}
		if (this._size) {
			this.size = this._size;
		}
		if(this._color) {
			this.textColor = this._color;
		}
		if(this._bold) {
			this.bold = this._bold;
		}

		this.updateStyle();

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
	}

	protected onTouchHandler(): void {
		this.selected = !this.selected;
		if(this.callBack) {
			this.callBack.call(this.thisObj, this);
		}
	}

	protected callBack:Function;
	protected thisObj;
	/**回调函数的参数是当前MyCheckBox */
	public addCallBack(callBack:Function, thisObj?: any): void {
		this.callBack = callBack;
		this.thisObj = thisObj;
	}

	protected _res: string = "COMMON1_json.Bt_CheckBox2";
	set source(v: string) {
		this._res = v;
		this.updateStyle();
	}

	protected _resS: string = "COMMON1_json.Bt_CheckBox1";
	set sourceSelect(v: string) {
		this._resS = v;
		this.updateStyle();
	}

	public updateStyle(): void {
		if (this.iconDisplay) {
			var soure = this._res;
			if (this.selected) {
				this.iconDisplay.source = this._resS;
			} else {
				this.iconDisplay.source = this._res;
			}
		}
	}

	public get selected(): boolean {
		var state = this.currentState;
		return state == "selected";
	}

	public set selected(bo: boolean) {
		if (this.selected == bo) {
			return;
		}
		if (bo) {
			this.currentState = "selected";
		} else {
			this.currentState = "up";
		}
		this.updateStyle();
	}

	protected _text: string = "";
	public set text(s: string) {
		this._text = s;
		if (this.labelDisplay) {
			this.labelDisplay.text = s;
		}
	}

	public get text(): string {
		return this._text;
	}

	protected _size = 20;
	public set size(v: number) {
		this._size = v;
		if (this.labelDisplay) {
			this.labelDisplay.size = v;
		}
	}

	public get size(): number {
		return this._size;
	}

	protected _color:number = 0xFFFFFF;
	set textColor(color:number) {
		this._color = color;
		if (this.labelDisplay) {
			this.labelDisplay.textColor = color;
		}
	}

	protected _bold:boolean = false;
	set bold(bo:boolean) {
		this._bold = bo;
		if(this.labelDisplay) {
			this.labelDisplay.bold = bo;
		}
	}

	get bold():boolean {
		return this._bold;
	}
}