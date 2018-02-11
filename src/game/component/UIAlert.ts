class UIAlert extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	public lbTitle: eui.Label;
	public bg:eui.Image;
	public btnClose: BMButton;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.lbTitle.text = this._text;
	}

	protected _text: string = "";
	set text(s: string) {
		this._text = s;
		if (this.lbTitle) {
			this.lbTitle.text = s;
		}
	}

	get text(): string {
		return this._text;
	}
	
}