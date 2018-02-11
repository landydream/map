class BitmapLoader extends egret.Bitmap{
	public constructor() {
		super();
	}

	public imgUrl:string;
	public load(url:string):void {
		this.imgUrl = url;
		RES.getResByUrl(url, this.onImgLoaded, this,RES.ResourceItem.TYPE_IMAGE);
	}

	public dispose():void {
		this.texture = null;
		RES.destroyRes(this.imgUrl);
	}

	protected onImgLoaded(bmd) {
		this.texture = bmd;
		if(bmd == null) {
			GameGlobal.resMgr.onLoaded();			
		}
	} 
}