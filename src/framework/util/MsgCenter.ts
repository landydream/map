class MsgCenter {
	public constructor() {
	}

	public msgMap: any = {};
	public invalidMap: any = {};
	public invalid = 0;
	public msgDelayCalls = [];
	public havDelay = false;

	/**延迟调用消息*/
	public addDelayCalls(msg, arg = null): void {
		if (this.msgDelayCalls.indexOf(msg) == -1) {
			this.msgDelayCalls.push([msg, arg]);
			this.havDelay = true;
		}
	}

	/**调用延迟的消息*/
	public callDelayMsgs(): void {
		if(!this.havDelay) return;
		var list = this.msgDelayCalls;
		for (var i = 0, len = list.length; i < len; i++) {
			var msgV = list[i];
			this.notify(msgV[0], msgV[1]);
			msgV = null;
		}

		this.msgDelayCalls = [];
		this.havDelay = false;
	}

	/** 
	 * @msg 派发的消息
	 * @arg 派发的参数
	*/
	public notify(msg, arg = null) {
		var list: Array<any> = this.msgMap[msg];
		if (list) {
			for (var i = 0, len = list.length; i < len; i++) {
				var listenerInfo = list[i];
				if (listenerInfo) {
					listenerInfo[0] = arg;
					listenerInfo[1].apply(listenerInfo[2], listenerInfo);
				}
			}
		}
	}

	/** 移除监听
	 * @msg 消息
	 * @listener 回调
	*/
	public remove(msg, listener: Function, thisObj = null) {
		var list: Array<any> = this.msgMap[msg];
		if (list) {
			var index = this.getIndex(listener, list, thisObj);
			if (index != -1) {
				list[index] = null;
				this.invalidMap[msg] = true;
				if (!this.invalid) {
					egret.callLater(MsgCenter.cleannull, this);
				}
				this.invalid++;

			}
		}
	}

	/** 添加
	 * @msg 消息
	 * @listener 回调
	 * @thisObj this
	*/
	public listen(msg, listener: Function, thisObj = null) {
		var list: Array<any> = this.msgMap[msg];
		if (!list) {
			list = this.msgMap[msg] = [];
		}
		var index = this.getIndex(listener, list, thisObj);
		if (index >= 0) {
			return;
		}
		if (true) {
			list.unshift([null, listener, thisObj]);
		}
	}

	public static cleannull() {
		var self: any = this;
		var arrayutil = ArrayUitl;
		if (self.invalid) {
			self.invalid = 0;
			for (var k in self.invalidMap) {
				var invalidList: Array<any> = self.msgMap[k];
				arrayutil.cleannull(invalidList);
				//invalidList.length = len - emptylen;
				delete self.invalidMap[k];
			}
		}
	}

	/** 添加
	 * @msg 消息
	 * @listener 回调
	 * @thisObj this
	*/
	public listenonce(msg, listener: Function, thisObj = null) {
		var msgCenter = this;
		this.listen(msg, function func(arg): void {
			msgCenter.remove(msg, func, this);
			listener.apply(thisObj, arg);
		}, this);
	}

	protected getIndex(listener, list: Array<any>, thisObj): number {
		for (var i = list.length - 1; i >= 0; i--) {
			var term = list[i];
			if (term && listener == term[1] && (!thisObj || (term[2] == thisObj))) {
				return i;
			}
		}
		return -1;
	}
}