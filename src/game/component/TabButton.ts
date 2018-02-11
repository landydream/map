class TabButton extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	public img: eui.Image;
	public lb: eui.Label;
	public imgNotice: eui.Image;

	protected childrenCreated() {
		super.childrenCreated();
		this.lb.text = this._text;
	}

	protected dataChanged() {
		var info = this.data;
		if (typeof info == "string") {
			this.text = info;
		} else {
			this.text = info.text;
			if (info.notice != null) {
				this.setNotice(info.notice);
			}
		}
	}

	protected _text = "";
	set text(v: string) {
		this._text = v;
		if (this.lb) {
			this.lb.text = v;
		}
	}

	get text() {
		return this._text;
	}

	setNotice(b: boolean) {
		if (b) {
			if (!this.imgNotice) {
				this.imgNotice = new eui.Image();
				this.imgNotice.top = -6;
				this.imgNotice.right = -6;
				this.imgNotice.source = "MAINUI_json.BM_RedDot";
				this.addChild(this.imgNotice);
			}
		}
		if (this.imgNotice) {
			this.imgNotice.visible = b;
		}
	}

}