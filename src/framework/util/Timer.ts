/** 时间管理 */
class Timer {
	/** 时间管理 */
	public constructor() {
	}

	protected static _instance: Timer;
	static get instance(): Timer {
		if (!Timer._instance) {
			Timer._instance = new Timer();
		}
		return Timer._instance;
	}

	public tasks: any[] = [];
	/**增加时间监听 
	 * fun 回调函数
	 * thisObj 回调函数的this
	 * time 间隔时间 毫秒
	 * startTime 开始回调时间
	*/
	public listen(fun: Function, thisObj: any, time: number = 1000, startTime: number = 0): void {
		this.remove(fun, thisObj);
		this.tasks.push([fun, thisObj, startTime, time]);
	}

	/**删除监听 */
	public remove(fun: Function, thisObj: any): void {
		var len = this.tasks.length;
		for(var i = len-1;i >= 0;i--) {
			var task:any[] = this.tasks[i];
			if(task[0] == fun && task[1] == thisObj) {
				this.tasks.splice(i, 1);
				break;
			}
		}
	}

	/**是否有监听 */
	public has(fun: Function, thisObj: any): boolean {
		for(var i = 0;i < this.tasks.length;i++) {
			var task:any[] = this.tasks[i];
			if(task[0] == fun && task[1] == thisObj) {
				return true;
			}
		}
		return false;
	}
	
	public run(): void {
		 var nowTime = egret.getTimer();
		 var self = this;
		 var len = self.tasks.length;
		for(var i = len-1;i >= 0;i--) {
			var task:any[] = self.tasks[i];
			if(!task) {
				continue;
			}
			if(nowTime - task[2] < task[3]) {
				continue;
			}
			var fun:Function = task[0];
			if(fun.length >= 1) {
				fun.call(task[1], nowTime);
			}else{
				fun.call(task[1]);
			}
			task[2] = nowTime;
		}
	}
}