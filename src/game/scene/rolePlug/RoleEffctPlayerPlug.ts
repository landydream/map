class RoleEffctPlayerPlug {
	public tag = "RoleEffctPlayerPlug";

	public constructor() {
	}

	private static POOL:Array<RoleEffctPlayerPlug> = [];
	public static create() {
		var pool = this.POOL;
		return pool.length ? pool.shift() : new RoleEffctPlayerPlug();
	}

	public list:Array<Part> = [];
	public role:SceneCharRole;

	public onAdd() {
	}

	public onRemove() {
		this.role = null;
		var list = this.list;
		var len = list.length;
		if(len > 0) {
			for(var i = list.length - 1; i >= 0; i--) {
				var part = list[i];
				if(part.view.parent) {
					part.view.parent.removeChild(part.view);
				}
				part.dispose();
			}
			list.length = 0;
		}
	}

	public update(ctx) {
		var list = this.list;
		var len = list.length;
		var del = 0;
		for(var i = 0, len = list.length; i < len; i++) {
			var part = list[i];
			part.startTime += ctx.dt;
			var perc = part.startTime / part.aniInterv;
			if(part.repeat) {
				perc = perc - (perc >> 0);
			}
			part.setPec(perc);
			if(part.endTime <= part.startTime) {
				list[i] = null;
				if(part.view.parent) {
					part.view.parent.removeChild(part.view);
				}
				part.dispose();
				del++;
			}
		}
		if(del) {
			ArrayUitl.cleannull(list);
			if(list.length == 0) {//没有特效可播放了
				ctx.d = 1;
			}
		}
	}

	public addEff(key:string, x:number, y:number, interval:number, time:number=-1, repeat=false, act=1):Part {
		var part = Part.create();
		part.act = act;
		part.setVal(key);
		part.aniInterv = interval;
		part.startTime = 0;
		part.repeat = repeat;
		if(time < 0) {
			time = 9999999999;
		}
		part.endTime = time;

		part.view.x = x;
		part.view.y = y;
		this.role.view.addChild(part.view);
		part.setAct(act);
		part.setVal(key);
		this.list.push(part);
		return part;
	}
}