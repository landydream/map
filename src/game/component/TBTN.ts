class TBTN extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		// this.skinName = "resource/gameSkin/component/TBTN.exml";
	}

	public index: number;
	public lb: eui.Label;
	public imgNotice: eui.Image;
	public imgDouble: eui.Image;
	public data: any;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.imgNotice.visible = false;
		this.lb.text = this._text;
		this.touchChildren = false;
	}

	public setText(str) {
		this.text = str;
		this.invalidateDisplayList();
	}

	public setNoticVis(v: boolean) {
		this.imgNotice.visible = v;
	}

	public setDoubleVis(v: boolean) {
		if (v) {
			if (!this.imgDouble) {
				this.imgDouble = new eui.Image();
				this.imgDouble.left = -6;
				this.imgDouble.top = -6;
				this.addChild(this.imgDouble);
				this.imgDouble.source = "COMMON1_json.Ico_Double";
			}
			this.imgDouble.visible = v;
		} else {
			if (this.imgDouble) {
				this.imgDouble.visible = v;
			}
		}
	}


	set label(char: string) {

	}

	get label(): string {
		return "";
	}

	private _text: string = "";
	set text(char: string) {
		if (this._text == char) {
			return;
		}
		this._text = char;
		if (this.lb) {
			this.lb.text = this._text;
		}
	}

	get text(): string {
		return this._text;
	}

	private _selected: boolean;
	set selected(boo: boolean) {
		this._selected = boo;
		this.currentState = boo == true ? "down" : "up";
	}

	get selected(): boolean {
		return this._selected;
	}

}