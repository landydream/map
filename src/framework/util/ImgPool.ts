class ImgPool {
	protected static _ins: ImgPool;
	public static get instance() {
		if (!this._ins) {
			this._ins = new ImgPool();
		}
		return this._ins;
	}

	public POOL: Array<eui.Image> = [];
	public getFreeImg(): eui.Image {
		var img: eui.Image = ImgPool.instance.POOL.length ? ImgPool.instance.POOL.pop() : new eui.Image();
		img.touchEnabled = false;
		return img;
	}

	/**这里img会从父类中移除 */
	public recycleImg(img: eui.Image): void {
		if (img.parent) img.parent.removeChild(img);
		ImgPool.instance.POOL.push(img);
	}
}