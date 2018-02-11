class RESObj {

	public ready:boolean;
	public state:number = -1;
	public proprity:number = 1;

	public ref0Time:number;

	public val:any;

	public refCount:number = 0;

	public mcdata:Object;
	public mctexture:egret.Texture;

	public factory:egret.MovieClipDataFactory;

	public useParts:Array<any> = [];

	public jsonUrl:string;
	public textureUrl:string;

	public static POOL = [];

	public disposeTimes = 0;

	/** 是否在销毁列表中 */
	public inDList:boolean;

	public static create():RESObj {
		var ret:RESObj = RESObj.POOL.length ? RESObj.POOL.pop() : new RESObj();
		return ret;
	}

	public startLoad() {
		this.state = 0;
		this.jsonUrl = LoaderManager.HEADURL + "/resource/model/" + this.val + ".json";
		RES.getResByUrl(this.jsonUrl, this.josnComplete, this, RES.ResourceItem.TYPE_JSON);
	}

	public josnComplete(data) { 
		if(data == null) {
			GameGlobal.resMgr.onLoaded();
			return;
		}
		
		this.state = 1;
		//this.mcdata = JSON.parse(data);
		this.mcdata = data;
		this.textureUrl = LoaderManager.HEADURL + "/resource/model/" + this.val + ".png";
		RES.getResByUrl(this.textureUrl, this.textureComplete, this, RES.ResourceItem.TYPE_IMAGE);
	}

	public textureComplete(texture) {
		if(texture == null) {
			GameGlobal.resMgr.onLoaded();
			return;
		}

		this.state = 2;
		this.mctexture = texture;
		this.complete();
	}

	public complete() {
		this.factory = new egret.MovieClipDataFactory(this.mcdata,this.mctexture);

		var uses = this.useParts;
		this.ready = true;
		for(var i = uses.length - 1; i >= 0; i--) {
			var p:Part = uses[i];
			p.buildmc();
		}
		uses.length = 0;

		GameGlobal.resMgr.onLoaded();
	}

	public dispose() {
		if(this.mcdata) {
			RES.destroyRes(this.jsonUrl);
			this.mcdata = null;
		}
		if(this.mctexture) {
			RES.destroyRes(this.textureUrl);
			var sprites = this.factory.spriteSheet;
			sprites.dispose();
			for(var k in sprites._textureMap) {
				sprites._textureMap[k].dispose();
				delete sprites._textureMap[k];
			}
			this.mctexture = null;
		}
		this.jsonUrl = this.textureUrl = null;
		this.state = -1;
		this.ready = false;
		this.disposeTimes++;
	}
}