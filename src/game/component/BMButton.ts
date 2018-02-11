class BMButton extends eui.Component implements eui.UIComponent {

	public img: eui.Image;
	public lb: eui.Label;
	public image_notice: eui.Image;
	public image_double: eui.Image;

	public constructor() {
		super();
		// this.skinName = "resource/eui_skins/BMButton.exml";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();

		this.touchChildren = false;
		this.img.source = this._icon;
		this.lb.text = this._text;
		this.lb.size = this._size;
		this.lb.bold = this._bold;
		if (this._disabled) {
			this._disabled = false;
			this.disabled = true;
		}
		this.offX = this._offX;
		this.offY = this._offY;
		if (this._textColor) {
			this.lb.textColor = this._textColor;
		}

		if (this._icon == "COMMON1_json.Bt_001_up" || this._icon == "COMMON1_json.Bt_002_up") {
			this.setScale9Grid(27, 16, 1, 1);
		}

		this.addStyleEvent();
	}

	public addStyleEvent() {
		UITools.addPopBtnStyle(this);
	}

	public removeStyleEvent() {
		UITools.removeBtnStyle(this);
	}

	private _text: string = "";
	set text(char: string) {
		this._text = char;
		if (this.lb) {
			this.lb.text = char;
		}
	}

	get text(): string {
		return this._text;
	}

	private _size: number = 27;
	set size(v: number) {
		this._size = v;
		if (this.lb) {
			this.lb.size = v;
		}
	}

	get size(): number {
		return this._size;
	}

	private _bold: boolean = false;
	set bold(b: boolean) {
		if (this._bold == b) {
			return;
		}
		this._bold = b;
		if (this.lb) {
			this.lb.bold = b;
		}
	}

	get bold(): boolean {
		return this._bold;
	}

	protected _icon: any;
	/**图标*/
	public get icon(): any {
		return this._icon;
	}

	public set icon(value: any) {
		if (value == this._icon) {
			return;
		}
		this._icon = value;
		if (this.img) {
			if (value == "COMMON1_json.Bt_001_up" || value == "COMMON1_json.Bt_002_up" || value == "BtnGrey_json.Bt_001_disabled") {
				this.setScale9Grid(27, 16, 1, 1);
			}
			this.img.source = value;
		}
	}
	protected _textColor: any;
	public get textColor(): any {
		return this._textColor;
	}

	public set textColor(value: any) {
		if (value == this._textColor) {
			return;
		}
		this._textColor = value;
		if (this.lb) {
			this.lb.textColor = value;
		}
	}

	protected _offX: number = 0;
	set offX(v: number) {
		this._offX = v;
		if (this.lb) {
			this.lb.horizontalCenter = v;
		}
	}

	get offX(): number {
		return this._offX;
	}

	protected _offY: number = 0;
	set offY(v: number) {
		this._offY = v;
		if (this.lb) {
			this.lb.verticalCenter = v;
		}
	}

	get offY(): number {
		return this._offY;
	}

	/**灰色按钮*/
	public static disableDci = {
		"COMMON1_json.Bt_001_up": "BtnGrey_json.Bt_001_disabled",
		"COMMON1_json.Bt_002_up": "BtnGrey_json.Bt_001_disabled",
		"COMMON1_json.Bt_005_up": "BtnGrey_json.Bt_006_disabled",
		"COMMON1_json.Bt_006_up": "BtnGrey_json.Bt_006_disabled",
		"COMMON1_json.BT_Icom_JiaHao": "BtnGrey_json.BT_Icom_JiaHao_disabled",
		"COMMON1_json.BT_Icom_Jian": "BtnGrey_json.BT_Icom_Jian_disabled",
		"COMMON1_json.Bt_Tabbutton01_down": "BtnGrey_json.Bt_Tabbutton01_disabled",
		"COMMON1_json.Bt_Tabbutton01_up": "BtnGrey_json.Bt_Tabbutton01_disabled",
		"COMMON1_json.Btn_LQJL": "BtnGrey_json.Btn_LQJL_disabled",
		"COMMON1_json.Btn_numzoon": "BtnGrey_json.Btn_numzoon_disabled",
		"COMMON1_json.Btn_pageleft_up": "BtnGrey_json.Btn_pageleft_disabled",
		"COMMON1_json.Btn_pageview": "BtnGrey_json.Btn_pageview_disabled",
		"COMMON1_json.Btn_QWCZ_disabled": "BtnGrey_json.Btn_QWCZ",
		"COMMON1_json.Btn_Tabselect": "BtnGrey_json.Btn_Tabup_disabled",
		"COMMON1_json.Btn_Tabup": "BtnGrey_json.Btn_Tabup_disabled",
		"COMMON1_json.Btn_Tips": "BtnGrey_json.Btn_Tips_disabled",
		"COMMON1_json.Btn_Yellow": "BtnGrey_json.Btn_Yellow_disabled",
	};
	protected _disabled: boolean = false;
	/**设置按钮灰化* */
	public set disabled(value) {

		var bo = value == "true" || value == true;
		if (this._disabled == bo) {
			return;
		}
		this._disabled = bo;
		if(!this.img) {
			return;
		}
		if (bo) {
			if (BMButton.disableDci[this._icon]) {
				this.img.source = BMButton.disableDci[this._icon];
				this.lb.textColor = Color.GREYINT;
			} else {
				this.alpha = 0.5;
			}
			// this.filters = Color.disabled;
			this.touchEnabled = false;
		} else {
			if (BMButton.disableDci[this._icon]) {
				this.img.source = this._icon;
			} else {
				this.alpha = 1;
			}
			this.touchEnabled = true;
			if (this._textColor) {
				this.lb.textColor = this._textColor;
			} else {
				this.lb.textColor = 0x2e8c46;
			}
			// this.filters = [];
		}
	}

	public setScale9Grid(x: number, y: number, w: number, h: number): void {
		this.img.scale9Grid = new egret.Rectangle(x, y, w, h);
	}

	public setNotice(flag: boolean, top = -7, right = -9) {
		if (flag) {
			if (!this.image_notice) {
				this.image_notice = new eui.Image();
				this.addChild(this.image_notice);
				this.image_notice.top = top;
				this.image_notice.right = right;
				this.image_notice.source = "MAINUI_json.BM_RedDot";
			}
			this.image_notice.visible = true;
		} else {
			if (this.image_notice) {
				this.image_notice.visible = false;
			}
		}
	}

	public setDouble(flag: boolean) {
		if (flag) {
			if (!this.image_double) {
				this.image_double = new eui.Image();
				this.addChild(this.image_double);
				this.image_double.top = -10;
				this.image_double.left = -10;
				this.image_double.source = "COMMON1_json.Ico_Double";
			}
			this.image_double.visible = true;
		} else {
			if (this.image_double) {
				this.image_double.visible = false;
			}
		}
	}

}