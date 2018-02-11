class RESManager extends egret.EventDispatcher {

	public map: any = {};
	public loadingRes: RESObj;
	public loadQueue: RESObj[] = [];
	public ref0List = [];

	public constructor() {
		super();
	}

	public refRes(val: string): RESObj {
		var res: RESObj = this.map[val];
		if (!res) {
			res = RESObj.create();
			res.val = val;
			this.map[val] = res;
			this.loadQueue.push(res);
			this.loadNext();
		} else {
			if (res.inDList) {
				var index = this.ref0List.indexOf(res);
				res.inDList = false;
				this.ref0List.splice(index, 1);
			}
		}
		res.refCount++;
		return res;
	}

	public reduceRes(val: string): RESObj {
		var res: RESObj = this.map[val];
		if (res) {
			res.refCount--;
			if (res.refCount <= 0) {
				if (!res.inDList) {
					res.ref0Time = egret.getTimer();
					res.inDList = true;
					this.ref0List.push(res);
				}
			}
		}
		return res;
	}

	public onLoaded() {
		this.loadingRes = null;
		this.loadNext();
	}


	protected loadNext() {
		if (!this.loadingRes && this.loadQueue.length) {
			while (this.loadQueue.length) {
				var res = this.loadQueue.shift();
				if (res) {
					this.loadingRes = res;
					res.startLoad();
					break;
				}
			}
		}
	}

	public checkDestory1() {
		var self = this;
		var len = self.ref0List.length;
		if (len > 0) {
			var num = Math.ceil(len / 4);
			if(num > 25) num = 25;

			var isNull:boolean = false;
			for (var i: number = 0; i < num; i++) {
				var res: RESObj = self.ref0List[i];
				var pt = egret.getTimer() - res.ref0Time;
				if (pt > 60000) {
					res.inDList = false;
					if (res.refCount == 0) {
						self.destoryRes(res);
						self.ref0List[i] = null;
						isNull = true;
					}
				}
			}

			if(isNull) ArrayUitl.cleannull(self.ref0List);
		}
	}

	public destoryRes(resobj: RESObj) {
		if (resobj === this.loadingRes) {
			return;
		}
		delete this.map[resobj.val];
		if (resobj.state == -1) {
			var loadindex = this.loadQueue.indexOf(resobj);
			if (loadindex >= 0) {
				this.loadQueue.splice(loadindex, 1);
			}
		}
		resobj.dispose();
	}

	public getVersionUrl(url: string): string {
		url = LoaderManager.HEADURL + url;
		return url;
	}
}