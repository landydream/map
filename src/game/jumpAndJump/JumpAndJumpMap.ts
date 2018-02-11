class JumpAndJumpMap extends eui.Panel{
	
	protected map1:eui.Image;
	protected map2:eui.Image;
	public constructor() {
		super();
		this.map1 = new eui.Image();
		this.map2 = new eui.Image();
		this.addChild(this.map1);
		this.addChild(this.map2);
		
	}

	public createMap():void{
		ImageLoader.instance.loader(ResURL.getBoxUrl('bg'),this.map1)
		ImageLoader.instance.loader(ResURL.getBoxUrl('bg'),this.map2)

		this.map1.y = 0;
		this.map2.y = -1920;
	}


}