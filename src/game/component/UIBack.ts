class UIBack extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public lbTitle: eui.Label;
	public btnClose: BMButton;
	public btnRet: BMButton;
	public line: eui.Image;
	protected bmBg: eui.Image;

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

	/**显示背景图片 texture：可以是图片的资源路径，或者default.res.json的资源 */
	setBg(texture, y = 20) {
		if (!texture) {
			if(this.bmBg && this.bmBg.parent) {
				this.bmBg.parent.removeChild(this.bmBg);
			}
			return;
		}
		if (!this.bmBg) {
			this.bmBg = new eui.Image();
			this.bmBg.horizontalCenter = 0;
		}
		if(!this.bmBg.parent) {
			this.addChildAt(this.bmBg, 3);
		}
		this.bmBg.y = y;
		ImageLoader.instance.reduceImgRes(this.bmBg);
		if (typeof (texture) == "string" && texture.indexOf("/")>=0) {//是图片路径
			ImageLoader.instance.loader(texture, this.bmBg);
		} else {
			this.bmBg.source = texture;
		}
	}

}