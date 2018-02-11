class UIBack3 extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	public lbTitle: eui.Label;
	public btnClose: BMButton;
	public btnRet: BMButton;

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