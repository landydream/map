class LinkBtn extends eui.Component {
	public constructor() {
		super();
		//this.skinName = "resource/gameSkin/component/LinkBtnSkin.exml";
	}
	public lb: eui.Label;
	public line: eui.Image;

	public childrenCreated() {
	}
	protected _text;
	public set text(str: string) {
		this._text = str;
		// this.lb.text = str;
		this.updateLb();
	}
	public get text() {
		return this._text;
	}
	protected _size;
	public set size(size: number) {
		this._size = size;
		// this.lb.size = size;
		this.updateLb();
	}
	public get size() {
		return this._size;
	}
	protected _textColor: any = 0xFFFFFF;
	public get textColor(): any {
		return this._textColor;
	}

	public set textColor(value: any) {
		this._textColor = value;
		this.updateLb();
	}
	protected _strokeInt: any = 0;
	public get strokeInt(): any {
		return this._strokeInt;
	}
	public set strokeInt(value: any) {
		this._strokeInt = value;
		this.updateLb();
	}
	protected _strokeColor: any = 0x000000;
	public get strokeColor(): any {
		return this._strokeColor;
	}
	public set strokeColor(value: any) {
		this._strokeColor = value;
		this.updateLb();
	}
	protected _islink: boolean = true;
	public set isLink(bo: boolean) {
		this._islink = bo;
	}
	public image_notice: eui.Image;
	public setNotice(flag: boolean) {
		if (flag) {
			if (!this.image_notice) {
				this.image_notice = new eui.Image();
				this.addChild(this.image_notice);
				this.image_notice.source = "MAINUI_json.BM_RedDot";
			}
			this.image_notice.visible = true;

			this.image_notice.y = -14;
			this.image_notice.right = -14;
		} else {
			if (this.image_notice) {
				this.image_notice.visible = false;
			}
		}
	}
	public updateLb() {
		if(!this.lb) {
			return;
		}
		this.lb.text = this._text;
		this.lb.size = this._size;
		this.lb.textColor = this._textColor;
		this.lb.stroke = this._strokeInt;
		this.lb.strokeColor = this._strokeColor;
		if (this._islink) {
			// this.lb.textFlow = <Array<egret.ITextElement>>[
			// 	{ text: this.text, style: { "textColor": this._textColor, "size": this.size, stroke: this._strokeInt, strokeColor: this._strokeColor } }
			// ];
			this.line.visible = true;
			this.line.width = this.lb.width;
			this.line.y = this.lb.height + 5;
		}
		else {
			this.line.visible = false;
		}
	}
	public image_double: eui.Image;
	public setDouble(flag: boolean) {
		if (flag) {
			if (!this.image_double) {
				this.image_double = new eui.Image();
				this.addChild(this.image_double);
				this.image_double.source = "COMMON1_json.Ico_Double";
			}
			this.image_double.visible = true;
			this.image_double.y = this.lb.y - 10;
			this.image_double.x = this.lb.x - 10;
		} else {
			if (this.image_double) {
				this.image_double.visible = false;
			}
		}
	}
}