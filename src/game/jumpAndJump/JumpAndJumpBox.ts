class JumpAndJumpBox extends egret.Sprite{

	private bmTop:eui.Image;
	private bmLeft:eui.Image;
	private bmRight:eui.Image;
	private bmDown:eui.Image;
	private type:number;
	private tw;
	private th;
	public constructor() {
		super();
		
		this.addEventListener(Enum_MsgType.BEGIN_TOUCH_SCREEN,this.touchScreenHandler,this);
		this.addEventListener(Enum_MsgType.END_TOUCH_SCREEN,this.touchUpHandler,this);
	}

	public craete(type,width = 400):void{
		this.type = type;
		if(type == 1 || type == 2){
			this.bmTop = new eui.Image();
			this.bmDown = new eui.Image();
			this.addChild(this.bmDown);
			this.addChild(this.bmTop);
			ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_1'),this.bmTop);
			ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_2'),this.bmDown);
		}else{
			this.bmTop = new eui.Image();
			this.bmLeft = new eui.Image();
			this.bmRight = new eui.Image();
			this.addChild(this.bmTop);
			this.addChild(this.bmLeft);
			this.addChild(this.bmRight);

			ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_1'),this.bmTop);
			ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_2'),this.bmLeft);
			ImageLoader.instance.loader(ResURL.getBoxUrl(type + '_3'),this.bmRight);
		}

		this.bmTop.width = width;
		this.bmTop.height = this.bmTop.width * 0.568;
		this.tw = this.bmTop.width / 2;
		this.th = this.bmTop.height / 2;
		this.resetBox();
	}

	protected resetBox():void{
		if(this.type == 1 || this.type == 2){
			this.bmDown.width = this.tw;
			this.bmDown.x = this.tw / 2;
			this.bmDown.y = this.th;
		}else{
			this.bmLeft.height = this.th;
			this.bmLeft.y = this.th - 3;
			this.bmLeft.skewY = 30;
			this.bmLeft.width = this.tw / 0.865;

			this.bmRight.height = this.th;
			this.bmRight.x = this.tw;
			this.bmRight.y = this.bmTop.height - 3;
			this.bmRight.skewY = -30;
			this.bmRight.width = this.tw / 0.865;
		}
	}

	public touchScreenHandler():void{
		Timer.instance.listen(this.scaleBoxFunc,this,100);
	}

	

	public touchUpHandler():void{
		Timer.instance.remove(this.scaleBoxFunc,this);
		this.endScaleBoxFunc();
	}

	private sumY = 0;
	private vy = 5;
	private vwidth = 2;
	protected scaleBoxFunc():void{
		var self = this;
		if(self.sumY < 50){
			self.sumY += self.vy;
			self.bmTop.y += self.vy;
			if(self.type == 1 || self.type == 2){
				self.bmDown.width += self.vwidth;
				self.bmDown.x = self.tw / 2;
				self.bmDown.y += self.vy;	
			}else{
				self.bmLeft.height -= self.vy;
				self.bmLeft.y += self.vy;
				self.bmRight.height -= self.vy;
				self.bmRight.y += self.vy;
			}
		}
	}

	protected endScaleBoxFunc():void{
		this.bmTop.y = 0;
		this.sumY = 0;
		this.resetBox();
	}



}