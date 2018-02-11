class JumpAndJumpView extends eui.Panel{
	public constructor() {
		super();
	}

	protected map:JumpAndJumpMap;
	protected mapLayer:egret.DisplayObjectContainer;
	protected boxLayer:egret.DisplayObjectContainer;
	protected roleLayer:egret.DisplayObjectContainer;
	protected init():void{
		this.mapLayer = new egret.DisplayObjectContainer();
		this.boxLayer = new egret.DisplayObjectContainer();
		this.roleLayer = new egret.DisplayObjectContainer();
		this.addChild(this.mapLayer);
		this.addChild(this.boxLayer);
		this.addChild(this.roleLayer);


		this.map = new JumpAndJumpMap();
		this.map.createMap();
		this.mapLayer.addChild(this.map);


		

	}


}